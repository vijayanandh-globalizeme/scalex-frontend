import type { SuccessStoriesSectionProps } from './SuccessStoriesSection';

export const defaultSuccessStoriesContent: Omit<SuccessStoriesSectionProps, 'stories'> = {
  heading: 'Hear From Our Learners',
  subheading:
    'Discover how EdgeX learners are building new skills, gaining confidence and moving closer to their career goals',
  autoplay: true,
  autoplayIntervalMs: 6000,
  featureMedia: {
    src: '/images/Alex.png',
    alt: ' EdgeX learner sharing their success story',
  },
};
