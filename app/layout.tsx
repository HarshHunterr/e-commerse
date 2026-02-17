import './globals.css';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

export const metadata = {
  title: 'Namita Suit Sansaar',
  description: 'Elegant Ethnic Wear for Every Occasion'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <header className="sticky top-0 z-20 border-b border-zinc-800 bg-black/80 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
              <Link href="/" className="text-xl font-semibold text-accent">Namita Suit Sansaar</Link>
              <div className="flex gap-4 text-sm">
                <Link href="/products">Products</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/orders">Orders</Link>
                <Link href="/login">Login</Link>
                <Link href="/admin/products">Admin</Link>
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-6xl p-4">{children}</main>
          <Toaster position="top-right" />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
