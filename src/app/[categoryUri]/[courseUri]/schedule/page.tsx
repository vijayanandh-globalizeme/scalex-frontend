import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCourseOverview, getCourseBatches, getCourseLocations } from '@/app/actions/courseActions';
import CourseSchedulesSection from '@/components/course-detail/CourseSchedulesSection';
import CourseDetailSidebar from '@/components/course-detail/CourseDetailSidebar';
import { CourseDetailPageShell } from '@/components/course-detail';
import { sidebar } from '@/lib/courseSideBar';

type PageProps = {
  params: Promise<{ categoryUri: string; courseUri: string }>;
  searchParams: Promise<{ filter?: string; dateFrom?: string; dateTo?: string }>;
};

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1 6.5L8 1l7 5.5V15a1 1 0 01-1 1H2a1 1 0 01-1-1V6.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 16V9.5h5V16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DEFAULT_FORM = {
  title: "We're Here to Guide Your Success",
  purposes: [
    { id: 'career-growth', label: 'Career Growth' },
    { id: 'certification', label: 'Get Certified' },
    { id: 'upskill-team', label: 'Upskill My Team' },
    { id: 'other', label: 'Other' },
  ],
  termsHref: '/terms',
  privacyHref: '/privacy',
  ctaLabel: 'Scale Your Career',
};

type SchedulePageCore = {
  categoryUri: string;
  courseUri: string;
  countryUri?: string;
  cityUri?: string;
  filter?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function SchedulePageContent({
  categoryUri,
  courseUri,
  countryUri,
  cityUri,
  filter,
  dateFrom,
  dateTo,
}: SchedulePageCore) {
  const locationOpts = countryUri ? { countryUri, cityUri } : undefined;
  const batchFilter = { filter, dateFrom, dateTo };

  const [course, batches, locations] = await Promise.all([
    getCourseOverview(courseUri, categoryUri, locationOpts),
    getCourseBatches(courseUri, categoryUri, batchFilter),
    countryUri ? getCourseLocations(courseUri) : Promise.resolve([]),
  ]);

  if (!course) notFound();

  const courseBase = `/${categoryUri}/${courseUri}`;
  const locationPath = countryUri
    ? cityUri
      ? `/${countryUri}/${cityUri}`
      : `/${countryUri}`
    : '';
  const coursePath = `${courseBase}${locationPath}`;

  const breadcrumbs: { label: string; href: string }[] = [
    { label: course.categoryName, href: `/${categoryUri}` },
    { label: course.name, href: coursePath },
  ];
  if (countryUri) {
    const countryLoc = locations.find((l) => l.countryUri === countryUri);
    const countryLabel = countryLoc?.countryName ?? countryUri;
    if (cityUri) {
      const cityLoc = locations.find((l) => l.cityUri === cityUri);
      const cityLabel = cityLoc?.cityName ?? cityUri;
      breadcrumbs.push({ label: countryLabel, href: `${courseBase}/${countryUri}` });
      breadcrumbs.push({ label: cityLabel, href: `${courseBase}/${countryUri}/${cityUri}` });
    } else {
      breadcrumbs.push({ label: countryLabel, href: `${courseBase}/${countryUri}` });
    }
  }
  breadcrumbs.push({ label: 'Schedules', href: `${coursePath}/schedule` });

  return (
    <CourseDetailPageShell form={DEFAULT_FORM}>
      <section className="full-bleed bg-[#F5F6F8] pt-8 pb-16">
        <div className="site-container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[14px] font-medium">
            <Link href="/" className="text-muted transition hover:text-heading" aria-label="Home">
              <HomeIcon />
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="inline-flex items-center gap-2">
                <span className="text-muted" aria-hidden>&gt;</span>
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-brand">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-muted transition hover:text-heading">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          {/* Back + Title */}
          <div className="mb-6 flex items-center gap-3">
            <Link
              href={coursePath}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#EBEBEB] bg-white text-heading transition hover:border-brand hover:text-brand"
              aria-label="Back to course"
            >
              <BackIcon />
            </Link>
            <h1 className="text-[28px] font-bold leading-[140%] text-heading md:text-[34px]">
              Schedules for{' '}
              <span className="text-brand">{course.name}</span>
            </h1>
          </div>

          {/* Two-column layout */}
          <div className="flex items-start gap-8 lg:gap-10">
            <div className="min-w-0 flex-1">
              <CourseSchedulesSection
                initialBatches={batches}
                courseName={course.name}
              />
            </div>
            <CourseDetailSidebar sidebar={sidebar} stickyTop="5rem" width="w-[270px]" />
          </div>
        </div>
      </section>
    </CourseDetailPageShell>
  );
}

export default async function SchedulePage({ params, searchParams }: PageProps) {
  const { categoryUri, courseUri } = await params;
  const { filter, dateFrom, dateTo } = await searchParams;
  return (
    <SchedulePageContent
      categoryUri={categoryUri}
      courseUri={courseUri}
      filter={filter}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  );
}
