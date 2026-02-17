'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = new URLSearchParams({ q: search, category }).toString();
      const res = await fetch(`/api/products?${query}`);
      setProducts(await res.json());
      setLoading(false);
    };

    fetchProducts();
  }, [search, category]);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-semibold">All Products</h1>
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" className="rounded-xl border border-zinc-700 bg-zinc-900 p-2" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-zinc-700 bg-zinc-900 p-2">
          <option value="">All Categories</option>
          <option value="party wear">Party Wear</option>
          <option value="cotton suits">Cotton Suits</option>
          <option value="winter collection">Winter Collection</option>
        </select>
      </div>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">{[1,2,3].map((n)=><div key={n} className="h-80 animate-pulse rounded-xl bg-zinc-800" />)}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">{products.map((p: any) => <ProductCard key={p._id} product={p} />)}</div>
      )}
    </div>
  );
}
