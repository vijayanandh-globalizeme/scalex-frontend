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
  formDescription: "Share your details and our career expert will help you choose the right course based on your goals.",
  courses: [
    { id: 'product-management', label: 'Product Management' },
    { id: 'agile-scrum', label: 'Agile & Scrum' },
    { id: 'data-analytics', label: 'Data Analytics' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'leadership', label: 'Leadership' },
  ],
  purposes: [
    { id: 'training', label: 'Training' },
    { id: 'certification', label: 'Certification' },
    { id: 'job-preparation', label: 'Job Preparation' },
    { id: 'upskilling', label: 'Upskilling' },
    { id: 'exploring', label: 'Exploring' },
    { id: 'others', label: 'Others' },
  ],
  termsHref: '/terms-of-use',
  privacyHref: '/privacy-policy',
  ctaLabel: 'Talk to Our Expert',
  decorativeArrow: { src: '/images/x-ic.png', alt: '' },
};
