export const sidebar: {
  assistTitle: string;
  purposes: { id: string; label: string }[];
  termsHref: string;
  privacyHref: string;
  ctaLabel: string;
  brochureText: string;
  brochureCtaLabel: string;
  mentorship: {
    title: string;
    imageSrc: string;
    imageAlt: string;
  };
} = {
  assistTitle: 'Let us assist you',
  purposes: [
    { id: 'training', label: 'Training' },
    { id: 'certification', label: 'Certification' },
    { id: 'job-preparation', label: 'Job Preparation' },
    { id: 'upskilling', label: 'Upskilling' },
    { id: 'exploring', label: 'Exploring' },
    { id: 'others', label: 'Others' },
  ],
  termsHref:        '/terms-of-use',
  privacyHref:      '/privacy-policy',
  ctaLabel:         'Talk To Us',
  brochureText:     'Explore the world class Brochure here',
  brochureCtaLabel: 'Download Brochure',
  mentorship: {
    title:    'Free 1-on-1 Mentorship',
    imageSrc: '/images/per-6.png',
    imageAlt: 'Mentor',
  },
};