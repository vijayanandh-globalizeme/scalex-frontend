import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Professional Training & Certification Courses',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Professional Training & Certification`,
    description: SITE_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-16">
      <h1 className="text-center text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
        {SITE_NAME}
      </h1>
      <p className="mt-4 max-w-xl text-center text-sm leading-relaxed text-zinc-600 md:text-base">
        Professional training, certification prep, and corporate learning programs to help you scale your skills and
        career.
      </p>
    </div>
  );
}
