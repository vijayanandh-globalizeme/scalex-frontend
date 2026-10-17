import type { CourseDetailContent, CoursePartnerLogo } from '@/lib/courses';
import type { HeroBadge } from '@/components/hero/HeroSection';

export type TechnicalCourseContent = CourseDetailContent & {
  heroTitle: string;
  featureRows: [string, string][];
  heroBadges: HeroBadge[];
  collaboration: { alt: string; src: string }[];
  hiringPartners: CoursePartnerLogo[];
  /** ISO date string; countdown ticks down to this date */
  startedAt?: string | null;
};
