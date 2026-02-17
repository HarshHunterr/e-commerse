'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const removeItem = (id: string) => {
    const updated = items.filter((i) => i.productId !== id);
    setItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div>
              <p>{item.title}</p>
              <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-4">
              <p>₹{item.price * item.quantity}</p>
              <button onClick={() => removeItem(item.productId)} className="text-red-400">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xl">Total: ₹{total}</p>
      <Link href="/checkout" className="mt-4 inline-block rounded-xl bg-accent px-6 py-2 font-semibold text-black">Proceed to Checkout</Link>
    </div>
  );
}
