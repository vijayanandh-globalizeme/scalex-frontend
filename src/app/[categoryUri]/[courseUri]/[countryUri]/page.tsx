import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CourseDetailBodySection,
  CourseDetailHeroSection,
  CourseDetailPageShell,
  CourseEnterpriseSection,
  TechnicalCourseHeroSection,
} from '@/components/course-detail';
import { getCourseOverview, getCourseLocations } from '@/app/actions/courseActions';
import { buildCourseDetailProps, buildTechnicalCourseProps } from '@/lib/coursePropsFromApi';
import { fetchLayout } from '@/services/layoutApi';
import { SITE_NAME } from '@/lib/site';

type PageProps = {
  params: Promise<{ categoryUri: string; courseUri: string; countryUri: string }>;
};

const DEFAULT_FORM = {
  title: "We're Here to Guide Your Success",
  purposes: [
    { id: 'career-growth', label: 'Career Growth' },
    { id: 'certification', label: 'Get Certified' },
    { id: 'upskill-team', label: 'Upskill My Team' },
    { id: 'other',        label: 'Other' },
  ],
  termsHref:   '/terms',
  privacyHref: '/privacy',
  ctaLabel:    'Scale Your Career',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoryUri, courseUri, countryUri } = await params;
  const locations = await getCourseLocations(courseUri);
  const loc = locations.find((l) => l.countryUri === countryUri && !l.cityId);
  const countryName = loc?.countryName ?? countryUri;

  const course = await getCourseOverview(courseUri, categoryUri, { countryUri });
  if (!course) return { title: 'Course Not Found' };

  const title = `${course.seo?.metaTitle ?? course.title} in ${countryName}`;
  const description = course.seo?.metaDescription ?? '';

  return {
    title,
    description,
    openGraph: { title: `${title} | ${SITE_NAME}`, description },
  };
}

export default async function CountryCourseDetailPage({ params }: PageProps) {
  const { categoryUri, courseUri, countryUri } = await params;

  const locations = await getCourseLocations(courseUri);
  const loc = locations.find((l) => l.countryUri === countryUri);
  if (!loc) notFound();

  const [course, layoutData] = await Promise.all([
    getCourseOverview(courseUri, categoryUri, { countryUri }),
    fetchLayout(),
  ]);

  if (!course) notFound();

  const settings = layoutData?.settings ?? {};
  const isTechnical = course.startedAt !== null;

  const extraBreadcrumbs = [{ label: loc.countryName, href: `/${categoryUri}/${courseUri}/${countryUri}` }];

  const scheduleBasePath = `/${categoryUri}/${courseUri}/${countryUri}`;

  if (isTechnical) {
    const props = buildTechnicalCourseProps(course, categoryUri, courseUri, settings, scheduleBasePath);
    props.breadcrumbs = [...props.breadcrumbs, ...extraBreadcrumbs];
    return (
      <CourseDetailPageShell form={DEFAULT_FORM}>
        <TechnicalCourseHeroSection {...props} />
        <CourseEnterpriseSection compact />
        <CourseDetailBodySection courseUri={courseUri} categoryUri={categoryUri} isTechnical phone={settings.CONTACT_WHATSAPP_NO} courseDetails={course} settings={settings} countryUri={countryUri} />
      </CourseDetailPageShell>
    );
  }

  const props = buildCourseDetailProps(course, categoryUri, courseUri, settings, scheduleBasePath);
  props.breadcrumbs = [...props.breadcrumbs, ...extraBreadcrumbs];
  return (
    <CourseDetailPageShell form={DEFAULT_FORM}>
      <CourseDetailHeroSection {...props} />
      <CourseEnterpriseSection />
      <CourseDetailBodySection courseUri={courseUri} categoryUri={categoryUri} phone={settings.CONTACT_WHATSAPP_NO} courseDetails={course} settings={settings} countryUri={countryUri} />
    </CourseDetailPageShell>
  );
}
