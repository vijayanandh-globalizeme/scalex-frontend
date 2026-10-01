import { defaultWhyScaleXContent, type WhyScaleXSectionProps } from '@/components/why-scalex';

export const courseWhyScaleXContent: WhyScaleXSectionProps = {
  headingBefore: 'Why Choose',
  headingAfter: '',
  brandLogo: { src: '/images/logo.png', alt: 'EdgeX' },
  subheading: 'World Class Training . Real World Impact . Your Success Guaranteed',
  scalexBrandLogo: { src: '/images/footer-logo.png', alt: 'Edgex Learning' },
  // Same comparison rows as the homepage section.
  rows: defaultWhyScaleXContent.rows,
};
