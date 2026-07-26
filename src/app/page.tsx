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
  const [allCategories, settingsData] = await Promise.all([fetchAllCategories(), fetchSetting()]);
  const settings: LayoutSettings | undefined = settingsData ?? undefined;
  const categories: MegaMenuCategory[] = allCategories.slice(0, TOP_CATEGORIES_COUNT).map((cat) => ({
    id: cat.id,
    slug: cat.uri,
    label: cat.name,
    href: `/${cat.uri}`,
    courses: [],
  }));

  return (
    <>
      <HeroSection {...defaultHeroContent} />
      <CoursesSection {...defaultCoursesContent} layoutCategories={categories} />
      <TestimonialsSectionServer settings={settings} />
      <SuccessStoriesSectionServer settings={settings} />
      <AwardsSection {...defaultAwardsContent} />
      <LiveSessionsSection />
      <WorkforceSection {...defaultWorkforceContent} />
      <MentorsSectionServer />
      <WhyScaleXSection {...defaultWhyScaleXContent} />
      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
