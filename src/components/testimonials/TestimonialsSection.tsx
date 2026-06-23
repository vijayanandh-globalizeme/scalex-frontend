'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { LayoutSettings } from '@/services/layoutApi';
import type { Learner } from '@/services/peopleApi';

export type { Learner as Testimonial };

export interface StatBadge {
  id: string;
  label: string;
  value: string;
  /** Optional inline SVG icon. */
  icon?: React.ReactNode;
}

export interface ReviewPlatform {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  rating: string;
  reviewsLabel: string;
}

export interface TestimonialsSectionProps {
  heading: string;
  subheading: string;
  testimonials: Learner[];
  stats: StatBadge[];
  reviews: ReviewPlatform[];
  settings?: LayoutSettings;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57z" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function StoriesDecorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="188"
      height="206"
      viewBox="0 0 188 206"
      fill="none"
      aria-hidden
    >
      <g opacity="0.1">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.6735 60.9703L118.511 149.177L145.721 149.379L65.5219 61.1626L39.6735 60.9703Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M129.542 32.3058L30.2113 170.576C27.5358 174.3 26.9742 175.072 26.4 175.881C25.8257 176.689 25.4571 177.23 24.9149 178.06C24.3727 178.89 23.8598 179.696 21.3727 183.548L10.5259 200.35C9.74522 201.56 10.093 203.173 11.3027 203.953C12.3557 204.632 13.7433 204.466 14.6064 203.558L28.6332 188.797C31.7127 185.556 32.3396 184.903 32.9798 184.225C33.6199 183.546 34.0219 183.107 34.6403 182.408C35.2588 181.71 35.8527 181.027 38.8047 177.67L149.897 51.3323C151.386 49.6387 152.754 47.842 153.99 45.9557C155.82 43.1651 156.826 43.7878 157.007 47.8248C157.134 50.6399 157.307 54.4922 157.527 59.3815C157.828 66.0794 163.504 71.2651 170.204 70.964C176.904 70.663 182.091 64.9892 181.79 58.2913L179.934 17.0093C179.919 16.6744 179.907 16.3394 179.899 16.0043C179.744 9.4739 178.642 5.49954 176.594 4.0812C171.241 0.373318 159.749 2.43344 156.605 2.96511C152.21 3.70838 136.662 5.88837 109.962 9.50508C104.229 10.2817 100.211 15.5575 100.988 21.289C101.032 21.6135 101.091 21.9358 101.165 22.2547L101.222 22.4967C102.656 28.6608 108.637 32.6474 114.881 31.5999L125.617 29.7981C125.854 29.7584 126.09 29.7169 126.326 29.6736C128.534 29.2679 129.858 29.2245 130.298 29.5426C130.76 29.8766 130.508 30.7977 129.542 32.3058Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

function StatPill({
  badge,
  iconVariant = 'mentors',
}: {
  badge: StatBadge;
  iconVariant?: 'learners' | 'mentors';
}) {
  const iconBg =
    iconVariant === 'learners'
      ? 'bg-[#CEFAFE] text-[#0092B8]'
      : 'bg-[#DBEAFE] text-[#155DFC]';

  return (
    <div className="inline-flex h-[62px] w-full min-w-[162px] items-center rounded-xl border border-zinc-100 bg-white px-3 py-2 shadow-lg shadow-zinc-900/10 sm:w-auto">
      <div className="flex w-full items-start gap-2.5">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
          aria-hidden
        >
          {badge.icon ?? <DefaultStatIcon className="h-[18px] w-[18px]" />}
        </div>
        <div className="min-w-0">
          <p className="whitespace-nowrap text-[12px] font-medium leading-[16px] text-subtle">{badge.label}</p>
          <p className="whitespace-nowrap text-[14px] font-bold leading-[20px] text-strong">{badge.value}</p>
        </div>
      </div>
    </div>
  );
}

function DefaultStatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M2.5 13.33L7.5 8.33l3.33 3.34 6.67-6.67M11.67 5h5.83v5.83"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M2.5 13.33L7.5 8.33l3.33 3.34 6.67-6.67M11.67 5h5.83v5.83"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RupeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 4.17h10M5 7.5h10M12.92 16.67L5 9.17h2.5c4.17 0 4.17-5 0-5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SwitchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M14.17 2.5L17.5 5.83l-3.33 3.34M2.5 5.83h15M5.83 17.5L2.5 14.17l3.33-3.34M17.5 14.17h-15"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PartnersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M13.33 17.5v-1.67c0-.88-.35-1.73-.97-2.36-.63-.62-1.48-.97-2.36-.97H5c-.88 0-1.73.35-2.36.97-.62.63-.97 1.48-.97 2.36v1.67M13.33 2.61c.72.18 1.35.6 1.8 1.18.45.59.7 1.3.7 2.04s-.25 1.46-.7 2.04c-.45.59-1.08 1-1.8 1.19M18.33 17.5v-1.67c0-.74-.25-1.46-.7-2.04-.45-.58-1.08-1-1.8-1.19M7.5 9.17a3.33 3.33 0 100-6.67 3.33 3.33 0 000 6.67z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const REVIEW_PLATFORM_CONFIG: {
  key: keyof Pick<LayoutSettings, 'GOOGLE_REVIEW' | 'FACEBOOK_REVIEW' | 'TRUST_PILOT_REVIEW' | 'SWTICH_UP_REVIEW'>;
  name: string;
  logoSrc: string;
  logoAlt: string;
}[] = [
  { key: 'GOOGLE_REVIEW', name: 'Google', logoSrc: '/images/hero/google.png', logoAlt: 'Google reviews' },
  { key: 'FACEBOOK_REVIEW', name: 'Facebook', logoSrc: '/images/hero/facebook.png', logoAlt: 'Facebook reviews' },
  { key: 'TRUST_PILOT_REVIEW', name: 'Trust Pilot', logoSrc: '/images/hero/trust_pilot.png', logoAlt: 'Trustpilot reviews' },
  { key: 'SWTICH_UP_REVIEW', name: 'Switch Up', logoSrc: '/images/hero/switchup.png', logoAlt: 'SwitchUp reviews' },
];

export function ReviewPlatformRow({ reviews, settings }: { reviews?: ReviewPlatform[]; settings?: LayoutSettings }) {
  const items = settings
    ? REVIEW_PLATFORM_CONFIG.flatMap((cfg) => {
        const entry = settings[cfg.key];
        if (!entry) return [];
        return [{
          id: cfg.key,
          logoSrc: cfg.logoSrc,
          logoAlt: cfg.logoAlt,
          rating: `${entry.rating}/5`,
          reviewsLabel: `${entry.count.toLocaleString()} Reviews`,
        }];
      })
    : (reviews ?? []);

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-14"
      aria-label="Review platforms"
    >
      {items.map((review) => (
        <div
          key={review.id}
          className="flex shrink-0 flex-col items-center gap-2 min-w-[140px] px-2"
        >
          <div className="relative h-7 w-24">
            <Image src={review.logoSrc} alt={review.logoAlt} fill sizes="96px" className="object-contain" />
          </div>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-heading">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-black" aria-hidden>
              <path
                d="M3.01902 14.8627C3.30952 15.0888 3.67795 15.0111 4.11724 14.6932L7.86538 11.9453L11.6206 14.6932C12.0598 15.0111 12.4212 15.0888 12.7188 14.8627C13.0093 14.6437 13.073 14.2835 12.8959 13.7678L11.4151 9.37398L15.1986 6.66138C15.638 6.35057 15.8151 6.02562 15.7017 5.67242C15.5883 5.33335 15.2553 5.17087 14.7098 5.17087H10.0689L8.65889 0.784104C8.4889 0.261369 8.2338 0 7.86538 0C7.50399 0 7.24894 0.261369 7.0789 0.784104L5.66892 5.17087H1.02805C0.482481 5.17087 0.149473 5.33335 0.0361076 5.67242C-0.0843426 6.02562 0.099875 6.35057 0.539164 6.66138L4.32271 9.37398L2.84188 13.7678C2.66475 14.2835 2.72852 14.6437 3.01902 14.8627Z"
                fill="currentColor"
              />
            </svg>
            {review.rating}
            <span className="font-medium text-subtle">{review.reviewsLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  direction,
}: {
  testimonial: Learner;
  direction: 'next' | 'prev';
}) {
  const animationClass =
    direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left';
  return (
    <article
      className={`${animationClass} relative mt-8 w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.25)] md:mt-12 md:p-7`}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {testimonial.avatarUrl ? (
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-100">
              <Image
                src={testimonial.avatarUrl}
                alt={`${testimonial.name} avatar`}
                fill
                sizes="48px"
                className="object-cover object-top"
              />
            </div>
          ) : null}
          <div>
            <p className="text-[15px] font-bold text-heading">{testimonial.name}</p>
            <p className="text-[12px] font-medium text-subtle">{testimonial.currentRole}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="inline-flex items-center gap-1 text-[20px] font-extrabold text-brand">
            {testimonial.hike}
            <ArrowUpRightIcon className="h-4 w-4 text-brand" />
          </p>
          <p className="text-[12px] font-semibold text-brand">Salary Hike</p>
        </div>
      </header>
      <p className="mt-4 text-[14px] leading-[22px] text-body">{testimonial.review}</p>
      {(testimonial.prevCompanyUrl || testimonial.currentCompanyUrl) ? (
        <footer className="mt-5 flex items-center gap-4">
          {testimonial.prevCompanyUrl ? (
            <div className="relative h-7 w-16">
              <Image src={testimonial.prevCompanyUrl} alt="Previous company" fill sizes="64px" className="object-contain object-left" />
            </div>
          ) : null}
          {testimonial.prevCompanyUrl && testimonial.currentCompanyUrl ? (
            <span className="text-brand">→</span>
          ) : null}
          {testimonial.currentCompanyUrl ? (
            <div className="relative h-7 w-20">
              <Image src={testimonial.currentCompanyUrl} alt="Current company" fill sizes="80px" className="object-contain object-left" />
            </div>
          ) : null}
        </footer>
      ) : null}
    </article>
  );
}

export default function TestimonialsSection({
  heading,
  subheading,
  testimonials,
  stats,
  reviews,
  settings,
}: TestimonialsSectionProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;
  const current = testimonials[index] ?? testimonials[0];

  const goPrev = () => {
    setDirection('prev');
    setIndex((i) => (i - 1 + total) % total);
  };
  const goNext = () => {
    setDirection('next');
    setIndex((i) => (i + 1) % total);
  };

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const id = window.setInterval(() => {
      setDirection('next');
      setIndex((i) => (i + 1) % total);
    }, 5000);
    return () => window.clearInterval(id);
  }, [total, isPaused, index]);

  return (
    <section
      className="full-bleed relative z-10 overflow-visible bg-[#0D0D0D] py-16 pb-20 md:py-20 md:pb-28 lg:py-24 lg:pb-32"
      aria-labelledby="stories-heading"
    >
      <StoriesDecorIcon className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-[120px] md:w-[160px] lg:w-[188px]" />
      <div className="site-container relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left: heading & subheading */}
          <div className="text-white lg:self-center">
            <h2 id="stories-heading" className="text-[28px] font-extrabold leading-tight md:text-[34px]">
              {heading.split(',').map((line, i, arr) => (
                <span key={i} className="block">
                  {line.trim()}
                  {i < arr.length - 1 ? ',' : ''}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-xs text-[14px] font-medium leading-[22px] text-white/85 md:text-[15px]">
              {subheading}
            </p>
          </div>

          {/* Center: testimonial card with carousel arrows below at right */}
          <div className="flex flex-col items-center">
            <div
              className="w-full max-w-[520px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {current ? (
                <TestimonialCard
                  key={current.id}
                  testimonial={current}
                  direction={direction}
                />
              ) : null}
              {total > 1 ? (
                <div className="mt-3 flex items-center justify-end gap-3 text-white/85">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous testimonial"
                    className="btn-mui-dark-tint flex h-6 w-6 items-center justify-center rounded"
                  >
                    <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next testimonial"
                    className="btn-mui-dark-tint flex h-6 w-6 items-center justify-center rounded"
                  >
                    <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: stat badges in a staggered / zig-zag layout */}
          <div className="flex flex-col items-center gap-7 sm:items-start">
            {stats.map((s, i) => {
              const offset =
                i === 0
                  ? 'sm:ml-10 xl:ml-28'
                  : i === 1
                    ? 'sm:ml-auto'
                    : i === 2
                      ? 'sm:ml-12 xl:ml-40'
                      : 'sm:ml-8 xl:ml-25';
              const variant: 'learners' | 'mentors' = i % 2 === 0 ? 'mentors' : 'learners';
              return (
                <div key={s.id} className={`w-full sm:w-auto ${offset}`}>
                  <StatPill badge={s} iconVariant={variant} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: review platforms — overlaps the next section by ~50% */}
        {(settings || reviews.length > 0) ? (
          <div className="relative z-50 mt-10 mb-[-30px] translate-y-[20%] rounded-2xl bg-white px-6 py-5 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.25)] md:mt-12 md:mb-[-112px] md:translate-y-1/2 md:px-10 md:py-6">
            <ReviewPlatformRow settings={settings} reviews={reviews} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
