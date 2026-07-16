'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ApiCourseDetails, ApiOtherDetail } from '@/services/courseApi';
import { CREDENTIALS_FEATURES } from '@/lib/courseDetailStatics';
import { withNewTabLinks } from '@/lib/richText';
import { COURSE_SECTION_CARD } from './courseSectionCard';

const TAB_BAR_SCROLL =
  'flex h-[48px] items-stretch gap-6 overflow-x-auto rounded-lg bg-[#FCFCFC] px-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)] [-ms-overflow-style:none] [scrollbar-width:none] md:gap-10 md:px-6 [&::-webkit-scrollbar]:hidden';

function CertificateBendDecoration({ className }: { className?: string }) {
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
          fill="url(#credentials-paint0)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M144.966 35.4368L33.8606 192.552C30.8679 196.784 30.2397 197.661 29.5974 198.579C28.9552 199.498 28.5432 200.112 27.9373 201.055C27.3314 201.998 26.7585 202.912 23.9799 207.288L11.8617 226.369C10.9895 227.743 11.3961 229.563 12.77 230.435C13.9658 231.194 15.5327 230.995 16.5006 229.961L32.2302 213.159C35.6835 209.47 36.3866 208.727 37.1044 207.955C37.8222 207.183 38.2728 206.682 38.9659 205.888C39.6591 205.093 40.3247 204.317 43.6329 200.497L168.132 56.7702C169.801 54.8435 171.332 52.8013 172.713 50.659C174.758 47.4895 175.899 48.1849 176.138 52.7461C176.305 55.9268 176.533 60.2794 176.823 65.8037C177.22 73.3714 183.678 79.1847 191.249 78.7881C198.819 78.3915 204.634 71.9351 204.237 64.3674L201.792 17.7242C201.772 17.3458 201.756 16.9673 201.744 16.5886C201.514 9.20896 200.235 4.72622 197.909 3.14037C191.827 -1.00541 178.855 1.41969 175.306 2.04706C170.345 2.9241 152.791 5.5188 122.644 9.83114C116.171 10.7571 111.674 16.7539 112.6 23.2253C112.652 23.5917 112.722 23.9555 112.809 24.3154L112.874 24.5884C114.547 31.5433 121.341 35.9988 128.389 34.7623L140.508 32.6356C140.776 32.5887 141.042 32.5398 141.309 32.4888C143.801 32.0118 145.297 31.9516 145.796 32.3074C146.321 32.681 146.044 33.7242 144.966 35.4368Z"
          fill="url(#credentials-paint1)"
        />
      </g>
      <defs>
        <linearGradient id="credentials-paint0" x1="54.2836" y1="80.1094" x2="150.049" y2="185.326" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF002F" />
          <stop offset="0.48" stopColor="#FFB700" />
          <stop offset="1" stopColor="#00C017" />
        </linearGradient>
        <linearGradient id="credentials-paint1" x1="175.838" y1="7.96832" x2="-4.47275" y2="232.086" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF002F" />
          <stop offset="0.475962" stopColor="#FFB700" />
          <stop offset="1" stopColor="#00C017" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FeatureCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden>
      <path d="M14.2921 1.04362L15.9596 2.72661C16.133 2.8916 16.2845 2.9466 16.5119 2.9466H18.8508C20.7999 2.9466 21.6878 3.87059 21.6878 5.82857V8.21555C21.6878 8.43556 21.7528 8.60055 21.9153 8.76556L23.5719 10.4595C24.9364 11.8456 24.9472 13.1325 23.5719 14.5185L21.9153 16.2125C21.7528 16.3885 21.6878 16.5425 21.6878 16.7735V19.1494C21.6878 21.1294 20.7891 22.0314 18.8508 22.0314H16.5119C16.2845 22.0314 16.133 22.0974 15.9596 22.2624L14.2921 23.9454C12.9277 25.3314 11.6608 25.3424 10.2964 23.9454L8.62886 22.2624C8.46643 22.0974 8.30401 22.0314 8.08743 22.0314H5.73768C3.79941 22.0314 2.90065 21.1185 2.90065 19.1494V16.7735C2.90065 16.5425 2.84651 16.3885 2.68409 16.2125L1.02734 14.5185C-0.337028 13.1325 -0.347857 11.8456 1.02734 10.4595L2.68409 8.76556C2.84651 8.60055 2.90065 8.43556 2.90065 8.21555V5.82857C2.90065 3.84859 3.79941 2.9466 5.73768 2.9466H8.08743C8.30401 2.9466 8.46643 2.8916 8.62886 2.72661L10.2964 1.04362C11.6608 -0.342368 12.9277 -0.353368 14.2921 1.04362ZM15.6672 8.12756L11.0436 15.6735L8.84543 12.7915C8.57472 12.4285 8.33649 12.3185 8.0333 12.3185C7.53519 12.3185 7.1562 12.7255 7.1562 13.2315C7.1562 13.4735 7.25365 13.7265 7.41608 13.9465L10.134 17.3345C10.4155 17.7195 10.7187 17.8625 11.0869 17.8625C11.455 17.8625 11.7691 17.6865 11.9965 17.3345L17.0858 9.18355C17.2157 8.96355 17.3565 8.71056 17.3565 8.45756C17.3565 7.95156 16.9126 7.62156 16.447 7.62156C16.1546 7.62156 15.873 7.78657 15.6672 8.12756Z" fill="#FD022D" />
    </svg>
  );
}

function CertificateImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto mt-[100px] flex max-w-[650px] justify-center">
      <CertificateBendDecoration className="pointer-events-none absolute top-[calc(var(--spacing)*-20)] right-[calc(var(--spacing)*-18)] z-0 hidden h-[232px] w-[213px] max-w-none md:block" />
      <div className="relative z-10 w-full max-w-[650px]">
        <Image
          src={src}
          alt={alt}
          width={650}
          height={495}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 650px"
        />
      </div>
    </div>
  );
}

function FeaturesList() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
      {CREDENTIALS_FEATURES.features.map((feature) => (
        <div key={feature.id} className="flex gap-3">
          <span className="shrink-0"><FeatureCheckIcon /></span>
          <div className="min-w-0">
            <p className="text-[16px] font-semibold leading-[140%] text-heading">{feature.title}</p>
            <p className="mt-1.5 text-[14px] font-normal leading-[140%] text-muted">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CourseCredentialsSection({
  credentials,
  careerTabs,
}: {
  credentials: ApiCourseDetails['credentials'];
  careerTabs: ApiOtherDetail[];
}) {
  const defaultTab = careerTabs[0];
  const [activeTabId, setActiveTabId] = useState(defaultTab?.id ?? '');

  if (!credentials) return null;

  const isMultiTab = careerTabs.length > 1;
  const activeTab  = careerTabs.find((t) => t.id === activeTabId) ?? defaultTab;

  const imageSrc = activeTab?.file?.url ?? CREDENTIALS_FEATURES.certificateImageSrc;
  const imageAlt = activeTab?.title  ?? CREDENTIALS_FEATURES.certificateImageAlt;

  return (
    <div className={`${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6`}>
      <h2 className="section-heading text-heading">{credentials.title}</h2>
      <p
        className="mt-2 max-w-[864px] text-[18px] font-medium leading-[140%] text-muted [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2"
        dangerouslySetInnerHTML={{ __html: withNewTabLinks(credentials.description) }}
      />

      {isMultiTab ? (
        <div className="mt-5" role="tablist" aria-label={credentials.title}>
          <div className={TAB_BAR_SCROLL}>
            {careerTabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex h-full shrink-0 cursor-pointer items-center border-0 border-b-[3px] bg-transparent px-0 text-[14px] font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-b-brand text-brand'
                      : 'border-b-transparent text-heading hover:text-brand'
                  }`}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <CertificateImage src={imageSrc} alt={imageAlt} />
      <FeaturesList />
    </div>
  );
}
