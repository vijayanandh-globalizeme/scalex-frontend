import type { AwardsSectionProps } from './AwardsSection';

export const defaultAwardsContent: AwardsSectionProps = {
  heading: 'Excellence Recognized by Global Industry Leaders',
  subheading:
    'Celebrating our journey of innovation and impact through prestigious awards that define our commitment to world-class learning',
  visibleCount: 3,
  autoplay: true,
  autoplayIntervalMs: 6000,
  cards: [
    {
      id: 'gold-2025',
      title: '2025 Gold Winner',
      subtitle: 'Top 10 Ed Tech Platform',
      variant: 'gold',
      medalSrc: '/images/top10.png',
      medalAlt: 'Top 10 Ed Tech Platform award',
    },
    {
      id: 'orange-2025',
      title: '2025 Gold Winner',
      subtitle: 'Top 10 Ed Tech Platform',
      variant: 'orange',
      medalSrc: '/images/top10.png',
      medalAlt: 'Top 10 Ed Tech Platform award',
    },
    {
      id: 'red-2025',
      title: '2025 Gold Winner',
      subtitle: 'Top 10 Ed Tech Platform',
      variant: 'red',
      medalSrc: '/images/top10.png',
      medalAlt: 'Top 10 Ed Tech Platform award',
    },
    {
      id: 'gold-2024',
      title: '2024 Excellence Award',
      subtitle: 'Best Online Learning Experience',
      variant: 'gold',
      medalSrc: '/images/top10.png',
      medalAlt: 'Best Online Learning Experience award',
    },
    {
      id: 'orange-2024',
      title: '2024 Innovation Award',
      subtitle: 'Tech Education Pioneer',
      variant: 'orange',
      medalSrc: '/images/top10.png',
      medalAlt: 'Tech Education Pioneer award',
    },
  ],
};
