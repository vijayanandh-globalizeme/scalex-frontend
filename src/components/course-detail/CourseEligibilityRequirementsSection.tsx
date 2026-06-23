import Image from 'next/image';
import type { CourseEligibilityRequirementItem, CourseEligibilityRequirementsContent } from '@/lib/courseBody';

const SECTION_CARD =
  'rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

function RequirementIcon({ type }: { type: CourseEligibilityRequirementItem['icon'] }) {
  if (type === 'forbidden') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <g clipPath="url(#eligibility-forbidden-clip)">
          <path
            d="M2.75727 4.78741C2.18452 5.71671 1.85744 6.81714 1.85744 7.9963C1.85744 11.3776 4.54682 14.1114 7.87312 14.1114C9.03433 14.1114 10.1179 13.7783 11.0327 13.195L11.9059 14.0821C10.7542 14.8727 9.36633 15.3345 7.87312 15.3345C3.88863 15.3345 0.654297 12.0467 0.654297 7.9963C0.654297 6.4799 1.10765 5.07038 1.88425 3.90045L2.75727 4.78741ZM15.092 7.9963C15.092 9.51992 14.6344 10.9356 13.8507 12.1086L12.9788 11.2223C13.5578 10.2893 13.8888 9.18267 13.8888 7.9963C13.8888 4.61503 11.1995 1.88123 7.87312 1.88123C6.70609 1.88123 5.61743 2.21775 4.69958 2.80629L3.82766 1.91997C4.9816 1.12343 6.3743 0.658203 7.87312 0.658203C11.8577 0.658203 15.092 3.94597 15.092 7.9963Z"
            fill="white"
          />
          <path
            d="M13.9669 14.9965C14.1793 15.2122 14.5332 15.2051 14.7384 14.9892C14.9507 14.7662 14.9507 14.4209 14.7384 14.2051L1.75861 1.00367C1.54629 0.78784 1.1995 0.78784 0.980102 1.00367C0.774862 1.2123 0.774862 1.57921 0.980102 1.78784L13.9669 14.9965Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="eligibility-forbidden-clip">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (type === 'book') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        aria-hidden
      >
        <g clipPath="url(#eligibility-book-clip)">
          <path
            d="M0 14.5541C0 15.2599 0.478299 15.5353 1.00089 15.5353C1.30204 15.5353 1.5589 15.3631 1.89548 15.1651C2.86979 14.5196 4.0744 14.1237 5.30558 14.1324C6.58104 14.1409 7.84764 14.5971 8.83967 15.5266C9.22942 15.8709 9.51285 15.9828 9.84055 15.9828C10.1594 15.9828 10.4517 15.8709 10.8326 15.5266C11.8246 14.6057 13.0912 14.1409 14.3755 14.1324C15.6067 14.1237 16.8025 14.5196 17.7768 15.1651C18.1134 15.3631 18.3702 15.5353 18.6802 15.5353C19.194 15.5353 19.6723 15.2599 19.6723 14.5541V2.87466C19.6723 2.72835 19.6634 2.60785 19.566 2.46154C18.7776 1.12749 16.7759 0 14.3401 0C12.4092 0 10.7351 0.748789 9.84055 1.80742C8.94596 0.748789 7.26306 0 5.341 0C2.89637 0 0.894596 1.12749 0.106289 2.46154C0.0177147 2.60785 0 2.72835 0 2.87466V14.5541ZM1.42604 13.8225V3.07262C2.14349 2.06563 3.70239 1.38569 5.341 1.38569C7.02391 1.38569 8.49423 2.07424 9.12312 3.12426V13.9688C8.21966 13.2717 6.81134 12.7466 5.341 12.7466C3.79982 12.7466 2.36492 13.1684 1.42604 13.8225ZM10.5492 13.9688V3.12426C11.178 2.07424 12.6572 1.38569 14.3401 1.38569C15.9699 1.38569 17.5288 2.06563 18.2462 3.07262V13.8225C17.3073 13.1684 15.8724 12.7466 14.3401 12.7466C12.8609 12.7466 11.4526 13.2717 10.5492 13.9688Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="eligibility-book-clip">
            <rect width="20" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="28"
      viewBox="0 0 19 28"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#eligibility-bulb-clip)">
        <path
          d="M2.19018 12.7316C2.5618 12.7316 2.88597 12.4188 2.88597 12.0418C2.88597 11.6569 2.5618 11.344 2.19018 11.344H0.672076C0.308364 11.344 0 11.6648 0 12.0418C0 12.4108 0.308364 12.7316 0.672076 12.7316H2.19018ZM3.81107 7.39788C4.07199 7.66257 4.50687 7.67059 4.76779 7.39788C5.03662 7.12518 5.02872 6.69207 4.76779 6.42739L3.70037 5.32857C3.44735 5.06389 3.00458 5.06389 2.73575 5.32857C2.47482 5.60929 2.47482 6.03438 2.73575 6.29906L3.81107 7.39788ZM8.67375 4.78316C8.67375 5.15211 8.98214 5.47294 9.35369 5.47294C9.73326 5.47294 10.0416 5.15211 10.0416 4.78316V3.2432C10.0416 2.86624 9.72533 2.54541 9.35369 2.54541C8.98214 2.54541 8.67375 2.86624 8.67375 3.2432V4.78316ZM13.9317 6.42739C13.6709 6.69207 13.6629 7.12518 13.9317 7.39788C14.2085 7.67059 14.6275 7.66257 14.8885 7.39788L15.9717 6.29906C16.2326 6.03438 16.2326 5.60929 15.9717 5.32857C15.695 5.06389 15.2759 5.06389 15.015 5.32857L13.9317 6.42739ZM18.0196 12.7316C18.3911 12.7316 18.7075 12.4108 18.7075 12.0418C18.7075 11.6648 18.3911 11.344 18.0196 11.344H16.5015C16.1377 11.344 15.8215 11.6569 15.8215 12.0418C15.8215 12.4188 16.1377 12.7316 16.5015 12.7316H18.0196Z"
          fill="white"
        />
        <path
          d="M9.35244 6.96533C6.55346 6.96533 4.36328 9.02663 4.36328 11.6494C4.36328 14.5528 6.07115 15.2747 6.54556 20.2876C6.57718 20.5683 6.72742 20.7448 7.01997 20.7448H11.685C11.9775 20.7448 12.1278 20.5683 12.1515 20.2876C12.6338 15.2747 14.3495 14.5528 14.3495 11.6494C14.3495 9.02663 12.1436 6.96533 9.35244 6.96533ZM9.35244 8.14437C11.432 8.14437 13.1873 9.61214 13.1873 11.6494C13.1873 13.7989 11.7799 14.2961 11.0998 19.5658H7.60506C6.92508 14.2961 5.52558 13.7989 5.52558 11.6494C5.52558 9.61214 7.27298 8.14437 9.35244 8.14437ZM6.99624 22.381H11.7087C11.9696 22.381 12.1673 22.1885 12.1673 21.9238C12.1673 21.6591 11.9696 21.4666 11.7087 21.4666H6.99624C6.74323 21.4666 6.54556 21.6591 6.54556 21.9238C6.54556 22.1885 6.74323 22.381 6.99624 22.381ZM9.35244 24.5786C10.5148 24.5786 11.5031 23.9851 11.5584 23.1028H7.14647C7.19391 23.9851 8.18224 24.5786 9.35244 24.5786Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="eligibility-bulb-clip">
          <rect width="19" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
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
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M43.6367 68.5933L133.485 167.625H164.24L72.8533 68.5933H43.6367Z"
          fill="url(#eligibility-cert-arrow-paint0)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M144.966 35.4368L33.8606 192.552C30.8679 196.784 30.2397 197.661 29.5974 198.579C28.9552 199.498 28.5432 200.112 27.9373 201.055C27.3314 201.998 26.7585 202.912 23.9799 207.288L11.8617 226.369C10.9895 227.743 11.3961 229.563 12.77 230.435C13.9658 231.194 15.5327 230.995 16.5006 229.961L32.2302 213.159C35.6835 209.47 36.3866 208.727 37.1044 207.955C37.8222 207.183 38.2728 206.682 38.9659 205.888C39.6591 205.093 40.3247 204.317 43.6329 200.497L168.132 56.7702C169.801 54.8435 171.332 52.8013 172.713 50.659C174.758 47.4895 175.899 48.1849 176.138 52.7461C176.305 55.9268 176.533 60.2794 176.823 65.8037C177.22 73.3714 183.678 79.1847 191.249 78.7881C198.819 78.3915 204.634 71.9351 204.237 64.3674L201.792 17.7242C201.772 17.3458 201.756 16.9673 201.744 16.5886C201.514 9.20896 200.235 4.72622 197.909 3.14037C191.827 -1.00541 178.855 1.41969 175.306 2.04706C170.345 2.9241 152.791 5.5188 122.644 9.83114C116.171 10.7571 111.674 16.7539 112.6 23.2253C112.652 23.5917 112.722 23.9555 112.809 24.3154L112.874 24.5884C114.547 31.5433 121.341 35.9988 128.389 34.7623L140.508 32.6356C140.776 32.5887 141.042 32.5398 141.309 32.4888C143.801 32.0118 145.297 31.9516 145.796 32.3074C146.321 32.681 146.044 33.7242 144.966 35.4368Z"
          fill="url(#eligibility-cert-arrow-paint1)"
        />
      </g>
      <defs>
        <linearGradient
          id="eligibility-cert-arrow-paint0"
          x1="54.2836"
          y1="80.1094"
          x2="150.049"
          y2="185.326"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF002F" />
          <stop offset="0.48" stopColor="#FFB700" />
          <stop offset="1" stopColor="#00C017" />
        </linearGradient>
        <linearGradient
          id="eligibility-cert-arrow-paint1"
          x1="175.838"
          y1="7.96832"
          x2="-4.47275"
          y2="232.086"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF002F" />
          <stop offset="0.475962" stopColor="#FFB700" />
          <stop offset="1" stopColor="#00C017" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CertificateGraphic({
  imageSrc,
  imageAlt,
}: {
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div className="relative mx-auto h-[260px] w-full max-w-[320px] shrink-0 overflow-visible lg:mx-0 lg:max-w-none lg:flex-1">
      <div className="absolute left-0 top-1/2 z-10 w-[253px] -translate-y-1/2">
        <Image
          src={imageSrc}
          alt={imageAlt}
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
  eligibilityRequirements: CourseEligibilityRequirementsContent;
}) {
  const roleColumns = [
    eligibilityRequirements.idealForRoles.slice(0, 4),
    eligibilityRequirements.idealForRoles.slice(4, 8),
  ];

  return (
    <div
      id="eligibility"
      className={`scroll-mt-[116px] overflow-visible px-6 py-5 md:px-8 md:py-6 ${SECTION_CARD}`}
    >
      <h2 className="text-[34px] font-bold leading-[140%] text-heading">{eligibilityRequirements.title}</h2>
      <p className="mt-2 max-w-[720px] text-[14px] font-normal leading-normal text-muted">
        {eligibilityRequirements.subtitle}
      </p>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
        <ul className="w-full max-w-[490px] shrink-0 sm:ml-[42px]" role="list">
          {eligibilityRequirements.items.map((item, index) => (
            <li
              key={item.id}
              className={`flex gap-4 py-5 ${
                index < eligibilityRequirements.items.length - 1 ? 'border-b border-[#EBEBEB]' : ''
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <RequirementIcon type={item.icon} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[14px] font-semibold leading-normal text-heading">{item.title}</p>
                <p className="mt-1.5 text-[14px] font-normal leading-normal text-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <CertificateGraphic
          imageSrc={eligibilityRequirements.certificateImageSrc}
          imageAlt={eligibilityRequirements.certificateImageAlt}
        />
      </div>

      <div className="relative mt-8 min-h-[200px] overflow-visible rounded-[20px] border border-[#DCDCDC] bg-[linear-gradient(79deg,#FFF_49.08%,#FFD3D3_108.27%)] py-6 pl-6 pr-[10px] md:py-7 md:pl-8 md:pr-[10px]">
        <div className="relative z-10 max-w-[calc(100%-140px)] sm:max-w-[calc(100%-180px)] md:max-w-[calc(100%-220px)]">
          <h3 className="text-[20px] font-semibold leading-[140%] text-heading">
            {eligibilityRequirements.idealForTitle}
          </h3>
          <div className="mt-4 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {roleColumns.map((column, colIndex) => (
              <ul key={colIndex} className="space-y-2.5" role="list">
                {column.map((role) => (
                  <li key={role} className="flex items-start gap-2.5 text-[14px] leading-normal text-heading">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted"
                      aria-hidden
                    />
                    {role}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute -top-10 bottom-0 right-[calc(var(--spacing)*1)] z-10 w-[180px] md:w-[200px]">
          <Image
            src={eligibilityRequirements.idealForImageSrc}
            alt={eligibilityRequirements.idealForImageAlt}
            fill
            className="object-contain object-bottom"
            sizes="200px"
          />
        </div>
      </div>
    </div>
  );
}
