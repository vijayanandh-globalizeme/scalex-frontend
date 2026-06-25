import type { ApiCourseOverview } from '@/services/courseApi';
import type { CourseDetailContent } from '@/lib/courses';
import type { TechnicalCourseContent } from '@/lib/technicalCourses';

const DEFAULT_REVIEWS = [
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

const DEFAULT_LEARNERS = {
  count: '700K+',
  label: 'Learners',
  avatarSrcs: [
    '/images/hero/person.png',
    '/images/hero/person.png',
    '/images/hero/person.png',
    '/images/hero/person.png',
  ],
};

const ENTERPRISE_PARTNERS = [
  { id: 'google',    name: 'Google',    logoSrc: '/images/course/google.png',    logoAlt: 'Google' },
  { id: 'ibm',       name: 'IBM',       logoSrc: '/images/course/ibm.png',       logoAlt: 'IBM' },
  { id: 'infosys',   name: 'Infosys',   logoSrc: '/images/course/info.png',      logoAlt: 'Infosys' },
  { id: 'capgemini', name: 'Capgemini', logoSrc: '/images/course/capgem.png',    logoAlt: 'Capgemini' },
  { id: 'tcs',       name: 'TCS',       logoSrc: '/images/course/tcs.png',       logoAlt: 'TCS' },
  { id: 'amazon',    name: 'Amazon',    logoSrc: '/images/course/amazon.png',    logoAlt: 'Amazon' },
  { id: 'accenture', name: 'Accenture', logoSrc: '/images/course/accenture.png', logoAlt: 'Accenture' },
];

const HIRING_PARTNERS = [
  { id: 'google',    name: 'Google',    logoSrc: '/images/course/google.png',    logoAlt: 'Google' },
  { id: 'ibm',       name: 'IBM',       logoSrc: '/images/course/ibm.png',       logoAlt: 'IBM' },
  { id: 'infosys',   name: 'Infosys',   logoSrc: '/images/course/info.png',      logoAlt: 'Infosys' },
  { id: 'claude',    name: 'Claude',    logoSrc: '/images/course/claude.png',    logoAlt: 'Claude' },
  { id: 'capgemini', name: 'Capgemini', logoSrc: '/images/course/capgem.png',    logoAlt: 'Capgemini' },
  { id: 'tcs',       name: 'TCS',       logoSrc: '/images/course/tcs.png',       logoAlt: 'TCS' },
];

function parseRankingLine(rankedContent: string | null): { highlight: string; rest: string } {
  if (!rankedContent) return { highlight: '', rest: '' };
  // Expect format like "Ranked #1 CSM Training Provider By The Hindu"
  // Split at first space after the rank token (e.g. "Ranked #1")
  const match = rankedContent.match(/^(Ranked\s+#\d+)\s+(.+)$/i);
  if (match) return { highlight: match[1], rest: match[2] };
  return { highlight: rankedContent, rest: '' };
}

function buildBaseProps(
  course: ApiCourseOverview,
  categoryUri: string,
  courseUri: string,
): Omit<CourseDetailContent, 'slug' | 'categorySlug'> {
  return {
    breadcrumbs: [
      { label: course.categoryName, href: `/${categoryUri}` },
      { label: course.shortName || course.title, href: `/${categoryUri}/${courseUri}` },
    ],
    titlePrefix: course.title,
    titleAccent: course.shortName,
    features: [],
    rankingLine: parseRankingLine(course.rankedContent),
    reviews: DEFAULT_REVIEWS,
    learnersStat: DEFAULT_LEARNERS,
    primaryCta: { href: '#brochure', label: 'Download Brochure' },
    secondaryCta: { href: '#schedules', label: 'View Schedules' },
    licensedPartner: {
      label: 'Licensed Training Partner',
      logoSrc: '/images/course/scrum-alliance.png',
      logoAlt: 'Scrum Alliance',
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
      termsHref: '/terms',
      privacyHref: '/privacy',
      ctaLabel: 'Scale Your Career',
    },
  };
}

export function buildCourseDetailProps(
  course: ApiCourseOverview,
  categoryUri: string,
  courseUri: string,
): CourseDetailContent {
  return {
    slug: courseUri,
    categorySlug: categoryUri,
    ...buildBaseProps(course, categoryUri, courseUri),
  };
}

export function buildTechnicalCourseProps(
  course: ApiCourseOverview,
  categoryUri: string,
  courseUri: string,
): TechnicalCourseContent {
  return {
    slug: courseUri,
    categorySlug: categoryUri,
    ...buildBaseProps(course, categoryUri, courseUri),
    heroTitle: course.title,
    featureRows: [
      ['100% Online Live Classes', '6 - 8 Months Duration'],
      ['Job Assurance Guaranteed', 'Unlimited Doubt Support'],
      ['30+ 1:1 Sessions', '20+ Projects'],
    ],
    heroBadges: [
      { id: 'package', variant: 'learners', placement: 'top-left',     title: 'Highest Package', subtitle: '40 LPA' },
      { id: 'partners', variant: 'learners', placement: 'mid-left',    title: 'Hiring Partners', subtitle: '1200+' },
      { id: 'salary',  variant: 'mentors',  placement: 'bottom-right', title: 'Average Salary',  subtitle: '8 LPA' },
    ],
    collaboration: [
      { alt: 'Amazon',    src: '/images/ama.png' },
      { alt: 'Microsoft', src: '/images/course/google.png' },
    ],
    hiringPartners: HIRING_PARTNERS,
  };
}
