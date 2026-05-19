import type { Course } from '@/components/courses/CoursesSection';
const placeholderImage = '/images/course/course-1.png';

const SLUG_TO_COURSE_CATEGORY: Record<string, string> = {
  'agile-and-scrum': 'agile-scrum',
  'product-management': 'product',
  devops: 'devops',
  'interview-bootcamp': 'interview',
  'software-testing': 'testing',
  'it-service': 'it-service',
};

function buildCategoryCourses(categoryId: string, categoryLabel: string): Course[] {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: `${categoryId}-course-${i + 1}`,
    category: categoryId,
    categoryLabel,
    title: 'Certified Scrum Master',
    imageSrc: placeholderImage,
    imageAlt: `${categoryLabel} certification training class`,
    rating: 4.8,
    hours: 16,
    learners: '75K+ Learners',
    price: 12999,
    originalPrice: 18999,
    savePercent: 40,
    slotsLeft: 4,
    href: '#courses',
  }));
}

export function getCategoryCoursesHeading(breadcrumbLabel: string): string {
  return `Explore all ${breadcrumbLabel} Certification Courses`;
}

export const CATEGORY_COURSES_SUBHEADING = 'Find the right course that leaps your career';

export function getCoursesForCategorySlug(slug: string, categoryLabel: string): Course[] {
  const categoryId = SLUG_TO_COURSE_CATEGORY[slug] ?? 'agile-scrum';
  return buildCategoryCourses(categoryId, categoryLabel);
}
