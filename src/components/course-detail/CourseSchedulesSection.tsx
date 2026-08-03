'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useMemo, type ReactNode } from 'react';
import { getCourseBatches, getCoursePlans, getCourseTrainers } from '@/app/actions/courseActions';
import CourseFeeSection from './CourseFeeSection';
import CourseCareerAssuranceSection from './CourseCareerAssuranceSection';
import CoursePlanComparisonSection, { buildActivePlans } from './CoursePlanComparisonSection';
import CourseBatchRequestBanner from './CourseBatchRequestBanner';
import CourseBrochureCta from './CourseBrochureCta';
import { CUSTOMIZE_BATCH_BANNER } from '@/lib/courseDetailStatics';
import { resolvePlansDataForCourse } from '@/lib/planComparisonFallback';
import type { ApiCoursePlansData } from '@/services/courseApi';
import { COURSE_SECTION_CARD } from './courseSectionCard';
import { COURSE_SCHEDULE_FILTERS } from '@/lib/courseFilter';
import type { ApiCourseBatch } from '@/services/courseApi';

// ── Icons ────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function GuaranteeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden>
      <g clipPath="url(#css-guarantee-clip)">
        <path d="M0.577331 6.48311C-0.00702101 6.48311 -0.153109 6.86724 0.163415 7.30623L1.9814 9.79911C2.24923 10.1597 2.6388 10.1519 2.89851 9.79911L4.70838 7.2984C5.0249 6.86724 4.8707 6.48311 4.30258 6.48311H0.577331ZM18.1322 7.9961C18.1322 3.58256 14.4232 0 9.85394 0C5.28462 0 1.58371 3.57472 1.5756 8.00393C1.58371 8.37239 1.88401 8.66243 2.25734 8.66243C2.6388 8.66243 2.95533 8.36453 2.95533 7.9961C2.95533 4.31162 6.0394 1.33269 9.85394 1.33269C13.6684 1.33269 16.7526 4.31162 16.7526 7.9961C16.7526 11.6806 13.6684 14.6595 9.85394 14.6595C7.54086 14.6595 5.50375 13.562 4.27012 11.9001C4.01852 11.5786 3.63707 11.4768 3.29619 11.6727C2.97156 11.8688 2.87416 12.3156 3.15011 12.6605C4.65969 14.683 7.07014 15.9922 9.85394 15.9922C14.4232 15.9922 18.1322 12.4096 18.1322 7.9961Z" fill="#FD022D" />
        <path d="M8.99357 8.66243C10.2759 8.66243 11.2499 8.01961 11.4203 6.8202H12.0534C12.2157 6.8202 12.3293 6.70261 12.3293 6.56151C12.3293 6.4204 12.2157 6.30281 12.0534 6.30281H11.4365C11.396 5.78541 11.1687 5.30722 10.7548 4.97796H12.0534C12.2157 4.97796 12.3293 4.86038 12.3293 4.71927C12.3293 4.57032 12.2157 4.46057 12.0534 4.46057H7.56518C7.35416 4.46057 7.23242 4.59384 7.23242 4.81334V4.86821C7.23242 5.07987 7.35416 5.21315 7.56518 5.21315H8.88811C9.69159 5.21315 10.3328 5.53456 10.4544 6.30281H7.5246C7.36228 6.30281 7.24054 6.4204 7.24054 6.56151C7.24054 6.70261 7.36228 6.8202 7.5246 6.8202H10.4544C10.3408 7.61197 9.7078 7.90203 8.87996 7.90203H7.75997C7.44344 7.90203 7.25677 8.08237 7.25677 8.34101V8.36453C7.25677 8.59187 7.35416 8.72512 7.54083 8.88198L10.3165 11.3906C10.4544 11.5159 10.56 11.61 10.771 11.61C11.0064 11.61 11.1849 11.4297 11.1849 11.2102C11.1849 11.0613 11.1119 10.9515 10.9902 10.8496L8.57155 8.66243H8.99357Z" fill="#FD022D" />
      </g>
      <defs><clipPath id="css-guarantee-clip"><rect width="20" height="16" fill="white" /></clipPath></defs>
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <g clipPath="url(#css-weekend-cal-clip)">
        <path d="M1.85616 11.9987H9.93101C11.1665 11.9987 11.7813 11.3216 11.7813 9.98027V2.03018C11.7813 0.68888 11.1665 0.0117188 9.93101 0.0117188H1.85616C0.62069 0.0117188 0 0.682366 0 2.03018V9.98027C0 11.3281 0.62069 11.9987 1.85616 11.9987ZM1.76749 10.9504C1.24138 10.9504 0.951728 10.6444 0.951728 10.0389V3.89887C0.951728 3.29984 1.24138 2.98731 1.76749 2.98731H10.0079C10.534 2.98731 10.8296 3.29984 10.8296 3.89887V10.0389C10.8296 10.6444 10.534 10.9504 10.0079 10.9504H1.76749ZM4.74089 5.32481H5.08966C5.29656 5.32481 5.36158 5.25969 5.36158 5.03181V4.64765C5.36158 4.41976 5.29656 4.34814 5.08966 4.34814H4.74089C4.53399 4.34814 4.46306 4.41976 4.46306 4.64765V5.03181C4.46306 5.25969 4.53399 5.32481 4.74089 5.32481ZM6.70344 5.32481H7.05223C7.25913 5.32481 7.33007 5.25969 7.33007 5.03181V4.64765C7.33007 4.41976 7.25913 4.34814 7.05223 4.34814H6.70344C6.49654 4.34814 6.4256 4.41976 6.4256 4.64765V5.03181C6.4256 5.25969 6.49654 5.32481 6.70344 5.32481ZM8.66601 5.32481H9.0148C9.2217 5.32481 9.29264 5.25969 9.29264 5.03181V4.64765C9.29264 4.41976 9.2217 4.34814 9.0148 4.34814H8.66601C8.45912 4.34814 8.3941 4.41976 8.3941 4.64765V5.03181C8.3941 5.25969 8.45912 5.32481 8.66601 5.32481ZM2.77833 7.45392H3.12119C3.33399 7.45392 3.39902 7.38885 3.39902 7.16096V6.77678C3.39902 6.5489 3.33399 6.48379 3.12119 6.48379H2.77833C2.56552 6.48379 2.5005 6.5489 2.5005 6.77678V7.16096C2.5005 7.38885 2.56552 7.45392 2.77833 7.45392ZM4.74089 7.45392H5.08966C5.29656 7.45392 5.36158 7.38885 5.36158 7.16096V6.77678C5.36158 6.5489 5.29656 6.48379 5.08966 6.48379H4.74089C4.53399 6.48379 4.46306 6.5489 4.46306 6.77678V7.16096C4.46306 7.38885 4.53399 7.45392 4.74089 7.45392ZM6.70344 7.45392H7.05223C7.25913 7.45392 7.33007 7.38885 7.33007 7.16096V6.77678C7.33007 6.5489 7.25913 6.48379 7.05223 6.48379H6.70344C6.49654 6.48379 6.4256 6.5489 6.4256 6.77678V7.16096C6.4256 7.38885 6.49654 7.45392 6.70344 7.45392ZM8.66601 7.45392H9.0148C9.2217 7.45392 9.29264 7.38885 9.29264 7.16096V6.77678C9.29264 6.5489 9.2217 6.48379 9.0148 6.48379H8.66601C8.45912 6.48379 8.3941 6.5489 8.3941 6.77678V7.16096C8.3941 7.38885 8.45912 7.45392 8.66601 7.45392ZM2.77833 9.58963H3.12119C3.33399 9.58963 3.39902 9.51795 3.39902 9.29006V8.90595C3.39902 8.67806 3.33399 8.61292 3.12119 8.61292H2.77833C2.56552 8.61292 2.5005 8.67806 2.5005 8.90595V9.29006C2.5005 9.51795 2.56552 9.58963 2.77833 9.58963ZM4.74089 9.58963H5.08966C5.29656 9.58963 5.36158 9.51795 5.36158 9.29006V8.90595C5.36158 8.67806 5.29656 8.61292 5.08966 8.61292H4.74089C4.53399 8.61292 4.46306 8.67806 4.46306 8.90595V9.29006C4.46306 9.51795 4.53399 9.58963 4.74089 9.58963ZM6.70344 9.58963H7.05223C7.25913 9.58963 7.33007 9.51795 7.33007 9.29006V8.90595C7.33007 8.67806 7.25913 8.61292 7.05223 8.61292H6.70344C6.49654 8.61292 6.4256 8.67806 6.4256 8.90595V9.29006C6.4256 9.51795 6.49654 9.58963 6.70344 9.58963Z" fill="#FD022D" />
      </g>
      <defs>
        <clipPath id="css-weekend-cal-clip">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <g clipPath="url(#css-clock-clip)">
        <path d="M6.8753 13.9932C10.6702 13.9932 13.7506 10.8584 13.7506 6.99659C13.7506 3.13474 10.6702 0 6.8753 0C3.0804 0 0 3.13474 0 6.99659C0 10.8584 3.0804 13.9932 6.8753 13.9932ZM6.8753 12.8271C3.70727 12.8271 1.14589 10.2205 1.14589 6.99659C1.14589 3.77267 3.70727 1.1661 6.8753 1.1661C10.0433 1.1661 12.6047 3.77267 12.6047 6.99659C12.6047 10.2205 10.0433 12.8271 6.8753 12.8271Z" fill="currentColor" />
        <path d="M3.35074 7.73744H6.86928C7.13214 7.73744 7.34114 7.53171 7.34114 7.25728V2.63407C7.34114 2.36655 7.13214 2.16077 6.86928 2.16077C6.6064 2.16077 6.40418 2.36655 6.40418 2.63407V6.784H3.35074C3.08112 6.784 2.87891 6.98978 2.87891 7.25728C2.87891 7.53171 3.08112 7.73744 3.35074 7.73744Z" fill="currentColor" />
      </g>
      <defs><clipPath id="css-clock-clip"><rect width="14" height="14" fill="white" /></clipPath></defs>
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <g clipPath="url(#css-person-clip)">
        <path d="M1.19302 11.9933H10.5488C11.2953 11.9933 11.7418 11.6598 11.7418 11.1062C11.7418 9.38517 9.48832 7.01056 5.86743 7.01056C2.25349 7.01056 0 9.38517 0 11.1062C0 11.6598 0.446511 11.9933 1.19302 11.9933ZM5.87441 5.81655C7.36743 5.81655 8.6651 4.53584 8.6651 2.86825C8.6651 1.22068 7.36743 0 5.87441 0C4.38139 0 3.08372 1.24736 3.08372 2.88159C3.08372 4.53584 4.37441 5.81655 5.87441 5.81655Z" fill="#FD022D" />
      </g>
      <defs>
        <clipPath id="css-person-clip">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SlotsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none" aria-hidden>
      <path d="M4.48144 8.99995C4.73915 8.99995 4.92168 8.74526 5.05415 8.35092L7.39863 1.32263C7.46307 1.13367 7.49888 0.965258 7.49888 0.825596C7.49888 0.558593 7.35571 0.394287 7.12303 0.394287C7.00135 0.394287 6.85459 0.435366 6.68994 0.509304L0.533333 3.21628C0.232662 3.34773 0 3.55722 0 3.85709C0 4.23501 0.250559 4.36234 0.594181 4.48146L2.52707 5.15514C2.75615 5.23729 2.88501 5.22905 3.03892 5.06475L6.96554 0.854351C7.01209 0.805057 7.06575 0.813272 7.10156 0.850241C7.13737 0.89132 7.14092 0.952934 7.09796 1.00634L3.4434 5.52891C3.3038 5.69733 3.29306 5.83702 3.36107 6.1122L3.93021 8.28109C4.03757 8.69596 4.14855 8.99995 4.48144 8.99995Z" fill="#1E293B" />
    </svg>
  );
}

function FireIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="10" viewBox="0 0 12 14" fill="none" aria-hidden>
      <path
        d="M6 0.5C6 2.5 3.5 3.8 3.5 6.2C3.5 7.8 4.6 9 6 9C7.4 9 8.5 7.8 8.5 6.2C10 7.2 10.5 8.7 10.5 9.8C10.5 12 8.5 13.5 6 13.5C3.5 13.5 1.5 12 1.5 9.5C1.5 6.5 4 5.2 6 0.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ViewMoreChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="11" viewBox="0 0 18 11" fill="none" aria-hidden>
      <path d="M7.50374 9C7.69084 9 7.87795 8.92839 8.00517 8.79244L13.7979 3.11657C13.9251 2.99489 14 2.83742 14 2.65849C14 2.2863 13.7081 2 13.3189 2C13.1318 2 12.9597 2.07158 12.8325 2.1861L7.09959 7.79038H7.9004L2.16753 2.1861C2.04778 2.07158 1.87565 2 1.68106 2C1.29188 2 1 2.2863 1 2.65849C1 2.83742 1.07484 2.99489 1.20207 3.12372L6.99482 8.79244C7.13701 8.92839 7.30915 9 7.50374 9Z" fill="currentColor" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="33" height="23" viewBox="0 0 33 23" fill="none" aria-hidden>
      <g clipPath="url(#css-morning-sun-clip)">
        <path d="M22.9126 14.4787C22.9126 10.7585 19.8335 7.65411 16.1132 7.65411C12.3804 7.65411 9.30118 10.7585 9.30118 14.4787C9.30118 15.3962 9.48971 16.2634 9.84161 17.0553H22.3722C22.7241 16.2634 22.9126 15.3962 22.9126 14.4787ZM2.72795 15.195H5.81975C6.47332 15.195 6.96348 14.7427 6.95091 14.177C6.93833 13.6115 6.46074 13.159 5.81975 13.159H2.72795C2.0744 13.159 1.60938 13.6115 1.60938 14.177C1.60938 14.7427 2.0744 15.195 2.72795 15.195ZM8.10719 7.94318C8.55965 8.4082 9.23833 8.42077 9.62796 8.01858C10.0176 7.6164 10.0176 6.95028 9.55255 6.49782L7.36567 4.31093C6.90064 3.83334 6.25965 3.85848 5.85746 4.24809C5.45528 4.63771 5.44271 5.29126 5.92031 5.75629L8.10719 7.94318ZM22.5858 8.01858C22.988 8.4082 23.6542 8.4082 24.1067 7.94318L26.2936 5.75629C26.7712 5.29126 26.7459 4.65027 26.3564 4.24809C25.9668 3.8459 25.3132 3.83334 24.8481 4.31093L22.6613 6.49782C22.1963 6.95028 22.1837 7.62896 22.5858 8.01858ZM26.3941 15.195H29.4859C30.1395 15.195 30.6045 14.7427 30.6045 14.177C30.6045 13.6115 30.1395 13.159 29.4859 13.159H26.3941C25.7531 13.159 25.2503 13.6115 25.2629 14.177C25.2755 14.7427 25.7531 15.195 26.3941 15.195ZM16.1132 5.34153C16.6662 5.32896 17.1312 4.85137 17.1312 4.21038V1.11858C17.1312 0.465027 16.6662 0 16.1132 0C15.5477 0 15.0827 0.465027 15.0827 1.11858V4.21038C15.0827 4.85137 15.5477 5.35411 16.1132 5.34153Z" fill="#F5A436" />
        <path d="M1.09344 20.5383H31.1192C31.7099 20.5383 32.2126 20.0859 32.2126 19.5329C32.2126 18.9799 31.7099 18.5273 31.1192 18.5273H1.09344C0.502732 18.5273 0 18.9799 0 19.5329C0 20.0859 0.502732 20.5383 1.09344 20.5383Z" fill="#F5A436" />
      </g>
      <defs>
        <clipPath id="css-morning-sun-clip">
          <rect width="32.6776" height="22.5098" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SunsetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="9" x2="12" y2="2" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
      <polyline points="16 5 12 9 8 5" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// ── Date Range Picker ─────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toIso(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function DateRangePicker({
  value,
  onChange,
  onClose,
}: {
  value: { from: string; to: string } | null;
  onChange: (v: { from: string; to: string } | null) => void;
  onClose: () => void;
}) {
  const now = new Date();
  const today = toIso(now);
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
  const [selecting, setSelecting] = useState<'from' | 'to'>('from');
  const [draft, setDraft] = useState<{ from: string | null; to: string | null }>(
    value ? { from: value.from, to: value.to } : { from: null, to: null },
  );

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to 6 rows if needed
  while (cells.length % 7 !== 0) cells.push(null);

  function prevMonth() {
    if (isCurrentMonth) return;
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function isPast(day: number) {
    return toIso(new Date(viewYear, viewMonth, day)) < today;
  }

  function selectDay(day: number) {
    if (isPast(day)) return;
    const d = new Date(viewYear, viewMonth, day);
    const iso = toIso(d);
    if (selecting === 'from') {
      setDraft({ from: iso, to: null });
      setSelecting('to');
    } else {
      const from = draft.from!;
      const [f, t] = iso < from ? [iso, from] : [from, iso];
      setDraft({ from: f, to: t });
      setSelecting('from');
    }
  }

  function inRange(day: number) {
    if (!draft.from || !draft.to) return false;
    const d = toIso(new Date(viewYear, viewMonth, day));
    return d > draft.from && d < draft.to;
  }

  function isFrom(day: number) {
    return draft.from === toIso(new Date(viewYear, viewMonth, day));
  }
  function isTo(day: number) {
    return draft.to === toIso(new Date(viewYear, viewMonth, day));
  }

  function apply() {
    if (draft.from && draft.to) {
      onChange({ from: draft.from, to: draft.to });
    }
    onClose();
  }

  function clear() {
    setDraft({ from: null, to: null });
    onChange(null);
    onClose();
  }

  const fmt = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : '—';

  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-[300px] rounded-2xl border border-[#EBEBEB] bg-white p-4 shadow-[0_8px_32px_0_rgba(30,41,59,0.14)]">
      {/* Month nav */}
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={prevMonth} disabled={isCurrentMonth} className="btn-mui-ink-tint flex h-7 w-7 items-center justify-center rounded-lg text-heading disabled:pointer-events-none disabled:opacity-30">
          <ChevronDownIcon className="rotate-90" />
        </button>
        <span className="text-[13px] font-semibold text-heading">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} className="btn-mui-ink-tint flex h-7 w-7 items-center justify-center rounded-lg text-heading">
          <ChevronDownIcon className="-rotate-90" />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d} className="text-[10px] font-medium text-muted">{d}</span>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <span key={`e-${i}`} />;
          const past = isPast(day);
          const from = isFrom(day);
          const to = isTo(day);
          const range = inRange(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => selectDay(day)}
              disabled={past}
              className={`relative flex h-8 w-full items-center justify-center text-[12px] font-medium transition
                ${past ? 'cursor-not-allowed text-zinc-300' : ''}
                ${!past && (from || to) ? 'z-10 rounded-lg bg-brand text-white' : ''}
                ${!past && range ? 'bg-[#FFF0F1] text-heading' : ''}
                ${!past && !from && !to && !range ? 'rounded-lg text-heading hover:bg-[#F4F4F4]' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected range display */}
      <div className="mt-3 flex items-center justify-between rounded-lg bg-[#F5F6F8] px-3 py-2 text-[11px] text-muted">
        <span>{fmt(draft.from)}</span>
        <span className="text-zinc-300">→</span>
        <span>{fmt(draft.to)}</span>
      </div>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={clear} className="btn-mui-ink-tint flex-1 rounded-lg py-2 text-[12px] font-medium text-heading">
          Clear
        </button>
        <button
          type="button"
          onClick={apply}
          disabled={!draft.from || !draft.to}
          className="flex-1 rounded-lg bg-brand py-2 text-[12px] font-medium text-white disabled:opacity-40"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── Schedule Card ─────────────────────────────────────────────────────────────

const SCHEDULE_CARD =
  'interactive-card relative overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-white';

function formatDate(iso: string) {
  // Pin to UTC so server and client always agree on the calendar day, regardless of
  // either environment's local timezone (mismatched TZ ⇒ hydration error near midnight).
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

function formatTime(time: string) {
  const [hStr, mStr] = time.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr || '0', 10);
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}:00 ${period}` : `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function getTimeOfDay(time: string): 'morning' | 'evening' | 'night' {
  const h = parseInt(time.split(':')[0], 10);
  if (h < 12) return 'morning';
  if (h < 18) return 'evening';
  return 'night';
}

function discountPct(retail: number, selling: number) {
  return retail > selling ? Math.round(((retail - selling) / retail) * 100) : 0;
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
    <div className="flex min-w-0 items-start gap-1.5 md:gap-2.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#FFF6F7] md:h-8 md:w-8">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold text-heading md:text-[13px]">{title}</p>
        <p className="truncate text-[10px] text-muted md:mt-0.5 md:text-[12px]">{subtitle}</p>
      </div>
    </div>
  );
}

function QuantityStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex w-fit max-w-fit shrink-0 grow-0 items-stretch overflow-hidden rounded-md border border-[#EBEBEB] bg-white md:rounded-lg">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="btn-mui-ink-tint flex h-8 w-8 shrink-0 grow-0 basis-8 items-center justify-center p-0 text-[14px] leading-none text-brand md:h-9 md:w-9 md:basis-9 md:text-[17px]"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="flex h-8 w-8 shrink-0 grow-0 basis-8 items-center justify-center border-x border-zinc-200 text-[13px] font-medium leading-none text-heading md:h-9 md:w-9 md:basis-9 md:text-[14px]">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="btn-mui-ink-tint flex h-8 w-8 shrink-0 grow-0 basis-8 items-center justify-center p-0 text-[14px] leading-none text-brand md:h-9 md:w-9 md:basis-9 md:text-[17px]"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

const TIME_OF_DAY_LABELS = {
  morning: { title: 'Morning Batch', subtitle: 'Start your day light.' },
  evening: { title: 'Evening Batch', subtitle: 'Grow every evening.' },
  night:   { title: 'Night Batch',   subtitle: 'Learn. Dream. Achieve.' },
};

function TimeOfDayIcon({ tod, className }: { tod: 'morning' | 'evening' | 'night'; className?: string }) {
  if (tod === 'morning') return <SunIcon className={className ?? 'h-3.5 w-[20px] max-md:h-3 max-md:w-[16px]'} />;
  if (tod === 'evening') return <SunsetIcon className={className} />;
  return <MoonIcon className={className} />;
}

function ScheduleCard({ batch, quantity, onQuantityChange, onEnroll }: {
  batch: ApiCourseBatch;
  quantity: number;
  onQuantityChange: (n: number) => void;
  onEnroll?: (batch: ApiCourseBatch, quantity: number) => void;
}) {
  const sym = batch.currencySymbol;
  const retail = Number(batch.plan1RetailPrice ?? 0) * quantity;
  const selling = Number(batch.plan1SellingPrice ?? 0) * quantity;
  const pct = discountPct(retail, selling);

  const startLabel = formatDate(batch.startDate);
  const endLabel = formatDate(batch.endDate);
  const dateRange = startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
  const isSoldOut = batch.availability === 'SOLD_OUT';
  const isUpcoming = batch.availability === 'UPCOMING';
  const timeLabel = `${batch.timezone}: ${formatTime(batch.startTime)} - ${formatTime(batch.endTime)}`;
  const dayLabel = batch.dayType === 'WEEKDAY' ? 'Weekday Batch' : 'Weekend Batch';
  const tod = getTimeOfDay(batch.startTime);
  const todMeta = TIME_OF_DAY_LABELS[tod];

  return (
    <article className={SCHEDULE_CARD}>
      {batch.fastFilling ? (
        <span className="absolute top-0 right-4 z-10 inline-flex items-center gap-1 rounded-b-lg bg-brand px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white shadow-[0_4px_10px_rgba(253,2,45,0.35)] max-md:right-3 max-md:px-2 max-md:py-0.5 max-md:text-[9px]">
          <FireIcon className="shrink-0" />
          Fast filling
        </span>
      ) : null}
      <span className="absolute inset-y-0 left-0 w-1 rounded-l-[20px] bg-brand" aria-hidden />
      <div className="relative flex flex-col xl:flex-row">
        <div className="min-w-0 flex-1">
          <div className="relative flex items-center justify-between gap-2 border-b border-zinc-100 py-3 pr-3 pl-[22px] md:py-5 md:pr-5 md:pl-[30px]">
            <div className="min-w-0 flex-1 pr-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFF6F7] px-2 py-0.5 text-[11px] font-medium leading-[140%] text-brand max-md:py-0.5 max-md:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                {batch.venue.toUpperCase()}
              </span>
              <p className="interactive-card-title mt-2 text-[24px] font-semibold text-heading max-md:mt-1.5 max-md:text-[16px] max-md:leading-tight">
                {dateRange}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[14px] font-medium text-muted max-md:mt-0.5 max-md:text-[11px]">
                <ClockIcon className="shrink-0 text-brand" />
                <span className="truncate">{timeLabel}</span>
              </p>
            </div>
            <div className="shrink-0 xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <QuantityStepper value={quantity} onChange={onQuantityChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 py-3 pr-3 pl-[22px] md:flex md:flex-row md:gap-0 md:py-5 md:pr-5 md:pl-[35px]">
            <div className="min-w-0 md:flex-1">
              <MetaItem
                icon={<CalendarIcon className="text-brand max-md:h-3 max-md:w-3" />}
                title={dayLabel}
                subtitle={`${batch.noOfSessions} Sessions`}
              />
            </div>
            <div className="hidden md:block w-px self-stretch bg-zinc-100 mx-3" aria-hidden />
            <div className="min-w-0 md:flex-1">
              <MetaItem
                icon={<TimeOfDayIcon tod={tod} className={tod === 'morning' ? 'h-3.5 w-[20px] max-md:h-3 max-md:w-[16px]' : 'text-brand max-md:h-3 max-md:w-3'} />}
                title={todMeta.title}
                subtitle={todMeta.subtitle}
              />
            </div>
            <div className="hidden md:block w-px self-stretch bg-zinc-100 mx-3" aria-hidden />
            <div className="min-w-0 md:flex-1">
              <MetaItem
                icon={<PersonIcon className="text-brand max-md:h-3 max-md:w-3" />}
                title={batch.trainerName}
                subtitle="Certified Trainer"
              />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col justify-between border-t border-zinc-100 bg-[linear-gradient(90deg,#FFF_76.35%,#FFF7F8_99.67%)] p-4 max-md:flex-row max-md:items-center max-md:gap-3 max-md:py-3 max-md:pr-3 max-md:pl-[22px] xl:w-[216px] xl:flex-col xl:rounded-r-[20px] xl:border-t-0 xl:border-l xl:p-5">
          <div className="min-w-0 max-md:flex-1">
            {pct > 0 ? (
              <span className="inline-flex rounded-lg border border-brand bg-white px-2 py-[5px] text-[10px] font-normal leading-[140%] text-brand max-md:px-1.5 max-md:py-0.5 max-md:text-[9px]">
                {pct}% Off
              </span>
            ) : null}
            <div className="mt-3 flex flex-wrap items-baseline gap-2 max-md:mt-1.5 max-md:gap-1">
              <span className="inline-flex items-baseline gap-1">
                <span className="text-[14px] font-medium leading-[18px] text-brand max-md:text-[11px]">{sym}</span>
                <span className="text-[24px] font-semibold leading-[18px] text-heading max-md:text-[15px] max-md:leading-none">
                  {selling.toLocaleString('en-IN')}
                </span>
              </span>
              {retail > selling ? (
                <span className="text-[13px] text-muted line-through max-md:text-[10px]">
                  {sym} {retail.toLocaleString('en-IN')}
                </span>
              ) : null}
            </div>
            {batch.label ? (
              <p className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-[#F5F6F8] px-2.5 py-1 text-[12px] font-normal leading-[140%] text-heading max-md:mt-1.5 max-md:px-1.5 max-md:py-0.5 max-md:text-[9px]">
                <SlotsIcon className="shrink-0 max-md:h-2 max-md:w-2" />
                <span className="truncate">{batch.label}</span>
              </p>
            ) : null}
          </div>

          <div className="max-md:shrink-0 xl:mt-4">
            <div className="hidden flex-wrap items-center gap-x-2 gap-y-1 text-center text-[10px] text-muted sm:flex">
              <span>Secure<br />Payment</span>
              <span className="text-zinc-300" aria-hidden>|</span>
              <span>Easy<br />Refund</span>
              <span className="text-zinc-300" aria-hidden>|</span>
              <span>24/7<br />Support</span>
            </div>
            {isSoldOut || isUpcoming ? (
              <span
                aria-disabled="true"
                className="btn-brand-outline mt-3 inline-flex w-[139px] cursor-not-allowed items-center justify-center px-4 py-[11px] text-[14px] font-medium leading-[18px] max-md:mt-0 max-md:w-auto max-md:px-3 max-md:py-2 max-md:text-[11px]"
              >
                {isSoldOut ? 'Sold Out' : 'Upcoming'}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onEnroll?.(batch, quantity)}
                className="btn-brand mt-3 inline-flex w-[139px] items-center justify-center gap-[11px] px-4 py-[11px] text-[14px] font-medium leading-[18px] max-md:mt-0 max-md:w-auto max-md:gap-1 max-md:px-3 max-md:py-2 max-md:text-[11px]"
              >
                Enroll Now
                <ArrowRightIcon className="btn-arrow-icon shrink-0 text-white max-md:h-3 max-md:w-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

function filterBatches(batches: ApiCourseBatch[], activeFilter: string, dateRange: { from: string; to: string } | null): ApiCourseBatch[] {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();

  if (dateRange) {
    return batches.filter((b) => b.startDate.slice(0, 10) >= dateRange.from && b.startDate.slice(0, 10) <= dateRange.to);
  }
  if (activeFilter === 'this_month') {
    return batches.filter((b) => {
      const [y, m] = b.startDate.slice(0, 7).split('-').map(Number);
      return y === thisYear && m - 1 === thisMonth;
    });
  }
  if (activeFilter === 'next_month') {
    const nextMonth = (thisMonth + 1) % 12;
    const nextYear = thisMonth === 11 ? thisYear + 1 : thisYear;
    return batches.filter((b) => {
      const [y, m] = b.startDate.slice(0, 7).split('-').map(Number);
      return y === nextYear && m - 1 === nextMonth;
    });
  }
  if (activeFilter === 'weekends') return batches.filter((b) => b.dayType === 'WEEKEND');
  if (activeFilter === 'weekday') return batches.filter((b) => b.dayType === 'WEEKDAY');
  return batches;
}

export default function CourseSchedulesSection({
  courseUri,
  categoryUri,
  courseName,
  variant = 'default',
  courseId = null,
}: {
  courseUri: string;
  categoryUri: string;
  courseName: string;
  variant?: 'default' | 'technical';
  courseId?: string | null;
}) {
  const INITIAL_LIMIT = 3;
  const LOAD_MORE_LIMIT = 5;

  const router = useRouter();
  const isTechnical = variant === 'technical';
  const [batches, setBatches] = useState<ApiCourseBatch[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [dateRange, setDateRange] = useState<{ from: string; to: string } | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [pickerOpen, setPickerOpen] = useState(false);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollBatch, setEnrollBatch] = useState<ApiCourseBatch | null>(null);
  const [enrollQuantity, setEnrollQuantity] = useState(1);
  const [plansData, setPlansData] = useState<ApiCoursePlansData | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCourseBatches(courseUri, categoryUri, { limit: INITIAL_LIMIT, offset: 0 }).then((result) => {
      setBatches(result.batches);
      setTotal(result.total);
      setQuantities(Object.fromEntries(result.batches.map((b) => [b.id, 1])));
    });
    getCoursePlans(courseUri, categoryUri).then((data) => {
      setPlansData(data);
    });
  }, [courseUri, categoryUri]);

  function handleLoadMore() {
    setLoadingMore(true);
    getCourseBatches(courseUri, categoryUri, { limit: LOAD_MORE_LIMIT, offset: batches.length }).then((result) => {
      setBatches((prev) => [...prev, ...result.batches]);
      setTotal(result.total);
      setQuantities((prev) => ({
        ...prev,
        ...Object.fromEntries(result.batches.map((b) => [b.id, 1])),
      }));
      setLoadingMore(false);
    });
  }

  function handleEnroll(batch: ApiCourseBatch, quantity: number = 1) {
    const activePlans = effectivePlansData
      ? buildActivePlans(effectivePlansData.plans, batch, quantity, effectivePlansData.batch ?? null)
      : [];

    // Only plan1 priced (plan2/plan3 absent) → skip the plan picker and go straight to checkout.
    if (activePlans.length === 1) {
      const params = new URLSearchParams({
        batchId: batch.id,
        planNumber: String(activePlans[0].plan.planNumber),
        quantity: String(quantity),
      });
      if (courseId) params.set('courseId', courseId);
      router.push(`/checkout?${params.toString()}`);
      return;
    }

    setEnrollBatch(batch);
    setEnrollQuantity(quantity);
    setEnrollModalOpen(true);
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    }
    if (pickerOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [pickerOpen]);

  function handleFilterClick(param: string) {
    setActiveFilter((prev) => (prev === param ? '' : param));
    setDateRange(null);
  }

  function handleDateRange(v: { from: string; to: string } | null) {
    setDateRange(v);
    setActiveFilter('');
  }

  const visibleBatches = useMemo(
    () => filterBatches(batches, activeFilter, dateRange),
    [batches, activeFilter, dateRange],
  );

  const comparisonBatch = visibleBatches[0] ?? batches[0] ?? null;

  const { data: effectivePlansData } = useMemo(
    () => resolvePlansDataForCourse(plansData, courseUri, categoryUri, comparisonBatch),
    [plansData, courseUri, categoryUri, comparisonBatch],
  );

  const emiBatch = useMemo(
    () => batches.find((b) => b.plan1HasEMI && b.plan1EMIMonthCount) ?? null,
    [batches],
  );

  const dateRangeLabel = dateRange
    ? `${formatDate(dateRange.from)} to ${formatDate(dateRange.to)}`
    : 'Month';
    
  return (
    <>
      {emiBatch ? (
        <div className="mt-8">
          <CourseFeeSection batch={emiBatch} onEnroll={(b) => handleEnroll(b as ApiCourseBatch)} courseId={courseId} />
        </div>
      ) : null}

      {isTechnical ? (
        <div className="mt-8">
          <CourseCareerAssuranceSection />
        </div>
      ) : null}

      <div className={`overflow-visible max-md:mt-8 mt-8 ${COURSE_SECTION_CARD} px-5 pt-5 pb-5 md:px-6 md:pt-6 md:pb-6`}>
        {/* Header */}
        
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-[22px] font-bold leading-[140%] text-heading">Upcoming Schedules</h2>
          {plansData?.moneyBack ? (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-[#FFF6F7] px-2.5 py-1 text-[11px] font-medium leading-[140%] text-brand">
              <GuaranteeIcon className="shrink-0" />
              100% Money Back Guarantee
            </span>
          ) : null}
        </div>

        {/* Filters */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {COURSE_SCHEDULE_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.param && !dateRange;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => handleFilterClick(filter.param)}
                className={`inline-flex h-8 items-center rounded-lg px-3 text-[12px] font-medium leading-[140%] transition ${
                  isActive
                    ? 'bg-brand/10 text-brand ring-1 ring-brand/30'
                    : 'btn-mui-ink-tint bg-[#F4F4F4] text-heading'
                }`}
              >
                {filter.label}
              </button>
            );
          })}

          {/* Month / date range picker */}
          <div ref={pickerRef} className="relative">
            <button
              type="button"
              onClick={() => setPickerOpen((o) => !o)}
              className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] font-medium leading-[140%] transition ${
                dateRange
                  ? 'bg-brand/10 text-brand ring-1 ring-brand/30'
                  : 'btn-mui-ink-tint bg-[#F4F4F4] text-heading'
              }`}
            >
              <CalendarIcon className="shrink-0 opacity-70" />
              {dateRangeLabel}
              <ChevronDownIcon className={`shrink-0 opacity-60 transition-transform ${pickerOpen ? 'rotate-180' : ''}`} />
            </button>

            {pickerOpen ? (
              <DateRangePicker
                value={dateRange}
                onChange={handleDateRange}
                onClose={() => setPickerOpen(false)}
              />
            ) : null}
          </div>
        </div>

        {/* Batch list */}
        <div className="mt-5 space-y-4 overflow-visible">
          {visibleBatches.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-muted">No schedules found for the selected filter.</p>
          ) : (
            visibleBatches.map((batch, index) => (
              <div key={batch.id}>
                <ScheduleCard
                  batch={batch}
                  quantity={quantities[batch.id] ?? 1}
                  onQuantityChange={(n) => setQuantities((prev) => ({ ...prev, [batch.id]: n }))}
                  onEnroll={handleEnroll}
                />
                {index === 1 ? (
                  <div className="mt-4">
                    <CourseBatchRequestBanner banner={CUSTOMIZE_BATCH_BANNER} courseId={courseId} />
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>

        {/* View more */}
        {!activeFilter && !dateRange && batches.length < total ? (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium leading-[18px] text-brand transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingMore ? 'Loading…' : 'View More Schedules'}
              {!loadingMore ? <ViewMoreChevronIcon className="shrink-0 text-brand" /> : null}
            </button>
          </div>
        ) : null}
      </div>

      {/* Enroll modal */}
      {enrollModalOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setEnrollModalOpen(false)}
        >
          {(() => {
            const modalBatch = enrollBatch ?? comparisonBatch ?? effectivePlansData?.batch ?? emiBatch ?? null;
            const activePlanCount = effectivePlansData && modalBatch
              ? buildActivePlans(effectivePlansData.plans, modalBatch, enrollQuantity, effectivePlansData.batch ?? null).length
              : 0;
            const maxW = activePlanCount >= 3 ? 'max-w-[1200px]' : activePlanCount === 2 ? 'max-w-4xl' : 'max-w-2xl';
            return (
          <div
            className={`relative w-full ${maxW} max-h-[90dvh] overflow-auto rounded-[20px] bg-white`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setEnrollModalOpen(false)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-heading shadow hover:bg-white"
              aria-label="Close"
            >
              ✕
            </button>
            {effectivePlansData ? (
              <CoursePlanComparisonSection
                plans={effectivePlansData.plans}
                features={effectivePlansData.features}
                batch={modalBatch}
                fallbackBatch={effectivePlansData.batch ?? null}
                courseId={courseId}
                quantity={enrollQuantity}
              />
            ) : (
              <div className="flex items-center justify-center py-16 text-[14px] text-muted">
                Loading…
              </div>
            )}
          </div>
            );
          })()}
        </div>
      ) : null}
    </>
  );
}
