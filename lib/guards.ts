import { NextResponse } from 'next/server';
import { getAuthUser } from './auth';

export function requireAuth() {
  const user = getAuthUser();
  if (!user) return { error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) };
  return { user };
}

export function requireAdmin() {
  const auth = requireAuth();
  if ('error' in auth) return auth;
  if (auth.user.role !== 'admin') {
    return { error: NextResponse.json({ message: 'Forbidden' }, { status: 403 }) };
  }
  return auth;
}
