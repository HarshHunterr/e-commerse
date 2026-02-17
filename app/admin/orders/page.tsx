'use client';

import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const load = () => fetch('/api/admin/orders').then((r) => (r.ok ? r.json() : [])).then(setOrders);

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Admin Order Management</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p>{o.fullName} | {o.phone}</p>
            <p className="text-sm text-zinc-400">{o.address}, {o.pincode}</p>
            <p>₹{o.totalAmount} - {o.status}</p>
            <select value={o.status} onChange={(e)=>updateStatus(o._id, e.target.value)} className="mt-2 rounded-lg bg-zinc-950 p-2">
              <option>Pending</option><option>Shipped</option><option>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
