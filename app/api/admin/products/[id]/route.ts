import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/guards';
import { productSchema } from '@/lib/validators';
import { Product } from '@/models/Product';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = requireAdmin();
  if ('error' in auth) return auth.error;

  await connectDB();
  const body = productSchema.partial().parse(await req.json());
  const product = await Product.findByIdAndUpdate(params.id, body, { new: true });

  return NextResponse.json(product);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const auth = requireAdmin();
  if ('error' in auth) return auth.error;

  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}
