import { getCourseTrainers } from '@/app/actions/courseActions';
import CourseTrainersCarousel from './CourseTrainersCarousel';

export default async function CourseTrainersSection({
  courseUri,
  categoryUri,
  title,
}: {
  courseUri: string;
  categoryUri: string;
  title: string;
}) {
  const trainers = await getCourseTrainers(courseUri, categoryUri);

  if (!trainers.length) return null;

  return <CourseTrainersCarousel title={title} trainers={trainers} />;
}
