'use client';

import { useEffect, useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/users').then((r) => (r.ok ? r.json() : [])).then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Registered Customers</h1>
      <div className="space-y-3">
        {users.map((u) => (
          <div key={u._id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p>{u.name} ({u.email})</p>
            <p className="text-sm text-zinc-400">Joined: {new Date(u.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
