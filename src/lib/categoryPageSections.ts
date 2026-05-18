export type ExploreCategoryItem = {
  id: string;
  label: string;
  href: string;
  /** Solid circle fill behind the white briefcase icon */
  iconBg: string;
};

export type RelatedBlogItem = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  href: string;
  variant: 'default' | 'solid-red' | 'solid-tan' | 'solid-teal' | 'image-middle';
  imageSrc?: string;
  authorAvatar?: string;
};

export const EXPERT_CTA = {
  headingLines: [
    'Engage in a discussion with industry experts',
    'and receive personalized mentorship.',
  ],
  subheading: 'Our mission is to empower your growth and guide you toward a successful future.',
  cta: { href: '/contact', label: 'Generate An Expert Callback' },
  image: { src: '/images/category/person-3.png', alt: 'Industry expert ready to mentor learners' },
};

export const EXPLORE_ALL_CATEGORIES = {
  heading: 'Explore All Categories',
  subheading:
    'Dive into specialized categories and find the specific guidance you need to master your field.',
  items: [
    { id: 'pm', label: 'Project Management', href: '/categories/agile-and-scrum', iconBg: '#E95A58' },
    { id: 'interview', label: 'Interview Bootcamp', href: '/categories/interview-bootcamp', iconBg: '#7C3AED' },
    { id: 'devops', label: 'DevOps', href: '/categories/devops', iconBg: '#2563EB' },
    { id: 'testing', label: 'Software Testing', href: '/categories/software-testing', iconBg: '#0D9488' },
    { id: 'it', label: 'IT Service Management', href: '/categories/it-service', iconBg: '#1E293B' },
    { id: 'agile', label: 'Agile Management', href: '/categories/agile-and-scrum', iconBg: '#16A34A' },
    { id: 'product', label: 'Product Management', href: '/categories/product-management', iconBg: '#2563EB' },
    { id: 'cloud', label: 'Cloud Computing', href: '/categories/devops', iconBg: '#0D9488' },
    { id: 'data', label: 'Big Data', href: '/categories/software-testing', iconBg: '#7C3AED' },
    { id: 'security', label: 'IT Security and Ethical Hacking', href: '/categories/devops', iconBg: '#1E293B' },
    { id: 'analytics', label: 'Business Analytics', href: '/categories/product-management', iconBg: '#16A34A' },
    { id: 'pm-2', label: 'Project Management', href: '/categories/agile-and-scrum', iconBg: '#E95A58' },
    { id: 'interview-2', label: 'Interview Bootcamp', href: '/categories/interview-bootcamp', iconBg: '#7C3AED' },
    { id: 'devops-2', label: 'DevOps', href: '/categories/devops', iconBg: '#2563EB' },
    { id: 'testing-2', label: 'Software Testing', href: '/categories/software-testing', iconBg: '#0D9488' },
    { id: 'it-2', label: 'IT Service Management', href: '/categories/it-service', iconBg: '#1E293B' },
  ] satisfies ExploreCategoryItem[],
};

/** Column-major order per page: col1-top, col2-top, col3-top, col1-bottom, col2-bottom, col3-bottom */
export const RELATED_BLOGS = {
  heading: 'Related Blogs',
  subheading:
    'Go deeper into specialized topics with our latest blog posts, designed to help you navigate your career path with confidence.',
  items: [
    {
      id: 'blog-1',
      title: 'What is divide and conquer in Agile?',
      excerpt:
        'Learn how divide and conquer helps Agile teams break complex work into manageable pieces and deliver value faster.',
      author: 'JOHN WILLIAMS',
      date: '12 May 2026',
      href: '#',
      variant: 'default',
      imageSrc: '/images/course/course-1.png',
    },
    {
      id: 'blog-2',
      title: 'A Day in the life of the Scrum Master',
      excerpt:
        'Learn how divide and conquer helps Agile teams break complex work into manageable pieces and deliver value faster.',
      author: 'JOHN WILLIAMS',
      date: '12 May 2026',
      href: '#',
      variant: 'solid-red',
    },
    {
      id: 'blog-3',
      title: 'Advanced Certified Scrum Master',
      excerpt:
        'Learn how divide and conquer helps Agile teams break complex work into manageable pieces and deliver value faster.',
      author: 'JOHN WILLIAMS',
      date: '12 May 2026',
      href: '#',
      variant: 'image-middle',
      imageSrc: '/images/course/course-1.png',
    },
    {
      id: 'blog-4',
      title: 'To grow the revenue of your Business',
      excerpt:
        'Learn how divide and conquer helps Agile teams break complex work into manageable pieces and deliver value faster.',
      author: 'JOHN WILLIAMS',
      date: '12 May 2026',
      href: '#',
      variant: 'solid-tan',
    },
    {
      id: 'blog-5',
      title: 'Advanced Certified Scrum Master',
      excerpt:
        'Learn how divide and conquer helps Agile teams break complex work into manageable pieces and deliver value faster.',
      author: 'JOHN WILLIAMS',
      date: '12 May 2026',
      href: '#',
      variant: 'default',
      imageSrc: '/images/course/course-1.png',
    },
    {
      id: 'blog-6',
      title: 'To grow the revenue of your Business',
      excerpt:
        'Learn how divide and conquer helps Agile teams break complex work into manageable pieces and deliver value faster.',
      author: 'JOHN WILLIAMS',
      date: '12 May 2026',
      href: '#',
      variant: 'solid-teal',
    },
    {
      id: 'blog-7',
      title: 'What is divide and conquer in Agile?',
      excerpt:
        'Discover proven patterns for aligning multiple squads without losing speed or autonomy.',
      author: 'JOHN WILLIAMS',
      date: '10 May 2026',
      href: '#',
      variant: 'default',
      imageSrc: '/images/course/course-1.png',
    },
    {
      id: 'blog-8',
      title: 'A Day in the life of the Scrum Master',
      excerpt:
        'Discover proven patterns for aligning multiple squads without losing speed or autonomy.',
      author: 'JOHN WILLIAMS',
      date: '10 May 2026',
      href: '#',
      variant: 'solid-red',
    },
    {
      id: 'blog-9',
      title: 'Advanced Certified Scrum Master',
      excerpt:
        'Discover proven patterns for aligning multiple squads without losing speed or autonomy.',
      author: 'JOHN WILLIAMS',
      date: '10 May 2026',
      href: '#',
      variant: 'image-middle',
      imageSrc: '/images/course/course-1.png',
    },
    {
      id: 'blog-10',
      title: 'To grow the revenue of your Business',
      excerpt:
        'Discover proven patterns for aligning multiple squads without losing speed or autonomy.',
      author: 'JOHN WILLIAMS',
      date: '10 May 2026',
      href: '#',
      variant: 'solid-tan',
    },
    {
      id: 'blog-11',
      title: 'Advanced Certified Scrum Master',
      excerpt:
        'Discover proven patterns for aligning multiple squads without losing speed or autonomy.',
      author: 'JOHN WILLIAMS',
      date: '10 May 2026',
      href: '#',
      variant: 'default',
      imageSrc: '/images/course/course-1.png',
    },
    {
      id: 'blog-12',
      title: 'To grow the revenue of your Business',
      excerpt:
        'Discover proven patterns for aligning multiple squads without losing speed or autonomy.',
      author: 'JOHN WILLIAMS',
      date: '10 May 2026',
      href: '#',
      variant: 'solid-teal',
    },
  ] satisfies RelatedBlogItem[],
};
