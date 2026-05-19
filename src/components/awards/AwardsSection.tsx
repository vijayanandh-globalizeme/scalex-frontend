'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface AwardCard {
  id: string;
  title: string;
  subtitle: string;
  /** Tailwind classes for card background gradient + accents. */
  variant: 'gold' | 'orange' | 'red';
  /** Optional medal badge image (defaults to a built-in pseudo-medal). */
  medalSrc?: string;
  medalAlt?: string;
}

export interface AwardsSectionProps {
  heading: string;
  subheading: string;
  cards: AwardCard[];
  /** How many cards visible per "page" of the carousel on lg+. Defaults to 3. */
  visibleCount?: number;
  autoplay?: boolean;
  autoplayIntervalMs?: number;
}

const VARIANT_STYLES: Record<AwardCard['variant'], { bg: string }> = {
  gold: { bg: 'bg-[linear-gradient(150deg,#F5980F_-75.58%,#B9CA63_182.49%)]' },
  orange: { bg: 'bg-[linear-gradient(180deg,#EF4C40_-16.69%,#F5A416_121.61%)]' },
  red: { bg: 'bg-[#C24E48]' },
};

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function MedalBadge({ src, alt }: { src?: string; alt?: string }) {
  if (src) {
    return (
      <div className="relative h-[100px] w-[100px]">
        <Image src={src} alt={alt ?? 'Award medal'} fill sizes="100px" className="object-contain" />
      </div>
    );
  }
  return (
    <div
      className="flex h-[100px] w-[100px] items-center justify-center rounded-full border-4 border-heading/80 bg-heading text-white shadow-md"
      aria-hidden
    >
      <div className="flex flex-col items-center leading-none">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gold">Top</span>
        <span className="text-[24px] font-extrabold text-gold">10</span>
      </div>
    </div>
  );
}

function AwardCardItem({ card }: { card: AwardCard }) {
  const styles = VARIANT_STYLES[card.variant];
  return (
    <article
      className={`relative h-[169px] w-full max-w-[412px] rounded-2xl ${styles.bg} px-5 pb-5 pt-12 text-white shadow-[0_10px_24px_-10px_rgba(15,23,42,0.25)]`}
    >
      <div className="absolute -top-[50px] left-1/2 z-20 -translate-x-1/2">
        <MedalBadge src={card.medalSrc} alt={card.medalAlt} />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <span className="absolute inset-y-0 right-0 w-1/2" aria-hidden>
          <Image
            src="/images/xaero.png"
            alt=""
            fill
            sizes="50vw"
            className="object-contain object-right"
          />
        </span>
      </div>
      <div className="relative z-10 mt-2">
        <h3 className="text-[20px] font-semibold leading-[140%] text-white">{card.title}</h3>
        <p className="mt-1 text-[14px] font-medium leading-[140%] text-white">{card.subtitle}</p>
      </div>
    </article>
  );
}

export default function AwardsSection({
  heading,
  subheading,
  cards,
  visibleCount = 3,
  autoplay = true,
  autoplayIntervalMs = 6000,
}: AwardsSectionProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = cards.length;
  const maxIndex = Math.max(0, total - visibleCount);

  const goPrev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const goNext = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  useEffect(() => {
    if (!autoplay || maxIndex === 0 || isPaused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, autoplayIntervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayIntervalMs, maxIndex, isPaused]);

  const slidePct = 100 / visibleCount;

  return (
    <section
      className="full-bleed relative bg-surface pt-0"
      aria-labelledby="awards-heading"
    >
      <div className="site-container relative z-10">
        <header className="mx-auto text-center">
          <h2
            id="awards-heading"
            className="text-[28px] font-bold leading-[140%] text-heading md:text-[34px]"
          >
            {heading}
          </h2>
          <p className="mt-3 text-[14px] font-medium leading-[140%] text-muted md:text-[15px]">
            {subheading}
          </p>
        </header>

        <div
          className="relative mt-10 overflow-hidden pt-14 md:mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${index * slidePct}%)`,
              gap: 24,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="shrink-0"
                style={{
                  width: `calc(${slidePct}% - ${(24 * (visibleCount - 1)) / visibleCount}px)`,
                }}
              >
                <AwardCardItem card={card} />
              </div>
            ))}
          </div>
        </div>

        {total > visibleCount ? (
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous awards"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-white text-accent transition hover:bg-accent-soft"
            >
              <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next awards"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent-hover"
            >
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
