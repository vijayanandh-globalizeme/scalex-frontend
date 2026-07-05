import type { CourseLeadFormProps } from '@/components/course-detail/CourseLeadForm';

/** Shared lead-capture form content for the site-wide brochure/contact modal. */
export const DEFAULT_LEAD_FORM: CourseLeadFormProps = {
  title: "We're Here to Guide Your Success",
  purposes: [
    { id: 'career-growth', label: 'Career Growth' },
    { id: 'certification', label: 'Get Certified' },
    { id: 'upskill-team', label: 'Upskill My Team' },
    { id: 'other', label: 'Other' },
  ],
  termsHref: '/terms-of-use',
  privacyHref: '/privacy-policy',
  ctaLabel: 'Scale Your Career',
};
