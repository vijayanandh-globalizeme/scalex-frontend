export type ExploreCategoryItem = {
  id: string;
  label: string;
  href: string;
  /** Solid circle fill behind the white briefcase icon */
  iconBg: string;
};

export const EXPERT_CTA = {
  headingLines: [
    'Engage in a discussion with industry experts',
    'and receive personalized mentorship.',
  ],
  subheading: 'Our mission is to empower your growth and guide you toward a successful future.',
  cta: { href: '/contact', label: 'Generate An Expert Callback' },
  image: { src: '/images/hero/person.png', alt: 'Industry expert ready to mentor learners' },
};
