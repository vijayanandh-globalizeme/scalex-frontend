import Image from 'next/image';
import styles from './LogoMarquee.module.css';

export interface LogoMarqueeItem {
  id?: string;
  src?: string;
  alt: string;
}

type LogoMarqueeSize = 'sm' | 'md';

const sizeClasses: Record<LogoMarqueeSize, string> = {
  sm: 'h-[30px] min-w-[60px] max-w-[130px] px-2',
  md: 'h-9 min-w-[100px] max-w-[160px] px-3',
};

/** ~2 large logos visible per mobile viewport; desktop marquee sizes unchanged. */
const largeMobileSizeClasses: Record<LogoMarqueeSize, string> = {
  sm: 'h-6 w-[56px] min-w-[56px] max-w-[56px] md:h-[30px] md:w-auto md:min-w-[60px] md:max-w-[130px] md:px-2',
  md: 'h-[26px] w-[65px] min-w-[65px] max-w-[65px] md:h-9 md:w-auto md:min-w-[100px] md:max-w-[160px] md:px-3',
};

const imageSizes: Record<LogoMarqueeSize, { width: number; height: number; sizes: string }> = {
  sm: { width: 56, height: 24, sizes: '(max-width: 767px) 56px, 130px' },
  md: { width: 65, height: 26, sizes: '(max-width: 767px) 65px, 160px' },
};

const desktopImageSizes: Record<LogoMarqueeSize, { width: number; height: number }> = {
  sm: { width: 130, height: 30 },
  md: { width: 160, height: 36 },
};

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
  if (logos.length === 0) return null;

  const box = largeOnMobile ? largeMobileSizeClasses[size] : sizeClasses[size];
  const img = imageSizes[size];
  const desktopImg = desktopImageSizes[size];
  const marqueeLogos = [...logos, ...logos];
  const marqueeClass = largeOnMobile ? `${styles.marquee} ${styles.marqueeLargeMobile}` : styles.marquee;

  return (
    <div className={`${marqueeClass} ${className}`} aria-label={ariaLabel}>
      <div
        className={`${styles.track} ${reverse ? styles.trackReverse : ''} items-center gap-6 md:gap-14 lg:gap-16`}
      >
        {marqueeLogos.map((logo, index) => (
          <div
            key={`${logo.id ?? logo.alt}-${index}`}
            className={`flex shrink-0 items-center justify-center ${box}`}
          >
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={largeOnMobile ? img.width : desktopImg.width}
                height={largeOnMobile ? img.height : desktopImg.height}
                className={
                  largeOnMobile
                    ? 'h-full w-full object-contain md:h-auto md:max-h-full md:w-auto md:max-w-full'
                    : 'h-auto max-h-full w-auto max-w-full object-contain'
                }
                sizes={img.sizes}
              />
            ) : (
              <span className="text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-500 md:text-xs">
                {logo.alt}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
