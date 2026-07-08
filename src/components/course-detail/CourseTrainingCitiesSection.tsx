import Link from 'next/link';
import { getCourseLocations } from '@/app/actions/courseActions';

export default async function CourseTrainingCitiesSection({
  courseUri,
  categoryUri,
  title = 'training in other cities',
  shortName = '',
}: {
  courseUri: string;
  categoryUri: string;
  title?: string;
  shortName?: string;
}) {
  const locations = await getCourseLocations(courseUri);
  if (!locations.length) return null;

  // Each location is its own cloned course with a unique uri — link straight to it.
  const items = locations.map((loc) => ({
    key: loc.uri,
    label: loc.labelName,
    href: `/${categoryUri}/${loc.uri}`,
  }));

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[#DCDCDC] bg-[linear-gradient(79deg,#FFF_76.22%,#FFD3D3_108.27%)] px-6 py-5 md:px-8 md:py-6">
      <h2 className="section-heading text-heading">{`${shortName} ${title} `}</h2>
      <div className="mt-5 flex flex-wrap gap-2.5 md:gap-3">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="inline-flex items-center rounded-[10px] border border-[#EBEBEB] bg-[#FAFAFA] px-4 py-2 text-[13px] font-medium text-heading transition hover:border-brand hover:text-brand md:px-5 md:py-2.5 md:text-[14px]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
