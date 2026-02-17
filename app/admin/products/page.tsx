'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const empty = { title: '', description: '', price: 0, images: [''], stock: 0, category: '' };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);

  const load = () => fetch('/api/products').then((r) => r.json()).then(setProducts);
  useEffect(() => { load(); }, []);

  const create = async () => {
    const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) {
      toast.success('Product created');
      setForm(empty);
      load();
    } else toast.error('Admin access required');
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    if (res.ok) load();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Admin Product Management</h1>
      <div className="grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
        <input placeholder="Title" className="rounded-lg bg-zinc-950 p-2" onChange={(e)=>setForm({...form,title:e.target.value})} />
        <textarea placeholder="Description" className="rounded-lg bg-zinc-950 p-2" onChange={(e)=>setForm({...form,description:e.target.value})} />
        <input placeholder="Image URL" className="rounded-lg bg-zinc-950 p-2" onChange={(e)=>setForm({...form,images:[e.target.value]})} />
        <input placeholder="Category" className="rounded-lg bg-zinc-950 p-2" onChange={(e)=>setForm({...form,category:e.target.value})} />
        <input type="number" placeholder="Price" className="rounded-lg bg-zinc-950 p-2" onChange={(e)=>setForm({...form,price:Number(e.target.value)})} />
        <input type="number" placeholder="Stock" className="rounded-lg bg-zinc-950 p-2" onChange={(e)=>setForm({...form,stock:Number(e.target.value)})} />
        <button onClick={create} className="rounded-lg bg-accent py-2 font-semibold text-black">Add Product</button>
      </div>
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p._id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div>{p.title} - ₹{p.price} ({p.stock})</div>
            <button onClick={() => remove(p._id)} className="text-red-400">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
