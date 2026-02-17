'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [form, setForm] = useState({ fullName: '', phone: '', address: '', pincode: '', paymentMethod: 'COD' });
  const router = useRouter();

  const submit = async () => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]').map((item: any) => ({ productId: item.productId, quantity: item.quantity }));

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, products })
    });

    if (res.ok) {
      localStorage.removeItem('cart');
      toast.success('Order placed successfully');
      router.push('/orders');
    } else {
      toast.error('Checkout failed. Please login first.');
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-3">
      <h1 className="mb-4 text-3xl font-semibold">Checkout</h1>
      {Object.entries(form).filter(([k]) => k !== 'paymentMethod').map(([key, val]) => (
        <input key={key} value={val} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={key} className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3" />
      ))}
      <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3">
        <option value="COD">Cash on Delivery (COD)</option>
        <option value="UPI">UPI</option>
      </select>
      <button onClick={submit} className="w-full rounded-xl bg-accent py-3 font-semibold text-black">Place Order</button>
    </div>
  );
}
