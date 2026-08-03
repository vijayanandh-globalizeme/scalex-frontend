'use client';

import { Children, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

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
  const arrowTransform =
    direction === 'prev' ? 'translate(18 18) scale(-1 1) translate(-18 -18)' : undefined;

  return (
    <svg
      className="btn-arrow-icon"
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
  canGoPrev: canGoPrevOverride,
  canGoNext: canGoNextOverride,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  canGoPrev?: boolean;
  canGoNext?: boolean;
}) {
  const canGoPrev = canGoPrevOverride ?? page > 0;
  const canGoNext = canGoNextOverride ?? page < totalPages - 1;

  if (totalPages <= 1 || (!canGoPrev && !canGoNext)) {
    return null;
  }

  const prevVariant = canGoPrev && !canGoNext ? 'filled' : 'outline';
  const nextVariant = canGoNext ? 'filled' : 'outline';

  const navButtonClass = (variant: 'outline' | 'filled') =>
    [
      'shrink-0 transition hover:opacity-90 disabled:cursor-not-allowed',
      variant === 'filled' ? 'disabled:opacity-40' : '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label={prevLabel}
        className={navButtonClass(prevVariant)}
      >
        <CarouselNavIcon direction="prev" variant={prevVariant} />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label={nextLabel}
        className={navButtonClass(nextVariant)}
      >
        <CarouselNavIcon direction="next" variant={nextVariant} />
      </button>
    </div>
  );
}

export function CategoryCarouselTrack({
  page,
  children,
  className,
  clipX = true,
  slideGap = 0,
}: {
  page: number;
  children: ReactNode[];
  className?: string;
  clipX?: boolean;
  /** Horizontal gap between slides in px (e.g. matches grid gap when paging). */
  slideGap?: number;
}) {
  const slides = Children.toArray(children);
  const slideCount = slides.length;
  const safePage = slideCount > 0 ? Math.min(Math.max(page, 0), slideCount - 1) : 0;
  const slideWidthPercent = slideCount > 0 ? 100 / slideCount : 100;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  const usePixelLayout = slideCount > 1;

  useLayoutEffect(() => {
    if (!usePixelLayout) {
      setViewportWidth(0);
      return undefined;
    }

    const el = viewportRef.current;
    if (!el) return undefined;

    const update = () => {
      const width = Math.round(el.clientWidth);
      if (width > 0) {
        setViewportWidth(width);
      }
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [usePixelLayout]);

  const slideStepPx = viewportWidth > 0 ? viewportWidth + slideGap : 0;
  const translateX = usePixelLayout && slideStepPx > 0 ? safePage * slideStepPx : null;

  return (
    <div
      ref={usePixelLayout ? viewportRef : undefined}
      className={`w-full min-w-0 ${
        clipX ? 'overflow-x-hidden overflow-y-visible' : 'overflow-visible'
      } ${className ?? ''}`}
    >
      <div
        className="flex items-start overflow-visible will-change-transform transition-transform duration-500 ease-in-out motion-reduce:transition-none"
        style={
          translateX != null
            ? { transform: `translate3d(-${translateX}px, 0, 0)` }
            : {
                width: `${slideCount * 100}%`,
                transform: `translate3d(-${safePage * slideWidthPercent}%, 0, 0)`,
              }
        }
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="box-border min-w-0 shrink-0 grow-0 overflow-visible"
            style={
              translateX != null
                ? {
                    flex: `0 0 ${viewportWidth}px`,
                    width: viewportWidth,
                    minWidth: viewportWidth,
                    maxWidth: viewportWidth,
                    marginRight: index < slideCount - 1 ? slideGap : 0,
                  }
                : { flex: `0 0 ${slideWidthPercent}%` }
            }
          >
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
