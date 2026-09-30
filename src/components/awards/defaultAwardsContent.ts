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
      imageSrc: '/images/awards/edtech-excellence-award-2026.jpg',
      imageAlt:
        'EdgeX Learning EdTech Excellence Award 2026 trophy presented by Times Education Awards',
    },
    {
      id: 'orange-2025',
      title: 'Innovation in Learning Award 2026',
      subtitle: 'Innovation in Technology-Enabled Education',
      variant: 'orange',
      imageSrc: '/images/awards/innovation-in-learning-award-2026.jpg',
      imageAlt:
        'EdgeX Learning Innovation in Learning Award 2026 trophy presented by BW Education Worldwide',
    },
    {
      id: 'red-2025',
      title: 'Learner Success Award 2026',
      subtitle: 'Excellence in Career-Focused Learning',
      variant: 'red',
      imageSrc: '/images/awards/learner-success-award-2026.jpg',
      imageAlt:
        'EdgeX Learning Learner Success Award 2026 trophy presented by Elets Digital Learning Summit & Awards',
    }
  ],
};
