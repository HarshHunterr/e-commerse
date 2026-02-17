import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/guards';
import { User } from '@/models/User';

export async function GET() {
  const auth = requireAdmin();
  if ('error' in auth) return auth.error;

  await connectDB();
  const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
  return NextResponse.json(users);
}
