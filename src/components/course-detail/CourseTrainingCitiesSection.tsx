import Link from 'next/link';
import { getCourseLocations } from '@/app/actions/courseActions';
import { getCourseBodyBySlug } from '@/lib/courseBody';

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
  let locations: Awaited<ReturnType<typeof getCourseLocations>> = [];
  try {
    locations = await getCourseLocations(courseUri);
  } catch {
    locations = [];
  }

  const fallback =
    getCourseBodyBySlug(courseUri)?.trainingCities ??
    getCourseBodyBySlug('certified-scrum-master')?.trainingCities;

  const items = locations.length
    ? locations.map((loc) => ({
        key: loc.uri,
        label: loc.labelName,
        href: `/${categoryUri}/${loc.uri}`,
      }))
    : (fallback?.cities ?? []).map((city) => ({
        key: city.id,
        label: city.label,
        href: city.href || '#schedules',
      }));

  if (!items.length) return null;

  const heading =
    title ??
    fallback?.title ??
    (shortName ? `${shortName} Training in other Cities` : 'Training in other Cities');

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[#DCDCDC] bg-[linear-gradient(79deg,#FFF_76.22%,#FFD3D3_108.27%)] px-6 py-5 md:px-8 md:py-6">
      <h2 className="section-heading text-heading">{heading}</h2>
      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:grid-cols-6 xl:grid-cols-8">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="inline-flex items-center justify-center rounded-[10px] border border-[#EBEBEB] bg-[#FAFAFA] px-3 py-2 text-center text-[13px] font-medium text-muted transition hover:border-brand hover:text-brand md:px-4 md:py-2.5 md:text-[14px]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
