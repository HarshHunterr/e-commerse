import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { setAuthCookie, signToken } from '@/lib/auth';
import { User } from '@/models/User';

export async function POST(req: Request) {
  const { email, name } = await req.json();
  if (!email || !name) return NextResponse.json({ message: 'Missing Google profile' }, { status: 400 });

  await connectDB();
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ name, email, role: 'user', provider: 'google' });

  const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email, name: user.name });
  setAuthCookie(token);

  return NextResponse.json({ message: 'Google session synced' });
}
