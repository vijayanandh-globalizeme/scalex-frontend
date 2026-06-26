import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CourseDetailBodySection,
  CourseDetailHeroSection,
  CourseDetailPageShell,
  CourseEnterpriseSection,
} from '@/components/course-detail';
import { getAllCourseSlugs, getCourseBySlug } from '@/lib/courses';
import { SITE_NAME } from '@/lib/site';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: 'Course Not Found' };
  }

  const title = `${course.titlePrefix} — ${course.titleAccent}`;
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

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <CourseDetailPageShell form={course.form}>
      <CourseDetailHeroSection {...course} />
      <CourseEnterpriseSection />
      <CourseDetailBodySection courseUri={course.slug} categoryUri={course.categorySlug} />
    </CourseDetailPageShell>
  );
}
