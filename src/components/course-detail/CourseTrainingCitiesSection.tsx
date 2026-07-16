import Link from 'next/link';
import { getCourseLocations } from '@/app/actions/courseActions';

export default async function CourseTrainingCitiesSection({
  courseUri,
  categoryUri,
  title,
  shortName = '',
}: {
  courseUri: string;
  categoryUri: string;
  title?: string;
  shortName?: string;
}) {
  const locations = await getCourseLocations(courseUri);
  if (!locations.length) return null;

  const items = locations.map((loc) => ({
    key: loc.uri,
    label: loc.labelName,
    href: `/${categoryUri}/${loc.uri}`,
  }));

  const heading =
    title ??
    (shortName ? `${shortName} Training in other Cities` : 'Training in other Cities');

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[#DCDCDC] bg-[linear-gradient(79deg,#FFF_76.22%,#FFD3D3_108.27%)] px-6 py-5 md:px-8 md:py-6">
      <h2 className="section-heading text-heading">{heading}</h2>
      <div className="mt-5 flex flex-wrap gap-2.5 md:gap-3">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border border-[#EBEBEB] bg-[#FAFAFA] px-3 py-2 text-center text-[13px] font-medium text-heading transition hover:border-brand hover:text-brand md:px-4 md:py-2.5 md:text-[14px]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
