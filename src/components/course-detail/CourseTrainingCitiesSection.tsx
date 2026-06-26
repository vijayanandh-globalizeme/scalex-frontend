import Link from 'next/link';
import { getCourseLocations } from '@/app/actions/courseActions';

export default async function CourseTrainingCitiesSection({
  courseUri,
  categoryUri,
  title = 'Training Cities',
}: {
  courseUri: string;
  categoryUri: string;
  title?: string;
}) {
  const locations = await getCourseLocations(courseUri);
  if (!locations.length) return null;

  // Always show each country once, then each city (deduplicated).
  const seen = new Set<string>();
  const items: { key: string; label: string; href: string }[] = [];

  for (const loc of locations) {
    // Country pill (always, once per country)
    const countryKey = `country-${loc.countryId}`;
    if (!seen.has(countryKey)) {
      seen.add(countryKey);
      items.push({
        key: countryKey,
        label: loc.countryName,
        href: `/${categoryUri}/${courseUri}/${loc.countryUri}`,
      });
    }

    // City pill (when present, once per city)
    if (loc.cityId && loc.cityUri && loc.cityName) {
      const cityKey = `city-${loc.cityId}`;
      if (!seen.has(cityKey)) {
        seen.add(cityKey);
        items.push({
          key: cityKey,
          label: loc.cityName,
          href: `/${categoryUri}/${courseUri}/${loc.countryUri}/${loc.cityUri}`,
        });
      }
    }
  }

  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[#DCDCDC] bg-[linear-gradient(79deg,#FFF_76.22%,#FFD3D3_108.27%)] px-6 py-5 md:px-8 md:py-6">
      <h2 className="text-[34px] font-bold leading-[140%] text-heading">{title}</h2>
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
