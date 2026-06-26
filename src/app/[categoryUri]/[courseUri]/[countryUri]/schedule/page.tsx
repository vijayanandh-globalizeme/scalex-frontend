import { SchedulePageContent } from '@/app/[categoryUri]/[courseUri]/schedule/page';

type PageProps = {
  params: Promise<{ categoryUri: string; courseUri: string; countryUri: string }>;
  searchParams: Promise<{ filter?: string; dateFrom?: string; dateTo?: string }>;
};

export default async function CountrySchedulePage({ params, searchParams }: PageProps) {
  const { categoryUri, courseUri, countryUri } = await params;
  const { filter, dateFrom, dateTo } = await searchParams;
  return (
    <SchedulePageContent
      categoryUri={categoryUri}
      courseUri={courseUri}
      countryUri={countryUri}
      filter={filter}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  );
}
