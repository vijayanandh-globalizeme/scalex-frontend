import type { GuidanceSectionProps } from './GuidanceSection';

export const defaultGuidanceContent: GuidanceSectionProps = {
  heading: 'Build Skills Today to Unlock \nYour Career Edge',
  description: 'Practical, career-focused learning designed to help you build the right skills and move your career forward.',
  stats: [
    { id: 'leaders', value: '10,000+', label: 'Total Learners Enrolled' },
    { id: 'goal', value: '400+', label: 'Hiring Partners' },
    { id: 'countries', value: '5000+', label: 'Careers Transformed' },
  ],
  formTitle: "Let’s Find the Right Course for You",
  courses: [
    { id: 'product-management', label: 'Product Management' },
    { id: 'agile-scrum', label: 'Agile & Scrum' },
    { id: 'data-analytics', label: 'Data Analytics' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'leadership', label: 'Leadership' },
  ],
  purposes: [
    { id: 'career-growth', label: 'Career Growth' },
    { id: 'switch-roles', label: 'Switch Roles' },
    { id: 'upskill-team', label: 'Upskill My Team' },
    { id: 'other', label: 'Other' },
  ],
  termsHref: '/terms-of-use',
  privacyHref: '/privacy-policy',
  ctaLabel: 'Scale Your Career',
  decorativeArrow: { src: '/images/x-ic.png', alt: '' },
};
