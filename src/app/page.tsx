import type { Metadata } from 'next';
import { HeroSection, defaultHeroContent } from '@/components/hero';
import { CoursesSection, defaultCoursesContent } from '@/components/courses';
import { TestimonialsSection, defaultTestimonialsContent } from '@/components/testimonials';
import {
  SuccessStoriesSection,
  defaultSuccessStoriesContent,
} from '@/components/success-stories';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Professional Training & Certification Courses',
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Professional Training & Certification`,
    description: SITE_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection {...defaultHeroContent} />
      <CoursesSection {...defaultCoursesContent} />
      <TestimonialsSection {...defaultTestimonialsContent} />
      <SuccessStoriesSection {...defaultSuccessStoriesContent} />
    </>
  );
}
