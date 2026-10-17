'use client';

import { useCallback, useEffect, useState } from 'react';

/** Room left for the overlaid arrow so a tab scrolled into view is not hidden under it. */
const ARROW_GUTTER_PX = 64;

/**
 * Tracks whether a horizontal tab strip overflows and whether it is scrolled to its end,
 * so a "next tab" arrow can be shown on mobile. Tabs are the strip's direct children, in order.
 */
export function useTabStripArrow<T extends HTMLElement = HTMLDivElement>() {
  const [strip, stripRef] = useState<T | null>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    if (!strip) return;

    const update = () => {
      setOverflowing(strip.scrollWidth > strip.clientWidth + 1);
      setAtEnd(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1);
    };

    // ResizeObserver fires once on observe, which covers the initial measurement.
    const observer = new ResizeObserver(update);
    const observeAll = () => {
      observer.disconnect();
      observer.observe(strip);
      Array.from(strip.children).forEach((child) => observer.observe(child));
    };
    observeAll();
    // Tabs that arrive after mount (e.g. fetched categories) change scrollWidth without resizing the strip.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(strip, { childList: true });
    strip.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      mutations.disconnect();
      observer.disconnect();
      strip.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [strip]);

  const scrollTabIntoView = useCallback(
    (index: number) => {
      const tab = strip?.children[index] as HTMLElement | undefined;
      if (!strip || !tab) return;

      const tabLeft = tab.offsetLeft - strip.offsetLeft;
      const tabRight = tabLeft + tab.offsetWidth;
      const visLeft = strip.scrollLeft;
      const visRight = visLeft + strip.clientWidth;

      if (tabLeft < visLeft) {
        strip.scrollTo({ left: tabLeft - 16, behavior: 'smooth' });
      } else if (tabRight > visRight - ARROW_GUTTER_PX) {
        strip.scrollTo({ left: tabRight - strip.clientWidth + ARROW_GUTTER_PX, behavior: 'smooth' });
      }
    },
    [strip],
  );

  return { stripRef, overflowing, atEnd, scrollTabIntoView };
}
