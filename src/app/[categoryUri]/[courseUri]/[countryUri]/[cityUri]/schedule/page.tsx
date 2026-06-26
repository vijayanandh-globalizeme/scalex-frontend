import { SchedulePageContent } from '@/app/[categoryUri]/[courseUri]/schedule/page';

type PageProps = {
  params: Promise<{ categoryUri: string; courseUri: string; countryUri: string; cityUri: string }>;
  searchParams: Promise<{ filter?: string }>;
};

export default async function CitySchedulePage({ params, searchParams }: PageProps) {
  const { categoryUri, courseUri, countryUri, cityUri } = await params;
  const { filter } = await searchParams;
  return (
    <SchedulePageContent
      categoryUri={categoryUri}
      courseUri={courseUri}
      countryUri={countryUri}
      cityUri={cityUri}
      filter={filter}
    />
  );
}
