import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { comparePassword, setAuthCookie, signToken } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';
import { User } from '@/models/User';

export async function POST(req: Request) {
  try {
    const body = loginSchema.parse(await req.json());
    await connectDB();

    const user = await User.findOne({ email: body.email });
    if (!user || !user.password) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

    const validPassword = await comparePassword(body.password, user.password);
    if (!validPassword) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

    const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email, name: user.name });
    setAuthCookie(token);
    return NextResponse.json({ message: 'Logged in', user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request', error }, { status: 400 });
  }
}
