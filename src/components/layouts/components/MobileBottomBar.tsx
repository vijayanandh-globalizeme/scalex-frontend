'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  phone: string;
};

export default function MobileBottomBar({ phone }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Spacer so fixed bar never covers page content */}
      <div className="h-[60px] sm:hidden" aria-hidden />

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="h-px bg-zinc-200" />
        <div className="flex items-stretch gap-2.5 bg-white px-4 py-2.5 shadow-[0_-4px_20px_-4px_rgba(15,23,42,0.10)]">
          <a
            href={phone ? `tel:${phone.replace(/\s/g, '')}` : 'tel:'}
            className="flex flex-1 items-center justify-center rounded-md bg-brand px-3 py-2 text-[13px] font-semibold text-white transition active:scale-95"
          >
            Chat with us
          </a>
          <Link
            href="/contact-us"
            className="flex flex-1 items-center justify-center rounded-md border-2 border-ink px-3 py-2 text-[13px] font-semibold text-ink transition active:scale-95"
          >
            Request a callback
          </Link>
        </div>
      </div>
    </>
  );
}
