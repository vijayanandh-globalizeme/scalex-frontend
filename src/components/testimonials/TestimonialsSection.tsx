'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarSrc: string;
  quote: string;
  metricValue: string;
  metricLabel: string;
  fromLogoSrc: string;
  fromLogoAlt: string;
  toLogoSrc: string;
  toLogoAlt: string;
  linkedinUrl?: string;
}

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
  testimonials: Testimonial[];
  stats: StatBadge[];
  reviews: ReviewPlatform[];
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
    <div className="inline-flex h-[62px] min-w-[162px] items-center rounded-xl border border-zinc-100 bg-white px-3 py-2 shadow-lg shadow-zinc-900/10">
      <div className="flex w-full items-start gap-2.5">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}
          aria-hidden
        >
          {badge.icon ?? <DefaultStatIcon className="h-[18px] w-[18px]" />}
        </div>
        <div className="min-w-0">
          <p className="whitespace-nowrap text-[12px] font-medium leading-[16px] text-[#64748B]">{badge.label}</p>
          <p className="whitespace-nowrap text-[14px] font-bold leading-[20px] text-[#020817]">{badge.value}</p>
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

function TestimonialCard({
  testimonial,
  direction,
}: {
  testimonial: Testimonial;
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
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-100">
            <Image
              src={testimonial.avatarSrc}
              alt={`${testimonial.name} avatar`}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[15px] font-bold text-[#1E293B]">
              {testimonial.name}
              {testimonial.linkedinUrl ? (
                <a
                  href={testimonial.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${testimonial.name} on LinkedIn`}
                  className="text-[#0A66C2]"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </p>
            <p className="text-[12px] font-medium text-[#64748B]">{testimonial.role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="inline-flex items-center gap-1 text-[20px] font-extrabold text-[#F0593A]">
            {testimonial.metricValue}
            <ArrowUpRightIcon className="h-4 w-4 text-[#F0593A]" />
          </p>
          <p className="text-[12px] font-semibold text-[#F0593A]">{testimonial.metricLabel}</p>
        </div>
      </header>
      <p className="mt-4 text-[14px] leading-[22px] text-[#475569]">{testimonial.quote}</p>
      <footer className="mt-5 flex items-center gap-4">
        <div className="relative h-7 w-16">
          <Image src={testimonial.fromLogoSrc} alt={testimonial.fromLogoAlt} fill sizes="64px" className="object-contain object-left" />
        </div>
        <span className="text-[#F0593A]">→</span>
        <div className="relative h-7 w-20">
          <Image src={testimonial.toLogoSrc} alt={testimonial.toLogoAlt} fill sizes="80px" className="object-contain object-left" />
        </div>
      </footer>
    </article>
  );
}

export default function TestimonialsSection({
  heading,
  subheading,
  testimonials,
  stats,
  reviews,
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
      className="full-bleed relative overflow-hidden bg-[linear-gradient(89deg,#EF4444_-27.47%,#F4AA1F_90.29%,#83BC53_139.44%)] py-16 md:py-20 lg:py-24"
      aria-labelledby="stories-heading"
    >
      <div className="site-container relative z-10 px-4 sm:px-6 lg:px-0">
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
                    className="flex h-6 w-6 items-center justify-center rounded transition hover:text-white"
                  >
                    <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next testimonial"
                    className="flex h-6 w-6 items-center justify-center rounded transition hover:text-white"
                  >
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: stat badges in a staggered / zig-zag layout */}
          <div className="flex flex-col items-start gap-7">
            {stats.map((s, i) => {
              const offset =
                i === 0
                  ? 'ml-28'
                  : i === 1
                    ? 'ml-auto'
                    : i === 2
                      ? 'ml-40'
                      : 'ml-25';
              const variant: 'learners' | 'mentors' = i % 2 === 0 ? 'mentors' : 'learners';
              return (
                <div key={s.id} className={offset}>
                  <StatPill badge={s} iconVariant={variant} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: review platforms */}
        {reviews.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 items-center gap-6 rounded-2xl bg-white px-6 py-5 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.25)] sm:grid-cols-4 md:mt-12 md:px-10 md:py-6">
            {reviews.map((r) => (
              <div key={r.id} className="flex flex-col items-center gap-2">
                <div className="relative h-7 w-24">
                  <Image src={r.logoSrc} alt={r.logoAlt} fill sizes="96px" className="object-contain" />
                </div>
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1E293B]">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="#F4AA1F" aria-hidden>
                    <path d="M3.02 14.86c.29.23.66.15 1.1-.17l3.75-2.75 3.75 2.75c.44.32.8.4 1.1.17.29-.22.36-.58.18-1.09l-1.48-4.4 3.78-2.71c.44-.31.62-.64.5-.99-.11-.34-.44-.5-.99-.5h-4.64L8.66.78C8.49.26 8.23 0 7.87 0c-.36 0-.62.26-.79.78L5.67 5.17H1.03c-.55 0-.88.16-.99.5-.12.35.05.68.49.99l3.78 2.71-1.48 4.4c-.18.51-.11.87.18 1.09Z" />
                  </svg>
                  {r.rating}
                  <span className="font-medium text-[#64748B]">{r.reviewsLabel}</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
