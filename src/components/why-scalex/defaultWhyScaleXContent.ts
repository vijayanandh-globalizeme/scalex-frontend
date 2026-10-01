import type { WhyScaleXSectionProps } from './WhyScaleXSection';

export const defaultWhyScaleXContent: WhyScaleXSectionProps = {
  headingBefore: 'Why',
  headingAfter: 'is the Preferred Choice for Professionals',
  brandLogo: { src: '/images/logo.png', alt: 'EdgeX' },
  subheading:
    "We don't just teach skills; we build careers. Our ecosystem is designed to bridge the gap between classroom learning and board-room execution.",
  scalexBrandLogo: { src: '/images/logo.png', alt: 'EdgeX' },
  rows: [
    {
      id: 'learning-experience',
      label: 'Learning Experience',
      others: {
        title: 'Recorded / Standard Learning',
        description: 'Limited interaction and hands-on exposure.',
      },
      scalex: {
        title: 'Live & Hands-On Learning',
        description: 'Instructor-led sessions with practical, real-world learning.',
      },
    },
    {
      id: 'language',
      label: 'Language',
      others: {
        title: 'English-First Learning',
        description: 'Learning can be challenging when English is not your preferred language.',
      },
      scalex: {
        title: 'Learn in Your Preferred Language',
        description: 'Learn concepts clearly in the language you understand best.',
      },
    },
    {
      id: 'interview-preparation',
      label: 'Interview Preparation',
      others: {
        title: 'Basic Interview Guidance',
        description: 'Limited interview preparation and practice.',
      },
      scalex: {
        title: '30-Day Dedicated Interview Prep',
        description:
          'Focused interview preparation with questions, scenarios, practice and mock interviews.',
      },
    },
    {
      id: 'mentorship',
      label: 'Mentorship',
      others: {
        title: 'Limited Mentorship',
        description: 'Support may be available only during scheduled sessions.',
      },
      scalex: {
        title: 'Daily Mentorship',
        description:
          'Get continuous guidance, doubt resolution and career support throughout your journey.',
      },
    },
    {
      id: 'career-support',
      label: 'Career Support',
      others: {
        title: 'Limited Career Guidance',
        description: 'Support may end after course completion.',
      },
      scalex: {
        title: 'Complete Job Assistance',
        description:
          'Resume building, LinkedIn guidance, interview preparation and job-search support.',
      },
    },
  ],
};
