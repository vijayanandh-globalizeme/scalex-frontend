import type { CategoryLearnersStat, CategoryReview } from '@/components/category/CategoryHeroSection';

export interface CourseBreadcrumb {
  label: string;
  href: string;
}

export interface CoursePartnerLogo {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
}

export interface CourseDetailContent {
  slug: string;
  categorySlug: string;
  /** Real course UUID (API-backed routes only) — used to attribute leads from CTAs. */
  courseId?: string | null;
  breadcrumbs: CourseBreadcrumb[];
  titlePrefix: string;
  titleAccent?: string;
  /** Short blurb shown next to the title; may contain `<a>` links. */
  shortDescription?: string | null;
  /** Raw ranked content string; **bold** segments get text-brand styling */
  rankedContent?: string;
  /** Legacy split ranking line — used when rankedContent is absent */
  rankingLine: {
    highlight: string;
    rest: string;
  };
  features: string[];
  /** If set, shows the Download Brochure button */
  brochureUrl?: string | null;
  reviews: CategoryReview[];
  learnersStat: CategoryLearnersStat;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  /** Absent when the course has no training-partner logo uploaded. */
  licensedPartner?: {
    label: string;
    logos: { src: string; alt: string }[];
  } | null;
  enterprise: {
    headingHighlight: string;
    headingRest: string;
    cta: { label: string; href: string };
    partners: CoursePartnerLogo[];
  };
  form: {
    title: string;
    purposes: { id: string; label: string }[];
    termsHref: string;
    privacyHref: string;
    ctaLabel: string;
  };
}

const DEFAULT_REVIEWS: CategoryReview[] = [
  {
    id: 'google',
    name: 'Google',
    logoSrc: '/images/hero/google.png',
    logoAlt: 'Google reviews',
    rating: '4.8/5',
    reviewsLabel: '9845 Reviews',
  },
  {
    id: 'trustpilot',
    name: 'Trustpilot',
    logoSrc: '/images/hero/trustpilot.png',
    logoAlt: 'Trustpilot reviews',
    rating: '4.8/5',
    reviewsLabel: '9845 Reviews',
  },
];

const DEFAULT_LEARNERS: CategoryLearnersStat = {
  count: '700K+',
  label: 'Learners',
  avatarSrcs: [
    '/images/hero/person.png',
    '/images/hero/person.png',
    '/images/hero/person.png',
    '/images/hero/person.png',
  ],
};

const ENTERPRISE_PARTNERS: CoursePartnerLogo[] = [
  { id: 'google', name: 'Google', logoSrc: '/images/course/google.png', logoAlt: 'Google' },
  { id: 'ibm', name: 'IBM', logoSrc: '/images/course/ibm.png', logoAlt: 'IBM' },
  { id: 'infosys', name: 'Infosys', logoSrc: '/images/course/info.png', logoAlt: 'Infosys' },
  { id: 'claude', name: 'Claude', logoSrc: '/images/course/claude.png', logoAlt: 'Claude' },
  { id: 'capgemini', name: 'Capgemini', logoSrc: '/images/course/capgem.png', logoAlt: 'Capgemini' },
  { id: 'tcs', name: 'TCS', logoSrc: '/images/course/tcs.png', logoAlt: 'Tata Consultancy Services' },
  { id: 'amazon', name: 'Amazon', logoSrc: '/images/course/amazon.png', logoAlt: 'Amazon' },
  { id: 'hsbc', name: 'HSBC', logoSrc: '/images/course/hsbc.png', logoAlt: 'HSBC' },
  { id: 'accenture', name: 'Accenture', logoSrc: '/images/course/accenture.png', logoAlt: 'Accenture' },
  { id: 'walmart', name: 'Walmart', logoSrc: '/images/course/walmart.png', logoAlt: 'Walmart' },
  { id: 'sapient', name: 'Sapient', logoSrc: '/images/course/sapient.png', logoAlt: 'Sapient' },
  { id: 'switchup', name: 'Switchup', logoSrc: '/images/course/switc.png', logoAlt: 'Switchup' },
];

const CSM_FEATURES = [
  'Authorized Scrum Alliance Training',
  '100% Exam Pass Guarantee',
  'All-Inclusive Course Pricing',
  'Live CST-Led Online Sessions',
  'Free 2-Year Membership',
  'Earn 20 PDUs & 16 SEUs',
];

const COURSES: Record<string, CourseDetailContent> = {
  'certified-scrum-master': {
    slug: 'certified-scrum-master',
    categorySlug: 'agile-and-scrum',
    breadcrumbs: [
      { label: 'Agile and Scrum', href: '/categories/agile-and-scrum' },
      { label: 'Certified Scrum Master', href: '/courses/certified-scrum-master' },
    ],
    titlePrefix: 'Certified Scrum Master Training',
    titleAccent: 'CSM Certification',
    features: CSM_FEATURES,
    rankingLine: {
      highlight: 'Ranked #1',
      rest: 'CSM Training Provider By The Hindu',
    },
    reviews: DEFAULT_REVIEWS,
    learnersStat: DEFAULT_LEARNERS,
    primaryCta: { href: '#brochure', label: 'Download Brochure' },
    secondaryCta: { href: '#schedules', label: 'View Schedules' },
    licensedPartner: {
      label: 'Licensed Training Partner',
      logos: [{ src: '/images/course/scrum-alliance.png', alt: 'Scrum Alliance' }],
    },
    enterprise: {
      headingHighlight: 'Enterprise Training',
      headingRest: 'Solutions Trusted by Top Companies',
      cta: { label: 'Skill Up Your Team', href: '/enterprise' },
      partners: ENTERPRISE_PARTNERS,
    },
    form: {
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
    },
  },
};

export function courseLabelToSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function hasCourseDetail(slug: string): boolean {
  return slug in COURSES;
}

export function getCourseBySlug(slug: string): CourseDetailContent | undefined {
  return COURSES[slug];
}

export function getAllCourseSlugs(): string[] {
  return Object.keys(COURSES);
}

export function getCourseHref(categorySlug: string, courseLabel: string): string {
  const courseSlug = courseLabelToSlug(courseLabel);
  if (hasCourseDetail(courseSlug)) {
    return `/courses/${courseSlug}`;
  }
  return `/categories/${categorySlug}#courses`;
}
