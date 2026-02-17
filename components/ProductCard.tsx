import Link from 'next/link';

type Product = {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product._id}`} className="card-hover rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <img src={product.images[0]} alt={product.title} className="h-64 w-full rounded-xl object-cover" />
      <p className="mt-3 text-sm text-accent">{product.category}</p>
      <h3 className="text-lg font-medium">{product.title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <p className="font-semibold">₹{product.price}</p>
        <span className="text-xs text-zinc-400">Stock: {product.stock}</span>
      </div>
    </Link>
  );
}
