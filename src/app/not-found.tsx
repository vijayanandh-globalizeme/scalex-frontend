import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: `The page you requested could not be found on ${SITE_NAME}.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-xl font-semibold text-zinc-900">404</h1>
      <p className="text-zinc-600">This page does not exist.</p>
      <Link href="/" className="text-violet-600 underline">
        Home
      </Link>
    </div>
  );
}
