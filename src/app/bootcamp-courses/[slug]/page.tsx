import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CourseDetailBodySection,
  CourseDetailPageShell,
  CourseEnterpriseSection,
  TechnicalCourseHeroSection,
} from '@/components/course-detail';
import { getAllBootcampCourseSlugs, getBootcampCourseBySlug } from '@/lib/bootcampCourses';
import { SITE_NAME } from '@/lib/site';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBootcampCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getBootcampCourseBySlug(slug);

  if (!course) {
    return { title: 'Bootcamp Course Not Found' };
  }

  const title = course.heroTitle;
  const rankingDescription = `${course.rankingLine.highlight} ${course.rankingLine.rest}`;

  return {
    title,
    description: rankingDescription,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: rankingDescription,
    },
  };
}

export default async function BootcampCoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getBootcampCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <CourseDetailPageShell form={course.form}>
      <TechnicalCourseHeroSection {...course} />
      <CourseEnterpriseSection compact />
      <CourseDetailBodySection courseUri={course.slug} categoryUri={course.categorySlug} isTechnical />
    </CourseDetailPageShell>
  );
}
