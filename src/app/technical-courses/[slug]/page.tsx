import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CourseDetailBodySection,
  CourseDetailPageShell,
  CourseEnterpriseSection,
  TechnicalCourseHeroSection,
} from '@/components/course-detail';
import { getAllTechnicalCourseSlugs, getTechnicalCourseBySlug } from '@/lib/technicalCourses';
import { SITE_NAME } from '@/lib/site';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllTechnicalCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getTechnicalCourseBySlug(slug);

  if (!course) {
    return { title: 'Technical Course Not Found' };
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

export default async function TechnicalCoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getTechnicalCourseBySlug(slug);

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
