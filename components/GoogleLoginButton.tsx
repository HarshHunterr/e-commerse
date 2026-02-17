'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function GoogleLoginButton() {
  const { data } = useSession();

  useEffect(() => {
    if (data?.user?.email && data.user.name) {
      fetch('/api/auth/google/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.user.email, name: data.user.name })
      });
    }
  }, [data]);

  return (
    <button onClick={() => signIn('google')} className="w-full rounded-xl bg-white px-4 py-2 text-black">
      Continue with Google
    </button>
  );
}
