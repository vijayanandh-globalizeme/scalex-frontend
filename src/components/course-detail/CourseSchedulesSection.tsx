'use client';

import CourseBatchRequestBanner from '@/components/course-detail/CourseBatchRequestBanner';
import type { CourseScheduleItem, CourseSchedulesContent } from '@/lib/courseBody';
import Link from 'next/link';
import { Fragment, useState, type ReactNode } from 'react';
import CourseBrochureCta from './CourseBrochureCta';

import { COURSE_SECTION_CARD } from './courseSectionCard';

const SCHEDULE_CARD =
  'relative overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

function formatPrice(amount: number) {
  return `₹ ${amount.toLocaleString('en-IN')}`;
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function ViewMoreChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="11" viewBox="0 0 18 11" fill="none" aria-hidden>
      <path
        d="M7.50374 9C7.69084 9 7.87795 8.92839 8.00517 8.79244L13.7979 3.11657C13.9251 2.99489 14 2.83742 14 2.65849C14 2.2863 13.7081 2 13.3189 2C13.1318 2 12.9597 2.07158 12.8325 2.1861L7.09959 7.79038H7.9004L2.16753 2.1861C2.04778 2.07158 1.87565 2 1.68106 2C1.29188 2 1 2.2863 1 2.65849C1 2.83742 1.07484 2.99489 1.20207 3.12372L6.99482 8.79244C7.13701 8.92839 7.30915 9 7.50374 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GuaranteeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-schedules-guarantee-clip)">
        <path
          d="M0.577331 6.48311C-0.00702101 6.48311 -0.153109 6.86724 0.163415 7.30623L1.9814 9.79911C2.24923 10.1597 2.6388 10.1519 2.89851 9.79911L4.70838 7.2984C5.0249 6.86724 4.8707 6.48311 4.30258 6.48311H0.577331ZM18.1322 7.9961C18.1322 3.58256 14.4232 0 9.85394 0C5.28462 0 1.58371 3.57472 1.5756 8.00393C1.58371 8.37239 1.88401 8.66243 2.25734 8.66243C2.6388 8.66243 2.95533 8.36453 2.95533 7.9961C2.95533 4.31162 6.0394 1.33269 9.85394 1.33269C13.6684 1.33269 16.7526 4.31162 16.7526 7.9961C16.7526 11.6806 13.6684 14.6595 9.85394 14.6595C7.54086 14.6595 5.50375 13.562 4.27012 11.9001C4.01852 11.5786 3.63707 11.4768 3.29619 11.6727C2.97156 11.8688 2.87416 12.3156 3.15011 12.6605C4.65969 14.683 7.07014 15.9922 9.85394 15.9922C14.4232 15.9922 18.1322 12.4096 18.1322 7.9961Z"
          fill="#FD022D"
        />
        <path
          d="M8.99357 8.66243C10.2759 8.66243 11.2499 8.01961 11.4203 6.8202H12.0534C12.2157 6.8202 12.3293 6.70261 12.3293 6.56151C12.3293 6.4204 12.2157 6.30281 12.0534 6.30281H11.4365C11.396 5.78541 11.1687 5.30722 10.7548 4.97796H12.0534C12.2157 4.97796 12.3293 4.86038 12.3293 4.71927C12.3293 4.57032 12.2157 4.46057 12.0534 4.46057H7.56518C7.35416 4.46057 7.23242 4.59384 7.23242 4.81334V4.86821C7.23242 5.07987 7.35416 5.21315 7.56518 5.21315H8.88811C9.69159 5.21315 10.3328 5.53456 10.4544 6.30281H7.5246C7.36228 6.30281 7.24054 6.4204 7.24054 6.56151C7.24054 6.70261 7.36228 6.8202 7.5246 6.8202H10.4544C10.3408 7.61197 9.7078 7.90203 8.87996 7.90203H7.75997C7.44344 7.90203 7.25677 8.08237 7.25677 8.34101V8.36453C7.25677 8.59187 7.35416 8.72512 7.54083 8.88198L10.3165 11.3906C10.4544 11.5159 10.56 11.61 10.771 11.61C11.0064 11.61 11.1849 11.4297 11.1849 11.2102C11.1849 11.0613 11.1119 10.9515 10.9902 10.8496L8.57155 8.66243H8.99357Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-schedules-guarantee-clip">
          <rect width="20" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-schedules-clock-clip)">
        <path
          d="M6.8753 13.9932C10.6702 13.9932 13.7506 10.8584 13.7506 6.99659C13.7506 3.13474 10.6702 0 6.8753 0C3.0804 0 0 3.13474 0 6.99659C0 10.8584 3.0804 13.9932 6.8753 13.9932ZM6.8753 12.8271C3.70727 12.8271 1.14589 10.2205 1.14589 6.99659C1.14589 3.77267 3.70727 1.1661 6.8753 1.1661C10.0433 1.1661 12.6047 3.77267 12.6047 6.99659C12.6047 10.2205 10.0433 12.8271 6.8753 12.8271Z"
          fill="#FD022D"
        />
        <path
          d="M3.35074 7.73744H6.86928C7.13214 7.73744 7.34114 7.53171 7.34114 7.25728V2.63407C7.34114 2.36655 7.13214 2.16077 6.86928 2.16077C6.6064 2.16077 6.40418 2.36655 6.40418 2.63407V6.784H3.35074C3.08112 6.784 2.87891 6.98978 2.87891 7.25728C2.87891 7.53171 3.08112 7.73744 3.35074 7.73744Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-schedules-clock-clip">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-schedules-calendar-clip)">
        <path
          d="M1.85616 12H9.93101C11.1665 12 11.7813 11.3229 11.7813 9.98162V2.03152C11.7813 0.690223 11.1665 0.0130615 9.93101 0.0130615H1.85616C0.62069 0.0130615 0 0.683708 0 2.03152V9.98162C0 11.3294 0.62069 12 1.85616 12ZM1.76749 10.9518C1.24138 10.9518 0.951728 10.6458 0.951728 10.0402V3.90021C0.951728 3.30119 1.24138 2.98865 1.76749 2.98865H10.0079C10.534 2.98865 10.8296 3.30119 10.8296 3.90021V10.0402C10.8296 10.6458 10.534 10.9518 10.0079 10.9518H1.76749ZM4.74089 5.32615H5.08966C5.29656 5.32615 5.36158 5.26104 5.36158 5.03315V4.649C5.36158 4.4211 5.29656 4.34948 5.08966 4.34948H4.74089C4.53399 4.34948 4.46306 4.4211 4.46306 4.649V5.03315C4.46306 5.26104 4.53399 5.32615 4.74089 5.32615ZM6.70344 5.32615H7.05223C7.25913 5.32615 7.33007 5.26104 7.33007 5.03315V4.649C7.33007 4.4211 7.25913 4.34948 7.05223 4.34948H6.70344C6.49654 4.34948 6.4256 4.4211 6.4256 4.649V5.03315C6.4256 5.26104 6.49654 5.32615 6.70344 5.32615ZM8.66601 5.32615H9.0148C9.2217 5.32615 9.29264 5.26104 9.29264 5.03315V4.649C9.29264 4.4211 9.2217 4.34948 9.0148 4.34948H8.66601C8.45912 4.34948 8.3941 4.4211 8.3941 4.649V5.03315C8.3941 5.26104 8.45912 5.32615 8.66601 5.32615ZM2.77833 7.45527H3.12119C3.33399 7.45527 3.39902 7.39019 3.39902 7.1623V6.77813C3.39902 6.55025 3.33399 6.48513 3.12119 6.48513H2.77833C2.56552 6.48513 2.5005 6.55025 2.5005 6.77813V7.1623C2.5005 7.39019 2.56552 7.45527 2.77833 7.45527ZM4.74089 7.45527H5.08966C5.29656 7.45527 5.36158 7.39019 5.36158 7.1623V6.77813C5.36158 6.55025 5.29656 6.48513 5.08966 6.48513H4.74089C4.53399 6.48513 4.46306 6.55025 4.46306 6.77813V7.1623C4.46306 7.39019 4.53399 7.45527 4.74089 7.45527ZM6.70344 7.45527H7.05223C7.25913 7.45527 7.33007 7.39019 7.33007 7.1623V6.77813C7.33007 6.55025 7.25913 6.48513 7.05223 6.48513H6.70344C6.49654 6.48513 6.4256 6.55025 6.4256 6.77813V7.1623C6.4256 7.39019 6.49654 7.45527 6.70344 7.45527ZM8.66601 7.45527H9.0148C9.2217 7.45527 9.29264 7.39019 9.29264 7.1623V6.77813C9.29264 6.55025 9.2217 6.48513 9.0148 6.48513H8.66601C8.45912 6.48513 8.3941 6.55025 8.3941 6.77813V7.1623C8.3941 7.39019 8.45912 7.45527 8.66601 7.45527ZM2.77833 9.59097H3.12119C3.33399 9.59097 3.39902 9.5193 3.39902 9.29141V8.9073C3.39902 8.6794 3.33399 8.61426 3.12119 8.61426H2.77833C2.56552 8.61426 2.5005 8.6794 2.5005 8.9073V9.29141C2.5005 9.5193 2.56552 9.59097 2.77833 9.59097ZM4.74089 9.59097H5.08966C5.29656 9.59097 5.36158 9.5193 5.36158 9.29141V8.9073C5.36158 8.6794 5.29656 8.61426 5.08966 8.61426H4.74089C4.53399 8.61426 4.46306 8.6794 4.46306 8.9073V9.29141C4.46306 9.5193 4.53399 9.59097 4.74089 9.59097ZM6.70344 9.59097H7.05223C7.25913 9.59097 7.33007 9.5193 7.33007 9.29141V8.9073C7.33007 8.6794 7.25913 8.61426 7.05223 8.61426H6.70344C6.49654 8.61426 6.4256 8.6794 6.4256 8.9073V9.29141C6.4256 9.5193 6.49654 9.59097 6.70344 9.59097Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-schedules-calendar-clip">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="23"
      viewBox="0 0 33 23"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-schedules-sun-clip)">
        <path
          d="M22.9126 14.4787C22.9126 10.7585 19.8335 7.65411 16.1132 7.65411C12.3804 7.65411 9.30118 10.7585 9.30118 14.4787C9.30118 15.3962 9.48971 16.2634 9.84161 17.0553H22.3722C22.7241 16.2634 22.9126 15.3962 22.9126 14.4787ZM2.72795 15.195H5.81975C6.47332 15.195 6.96348 14.7427 6.95091 14.177C6.93833 13.6115 6.46074 13.159 5.81975 13.159H2.72795C2.0744 13.159 1.60938 13.6115 1.60938 14.177C1.60938 14.7427 2.0744 15.195 2.72795 15.195ZM8.10719 7.94318C8.55965 8.4082 9.23833 8.42077 9.62796 8.01858C10.0176 7.6164 10.0176 6.95028 9.55255 6.49782L7.36567 4.31093C6.90064 3.83334 6.25965 3.85848 5.85746 4.24809C5.45528 4.63771 5.44271 5.29126 5.92031 5.75629L8.10719 7.94318ZM22.5858 8.01858C22.988 8.4082 23.6542 8.4082 24.1067 7.94318L26.2936 5.75629C26.7712 5.29126 26.7459 4.65027 26.3564 4.24809C25.9668 3.8459 25.3132 3.83334 24.8481 4.31093L22.6613 6.49782C22.1963 6.95028 22.1837 7.62896 22.5858 8.01858ZM26.3941 15.195H29.4859C30.1395 15.195 30.6045 14.7427 30.6045 14.177C30.6045 13.6115 30.1395 13.159 29.4859 13.159H26.3941C25.7531 13.159 25.2503 13.6115 25.2629 14.177C25.2755 14.7427 25.7531 15.195 26.3941 15.195Z"
          fill="#F5A436"
        />
        <path
          d="M16.1132 5.34153C16.6662 5.32896 17.1312 4.85137 17.1312 4.21038V1.11858C17.1312 0.465027 16.6662 0 16.1132 0C15.5477 0 15.0827 0.465027 15.0827 1.11858V4.21038C15.0827 4.85137 15.5477 5.35411 16.1132 5.34153Z"
          fill="#FD022D"
        />
        <path
          d="M1.09344 20.5366H31.1192C31.7099 20.5366 32.2126 20.0842 32.2126 19.5312C32.2126 18.9781 31.7099 18.5256 31.1192 18.5256H1.09344C0.502732 18.5256 0 18.9781 0 19.5312C0 20.0842 0.502732 20.5366 1.09344 20.5366Z"
          fill="#F5A436"
        />
      </g>
      <defs>
        <clipPath id="course-schedules-sun-clip">
          <rect width="32.6776" height="22.5098" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-schedules-person-clip)">
        <path
          d="M1.19302 11.9933H10.5488C11.2953 11.9933 11.7418 11.6598 11.7418 11.1062C11.7418 9.38517 9.48832 7.01056 5.86743 7.01056C2.25349 7.01056 0 9.38517 0 11.1062C0 11.6598 0.446511 11.9933 1.19302 11.9933ZM5.87441 5.81655C7.36743 5.81655 8.6651 4.53584 8.6651 2.86825C8.6651 1.22068 7.36743 0 5.87441 0C4.38139 0 3.08372 1.24736 3.08372 2.88159C3.08372 4.53584 4.37441 5.81655 5.87441 5.81655Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-schedules-person-clip">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SlotsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="9"
      viewBox="0 0 8 9"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-schedules-slots-clip)">
        <path
          d="M4.48144 8.99995C4.73915 8.99995 4.92168 8.74526 5.05415 8.35092L7.39863 1.32263C7.46307 1.13367 7.49888 0.965258 7.49888 0.825596C7.49888 0.558593 7.35571 0.394287 7.12303 0.394287C7.00135 0.394287 6.85459 0.435366 6.68994 0.509304L0.533333 3.21628C0.232662 3.34773 0 3.55722 0 3.85709C0 4.23501 0.250559 4.36234 0.594181 4.48146L2.52707 5.15514C2.75615 5.23729 2.88501 5.22905 3.03892 5.06475L6.96554 0.854351C7.01209 0.805057 7.06575 0.813272 7.10156 0.850241C7.13737 0.89132 7.14092 0.952934 7.09796 1.00634L3.4434 5.52891C3.3038 5.69733 3.29306 5.83702 3.36107 6.1122L3.93021 8.28109C4.03757 8.69596 4.14855 8.99995 4.48144 8.99995Z"
          fill="#1E293B"
        />
      </g>
      <defs>
        <clipPath id="course-schedules-slots-clip">
          <rect width="8" height="9" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function FilterChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex shrink-0 items-center overflow-hidden rounded-lg border border-[#EBEBEB] bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="btn-mui-ink-tint flex h-8 w-8 items-center justify-center text-[16px] text-brand"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="flex h-8 min-w-8 items-center justify-center border-x border-zinc-200 px-1 text-[13px] font-medium text-heading">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="btn-mui-ink-tint flex h-8 w-8 items-center justify-center text-[16px] text-brand"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

function MetaItem({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF6F7]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-heading">{title}</p>
        <p className="mt-0.5 text-[12px] text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

function ScheduleCard({
  item,
  enrollLabel,
  quantity,
  onQuantityChange,
}: {
  item: CourseScheduleItem;
  enrollLabel: string;
  quantity: number;
  onQuantityChange: (next: number) => void;
}) {
  return (
    <article className={SCHEDULE_CARD}>
      <span
        className="absolute inset-y-0 left-0 w-1 rounded-l-[20px] bg-brand"
        aria-hidden
      />
      <div className="flex flex-col xl:flex-row">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 border-b border-zinc-100 py-4 pr-4 pl-[30px] sm:flex-row sm:items-start sm:justify-between md:py-5 md:pr-5 md:pl-[30px]">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFF6F7] px-2 py-1 text-[12px] font-medium leading-[140%] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                {item.badge}
              </span>
              <p className="mt-3 text-[24px] font-semibold text-heading">
                {item.dateRange}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[14px] font-medium text-muted">
                <ClockIcon className="shrink-0" />
                {item.time}
              </p>
            </div>
            <QuantityStepper value={quantity} onChange={onQuantityChange} />
          </div>

          <div className="grid gap-4 py-4 pr-4 pl-[35px] sm:grid-cols-3 md:py-5 md:pr-5 md:pl-[35px]">
            <MetaItem
              icon={<CalendarIcon />}
              title={item.batchType.title}
              subtitle={item.batchType.subtitle}
            />
            <MetaItem
              icon={<SunIcon className="h-auto max-h-5 w-auto max-w-[22px]" />}
              title={item.timeSlot.title}
              subtitle={item.timeSlot.subtitle}
            />
            <MetaItem
              icon={<PersonIcon />}
              title={item.trainerName}
              subtitle="Certified Trainer"
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col justify-between border-t border-zinc-100 bg-[linear-gradient(90deg,#FFF_76.35%,#FFF7F8_99.67%)] p-4 xl:w-[216px] xl:rounded-r-[20px] xl:border-t-0 xl:border-l xl:p-5">
          <div>
            <span className="inline-flex rounded-lg border border-brand bg-white px-2 py-[5px] text-[10px] font-normal leading-[140%] text-brand">
              {item.discountPercent}% Off
            </span>
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="inline-flex items-baseline gap-1">
                <span className="text-[14px] font-medium leading-[18px] text-brand">₹</span>
                <span className="text-[24px] font-semibold leading-[18px] text-heading">
                  {item.price}
                </span>
              </span>
              <span className="text-[13px] text-muted line-through">
                {formatPrice(item.originalPrice)}
              </span>
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#F5F6F8] px-2.5 py-1 text-[12px] font-normal leading-[140%] text-heading">
              <SlotsIcon className="shrink-0" />
              Only {item.slotsLeft} slots available
            </p>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-center text-[10px] text-muted">
              <span>
                Secure
                <br />
                Payment
              </span>
              <span className="text-zinc-300" aria-hidden>
                |
              </span>
              <span>
                Easy
                <br />
                Refund
              </span>
              <span className="text-zinc-300" aria-hidden>
                |
              </span>
              <span>
                24/7
                <br />
                Support
              </span>
            </div>
            <CourseBrochureCta
              openModal
              className="btn-brand mt-3 inline-flex w-[139px] items-center justify-center gap-[11px] px-4 py-[11px] text-[14px] font-medium leading-[18px]"
            >
              {enrollLabel}
              <ArrowRightIcon className="btn-arrow-icon shrink-0 text-white" />
            </CourseBrochureCta>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CourseSchedulesSection({
  schedules,
}: {
  schedules: CourseSchedulesContent;
}) {
  const [activeFilterId, setActiveFilterId] = useState(schedules.filters[0]?.id ?? '');
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(schedules.items.map((item) => [item.id, 1])),
  );

  return (
    <div
      id="schedules"
      className={`scroll-mt-[116px] overflow-visible ${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <h2 className="text-[34px] font-bold leading-[140%] text-heading">{schedules.title}</h2>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-[#FFF6F7] px-3 py-1.5 text-[12px] font-medium leading-[140%] text-brand">
          <GuaranteeIcon className="shrink-0" />
          {schedules.guaranteeBadge}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {schedules.filters.map((filter) => {
          const isActive = filter.type === 'toggle' && activeFilterId === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => {
                if (filter.type === 'toggle') setActiveFilterId(filter.id);
              }}
              className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[12px] font-normal leading-[140%] text-heading transition ${
                isActive
                  ? 'bg-zinc-100 text-heading'
                  : 'btn-mui-ink-tint bg-[#F4F4F4] text-heading'
              }`}
            >
              {filter.label}
              {filter.type === 'dropdown' ? <FilterChevronIcon /> : null}
            </button>
          );
        })}
      </div>

      <div className="mt-5 space-y-4 overflow-visible">
        {schedules.items.map((item, index) => (
          <Fragment key={item.id}>
            <ScheduleCard
              item={item}
              enrollLabel={schedules.enrollLabel}
              quantity={quantities[item.id] ?? 1}
              onQuantityChange={(next) =>
                setQuantities((prev) => ({ ...prev, [item.id]: next }))
              }
            />
            {index === schedules.bannerAfterIndex - 1 ? (
              <CourseBatchRequestBanner banner={schedules.batchBanner} />
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className="mt-5 text-center">
        <Link
          href={schedules.viewMoreHref}
          className="group inline-flex items-center gap-2 text-[14px] font-medium leading-[18px] text-brand transition hover:underline"
        >
          {schedules.viewMoreLabel}
          <ViewMoreChevronIcon className="btn-download-icon shrink-0 text-brand" />
        </Link>
      </div>
    </div>
  );
}
