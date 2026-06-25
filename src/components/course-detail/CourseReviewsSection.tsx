import { getCourseReviews } from '@/app/actions/courseActions';
import type { LayoutSettings } from '@/services/layoutApi';
import CourseReviewsClient from './CourseReviewsClient';

export default async function CourseReviewsSection({
  courseUri,
  categoryUri,
  title,
  settings,
}: {
  courseUri: string;
  categoryUri: string;
  title: string;
  settings: LayoutSettings;
}) {
  const reviews = await getCourseReviews(courseUri, categoryUri);

  if (!reviews.length) return null;

  return <CourseReviewsClient title={title} reviews={reviews} settings={settings} />;
}
