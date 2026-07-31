'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { TECH_WEBINER } from '@/lib/courseDetailStatics';
import TechnicalCourseWebinarCountdown from './TechnicalCourseWebinarCountdown';
import CourseBrochureCta from './CourseBrochureCta';

function ScaleXMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={47}
      height={51}
      viewBox="0 0 47 51"
      fill="none"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.56738 15.0413L29.2686 36.7562H36.0124L15.9738 15.0413H9.56738Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.787 7.77035L7.42468 42.2213C6.76847 43.1492 6.63072 43.3415 6.48989 43.543C6.34906 43.7444 6.25872 43.8791 6.12587 44.0859C5.99302 44.2926 5.8674 44.4931 5.25812 45.4525L2.60094 49.6365C2.40969 49.9377 2.49886 50.3368 2.8001 50.528C3.06232 50.6944 3.40589 50.6508 3.61813 50.4241L7.06718 46.7399C7.8244 45.931 7.97857 45.7681 8.13596 45.5988C8.29336 45.4294 8.39217 45.3197 8.54415 45.1455C8.69613 44.9713 8.84208 44.801 9.56748 43.9635L36.8667 12.4482C37.2326 12.0257 37.5683 11.5779 37.8711 11.1082C38.3196 10.4132 38.5699 10.5656 38.6223 11.5658C38.6588 12.2632 38.7089 13.2176 38.7724 14.429C38.8594 16.0883 40.2756 17.3631 41.9355 17.2761C43.5954 17.1891 44.8706 15.7734 44.7836 14.114L44.2474 3.88646C44.243 3.8035 44.2396 3.72049 44.237 3.63746C44.1863 2.01931 43.906 1.03637 43.3959 0.688639C42.0623 -0.220417 39.218 0.311341 38.4398 0.448905C37.3519 0.641217 33.5028 1.21016 26.8924 2.15574C25.473 2.35879 24.4869 3.67371 24.69 5.0927C24.7015 5.17305 24.7168 5.25281 24.7358 5.33173L24.7502 5.3916C25.1169 6.9166 26.6067 7.89358 28.1521 7.62246L30.8096 7.15612C30.8682 7.14584 30.9267 7.13511 30.9851 7.12394C31.5315 7.01933 31.8595 7.00614 31.9691 7.08416C32.0842 7.16608 32.0235 7.39481 31.787 7.77035Z"
        fill="white"
      />
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

export default function CourseWebinarCtaSection({
  startedAt,
  courseId = null,
}: {
  startedAt?: string | null;
  courseId?: string | null;
}) {
  const content = TECH_WEBINER;
  return (
    <section
      id="webinar-cta"
      className="relative mb-15 scroll-mt-[116px] pt-0 md:pt-[22px]"
      aria-labelledby="webinar-cta-heading"
      style={
        {
          '--webinar-person-left': 'max(0.75rem, 8%)',
          '--webinar-content-left': 'max(calc(8% + 9.5rem), 38%)',
        } as CSSProperties
      }
    >
      {/* Mobile: text + CTA only (image shown on sm+) */}
      <div className="block sm:hidden rounded-[20px] overflow-hidden border border-[#EBEBEB] bg-[linear-gradient(88deg,#0D0D0D_88.67%,#FD022D_106.46%)] shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)]">
        <div className="px-6 py-6">
          <p
            id="webinar-cta-heading"
            className="text-[16px] font-semibold leading-normal tracking-[-0.54px] text-[#E5E5E5]"
          >
            {content.headingLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
          <CourseBrochureCta
            openModal
            type="webinar"
            courseId={courseId}
            className="btn-brand mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg px-5 text-[14px] font-medium leading-[18px] text-white"
          >
            {content.ctaLabel}
            <ArrowRightIcon className="btn-arrow-icon shrink-0 text-white" />
          </CourseBrochureCta>
          <div className="mt-5">
            <p className="text-[14px] font-medium leading-normal text-[#E5E5E5]">
              {content.countdownLabel}
            </p>
            <div className="mt-3">
              <TechnicalCourseWebinarCountdown targetDate={startedAt} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: side-by-side absolute layout */}
      <div className="relative hidden sm:block pt-[72px]">
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-[linear-gradient(88deg,#0D0D0D_88.67%,#FD022D_106.46%)] shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)]"
          style={{ top: '72px' }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 z-[5]"
          style={{ left: 'var(--webinar-person-left)', width: '241px', height: '422px' }}
        >
          <ScaleXMark className="pointer-events-none absolute bottom-[50px] right-[-60px] z-[1] h-[220px] w-[200px] opacity-[0.18]" />
          <div className="relative z-10 h-full w-full">
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              sizes="241px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
        <div className="relative z-10 flex min-h-[350px] flex-col justify-center py-8 pr-8 pl-[var(--webinar-content-left)]">
          <div className="ml-[150px]">
            <p
              className="max-w-md text-[18px] font-semibold leading-normal tracking-[-0.54px] text-[#E5E5E5]"
            >
              {content.headingLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
            <CourseBrochureCta
              openModal
              type="webinar"
              courseId={courseId}
              className="btn-brand mt-4 inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg px-5 text-[14px] font-medium leading-[18px] text-white"
            >
              {content.ctaLabel}
              <ArrowRightIcon className="btn-arrow-icon shrink-0 text-white" />
            </CourseBrochureCta>
            <div className="mt-5">
              <p className="text-[16px] font-medium leading-normal text-[#E5E5E5]">
                {content.countdownLabel}
              </p>
              <div className="mt-3">
                <TechnicalCourseWebinarCountdown targetDate={startedAt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

