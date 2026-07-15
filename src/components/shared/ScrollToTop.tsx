'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const target = document.querySelector(hash);
    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const scrollToTarget = () => target.scrollIntoView({ behavior: 'instant', block: 'start' });
    scrollToTarget();

    // Right after a cross-page navigation, web fonts and images are still
    // settling and shift the target's final offset — correct a few more
    // times so the last one lands on the settled layout.
    const timers = [100, 300, 600].map((delay) => window.setTimeout(scrollToTarget, delay));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [pathname]);
  return null;
}
