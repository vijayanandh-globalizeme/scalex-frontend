'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CategoryCarouselControls } from '@/components/category/CategoryCarouselNav';

export interface AwardCard {
  id: string;
  title: string;
  subtitle: string;
  /** Optional two-line subtitle for embedded course cards. */
  subtitleLine1?: string;
  subtitleLine2?: string;
  /** Tailwind classes for card background gradient + accents. */
  variant: 'gold' | 'orange' | 'red';
  /** Optional solid background override (e.g. course page embedded cards). */
  backgroundColor?: string;
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
  id?: string;
  headingId?: string;
  className?: string;
  variant?: 'fullBleed' | 'embedded';
}

const VARIANT_STYLES: Record<AwardCard['variant'], { bg: string }> = {
  gold: { bg: 'bg-[#BB9255]' },
  orange: { bg: 'bg-[#CB3D4D]' },
  red: { bg: 'bg-[#4899C2]' },
};

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function MedalBadge({ src, alt, embedded = false }: { src?: string; alt?: string; embedded?: boolean }) {
  const sizeClass = embedded ? 'h-[68px] w-[68px]' : 'h-[100px] w-[100px]';
  const imageSize = embedded ? '68px' : '100px';

  if (src) {
    return (
      <div className={`relative ${sizeClass}`}>
        <Image
          src={src}
          alt={alt ?? 'Award medal'}
          fill
          sizes={imageSize}
          className="object-contain"
        />
      </div>
    );
  }
  return (
    <div
      className={`flex ${sizeClass} items-center justify-center rounded-full border-4 border-heading/80 bg-heading text-white shadow-md`}
      aria-hidden
    >
      <div className="flex flex-col items-center leading-none">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gold">Top</span>
        <span className="text-[24px] font-extrabold text-gold">10</span>
      </div>
    </div>
  );
}

function AwardCardItem({ card, embedded = false }: { card: AwardCard; embedded?: boolean }) {
  const styles = VARIANT_STYLES[card.variant];
  return (
    <article
      className={`relative h-[169px] w-full rounded-[16px] ${card.backgroundColor ? '' : styles.bg} px-5 pb-5 pt-12 text-white shadow-[0_10px_24px_-10px_rgba(15,23,42,0.25)] ${embedded ? '' : 'max-w-[412px]'}`}
      style={card.backgroundColor ? { backgroundColor: card.backgroundColor } : undefined}
    >
      <div
        className={`absolute left-1/2 z-20 -translate-x-1/2 ${embedded ? '-top-[34px]' : '-top-[50px]'}`}
      >
        <MedalBadge src={card.medalSrc} alt={card.medalAlt} embedded={embedded} />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
        <span
          className={`absolute right-0 ${embedded ? 'bottom-0 h-[80px] w-[80px]' : 'inset-y-0 w-1/2'}`}
          aria-hidden
        >
          <Image
            src="/images/xaero.png"
            alt=""
            fill
            sizes={embedded ? '80px' : '50vw'}
            className="object-contain object-right"
          />
        </span>
      </div>
      <div className="relative z-10 mt-2">
        <h3
          className={
            embedded
              ? 'text-[16px] font-semibold leading-[140%] text-white'
              : 'text-[20px] font-semibold leading-[140%] text-white'
          }
        >
          {card.title}
        </h3>
        {embedded && card.subtitleLine1 && card.subtitleLine2 ? (
          <div className="mt-5 text-[14px] font-normal leading-[140%] text-white">
            <p>{card.subtitleLine1}</p>
            <p>{card.subtitleLine2}</p>
          </div>
        ) : (
          <p className="mt-1 text-[14px] font-medium leading-[140%] text-white">{card.subtitle}</p>
        )}
      </div>
    </article>
  );
}

function CarouselControls({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
}) {
  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className="btn-mui-brand-tint flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-white text-accent"
      >
        <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5 rotate-180" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="btn-mui-icon-filled flex h-10 w-10 items-center justify-center rounded-full"
      >
        <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function AwardsSection({
  heading,
  subheading,
  cards,
  visibleCount = 3,
  autoplay = true,
  autoplayIntervalMs = 6000,
  id,
  headingId = 'awards-heading',
  className,
  variant = 'fullBleed',
}: AwardsSectionProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = cards.length;
  const isEmbedded = variant === 'embedded';

  // Show 1 card per slide on mobile, the configured count on md+
  const [perView, setPerView] = useState(visibleCount);
  useEffect(() => {
    const compute = () => setPerView(window.innerWidth < 768 ? 1 : visibleCount);
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [visibleCount]);

  const maxIndex = Math.max(0, total - perView);

  const goPrev = () =>
    setIndex((i) => (isEmbedded ? Math.max(0, i - 1) : i <= 0 ? maxIndex : i - 1));
  const goNext = () =>
    setIndex((i) => (isEmbedded ? Math.min(maxIndex, i + 1) : i >= maxIndex ? 0 : i + 1));

  useEffect(() => {
    if (!autoplay || maxIndex === 0 || isPaused || isEmbedded) return;
    const timerId = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, autoplayIntervalMs);
    return () => window.clearInterval(timerId);
  }, [autoplay, autoplayIntervalMs, isEmbedded, maxIndex, isPaused]);

  const slidePct = 100 / perView;
  const showControls = total > perView;

  const carousel = (
    <div
      className={`relative overflow-hidden pt-14 ${isEmbedded ? 'mt-6' : 'mt-10 md:mt-12'}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: `translateX(-${index * slidePct}%)`,
          gap: perView === 1 ? 0 : 24,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="shrink-0"
            style={{
              width: `calc(${slidePct}% - ${(24 * (perView - 1)) / perView}px)`,
            }}
          >
            <AwardCardItem card={card} embedded={isEmbedded} />
          </div>
        ))}
      </div>
    </div>
  );

  if (isEmbedded) {
    return (
      <section
        id={id}
        className={`scroll-mt-[116px] rounded-[20px] bg-transparent py-5 md:py-6 ${className ?? ''}`}
        aria-labelledby={headingId}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id={headingId} className="text-[34px] font-bold leading-tight text-heading">
            {heading}
          </h2>
          {showControls ? (
            <CategoryCarouselControls
              page={index}
              totalPages={maxIndex + 1}
              onPrev={goPrev}
              onNext={goNext}
              prevLabel="Previous awards"
              nextLabel="Next awards"
            />
          ) : null}
        </div>
        {subheading ? (
          <p className="mt-3 max-w-3xl text-[14px] font-medium leading-[140%] text-muted md:text-[15px]">
            {subheading}
          </p>
        ) : null}
        {carousel}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`full-bleed relative bg-surface pt-0 ${className ?? ''}`}
      aria-labelledby={headingId}
    >
      <div className="site-container relative z-10">
        <header className="mx-auto text-center">
          <h2
            id={headingId}
            className="text-[28px] font-bold leading-[140%] text-heading md:text-[34px]"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-3 text-[14px] font-medium leading-[140%] text-muted md:text-[15px]">
              {subheading}
            </p>
          ) : null}
        </header>

        {carousel}

        {showControls ? (
          <div className="mt-6">
            <CarouselControls
              onPrev={goPrev}
              onNext={goNext}
              prevLabel="Previous awards"
              nextLabel="Next awards"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
