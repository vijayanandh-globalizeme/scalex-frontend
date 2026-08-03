'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CategoryTitleUnderline from '@/components/category/CategoryTitleUnderline';
import { LogoMarquee, useAeroSize } from '@/components/shared';
import {
  HOME_LOGO_MARQUEE_CLASSNAME,
  HOME_LOGO_MARQUEE_SIZE,
  HOME_LOGO_MARQUEE_WRAPPER_CLASS,
} from '@/components/shared/homeLogoMarquee';
import type { HeroBadge } from '@/components/hero/HeroSection';
import { useGsapScrollRevealStagger } from '@/hooks/useGsapScrollReveal';
import type { TechnicalCourseContent } from '@/lib/technicalCourses';
import { withNewTabLinks } from '@/lib/richText';
import CourseBrochureCta from './CourseBrochureCta';
import TechnicalCourseWebinarCountdown from './TechnicalCourseWebinarCountdown';

/** Fixed mobile aero position/size (sub-lg) — matches homepage hero. */
const MOBILE_AERO_SIZE = { width: 180, height: 180, right: -85, top: 27 };

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 6.5L8 2l5.5 4.5V13a1 1 0 01-1 1h-3.5v-4H7v4H3.5a1 1 0 01-1-1V6.5z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      aria-hidden
    >
      <path
        d="M13.1487 0.96013L14.6829 2.50848C14.8423 2.66027 14.9818 2.71087 15.191 2.71087H17.3427C19.1359 2.71087 19.9528 3.56094 19.9528 5.36229V7.55831C19.9528 7.76071 20.0126 7.91251 20.162 8.06431L21.6862 9.62277C22.9414 10.8979 22.9514 12.0819 21.6862 13.357L20.162 14.9155C20.0126 15.0774 19.9528 15.2191 19.9528 15.4316V17.6175C19.9528 19.439 19.126 20.2689 17.3427 20.2689H15.191C14.9818 20.2689 14.8423 20.3296 14.6829 20.4814L13.1487 22.0297C11.8935 23.3049 10.728 23.315 9.47271 22.0297L7.93855 20.4814C7.78912 20.3296 7.63969 20.2689 7.44044 20.2689H5.27867C3.49546 20.2689 2.6686 19.429 2.6686 17.6175V15.4316C2.6686 15.2191 2.61879 15.0774 2.46936 14.9155L0.945157 13.357C-0.310066 12.0819 -0.320029 10.8979 0.945157 9.62277L2.46936 8.06431C2.61879 7.91251 2.6686 7.76071 2.6686 7.55831V5.36229C2.6686 3.54071 3.49546 2.71087 5.27867 2.71087H7.44044C7.63969 2.71087 7.78912 2.66027 7.93855 2.50848L9.47271 0.96013C10.728 -0.314978 11.8935 -0.325098 13.1487 0.96013ZM14.4139 7.47735L10.1601 14.4196L8.13779 11.7682C7.88874 11.4342 7.66957 11.3331 7.39064 11.3331C6.93238 11.3331 6.5837 11.7075 6.5837 12.173C6.5837 12.3957 6.67336 12.6284 6.8228 12.8308L9.32328 15.9477C9.58229 16.3019 9.86123 16.4335 10.1999 16.4335C10.5386 16.4335 10.8275 16.2715 11.0368 15.9477L15.7189 8.44886C15.8385 8.24647 15.968 8.01371 15.968 7.78095C15.968 7.31543 15.5596 7.01184 15.1312 7.01184C14.8622 7.01184 14.6032 7.16364 14.4139 7.47735Z"
        fill="#1E293B"
      />
    </svg>
  );
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

function FloatingBadge({
  badge,
  innerRef,
}: {
  badge: HeroBadge;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  const isTopLeftPrimary = badge.id === 'learners-1' || badge.id === 'package';
  const isMidLeftSecondary = badge.id === 'learners-2' || badge.id === 'partners';

  const isSalary = badge.id === 'salary';

  const placement =
    badge.placement === 'top-left'
      ? isTopLeftPrimary
        ? 'left-0 top-10 -translate-x-[20px] translate-y-[20px] xl:-left-6 xl:top-25'
        : 'left-0 top-10 xl:-left-6 xl:top-25'
      : badge.placement === 'mid-left'
        ? isMidLeftSecondary
          ? '-left-10 top-[60%] -translate-x-[30px] -translate-y-1/2 xl:-left-20'
          : 'left-0 top-[60%] -translate-y-1/2 xl:-left-10'
        : badge.placement === 'bottom-right'
          ? isSalary
            ? 'bottom-[30px] max-md:right-0 max-md:z-40 right-[-52px] lg:right-2 lg:-right-10'
            : 'bottom-6 right-2 lg:bottom-28 lg:-right-10'
          : 'bottom-10 left-[42%] -translate-x-1/2 md:-bottom-2';

  const mobileVisibility = isMidLeftSecondary ? 'hidden lg:block' : '';

  const iconBg =
    badge.variant === 'learners'
      ? 'bg-[#CEFAFE] text-[#0092B8]'
      : 'bg-[#DBEAFE] text-[#155DFC]';

  const sizeClass =
    badge.variant === 'mentors'
      ? 'h-[48px] w-[140px] px-2.5 py-1.5 lg:h-[62px] lg:w-[180px] lg:px-3 lg:py-2'
      : 'w-max max-w-[150px] px-2.5 py-2 lg:max-w-[200px] lg:px-3 lg:py-2.5';

  const alignClass = badge.variant === 'mentors' ? 'items-center' : 'items-start';

  return (
    <div className={`absolute z-30 max-md:z-40 ${placement} ${mobileVisibility}`}>
      <div
        ref={innerRef}
        className={`flex gap-2 rounded-xl border border-zinc-100 bg-white shadow-lg shadow-zinc-900/8 lg:gap-2.5 ${sizeClass} ${alignClass}`}
      >
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full lg:h-9 lg:w-9 ${iconBg}`}
          aria-hidden
        >
          {badge.variant === 'learners' ? (
            <UsersBadgeIcon className="h-[14px] w-[14px] lg:h-[18px] lg:w-[18px]" />
          ) : (
            <AwardBadgeIcon className="h-[14px] w-[14px] lg:h-[18px] lg:w-[18px]" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-medium leading-[13px] text-subtle lg:text-[12px] lg:leading-[16px]">
            {badge.title}
          </p>
          <p className="text-[12px] font-bold leading-[16px] text-strong lg:text-[14px] lg:leading-[20px]">
            {badge.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroMediaColumn({
  figureSrc,
  figureAlt,
  badges,
  aeroSrc = '/images/hero/aero-bg-v2.png',
  aeroShiftRight = false,
  figureAlign = 'right',
}: {
  figureSrc: string;
  figureAlt: string;
  badges: HeroBadge[];
  aeroSrc?: string | null;
  /** CSM only — nudge aero further right */
  aeroShiftRight?: boolean;
  /** DevOps — anchor figure and gradient pill to the left */
  figureAlign?: 'left' | 'right';
}) {
  const isLeft = figureAlign === 'left';
  const aeroSize = useAeroSize();
  const aeroRight = aeroShiftRight ? aeroSize.right - 40 : aeroSize.right;
  const mobileAeroRight = aeroShiftRight ? MOBILE_AERO_SIZE.right - 40 : MOBILE_AERO_SIZE.right;
  const aeroWrapRef = useRef<HTMLDivElement | null>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Desktop: entrance plays immediately on load. Mobile: same entrance, but deferred until
  // the media column scrolls into view instead of firing while it's still off-screen.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const badgeEls = badgeRefs.current.filter(Boolean) as HTMLDivElement[];
      const scrollTrigger =
        !isDesktop && containerRef.current
          ? { trigger: containerRef.current, start: 'top 85%', once: true }
          : undefined;

      // Desktop delays land inside the tail of this column's own
      // useGsapScrollRevealStagger fade (delay 0.55 + duration 1.6, ~0.55s to become
      // visibly noticeable) so the slide is still seen, without waiting for it to fully finish.
      if (badgeEls.length) {
        gsap.fromTo(
          badgeEls,
          { autoAlpha: 0, x: 36 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            delay: isDesktop ? 1.3 : 0,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger,
          },
        );
      }

      if (aeroWrapRef.current) {
        gsap.fromTo(
          aeroWrapRef.current,
          { autoAlpha: 0, x: -48 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            delay: isDesktop ? 1.0 : 0,
            ease: 'power2.out',
            scrollTrigger,
          },
        );
      }

      if (!isDesktop) requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, [badges.length, aeroSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full min-w-0 max-w-md overflow-visible max-md:max-w-full lg:mx-0 lg:max-w-none ${isLeft ? 'lg:translate-x-0' : 'lg:-translate-x-[10%]'}`}
    >
      <div
        className={`relative overflow-visible max-md:mx-auto max-md:h-[320px] max-md:w-full max-md:max-w-[260px] md:h-[400px] md:w-[300px] md:mx-[32px] lg:h-[537px] lg:w-[444px] lg:max-w-none lg:left-[80px] lg:mx-0 ${isLeft ? 'lg:ml-0 lg:mr-auto' : 'lg:ml-auto lg:mr-0'}`}
      >
        {aeroSrc ? (
          <div ref={aeroWrapRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <div
              className="absolute lg:hidden"
              style={{
                top: MOBILE_AERO_SIZE.top,
                right: mobileAeroRight,
                width: MOBILE_AERO_SIZE.width,
                height: MOBILE_AERO_SIZE.height,
              }}
            >
              <Image
                src={aeroSrc}
                alt=""
                width={MOBILE_AERO_SIZE.width}
                height={MOBILE_AERO_SIZE.height}
                sizes={`${MOBILE_AERO_SIZE.width}px`}
                className="h-full w-full object-contain object-center"
              />
            </div>
            <div
              className="absolute hidden lg:block"
              style={{
                top: aeroSize.top,
                right: aeroRight,
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
          className={`absolute bottom-0 z-[1] h-[400px] w-[min(100%,389px)] max-md:left-1/2 max-md:h-[320px] max-md:w-[min(100%,280px)] max-md:-translate-x-1/2 rounded-t-[400px] shadow-inner shadow-black/5 lg:h-[537px] ${isLeft ? 'md:left-[10px]' : 'md:right-5'}`}
          style={{
            background: 'linear-gradient(180deg, #BB9255 -140.92%, #FADCBA 165.92%)',
          }}
          aria-hidden
        />
        <div
          className={`absolute bottom-0 z-[5] aspect-[350/544] w-[min(90%,350px)] max-md:left-1/2 max-md:w-[min(75%,240px)] max-md:-translate-x-1/2 ${isLeft ? 'md:left-[10px]' : 'md:right-2 lg:right-6'}`}
        >
          <Image
            src={figureSrc}
            alt={figureAlt}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 350px"
            className="object-contain object-bottom drop-shadow-xl"
          />
        </div>
        {badges.map((badge, index) => (
          <FloatingBadge
            key={badge.id}
            badge={badge}
            innerRef={(el) => {
              badgeRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RankedContent({ rankedContent, rankingLine }: { rankedContent?: string; rankingLine: { highlight: string; rest: string } }) {
  if (rankedContent) {
    const parts = rankedContent.split(/\*\*(.+?)\*\*/g);
    return (
      <p className="mt-6 text-[16px] font-bold leading-normal [&_a]:text-brand [&_a]:no-underline [&_a]:hover:underline [&_a]:underline-offset-2">
        {parts.map((part, i) =>
          i % 2 === 1
            ? <span key={i} className="text-brand" dangerouslySetInnerHTML={{ __html: withNewTabLinks(part) }} />
            : <span key={i} className="text-heading" dangerouslySetInnerHTML={{ __html: withNewTabLinks(part) }} />,
        )}
      </p>
    );
  }
  if (!rankingLine.highlight && !rankingLine.rest) return null;
  return (
    <p className="mt-6 text-[16px] font-bold leading-normal">
      <span className="text-brand">{rankingLine.highlight}</span>{' '}
      <span className="text-heading">{rankingLine.rest}</span>
    </p>
  );
}

export default function TechnicalCourseHeroSection(course: TechnicalCourseContent) {
  const {
    courseId,
    slug,
    categorySlug,
    breadcrumbs,
    heroTitle,
    shortDescription,
    features,
    rankedContent,
    rankingLine,
    reviews,
    learnersStat,
    heroBadges,
    collaboration,
    hiringPartners,
    startedAt,
    brochureUrl,
  } = course;
  const isCsmPage = slug === 'certified-scrum-master' && categorySlug === 'agile-and-scrum';
  const isDevopsPage = slug === 'devops-certification-training' && categorySlug === 'devops';
  const heroFigureSrc = isDevopsPage ? '/images/hero-1.png' : '/images/hero/person.png';

  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  rowRefs.current.length = 2;

  useGsapScrollRevealStagger(
    sectionRef,
    rowRefs,
    {
      y: 48,
      duration: 1.6,
      delay: 0.55,
      ease: 'power2.out',
      start: 'top 88%',
    },
    [],
  );

  const googleReview = reviews.find((r) => r.id === 'google');
  const trustpilotReview = reviews.find((r) => r.id === 'trustpilot');
  const formatRating = (rating: string) => (rating.includes('/') ? rating : `${rating}/5`);
  const reviewsLabel = googleReview?.reviewsLabel ?? trustpilotReview?.reviewsLabel;
  const reviewsUrl = googleReview?.url ?? trustpilotReview?.url;

  return (
    <section
      ref={sectionRef}
      className="full-bleed relative overflow-y-visible bg-[#F5F6F8] max-md:overflow-x-visible max-md:pt-10 max-md:pb-15 pb-0 md:overflow-x-clip md:pt-10"
      aria-labelledby="technical-course-hero-heading"
    >
      <div
        className="category-hero-bg pointer-events-none absolute inset-0"
        style={{ backgroundColor: '#F5F6F8' }}
        aria-hidden
      />
      <div className="site-container relative z-10 max-md:min-w-0 max-md:max-w-full">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[14px] font-medium">
          <Link href="/" className="text-muted transition hover:text-heading" aria-label="Home">
            <HomeIcon className="h-4 w-4" />
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="inline-flex items-center gap-2">
              <span className="text-muted" aria-hidden>
                &gt;
              </span>
              {index === breadcrumbs.length - 1 ? (
                <span className="text-brand">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-muted transition hover:text-heading">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        <div className="grid min-w-0 items-start gap-10 max-md:gap-6 lg:grid-cols-[minmax(0,690px)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
          <div
            ref={(el) => {
              rowRefs.current[0] = el;
            }}
            className="gsap-reveal-pending w-full min-w-0 max-w-[690px] max-md:max-w-full"
          >
            <h1 id="technical-course-hero-heading" className="text-heading">
              <span className="block text-[34px] font-extrabold leading-[1.25] text-heading sm:text-[40px] sm:leading-[60px]">
                {heroTitle}
              </span>
              <CategoryTitleUnderline />
            </h1>

            {shortDescription ? (
              <p
                className="mt-5 max-w-xl text-[15px] font-semibold leading-6 text-muted [&_a]:text-brand [&_a]:no-underline [&_a]:hover:underline [&_a]:underline-offset-2 md:text-[18px]"
                dangerouslySetInnerHTML={{ __html: withNewTabLinks(shortDescription) }}
              />
            ) : null}

            <div className="mt-[28px] flex min-w-0 max-w-full flex-wrap items-center gap-3">
              <div
                className="inline-flex shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]"
                style={{ padding: 1.5, borderRadius: 10, background: 'linear-gradient(to right, #1BA83A, #FD8E0D)' }}
              >
                <div className="inline-flex items-center gap-2 rounded-[8px] bg-[#FCF9F3] px-4 py-2">
                  <Image
                    src="/images/money.png"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 shrink-0 object-contain"
                  />
                  <span className="text-[16px] font-semibold leading-[140%] text-[#0AB332]">Get Job.</span>{' '}
                  <span className="text-[16px] font-semibold leading-[140%] text-[#FC6E19]">Get Refunded.</span>
                </div>
              </div>
              {googleReview || trustpilotReview ? (
                <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-[8px] border border-[#EBEBEB] bg-[#FBFBFB] px-4 py-2 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]">
                  {googleReview ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Image
                        src="/images/g.png"
                        alt="Google"
                        width={20}
                        height={20}
                        className="h-5 w-5 shrink-0 object-contain"
                      />
                      <span className="text-[16px] font-semibold text-heading">
                        {formatRating(googleReview.rating)}
                      </span>
                    </span>
                  ) : null}
                  {trustpilotReview ? (
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
                        <path
                          d="M12 1.5l2.9 7.2 7.8.7-5.9 5 1.8 7.6L12 18.6l-6.6 3.4 1.8-7.6-5.9-5 7.8-.7L12 1.5z"
                          fill="#00B67A"
                        />
                        <path d="M12 16.2l3.9 2 1.1-4.5-3.5-2.9V16.2z" fill="#005128" />
                      </svg>
                      <span className="text-[16px] font-semibold text-heading">
                        {formatRating(trustpilotReview.rating)}
                      </span>
                    </span>
                  ) : null}
                  {reviewsLabel ? (
                    reviewsUrl ? (
                      <a
                        href={reviewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-muted hover:underline"
                      >
                        {reviewsLabel}
                      </a>
                    ) : (
                      <span className="text-[13px] text-muted">{reviewsLabel}</span>
                    )
                  ) : null}
                </div>
              ) : null}
            </div>

            {features.length > 0 ? (
              <ul
                className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
                role="list"
              >
                {features.map((feature) => (
                  <li key={feature} className="flex min-w-0 items-start gap-2.5">
                    <CheckIcon className="mt-0.5 shrink-0" />
                    <span
                      className="min-w-0 text-[16px] font-medium leading-[152%] text-heading [&_a]:text-brand [&_a]:no-underline [&_a]:hover:underline [&_a]:underline-offset-2 md:text-[18px]"
                      dangerouslySetInnerHTML={{ __html: withNewTabLinks(feature) }}
                    />
                  </li>
                ))}
              </ul>
            ) : null}

            <RankedContent rankedContent={rankedContent} rankingLine={rankingLine} />

            <div className="mt-[40px] flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 max-md:w-full max-md:min-w-0 max-md:max-w-full">
              {startedAt ? (
                <CourseBrochureCta
                  openModal
                  type="webinar"
                  courseId={courseId}
                  className="btn-brand h-[54px] w-full cursor-pointer gap-2 px-6 max-md:box-border max-md:min-w-0 max-md:max-w-full max-md:px-4 sm:w-auto md:px-7"
                >
                  Register for FREE Webinar
                  <ArrowRightIcon className="btn-arrow-icon shrink-0" />
                </CourseBrochureCta>
              ) : (
                <CourseBrochureCta
                  openModal
                  type="contact"
                  courseId={courseId}
                  downloadUrl={brochureUrl}
                  className="btn-brand inline-flex h-[54px] w-full items-center justify-center gap-2 px-6 max-md:box-border max-md:min-w-0 max-md:max-w-full max-md:px-4 sm:w-auto md:px-7"
                >
                  Download Brochure
                  <ArrowRightIcon className="btn-arrow-icon shrink-0" />
                </CourseBrochureCta>
              )}
              <a
                href="#schedules"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('schedules')?.scrollIntoView({ block: 'start' });
                }}
                className="btn-brand-outline inline-flex h-[54px] w-full cursor-pointer items-center justify-center gap-[18px] px-6 text-sm font-semibold max-md:box-border max-md:min-w-0 max-md:max-w-full max-md:gap-2 max-md:px-4 sm:w-auto md:px-8 md:text-[15px]"
              >
                View Schedules
                <EyeIcon className="h-5 w-5 text-brand" />
              </a>
            </div>

            <div className="mt-[38px]">
              <p className="text-[16px] font-medium leading-normal text-[#1E293B]">Next Webinar Starts in</p>
              <div className="mt-[14px] flex flex-wrap items-center gap-4">
                <TechnicalCourseWebinarCountdown targetDate={startedAt} />
                <div className="mt-3 flex min-w-0 items-center gap-2.5 lg:mt-0">
                  <div className="flex shrink-0 items-center">
                    {learnersStat.avatarSrcs.map((src, index) => (
                      <div
                        key={`${src}-${index}`}
                        className={`relative h-[28px] w-[28px] shrink-0 overflow-hidden rounded-full ring-2 ring-white ${index > 0 ? '-ml-2' : ''}`}
                      >
                        <Image src={src} alt="" width={28} height={28} className="h-[28px] w-[28px] object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[14px] leading-[1.3]">
                    <span className="font-bold text-heading">{learnersStat.count}</span>{' '}
                    <span className="font-normal text-muted">{learnersStat.label}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={(el) => {
              rowRefs.current[1] = el;
            }}
            className="gsap-reveal-pending min-w-0 max-md:w-full max-md:max-w-full max-md:overflow-visible"
          >
            <HeroMediaColumn
              figureSrc={heroFigureSrc}
              figureAlt="Technical course learner"
              badges={heroBadges}
              aeroShiftRight={isCsmPage}
              figureAlign={isDevopsPage ? 'left' : 'right'}
            />
            {collaboration.length > 0 ? (
              <div
                className={`mt-6 flex max-md:justify-center max-md:pl-0 ${
                  isDevopsPage ? 'justify-start md:pl-[30px] lg:pl-[120px]' : 'justify-center'
                }`}
              >
                <div
                  className={`inline-flex flex-col ${isDevopsPage ? 'items-start' : 'items-center lg:items-start'}`}
                >
                  <p
                    className={`text-[18px] font-medium leading-normal text-[#1E293B] ${isDevopsPage ? '' : 'text-center lg:text-left'}`}
                  >
                    In Collaboration with
                  </p>
                  <div
                    className={`mt-3 flex items-center gap-8 ${isDevopsPage ? '' : 'flex-wrap justify-center lg:flex-nowrap lg:justify-start'}`}
                  >
                    {collaboration.map((logo) => (
                      <div key={logo.src} className="relative h-8 w-24">
                        <Image
                          src={logo.src!}
                          alt={logo.alt}
                          fill
                          sizes="96px"
                          className="object-contain object-left"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative z-20 max-md:mt-15 max-md:mb-0 md:mt-12 md:mb-[-42px]">
          <div className="rounded-[20px] border border-[#EBEBEB] bg-white px-6 py-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:px-10 md:py-6">
            <p className="max-md:mb-0 md:mb-5 text-center text-[20px] font-semibold leading-normal">
              <span className="text-[#1E293B]">Our </span>
              <span className="text-[#FD022D]">Hiring Partners</span>
            </p>
            <div className={HOME_LOGO_MARQUEE_WRAPPER_CLASS}>
              <LogoMarquee
                logos={hiringPartners.map((partner) => ({
                  id: partner.id,
                  src: partner.logoSrc,
                  alt: partner.logoAlt,
                }))}
                size={HOME_LOGO_MARQUEE_SIZE}
                largeOnMobile
                className={HOME_LOGO_MARQUEE_CLASSNAME}
                ariaLabel="Hiring partners"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
