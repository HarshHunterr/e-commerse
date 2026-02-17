export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-10">
      <h1 className="text-3xl font-bold text-yellow-500">
        Admin Dashboard
      </h1>

      <div className="mt-8 space-y-4">
        <a href="/admin/products" className="block hover:text-yellow-400">
          Manage Products
        </a>

        <a href="/admin/orders" className="block hover:text-yellow-400">
          Manage Orders
        </a>

        <a href="/admin/users" className="block hover:text-yellow-400">
          Manage Users
        </a>
      </div>
    </div>
  );
}
