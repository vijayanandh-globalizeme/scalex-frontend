import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CategoryCoursesSection,
  CategoryExpertCtaSection,
  CategoryExploreAllSection,
  CategoryHeroSection,
  CategoryRelatedBlogsSection,
} from '@/components/category';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import { WhyScaleXSection, defaultWhyScaleXContent } from '@/components/why-scalex';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/categories';
import {
  CATEGORY_COURSES_SUBHEADING,
  getCategoryCoursesHeading,
  getCoursesForCategorySlug,
} from '@/lib/categoryCourses';
import { SITE_NAME } from '@/lib/site';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.breadcrumbLabel} Courses`,
    description: category.subheading,
    openGraph: {
      title: `${category.breadcrumbLabel} | ${SITE_NAME}`,
      description: category.subheading,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const courses = getCoursesForCategorySlug(slug, category.breadcrumbLabel);

  return (
    <>
      <CategoryHeroSection {...category} />
      <CategoryCoursesSection
        heading={getCategoryCoursesHeading(category.breadcrumbLabel)}
        subheading={CATEGORY_COURSES_SUBHEADING}
        courses={courses}
      />
      <CategoryExpertCtaSection />
      <CategoryExploreAllSection />
      <CategoryRelatedBlogsSection />
      <WhyScaleXSection {...defaultWhyScaleXContent} />
      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
