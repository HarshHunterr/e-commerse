'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/products/${params.id}`).then((r) => r.json()).then(setProduct);
  }, [params.id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.productId === product._id);
    if (existing) existing.quantity += 1;
    else cart.push({ productId: product._id, title: product.title, price: product.price, image: product.images[0], quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart');
  };

  if (!product) return <div className="h-64 animate-pulse rounded-xl bg-zinc-800" />;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <img src={product.images[0]} alt={product.title} className="w-full rounded-2xl object-cover" />
      <div>
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-zinc-300">{product.description}</p>
        <p className="mt-4 text-2xl text-accent">₹{product.price}</p>
        <p className="mt-1 text-sm text-zinc-400">Stock: {product.stock}</p>
        <button onClick={addToCart} className="mt-6 rounded-xl bg-accent px-5 py-2 font-medium text-black">Add to Cart</button>
      </div>
    </div>
  );
}
