import type { HeroSectionProps } from './HeroSection';
import type { HeroBadge } from '@/components/shared';

export const defaultHeroBadges: HeroBadge[] = [
  {
    id: 'learners-1',
    variant: 'learners',
    placement: 'top-left',
    title: 'Job Transitions',
    subtitle: '15K+',
  },
  {
    id: 'learners-2',
    variant: 'learners',
    placement: 'mid-left',
    title: 'Active Learners',
    subtitle: '100K+',
  },
  {
    id: 'mentors',
    variant: 'mentors',
    placement: 'bottom-right',
    title: 'Expert Mentors',
    subtitle: '1,000+',
  },
];

export const defaultHeroContent: HeroSectionProps = {
  headingIntro: 'Build Skills Today and Unlock',
  headingYour: 'Your',
  headingAccent: 'Career Edge',
  subheading: 'Expert-led courses designed to help you thrive in the digital age',
  primaryCta: { href: '#courses-heading', label: 'Scale Your Expertise' },
  secondaryCta: { href: '/contact', label: 'Get An Expert Callback' },
  trustedBy: {
    label: 'Trusted By',
    logos: [
      { alt: 'Google', src: '/images/hero/google.png' },
      { alt: 'IBM', src: '/images/hero/ibm.png' },
      { alt: 'Infosys', src: '/images/hero/infosys.png' },
      { alt: 'Stanford', src: '/images/hero/stanford.png' },
      { alt: 'TCS', src: '/images/hero/tcs.png' },
    ],
  },
  collaboration: {
    lineBefore: 'Our Network of ',
    lineHighlight: '400+',
    lineAfter: ' Hiring Partners',
    logos: [
      { alt: 'Google', src: '/images/goo.png' },
      { alt: 'IBM', src: '/images/hero/ibm.png' },
      { alt: 'Infosys', src: '/images/hero/infosys.png' },
      { alt: 'Stanford', src: '/images/hero/stanford.png' },
      { alt: 'Deloitte', src: '/images/delo.png' },
      { alt: 'TCS', src: '/images/hero/tcs.png' },
    ],
  },
  figure: {
    src: '/images/hero/person.png',
    alt: 'Professional learner smiling, representing EdgeX career growth programs',
  },
  backgroundImage: {
    src: '/images/hero/aero-bg-v2.png',
  },
  badges: defaultHeroBadges,
};
