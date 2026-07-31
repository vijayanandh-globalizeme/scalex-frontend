'use client';

import Image from 'next/image';
import type { CourseBodyContent } from '@/lib/courseBody';
import { COURSE_SECTION_CARD } from './courseSectionCard';
import CourseAssistForm from './CourseAssistForm';
import CourseBrochureCta from './CourseBrochureCta';
import CourseDownloadIcon from './CourseDownloadIcon';

function MentorshipCrossIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51 55"
      fill="none"
      className={className}
      aria-hidden
    >
      <g opacity="0.2">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.2891 16.172L31.4723 39.5205H38.7234L17.1774 16.172H10.2891Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.1782 8.35467L7.9832 45.3972C7.27763 46.3949 7.12952 46.6017 6.9781 46.8183C6.82667 47.0348 6.72953 47.1797 6.58669 47.402C6.44385 47.6243 6.30878 47.8398 5.65367 48.8714L2.79659 53.3702C2.59095 53.694 2.68683 54.1232 3.01074 54.3287C3.29269 54.5077 3.6621 54.4607 3.8903 54.217L7.59881 50.2557C8.41299 49.386 8.57876 49.2108 8.74799 49.0287C8.91723 48.8467 9.02347 48.7287 9.18688 48.5414C9.3503 48.3541 9.50722 48.1709 10.2872 47.2705L39.64 13.3844C40.0335 12.9301 40.3943 12.4486 40.7199 11.9436C41.2022 11.1963 41.4713 11.3602 41.5276 12.4356C41.567 13.1855 41.6208 14.2117 41.689 15.5142C41.7826 17.2984 43.3053 18.669 45.0901 18.5755C46.8749 18.482 48.2459 16.9598 48.1524 15.1755L47.5759 4.17861C47.5712 4.08941 47.5675 4.00016 47.5647 3.91088C47.5103 2.17101 47.2088 1.11412 46.6603 0.740234C45.2264 -0.237205 42.1681 0.334554 41.3314 0.482466C40.1617 0.689244 36.023 1.30099 28.9154 2.3177C27.3892 2.53602 26.329 3.94986 26.5473 5.47559C26.5597 5.56198 26.5761 5.64775 26.5965 5.7326L26.612 5.79697C27.0063 7.4367 28.6082 8.48717 30.2698 8.19565L33.1272 7.69423C33.1902 7.68317 33.2532 7.67164 33.316 7.65963C33.9034 7.54715 34.2561 7.53296 34.374 7.61686C34.4977 7.70494 34.4325 7.95088 34.1782 8.35467Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

function MentorshipPhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#mentorship-phone-clip)">
        <path
          d="M8.02614 10.9998C8.98793 10.9998 9.62364 10.7351 10.1819 10.0987C10.2261 10.048 10.2648 10.0029 10.309 9.95224C10.6407 9.58053 10.7955 9.21442 10.7955 8.86521C10.7955 8.4597 10.5689 8.06544 10.0769 7.72188L8.68947 6.75314C8.26381 6.46027 7.9045 6.44337 7.37384 6.70244L6.5171 7.1305C6.35125 7.20933 6.20754 7.20934 6.04724 7.108C5.80401 6.95026 5.19045 6.44902 4.77588 6.01532C4.35578 5.58728 3.94673 5.07475 3.76432 4.75372C3.69246 4.62418 3.70352 4.51717 3.79748 4.3651L4.29497 3.57096C4.51055 3.22176 4.57688 2.74302 4.3005 2.33751L3.20603 0.737959C2.86331 0.236693 2.49297 0.00577297 2.09497 0.000140779C1.75226 -0.00549142 1.39297 0.157843 1.02261 0.495775C0.978394 0.5352 0.92864 0.580256 0.884422 0.625316C0.259799 1.18853 0 1.83624 0 2.81061C0 4.42142 0.978394 6.39267 2.75276 8.19498C4.51608 9.99169 6.44521 10.9998 8.02614 10.9998ZM8.03168 10.1437C6.6221 10.1719 4.8201 9.06799 3.38844 7.6149C1.94573 6.1505 0.812564 4.24682 0.840204 2.80498C0.851258 2.18544 1.06131 1.65601 1.49799 1.26739C1.53116 1.23922 1.56432 1.21106 1.59749 1.18291C1.76331 1.03647 1.94573 0.957615 2.1005 0.957615C2.26633 0.957615 2.40452 1.01957 2.51507 1.18854L3.51005 2.70923C3.60402 2.85004 3.59849 2.97394 3.48794 3.17107L2.93518 4.07222C2.69196 4.47211 2.73618 4.77625 2.97939 5.11418C3.3 5.54786 3.7809 6.17305 4.20653 6.60111C4.62663 7.0291 5.32864 7.63739 5.71005 7.90776C6.04169 8.15559 6.34021 8.21188 6.85428 7.95846L7.78291 7.50785C7.99297 7.41212 8.15881 7.44026 8.3357 7.5529L9.62913 8.43721C9.79498 8.54419 9.85577 8.69063 9.85577 8.85961C9.85577 9.01729 9.77839 9.20317 9.63468 9.3721C9.60706 9.4059 9.57938 9.4397 9.55176 9.47349C9.17036 9.91844 8.6452 10.1325 8.03168 10.1437Z"
          fill="white"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="mentorship-phone-clip">
          <rect width="11" height="11" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function MentorshipCard({
  mentorship,
  phone,
}: {
  mentorship: CourseBodyContent['sidebar']['mentorship'];
  phone: string;
}) {
  return (
    <div className="relative overflow-visible">
      <div className="pointer-events-none absolute bottom-0 left-4 z-50 h-[108px] w-[88px] -translate-x-1/2">
        <Image
          src={mentorship.imageSrc}
          alt={mentorship.imageAlt}
          fill
          sizes="88px"
          className="object-contain object-bottom"
        />
      </div>
      <div className="relative overflow-visible rounded-[20px] border border-[#EBEBEB] bg-[#0D0D0D] shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]">
        <MentorshipCrossIcon className="pointer-events-none absolute bottom-1 left-5 z-10 h-[54.472px] w-[50.089px]" />
        <div className="relative flex h-[80px] items-center pl-[94px] pr-3">
          <div className="relative z-10 min-w-0">
            <p className="text-[12px] font-medium leading-[140%] text-[#E5E5E5]">{mentorship.title}</p>
            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-medium leading-[140%] text-white transition hover:text-white/90"
            >
              <MentorshipPhoneIcon className="h-[11px] w-[11px] shrink-0" />
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_MENTORSHIP_PHONE = '+91 98480 32919';

export default function CourseDetailSidebar({
  sidebar,
  courseId = null,
  brochureUrl = null,
  stickyTop = 'calc(4rem + 4.5rem)',
  width = 'w-[246px]',
  mentorshipPhone,
}: {
  sidebar: CourseBodyContent['sidebar'];
  courseId?: string | null;
  brochureUrl?: string | null;
  stickyTop?: string;
  width?: string;
  mentorshipPhone?: string;
}) {
  return (
    <aside className={`hidden ${width} shrink-0 overflow-visible lg:block`} aria-label="Course assistance">
      <div className="sticky z-30 flex flex-col overflow-visible" style={{ top: stickyTop }}>
        <CourseAssistForm
          config={{
            assistTitle: sidebar.assistTitle,
            purposes: sidebar.purposes,
            termsHref: sidebar.termsHref,
            privacyHref: sidebar.privacyHref,
            ctaLabel: sidebar.ctaLabel,
          }}
        />

        <div className={`scroll-mt-[116px] mt-5 shrink-0 ${COURSE_SECTION_CARD} p-5`}>
          <p className="text-center text-[16px] font-medium leading-normal text-heading">
            {sidebar.brochureText}
          </p>
          <CourseBrochureCta
            openModal
            courseId={courseId}
            downloadUrl={brochureUrl}
            className="btn-brand-outline mt-4 inline-flex h-10 w-full items-center justify-center gap-2 text-[13px] font-semibold"
          >
            {sidebar.brochureCtaLabel}
            <CourseDownloadIcon className="btn-download-icon shrink-0" />
          </CourseBrochureCta>
        </div>

        <div className="relative z-50 -ml-[44px] mt-[50px] overflow-visible pl-[44px]">
          <MentorshipCard mentorship={sidebar.mentorship} phone={mentorshipPhone || DEFAULT_MENTORSHIP_PHONE} />
        </div>
      </div>
    </aside>
  );
}

