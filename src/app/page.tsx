import type { Metadata } from 'next';
import { HeroSection, defaultHeroContent } from '@/components/hero';
import { CoursesSection, defaultCoursesContent } from '@/components/courses';
import { TestimonialsSection, defaultTestimonialsContent } from '@/components/testimonials';
import {
  SuccessStoriesSection,
  defaultSuccessStoriesContent,
} from '@/components/success-stories';
import { AwardsSection, defaultAwardsContent } from '@/components/awards';
import {
  LiveSessionsSection,
  defaultLiveSessionsContent,
} from '@/components/live-sessions';
import { WorkforceSection, defaultWorkforceContent } from '@/components/workforce';
import { MentorsSection, defaultMentorsContent } from '@/components/mentors';
import { WhyScaleXSection, defaultWhyScaleXContent } from '@/components/why-scalex';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import { fetchLayout } from '@/services/layoutApi';
import { fetchLearners, fetchReviewers, fetchTrainers } from '@/services/peopleApi';

export const metadata: Metadata = {
  title: 'Professional Training & Certification Courses',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Professional Training & Certification`,
    description: SITE_DESCRIPTION,
  },
};

export default async function HomePage() {
  const [layoutData, learners, reviewers, trainers] = await Promise.all([
    fetchLayout(),
    fetchLearners(10),
    fetchReviewers(10),
    fetchTrainers(10),
  ]);
  const settings = layoutData?.settings;
  return (
    <>
      <HeroSection {...defaultHeroContent} />
      <CoursesSection {...defaultCoursesContent} />
      <TestimonialsSection
        {...defaultTestimonialsContent}
        testimonials={learners}
        reviews={[]}
        settings={settings}
      />
      <SuccessStoriesSection {...defaultSuccessStoriesContent} stories={reviewers} />
      <AwardsSection {...defaultAwardsContent} />
      {/* <LiveSessionsSection {...defaultLiveSessionsContent} /> */}
      <WorkforceSection {...defaultWorkforceContent} />
      <MentorsSection {...defaultMentorsContent} mentors={trainers} />
      <WhyScaleXSection {...defaultWhyScaleXContent} />
      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
