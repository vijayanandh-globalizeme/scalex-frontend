'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogoMarquee, HeroMediaColumn } from '@/components/shared';
import type { HeroBadge } from '@/components/shared';
import { useGsapScrollReveal } from '@/hooks/useGsapScrollReveal';
import { useCourseBrochureModal } from '@/components/course-detail';


export interface HeroLogo {
  alt: string;
  src?: string;
}

export type { HeroBadge };

export interface HeroSectionProps {
  /** Intro line before "Your" */
  headingIntro: string;
  /** Middle line (e.g. "Your") */
  headingYour: string;
  /** Gradient accent line */
  headingAccent: string;
  subheading: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  trustedBy: {
    label: string;
    logos: HeroLogo[];
  };
  collaboration: {
    lineBefore: string;
    lineHighlight: string;
    lineAfter: string;
    logos: HeroLogo[];
  };
  /** Hero figure */
  figure: {
    src: string;
    alt: string;
    panelBgClassName?: string;
  };
  backgroundImage?: {
    src: string;
    className?: string;
  };
  badges: HeroBadge[];
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="15"
      viewBox="0 0 18 15"
      fill="none"
      aria-hidden
    >
      <path
        d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z"
        fill="white"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <g clipPath="url(#hero-phone-clip)">
        <path
          d="M14.1797 19.0725C15.8789 19.0725 17.002 18.6135 17.9883 17.51C18.0664 17.4221 18.1348 17.344 18.2129 17.2561C18.7988 16.6116 19.0723 15.9768 19.0723 15.3713C19.0723 14.6682 18.6719 13.9846 17.8027 13.3889L15.3516 11.7092C14.5996 11.2014 13.9648 11.1721 13.0273 11.6213L11.5137 12.3635C11.2207 12.5002 10.9668 12.5002 10.6836 12.3245C10.2539 12.051 9.16992 11.1819 8.4375 10.4299C7.69531 9.68774 6.97266 8.79907 6.65039 8.24243C6.52344 8.01782 6.54297 7.83228 6.70898 7.5686L7.58789 6.19165C7.96875 5.58618 8.08594 4.7561 7.59766 4.05298L5.66406 1.27954C5.05859 0.4104 4.4043 0.0100097 3.70117 0.000244095C3.0957 -0.00952153 2.46094 0.273682 1.80664 0.859619C1.72852 0.927978 1.64062 1.0061 1.5625 1.08423C0.458984 2.06079 0 3.18384 0 4.87329C0 7.66626 1.72852 11.0842 4.86328 14.2092C7.97852 17.3245 11.3867 19.0725 14.1797 19.0725ZM14.1895 17.5881C11.6992 17.637 8.51562 15.7229 5.98633 13.2034C3.4375 10.6643 1.43555 7.36353 1.48438 4.86353C1.50391 3.78931 1.875 2.87134 2.64648 2.19751C2.70508 2.14868 2.76367 2.09985 2.82227 2.05103C3.11523 1.79712 3.4375 1.6604 3.71094 1.6604C4.00391 1.6604 4.24805 1.76782 4.44336 2.06079L6.20117 4.69751C6.36719 4.94165 6.35742 5.15649 6.16211 5.49829L5.18555 7.06079C4.75586 7.75415 4.83398 8.28149 5.26367 8.86743C5.83008 9.61938 6.67969 10.7034 7.43164 11.4456C8.17383 12.1877 9.41406 13.2424 10.0879 13.7112C10.6738 14.1409 11.2012 14.2385 12.1094 13.7991L13.75 13.0178C14.1211 12.8518 14.4141 12.9006 14.7266 13.0959L17.0117 14.6292C17.3047 14.8147 17.4121 15.0686 17.4121 15.3616C17.4121 15.635 17.2754 15.9573 17.0215 16.2502C16.9727 16.3088 16.9238 16.3674 16.875 16.426C16.2012 17.1975 15.2734 17.5686 14.1895 17.5881Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="hero-phone-clip">
          <rect width="19.4336" height="19.0728" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}


export default function HeroSection(props: HeroSectionProps) {
  const {
    headingIntro,
    headingYour,
    headingAccent,
    subheading,
    primaryCta,
    secondaryCta,
    trustedBy,
    collaboration,
    figure,
    backgroundImage,
    badges,
  } = props;

  const bgClassName =
    backgroundImage?.className ??
    'absolute right-[6%] top-[10%] h-[54%] w-[46%] md:w-[33%] lg:w-[24%]';

  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  useGsapScrollReveal(sectionRef, copyRef, { y: 40, duration: 0.7, delay: 0, start: 'top 95%' });
  useGsapScrollReveal(sectionRef, mediaRef, { y: 50, duration: 0.8, delay: 0.08, start: 'top 95%' });
  const { openBrochureModal } = useCourseBrochureModal();

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section
      ref={sectionRef}
      className="full-bleed relative overflow-x-clip overflow-y-visible bg-surface pb-8 pt-[30px] md:pb-10 md:pt-36 lg:pb-12 lg:pt-44"
      aria-labelledby="hero-heading"
    >
      {/* Decorative background (non-content) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {backgroundImage?.src ? (
          <div className={`${bgClassName} hidden md:block`}>
            <Image
              src={backgroundImage.src}
              alt=""
              fill
              priority={false}
              sizes="(max-width: 768px) 46vw, (max-width: 1024px) 33vw, 400px"
              className="object-contain object-center"
            />
          </div>
        ) : null}
        <div className="absolute bottom-0 right-[15%] h-48 w-48 rounded-full bg-orange-200/30 blur-3xl" aria-hidden />
      </div>

      <div className="site-container relative z-10">
        <div className="grid min-w-0 items-start gap-2 sm:gap-10 lg:grid-cols-[2fr_1fr] lg:gap-6 xl:gap-8">
          {/* Copy column */}
          <div ref={copyRef} className="gsap-reveal-pending max-w-xl min-w-0 lg:max-w-none">
            <h1
              id="hero-heading"
              className="pt-10 text-[26px] font-extrabold leading-tight tracking-tight text-heading sm:text-[36px] md:text-[40px] md:leading-[52px]"
            >
              <span className="inline sm:block">{headingIntro}</span>{' '}
              <span className="inline sm:mt-1 sm:block">
                <span className="text-[26px] font-extrabold leading-tight text-heading sm:text-[36px] md:text-[40px] md:leading-[52px]">
                  {headingYour}
                </span>{' '}
                <span className="text-career-growth-gradient text-[32px] font-extrabold leading-tight sm:text-[52px] lg:text-[60px] xl:text-[68px] xl:leading-[80px]">
                  {headingAccent}
                </span>
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-[16px] font-semibold leading-normal text-muted sm:text-[18px]">
              {subheading}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              {primaryCta.href.startsWith('#') ? (
                <button
                  type="button"
                  onClick={() => scrollToId(primaryCta.href.slice(1))}
                  className="btn-brand h-[54px] w-full cursor-pointer justify-center gap-2 px-6 sm:w-auto md:px-7"
                >
                  {primaryCta.label}
                  <ArrowRightIcon className="btn-arrow-icon shrink-0" />
                </button>
              ) : (
                <Link href={primaryCta.href} className="btn-brand h-[54px] w-full justify-center gap-2 px-6 sm:w-auto md:px-7">
                  {primaryCta.label}
                  <ArrowRightIcon className="btn-arrow-icon shrink-0" />
                </Link>
              )}
              <button
                type="button"
                onClick={() => openBrochureModal({ type: 'contact', courseId: null })}
                className="btn-brand-outline inline-flex h-[54px] w-full min-w-0 cursor-pointer items-center justify-center gap-[18px] px-6 text-sm font-semibold sm:w-auto sm:min-w-[275px] md:text-[15px]"
              >
                {secondaryCta.label}
                <PhoneIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10 flex flex-col items-start gap-3 border-t border-zinc-200/80 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-3">
              <p className="shrink-0 text-[18px] font-semibold leading-[18px] tracking-[-0.18px] text-heading">
                {trustedBy.label}
              </p>
              <div className="w-full min-w-0 overflow-hidden sm:flex-1">
                <LogoMarquee
                  logos={trustedBy.logos}
                  size="sm"
                  reverse
                  largeOnMobile
                  ariaLabel="Trusted by partners"
                />
              </div>
            </div>
          </div>

          {/* Media column */}
          <HeroMediaColumn
            ref={mediaRef}
            imageSrc={figure.src}
            imageAlt={figure.alt}
            badges={badges}
          />
        </div>

        {/* Collaboration strip */}
        <div className="relative -mt-10 md:-mt-12">
<div className="relative z-10 rounded-lg border border-zinc-100 bg-white px-6 py-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:px-10 md:py-6">
            <p className="mb-6 text-center text-[22px] font-semibold leading-normal text-heading md:text-[28px]">
              {collaboration.lineBefore}
              <span className="font-semibold text-brand">
                {collaboration.lineHighlight}
              </span>
              {collaboration.lineAfter}
            </p>
            <div className="w-full min-w-0 overflow-hidden py-5">
              <LogoMarquee
                logos={collaboration.logos}
                size="md"
                largeOnMobile
                ariaLabel="Certifying body partners"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
