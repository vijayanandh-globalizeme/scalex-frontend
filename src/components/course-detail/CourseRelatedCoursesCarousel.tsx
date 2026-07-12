'use client';

import { useEffect, useMemo, useState } from 'react';
import { CourseCard, type Course } from '@/components/courses/CoursesSection';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';

export default function CourseRelatedCoursesCarousel({
  courses,
  title,
}: {
  courses: Course[];
  title?: string | null;
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setPageSize(width >= 1280 ? 3 : width >= 768 ? 2 : 1);
      setPage(0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = useMemo(() => chunkPages(courses, pageSize), [courses, pageSize]);
  const totalPages = pages.length;

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  return (
    <div className="mt-[80px] overflow-visible">
      <div className="flex items-center justify-between gap-4">
        {title ? <h2 className="section-heading text-heading">{title}</h2> : <span />}
        {totalPages > 1 ? (
          <CategoryCarouselControls
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            prevLabel="Previous courses"
            nextLabel="Next courses"
          />
        ) : null}
      </div>

      <CategoryCarouselTrack page={page} className="mt-6 pb-6">
        {pages.map((pageCourses, pageIndex) => (
          <div
            key={pageIndex}
            className="grid grid-cols-1 gap-5 overflow-visible md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
          >
            {pageCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                currencySymbol="₹"
                variant="courseDetail"
              />
            ))}
          </div>
        ))}
      </CategoryCarouselTrack>
    </div>
  );
}
