import { getCoursePlans } from '@/app/actions/courseActions';
import CourseFeeSection from './CourseFeeSection';
import CoursePlanComparisonSection from './CoursePlanComparisonSection';

export default async function CoursePricingSection({
  courseUri,
  categoryUri,
  advisorPhone,
}: {
  courseUri: string;
  categoryUri: string;
  advisorPhone?: string | null;
}) {
  const data = await getCoursePlans(courseUri, categoryUri);
  if (!data?.batch) return null;

  const { plans, features, batch } = data;
  return (
    <div className="space-y-8">
      <CourseFeeSection batch={batch} advisorPhone={advisorPhone} />
      <CoursePlanComparisonSection plans={plans} features={features} batch={batch} />
    </div>
  );
}
