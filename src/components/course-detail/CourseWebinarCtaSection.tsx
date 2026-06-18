'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { CourseWebinarCtaContent } from '@/lib/courseBody';
import TechnicalCourseWebinarCountdown from './TechnicalCourseWebinarCountdown';

const WEBINAR_BANNER_SURFACE =
  'pointer-events-none absolute inset-0 rounded-[20px] border border-[#EBEBEB] bg-[linear-gradient(88deg,#0D0D0D_88.67%,#FD022D_106.46%)] shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)]';

function WebinarDecorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="190"
      height="206"
      viewBox="0 0 190 206"
      fill="none"
      aria-hidden
    >
      <g opacity="0.14">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.6735 60.9705L118.511 149.177L145.721 149.38L65.5219 61.1628L39.6735 60.9705Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M129.542 32.3057L30.2113 170.576C27.5358 174.3 26.9742 175.072 26.4 175.881C25.8257 176.689 25.4571 177.23 24.9149 178.06C24.3727 178.89 23.8598 179.695 21.3727 183.548L10.5259 200.35C9.74522 201.559 10.093 203.172 11.3027 203.953C12.3557 204.632 13.7433 204.466 14.6064 203.558L28.6332 188.797C31.7127 185.556 32.3396 184.903 32.9798 184.225C33.6199 183.546 34.0219 183.107 34.6403 182.408C35.2588 181.71 35.8527 181.027 38.8047 177.67L149.897 51.3322C151.386 49.6386 152.754 47.8419 153.99 45.9556C155.82 43.165 156.826 43.7877 157.007 47.8247C157.134 50.6398 157.307 54.4921 157.527 59.3814C157.828 66.0793 163.504 71.265 170.204 70.9639C176.904 70.6629 182.091 64.9891 181.79 58.2912L179.934 17.0092C179.919 16.6743 179.907 16.3393 179.899 16.0042C179.744 9.47381 178.642 5.49945 176.594 4.08111C171.241 0.373226 159.749 2.43335 156.605 2.96502C152.21 3.70829 136.662 5.88828 109.962 9.50499C104.229 10.2816 100.211 15.5574 100.988 21.2889C101.032 21.6134 101.091 21.9357 101.165 22.2546L101.222 22.4966C102.656 28.6607 108.637 32.6473 114.881 31.5998L125.617 29.798C125.854 29.7583 126.09 29.7168 126.326 29.6735C128.534 29.2678 129.858 29.2244 130.298 29.5425C130.76 29.8765 130.508 30.7976 129.542 32.3057Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

export default function CourseWebinarCtaSection({ content }: { content: CourseWebinarCtaContent }) {
  return (
    <section
      id="webinar-cta"
      className="relative scroll-mt-[116px] overflow-visible pt-[22px]"
      aria-labelledby="webinar-cta-heading"
    >
      <div
        className="relative min-h-[240px] overflow-visible sm:min-h-[220px]"
        style={
          {
            '--webinar-person-left': 'max(0.75rem, 8%)',
            '--webinar-content-left': 'max(calc(8% + 9.5rem), 38%)',
          } as CSSProperties
        }
      >
        <div className={WEBINAR_BANNER_SURFACE} aria-hidden />

        <div
          className="absolute bottom-0 z-[1] h-[250px] w-[clamp(10rem,30%,14rem)]"
          style={{ left: 'var(--webinar-person-left)' }}
        >
          <WebinarDecorIcon className="pointer-events-none absolute bottom-6 left-[24%] z-0 h-auto w-[clamp(7rem,40%,9.5rem)]" />
          <div className="relative z-10 -mt-5 h-[255px] w-[clamp(8rem,64%,11rem)] overflow-visible">
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              sizes="176px"
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div className="relative z-10 flex min-h-[240px] flex-col justify-center px-6 pt-[210px] pb-8 sm:min-h-[220px] sm:py-8 sm:pr-8 sm:pl-[var(--webinar-content-left)] sm:pt-8">
          <p
            id="webinar-cta-heading"
            className="max-w-md text-[16px] font-semibold leading-normal tracking-[-0.54px] text-[#E5E5E5] sm:text-[18px]"
          >
            {content.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <Link
            href={content.ctaHref}
            className="btn-brand mt-4 inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg px-5 text-[14px] font-medium leading-[18px] text-white"
          >
            {content.ctaLabel}
            <ArrowRightIcon className="btn-arrow-icon shrink-0 text-white" />
          </Link>

          <div className="mt-5">
            <p className="text-[14px] font-medium leading-normal text-[#E5E5E5] sm:text-[16px]">
              {content.countdownLabel}
            </p>
            <div className="mt-3">
              <TechnicalCourseWebinarCountdown />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
