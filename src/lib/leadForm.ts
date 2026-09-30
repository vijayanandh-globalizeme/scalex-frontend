import type { CourseLeadFormProps } from '@/components/course-detail/CourseLeadForm';

/** Shared lead-capture form content for the site-wide brochure/contact modal. */
export const DEFAULT_LEAD_FORM: CourseLeadFormProps = {
  title: "Share Your Details",
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
  ctaLabel: 'Submit',
};
