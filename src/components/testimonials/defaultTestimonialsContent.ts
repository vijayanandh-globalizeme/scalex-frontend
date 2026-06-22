import { createElement } from 'react';
import type { TestimonialsSectionProps } from './TestimonialsSection';
import {
  PartnersIcon,
  RupeeIcon,
  SwitchIcon,
  TrendingUpIcon,
} from './TestimonialsSection';

export const defaultTestimonialsContent: Omit<TestimonialsSectionProps, 'testimonials' | 'reviews'> = {
  heading: 'Real Stories, Real Transformations',
  subheading:
    'See how our learners are scaling their careers and making successful transitions into high-growth roles',
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
};
