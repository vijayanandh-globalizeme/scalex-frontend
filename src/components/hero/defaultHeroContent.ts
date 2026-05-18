import type { HeroSectionProps } from './HeroSection';

export const defaultHeroContent: HeroSectionProps = {
  headingIntro: 'The Ultimate Launchpad for',
  headingYour: 'Your',
  headingAccent: 'Career Growth',
  subheading: 'Expert-led courses designed to help you thrive in the digital age',
  primaryCta: { href: '/courses', label: 'Scale Your Expertise' },
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
    lineBefore: 'In Collaboration with ',
    lineHighlight: 'World-Class',
    lineAfter: ' Certifying Bodies',
    logos: [
      { alt: 'Google', src: '/images/hero/google.png' },
      { alt: 'IBM', src: '/images/hero/ibm.png' },
      { alt: 'Infosys', src: '/images/hero/infosys.png' },
      { alt: 'Stanford', src: '/images/hero/stanford.png' },
      { alt: 'Deloitte' },
      { alt: 'TCS', src: '/images/hero/tcs.png' },
    ],
  },
  figure: {
    src: '/images/hero/person.png',
    alt: 'Professional learner smiling, representing ScaleX career growth programs',
  },
  backgroundImage: {
    src: '/images/hero/aero-bg-v2.png',
  },
  badges: [
    {
      id: 'learners-1',
      variant: 'learners',
      placement: 'top-left',
      title: 'Active Learners',
      subtitle: '100K+',
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
  ],
};
