import { getCoursePlans } from '@/app/actions/courseActions';
import CourseFeeSection from './CourseFeeSection';
import CoursePlanComparisonSection from './CoursePlanComparisonSection';

export default async function CoursePricingSection({
  courseUri,
  categoryUri,
  advisorPhone,
  countryUri,
  cityUri,
}: {
  courseUri: string;
  categoryUri: string;
  advisorPhone?: string | null;
  countryUri?: string;
  cityUri?: string;
}) {
  const data = await getCoursePlans(courseUri, categoryUri, { countryUri, cityUri });
  if (!data?.batch) return null;

  const { plans, features, batch } = data;
  return (
    <div className="space-y-8" id="course-plan">
      <CourseFeeSection batch={batch} advisorPhone={advisorPhone} />
      <CoursePlanComparisonSection plans={plans} features={features} batch={batch} />
    </div>
  );
}
