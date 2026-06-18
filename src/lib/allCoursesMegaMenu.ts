import { getAllCategorySlugs, getCategoryBySlug } from '@/lib/categories';
import { getCourseHref } from '@/lib/courses';
import {
  getTechnicalCourseHref,
  PRIMARY_TECHNICAL_COURSE_SLUG,
  TECHNICAL_MEGA_MENU_COURSES,
} from '@/lib/technicalCourses';

export type MegaMenuCourse = {
  label: string;
  href: string;
};

export type MegaMenuCategory = {
  slug: string;
  label: string;
  href: string;
  courses: MegaMenuCourse[];
};

const COURSE_NAMES_BY_SLUG: Record<string, string[]> = {
  'agile-and-scrum': [
    'Certified Scrum Master (CSM)',
    'Certified Scrum Product Owner (CSPO)',
    'SAFe Agilist Certification',
    'Professional Scrum Master (PSM)',
    'Kanban System Design',
    'Agile Coaching Certification',
    'Leading SAFe (SAFe Agilist)',
    'ICAgile Certified Professional',
  ],
  'product-management': [
    'Product Management Fundamentals',
    'Product Strategy & Roadmapping',
    'Product Analytics & Metrics',
    'UX for Product Managers',
    'Agile Product Ownership',
    'Go-to-Market Strategy',
    'Product Leadership Program',
  ],
  devops: [
    'DevOps Foundation Certification',
    'Docker & Kubernetes Mastery',
    'CI/CD Pipeline Engineering',
    'AWS DevOps Engineer',
    'Infrastructure as Code (Terraform)',
    'Site Reliability Engineering (SRE)',
    'Azure DevOps Certification',
  ],
  'interview-bootcamp': [
    'Full Stack Interview Bootcamp',
    'Data Structures & Algorithms',
    'System Design Interview Prep',
    'Behavioral Interview Mastery',
    'Mock Interview Program',
    'FAANG Interview Preparation',
  ],
  'software-testing': [
    'Selenium Automation Testing',
    'API Testing with Postman',
    'Performance Testing (JMeter)',
    'ISTQB Foundation Level',
    'Mobile App Testing',
    'Test Automation Framework Design',
  ],
  'it-service': [
    'ITIL 4 Foundation',
    'IT Service Management (ITSM)',
    'Cloud Infrastructure Management',
    'Service Desk Operations',
    'IT Governance & Compliance',
    'Enterprise Infrastructure Architecture',
  ],
};

export function getAllCoursesMegaMenuData(): MegaMenuCategory[] {
  const categories = getAllCategorySlugs().map((slug) => {
    const category = getCategoryBySlug(slug)!;
    const courseNames = COURSE_NAMES_BY_SLUG[slug] ?? [];

    return {
      slug,
      label: category.breadcrumbLabel,
      href: `/categories/${slug}`,
      courses: courseNames.map((label) => ({
        label,
        href: getCourseHref(slug, label),
      })),
    };
  });

  return [
    ...categories,
    {
      slug: 'technical-courses',
      label: 'Technical Course',
      href: getTechnicalCourseHref(PRIMARY_TECHNICAL_COURSE_SLUG),
      courses: TECHNICAL_MEGA_MENU_COURSES.map((course) => ({
        label: course.label,
        href: getTechnicalCourseHref(course.slug),
      })),
    },
  ];
}
