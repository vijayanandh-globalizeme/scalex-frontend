import type { CoursesSectionProps } from './CoursesSection';

export const defaultCoursesContent: Omit<CoursesSectionProps, 'layoutCategories'> = {
  heading:            'Master the Skills that Scale Your Career',
  subheading:         'Find the right course that leaps your career',
  initialVisibleCount: 6,
  loadMoreStep:        6,
  viewMoreLabel:       'View More Courses',
  currencySymbol:      '₹',
};
