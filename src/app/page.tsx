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
import { fetchLayout, type LayoutSettings } from '@/services/layoutApi';

export const metadata: Metadata = {
  title: 'Professional Training & Certification Courses',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Professional Training & Certification`,
    description: SITE_DESCRIPTION,
  },
};

export default async function HomePage() {
  const layoutData = await fetchLayout();
  const settings: LayoutSettings | undefined = layoutData?.settings;
  const categories = layoutData?.categories ?? [];

  return (
    <>
      <HeroSection {...defaultHeroContent} />
      <CoursesSection {...defaultCoursesContent} layoutCategories={categories} />
      <TestimonialsSectionServer settings={settings} />
      <SuccessStoriesSectionServer />
      <AwardsSection {...defaultAwardsContent} />
      <WorkforceSection {...defaultWorkforceContent} />
      <MentorsSectionServer />
      <WhyScaleXSection {...defaultWhyScaleXContent} />
      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
