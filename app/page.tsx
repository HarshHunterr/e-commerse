import Link from 'next/link';

const featured = [
  { title: 'Royal Anarkali Set', price: '₹2,999', image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=80' },
  { title: 'Festive Cotton Kurta', price: '₹1,899', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80' },
  { title: 'Winter Velvet Suit', price: '₹3,499', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80' }
];

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800 p-10">
        <h1 className="text-4xl font-bold md:text-6xl">Elegant Ethnic Wear for Every Occasion</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">Discover curated premium suits, festive collections, and timeless silhouettes crafted for modern women.</p>
        <Link href="/products" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-black">Shop Now</Link>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Featured Products</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((item) => (
            <div key={item.title} className="card-hover rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <img src={item.image} alt={item.title} className="h-64 w-full rounded-xl object-cover" />
              <h3 className="mt-3 text-lg">{item.title}</h3>
              <p className="text-accent">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {['Premium Quality Fabrics', 'Fast Shipping & COD/UPI', 'Trusted by 5,000+ Customers'].map((text) => (
          <div key={text} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">{text}</div>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <p className="mt-3 text-zinc-300">“Beautiful collection and quick delivery. Loved the quality!” — Priya S.</p>
      </section>

      <footer className="border-t border-zinc-800 py-8 text-sm text-zinc-400">
        <p>Contact: support@namitasuitsansaar.com | +91-90000-00000</p>
        <p className="mt-2">Instagram | Facebook | Terms & Conditions | Privacy Policy</p>
      </footer>
    </div>
  );
}
