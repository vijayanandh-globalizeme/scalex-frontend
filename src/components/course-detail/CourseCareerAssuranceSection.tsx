'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { CAREER_ASSURANCE } from '@/lib/courseDetailStatics';
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

function FeatureCheckIcon() {
  return (
    <svg
      className="mt-0.5 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#career-assurance-bullet-clip)">
        <path
          d="M8.57525 0.626172L9.57579 1.63596C9.67977 1.73496 9.77072 1.76796 9.90717 1.76796H11.3105C12.4799 1.76796 13.0127 2.32235 13.0127 3.49714V4.92933C13.0127 5.06133 13.0517 5.16033 13.1492 5.25933L14.1432 6.27572C14.9618 7.10734 14.9683 7.87948 14.1432 8.71109L13.1492 9.72748C13.0517 9.83311 13.0127 9.9255 13.0127 10.0641V11.4897C13.0127 12.6776 12.4735 13.2188 11.3105 13.2188H9.90717C9.77072 13.2188 9.67977 13.2584 9.57579 13.3575L8.57525 14.3672C7.7566 15.1988 6.9965 15.2055 6.17785 14.3672L5.17732 13.3575C5.07986 13.2584 4.98241 13.2188 4.85246 13.2188H3.44261C2.27965 13.2188 1.74039 12.6711 1.74039 11.4897V10.0641C1.74039 9.9255 1.7079 9.83311 1.61045 9.72748L0.616407 8.71109C-0.202217 7.87948 -0.208714 7.10734 0.616407 6.27572L1.61045 5.25933C1.7079 5.16033 1.74039 5.06133 1.74039 4.92933V3.49714C1.74039 2.30916 2.27965 1.76796 3.44261 1.76796H4.85246C4.98241 1.76796 5.07986 1.73496 5.17732 1.63596L6.17785 0.626172C6.9965 -0.205421 7.7566 -0.212021 8.57525 0.626172ZM9.40035 4.87653L6.62615 9.40409L5.30726 7.67491C5.14483 7.45709 5.00189 7.39112 4.81998 7.39112C4.52112 7.39112 4.29372 7.6353 4.29372 7.93889C4.29372 8.08412 4.35219 8.23592 4.44965 8.36791L6.0804 10.4007C6.24932 10.6317 6.43124 10.7175 6.65214 10.7175C6.87303 10.7175 7.06144 10.6119 7.19789 10.4007L10.2515 5.51013C10.3294 5.37813 10.4139 5.22633 10.4139 5.07453C10.4139 4.77094 10.1475 4.57294 9.86818 4.57294C9.69275 4.57294 9.52383 4.67194 9.40035 4.87653Z"
          fill="#E5E5E5"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="career-assurance-bullet-clip">
          <rect width="15" height="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="14"
      viewBox="0 0 10 13"
      fill="none"
      aria-hidden
    >
      <path
        d="M9.79582 5.8964V9.88601C9.79582 11.2746 8.96798 12.0518 7.48346 12.0518H2.30684C0.822297 12.0518 0 11.2746 0 9.88601V5.8964C0 4.50261 0.822297 3.73059 2.30684 3.73059H3.42164V4.56479H2.30684C1.40177 4.56479 0.888524 5.04665 0.888524 5.8964V9.88601C0.888524 10.7358 1.40177 11.2176 2.30684 11.2176H7.48346C8.39404 11.2176 8.90728 10.7358 8.90728 9.88601V5.8964C8.90728 5.04665 8.39404 4.56479 7.48346 4.56479H6.37418V3.73059H7.48346C8.96798 3.73059 9.79582 4.50261 9.79582 5.8964Z"
        fill="currentColor"
      />
      <path
        d="M4.90069 0.974121C4.66338 0.974121 4.45918 1.15546 4.45918 1.37308V6.64249L4.52541 8.04144C4.53644 8.23318 4.69649 8.38859 4.90069 8.38859C5.09936 8.38859 5.2594 8.23318 5.27044 8.04144L5.33667 6.64249V1.37308C5.33667 1.15546 5.13799 0.974121 4.90069 0.974121ZM3.0243 6.13473C2.79252 6.13473 2.62695 6.28499 2.62695 6.49743C2.62695 6.61139 2.67662 6.69432 2.7594 6.77205L4.5806 8.41968C4.69097 8.52335 4.78479 8.55439 4.90069 8.55439C5.01106 8.55439 5.10488 8.52335 5.21526 8.41968L7.03646 6.77205C7.11925 6.69432 7.16887 6.61139 7.16887 6.49743C7.16887 6.28499 6.99227 6.13473 6.76605 6.13473C6.65563 6.13473 6.54526 6.17617 6.46801 6.2591L5.6126 7.114L4.90069 7.82385L4.18324 7.114L3.32783 6.2591C3.25057 6.17617 3.13468 6.13473 3.0243 6.13473Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CourseCareerAssuranceSection() {
  const content = CAREER_ASSURANCE;
  return (
    <section
      id="career-assurance"
      className="relative scroll-mt-[116px] pt-0"
      aria-labelledby="career-assurance-heading"
      style={
        {
          '--assurance-person-left': 'max(0.75rem, 8%)',
          '--assurance-content-left': 'max(calc(8% + 9.5rem), 42%)',
        } as CSSProperties
      }
    >
      {/* Outer wrapper — overflow-visible so person head pokes above card */}
      <div className="relative" style={{ paddingTop: '0' }}>
        {/* Dark card background — clipped to card bounds */}
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden rounded-[20px] border border-[#EBEBEB] shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)]"
          style={{ top: '0' }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[linear-gradient(88deg,#0D0D0D_88.67%,#FD022D_106.46%)]" />
        </div>

        {/* Person — desktop only */}
        <div
          className="absolute bottom-0 z-[5] hidden sm:block"
          style={{ left: 'var(--assurance-person-left)', width: '282px', height: '302px' }}
        >
          <ScaleXMark className="pointer-events-none absolute bottom-[28px] right-[-36px] z-[1] h-[200px] w-[200px] opacity-[0.18]" />
          <div className="relative z-10 h-full w-full">
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              sizes="297px"
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-8 sm:mt-15 flex flex-col justify-end px-6 py-6 sm:py-8 sm:pr-8 sm:pl-[var(--assurance-content-left)] sm:pt-8">
          <div className="w-full sm:w-[350px] sm:ml-[150px]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h2
              id="career-assurance-heading"
              className="text-[16px] font-semibold leading-[140%] text-white sm:text-[18px]"
            >
              {content.brandTitle}
            </h2>
          </div>

          <p className="mt-2 max-w-xl text-[13px] font-normal leading-[150%] text-[#B8B8B8] sm:text-[14px]">
            {content.subheading}
          </p>

          <ul className="mt-5 space-y-2.5" role="list">
            {content.features.map((feature) => (
              <li key={feature.id} className="flex items-start gap-2.5">
                <FeatureCheckIcon />
                <span className="text-[13px] font-medium leading-[150%] text-white sm:text-[14px]">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>

          <CourseBrochureCta
            openModal
            className="btn-brand mt-6 inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg px-5 text-[13px] font-semibold leading-[18px] text-white sm:text-[14px]"
          >
            {content.ctaLabel}
            <DownloadIcon className="shrink-0 text-white" />
          </CourseBrochureCta>
          </div>
        </div>
      </div>
    </section>
  );
}

