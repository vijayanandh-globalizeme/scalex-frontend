'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { CourseCard, apiCourseToCard, type Course } from '@/components/courses/CoursesSection';
import { useGsapScrollRevealStagger } from '@/hooks/useGsapScrollReveal';
import { useGridColumns } from '@/hooks/useGridColumns';
import { getCourses } from '@/app/actions/courseActions';

const FETCH_LIMIT = 6;

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
  /** Single category to filter by. Omit (along with `categoryIds`) to show courses from any category. */
  categoryId?: string;
  /** Multiple categories to filter by (matched with an `IN` query, ordered by priority/updatedAt across all of them). Takes precedence over `categoryId`. */
  categoryIds?: string[];
  categoryName?: string;
  /** Overrides the default "Explore all {categoryName} courses" heading. */
  heading?: string;
  currencySymbol?: string;
  /** When set, caps total displayed courses and hides "View More Courses" once reached. */
  maxCourses?: number;
  /** How many courses to show before the first "View More Courses" click. Defaults to fetching a full batch (6) upfront. */
  initialVisibleCount?: number;
  /** How many additional courses "View More Courses" reveals per click. Defaults to a full fetch batch (6). */
  loadMoreStep?: number;
  /** Tighter top spacing (e.g. blogs listing page). */
  compactTop?: boolean;
  /** Soft gray section background (e.g. blog detail page). */
  mutedBackground?: boolean;
  /** Optional extra section classes (e.g. page-specific spacing). */
  className?: string;
  /** Optional extra heading classes (e.g. page-specific mobile spacing). */
  headingClassName?: string;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-surface-raised">
      <div className="h-[200px] rounded-t-2xl bg-muted/20" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-1/3 rounded bg-muted/20" />
        <div className="h-5 w-4/5 rounded bg-muted/20" />
        <div className="h-4 w-1/2 rounded bg-muted/20" />
        <div className="flex gap-4 pt-2">
          <div className="h-4 w-16 rounded bg-muted/20" />
          <div className="h-4 w-16 rounded bg-muted/20" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 rounded bg-muted/20" />
          <div className="h-8 w-20 rounded-lg bg-muted/20" />
        </div>
      </div>
    </div>
  );
}

export default function CategoryCoursesSection({
  categoryId,
  categoryIds,
  categoryName,
  heading,
  currencySymbol = '₹',
  maxCourses,
  initialVisibleCount,
  loadMoreStep,
  compactTop = false,
  mutedBackground = false,
  className,
  headingClassName,
}: CategoryCoursesSectionProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount ?? FETCH_LIMIT);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreRemote, setHasMoreRemote] = useState(false);
  const offsetRef = useRef(0);

  // Stable key for the effect dependency array — `categoryIds` arrays are
  // re-created on every render by callers, so compare by value, not identity.
  const categoryKey = categoryIds && categoryIds.length ? categoryIds.slice().sort().join(',') : (categoryId ?? '');
  const fetchOptions = categoryIds && categoryIds.length ? { categoryIds } : { categoryId };

  const sectionRef = useRef<HTMLElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandStartHeightRef = useRef<number | null>(null);
  const expandStartRowRef = useRef<number | null>(null);
  const cols = useGridColumns();

  function captureExpandStart() {
    const container = gridContainerRef.current;
    if (container) {
      expandStartHeightRef.current = container.offsetHeight;
      expandStartRowRef.current = courseRows.length;
    }
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setCourses([]);
    setVisibleCount(initialVisibleCount ?? FETCH_LIMIT);
    offsetRef.current = 0;

    getCourses({ ...fetchOptions, limit: FETCH_LIMIT, offset: 0 }).then((items) => {
      if (cancelled) return;
      const cards = items.map(apiCourseToCard);
      setCourses(cards);
      offsetRef.current = items.length;
      setHasMoreRemote(items.length >= FETCH_LIMIT);
      setLoading(false);
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryKey]);

  async function handleViewMore() {
    if (loadingMore) return;
    const step = loadMoreStep ?? FETCH_LIMIT;
    const target = Math.min(visibleCount + step, maxCourses ?? Infinity);

    // Enough already fetched to satisfy this reveal — no network call needed.
    if (target <= courses.length) {
      captureExpandStart();
      setVisibleCount(target);
      return;
    }

    captureExpandStart();
    setLoadingMore(true);
    const items = await getCourses({ ...fetchOptions, limit: FETCH_LIMIT, offset: offsetRef.current });
    const cards = items.map(apiCourseToCard);
    setCourses((prev) => [...prev, ...cards]);
    offsetRef.current += items.length;
    setHasMoreRemote(items.length >= FETCH_LIMIT);
    setVisibleCount(Math.min(target, offsetRef.current));
    setLoadingMore(false);
  }

  const visibleCourses = useMemo(
    () => courses.slice(0, Math.min(visibleCount, maxCourses ?? Infinity)),
    [courses, visibleCount, maxCourses],
  );

  const hasMore =
    (visibleCount < courses.length || hasMoreRemote) &&
    (maxCourses === undefined || visibleCount < maxCourses);

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
      skipRevealed: true,
    },
    [categoryId, cols, loading],
  );

  useLayoutEffect(() => {
    const startHeight = expandStartHeightRef.current;
    const startRow = expandStartRowRef.current;
    if (startHeight == null || startRow == null || loading) return undefined;

    const container = gridContainerRef.current;
    if (!container) {
      expandStartHeightRef.current = null;
      expandStartRowRef.current = null;
      return undefined;
    }

    const newRows = rowRefs.current.slice(startRow).filter(Boolean) as HTMLDivElement[];
    if (newRows.length === 0) {
      expandStartHeightRef.current = null;
      expandStartRowRef.current = null;
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      newRows.forEach((row) => {
        row.classList.remove('gsap-reveal-pending');
        row.classList.add('gsap-reveal-done');
      });
      expandStartHeightRef.current = null;
      expandStartRowRef.current = null;
      return undefined;
    }

    newRows.forEach((row) => {
      row.classList.remove('gsap-reveal-pending', 'gsap-reveal-done');
    });

    const endHeight = container.scrollHeight;
    gsap.set(newRows, { autoAlpha: 0, y: 24 });

    const tween = gsap.timeline({
      onComplete: () => {
        gsap.set(container, { clearProps: 'height,overflow' });
        newRows.forEach((row) => {
          row.classList.remove('gsap-reveal-pending');
          row.classList.add('gsap-reveal-done');
          gsap.set(row, { clearProps: 'all' });
        });
        expandStartHeightRef.current = null;
        expandStartRowRef.current = null;
      },
    });

    tween.fromTo(
      container,
      { height: startHeight, overflow: 'hidden' },
      { height: endHeight, duration: 0.5, ease: 'power2.out' },
      0,
    );
    tween.to(
      newRows,
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
      0.05,
    );

    return () => {
      tween.kill();
      gsap.set(container, { clearProps: 'height,overflow' });
    };
  }, [visibleCount, courseRows.length, loading]);

  return (
    <section
      ref={sectionRef}
      id="courses"
      className={`full-bleed relative z-0 overflow-visible pb-16 md:pb-20 ${
        mutedBackground ? 'bg-[#F5F6F8]' : 'bg-white'
      } ${compactTop || mutedBackground ? 'pt-[14px] md:pt-[30px]' : 'pt-12 md:pt-24'} ${className ?? ''}`}
      aria-labelledby="category-courses-heading"
    >
      <div className="site-container">
        <header className={`mx-auto mt-0 max-w-4xl text-center ${compactTop || mutedBackground ? '' : 'md:mt-8 lg:mt-10'}`}>
          <h2
            id="category-courses-heading"
            className={`section-heading text-center text-heading ${headingClassName ?? ''}`}
          >
            {heading ?? `Explore all ${categoryName} courses`}
          </h2>
          <p className="mt-2 text-[16px] font-medium leading-[140%] text-muted md:mt-3 md:text-[18px]">
            Find the right course that leaps your career
          </p>
        </header>

        <div ref={gridContainerRef} className={`mt-[45px] ${compactTop || mutedBackground ? 'pb-10' : 'pb-4 md:pb-6'}`}>
          {loading ? (
            <div className="grid grid-cols-1 gap-x-3 gap-y-[30px] md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: FETCH_LIMIT }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-muted">No courses available yet.</p>
          ) : (
            courseRows.map((rowCourses, rowIndex) => (
              <div
                key={`category-row-${rowIndex}`}
                ref={(el) => { rowRefs.current[rowIndex] = el; }}
                className="gsap-reveal-pending grid grid-cols-1 gap-x-3 gap-y-[30px] md:grid-cols-2 lg:grid-cols-3 [&+&]:mt-[30px]"
              >
                {rowCourses.map((course) => (
                  <CourseCard key={course.id} course={course} currencySymbol={currencySymbol} />
                ))}
              </div>
            ))
          )}
        </div>

        {!loading && hasMore && (
          <div className={`flex justify-center ${compactTop || mutedBackground ? 'mb-[20px]' : ''}`}>
            <button
              type="button"
              onClick={handleViewMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand underline-offset-4 transition hover:underline disabled:opacity-60"
            >
              {loadingMore ? 'Loading...' : 'View More Courses'}
              {!loadingMore && <ViewMoreChevronIcon className="shrink-0 text-brand" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
