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
import { fetchCategoryByUri } from '@/services/categoryApi';
import { fetchSetting } from '@/services/layoutApi';
import { defaultHeroBadges, defaultHeroContent } from '@/components/hero/defaultHeroContent';
import { SITE_NAME } from '@/lib/site';

type PageProps = {
  params: Promise<{ categoryUri: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoryUri } = await params;
  const category = await fetchCategoryByUri(categoryUri);

  if (!category) return { title: 'Category Not Found' };

  const title = category.seo?.metaTitle ?? `${category.name} Courses`;
  const description = category.seo?.metaDescription ?? category.description;

  return {
    title,
    description,
    keywords: category.seo?.metaKeywords ?? category.name,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryUri } = await params;

  const [category, settingsData] = await Promise.all([
    fetchCategoryByUri(categoryUri),
    fetchSetting(),
  ]);

  if (!category) notFound();

  const settings = settingsData ?? {};

  return (
    <>
      <CategoryHeroSection
        category={category}
        settings={settings}
        heroBadges={defaultHeroBadges}
        heroFigureSrc={defaultHeroContent.figure.src}
        backgroundImage={defaultHeroContent.backgroundImage}
      />
      <CategoryCoursesSection categoryId={category.id} categoryName={category.name} />
      <CategoryExpertCtaSection />
      <WhyScaleXSection {...defaultWhyScaleXContent} />
      <CategoryExploreAllSection excludeId={category.id} />
      <CategoryRelatedBlogsSection categoryId={category.id} />
      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
