import { LogoMarquee } from '@/components/shared';
import type { CoursePartnerLogo } from '@/lib/courses';
import { COURSE_SECTION_CARD } from './courseSectionCard';
import CourseBrochureCta from './CourseBrochureCta';

export interface CourseEnterpriseCardProps {
  headingHighlight: string;
  headingRest: string;
  cta: { label: string; href: string };
  partners: CoursePartnerLogo[];
  courseId?: string | null;
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function toMarqueeLogos(partners: CoursePartnerLogo[]) {
  return partners.map((partner) => ({
    id: partner.id,
    src: partner.logoSrc,
    alt: partner.logoAlt,
  }));
}

export function CourseEnterpriseCard({
  headingHighlight,
  headingRest,
  cta,
  partners,
  courseId = null,
}: CourseEnterpriseCardProps) {
  return (
    <div
      className={`relative z-10 flex w-full min-w-0 flex-col overflow-visible ${COURSE_SECTION_CARD} gap-4 px-5 py-6 md:px-[68px] md:py-8`}
      aria-labelledby="course-enterprise-heading"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <h2
          id="course-enterprise-heading"
          className="text-left text-[20px] font-semibold leading-normal text-heading md:whitespace-nowrap"
        >
          <span className="text-brand">{headingHighlight}</span>{' '}
          <span>{headingRest}</span>
        </h2>
        <CourseBrochureCta
          openModal
          type="contact"
          courseId={courseId}
          className="btn-brand-outline inline-flex h-[48px] shrink-0 items-center justify-center gap-2 self-start px-6 text-[14px] font-semibold md:self-auto"
        >
          {cta.label}
          <ArrowRightIcon className="btn-arrow-icon shrink-0 text-brand" />
        </CourseBrochureCta>
      </div>

      {partners.length > 0 ? (
        <div className="flex min-w-0 flex-col overflow-x-clip">
          <LogoMarquee
            logos={toMarqueeLogos(partners)}
            ariaLabel="Enterprise training partners"
            size="xl"
            largeOnMobile
          />
        </div>
      ) : null}
    </div>
  );
}

/** Spacer below hero — matches category courses section top padding for overlapping card. */
export default function CourseEnterpriseSection({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`full-bleed relative z-0 overflow-visible bg-[#F5F6F8] pb-10 md:pb-12 ${
        compact ? 'pt-12 md:pt-14' : 'pt-10 md:pt-20'
      }`}
      aria-hidden
    />
  );
}
