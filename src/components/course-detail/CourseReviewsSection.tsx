import { getCourseReviews } from '@/app/actions/courseActions';
import type { LayoutSettings } from '@/services/layoutApi';
import { getStaticCourseReviews } from '@/lib/courseReviewsFallback';
import CourseReviewsClient from './CourseReviewsClient';

export default async function CourseReviewsSection({
  courseUri,
  categoryUri,
  title,
  settings,
  videoUrl,
}: {
  courseUri: string;
  categoryUri: string;
  title: string;
  settings: LayoutSettings;
  videoUrl?: string | null;
}) {
  let apiReviews: Awaited<ReturnType<typeof getCourseReviews>> = [];
  try {
    apiReviews = await getCourseReviews(courseUri, categoryUri);
  } catch {
    apiReviews = [];
  }

  const fallback = getStaticCourseReviews(courseUri);
  const reviews = apiReviews.length ? apiReviews : fallback.reviews;

  return (
    <CourseReviewsClient
      title={title || fallback.title}
      reviews={reviews}
      settings={settings}
      videoUrl={videoUrl ?? fallback.videoUrl}
    />
  );
}
