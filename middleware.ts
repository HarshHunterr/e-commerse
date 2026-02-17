import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();

  const token = request.cookies.get('nss_token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', request.url));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change-me') as { role?: string };
    if (payload.role !== 'admin') return NextResponse.redirect(new URL('/products', request.url));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*']
};
