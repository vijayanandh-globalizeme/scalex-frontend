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

const imageSizes: Record<LogoMarqueeSize, { width: number; height: number; sizes: string }> = {
  sm: { width: 130, height: 30, sizes: '130px' },
  md: { width: 160, height: 36, sizes: '160px' },
};

export default function LogoMarquee({
  logos,
  ariaLabel = 'Partner logos',
  size = 'md',
  reverse = false,
  className = '',
}: {
  logos: LogoMarqueeItem[];
  ariaLabel?: string;
  size?: LogoMarqueeSize;
  reverse?: boolean;
  className?: string;
}) {
  if (logos.length === 0) return null;

  const marqueeLogos = [...logos, ...logos];
  const box = sizeClasses[size];
  const img = imageSizes[size];

  return (
    <div className={`${styles.marquee} ${className}`} aria-label={ariaLabel}>
      <div
        className={`${styles.track} ${reverse ? styles.trackReverse : ''} flex w-max items-center gap-10 md:gap-14 lg:gap-16`}
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
                width={img.width}
                height={img.height}
                className="h-auto max-h-full w-auto max-w-full object-contain"
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
