'use client';

import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/orders').then((r) => (r.ok ? r.json() : [])).then(setOrders);
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p>Status: <span className="text-accent">{order.status}</span></p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Placed: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
