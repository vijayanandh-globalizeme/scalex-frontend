'use client';

import { forwardRef } from 'react';
import Image from 'next/image';

export interface HeroBadge {
  id: string;
  title: string;
  subtitle: string;
  variant: 'learners' | 'mentors';
  placement: 'top-left' | 'mid-left' | 'bottom-center' | 'bottom-right';
}

export interface HeroMediaColumnProps {
  imageSrc: string;
  imageAlt: string;
  badges?: HeroBadge[];
  className?: string;
  disableGsap?: boolean;
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

function FloatingBadge({ badge }: { badge: HeroBadge }) {
  const placement =
    badge.placement === 'top-left'
      ? 'left-0 top-10 xl:-left-6 xl:top-25'
      : badge.placement === 'mid-left'
        ? 'left-0 top-[60%] -translate-y-1/2 xl:-left-10'
        : badge.placement === 'bottom-right'
          ? 'bottom-32 right-2 md:bottom-28 md:-right-10'
          : 'bottom-10 left-[42%] -translate-x-1/2 md:-bottom-2';

  const iconBg =
    badge.variant === 'learners'
      ? 'bg-[#CEFAFE] text-[#0092B8]'
      : 'bg-[#DBEAFE] text-[#155DFC]';

  const sizeClass =
    badge.variant === 'mentors'
      ? 'h-[62px] w-[162px] px-3 py-2'
      : 'max-w-[200px] px-3 py-2.5 md:px-4 md:py-3';

  const alignClass = badge.variant === 'mentors' ? 'h-full items-center' : 'items-start';

  return (
    <div
      className={`absolute z-30 rounded-xl border border-zinc-100 bg-white shadow-lg shadow-zinc-900/8 ${sizeClass} ${placement}`}
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
  ({ imageSrc, imageAlt, badges = [], className = '', disableGsap = false }, ref) => {
    const gsapClass = disableGsap ? '' : 'gsap-reveal-pending';
    return (
      <div
        ref={ref}
        className={`${gsapClass} relative mx-auto w-full min-w-0 max-w-md overflow-visible lg:mx-0 lg:max-w-none ${className}`.trim()}
      >
        <div className="relative mx-auto aspect-[300/420] w-full max-w-[360px] overflow-visible pt-0 sm:ml-auto sm:mr-0 sm:aspect-[4/5] sm:max-w-[420px] sm:pt-14 lg:max-w-[480px] lg:pt-0">
          <div
            className="absolute right-5 bottom-0 z-[1] aspect-[389/549] w-[min(90%,310px)] rounded-t-[400px] shadow-inner shadow-black/5 sm:w-[min(100%,389px)]"
            style={{ background: 'linear-gradient(180deg, #BB9255 -140.92%, #FADCBA 165.92%)' }}
            aria-hidden
          />
          <div className="absolute right-4 bottom-0 z-[5] aspect-[350/554] w-[min(82%,290px)] translate-y-0 sm:right-6 sm:w-[min(90%,350px)] sm:-translate-y-[50px] lg:right-12">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 350px"
              className="object-contain object-bottom drop-shadow-xl"
            />
          </div>
          {badges.map((b) => (
            <FloatingBadge key={b.id} badge={b} />
          ))}
        </div>
      </div>
    );
  }
);

HeroMediaColumn.displayName = 'HeroMediaColumn';

export default HeroMediaColumn;
