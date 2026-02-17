import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/guards';
import { productSchema } from '@/lib/validators';
import { Product } from '@/models/Product';

export async function POST(req: Request) {
  const auth = requireAdmin();
  if ('error' in auth) return auth.error;

  await connectDB();
  const body = productSchema.parse(await req.json());
  const product = await Product.create(body);

  return NextResponse.json(product, { status: 201 });
}
