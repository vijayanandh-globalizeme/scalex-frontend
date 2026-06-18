import type { CourseDetailContent, CoursePartnerLogo } from '@/lib/courses';
import type { HeroBadge } from '@/components/hero/HeroSection';

export type TechnicalCourseDefinition = {
  slug: string;
  menuLabel: string;
  titlePrefix: string;
  titleAccent: string;
  breadcrumbLabel: string;
  heroTitle: string;
};

export type TechnicalCourseContent = CourseDetailContent & {
  heroTitle: string;
  featureRows: [string, string][];
  heroBadges: HeroBadge[];
  collaboration: { alt: string; src: string }[];
  hiringPartners: CoursePartnerLogo[];
};

const TECHNICAL_FEATURE_ROWS: [string, string][] = [
  ['100% Online Live Classes', '6 - 8 Months Duration'],
  ['Job Assurance Guaranteed', 'Unlimited Doubt Support'],
  ['30+ 1:1 Sessions', '20+ Projects'],
];

const TECHNICAL_HERO_BADGES: HeroBadge[] = [
  {
    id: 'package',
    variant: 'learners',
    placement: 'top-left',
    title: 'Highest Package',
    subtitle: '40 LPA',
  },
  {
    id: 'partners',
    variant: 'learners',
    placement: 'mid-left',
    title: 'Hiring Partners',
    subtitle: '1200+',
  },
  {
    id: 'salary',
    variant: 'mentors',
    placement: 'bottom-right',
    title: 'Average Salary',
    subtitle: '8 LPA',
  },
];

const COLLABORATION_LOGOS = [
  { alt: 'Amazon', src: '/images/ama.png' },
  { alt: 'Microsoft', src: '/images/course/google.png' },
];

const HIRING_PARTNERS: CoursePartnerLogo[] = [
  { id: 'google', name: 'Google', logoSrc: '/images/course/google.png', logoAlt: 'Google' },
  { id: 'ibm', name: 'IBM', logoSrc: '/images/course/ibm.png', logoAlt: 'IBM' },
  { id: 'infosys', name: 'Infosys', logoSrc: '/images/course/info.png', logoAlt: 'Infosys' },
  { id: 'claude', name: 'Claude', logoSrc: '/images/course/claude.png', logoAlt: 'Claude' },
  { id: 'capgemini', name: 'Capgemini', logoSrc: '/images/course/capgem.png', logoAlt: 'Capgemini' },
  { id: 'tcs', name: 'TCS', logoSrc: '/images/course/tcs.png', logoAlt: 'Tata Consultancy Services' },
];

export const PRIMARY_TECHNICAL_COURSE_SLUG = 'advanced-certification-in-data-analytics-gen-ai';

export const TECHNICAL_PRIMARY_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', href: '#overview' },
  { id: 'course-content', label: 'Course Content', href: '#course-content' },
  { id: 'career-transformations', label: 'Career Transformations', href: '#career-transformations' },
  { id: 'skills-tools', label: 'Skills & Tools', href: '#skills-tools' },
  { id: 'learning-track', label: 'Learning track', href: '#learning-track' },
  { id: 'interview-prep-track', label: 'Interview prep track', href: '#interview-prep-track' },
  { id: 'placement-track', label: 'Placement track', href: '#placement-track' },
  { id: 'course-fee', label: 'Course Fee', href: '#course-fee' },
  { id: 'schedules', label: 'Schedules', href: '#schedules' },
  { id: 'eligibility', label: 'Eligibility Requirements', href: '#eligibility' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
] as const;

export const TECHNICAL_MEGA_MENU_COURSES = [
  {
    slug: PRIMARY_TECHNICAL_COURSE_SLUG,
    label: 'Advanced Certified Scrum Master',
  },
] as const;

export const TECHNICAL_COURSE_DEFINITIONS: TechnicalCourseDefinition[] = [
  {
    slug: PRIMARY_TECHNICAL_COURSE_SLUG,
    menuLabel: 'Advanced Certified Scrum Master',
    titlePrefix: 'Advanced Certification in Data Analytics & Gen AI',
    titleAccent: 'Professional Program',
    breadcrumbLabel: 'Advanced Certification in Data Analytics & Gen AI',
    heroTitle: 'Advanced Certification in Data Analytics & Gen AI',
  },
  {
    slug: 'python-data-science',
    menuLabel: 'Advanced Certified Scrum Master',
    titlePrefix: 'Python for Data Science',
    titleAccent: 'Professional Program',
    breadcrumbLabel: 'Python for Data Science',
    heroTitle: 'Advanced Certification in Data Analytics & Gen AI',
  },
  {
    slug: 'cloud-devops-engineering',
    menuLabel: 'Advanced Certified Scrum Master',
    titlePrefix: 'Cloud & DevOps Engineering',
    titleAccent: 'Career Program',
    breadcrumbLabel: 'Cloud & DevOps Engineering',
    heroTitle: 'Cloud & DevOps Engineering Career Program',
  },
  {
    slug: 'mern-stack-development',
    menuLabel: 'Advanced Certified Scrum Master',
    titlePrefix: 'MERN Stack Development',
    titleAccent: 'Intensive Bootcamp',
    breadcrumbLabel: 'MERN Stack Development',
    heroTitle: 'MERN Stack Development Intensive Bootcamp',
  },
];

const DEFAULT_FORM = {
  title: "We're Here to Guide Your Success",
  purposes: [
    { id: 'career-growth', label: 'Career Growth' },
    { id: 'placement', label: 'Get Placed' },
    { id: 'upskill-team', label: 'Upskill My Team' },
    { id: 'other', label: 'Other' },
  ],
  termsHref: '/terms',
  privacyHref: '/privacy',
  ctaLabel: 'Scale Your Career',
};

function buildTechnicalCourse(def: TechnicalCourseDefinition): TechnicalCourseContent {
  const href = `/technical-courses/${def.slug}`;

  return {
    slug: def.slug,
    categorySlug: 'technical-courses',
    breadcrumbs: [
      { label: 'Technical Course', href: getTechnicalCourseHref(PRIMARY_TECHNICAL_COURSE_SLUG) },
      { label: def.breadcrumbLabel, href },
    ],
    titlePrefix: def.titlePrefix,
    titleAccent: def.titleAccent,
    heroTitle: def.heroTitle,
    featureRows: TECHNICAL_FEATURE_ROWS,
    heroBadges: TECHNICAL_HERO_BADGES,
    collaboration: COLLABORATION_LOGOS,
    hiringPartners: HIRING_PARTNERS,
    features: [],
    rankingLine: {
      highlight: 'Ranked #1',
      rest: 'CSM Training Provider By The Hindu',
    },
    reviews: [
      {
        id: 'google',
        name: 'Google',
        logoSrc: '/images/g.png',
        logoAlt: 'Google reviews',
        rating: '4.8/5',
        reviewsLabel: '9845 Reviews',
      },
    ],
    learnersStat: {
      count: '700K+',
      label: 'Learners',
      avatarSrcs: [
        '/images/hero/person.png',
        '/images/hero/person.png',
        '/images/hero/person.png',
        '/images/hero/person.png',
      ],
    },
    primaryCta: { href: '#schedules', label: 'Register for FREE Webinar' },
    secondaryCta: { href: '#brochure', label: 'Download Brochure' },
    licensedPartner: {
      label: 'Industry-Aligned Curriculum',
      logoSrc: '/images/course/google.png',
      logoAlt: 'Industry partners',
    },
    enterprise: {
      headingHighlight: 'Enterprise Training',
      headingRest: 'Solutions Trusted by Top Companies',
      cta: { label: 'Skill Up Your Team', href: '/enterprise' },
      partners: HIRING_PARTNERS,
    },
    form: DEFAULT_FORM,
  };
}

const TECHNICAL_COURSES: Record<string, TechnicalCourseContent> = Object.fromEntries(
  TECHNICAL_COURSE_DEFINITIONS.map((def) => [def.slug, buildTechnicalCourse(def)]),
);

export function getTechnicalCourseBySlug(slug: string): TechnicalCourseContent | undefined {
  return TECHNICAL_COURSES[slug];
}

export function getAllTechnicalCourseSlugs(): string[] {
  return TECHNICAL_COURSE_DEFINITIONS.map((def) => def.slug);
}

export function getTechnicalCourseHref(slug: string): string {
  return `/technical-courses/${slug}`;
}

export function technicalLabelToSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
