import type { SuccessStoriesSectionProps } from './SuccessStoriesSection';

export const defaultSuccessStoriesContent: Omit<SuccessStoriesSectionProps, 'stories'> = {
  heading: 'Success Stories from Our Global Community',
  subheading:
    'See how 100,000+ learners transformed their careers and scaled their expertise with ScaleX Learning',
  autoplay: true,
  autoplayIntervalMs: 6000,
  featureMedia: {
    src: '/images/Alex.png',
    alt: 'ScaleX learner sharing their success story',
    videoUrl: 'https://example.com/testimonials/feature',
  },
};
