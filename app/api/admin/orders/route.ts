import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/guards';
import { Order } from '@/models/Order';

export async function GET() {
  const auth = requireAdmin();
  if ('error' in auth) return auth.error;

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}
