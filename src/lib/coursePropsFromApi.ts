import type { ApiCourseOverview } from '@/services/courseApi';
import type { LayoutSettings } from '@/services/layoutApi';
import type { CourseDetailContent } from '@/lib/courses';
import type { TechnicalCourseContent } from '@/lib/technicalCourses';

// ── Defaults ──────────────────────────────────────────────────────────────────

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

const AVATAR_SRCS = [
  '/images/hero/person1.png',
  '/images/hero/person2.png',
  '/images/hero/person3.png',
  '/images/hero/person4.png',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildReviews(settings: LayoutSettings) {
  const reviews = [];

  if (settings.GOOGLE_REVIEW) {
    reviews.push({
      id:           'google',
      name:         'Google',
      logoSrc:      '/images/hero/google.png',
      logoAlt:      'Google reviews',
      rating:       settings.GOOGLE_REVIEW.rating,
      reviewsLabel: `${settings.GOOGLE_REVIEW.count.toLocaleString()} Reviews`,
    });
  }

  if (settings.TRUST_PILOT_REVIEW) {
    reviews.push({
      id:           'trustpilot',
      name:         'Trustpilot',
      logoSrc:      '/images/hero/trustpilot.png',
      logoAlt:      'Trustpilot reviews',
      rating:       settings.TRUST_PILOT_REVIEW.rating,
      reviewsLabel: `${settings.TRUST_PILOT_REVIEW.count.toLocaleString()} Reviews`,
    });
  }

  // Fallbacks when API hasn't returned values yet
  if (reviews.length === 0) {
    reviews.push(
      { id: 'google',     name: 'Google',     logoSrc: '/images/hero/google.png',     logoAlt: 'Google reviews',     rating: '4.8/5', reviewsLabel: 'Reviews' },
      { id: 'trustpilot', name: 'Trustpilot', logoSrc: '/images/hero/trustpilot.png', logoAlt: 'Trustpilot reviews', rating: '4.8/5', reviewsLabel: 'Reviews' },
    );
  }

  return reviews;
}

function buildLearnersStat(settings: LayoutSettings) {
  return {
    count:      settings.TOTAL_LEARNERS ?? '700K+',
    label:      'Learners',
    avatarSrcs: AVATAR_SRCS,
  };
}

/** Parse `introduction` — split on newlines, drop blanks */
function parseFeatures(introduction: string | null | undefined): string[] {
  if (!introduction) return [];
  return introduction.split('\n').map((s) => s.trim()).filter(Boolean);
}

// ── Shared base builder ───────────────────────────────────────────────────────

function buildBaseProps(
  course: ApiCourseOverview,
  categoryUri: string,
  courseUri: string,
  settings: LayoutSettings,
  scheduleBasePath?: string,
): Omit<CourseDetailContent, 'slug' | 'categorySlug'> {
  const schedulePath = scheduleBasePath
    ? `${scheduleBasePath}/schedule`
    : `/${categoryUri}/${courseUri}/schedule`;
  return {
    breadcrumbs: [
      { label: course.categoryName, href: `/${categoryUri}` },
      { label: course.name,         href: `/${categoryUri}/${courseUri}` },
    ],
    titlePrefix:   course.title,
    // titleAccent intentionally omitted — shows only the title
    rankedContent: course.rankedContent ?? undefined,
    rankingLine:   { highlight: '', rest: '' },
    features:      parseFeatures(course.details?.introduction),
    brochureUrl:   course.details?.brochure?.url ?? null,
    reviews:       buildReviews(settings),
    learnersStat:  buildLearnersStat(settings),
    primaryCta:    { href: schedulePath, label: 'View Schedules' },
    secondaryCta:  { href: schedulePath, label: 'View Schedules' },
    licensedPartner: {
      label:   'Licensed Training Partner',
      logoSrc: '/images/course/scrum-alliance.png',
      logoAlt: 'Scrum Alliance',
    },
    enterprise: {
      headingHighlight: 'Enterprise Training',
      headingRest:      'Solutions Trusted by Top Companies',
      cta:              { label: 'Skill Up Your Team', href: '/enterprise' },
      partners:         ENTERPRISE_PARTNERS,
    },
    form: {
      title: "We're Here to Guide Your Success",
      purposes: [
        { id: 'career-growth', label: 'Career Growth' },
        { id: 'certification', label: 'Get Certified' },
        { id: 'upskill-team', label: 'Upskill My Team' },
        { id: 'other',        label: 'Other' },
      ],
      termsHref:  '/terms',
      privacyHref: '/privacy',
      ctaLabel:   'Scale Your Career',
    },
  };
}

// ── Public builders ───────────────────────────────────────────────────────────

export function buildCourseDetailProps(
  course: ApiCourseOverview,
  categoryUri: string,
  courseUri: string,
  settings: LayoutSettings,
  scheduleBasePath?: string,
): CourseDetailContent {
  return {
    slug:         courseUri,
    categorySlug: categoryUri,
    ...buildBaseProps(course, categoryUri, courseUri, settings, scheduleBasePath),
  };
}

export function buildTechnicalCourseProps(
  course: ApiCourseOverview,
  categoryUri: string,
  courseUri: string,
  settings: LayoutSettings,
  scheduleBasePath?: string,
): TechnicalCourseContent {
  return {
    slug:         courseUri,
    categorySlug: categoryUri,
    ...buildBaseProps(course, categoryUri, courseUri, settings, scheduleBasePath),
    heroTitle:  course.title,
    startedAt:  course.startedAt,
    featureRows: [
      ['100% Online Live Classes', '6 - 8 Months Duration'],
      ['Job Assurance Guaranteed', 'Unlimited Doubt Support'],
      ['30+ 1:1 Sessions',         '20+ Projects'],
    ],
    heroBadges: [
      { id: 'package',  variant: 'learners', placement: 'top-left',     title: 'Highest Package', subtitle: '40 LPA' },
      { id: 'partners', variant: 'learners', placement: 'mid-left',     title: 'Hiring Partners', subtitle: '1200+' },
      { id: 'salary',   variant: 'mentors',  placement: 'bottom-right', title: 'Average Salary',  subtitle: '8 LPA' },
    ],
    collaboration: [
      { alt: 'Amazon',    src: '/images/ama.png' },
      { alt: 'Microsoft', src: '/images/course/google.png' },
    ],
    hiringPartners: HIRING_PARTNERS,
  };
}
