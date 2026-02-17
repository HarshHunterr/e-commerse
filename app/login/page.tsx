'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const submit = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      toast.success('Welcome back');
      router.push('/products');
    } else toast.error('Invalid credentials');
  };

  return (
    <div className="mx-auto max-w-md space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input placeholder="Email" className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit} className="w-full rounded-xl bg-accent py-3 font-semibold text-black">Login</button>
      <GoogleLoginButton />
      <p className="text-sm">Don&apos;t have an account? <Link className="text-accent" href="/register">Register</Link></p>
    </div>
  );
}
