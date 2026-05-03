'use client';

import '@/styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-lg font-semibold">Error</h1>
          <button type="button" onClick={reset} className="mt-4 text-sm underline">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
