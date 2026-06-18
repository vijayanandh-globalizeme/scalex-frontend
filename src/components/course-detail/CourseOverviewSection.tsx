import type { CourseBodyContent } from '@/lib/courseBody';
import CourseBrochureCta from './CourseBrochureCta';
import CourseCareerSection from './CourseCareerSection';
import CourseDownloadIcon from './CourseDownloadIcon';

function StandoutFeatureIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-overview-feature-clip)">
        <path
          d="M9.14693 0.667916L10.2142 1.74503C10.3251 1.85062 10.4221 1.88583 10.5676 1.88583H12.0645C13.3119 1.88583 13.8802 2.47718 13.8802 3.73029V5.25795C13.8802 5.39876 13.9218 5.50435 14.0258 5.60996L15.086 6.6941C15.9593 7.58116 15.9662 8.40478 15.086 9.29183L14.0258 10.376C13.9218 10.4887 13.8802 10.5872 13.8802 10.7351V12.2556C13.8802 13.5228 13.305 14.1001 12.0645 14.1001H10.5676C10.4221 14.1001 10.3251 14.1423 10.2142 14.248L9.14693 15.325C8.27371 16.2121 7.46294 16.2192 6.58971 15.325L5.52247 14.248C5.41851 14.1423 5.31457 14.1001 5.17596 14.1001H3.67211C2.43162 14.1001 1.85642 13.5158 1.85642 12.2556V10.7351C1.85642 10.5872 1.82176 10.4887 1.71782 10.376L0.657501 9.29183C-0.215698 8.40478 -0.222629 7.58116 0.657501 6.6941L1.71782 5.60996C1.82176 5.50435 1.85642 5.39876 1.85642 5.25795V3.73029C1.85642 2.4631 2.43162 1.88583 3.67211 1.88583H5.17596C5.31457 1.88583 5.41851 1.85062 5.52247 1.74503L6.58971 0.667916C7.46294 -0.219115 8.27371 -0.226155 9.14693 0.667916ZM10.027 5.20164L7.06789 10.031L5.66107 8.18657C5.48782 7.95422 5.33535 7.88387 5.14131 7.88387C4.82252 7.88387 4.57997 8.14432 4.57997 8.46815C4.57997 8.62307 4.64234 8.78498 4.74629 8.92577L6.48576 11.0941C6.66594 11.3405 6.85999 11.432 7.09561 11.432C7.33123 11.432 7.5322 11.3193 7.67775 11.0941L10.9349 5.87747C11.0181 5.73667 11.1082 5.57476 11.1082 5.41284C11.1082 5.089 10.824 4.8778 10.5261 4.8778C10.3389 4.8778 10.1587 4.9834 10.027 5.20164Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-overview-feature-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function CourseOverviewSection({
  overview,
  career,
  variant = 'default',
}: {
  overview: CourseBodyContent['overview'];
  career: CourseBodyContent['career'];
  variant?: 'default' | 'technical';
}) {
  const isTechnical = variant === 'technical';
  const skillColumns = [
    overview.skills.slice(0, 3),
    overview.skills.slice(3, 6),
    overview.skills.slice(6, 9),
  ];

  return (
    <div
      id="overview"
      className="scroll-mt-[116px] rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]"
    >
      <div className="border-b border-zinc-100 px-6 py-5 md:px-8 md:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            className={
              isTechnical
                ? 'text-[32px] font-bold leading-normal text-[#1E293B]'
                : 'text-[34px] font-bold leading-[140%] text-heading'
            }
          >
            {overview.title}
          </h2>
          <CourseBrochureCta
            href="#brochure"
            className={
              isTechnical
                ? 'btn-brand-outline inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start px-5 text-[14px] font-semibold sm:self-auto'
                : 'btn-brand-outline inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start px-5 text-[13px] font-semibold sm:self-auto'
            }
          >
            {overview.downloadGuideLabel}
            <CourseDownloadIcon className="btn-download-icon shrink-0" />
          </CourseBrochureCta>
        </div>
        <p
          className={
            isTechnical
              ? 'mt-4 text-[14px] font-normal leading-[150%] text-[#788593]'
              : 'mt-4 text-[18px] font-medium leading-[140%] text-muted'
          }
        >
          {overview.description}
        </p>

        <h3
          className={
            isTechnical
              ? 'mt-8 text-[20px] font-bold leading-normal text-[#1E293B]'
              : 'mt-8 text-[20px] font-semibold leading-[140%] text-heading'
          }
        >
          {overview.standoutTitle}
        </h3>
        <ul className="mt-4 grid gap-5 md:grid-cols-3" role="list">
          {overview.features.map((feature) => (
            <li key={feature.id} className="flex gap-3">
              <StandoutFeatureIcon className="mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p
                  className={
                    isTechnical
                      ? 'text-[14px] font-bold leading-normal text-[#1E293B]'
                      : 'text-[16px] font-medium text-heading'
                  }
                >
                  {feature.title}
                </p>
                <p
                  className={
                    isTechnical
                      ? 'mt-1 text-[14px] font-normal leading-[140%] text-[#788593]'
                      : 'mt-1 text-[14px] font-normal leading-[140%] text-muted'
                  }
                >
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <h3
          className={
            isTechnical
              ? 'mt-8 text-[20px] font-bold leading-normal text-[#1E293B]'
              : 'mt-8 text-[20px] font-semibold leading-[140%] text-heading'
          }
        >
          {overview.skillsTitle}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {skillColumns.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-2" role="list">
              {column.map((skill) => (
                <li
                  key={skill}
                  className={
                    isTechnical
                      ? 'flex items-start gap-2 text-[14px] font-normal leading-normal text-[#1E293B]'
                      : 'flex items-start gap-2 text-[16px] font-normal text-heading'
                  }
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" aria-hidden />
                  {skill}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <CourseCareerSection career={career} />
    </div>
  );
}
