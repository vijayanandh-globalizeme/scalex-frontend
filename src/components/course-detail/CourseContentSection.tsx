'use client';

import { useState } from 'react';
import type { ApiCourseDetails } from '@/services/courseApi';
import { COURSE_CONTENT_TITLE, COURSE_CONTENT_SYLLABUS_LABEL } from '@/lib/courseDetailStatics';
import CourseBrochureCta from './CourseBrochureCta';
import {
  COURSE_INNER_CARD,
  COURSE_ROW_DIVIDER_FULL,
  COURSE_SECTION_CARD,
  COURSE_TOP_DIVIDER_FULL,
} from './courseSectionCard';

const DEFAULT_VISIBLE = 5;

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none" aria-hidden>
      <g clipPath="url(#course-content-download-clip)">
        <path d="M9.79582 5.8964V9.88601C9.79582 11.2746 8.96798 12.0518 7.48346 12.0518H2.30684C0.822297 12.0518 0 11.2746 0 9.88601V5.8964C0 4.50261 0.822297 3.73059 2.30684 3.73059H3.42164V4.56479H2.30684C1.40177 4.56479 0.888524 5.04665 0.888524 5.8964V9.88601C0.888524 10.7358 1.40177 11.2176 2.30684 11.2176H7.48346C8.39404 11.2176 8.90728 10.7358 8.90728 9.88601V5.8964C8.90728 5.04665 8.39404 4.56479 7.48346 4.56479H6.37418V3.73059H7.48346C8.96798 3.73059 9.79582 4.50261 9.79582 5.8964Z" fill="#FD022D" />
        <path d="M4.90069 0.974121C4.66338 0.974121 4.45918 1.15546 4.45918 1.37308V6.64249L4.52541 8.04144C4.53644 8.23318 4.69649 8.38859 4.90069 8.38859C5.09936 8.38859 5.2594 8.23318 5.27044 8.04144L5.33667 6.64249V1.37308C5.33667 1.15546 5.13799 0.974121 4.90069 0.974121ZM3.0243 6.13473C2.79252 6.13473 2.62695 6.28499 2.62695 6.49743C2.62695 6.61139 2.67662 6.69432 2.7594 6.77205L4.5806 8.41968C4.69097 8.52335 4.78479 8.55439 4.90069 8.55439C5.01106 8.55439 5.10488 8.52335 5.21526 8.41968L7.03646 6.77205C7.11925 6.69432 7.16887 6.61139 7.16887 6.49743C7.16887 6.28499 6.99227 6.13473 6.76605 6.13473C6.65563 6.13473 6.54526 6.17617 6.46801 6.2591L5.6126 7.114L4.90069 7.82385L4.18324 7.114L3.32783 6.2591C3.25057 6.17617 3.13468 6.13473 3.0243 6.13473Z" fill="#FD022D" />
      </g>
      <defs><clipPath id="course-content-download-clip"><rect width="10" height="13" fill="white" /></clipPath></defs>
    </svg>
  );
}

function ModuleChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-brand transition-transform duration-200 ${open ? 'rotate-0' : '-rotate-90'}`}
      viewBox="0 0 16 16" fill="none" aria-hidden
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

type ApiModule = ApiCourseDetails['courseContent'][number];

export default function CourseContentSection({
  courseContent,
  syllabusUrl,
  title,
  courseId = null,
}: {
  courseContent: ApiModule[];
  syllabusUrl?: string | null;
  title?: string | null;
  courseId?: string | null;
}) {
  const [openModuleId, setOpenModuleId] = useState(courseContent[0]?.id ?? '');
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? courseContent : courseContent.slice(0, DEFAULT_VISIBLE);
  const hasMore  = courseContent.length > DEFAULT_VISIBLE;

  return (
    <div id="course-content" className={`scroll-mt-[116px] ${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[34px] font-bold leading-[140%] text-heading">{title ?? COURSE_CONTENT_TITLE}</h2>
        {syllabusUrl ? (
          <CourseBrochureCta
            openModal
            courseId={courseId}
            downloadUrl={syllabusUrl}
            className="btn-brand-outline inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start px-5 text-[13px] font-semibold sm:self-auto"
          >
            {COURSE_CONTENT_SYLLABUS_LABEL}
            <DownloadIcon className="btn-download-icon shrink-0" />
          </CourseBrochureCta>
        ) : null}
      </div>

      <div className={`mt-5 ${COURSE_INNER_CARD}`}>
        {visible.map((module, index) => {
          const isOpen   = openModuleId === module.id;
          const isFirst  = index === 0;
          const isLast   = index === visible.length - 1;
          const addBottomPad = isLast && !hasMore;

          return (
            <div
              key={module.id}
              id={module.id}
              className={`scroll-mt-[168px]${!isLast || hasMore ? ` ${COURSE_ROW_DIVIDER_FULL}` : ''}`}
            >
              <button
                type="button"
                onClick={() => setOpenModuleId(isOpen ? '' : module.id)}
                className={`flex w-full cursor-pointer items-center gap-3 px-5 text-left transition-colors hover:bg-[#FAFAFA] md:px-6${isFirst ? ' pt-4 pb-3' : ' py-4'}`}
                aria-expanded={isOpen}
              >
                <ModuleChevron open={isOpen} />
                <span className="text-[14px] font-semibold text-heading">{module.title}</span>
              </button>

              <div
                className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className="flex gap-3 px-5 pb-5 md:px-6">
                    <span className="h-4 w-4 shrink-0" aria-hidden />
                    <div
                      className="min-w-0 flex-1 rounded-lg bg-[#F8F9FB] p-5 md:p-6 [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-[13px] [&_h3]:font-semibold [&_h3]:text-heading [&_h3:first-child]:mt-0 [&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-muted"
                      dangerouslySetInnerHTML={{ __html: module.content.replaceAll('&nbsp;', ' ') }}
                    />
                  </div>
                </div>
              </div>

              {addBottomPad && !isOpen ? <div className="pb-4" /> : null}
            </div>
          );
        })}

        {hasMore && !showAll ? (
          <div className={`${COURSE_TOP_DIVIDER_FULL} px-5 py-4 text-center md:px-6`}>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="group inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium leading-[18px] text-brand transition hover:underline"
            >
              View More
              <ViewMoreChevronIcon className="btn-download-icon shrink-0 text-brand" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
