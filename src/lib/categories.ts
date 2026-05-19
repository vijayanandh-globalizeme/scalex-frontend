import type { CategoryPageContent } from '@/components/category/CategoryHeroSection';

const DEFAULT_REVIEWS: CategoryPageContent['reviews'] = [
  {
    id: 'google',
    name: 'Google',
    logoSrc: '/images/hero/google.png',
    logoAlt: 'Google reviews',
    rating: '4.8/5',
    reviewsLabel: '9845 Reviews',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    logoSrc: '/images/Facebook.svg',
    logoAlt: 'Facebook reviews',
    rating: '4.8/5',
    reviewsLabel: '9845 Reviews',
  },
  {
    id: 'trustpilot',
    name: 'Trustpilot',
    logoSrc: '/images/hero/google.png',
    logoAlt: 'Trustpilot reviews',
    rating: '4.8/5',
    reviewsLabel: '9845 Reviews',
  },
  {
    id: 'switchup',
    name: 'Switchup',
    logoSrc: '/images/hero/google.png',
    logoAlt: 'Switchup reviews',
    rating: '4.8/5',
    reviewsLabel: '9845 Reviews',
  },
];

const DEFAULT_COLLABORATION: CategoryPageContent['collaboration'] = {
  lineBefore: 'In Collaboration with ',
  lineHighlight: 'World-Class',
  lineAfter: ' Certifying Bodies',
  logos: [
    { alt: 'Google', src: '/images/hero/google.png' },
    { alt: 'Stanford', src: '/images/hero/stanford.png' },
    { alt: 'IBM', src: '/images/hero/ibm.png' },
    { alt: 'Infosys', src: '/images/hero/infosys.png' },
    { alt: 'Claude', src: '/images/hero/google.png' },
    { alt: 'Capgemini', src: '/images/hero/google.png' },
    { alt: 'Deloitte', src: '/images/hero/google.png' },
    { alt: 'TCS', src: '/images/hero/tcs.png' },
  ],
};

function createCategory(
  slug: string,
  breadcrumbLabel: string,
  titleAccent: string,
  subheading: string,
): CategoryPageContent {
  return {
    slug,
    breadcrumbLabel,
    titlePrefix: 'Master',
    titleAccent,
    subheading,
    heroImage: {
      src: '/images/category/agile-scrum-hero.png',
      alt: `${breadcrumbLabel} training and certification programs`,
    },
    primaryCta: { href: '#courses', label: 'Explore Courses' },
    secondaryCta: { href: '/contact', label: 'Get Free Career Guidance' },
    reviews: DEFAULT_REVIEWS,
    collaboration: DEFAULT_COLLABORATION,
  };
}

const CATEGORIES: Record<string, CategoryPageContent> = {
  'agile-and-scrum': createCategory(
    'agile-and-scrum',
    'Agile and Scrum',
    'Agile and Scrum',
    'Join 50,000+ professionals who have transformed their project delivery with our expert-led Scrum certifications.',
  ),
  'product-management': createCategory(
    'product-management',
    'Product Management',
    'Product Management',
    'Join 50,000+ professionals who have built world-class products with our expert-led product management programs.',
  ),
  devops: createCategory(
    'devops',
    'DevOps',
    'DevOps',
    'Join 50,000+ professionals who have accelerated delivery pipelines with our expert-led DevOps certifications.',
  ),
  'interview-bootcamp': createCategory(
    'interview-bootcamp',
    'Interview Bootcamp',
    'Interview Bootcamp',
    'Join 50,000+ professionals who have cracked top tech interviews with our expert-led interview prep programs.',
  ),
  'software-testing': createCategory(
    'software-testing',
    'Software Testing',
    'Software Testing',
    'Join 50,000+ professionals who have mastered quality engineering with our expert-led software testing courses.',
  ),
  'it-service': createCategory(
    'it-service',
    'IT Service & Infrastructure',
    'IT Service & Infrastructure',
    'Join 50,000+ professionals who have advanced their IT service careers with our expert-led infrastructure programs.',
  ),
};

export function getCategoryBySlug(slug: string): CategoryPageContent | undefined {
  return CATEGORIES[slug];
}

export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORIES);
}

export const categoryHrefByCourseCategory: Record<string, string> = {
  'agile-scrum': '/categories/agile-and-scrum',
  product: '/categories/product-management',
  devops: '/categories/devops',
  interview: '/categories/interview-bootcamp',
  testing: '/categories/software-testing',
  'it-service': '/categories/it-service',
};

export function getCategoryHref(courseCategory: string): string {
  return categoryHrefByCourseCategory[courseCategory] ?? '/categories/agile-and-scrum';
}
