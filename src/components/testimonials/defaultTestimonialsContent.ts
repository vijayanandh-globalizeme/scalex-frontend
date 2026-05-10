import { createElement } from 'react';
import type { TestimonialsSectionProps } from './TestimonialsSection';
import {
  PartnersIcon,
  RupeeIcon,
  SwitchIcon,
  TrendingUpIcon,
} from './TestimonialsSection';

const placeholderAvatar = '/images/hero/person.png';
const tcsLogo = '/images/hero/tcs.png';
const googleLogo = '/images/hero/google.png';

export const defaultTestimonialsContent: TestimonialsSectionProps = {
  heading: 'Real Stories, Real Transformations',
  subheading:
    'See how our learners are scaling their careers and making successful transitions into high-growth roles',
  testimonials: [
    {
      id: 'john-williams',
      name: 'JOHN WILLIAMS',
      role: 'CEO & Co-Founder, Innotech',
      avatarSrc: placeholderAvatar,
      quote:
        'ScaleX Learning transformed the way I approach Agile methodologies. The project-based learning wasn’t just theory — it gave me the practical tools to lead my team more effectively.',
      metricValue: '300%',
      metricLabel: 'Salary Hike',
      fromLogoSrc: tcsLogo,
      fromLogoAlt: 'TCS',
      toLogoSrc: googleLogo,
      toLogoAlt: 'Google',
      linkedinUrl: 'https://linkedin.com',
    },
    {
      id: 'priya-sharma',
      name: 'PRIYA SHARMA',
      role: 'Senior Product Manager, FinHub',
      avatarSrc: placeholderAvatar,
      quote:
        'The mentorship and structured curriculum helped me transition into product management within six months. Worth every minute.',
      metricValue: '220%',
      metricLabel: 'Salary Hike',
      fromLogoSrc: tcsLogo,
      fromLogoAlt: 'TCS',
      toLogoSrc: googleLogo,
      toLogoAlt: 'Google',
      linkedinUrl: 'https://linkedin.com',
    },
  ],
  stats: [
    {
      id: 'hike',
      label: 'Average Hike',
      value: '60%',
      icon: createElement(TrendingUpIcon, { className: 'h-[18px] w-[18px]' }),
    },
    {
      id: 'salary',
      label: 'Highest Salary',
      value: '110LPA',
      icon: createElement(RupeeIcon, { className: 'h-[18px] w-[18px]' }),
    },
    {
      id: 'transitions',
      label: 'Career Transitions',
      value: '10000+',
      icon: createElement(SwitchIcon, { className: 'h-[18px] w-[18px]' }),
    },
    {
      id: 'partners',
      label: 'Hiring Partners',
      value: '5000+',
      icon: createElement(PartnersIcon, { className: 'h-[18px] w-[18px]' }),
    },
  ],
  reviews: [
    {
      id: 'google',
      name: 'Google',
      logoSrc: '/images/hero/google.png',
      logoAlt: 'Google reviews',
      rating: '4.8/5',
      reviewsLabel: '9845 Reviews',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      logoSrc: '/images/Facebook.svg',
      logoAlt: 'Facebook reviews',
      rating: '4.8/5',
      reviewsLabel: '9845 Reviews',
    },
    {
      id: 'trustpilot',
      name: 'Trustpilot',
      logoSrc: '/images/hero/google.png',
      logoAlt: 'Trustpilot reviews',
      rating: '4.8/5',
      reviewsLabel: '9845 Reviews',
    },
    {
      id: 'switchup',
      name: 'Switchup',
      logoSrc: '/images/hero/google.png',
      logoAlt: 'Switchup reviews',
      rating: '4.8/5',
      reviewsLabel: '9845 Reviews',
    },
  ],
};
