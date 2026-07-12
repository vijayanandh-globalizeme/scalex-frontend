import Image from 'next/image';
import type { ApiCourseDetails } from '@/services/courseApi';

type ApiEligibility = NonNullable<ApiCourseDetails['eligibility']>;

const SECTION_CARD =
  'rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

function RequirementIcon({ icon }: { icon: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
      <i className={`fa fa-${icon} text-[18px]`} aria-hidden />
    </span>
  );
}

function CertificateDecorArrow({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="213"
      height="232"
      viewBox="0 0 213 232"
      fill="none"
      className={className}
      aria-hidden
    >
      <g opacity="0.2">
        <path fillRule="evenodd" clipRule="evenodd" d="M43.6367 68.5933L133.485 167.625H164.24L72.8533 68.5933H43.6367Z" fill="url(#eligibility-cert-arrow-paint0)" />
        <path fillRule="evenodd" clipRule="evenodd" d="M144.966 35.4368L33.8606 192.552C30.8679 196.784 30.2397 197.661 29.5974 198.579C28.9552 199.498 28.5432 200.112 27.9373 201.055C27.3314 201.998 26.7585 202.912 23.9799 207.288L11.8617 226.369C10.9895 227.743 11.3961 229.563 12.77 230.435C13.9658 231.194 15.5327 230.995 16.5006 229.961L32.2302 213.159C35.6835 209.47 36.3866 208.727 37.1044 207.955C37.8222 207.183 38.2728 206.682 38.9659 205.888C39.6591 205.093 40.3247 204.317 43.6329 200.497L168.132 56.7702C169.801 54.8435 171.332 52.8013 172.713 50.659C174.758 47.4895 175.899 48.1849 176.138 52.7461C176.305 55.9268 176.533 60.2794 176.823 65.8037C177.22 73.3714 183.678 79.1847 191.249 78.7881C198.819 78.3915 204.634 71.9351 204.237 64.3674L201.792 17.7242C201.772 17.3458 201.756 16.9673 201.744 16.5886C201.514 9.20896 200.235 4.72622 197.909 3.14037C191.827 -1.00541 178.855 1.41969 175.306 2.04706C170.345 2.9241 152.791 5.5188 122.644 9.83114C116.171 10.7571 111.674 16.7539 112.6 23.2253C112.652 23.5917 112.722 23.9555 112.809 24.3154L112.874 24.5884C114.547 31.5433 121.341 35.9988 128.389 34.7623L140.508 32.6356C140.776 32.5887 141.042 32.5398 141.309 32.4888C143.801 32.0118 145.297 31.9516 145.796 32.3074C146.321 32.681 146.044 33.7242 144.966 35.4368Z" fill="url(#eligibility-cert-arrow-paint1)" />
      </g>
      <defs>
        <linearGradient id="eligibility-cert-arrow-paint0" x1="54.2836" y1="80.1094" x2="150.049" y2="185.326" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF002F" /><stop offset="0.48" stopColor="#FFB700" /><stop offset="1" stopColor="#00C017" />
        </linearGradient>
        <linearGradient id="eligibility-cert-arrow-paint1" x1="175.838" y1="7.96832" x2="-4.47275" y2="232.086" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF002F" /><stop offset="0.475962" stopColor="#FFB700" /><stop offset="1" stopColor="#00C017" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CertificateGraphic({ certificationImage }: { certificationImage: ApiEligibility['certificationImage'] }) {
  if (!certificationImage) return null;
  return (
    <div className="relative mx-auto h-[260px] w-full max-w-[320px] shrink-0 overflow-visible lg:mx-0 lg:max-w-none lg:flex-1">
      <div className="absolute left-0 top-1/2 z-10 w-[253px] -translate-y-1/2">
        <Image
          src={certificationImage.url}
          alt="Certification"
          width={506}
          height={385}
          className="h-auto w-full object-contain"
          sizes="253px"
        />
      </div>
      <CertificateDecorArrow className="pointer-events-none absolute right-0 bottom-[calc(var(--spacing)*18)] z-0 h-[232px] w-[213px]" />
    </div>
  );
}

export default function CourseEligibilityRequirementsSection({
  eligibilityRequirements,
}: {
  eligibilityRequirements: ApiEligibility | null;
}) {
  if (!eligibilityRequirements) return null;

  const { title, description, requirements, subTitle, subContent, certificationImage } = eligibilityRequirements;

  // Split subContent by \n into rows, then split into two columns
  const roles = subContent
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const half = Math.ceil(roles.length / 2);
  const roleColumns = [roles.slice(0, half), roles.slice(half)];

  return (
    <div
      id="eligibility"
      className={`scroll-mt-[116px] overflow-visible px-6 py-5 md:px-8 md:py-6 ${SECTION_CARD}`}
    >
      <h2 className="section-heading text-heading">{title}</h2>
      <p className="mt-2 max-w-[720px] text-[14px] font-normal leading-normal text-muted">
        {description}
      </p>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
        <ul className="w-full max-w-[490px] shrink-0 sm:ml-[42px]" role="list">
          {requirements.map((item, index) => (
            <li
              key={item.title}
              className={`flex gap-4 py-5 ${index < requirements.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}
            >
              <RequirementIcon icon={item.icon} />
              <div className="min-w-0 pt-0.5">
                <p className="text-[14px] font-semibold leading-normal text-heading">{item.title}</p>
                <p className="mt-1.5 text-[14px] font-normal leading-normal text-muted">{item.content}</p>
              </div>
            </li>
          ))}
        </ul>

        <CertificateGraphic certificationImage={certificationImage} />
      </div>

      <div className="relative mt-8 min-h-[200px] overflow-visible rounded-[20px] border border-[#DCDCDC] bg-[linear-gradient(79deg,#FFF_49.08%,#FFD3D3_108.27%)] py-6 pl-6 pr-[10px] md:py-7 md:pl-8 md:pr-[10px]">
        <div className="relative z-10 w-full max-w-full md:max-w-[calc(100%-220px)]">
          <h3 className="text-[20px] font-semibold leading-[140%] text-heading">{subTitle}</h3>
          <div className="mt-4 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {roleColumns.map((column, colIndex) => (
              <ul key={colIndex} className="space-y-2.5" role="list">
                {column.map((role) => (
                  <li key={role} className="flex items-start gap-2.5 text-[14px] leading-normal text-heading">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" aria-hidden />
                    {role}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-2 z-20 hidden h-[280px] w-[240px] overflow-visible md:block lg:right-4 lg:h-[300px] lg:w-[260px]">
          <Image
            src="/images/hero/person.png"
            alt="Professional in business attire"
            width={520}
            height={808}
            className="h-full w-full object-contain object-bottom"
            sizes="260px"
          />
        </div>
      </div>
    </div>
  );
}
