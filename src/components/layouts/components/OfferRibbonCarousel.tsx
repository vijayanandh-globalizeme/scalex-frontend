'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import CourseBrochureCta from '@/components/course-detail/CourseBrochureCta';
import type { ApiRibbon } from '@/services/ribbonApi';

/**
 * Offer ribbon bar between the header and every page's hero.
 * One ribbon → shown as-is. Several → arrows + auto-advance (paused on hover/focus).
 *
 * Layout by breakpoint:
 *  - xl+  : [‹] tag pill | title | offer  CTA [›], grouped in the centre (56px tall)
 *  - md–lg: tag + dividers hidden, smaller type
 *  - < md : title and offer stacked on the left, compact CTA on the right
 */

const AUTO_ADVANCE_MS = 5000;
const BRAND_GRADIENT = 'linear-gradient(90deg, #FD022D 0%, #F49114 50%, #7ABD56 100%)';

/** Splits "Diwali **Flash Sale** is live" into plain and highlighted parts. */
function renderHighlights(text: string, highlight: (part: string, key: number) => ReactNode): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('**') && part.endsWith('**') && part.length > 4 ? highlight(part.slice(2, -2), i) : part,
    );
}

const gradientText = (part: string, key: number) => (
  <span
    key={key}
    className="bg-clip-text text-transparent [-webkit-text-fill-color:transparent]"
    style={{ backgroundImage: BRAND_GRADIENT }}
  >
    {part}
  </span>
);

const greenText = (part: string, key: number) => (
  <span key={key} className="text-[#7ABD56]">
    {part}
  </span>
);

function CornerLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 61 56" fill="none" aria-hidden>
      <path opacity="0.8" d="M3.8147e-06 56V0L61 56H3.8147e-06Z" fill="url(#offer-ribbon-corner-left)" />
      <defs>
        <linearGradient id="offer-ribbon-corner-left" x1="116.959" y1="-114.523" x2="-65.7346" y2="187.556" gradientUnits="userSpaceOnUse">
          <stop offset="0.45571" stopColor="#7ABD56" />
          <stop offset="0.518954" stopColor="#F49114" />
          <stop offset="0.587552" stopColor="#FD022D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CornerRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 61 56" fill="none" aria-hidden>
      <path opacity="0.8" d="M61 0V56L0 0H61Z" fill="url(#offer-ribbon-corner-right)" />
      <defs>
        <linearGradient id="offer-ribbon-corner-right" x1="-55.9587" y1="170.523" x2="126.735" y2="-131.556" gradientUnits="userSpaceOnUse">
          <stop offset="0.45571" stopColor="#7ABD56" />
          <stop offset="0.518954" stopColor="#F49114" />
          <stop offset="0.587552" stopColor="#FD022D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="16" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function Chevron({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {direction === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

function NavButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous offer' : 'Next offer'}
      className="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white/60 hover:bg-white/10 hover:text-white md:h-8 md:w-8"
    >
      <Chevron direction={direction} />
    </button>
  );
}

function Divider() {
  return <span className="hidden h-8 w-px shrink-0 bg-white/30 xl:block" aria-hidden />;
}

export default function OfferRibbonCarousel({ ribbons }: { ribbons: ApiRibbon[] }) {
  // Drop ribbons that expired while the page was cached / left open.
  const [now, setNow] = useState(() => Date.now());
  const live = useMemo(() => ribbons.filter((r) => new Date(r.expiresAt).getTime() > now), [ribbons, now]);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [paused, setPaused] = useState(false);
  const count = live.length;
  const current = count > 0 ? live[index % count] : null;

  const go = useCallback(
    (step: 1 | -1) => {
      if (count < 2) return;
      setDirection(step === 1 ? 'next' : 'prev');
      setIndex((i) => (i + step + count) % count);
    },
    [count],
  );

  // Auto-advance only when there's more than one, and not while hovered/focused.
  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = window.setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, go]);

  // Re-check expiries every minute so an expired ribbon disappears without a reload.
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  if (!current) return null;

  const hasMany = count > 1;

  return (
    <section
      aria-label="Current offers"
      aria-roledescription={hasMany ? 'carousel' : undefined}
      className="relative overflow-hidden bg-[#1E293B] font-sans text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Decorative gradient corners (bottom-left, top-right) */}
      <CornerLeft className="pointer-events-none absolute bottom-0 left-0 h-7 w-[30px] md:h-14 md:w-[61px]" />
      <CornerRight className="pointer-events-none absolute right-0 top-0 h-7 w-[30px] md:h-14 md:w-[61px]" />

      {/* Mobile: near full width (8px sides, 8px gaps) so the text has room. Tablet+: grouped in the centre with fixed gaps. */}
      <div className="site-container relative flex min-h-[56px] items-center justify-between gap-2 py-2 max-md:!w-full max-md:px-2 md:justify-center md:gap-6 md:py-0 xl:gap-8">
        {hasMany ? <NavButton direction="prev" onClick={() => go(-1)} /> : null}

        {/* Keyed so each ribbon slides in from the direction of travel */}
        <div
          key={current.id}
          aria-live={hasMany && !paused ? 'off' : 'polite'}
          className={`flex min-w-0 flex-1 items-center justify-between gap-2 md:flex-none md:justify-center md:gap-6 xl:gap-8 ${
            hasMany ? (direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left') : ''
          }`}
        >
          {current.tag ? (
            <>
              <span className="hidden h-[29px] w-[170px] shrink-0 items-center justify-center rounded-[15px] border border-[#1BA83A] text-[13px] font-medium uppercase leading-[140%] shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)] xl:inline-flex">
                {current.tag}
              </span>
              <Divider />
            </>
          ) : null}

          {/* Title + offer: stacked on mobile, side by side from md */}
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 md:flex-none md:flex-row md:items-center md:gap-6 xl:contents">
            <p className="min-w-0 text-[14px] font-bold leading-[140%] md:text-[17px] xl:text-[20px]">
              {renderHighlights(current.title, gradientText)}
            </p>

            <Divider />

            <p className="min-w-0 text-[12px] font-medium leading-[140%] md:text-[15px] xl:text-[18px]">
              {renderHighlights(current.offer, greenText)}
            </p>
          </div>

          {current.ctaName ? (
            <CourseBrochureCta
              openModal
              type="contact"
              image="expert-call"
              // Same look as the homepage hero "Explore Courses" button (btn-brand), sized for the bar.
              className="btn-brand h-8 shrink-0 gap-2 px-3 !text-[13px] md:h-9 md:px-5 md:!text-[14px] xl:min-w-[164px] xl:!text-[15px]"
            >
              {current.ctaName}
              <ArrowRight className="btn-arrow-icon h-3.5 w-4 shrink-0" />
            </CourseBrochureCta>
          ) : null}
        </div>

        {hasMany ? <NavButton direction="next" onClick={() => go(1)} /> : null}
      </div>
    </section>
  );
}
