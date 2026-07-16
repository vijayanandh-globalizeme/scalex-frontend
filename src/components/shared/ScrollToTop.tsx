'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;

    const scrollToTarget = () =>
      target
        ? target.scrollIntoView({ behavior: 'instant', block: 'start' })
        : window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    scrollToTarget();

    // Right after a cross-page navigation, web fonts and images are still
    // settling and shift the target's final offset — correct a few more
    // times so the last one lands on the settled layout. This also covers
    // the plain top-of-page case (course/category/blog pages), where late
    // image/font layout shifts can otherwise leave the hero out of view.
    const timers = [100, 300, 600].map((delay) => window.setTimeout(scrollToTarget, delay));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [pathname]);
  return null;
}
