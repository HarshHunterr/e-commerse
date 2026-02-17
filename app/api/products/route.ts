import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const filter: Record<string, unknown> = {};
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (category) filter.category = category;

  const products = await Product.find(filter).sort({ createdAt: -1 });
  return NextResponse.json(products);
}
