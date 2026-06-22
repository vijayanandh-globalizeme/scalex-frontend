'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { useGsapScrollReveal, useGsapScrollRevealStagger } from '@/hooks/useGsapScrollReveal';
import { useGridColumns } from '@/hooks/useGridColumns';

export interface CourseTab {
  id: string;
  label: string;
}

export interface Course {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  rating: number;
  hours: number;
  learners: string;
  price: number;
  originalPrice?: number;
  savePercent?: number;
  slotsLeft?: number;
  href: string;
}

export interface CoursesSectionProps {
  heading: string;
  subheading: string;
  tabs: CourseTab[];
  initialTabId: string;
  courses: Course[];
  initialVisibleCount?: number;
  loadMoreStep?: number;
  viewMoreLabel?: string;
  currencySymbol?: string;
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#star-icon-clip)">
        <path
          d="M3.01902 14.8627C3.30952 15.0888 3.67795 15.0111 4.11724 14.6932L7.86538 11.9453L11.6206 14.6932C12.0598 15.0111 12.4212 15.0888 12.7188 14.8627C13.0093 14.6437 13.073 14.2835 12.8959 13.7678L11.4151 9.37398L15.1986 6.66138C15.638 6.35057 15.8151 6.02562 15.7017 5.67242C15.5883 5.33335 15.2553 5.17087 14.7098 5.17087H10.0689L8.65889 0.784104C8.4889 0.261369 8.2338 0 7.86538 0C7.50399 0 7.24894 0.261369 7.0789 0.784104L5.66892 5.17087H1.02805C0.482481 5.17087 0.149473 5.33335 0.0361076 5.67242C-0.0843426 6.02562 0.099875 6.35057 0.539164 6.66138L4.32271 9.37398L2.84188 13.7678C2.66475 14.2835 2.72852 14.6437 3.01902 14.8627Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="star-icon-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#clock-icon-clip)">
        <path
          d="M15.715 7.9961C15.715 12.4018 12.1945 15.9922 7.85749 15.9922C3.52817 15.9922 0 12.4018 0 7.9961C0 3.58256 3.52817 0 7.85749 0C12.1945 0 15.715 3.58256 15.715 7.9961ZM7.36447 3.91965V5.19746C7.36447 5.47184 7.55706 5.69918 7.84208 5.69918C8.11943 5.69918 8.31971 5.47184 8.31971 5.19746V4.49976C10.0453 4.71927 11.3163 6.16954 11.3163 7.9961C11.3163 9.97162 9.80642 11.5238 7.85749 11.5238C5.91623 11.5238 4.39095 9.97162 4.39095 7.9961C4.39095 7.11025 4.69909 6.33416 5.21522 5.71486C5.3924 5.49535 5.4155 5.18179 5.20751 4.97013C4.99181 4.74278 4.64516 4.77414 4.42946 5.03284C3.75927 5.82461 3.34328 6.87507 3.34328 7.9961C3.34328 10.5125 5.38469 12.5899 7.85749 12.5899C10.3303 12.5899 12.3717 10.5125 12.3717 7.9961C12.3717 5.47968 10.3303 3.40226 7.86519 3.40226C7.53394 3.40226 7.36447 3.62176 7.36447 3.91965ZM5.96244 6.4204L7.35676 8.52917C7.66491 9.00736 8.21953 9.08579 8.61245 8.69381C8.99756 8.27831 8.92057 7.72956 8.46604 7.40815L6.39384 5.98923C6.078 5.79325 5.75445 6.10682 5.96244 6.4204Z"
          fill="#000000"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="clock-icon-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="16" viewBox="0 0 23 16" fill="none" aria-hidden>
      <g clipPath="url(#users-icon-clip)">
        <path
          d="M9.83079 10.0949C8.5404 11.2117 7.81381 12.639 7.81381 13.9197C7.81381 14.2867 7.8884 14.6407 8.06634 14.9483H2.13566C1.15694 14.9483 0.768555 14.5616 0.768555 13.8579C0.768555 11.7235 2.95903 9.14835 6.46224 9.14835C7.78998 9.14835 8.92912 9.51832 9.83079 10.0949ZM9.17315 4.98792C9.17315 6.66603 7.91479 7.96521 6.47001 7.96521C5.01746 7.96521 3.7591 6.66603 3.7591 5.00339C3.7591 3.34849 5.02523 2.0957 6.47001 2.0957C7.90703 2.0957 9.17315 3.31755 9.17315 4.98792Z"
          fill="#000000"
        />
        <path
          d="M15.4115 7.78732C17.0815 7.78732 18.5185 6.30255 18.5185 4.36925C18.5185 2.45915 17.0737 1.04398 15.4115 1.04398C13.7492 1.04398 12.3045 2.49008 12.3045 4.38472C12.3045 6.30255 13.7415 7.78732 15.4115 7.78732ZM10.5256 14.9483H20.2896C21.5091 14.9483 21.9441 14.6003 21.9441 13.9197C21.9441 11.9246 19.4351 9.17154 15.4037 9.17154C11.38 9.17154 8.87109 11.9246 8.87109 13.9197C8.87109 14.6003 9.3061 14.9483 10.5256 14.9483Z"
          fill="#000000"
        />
      </g>
      <defs>
        <clipPath id="users-icon-clip">
          <rect width="23" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function FireIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 14c2.5 0 4.5-1.8 4.5-4.4 0-2-1.4-3.4-2.5-4.6-1.1 1.5-2.2 1.7-3-.5-.5-1.4-.8-2.5-1.5-2.5C4.4 2 3.5 4 3.5 6c0 2.5 1.5 4 1.5 4S5 8.5 6.5 8C5.5 9.5 5 10.6 5 11.5 5 13 6.5 14 8 14z"
        fill="#F97316"
      />
    </svg>
  );
}

function SlotsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#F97316" strokeWidth="1.5" />
      <path d="M5 2v2M11 2v2M2 6.5h12" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ViewMoreChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      aria-hidden
    >
      <path
        d="M7.50374 9C7.69084 9 7.87795 8.92839 8.00517 8.79244L13.7979 3.11657C13.9251 2.99489 14 2.83742 14 2.65849C14 2.2863 13.7081 2 13.3189 2C13.1318 2 12.9597 2.07158 12.8325 2.1861L7.09959 7.79038H7.9004L2.16753 2.1861C2.04778 2.07158 1.87565 2 1.68106 2C1.29188 2 1 2.2863 1 2.65849C1 2.83742 1.07484 2.99489 1.20207 3.12372L6.99482 8.79244C7.13701 8.92839 7.30915 9 7.50374 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 18 15" fill="none" aria-hidden>
      <path
        d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CourseCard({
  course,
  currencySymbol,
  variant = 'default',
}: {
  course: Course;
  currencySymbol: string;
  variant?: 'default' | 'courseDetail';
}) {
  const isCourseDetail = variant === 'courseDetail';

  return (
    <article className="mx-auto flex w-full max-w-[405px] flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.03),0_4px_4px_0_rgba(30,41,59,0.06)] transition hover:shadow-lg">
      <div className="relative h-[181px] w-full">
        <Image
          src={course.imageSrc}
          alt={course.imageAlt}
          fill
          sizes="405px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        {isCourseDetail ? (
          <h3 className="w-full text-[16px] font-bold leading-tight text-heading">{course.title}</h3>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[16px] font-bold leading-tight text-heading">{course.title}</h3>
            <span className="shrink-0 rounded-[26px] border-[0.5px] border-border-tag bg-[#FFDEE4] px-3 py-1 text-[11px] font-semibold text-heading">
              {course.categoryLabel}
            </span>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-medium text-body">
          <span className="inline-flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-black" />
            {course.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-4 w-[23px]" />
            {course.hours} Hr
          </span>
          {!isCourseDetail ? (
            <span className="inline-flex items-center gap-1">
              <UsersIcon className="h-4 w-[23px]" />
              {course.learners}
            </span>
          ) : null}
        </div>
        <div
          className={`mt-1 ${isCourseDetail ? 'flex flex-col gap-3' : 'flex items-center justify-between gap-3'}`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-bold text-heading">
                {currencySymbol}
                {course.price.toLocaleString('en-IN')}
              </span>
              {course.originalPrice ? (
                <span className="text-[13px] font-medium text-zinc-400 line-through">
                  {currencySymbol}
                  {course.originalPrice.toLocaleString('en-IN')}
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold text-body">
              {course.savePercent ? (
                <span className="inline-flex items-center gap-1">
                  <FireIcon className="h-3.5 w-3.5" />
                  Save {course.savePercent}%
                </span>
              ) : null}
              {course.slotsLeft ? (
                <span className="inline-flex items-center gap-1">
                  <SlotsIcon className="h-3.5 w-3.5" />
                  Last {course.slotsLeft} slots left
                </span>
              ) : null}
            </div>
          </div>
          <Link
            href={course.href}
            className={`btn-accent-outline inline-flex items-center justify-center gap-2 px-4 py-[11px] text-[14px] ${
              isCourseDetail ? 'w-full' : 'w-[156px] shrink-0'
            }`}
          >
            View Course
            <ArrowRightIcon className="btn-arrow-icon h-4 w-4 shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CoursesSection({
  heading,
  subheading,
  tabs,
  initialTabId,
  courses,
  initialVisibleCount = 6,
  loadMoreStep = 6,
  viewMoreLabel = 'View More Courses',
  currencySymbol = '₹',
}: CoursesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTabId);
  const [visibleCount, setVisibleCount] = useState<number>(initialVisibleCount);

  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const cols = useGridColumns();

  const filteredCourses = useMemo(() => {
    if (activeTab === 'all') return courses;
    return courses.filter((c) => c.category === activeTab);
  }, [courses, activeTab]);

  const visibleCourses = filteredCourses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCourses.length;

  const courseRows = useMemo(() => {
    const rows: Course[][] = [];
    for (let i = 0; i < visibleCourses.length; i += cols) {
      rows.push(visibleCourses.slice(i, i + cols));
    }
    return rows;
  }, [visibleCourses, cols]);

  rowRefs.current.length = courseRows.length;

  useGsapScrollRevealStagger(
    sectionRef,
    rowRefs,
    {
      y: 40,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
      start: 'top 88%',
    },
    [activeTab, courseRows.length, cols],
  );

  useGsapScrollReveal(sectionRef, headerRef, {
    y: 40,
    duration: 1.2,
    delay: 0.1,
    start: 'top 88%',
  });

  return (
    <section
      ref={sectionRef}
      className="full-bleed relative bg-surface pt-10 pb-16 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24"
      aria-labelledby="courses-heading"
    >
      <div className="site-container relative z-10">
        <header ref={headerRef} className="gsap-reveal-pending mx-auto max-w-3xl text-center">
          <h2
            id="courses-heading"
            className="text-[28px] font-bold leading-[140%] text-heading md:text-[34px]"
          >
            {heading}
          </h2>
          <p className="mt-3 text-[16px] font-medium leading-[140%] text-muted md:text-[18px]">
            {subheading}
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Course categories"
          className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-lg bg-surface-raised p-2 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)] md:mt-10 lg:justify-between"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(tab.id);
                  setVisibleCount(initialVisibleCount);
                }}
                className={`cursor-pointer rounded-lg px-4 py-2.5 text-center text-[16px] font-medium leading-[140%] ${
                  isActive ? 'courses-tab-active' : 'btn-mui-brand-tint text-heading'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-6 md:mt-10">
          {courseRows.map((rowCourses, rowIndex) => (
            <div
              key={`${activeTab}-row-${rowIndex}`}
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
              className="gsap-reveal-pending grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {rowCourses.map((course) => (
                <CourseCard key={`${activeTab}-${course.id}`} course={course} currencySymbol={currencySymbol} />
              ))}
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 ? (
          <p className="mt-10 text-center text-[14px] text-muted">No courses available in this category yet.</p>
        ) : null}

        {hasMore ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + loadMoreStep)}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand underline-offset-4 transition hover:underline"
            >
              {viewMoreLabel}
              <ViewMoreChevronIcon className="shrink-0 text-brand" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
