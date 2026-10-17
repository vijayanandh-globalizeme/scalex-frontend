export type ExploreCategoryItem = {
  id: string;
  label: string;
  href: string;
  iconBg: string;
  icon: string;
};

export const EXPERT_CTA = {
  headingLines: [
    'Connect with industry experts for',
    'personalized learning guidance',
  ],
  subheading: 'Get the right guidance on courses, certifications, and skills to support your learning journey.',
  cta: { href: '/contact', label: 'Get Expert Guidance' },
  image: { src: '/images/julioo-1.png', alt: 'Industry expert ready to mentor learners' },
};
