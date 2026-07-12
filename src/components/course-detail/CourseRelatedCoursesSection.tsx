import { getRelatedCourses } from '@/app/actions/courseActions';
import type { ApiCourse } from '@/services/courseApi';
import type { Course } from '@/components/courses/CoursesSection';
import { getCourseBodyBySlug } from '@/lib/courseBody';
import CourseRelatedCoursesCarousel from './CourseRelatedCoursesCarousel';

function formatLearners(raw: string | null | undefined): string {
  if (!raw) return '';
  const n = parseInt(raw, 10);
  if (isNaN(n)) return raw;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k+`;
  return String(n);
}

function toCourse(c: ApiCourse): Course {
  const price         = parseInt(c.batch?.plan1SellingPrice ?? '0', 10) || 0;
  const originalPrice = parseInt(c.batch?.plan1RetailPrice  ?? '0', 10) || 0;
  const savePercent   = originalPrice > price && originalPrice > 0
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : undefined;
  return {
    id:            c.id,
    category:      c.category.uri,
    categoryLabel: c.category.name,
    title:         c.name,
    imageSrc:      c.featureImage?.url ?? '/images/course/course-1.png',
    imageAlt:      c.name,
    rating:        parseFloat(c.schemaRating ?? '0') || 0,
    duration:      c.duration ?? '',
    slotsLeft:     c.batch?.noOfSessions ?? undefined,
    learners:      formatLearners(c.totalEnroll),
    price,
    originalPrice: originalPrice > price ? originalPrice : undefined,
    savePercent,
    href:          `/${c.category.uri}/${c.uri}`,
  };
}

function getStaticRelatedCourses(courseUri: string): { title: string; courses: Course[] } {
  const content =
    getCourseBodyBySlug(courseUri)?.relatedCourses ??
    getCourseBodyBySlug('certified-scrum-master')?.relatedCourses;

  return {
    title: content?.title ?? 'Also view other courses',
    courses: content?.courses ?? [],
  };
}

export default async function CourseRelatedCoursesSection({
  courseUri,
  title,
}: {
  courseUri: string;
  title?: string;
}) {
  let rawCourses: ApiCourse[] = [];
  try {
    rawCourses = await getRelatedCourses(courseUri);
  } catch {
    rawCourses = [];
  }

  const fallback = getStaticRelatedCourses(courseUri);
  const courses = rawCourses.length ? rawCourses.map(toCourse) : fallback.courses;

  if (!courses.length) return null;

  return (
    <CourseRelatedCoursesCarousel
      courses={courses}
      title={title ?? 'Also view other courses'}
    />
  );
}
