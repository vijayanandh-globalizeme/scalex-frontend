'use client';

import { useState } from 'react';
import { CourseCard, type Course } from '@/components/courses/CoursesSection';

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

export interface CategoryCoursesSectionProps {
  heading: string;
  subheading: string;
  courses: Course[];
  initialVisibleCount?: number;
  loadMoreStep?: number;
  viewMoreLabel?: string;
  currencySymbol?: string;
}

export default function CategoryCoursesSection({
  heading,
  subheading,
  courses,
  initialVisibleCount = 6,
  loadMoreStep = 6,
  viewMoreLabel = 'View More Courses',
  currencySymbol = '₹',
}: CategoryCoursesSectionProps) {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const visibleCourses = courses.slice(0, visibleCount);
  const hasMore = visibleCount < courses.length;

  return (
    <section
      id="courses"
      className="full-bleed relative z-0 overflow-visible bg-white pb-10 pt-12 md:pb-12 md:pt-16 lg:pt-20"
      aria-labelledby="category-courses-heading"
    >
      <div className="site-container">
        <header className="mx-auto max-w-4xl text-center">
          <h2
            id="category-courses-heading"
            className="text-[40px] font-extrabold leading-[60px] text-heading"
          >
            {heading}
          </h2>
          <p className="mt-3 text-[16px] font-medium leading-[140%] text-muted md:text-[18px]">
            {subheading}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} currencySymbol={currencySymbol} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          {hasMore ? (
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + loadMoreStep)}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand underline-offset-4 transition hover:underline"
            >
              {viewMoreLabel}
              <ViewMoreChevronIcon className="shrink-0 text-brand" />
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand">
              {viewMoreLabel}
              <ViewMoreChevronIcon className="shrink-0 text-brand" />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
