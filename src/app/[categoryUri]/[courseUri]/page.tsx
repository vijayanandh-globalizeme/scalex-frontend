import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CourseDetailHeroSection,
  CourseDetailPageShell,
  CourseEnterpriseSection,
  TechnicalCourseHeroSection,
} from '@/components/course-detail';
import { getCourseOverview } from '@/app/actions/courseActions';
import { buildCourseDetailProps, buildTechnicalCourseProps } from '@/lib/coursePropsFromApi';
import { SITE_NAME } from '@/lib/site';

type PageProps = {
  params: Promise<{ categoryUri: string; courseUri: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoryUri, courseUri } = await params;
  const course = await getCourseOverview(courseUri, categoryUri);

  if (!course) return { title: 'Course Not Found' };

  const title = course.seo?.metaTitle ?? course.title;
  const description = course.seo?.metaDescription ?? course.details?.aboutContent ?? '';

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    ...(course.seo?.metaKeywords
      ? { keywords: course.seo.metaKeywords }
      : {}),
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { categoryUri, courseUri } = await params;
  const course = await getCourseOverview(courseUri, categoryUri);

  if (!course) notFound();

  const isBootcamp = course.startedAt !== null;

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

  if (isBootcamp) {
    const props = buildTechnicalCourseProps(course, categoryUri, courseUri);
    return (
      <CourseDetailPageShell form={DEFAULT_FORM}>
        <TechnicalCourseHeroSection {...props} />
        <CourseEnterpriseSection />
      </CourseDetailPageShell>
    );
  }

  const props = buildCourseDetailProps(course, categoryUri, courseUri);
  return (
    <CourseDetailPageShell form={DEFAULT_FORM}>
      <CourseDetailHeroSection {...props} />
      <CourseEnterpriseSection />
    </CourseDetailPageShell>
  );
}
