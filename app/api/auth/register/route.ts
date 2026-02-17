import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { hashPassword, setAuthCookie, signToken } from '@/lib/auth';
import { registerSchema } from '@/lib/validators';
import { User } from '@/models/User';

export async function POST(req: Request) {
  try {
    const body = registerSchema.parse(await req.json());
    await connectDB();

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) return NextResponse.json({ message: 'Email already exists' }, { status: 409 });

    const password = await hashPassword(body.password);
    const user = await User.create({ ...body, password, role: 'user' });
    const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email, name: user.name });
    setAuthCookie(token);

    return NextResponse.json({ message: 'Registered', user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request', error }, { status: 400 });
  }
}
