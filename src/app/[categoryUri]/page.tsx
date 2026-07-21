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
  const isAgileScrum = categoryUri === 'agile-and-scrum';
  const agileHeroBadges = [
    {
      id: 'learners-1',
      variant: 'learners' as const,
      placement: 'top-left' as const,
      title: 'Active Learners',
      subtitle: '100K+',
    },
    {
      id: 'learners-2',
      variant: 'learners' as const,
      placement: 'top-right' as const,
      title: 'Active Learners',
      subtitle: '100K+',
    },
    {
      id: 'mentors',
      variant: 'mentors' as const,
      placement: 'bottom-right' as const,
      title: 'Expert Mentors',
      subtitle: '1,000+',
    },
  ];

  return (
    <>
      <CategoryHeroSection
        category={category}
        settings={settings}
        heroBadges={isAgileScrum ? agileHeroBadges : defaultHeroBadges}
        heroFigureSrc={
          category.posterImage?.url ??
          (isAgileScrum ? '/images/category/agile-scrum-hero.png' : defaultHeroContent.figure.src)
        }
        mediaVariant={isAgileScrum ? 'photo' : 'figure'}
        backgroundImage={isAgileScrum ? undefined : defaultHeroContent.backgroundImage}
      />
      <CategoryCoursesSection
        categoryId={category.id}
        categoryName={category.name}
        className={isAgileScrum ? 'md:mt-[50px]' : undefined}
        headingClassName={isAgileScrum ? 'max-md:mt-[130px]' : undefined}
      />
      <CategoryExpertCtaSection />
      <CategoryExploreAllSection excludeId={category.id} />
      <CategoryRelatedBlogsSection categoryId={category.id} />
      <WhyScaleXSection {...defaultWhyScaleXContent} />
      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
