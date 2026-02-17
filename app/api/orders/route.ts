import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAuth } from '@/lib/guards';
import { orderSchema } from '@/lib/validators';
import { Product } from '@/models/Product';
import { Order } from '@/models/Order';

export async function GET() {
  const auth = requireAuth();
  if ('error' in auth) return auth.error;

  await connectDB();
  const orders = await Order.find({ userId: auth.user.userId }).sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const auth = requireAuth();
  if ('error' in auth) return auth.error;

  await connectDB();
  const body = orderSchema.parse(await req.json());

  const orderProducts = [];
  let totalAmount = 0;

  for (const item of body.products) {
    const product = await Product.findById(item.productId);
    if (!product || product.stock < item.quantity) {
      return NextResponse.json({ message: `Product unavailable: ${item.productId}` }, { status: 400 });
    }
    product.stock -= item.quantity;
    product.isOutOfStock = product.stock === 0;
    await product.save();

    const subtotal = product.price * item.quantity;
    totalAmount += subtotal;
    orderProducts.push({
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: item.quantity,
      image: product.images[0]
    });
  }

  const order = await Order.create({
    userId: auth.user.userId,
    products: orderProducts,
    totalAmount,
    fullName: body.fullName,
    phone: body.phone,
    address: body.address,
    pincode: body.pincode,
    paymentMethod: body.paymentMethod
  });

  return NextResponse.json({ message: 'Order placed', order }, { status: 201 });
}
