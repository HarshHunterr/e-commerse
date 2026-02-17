import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/guards';
import { Order } from '@/models/Order';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = requireAdmin();
  if ('error' in auth) return auth.error;

  const { status } = await req.json();
  if (!['Pending', 'Shipped', 'Delivered'].includes(status)) {
    return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
  }

  await connectDB();
  const order = await Order.findByIdAndUpdate(params.id, { status }, { new: true });
  return NextResponse.json(order);
}
