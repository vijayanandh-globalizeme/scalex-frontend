import type { CoursesSectionProps } from './CoursesSection';

export const defaultCoursesContent: Omit<CoursesSectionProps, 'layoutCategories'> = {
  heading:            'Build the Right Skills for Your Career',
  subheading:         'Explore courses designed to help you learn, grow and move forward',
  initialVisibleCount: 6,
  loadMoreStep:        6,
  viewMoreLabel:       'View More Courses',
  currencySymbol:      '₹',
};
