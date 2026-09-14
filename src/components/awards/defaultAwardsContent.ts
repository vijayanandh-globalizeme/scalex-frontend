import type { AwardsSectionProps } from './AwardsSection';

export const defaultAwardsContent: AwardsSectionProps = {
  heading: 'Awards & Recognition',
  subheading:
    'Celebrating the milestones that reflect our commitment to quality learning and student success.',
  visibleCount: 3,
  autoplay: true,
  autoplayIntervalMs: 6000,
  cards: [
    {
      id: 'gold-2025',
      title: 'EdTech Excellence Award 2026',
      subtitle: 'Outstanding Contribution to Skill-Based Learning',
      variant: 'gold',
      medalSrc: '/images/top10.png',
      medalAlt: 'Recognized for our learner-first approach and industry-aligned programs.',
    },
    {
      id: 'orange-2025',
      title: 'Innovation in Learning Award 2026',
      subtitle: 'Innovation in Technology-Enabled Education',
      variant: 'orange',
      medalSrc: '/images/top10.png',
      medalAlt: 'Recognized for creating practical and engaging learning experiences using modern technology.',
    },
    {
      id: 'red-2025',
      title: 'Learner Success Award 2026',
      subtitle: 'Excellence in Career-Focused Learning',
      variant: 'red',
      medalSrc: '/images/top10.png',
      medalAlt: 'Recognized for empowering learners with skills and career support to move forward with confidence.',
    }
  ],
};
