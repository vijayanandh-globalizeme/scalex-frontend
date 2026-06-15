'use client';

import { useEffect, useMemo, useState } from 'react';
import { CourseCard } from '@/components/courses/CoursesSection';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';
import type { CourseRelatedCoursesContent } from '@/lib/courseBody';

export default function CourseRelatedCoursesSection({
  relatedCourses,
}: {
  relatedCourses: CourseRelatedCoursesContent;
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const nextSize = width >= 1280 ? 3 : width >= 768 ? 2 : 1;
      setPageSize(nextSize);
      setPage(0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = useMemo(
    () => chunkPages(relatedCourses.courses, pageSize),
    [relatedCourses.courses, pageSize],
  );
  const totalPages = pages.length;

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  return (
    <div className="mt-[80px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[34px] font-bold leading-[140%] text-heading">{relatedCourses.title}</h2>
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

      <CategoryCarouselTrack page={page} className="mt-6">
        {pages.map((pageCourses, pageIndex) => (
          <div
            key={pageIndex}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
          >
            {pageCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                currencySymbol={relatedCourses.currencySymbol}
                variant="courseDetail"
              />
            ))}
          </div>
        ))}
      </CategoryCarouselTrack>
    </div>
  );
}
