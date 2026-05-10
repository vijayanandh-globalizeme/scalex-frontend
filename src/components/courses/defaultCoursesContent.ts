import type { CoursesSectionProps } from './CoursesSection';

const placeholderImage = '/images/course/course-1.png';

export const defaultCoursesContent: CoursesSectionProps = {
  heading: 'Master the Skills that Scale Your Career',
  subheading: 'Find the right course that leaps your career',
  initialTabId: 'all',
  initialVisibleCount: 6,
  loadMoreStep: 6,
  viewMoreLabel: 'View More Courses',
  currencySymbol: '₹',
  tabs: [
    { id: 'all', label: 'All Courses' },
    { id: 'agile-scrum', label: 'Agile and Scrum' },
    { id: 'product', label: 'Product Management' },
    { id: 'interview', label: 'Interview Bootcamp' },
    { id: 'devops', label: 'DevOps' },
    { id: 'testing', label: 'Software Testing' },
    { id: 'it-service', label: 'IT Service & Infrastructure' },
  ],
  courses: Array.from({ length: 12 }).map((_, i) => ({
    id: `course-${i + 1}`,
    category: i % 5 === 0 ? 'product' : i % 4 === 0 ? 'devops' : 'agile-scrum',
    categoryLabel:
      i % 5 === 0 ? 'Product Management' : i % 4 === 0 ? 'DevOps' : 'Agile and Scrum',
    title: 'Certified Scrum Master',
    imageSrc: placeholderImage,
    imageAlt: 'Certified Scrum Master training class',
    rating: 4.8,
    hours: 16,
    learners: '75K+ Learners',
    price: 12999,
    originalPrice: 18999,
    savePercent: 40,
    slotsLeft: 4,
    href: '/courses/certified-scrum-master',
  })),
};
