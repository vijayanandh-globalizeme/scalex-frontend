'use client';

import Image from 'next/image';
import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import styles from './LogoMarquee.module.css';

export interface LogoMarqueeItem {
  id?: string;
  src?: string;
  alt: string;
  /** Optional explicit logo height in px (width stays auto via object-contain). */
  height?: number;
}

type LogoMarqueeSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<LogoMarqueeSize, string> = {
  sm: 'h-[33px] min-w-[60px] max-w-[130px] px-2',
  md: 'h-9 min-w-[100px] max-w-[160px] px-3',
  lg: 'h-11 min-w-[120px] max-w-[200px] px-3',
  xl: 'h-14 min-w-[140px] max-w-[240px] px-3',
};

/** ~2 large logos visible per mobile viewport; desktop marquee sizes unchanged. */
const largeMobileSizeClasses: Record<LogoMarqueeSize, string> = {
  sm: 'h-[27px] w-[56px] min-w-[56px] max-w-[56px] md:h-[33px] md:w-auto md:min-w-[60px] md:max-w-[130px] md:px-2',
  md: 'h-[26px] w-[65px] min-w-[65px] max-w-[65px] md:h-9 md:w-auto md:min-w-[100px] md:max-w-[160px] md:px-3',
  lg: 'h-[34px] w-[84px] min-w-[84px] max-w-[84px] md:h-11 md:w-auto md:min-w-[120px] md:max-w-[200px] md:px-3',
  xl: 'h-[40px] w-[96px] min-w-[96px] max-w-[96px] md:h-14 md:w-auto md:min-w-[140px] md:max-w-[240px] md:px-3',
};

const imageSizes: Record<LogoMarqueeSize, { width: number; height: number; sizes: string }> = {
  sm: { width: 56, height: 27, sizes: '(max-width: 767px) 56px, 130px' },
  md: { width: 65, height: 26, sizes: '(max-width: 767px) 65px, 160px' },
  lg: { width: 84, height: 34, sizes: '(max-width: 767px) 84px, 200px' },
  xl: { width: 96, height: 40, sizes: '(max-width: 767px) 96px, 240px' },
};

const desktopImageSizes: Record<LogoMarqueeSize, { width: number; height: number }> = {
  sm: { width: 130, height: 33 },
  md: { width: 160, height: 36 },
  lg: { width: 200, height: 44 },
  xl: { width: 240, height: 56 },
};

const TRACK_GAP_CLASS = 'items-center gap-6 md:gap-14 lg:gap-16';

function duplicateLogos(logos: LogoMarqueeItem[], copies: number) {
  return Array.from({ length: copies }, () => logos).flat();
}

function LogoSlot({
  logo,
  box,
  img,
  desktopImg,
  responsiveMobileDimensions,
}: {
  logo: LogoMarqueeItem;
  box: string;
  img: (typeof imageSizes)['md'];
  desktopImg: (typeof desktopImageSizes)['md'];
  responsiveMobileDimensions: boolean;
}) {
  const customHeight = logo.height;
  const imageWidth = responsiveMobileDimensions ? img.width : desktopImg.width;
  const imageHeight = customHeight ?? (responsiveMobileDimensions ? img.height : desktopImg.height);

  return (
    <div className={`flex shrink-0 items-center justify-center ${box}`}>
      {logo.src ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={imageWidth}
          height={imageHeight}
          className={
            customHeight
              ? 'w-auto max-w-full object-contain'
              : responsiveMobileDimensions
                ? 'h-full w-full object-contain md:h-auto md:max-h-full md:w-auto md:max-w-full'
                : 'h-auto max-h-full w-auto max-w-full object-contain'
          }
          style={customHeight ? { height: customHeight } : undefined}
          sizes={img.sizes}
        />
      ) : (
        <span className="text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-500 md:text-xs">
          {logo.alt}
        </span>
      )}
    </div>
  );
}

export default function LogoMarquee({
  logos,
  ariaLabel = 'Partner logos',
  size = 'md',
  reverse = false,
  className = '',
  largeOnMobile = false,
}: {
  logos: LogoMarqueeItem[];
  ariaLabel?: string;
  size?: LogoMarqueeSize;
  reverse?: boolean;
  className?: string;
  /** Larger logo slots on mobile (~2 visible); marquee on all breakpoints. */
  largeOnMobile?: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);
  const [loopPx, setLoopPx] = useState(0);

  const box = largeOnMobile ? largeMobileSizeClasses[size] : sizeClasses[size];
  const img = imageSizes[size];
  const desktopImg = desktopImageSizes[size];
  const responsiveMobileDimensions = largeOnMobile;
  const marqueeClass = responsiveMobileDimensions
    ? `${styles.marquee} ${styles.marqueeLargeMobile}`
    : styles.marquee;

  const marqueeLogos = useMemo(() => duplicateLogos(logos, copies), [logos, copies]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const measure = measureRef.current;
    if (!viewport || !measure || logos.length === 0) return undefined;

    const update = () => {
      const viewportWidth = viewport.offsetWidth;
      const singleSetWidth = measure.scrollWidth;
      if (viewportWidth === 0 || singleSetWidth === 0) return;

      const minTrackWidth = viewportWidth * 2;
      const neededCopies = Math.max(2, Math.ceil(minTrackWidth / singleSetWidth));
      setCopies((current) => (current === neededCopies ? current : neededCopies));
      setLoopPx(singleSetWidth);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [logos, size, largeOnMobile]);

  if (logos.length === 0) return null;

  const trackStyle = loopPx > 0
    ? ({ '--loop-distance': `${loopPx}px` } as CSSProperties)
    : undefined;

  const trackClass = [
    styles.track,
    loopPx > 0 ? styles.trackLoopReady : '',
    reverse ? styles.trackReverse : '',
    TRACK_GAP_CLASS,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={viewportRef} className={`${marqueeClass} ${className}`} aria-label={ariaLabel}>
      <div
        ref={measureRef}
        className={`pointer-events-none absolute flex opacity-0 ${TRACK_GAP_CLASS}`}
        aria-hidden
      >
        {logos.map((logo) => (
          <LogoSlot
            key={`measure-${logo.id ?? logo.alt}`}
            logo={logo}
            box={box}
            img={img}
            desktopImg={desktopImg}
            responsiveMobileDimensions={responsiveMobileDimensions}
          />
        ))}
      </div>

      <div className={trackClass} style={trackStyle}>
        {marqueeLogos.map((logo, index) => (
          <LogoSlot
            key={`${logo.id ?? logo.alt}-${index}`}
            logo={logo}
            box={box}
            img={img}
            desktopImg={desktopImg}
            responsiveMobileDimensions={responsiveMobileDimensions}
          />
        ))}
      </div>
    </div>
  );
}
