import Image from 'next/image';
import Link from 'next/link';
import CategoryCollaborationCard from './CategoryCollaborationCard';
import CategoryTitleUnderline from './CategoryTitleUnderline';
import { HeroMediaColumn, ScrollToAnchor } from '@/components/shared';
import type { HeroBadge } from '@/components/shared';
import type { ApiCategoryDetail } from '@/services/categoryApi';
import type { LayoutSettings } from '@/services/layoutApi';
import { AVATAR_SRCS } from '@/lib/coursePropsFromApi';
import { CourseBrochureCta } from '@/components/course-detail';

export interface CategoryReview {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  rating: string;
  reviewsLabel: string;
  url?: string;
}

export interface CategoryLogo {
  alt: string;
  src?: string;
}

export interface CategoryLearnersStat {
  count: string;
  label: string;
  avatarSrcs: string[];
}

export interface CategoryPageContent {
  slug: string;
  breadcrumbLabel: string;
  titlePrefix: string;
  titleAccent: string;
  subheading: string;
  features: string[];
  heroImage: { src: string; alt: string };
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  reviews: CategoryReview[];
  learnersStat: CategoryLearnersStat;
  collaboration: {
    lineBefore: string;
    lineHighlight: string;
    lineAfter: string;
    logos: CategoryLogo[];
  };
}

/** Forces any admin-authored `<a>` tags to open in a new tab, regardless of what attributes were typed. */
function withNewTabLinks(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (_match, attrs: string) => {
    let nextAttrs = /\btarget\s*=/i.test(attrs)
      ? attrs.replace(/\btarget\s*=\s*(["']).*?\1/i, 'target="_blank"')
      : `${attrs} target="_blank"`;
    nextAttrs = /\brel\s*=/i.test(nextAttrs)
      ? nextAttrs.replace(/\brel\s*=\s*(["']).*?\1/i, 'rel="noopener noreferrer"')
      : `${nextAttrs} rel="noopener noreferrer"`;
    return `<a${nextAttrs}>`;
  });
}

const TECHNICAL_HERO_COLLABORATION_LOGOS = [
  { alt: 'Amazon', src: '/images/ama.png' },
  { alt: 'Microsoft', src: '/images/course/google.png' },
];

const DEFAULT_COLLABORATION: CategoryPageContent['collaboration'] = {
  lineBefore: 'In Collaboration with ',
  lineHighlight: 'World-Class',
  lineAfter: ' Certifying Bodies',
  logos: [
    { alt: 'Google', src: '/images/hero/google.png' },
    { alt: 'Stanford', src: '/images/hero/stanford.png' },
    { alt: 'IBM', src: '/images/hero/ibm.png' },
    { alt: 'Infosys', src: '/images/hero/infosys.png' },
    { alt: 'Capgemini', src: '/images/hero/google.png' },
    { alt: 'Deloitte', src: '/images/hero/google.png' },
    { alt: 'TCS', src: '/images/hero/tcs.png' },
  ],
};


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
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <g clipPath="url(#category-phone-clip)">
        <path
          d="M14.1797 19.0725C15.8789 19.0725 17.002 18.6135 17.9883 17.51C18.0664 17.4221 18.1348 17.344 18.2129 17.2561C18.7988 16.6116 19.0723 15.9768 19.0723 15.3713C19.0723 14.6682 18.6719 13.9846 17.8027 13.3889L15.3516 11.7092C14.5996 11.2014 13.9648 11.1721 13.0273 11.6213L11.5137 12.3635C11.2207 12.5002 10.9668 12.5002 10.6836 12.3245C10.2539 12.051 9.16992 11.1819 8.4375 10.4299C7.69531 9.68774 6.97266 8.79907 6.65039 8.24243C6.52344 8.01782 6.54297 7.83228 6.70898 7.5686L7.58789 6.19165C7.96875 5.58618 8.08594 4.7561 7.59766 4.05298L5.66406 1.27954C5.05859 0.4104 4.4043 0.0100097 3.70117 0.000244095C3.0957 -0.00952153 2.46094 0.273682 1.80664 0.859619C1.72852 0.927978 1.64062 1.0061 1.5625 1.08423C0.458984 2.06079 0 3.18384 0 4.87329C0 7.66626 1.72852 11.0842 4.86328 14.2092C7.97852 17.3245 11.3867 19.0725 14.1797 19.0725ZM14.1895 17.5881C11.6992 17.637 8.51562 15.7229 5.98633 13.2034C3.4375 10.6643 1.43555 7.36353 1.48438 4.86353C1.50391 3.78931 1.875 2.87134 2.64648 2.19751C2.70508 2.14868 2.76367 2.09985 2.82227 2.05103C3.11523 1.79712 3.4375 1.6604 3.71094 1.6604C4.00391 1.6604 4.24805 1.76782 4.44336 2.06079L6.20117 4.69751C6.36719 4.94165 6.35742 5.15649 6.16211 5.49829L5.18555 7.06079C4.75586 7.75415 4.83398 8.28149 5.26367 8.86743C5.83008 9.61938 6.67969 10.7034 7.43164 11.4456C8.17383 12.1877 9.41406 13.2424 10.0879 13.7112C10.6738 14.1409 11.2012 14.2385 12.1094 13.7991L13.75 13.0178C14.1211 12.8518 14.4141 12.9006 14.7266 13.0959L17.0117 14.6292C17.3047 14.8147 17.4121 15.0686 17.4121 15.3616C17.4121 15.635 17.2754 15.9573 17.0215 16.2502C16.9727 16.3088 16.9238 16.3674 16.875 16.426C16.2012 17.1975 15.2734 17.5686 14.1895 17.5881Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="category-phone-clip">
          <rect width="19.4336" height="19.0728" fill="white" />
        </clipPath>
      </defs>
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.01902 14.8627C3.30952 15.0888 3.67795 15.0111 4.11724 14.6932L7.86538 11.9453L11.6206 14.6932C12.0598 15.0111 12.4212 15.0888 12.7188 14.8627C13.0093 14.6437 13.073 14.2835 12.8959 13.7678L11.4151 9.37398L15.1986 6.66138C15.638 6.35057 15.8151 6.02562 15.7017 5.67242C15.5883 5.33335 15.2553 5.17087 14.7098 5.17087H10.0689L8.65889 0.784104C8.4889 0.261369 8.2338 0 7.86538 0C7.50399 0 7.24894 0.261369 7.0789 0.784104L5.66892 5.17087H1.02805C0.482481 5.17087 0.149473 5.33335 0.0361076 5.67242C-0.0843426 6.02562 0.099875 6.35057 0.539164 6.66138L4.32271 9.37398L2.84188 13.7678C2.66475 14.2835 2.72852 14.6437 3.01902 14.8627Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ReviewBlock({ review }: { review: CategoryReview }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div className="relative h-6 w-24">
        <Image src={review.logoSrc} alt={review.logoAlt} fill sizes="96px" className="object-contain object-left" />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <StarIcon className="shrink-0 text-[#F4AA1F]" />
        <span className="text-[13px] font-semibold text-heading">{review.rating}</span>
        {review.url ? (
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-normal leading-[140%] text-muted hover:underline"
          >
            {review.reviewsLabel}
          </a>
        ) : (
          <span className="text-[14px] font-normal leading-[140%] text-muted">{review.reviewsLabel}</span>
        )}
      </div>
    </div>
  );
}

function LearnersBlock({ count, label, avatarSrcs }: CategoryLearnersStat) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <div className="flex shrink-0 items-center">
        {avatarSrcs.map((src, index) => (
          <div
            key={index}
            className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-2 ring-white ${index > 0 ? '-ml-2' : ''}`}
          >
            <Image src={src} alt="" width={28} height={28} className="h-7 w-7 object-cover" />
          </div>
        ))}
      </div>
      <p className="text-[14px] leading-[1.3]">
        <span className="font-bold text-heading">{count}</span>{' '}
        <span className="font-normal text-muted">{label}</span>
      </p>
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-20 gap-y-3 lg:gap-x-32" role="list">
      {features.map((feature, i) => (
        <li key={i} className="flex min-w-0 items-start gap-2.5">
          <CheckIcon className="mt-0.5 shrink-0" />
          <span
            className={`text-[15px] font-medium leading-[152%] text-heading [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 md:text-[18px] ${
              feature === 'Authorized Scrum Alliance Training' ||
              feature === 'Live CST-Led Online Sessions' ||
              feature === 'All-Inclusive Course Pricing' ||
              feature === '100% Exam Pass Guarantee'
                ? 'whitespace-nowrap'
                : ''
            }`}
            dangerouslySetInnerHTML={{ __html: withNewTabLinks(feature) }}
          />
        </li>
      ))}
    </ul>
  );
}

interface CategoryHeroSectionProps {
  category: ApiCategoryDetail;
  settings: LayoutSettings;
  heroBadges?: HeroBadge[];
  heroFigureSrc?: string;
  /** `photo` = rounded hero image (e.g. agile-and-scrum); default cutout figure. */
  mediaVariant?: 'figure' | 'photo';
  backgroundImage?: {
    src: string;
    className?: string;
  };
}

export default function CategoryHeroSection({
  category,
  settings,
  heroBadges = [],
  heroFigureSrc,
  mediaVariant = 'figure',
  backgroundImage,
}: CategoryHeroSectionProps) {
  const features = category.highlights
    ? category.highlights
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((feature) =>
          feature === 'Authorized Scrum Training'
            ? 'Authorized Scrum Alliance Training'
            : feature,
        )
    : [];

  const reviews: CategoryReview[] = [];
  if (settings.GOOGLE_REVIEW) {
    reviews.push({
      id: 'google',
      name: 'Google',
      logoSrc: '/images/hero/google.png',
      logoAlt: 'Google reviews',
      rating: `${settings.GOOGLE_REVIEW.rating}/5`,
      reviewsLabel: `${settings.GOOGLE_REVIEW.count} Reviews`,
      url: settings.GOOGLE_REVIEW.url || undefined,
    });
  }
  if (settings.TRUST_PILOT_REVIEW) {
    reviews.push({
      id: 'trustpilot',
      name: 'Trustpilot',
      logoSrc: '/images/hero/trustpilot.png',
      logoAlt: 'Trustpilot reviews',
      rating: `${settings.TRUST_PILOT_REVIEW.rating}/5`,
      reviewsLabel: `${settings.TRUST_PILOT_REVIEW.count} Reviews`,
      url: settings.TRUST_PILOT_REVIEW.url || undefined,
    });
  }

  const learnersStat: CategoryLearnersStat = {
    count: settings.TOTAL_LEARNERS ? `${settings.TOTAL_LEARNERS}` : category.learnerCount ? `${category.learnerCount}` : '700K+',
    label: 'Learners',
    avatarSrcs: AVATAR_SRCS,
  };

  const heroImage = {
    src: heroFigureSrc ?? '/images/hero/person.png',
    alt: category.name,
  };

  const bgClassName =
    backgroundImage?.className ??
    'absolute right-[6%] top-[10%] h-[54%] w-[46%] md:w-[33%] lg:w-[19%]';

  return (
    <section
      className={`full-bleed relative overflow-visible bg-[#F5F6F8] pb-2 pt-6 md:pt-8 ${
        mediaVariant === 'photo' ? 'lg:min-h-[625px]' : ''
      }`}
      aria-labelledby="category-hero-heading"
    >
      {/* Same light pink glow as contact-us — full bottom including center */}
      <div
        className="category-hero-bg pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ bottom: '-20%' }}
        aria-hidden
      />
      {/* Decorative background (non-content) — figure layout only */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {mediaVariant === 'figure' && backgroundImage?.src ? (
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
      </div>
      <div className="site-container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[14px] font-medium">
          <Link href="/" className="text-muted transition hover:text-heading" aria-label="Home">
            <HomeIcon className="h-4 w-4" />
          </Link>
          <span className="text-muted/60" aria-hidden>&gt;</span>
          <span className="text-brand">{category.name}</span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          <div className="max-w-2xl">
            <h1 id="category-hero-heading" className="text-heading">
              <span className="block text-[32px] font-extrabold leading-tight md:text-[44px] md:leading-[64px] xl:text-[50px] xl:leading-[80px] text-heading">
                {category.name}
              </span>
              <CategoryTitleUnderline />
            </h1>

            <p
              className="mt-5 max-w-xl text-[15px] font-semibold leading-6 text-muted [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 md:text-[18px]"
              dangerouslySetInnerHTML={{ __html: withNewTabLinks(category.description) }}
            />

            {features.length > 0 && <FeatureList features={features} />}

            {(reviews.length > 0 || learnersStat) && (
              <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-5 lg:mt-6">
                {reviews.map((review) => (
                  <ReviewBlock key={review.id} review={review} />
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-6">
              <ScrollToAnchor targetId="courses" className="btn-brand h-[54px] w-full gap-2 px-6 sm:w-auto md:px-7">
                Explore Courses
                <ArrowRightIcon className="btn-arrow-icon shrink-0" />
              </ScrollToAnchor>
              <CourseBrochureCta
                openModal
                type="contact"
                courseId={null}
                className="btn-brand-outline inline-flex h-[54px] w-full items-center justify-center gap-[18px] px-6 text-sm font-semibold sm:w-auto md:px-8 md:text-[15px]"
              >
                Get Free Career Guidance
                <PhoneIcon className="h-5 w-5 text-brand" />
              </CourseBrochureCta>
            </div>
          </div>

          {/* Media column */}
          <div>
            <HeroMediaColumn
              imageSrc={heroImage.src}
              imageAlt={heroImage.alt}
              badges={heroBadges}
              variant={mediaVariant}
              disableGsap
            />
            {mediaVariant === 'photo' && (
              <div className="mt-6 flex justify-center">
                <div className="inline-flex items-center gap-4">
                  <p className="whitespace-nowrap text-[16px] font-medium leading-normal text-[#1E293B]">
                    In Collaboration with
                  </p>
                  <div className="flex items-center gap-6">
                    {TECHNICAL_HERO_COLLABORATION_LOGOS.map((logo) => (
                      <div key={logo.alt} className="relative h-7 w-20">
                        <Image src={logo.src} alt={logo.alt} fill sizes="80px" className="object-contain object-left" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-[70%]">
        <div className="site-container">
          <CategoryCollaborationCard collaboration={DEFAULT_COLLABORATION} />
        </div>
      </div>
    </section>
  );
}
