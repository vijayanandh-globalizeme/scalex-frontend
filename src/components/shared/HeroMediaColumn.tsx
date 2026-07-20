'use client';

import { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';

export interface HeroBadge {
  id: string;
  title: string;
  subtitle: string;
  variant: 'learners' | 'mentors';
  placement: 'top-left' | 'top-right' | 'mid-left' | 'bottom-center' | 'bottom-right';
}

export interface HeroMediaColumnProps {
  imageSrc: string;
  imageAlt: string;
  /** Decorative aero / X mark behind the person — only the right half is visible. */
  aeroSrc?: string | null;
  badges?: HeroBadge[];
  className?: string;
  disableGsap?: boolean;
  /** `figure` = cutout person + panel; `photo` = rounded photo card (category heroes). */
  variant?: 'figure' | 'photo';
}

/** Aero: fixed at 1500+; below 1500 width shrinks and top moves down dynamically. */
function getAeroSize(viewportWidth: number): {
  width: number;
  height: number;
  right: number;
  top: number;
} {
  const MAX_W = 400;
  const MAX_H = 490;
  const MAX_RIGHT = -150;
  const MAX_TOP = 78;

  const MIN_W = 300;
  const MIN_H = 368;
  const MIN_RIGHT = -120;
  const MIN_TOP = 130; // further down at smaller widths

  if (viewportWidth >= 1500) {
    return { width: MAX_W, height: MAX_H, right: MAX_RIGHT, top: MAX_TOP };
  }
  if (viewportWidth <= 1200) {
    return { width: MIN_W, height: MIN_H, right: MIN_RIGHT, top: MIN_TOP };
  }

  // 1200 → 1500: interpolate width + top (and height/right with them)
  const t = (viewportWidth - 1200) / 300; // 0 at 1200 → 1 at 1500
  return {
    width: Math.round(MIN_W + t * (MAX_W - MIN_W)),
    height: Math.round(MIN_H + t * (MAX_H - MIN_H)),
    right: Math.round(MIN_RIGHT + t * (MAX_RIGHT - MIN_RIGHT)),
    top: Math.round(MIN_TOP + t * (MAX_TOP - MIN_TOP)),
  };
}

function useAeroSize() {
  const [size, setSize] = useState({ width: 400, height: 490, right: -150, top: 78 });

  useEffect(() => {
    const update = () => setSize(getAeroSize(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}

function UsersBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M13.3337 17.5V15.8333C13.3337 14.9493 12.9825 14.1014 12.3573 13.4763C11.7322 12.8512 10.8844 12.5 10.0003 12.5H5.00033C4.11627 12.5 3.26842 12.8512 2.6433 13.4763C2.01818 14.1014 1.66699 14.9493 1.66699 15.8333V17.5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 2.60669C14.0478 2.792 14.6808 3.20941 15.1327 3.79341C15.5846 4.37741 15.8298 5.09493 15.8298 5.83336C15.8298 6.57178 15.5846 7.28931 15.1327 7.8733C14.6808 8.4573 14.0478 8.87471 13.333 9.06002"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.333 17.4999V15.8333C18.3325 15.0947 18.0866 14.3773 17.6341 13.7935C17.1817 13.2098 16.5481 12.7929 15.833 12.6083"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.50033 9.16667C9.34127 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34127 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AwardBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.8973 10.7417L14.1598 17.8467C14.1739 17.9304 14.1622 18.0163 14.1261 18.0932C14.0901 18.17 14.0315 18.2339 13.9581 18.2765C13.8847 18.3191 13.8 18.3383 13.7155 18.3315C13.6309 18.3246 13.5504 18.2922 13.4848 18.2384L10.5015 15.9992C10.3574 15.8916 10.1825 15.8335 10.0027 15.8335C9.82294 15.8335 9.64798 15.8916 9.50396 15.9992L6.51563 18.2375C6.45006 18.2912 6.36968 18.3237 6.28521 18.3305C6.20073 18.3373 6.11619 18.3182 6.04285 18.2758C5.9695 18.2333 5.91086 18.1695 5.87473 18.0928C5.83859 18.0162 5.8267 17.9303 5.84063 17.8467L7.10229 10.7417"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 11.6666C12.7614 11.6666 15 9.42805 15 6.66663C15 3.9052 12.7614 1.66663 10 1.66663C7.23858 1.66663 5 3.9052 5 6.66663C5 9.42805 7.23858 11.6666 10 11.6666Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingBadge({ badge, photo = false }: { badge: HeroBadge; photo?: boolean }) {
  const mobileVisibility = badge.id === 'learners-1' ? 'hidden md:block' : '';
  const placement = photo
    ? badge.placement === 'top-left'
      ? 'left-0 top-10 -translate-x-[40%]'
      : badge.placement === 'top-right'
        ? 'right-0 top-10 translate-x-[40%]'
        : badge.placement === 'mid-left'
          ? 'left-0 top-[55%] -translate-x-[40%] -translate-y-1/2'
          : badge.placement === 'bottom-right'
            ? 'bottom-[100px] right-0 translate-x-[10%]'
            : 'bottom-10 left-[42%] -translate-x-1/2 md:-bottom-2'
    : badge.placement === 'top-left'
      ? badge.id === 'learners-1'
        ? 'left-0 top-10 -translate-x-[20px] translate-y-[20px] xl:-left-6 xl:top-25'
        : 'left-0 top-10 xl:-left-6 xl:top-25'
      : badge.placement === 'top-right'
        ? 'right-0 top-10 xl:-right-6 xl:top-25'
        : badge.placement === 'mid-left'
          ? badge.id === 'learners-2'
            ? '-left-10 top-[60%] -translate-x-[30px] -translate-y-1/2 xl:-left-20'
            : 'left-0 top-[60%] -translate-y-1/2 xl:-left-10'
          : badge.placement === 'bottom-right'
            ? 'bottom-6 right-2 md:bottom-28 md:-right-10'
            : 'bottom-10 left-[42%] -translate-x-1/2 md:-bottom-2';

  const iconBg =
    badge.variant === 'learners'
      ? 'bg-[#CEFAFE] text-[#0092B8]'
      : 'bg-[#DBEAFE] text-[#155DFC]';

  const sizeClass =
    badge.variant === 'mentors'
      ? 'h-[62px] w-[180px] px-3 py-2'
      : 'max-w-[200px] px-3 py-2.5 md:px-4 md:py-3';

  const alignClass = badge.variant === 'mentors' ? 'h-full items-center' : 'items-start';
  const zIndexClass = badge.id === 'learners-2' ? 'z-[4]' : 'z-30';

  return (
    <div
      className={`absolute ${zIndexClass} rounded-xl border border-zinc-100 bg-white shadow-lg shadow-zinc-900/8 ${sizeClass} ${placement} ${mobileVisibility}`}
    >
      <div className={`flex gap-2.5 ${alignClass}`}>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
          aria-hidden
        >
          {badge.variant === 'learners' ? (
            <UsersBadgeIcon className="h-[18px] w-[18px]" />
          ) : (
            <AwardBadgeIcon className="h-[18px] w-[18px]" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-medium leading-[16px] text-subtle">{badge.title}</p>
          <p className="text-[14px] font-bold leading-[20px] text-strong">{badge.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

const HeroMediaColumn = forwardRef<HTMLDivElement, HeroMediaColumnProps>(
  (
    {
      imageSrc,
      imageAlt,
      aeroSrc = null,
      badges = [],
      className = '',
      disableGsap = false,
      variant = 'figure',
    },
    ref,
  ) => {
    const gsapClass = disableGsap ? '' : 'gsap-reveal-pending';
    const aeroSize = useAeroSize();
    const isPhoto = variant === 'photo';

    return (
      <div
        ref={ref}
        className={`${gsapClass} relative mx-auto w-full min-w-0 overflow-visible ${
          isPhoto ? 'max-w-[685px] lg:mx-0 lg:ml-auto' : 'max-w-md lg:mx-0 lg:max-w-none'
        } ${className}`.trim()}
      >
        {isPhoto ? (
          <div className="relative mx-auto w-full max-w-[685px] lg:ml-auto lg:mr-0">
            <div
              className="relative w-full overflow-hidden rounded-[16px] shadow-[0_4px_24px_0_rgba(30,41,59,0.12)]"
              style={{ maxWidth: 685, aspectRatio: '685 / 374' }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 685px"
                className="object-cover object-center"
              />
            </div>
          </div>
        ) : (
          <div className="relative mx-auto h-[420px] w-full max-w-[320px] sm:h-[480px] sm:max-w-[400px] md:h-[520px] md:max-w-[440px] lg:ml-auto lg:mr-0 lg:h-[560px] lg:max-w-[480px] xl:max-w-[520px] xl:h-[580px]">
            {aeroSrc ? (
              <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                <div
                  className="absolute lg:hidden"
                  style={{ top: 66, right: -150, width: 260, height: 320 }}
                >
                  <Image
                    src={aeroSrc}
                    alt=""
                    width={260}
                    height={320}
                    sizes="260px"
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <div
                  className="absolute hidden lg:block"
                  style={{
                    top: aeroSize.top,
                    right: aeroSize.right,
                    width: aeroSize.width,
                    height: aeroSize.height,
                  }}
                >
                  <Image
                    src={aeroSrc}
                    alt=""
                    width={aeroSize.width}
                    height={aeroSize.height}
                    sizes={`${aeroSize.width}px`}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
            ) : null}

            <div
              className="absolute bottom-0 left-1/2 z-[1] h-[360px] w-[389px] max-w-full -translate-x-1/2 rounded-t-[400px] shadow-inner shadow-black/5 sm:h-[420px] md:h-[460px] lg:h-[500px]"
              style={{ background: 'linear-gradient(180deg, #BB9255 -140.92%, #FADCBA 165.92%)' }}
              aria-hidden
            />

            <div className="absolute bottom-6 left-1/2 z-[5] h-[110%] w-[260px] -translate-x-1/2 sm:bottom-8 sm:w-[300px] md:w-[330px] lg:bottom-10 lg:w-[350px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 330px, 350px"
                className="object-contain object-bottom drop-shadow-xl"
              />
            </div>

            {badges.map((b) => (
              <FloatingBadge key={b.id} badge={b} />
            ))}
          </div>
        )}
      </div>
    );
  }
);

HeroMediaColumn.displayName = 'HeroMediaColumn';

export default HeroMediaColumn;
