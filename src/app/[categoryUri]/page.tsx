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
import { fetchCompanyLogos } from '@/services/companyRelationApi';
import { SITE_NAME, getSiteOrigin } from '@/lib/site';

type PageProps = {
  params: Promise<{ categoryUri: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoryUri } = await params;
  const category = await fetchCategoryByUri(categoryUri);

  if (!category) return { title: 'Category Not Found' };

  const title       = category.seo?.metaTitle       ?? `${category.name} Courses`;
  const description = category.seo?.metaDescription ?? category.description;
  const canonical   = `${getSiteOrigin()}/${categoryUri}`;
  const shareImage  = category.posterImage ? { url: category.posterImage.url, alt: category.name } : undefined;

  return {
    title,
    description,
    keywords: category.seo?.metaKeywords ?? category.name,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      images: shareImage ? [shareImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: shareImage ? [shareImage] : undefined,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryUri } = await params;

  const [category, settingsData, companyLogos] = await Promise.all([
    fetchCategoryByUri(categoryUri),
    fetchSetting(),
    fetchCompanyLogos(),
  ]);

  if (!category) notFound();

  const settings = settingsData ?? {};
  const categoryHeroBadges = [
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
        heroBadges={categoryHeroBadges}
        heroFigureSrc={category.posterImage?.url ?? '/images/category/agile-scrum-hero.png'}
        mediaVariant="photo"
        collaborationLogos={companyLogos.COLLABORATE}
      />
      <CategoryCoursesSection
        categoryId={category.id}
        categoryName={category.name}
        className="md:mt-[50px]"
      />
      <CategoryExpertCtaSection />
      <CategoryExploreAllSection excludeId={category.id} />
      <CategoryRelatedBlogsSection categoryId={category.id} />
      <WhyScaleXSection {...defaultWhyScaleXContent} className="max-md:!pt-15 pb-15 md:pb-12 lg:pb-16" />
      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
