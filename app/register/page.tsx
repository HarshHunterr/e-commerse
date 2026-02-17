'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const submit = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      toast.success('Account created');
      router.push('/products');
    } else toast.error('Registration failed');
  };

  return (
    <div className="mx-auto max-w-md space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h1 className="text-2xl font-semibold">Register</h1>
      <input placeholder="Name" className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit} className="w-full rounded-xl bg-accent py-3 font-semibold text-black">Create Account</button>
      <p className="text-sm">Already have an account? <Link className="text-accent" href="/login">Login</Link></p>
    </div>
  );
}
