import Image from 'next/image';
import Link from 'next/link';
import { LogoMarquee } from '@/components/shared';


export interface HeroLogo {
  alt: string;
  src?: string;
}

export interface HeroBadge {
  id: string;
  title: string;
  subtitle: string;
  variant: 'learners' | 'mentors';
  placement: 'top-left' | 'mid-left' | 'bottom-center' | 'bottom-right';
}

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
          ? 'bottom-32 -right-8 md:bottom-28 md:-right-10'
          : 'bottom-10 left-[42%] -translate-x-1/2 md:-bottom-2';

  const iconBg =
    badge.variant === 'learners'
      ? 'bg-[#CEFAFE] text-[#0092B8]'
      : 'bg-[#DBEAFE] text-[#155DFC]';

  const sizeClass =
    badge.variant === 'mentors'
      ? 'h-[62px] w-[162px] px-3 py-2'
      : 'max-w-[200px] px-3 py-2.5 md:px-4 md:py-3';

  const zClass = 'z-30';

  const alignClass = badge.variant === 'mentors' ? 'h-full items-center' : 'items-start';

  return (
    <div
      className={`absolute rounded-xl border border-zinc-100 bg-white shadow-lg shadow-zinc-900/8 ${zClass} ${sizeClass} ${placement}`}
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

  return (
    <section
      className="full-bleed relative overflow-x-clip overflow-y-visible bg-surface pb-8 pt-28 md:pb-10 md:pt-36 lg:pb-12 lg:pt-44"
      aria-labelledby="hero-heading"
    >
      {/* Decorative background (non-content) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {backgroundImage?.src ? (
          <div className={bgClassName}>
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
        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-[2fr_1fr] lg:gap-6 xl:gap-8">
          {/* Copy column */}
          <div className="max-w-xl min-w-0 lg:max-w-none">
            <h1
              id="hero-heading"
              className="pt-10 text-[32px] font-extrabold leading-tight tracking-tight text-heading sm:text-[36px] md:text-[40px] md:leading-[52px]"
            >
              <span className="block">{headingIntro}</span>
              <span className="mt-1 block">
                <span className="text-[32px] font-extrabold leading-tight text-heading sm:text-[36px] md:text-[40px] md:leading-[52px]">
                  {headingYour}
                </span>{' '}
                <span className="text-career-growth-gradient text-[40px] font-extrabold leading-tight sm:text-[52px] lg:text-[60px] xl:text-[68px] xl:leading-[80px]">
                  {headingAccent}
                </span>
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-[16px] font-semibold leading-normal text-muted sm:text-[18px]">
              {subheading}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link href={primaryCta.href} className="btn-brand h-[54px] gap-2 px-6 md:px-7">
                {primaryCta.label}
                <ArrowRightIcon className="btn-arrow-icon shrink-0" />
              </Link>
              <Link
                href={secondaryCta.href}
                className="btn-brand-outline inline-flex h-[54px] w-full min-w-0 items-center justify-center gap-[18px] px-6 text-sm font-semibold sm:w-auto sm:min-w-[275px] md:text-[15px]"
              >
                {secondaryCta.label}
                <PhoneIcon className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-zinc-200/80 pt-5">
              <p className="shrink-0 text-[18px] font-semibold leading-[18px] tracking-[-0.18px] text-heading">
                {trustedBy.label}
              </p>
              <div className="min-w-0 flex-1 overflow-hidden">
                <LogoMarquee
                  logos={trustedBy.logos}
                  size="sm"
                  reverse
                  ariaLabel="Trusted by partners"
                />
              </div>
            </div>
          </div>

          {/* Media column */}
          <div className="relative mx-auto w-full min-w-0 max-w-md overflow-visible lg:mx-0 lg:max-w-none">
            <div className="relative ml-auto mr-0 aspect-[4/5] w-full max-w-[420px] overflow-visible pt-10 sm:pt-14 lg:max-w-[480px] lg:pt-0">
              <div
                className="absolute right-5 bottom-0 z-[1] aspect-[389/549] w-[min(100%,389px)] rounded-t-[400px] shadow-inner shadow-black/5"
                style={{
                  background: 'linear-gradient(180deg, #BB9255 -140.92%, #FADCBA 165.92%)',
                }}
                aria-hidden
              />
              <div className="absolute right-6 bottom-0 z-[5] aspect-[350/554] w-[min(90%,350px)] lg:right-12" style={{ transform: 'translateY(-50px)' }}>
                <Image
                  src={figure.src}
                  alt={figure.alt}
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
            <LogoMarquee
              logos={collaboration.logos}
              className="py-5"
              ariaLabel="Certifying body partners"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
