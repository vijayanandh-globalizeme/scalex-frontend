export const BOOTCAMP_NAV_ITEMS = [
  { id: "overview", label: "Overview", href: "#overview" },
  { id: "course-content", label: "Course Content", href: "#course-content" },
  {
    id: "career-transformations",
    label: "Career Transformations",
    href: "#career-transformations",
  },
  { id: "skill-and-tool", label: "Skills & Tools", href: "#skill-and-tool" },
  { id: "roadmap", label: "Roadmap", href: "#roadmap" },
  { id: "schedules", label: "Schedules", href: "#schedules" },
  { id: "trainers", label: "Trainers", href: "#trainers" },
  { id: "reviews", label: "Reviews", href: "#reviews" },
  { id: "faqs", label: "FAQs", href: "#faqs" },
] as const;

export const COURSE_NAV_ITEMS = [
  { id: "overview", label: "Overview", href: "#overview" },
  { id: "course-content", label: "Course Content", href: "#course-content" },
  { id: "schedules", label: "Schedules", href: "#schedules" },
  { id: "eligibility", label: "Eligibility", href: "#eligibility" },
  { id: "trainers", label: "Trainers", href: "#trainers" },
  { id: "reviews", label: "Reviews", href: "#reviews" },
  { id: "faqs", label: "FAQs", href: "#faqs" },
  { id: "why-scalex", label: "Why ScaleX", href: "#why-scalex" },
] as const;

export type CourseNavItem = { id: string; label: string; href: string };
