import type { Metadata } from 'next';
import { HeroSection, defaultHeroContent } from '@/components/hero';
import { CoursesSection, defaultCoursesContent } from '@/components/courses';
import TestimonialsSectionServer from '@/components/testimonials/TestimonialsSectionServer';
import SuccessStoriesSectionServer from '@/components/success-stories/SuccessStoriesSectionServer';
import { AwardsSection, defaultAwardsContent } from '@/components/awards';
import { WorkforceSection, defaultWorkforceContent } from '@/components/workforce';
import MentorsSectionServer from '@/components/mentors/MentorsSectionServer';
import { WhyScaleXSection, defaultWhyScaleXContent } from '@/components/why-scalex';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import { fetchSetting, type LayoutSettings } from '@/services/layoutApi';
import { fetchCompanyLogos } from '@/services/companyRelationApi';
import { fetchAllCategories } from '@/services/categoryApi';
import type { MegaMenuCategory } from '@/lib/allCoursesMegaMenu';
import LiveSessionsSection from '@/components/live-sessions/LiveSessionsSection';

const TOP_CATEGORIES_COUNT = 6;

export const metadata: Metadata = {
  title: 'Professional Training & Certification Courses',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Professional Training & Certification`,
    description: SITE_DESCRIPTION,
  },
};

export default async function HomePage() {
  const [allCategories, settingsData, companyLogos] = await Promise.all([
    fetchAllCategories(),
    fetchSetting(),
    fetchCompanyLogos(),
  ]);
  const settings: LayoutSettings | undefined = settingsData ?? undefined;
  const categories: MegaMenuCategory[] = allCategories.slice(0, TOP_CATEGORIES_COUNT).map((cat) => ({
    id: cat.id,
    slug: cat.uri,
    label: cat.name,
    href: `/${cat.uri}`,
    courses: [],
  }));

  const heroContent = {
    ...defaultHeroContent,
    collaboration: {
      ...defaultHeroContent.collaboration,
      logos: companyLogos.COLLABORATE.length ? companyLogos.COLLABORATE : defaultHeroContent.collaboration.logos,
    },
  };
  const workforceContent = {
    ...defaultWorkforceContent,
    partners: companyLogos.ENTERPRISE.length
      ? companyLogos.ENTERPRISE.map((logo) => ({
          id: logo.id ?? logo.src ?? '',
          name: logo.alt,
          logoSrc: logo.src ?? '',
          logoAlt: logo.alt,
        }))
      : defaultWorkforceContent.partners,
  };

  return (
    <>
      <HeroSection {...heroContent} />
      <CoursesSection {...defaultCoursesContent} layoutCategories={categories} />
      <TestimonialsSectionServer settings={settings} />
      <SuccessStoriesSectionServer settings={settings} />
      <AwardsSection {...defaultAwardsContent} className="pb-15 md:pb-0" />
      <LiveSessionsSection />
      <WorkforceSection {...workforceContent} />
      <MentorsSectionServer />
      <WhyScaleXSection {...defaultWhyScaleXContent} />
      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
