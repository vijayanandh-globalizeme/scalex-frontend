import type { SuccessStoriesSectionProps } from './SuccessStoriesSection';

const placeholderImage = '/images/hero/person.png';

const sharedQuote =
  'ScaleX Learning transformed the way I approach Agile methodologies. The project-based learning wasn’t just theory—it gave me the practical tools to lead my team more effectively. My career growth has been exponential since I got certified here.';

export const defaultSuccessStoriesContent: SuccessStoriesSectionProps = {
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
  stories: [
    {
      id: 'john-williams',
      name: 'John Williams',
      role: 'CEO & Co-Founder, Innotech',
      quote: sharedQuote,
      rating: 5,
      mediaSrc: placeholderImage,
      mediaAlt: 'John Williams sharing his ScaleX experience',
      videoUrl: 'https://example.com/testimonials/john',
    },
    {
      id: 'priya-sharma',
      name: 'Priya Sharma',
      role: 'Senior Product Manager, FinHub',
      quote: sharedQuote,
      rating: 5,
      mediaSrc: placeholderImage,
      mediaAlt: 'Priya Sharma sharing her ScaleX experience',
      videoUrl: 'https://example.com/testimonials/priya',
    },
    {
      id: 'alex-chen',
      name: 'Alex Chen',
      role: 'Engineering Lead, CloudOps',
      quote: sharedQuote,
      rating: 5,
      mediaSrc: '/images/Alex.png',
      mediaAlt: 'Alex Chen sharing his ScaleX experience',
      videoUrl: 'https://example.com/testimonials/alex',
    },
    {
      id: 'maria-garcia',
      name: 'Maria Garcia',
      role: 'Director of Operations, Globex',
      quote: sharedQuote,
      rating: 5,
      mediaSrc: placeholderImage,
      mediaAlt: 'Maria Garcia sharing her ScaleX experience',
      videoUrl: 'https://example.com/testimonials/maria',
    },
  ],
};
