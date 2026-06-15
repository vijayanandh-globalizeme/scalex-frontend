import Link from 'next/link';
import type { CourseTrainingCitiesContent } from '@/lib/courseBody';

export default function CourseTrainingCitiesSection({
  trainingCities,
}: {
  trainingCities: CourseTrainingCitiesContent;
}) {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[#DCDCDC] bg-[linear-gradient(79deg,#FFF_76.22%,#FFD3D3_108.27%)] px-6 py-5 md:px-8 md:py-6">
      <div>
        <h2 className="text-[34px] font-bold leading-[140%] text-heading">{trainingCities.title}</h2>

        <div className="mt-5 flex flex-wrap gap-2.5 md:gap-3">
          {trainingCities.cities.map((city) => (
            <Link
              key={city.id}
              href={city.href}
              className="inline-flex items-center rounded-[10px] border border-[#EBEBEB] bg-[#FAFAFA] px-4 py-2 text-[13px] font-medium text-heading transition hover:border-brand hover:text-brand md:px-5 md:py-2.5 md:text-[14px]"
            >
              {city.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
