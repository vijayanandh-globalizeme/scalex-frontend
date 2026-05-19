'use client';

import type { ReactNode } from 'react';

const ARROW_PATH =
  'M19.0888 23C19.244 23 19.3796 22.9347 19.5089 22.7968L23.8061 17.9861C23.9354 17.8483 24 17.6814 24 17.5C24 17.3186 23.9354 17.1517 23.8061 17.0139L19.5218 12.2177C19.3796 12.058 19.244 12 19.0888 12C18.7722 12 18.5266 12.2612 18.5266 12.624C18.5266 12.7982 18.5783 12.965 18.6818 13.0811L20.1293 14.7355L22.8239 17.5L20.1293 20.2645L18.6818 21.9188C18.5783 22.0277 18.5266 22.2019 18.5266 22.3759C18.5266 22.7388 18.7722 23 19.0888 23ZM12.5687 18.1458H20.7431L22.8239 18.0007C23.0888 17.9789 23.2697 17.7975 23.2697 17.5C23.2697 17.2025 23.0888 17.0211 22.8239 16.9993L20.7431 16.8542H12.5687C12.2326 16.8542 12 17.1227 12 17.5C12 17.8773 12.2326 18.1458 12.5687 18.1458Z';

type CarouselNavDirection = 'prev' | 'next';

export function CarouselNavIcon({
  direction,
  variant,
  size = 36,
}: {
  direction: CarouselNavDirection;
  variant: 'outline' | 'filled';
  size?: number;
}) {
  const arrowTransform = direction === 'next' ? 'translate(36 0) scale(-1 1)' : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden
    >
      {variant === 'filled' ? (
        <circle cx="18" cy="18" r="18" fill="#FD022D" />
      ) : (
        <circle cx="18" cy="18" r="17.5" fill="white" stroke="#FD022D" />
      )}
      <g transform={arrowTransform}>
        <path d={ARROW_PATH} fill={variant === 'filled' ? 'white' : '#FD022D'} />
      </g>
    </svg>
  );
}

export function CategoryCarouselControls({
  page,
  totalPages,
  onPrev,
  onNext,
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label={prevLabel}
        className="shrink-0 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CarouselNavIcon direction="prev" variant="outline" />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label={nextLabel}
        className="shrink-0 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CarouselNavIcon direction="next" variant="filled" />
      </button>
    </div>
  );
}

export function CategoryCarouselTrack({
  page,
  children,
  className,
}: {
  page: number;
  children: ReactNode[];
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <div
        className="flex will-change-transform transition-transform duration-300 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translate3d(-${page * 100}%, 0, 0)` }}
      >
        {children.map((slide, index) => (
          <div key={index} className="w-full shrink-0">
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}

export function chunkPages<T>(items: T[], pageSize: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += pageSize) {
    pages.push(items.slice(i, i + pageSize));
  }
  return pages.length > 0 ? pages : [[]];
}
