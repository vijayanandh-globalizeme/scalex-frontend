import type { GuidanceSectionProps } from './GuidanceSection';

export const defaultGuidanceContent: GuidanceSectionProps = {
  heading: 'Empowering Professionals,\nScaling Careers Globally',
  stats: [
    { id: 'leaders', value: '30000+', label: 'Future-Ready Leaders Certified' },
    { id: 'goal', value: '100%', label: 'Professional Goal Achievement Rate' },
    { id: 'countries', value: '100+', label: 'Countries Transforming with EdgeX' },
  ],
  formTitle: "We're Here to Guide Your Success",
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
  decorativeArrow: { src: '/images/big-aerox.png', alt: '' },
};
