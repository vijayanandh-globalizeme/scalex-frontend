'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import CategoryTitleUnderline from '@/components/category/CategoryTitleUnderline';
import type { CourseDetailContent } from '@/lib/courses';
import { useGsapScrollRevealStagger } from '@/hooks/useGsapScrollReveal';
import { withNewTabLinks } from '@/lib/richText';
import { useCourseBrochureModal } from './CourseBrochureModalContext';
import { ScrollToAnchor } from '@/components/shared';
import CourseLeadForm from './CourseLeadForm';
import CourseLicensedPartnerStrip from './CourseLicensedPartnerStrip';
import { CourseEnterpriseCard } from './CourseEnterpriseSection';

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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.01902 14.8627C3.30952 15.0888 3.67795 15.0111 4.11724 14.6932L7.86538 11.9453L11.6206 14.6932C12.0598 15.0111 12.4212 15.0888 12.7188 14.8627C13.0093 14.6437 13.073 14.2835 12.8959 13.7678L11.4151 9.37398L15.1986 6.66138C15.638 6.35057 15.8151 6.02562 15.7017 5.67242C15.5883 5.33335 15.2553 5.17087 14.7098 5.17087H10.0689L8.65889 0.784104C8.4889 0.261369 8.2338 0 7.86538 0C7.50399 0 7.24894 0.261369 7.0789 0.784104L5.66892 5.17087H1.02805C0.482481 5.17087 0.149473 5.33335 0.0361076 5.67242C-0.0843426 6.02562 0.099875 6.35057 0.539164 6.66138L4.32271 9.37398L2.84188 13.7678C2.66475 14.2835 2.72852 14.6437 3.01902 14.8627Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RankedContent({ rankedContent, rankingLine }: { rankedContent?: string; rankingLine: { highlight: string; rest: string } }) {
  if (rankedContent) {
    // Parse **bold** segments → text-brand, rest → text-heading
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

export default function CourseDetailHeroSection({
  courseId,
  slug,
  categorySlug,
  breadcrumbs,
  titlePrefix,
  titleAccent,
  shortDescription,
  rankedContent,
  features,
  rankingLine,
  brochureUrl,
  reviews,
  learnersStat,
  secondaryCta,
  form,
  licensedPartner,
  enterprise,
}: CourseDetailContent) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { openBrochureModal } = useCourseBrochureModal();

  rowRefs.current.length = 3;

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

  return (
    <section
      ref={sectionRef}
      className="full-bleed relative overflow-x-clip overflow-y-visible bg-[#F5F6F8] pb-6 pt-8 md:overflow-visible md:pb-0 md:pt-10 lg:min-h-[782px]"
      aria-labelledby="course-hero-heading"
    >
      <div
        className="category-hero-bg pointer-events-none absolute inset-0"
        style={{ backgroundColor: '#F5F6F8' }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {!(slug === 'certified-scrum-master' && categorySlug === 'agile-and-scrum') ? (
          <div className="absolute right-[6%] top-[10%] hidden h-[54%] w-[46%] md:block md:w-[33%] lg:w-[19%]">
            <Image
              src="/images/hero/aero-bg-v2.png"
              alt=""
              fill
              sizes="(max-width: 768px) 46vw, (max-width: 1024px) 33vw, 400px"
              className="object-contain object-center"
            />
          </div>
        ) : null}
      </div>
      <div className="site-container relative z-10">
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

        <div className="grid grid-cols-1 items-start gap-y-[50px] lg:grid-cols-[minmax(0,690px)_minmax(0,1fr)] lg:gap-x-8 xl:gap-x-12">
          <div
            ref={(el) => {
              rowRefs.current[0] = el;
            }}
            className="gsap-reveal-pending w-full min-w-0 lg:max-w-[690px] lg:col-start-1 lg:row-start-1"
          >
            <h1 id="course-hero-heading" className="text-heading">
              <span className="block text-[26px] font-extrabold leading-[1.4] text-heading sm:text-[34px] md:text-[40px] md:leading-[60px]">
                {titlePrefix}
              </span>
              {titleAccent ? (
                <span className="block text-[32px] font-extrabold leading-[1.3] text-heading sm:text-[42px] md:text-[50px] md:leading-[80px]">
                  {titleAccent}
                </span>
              ) : null}
              <CategoryTitleUnderline />
            </h1>

            {shortDescription ? (
              <p
                className="mt-5 max-w-xl text-[15px] font-semibold leading-6 text-muted [&_a]:text-brand [&_a]:no-underline [&_a]:hover:underline [&_a]:underline-offset-2 md:text-[18px]"
                dangerouslySetInnerHTML={{ __html: withNewTabLinks(shortDescription) }}
              />
            ) : null}

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

            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
              {reviews.map((review) => (
                <div key={review.id} className="flex min-w-0 flex-col gap-1.5">
                  <div className="relative h-6 w-24">
                    <Image
                      src={review.logoSrc}
                      alt={review.logoAlt}
                      fill
                      sizes="96px"
                      className="object-contain object-left"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <StarIcon className="shrink-0 text-[#F4AA1F]" />
                    <span className="text-[16px] font-semibold text-heading">{review.rating}</span>
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
                      <span className="text-[14px] font-normal leading-[140%] text-muted">
                        {review.reviewsLabel}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex shrink-0 items-center">
                  {learnersStat.avatarSrcs.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      className={`relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-2 ring-white ${index > 0 ? '-ml-2' : ''}`}
                    >
                      <Image src={src} alt="" width={28} height={28} className="h-7 w-7 object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-[14px] leading-[1.3]">
                  <span className="font-bold text-heading">{learnersStat.count}</span>{' '}
                  <span className="font-normal text-muted">{learnersStat.label}</span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-[30px]">
              {brochureUrl ? (
                <button
                  type="button"
                  onClick={() => openBrochureModal({ type: 'contact', courseId, downloadUrl: brochureUrl })}
                  className="btn-brand h-[54px] w-full cursor-pointer gap-2 px-6 sm:w-auto md:px-7"
                >
                  Download Brochure
                  <ArrowRightIcon className="btn-arrow-icon shrink-0" />
                </button>
              ) : null}
              {secondaryCta.href.startsWith('#') ? (
                <ScrollToAnchor
                  targetId={secondaryCta.href.slice(1)}
                  className="btn-brand-outline inline-flex h-[54px] w-full items-center justify-center gap-[18px] px-6 text-sm font-semibold sm:w-auto md:px-8 md:text-[15px]"
                >
                  {secondaryCta.label}
                  <EyeIcon className="h-5 w-5 text-brand" />
                </ScrollToAnchor>
              ) : (
                <Link
                  href={secondaryCta.href}
                  className="btn-brand-outline inline-flex h-[54px] w-full items-center justify-center gap-[18px] px-6 text-sm font-semibold sm:w-auto md:px-8 md:text-[15px]"
                >
                  {secondaryCta.label}
                  <EyeIcon className="h-5 w-5 text-brand" />
                </Link>
              )}
            </div>
          </div>

          <div
            ref={(el) => {
              rowRefs.current[1] = el;
            }}
            className={`gsap-reveal-pending relative mx-auto flex w-full flex-col overflow-visible lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:ml-auto ${
              slug === 'certified-scrum-master' && categorySlug === 'agile-and-scrum'
                ? 'max-w-[480px] lg:-translate-x-[10%]'
                : 'max-w-[528px]'
            }`}
          >
            {/* Aero behind form — same as home hero (CSM only) */}
            {slug === 'certified-scrum-master' && categorySlug === 'agile-and-scrum' ? (
              <div
                className="pointer-events-none absolute z-0 hidden lg:block"
                style={{ top: 40, right: -170, width: 360, height: 440 }}
                aria-hidden
              >
                <Image
                  src="/images/hero/aero-bg-v2.png"
                  alt=""
                  width={360}
                  height={440}
                  sizes="360px"
                  className="h-full w-full object-contain object-center"
                />
              </div>
            ) : null}
            <div className="relative z-10">
            <CourseLeadForm
              {...form}
              emphasizedFields={slug === 'certified-scrum-master' && categorySlug === 'agile-and-scrum'}
            />
            {licensedPartner ? (
              <div className="mt-5 lg:mt-6" aria-label="Licensed training partner">
                <CourseLicensedPartnerStrip {...licensedPartner} />
              </div>
            ) : null}
            </div>
          </div>

          <div
            ref={(el) => {
              rowRefs.current[2] = el;
            }}
            className="gsap-reveal-pending relative z-20 overflow-visible pb-6 lg:mb-[-125px] lg:col-span-2 lg:col-start-1 lg:row-start-2"
          >
            <CourseEnterpriseCard {...enterprise} courseId={courseId} />
          </div>
        </div>
      </div>
    </section>
  );
}
