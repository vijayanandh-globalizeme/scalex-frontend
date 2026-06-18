import type { CoursePartnerLogo } from '@/lib/courses';
import type { Course as RelatedCourse } from '@/components/courses/CoursesSection';

export interface CourseAboutCertificationContent {
  title: string;
  learningObjectives: { heading: string; paragraphs: string[] };
  topicsCovered: { heading: string; paragraphs: string[] };
  sideHeading: { heading: string; paragraphs: string[] };
}

export interface CourseRelatedCoursesContent {
  title: string;
  currencySymbol: string;
  courses: RelatedCourse[];
}

export interface CourseTrainingCity {
  id: string;
  label: string;
  href: string;
}

export interface CourseTrainingCitiesContent {
  title: string;
  cities: CourseTrainingCity[];
}

export interface CourseNavItem {
  id: string;
  label: string;
  href: string;
}

export interface CourseStandoutFeature {
  id: string;
  title: string;
  description: string;
}

export interface CourseCareerTab {
  id: string;
  label: string;
  salary: { min: string; average: string; max: string };
  demandPercent: number;
  demandLabel: string;
  companies: CoursePartnerLogo[];
}

export interface CourseModule {
  id: string;
  title: string;
  learningObjectives: string[];
  topicsCovered: string[];
}

export interface CourseScheduleFilter {
  id: string;
  label: string;
  type: 'toggle' | 'dropdown';
}

export interface CourseScheduleItem {
  id: string;
  badge: string;
  dateRange: string;
  time: string;
  batchType: { title: string; subtitle: string };
  timeSlot: { title: string; subtitle: string };
  trainerName: string;
  discountPercent: number;
  price: number;
  originalPrice: number;
  slotsLeft: number;
}

export interface CoursePlanTier {
  id: string;
  name: string;
  discountPercent: number;
  price: number;
  originalPrice: number;
  enrollLabel: string;
  highlighted?: boolean;
}

export interface CoursePlanFeature {
  id: string;
  label: string;
  standard: boolean;
  elite: boolean;
}

export interface CoursePlanComparisonContent {
  titleLine1: string;
  subtitle: string;
  extraAmount: number;
  standardPlan: CoursePlanTier;
  elitePlan: CoursePlanTier;
  features: CoursePlanFeature[];
  featuresColumnLabel: string;
}

export interface CourseEligibilityRequirementItem {
  id: string;
  title: string;
  description: string;
  icon: 'forbidden' | 'book' | 'bulb';
}

export interface CourseEligibilityRequirementsContent {
  title: string;
  subtitle: string;
  items: CourseEligibilityRequirementItem[];
  certificateImageSrc: string;
  certificateImageAlt: string;
  idealForTitle: string;
  idealForRoles: string[];
  idealForImageSrc: string;
  idealForImageAlt: string;
}

export interface CourseReviewTab {
  id: string;
  label: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface CourseLearnerReview {
  id: string;
  title: string;
  quote: string;
  readOnLabel: string;
  readOnLogoSrc: string;
  readOnLogoAlt: string;
  readOnHref: string;
  name: string;
  role: string;
  avatarSrc: string;
  rating: number;
  platform: 'all' | 'google' | 'trustpilot';
}

export interface CourseReviewVideo {
  thumbnailSrc: string;
  thumbnailAlt: string;
  videoUrl?: string;
}

export interface CoursePlatformRating {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  rating: string;
  reviewsLabel: string;
}

export interface CourseReviewsContent {
  title: string;
  tabs: CourseReviewTab[];
  video: CourseReviewVideo;
  reviews: CourseLearnerReview[];
  platformRatings: CoursePlatformRating[];
}

export interface CourseAwardCard {
  id: string;
  title: string;
  subtitle: string;
  variant: 'gold' | 'red' | 'teal';
}

export interface CourseAwardsContent {
  title: string;
  cards: CourseAwardCard[];
}

export interface CourseCredentialFeature {
  id: string;
  title: string;
  description: string;
}

export interface CourseCredentialsContent {
  title: string;
  subtitle: string;
  certificateImageSrc: string;
  certificateImageAlt: string;
  features: CourseCredentialFeature[];
}

export interface CourseFaqItem {
  id: string;
  question: string;
  learningObjectives: string[];
  topicsCovered: string[];
}

export interface CourseFaqTab {
  id: string;
  label: string;
  items: CourseFaqItem[];
}

export interface CourseFaqsContent {
  title: string;
  viewMoreLabel: string;
  viewMoreHref: string;
  tabs: CourseFaqTab[];
}

export interface CourseTrainer {
  id: string;
  name: string;
  title: string;
  bio: string;
  associationLabel: string;
  associationLogoSrc: string;
  associationLogoAlt: string;
  experience: string;
  linkedinHref: string;
  imageSrc: string;
  imageAlt: string;
}

export interface CourseTrainersContent {
  title: string;
  trainers: CourseTrainer[];
  cta?: {
    headingLines: string[];
    ctaLabel: string;
    ctaHref: string;
    imageSrc: string;
    imageAlt: string;
  };
}

export interface CourseSchedulesContent {
  title: string;
  guaranteeBadge: string;
  filters: CourseScheduleFilter[];
  items: CourseScheduleItem[];
  bannerAfterIndex: number;
  batchBanner: {
    headingLines: string[];
    ctaLabel: string;
    ctaHref: string;
    imageSrc: string;
    imageAlt: string;
  };
  trustLabels: string[];
  viewMoreLabel: string;
  viewMoreHref: string;
  enrollLabel: string;
}

export interface CareerTransformationStory {
  id: string;
  name: string;
  quote: string;
  hikePercent: number;
  imageSrc: string;
  imageAlt: string;
  before: {
    role: string;
    companyLogoSrc: string;
    companyLogoAlt: string;
  };
  after: {
    role: string;
    companyLogoSrc: string;
    companyLogoAlt: string;
  };
}

export interface CourseCareerTransformationsContent {
  title: string;
  subtitle: string;
  stories: CareerTransformationStory[];
}

export interface CourseSkillItem {
  name: string;
  category: string;
}

export interface CourseToolItem {
  name: string;
  logoSrc: string;
  logoAlt: string;
}

export interface CourseSkillsToolsContent {
  title: string;
  subtitle: string;
  skillsTitle: string;
  toolsTitle: string;
  skills: CourseSkillItem[];
  tools: CourseToolItem[];
  toolRows?: number;
}

export type ProgramRoadmapStageTheme = 'learning' | 'interview' | 'placement';

export interface ProgramRoadmapProject {
  company: string;
  projectName: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface ProgramRoadmapPlacementFeature {
  title: string;
  description: string;
}

export interface ProgramRoadmapStage {
  id: string;
  stageNumber: string;
  trackLabel: string;
  description: string;
  theme: ProgramRoadmapStageTheme;
  contentHeading: string;
  highlights?: string[];
  projects?: ProgramRoadmapProject[];
  topics?: string[];
  showMoreLabel?: string;
  placementFeatures?: ProgramRoadmapPlacementFeature[];
  hiringPartnersTitle?: string;
  hiringPartnerLogos?: { src: string; alt: string }[];
  nextStageLabel?: string;
  nextStageId?: string;
}

export interface CourseProgramRoadmapContent {
  title: string;
  subtitle: string;
  stages: ProgramRoadmapStage[];
}

export interface CourseFeeFeature {
  title: string;
  description: string;
}

export interface CourseFeePartnerLogo {
  name: string;
  logoSrc?: string;
  logoAlt?: string;
}

export interface CourseFeePricingOption {
  id: string;
  label: string;
  price: string;
  priceSuffix?: string;
  description: string;
  enrollLabel: string;
  highlighted?: boolean;
  badge?: string;
}

export interface CourseFeeContent {
  title: string;
  subtitle: string;
  advisorCtaLabel: string;
  advisorPhone: string;
  infoHeading: string;
  features: CourseFeeFeature[];
  partnersLabel: string;
  partnerLogos: CourseFeePartnerLogo[];
  pricingOptions: CourseFeePricingOption[];
}

export interface CourseCareerAssuranceFeature {
  id: string;
  label: string;
}

export interface CourseCareerAssuranceContent {
  brandTitle: string;
  subheading: string;
  features: CourseCareerAssuranceFeature[];
  ctaLabel: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
}

export interface CourseWebinarCtaContent {
  headingLines: string[];
  ctaLabel: string;
  ctaHref: string;
  countdownLabel: string;
  imageSrc: string;
  imageAlt: string;
}

export interface CourseBodyContent {
  navItems: CourseNavItem[];
  phone: string;
  overview: {
    title: string;
    downloadGuideLabel: string;
    description: string;
    standoutTitle: string;
    features: CourseStandoutFeature[];
    skillsTitle: string;
    skills: string[];
  };
  career: {
    title: string;
    salarySubtitle: string;
    companiesSubtitle: string;
    demandSubtitle: string;
    salaryBadge: string;
    companiesBadge: string;
    demandBadge: string;
    tabs: CourseCareerTab[];
  };
  careerTransformations?: CourseCareerTransformationsContent;
  skillsTools?: CourseSkillsToolsContent;
  programRoadmap?: CourseProgramRoadmapContent;
  courseFee?: CourseFeeContent;
  careerAssurance?: CourseCareerAssuranceContent;
  webinarCta?: CourseWebinarCtaContent;
  courseContent: {
    title: string;
    downloadSyllabusLabel: string;
    viewMoreLabel: string;
    viewMoreHref: string;
    modules: CourseModule[];
  };
  schedules: CourseSchedulesContent;
  planComparison: CoursePlanComparisonContent;
  trainers: CourseTrainersContent;
  eligibilityRequirements: CourseEligibilityRequirementsContent;
  reviews: CourseReviewsContent;
  awards: CourseAwardsContent;
  credentials: CourseCredentialsContent;
  faqs: CourseFaqsContent;
  expertCta: {
    headingLines: string[];
    ctaLabel: string;
    ctaHref: string;
    imageSrc: string;
    imageAlt: string;
  };
  aboutCertification: CourseAboutCertificationContent;
  relatedCourses: CourseRelatedCoursesContent;
  trainingCities: CourseTrainingCitiesContent;
  sidebar: {
    assistTitle: string;
    purposes: { id: string; label: string }[];
    termsHref: string;
    privacyHref: string;
    ctaLabel: string;
    brochureText: string;
    brochureCtaLabel: string;
    mentorship: {
      title: string;
      phone: string;
      imageSrc: string;
      imageAlt: string;
    };
  };
}

const HIRING_COMPANIES: CoursePartnerLogo[] = [
  { id: 'claude', name: 'Claude', logoSrc: '/images/course/claude.png', logoAlt: 'Claude' },
  { id: 'google', name: 'Google', logoSrc: '/images/course/google.png', logoAlt: 'Google' },
  { id: 'amazon', name: 'Amazon', logoSrc: '/images/course/amazon.png', logoAlt: 'Amazon' },
  { id: 'ibm', name: 'IBM', logoSrc: '/images/course/ibm.png', logoAlt: 'IBM' },
  { id: 'walmart', name: 'Walmart', logoSrc: '/images/course/walmart.png', logoAlt: 'Walmart' },
  { id: 'sapient', name: 'Sapient', logoSrc: '/images/course/sapient.png', logoAlt: 'Sapient' },
  { id: 'hsbc', name: 'HSBC', logoSrc: '/images/course/hsbc.png', logoAlt: 'HSBC' },
  { id: 'accenture', name: 'Accenture', logoSrc: '/images/course/accenture.png', logoAlt: 'Accenture' },
];

const CSM_TRAINING_CITIES = ['Pune', 'Mumbai', 'Hyderabad', 'Delhi', 'Jharkhand'];

const CSM_RELATED_COURSES: RelatedCourse[] = Array.from({ length: 6 }).map((_, index) => ({
  id: `csm-related-${index + 1}`,
  category: 'agile-scrum',
  categoryLabel: 'Agile & Scrum',
  title: 'Advanced Certified Scrum Master',
  imageSrc: '/images/course/course-1.png',
  imageAlt: 'Advanced Certified Scrum Master training session',
  rating: 4.8,
  hours: 16,
  learners: '75K+ Learners',
  price: 12999,
  originalPrice: 18999,
  savePercent: 40,
  slotsLeft: 4,
  href: '/courses/certified-scrum-master',
}));

const CSM_BODY: CourseBodyContent = {
  navItems: [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'course-content', label: 'Course Content', href: '#course-content' },
    { id: 'schedules', label: 'Schedules', href: '#schedules' },
    { id: 'eligibility', label: 'Eligibility', href: '#eligibility' },
    { id: 'trainers', label: 'Trainers', href: '#trainers' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'faqs', label: 'FAQs', href: '#faqs' },
    { id: 'why-scalex', label: 'Why ScaleX', href: '#why-scalex' },
  ],
  phone: '+91-9848032919',
  overview: {
    title: 'CSM Course Overview',
    downloadGuideLabel: 'Download Free Guide',
    description:
      'Accelerate your career with ScaleX’s expert-led Certified Scrum Master (CSM) program. Delivered by globally renowned CSTs, this immersive training equips you with real-world Scrum mechanics to build high-performing teams, resolve engineering bottlenecks, and unlock high-growth international leadership opportunities.',
    standoutTitle: 'Most Standout Features',
    features: [
      {
        id: 'hours',
        title: '16 Hours of Live Training',
        description: 'Interactive CST-led sessions with breakout activities and Q&A.',
      },
      {
        id: 'exam',
        title: 'All-Inclusive Exam Fee',
        description: 'CSM exam voucher included — no hidden certification costs.',
      },
      {
        id: 'learning',
        title: 'Immersive Hands-on Learning',
        description: 'Role-plays, simulations, and case studies for practical mastery.',
      },
      {
        id: 'credits',
        title: 'Instant Academic Credits',
        description: 'Earn 16 SEUs and 20 PDUs upon successful completion.',
      },
      {
        id: 'community',
        title: '2 Year Community Access',
        description: 'Scrum Alliance membership with global practitioner network.',
      },
      {
        id: 'value',
        title: '₹40,000+ Value Additions',
        description: 'Free guides, mock tests, and post-training mentorship support.',
      },
    ],
    skillsTitle: 'Skills Covered',
    skills: [
      'Scrum Framework Application',
      'Sprint Planning & Delivery',
      'Agile Team Facilitation',
      'Servant Leadership',
      'Impediment Removal',
      'Stakeholder Collaboration',
      'Product Backlog Refinement',
      'Continuous Improvement',
      'Agile Metrics & Reporting',
    ],
  },
  career: {
    title: 'Accelerate Your Career with Scrum',
    salarySubtitle: 'Annual Salary in India (INR)',
    companiesSubtitle: 'Leading Organizations',
    demandSubtitle: 'CSM Professionals',
    salaryBadge: 'Competitive Salaries for In-Demand Skills',
    companiesBadge: 'Across Industries . Global Opportunities',
    demandBadge: 'Proven. Preferred. In Demand',
    tabs: [
      {
        id: 'scrum-master',
        label: 'Scrum Master',
        salary: { min: '₹70K', average: '₹80K', max: '₹120K' },
        demandPercent: 87,
        demandLabel: 'of Agile Practitioners\nuse Scrum',
        companies: HIRING_COMPANIES,
      },
      {
        id: 'senior-scrum-master',
        label: 'Senior Scrum Master',
        salary: { min: '₹95K', average: '₹110K', max: '₹150K' },
        demandPercent: 82,
        demandLabel: 'of Agile teams need senior Scrum leadership',
        companies: HIRING_COMPANIES,
      },
      {
        id: 'chief-scrum-master',
        label: 'Chief Scrum Master',
        salary: { min: '₹120K', average: '₹140K', max: '₹180K' },
        demandPercent: 76,
        demandLabel: 'of enterprises scale Agile via Scrum Masters',
        companies: HIRING_COMPANIES,
      },
    ],
  },
  courseContent: {
    title: 'Course Content',
    downloadSyllabusLabel: 'Download Syllabus',
    viewMoreLabel: 'View More Courses',
    viewMoreHref: '/categories/agile-and-scrum',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Agile and Scrum Overview',
        learningObjectives: [
          'Understand the Agile Manifesto, Scrum values, and how Scrum fits within modern product delivery.',
          'Learn the roles, events, and artifacts that make Scrum effective in cross-functional teams.',
        ],
        topicsCovered: [
          'Agile principles and Scrum theory',
          'Empirical process control',
          'Scrum roles (Product Owner, Scrum Master, Developers)',
          'Scrum events and ceremonies',
          'Scrum artifacts including Product Backlog and Definition of Done',
        ],
      },
      {
        id: 'module-2',
        title: 'Module 2: Scrum Roles: What they are?',
        learningObjectives: [
          'Define the responsibilities of the Product Owner, Scrum Master, and Developers.',
          'Understand how each role collaborates to deliver value every sprint.',
        ],
        topicsCovered: [
          'Product Owner accountability',
          'Scrum Master as servant leader',
          'Developer team self-organization',
          'Role interactions and boundaries',
        ],
      },
      {
        id: 'module-3',
        title: 'Module 3: Conduct Scrum Ceremonies',
        learningObjectives: [
          'Facilitate sprint planning, daily Scrum, review, and retrospective effectively.',
          'Apply best practices to keep ceremonies time-boxed and outcome-focused.',
        ],
        topicsCovered: [
          'Sprint planning and goal setting',
          'Daily Scrum facilitation',
          'Sprint review with stakeholders',
          'Sprint retrospective techniques',
        ],
      },
      {
        id: 'module-4',
        title: 'Module 4: Continued Environment',
        learningObjectives: [
          'Create a team environment that supports transparency, inspection, and adaptation.',
          'Identify and remove impediments that block team progress.',
        ],
        topicsCovered: [
          'Building psychological safety',
          'Impediment removal strategies',
          'Team collaboration practices',
          'Continuous improvement culture',
        ],
      },
      {
        id: 'module-5',
        title: 'Module 5: Scaling Scrum',
        learningObjectives: [
          'Understand patterns for scaling Scrum across multiple teams and departments.',
          'Learn how to align teams toward shared product goals at scale.',
        ],
        topicsCovered: [
          'Scrum of Scrums basics',
          'Nexus and LeSS overview',
          'Enterprise Agile alignment',
          'Dependencies and coordination',
        ],
      },
      {
        id: 'module-6',
        title: 'Module 6: Real World Application of Scrum',
        learningObjectives: [
          'Apply Scrum practices to real-world scenarios through case studies and simulations.',
          'Prepare confidently for the CSM certification exam with mock questions and study tips.',
        ],
        topicsCovered: [
          'Industry case studies',
          'Role-play simulations',
          'CSM exam structure and format',
          'Sample questions and study strategies',
        ],
      },
    ],
  },
  schedules: {
    title: 'Upcoming Schedules',
    guaranteeBadge: '100% Money Back Guarantee',
    filters: [
      { id: 'this-month', label: 'This Month', type: 'toggle' },
      { id: 'next-month', label: 'Next Month', type: 'toggle' },
      { id: 'weekends', label: 'Weekends', type: 'toggle' },
      { id: 'weekdays', label: 'Weekdays', type: 'toggle' },
      { id: 'time-slot', label: 'Time Slot', type: 'dropdown' },
      { id: 'month', label: 'Month', type: 'dropdown' },
    ],
    items: [
      {
        id: 'schedule-1',
        badge: 'LIVE VIRTUAL TRAINING',
        dateRange: 'June 25 - June 26',
        time: 'IST: 9:00 AM - 6:00 PM',
        batchType: { title: 'Weekend Batch', subtitle: '2 Sessions' },
        timeSlot: { title: 'Morning Batch', subtitle: 'Start your day light' },
        trainerName: 'Praneeth Kuridi',
        discountPercent: 30,
        price: 20455,
        originalPrice: 37650,
        slotsLeft: 2,
      },
      {
        id: 'schedule-2',
        badge: 'LIVE VIRTUAL TRAINING',
        dateRange: 'July 12 - July 13',
        time: 'IST: 9:00 AM - 6:00 PM',
        batchType: { title: 'Weekend Batch', subtitle: '2 Sessions' },
        timeSlot: { title: 'Morning Batch', subtitle: 'Start your day light' },
        trainerName: 'Praneeth Kuridi',
        discountPercent: 30,
        price: 20455,
        originalPrice: 37650,
        slotsLeft: 2,
      },
      {
        id: 'schedule-3',
        badge: 'LIVE VIRTUAL TRAINING',
        dateRange: 'August 8 - August 9',
        time: 'IST: 9:00 AM - 6:00 PM',
        batchType: { title: 'Weekend Batch', subtitle: '2 Sessions' },
        timeSlot: { title: 'Morning Batch', subtitle: 'Start your day light' },
        trainerName: 'Praneeth Kuridi',
        discountPercent: 30,
        price: 20455,
        originalPrice: 37650,
        slotsLeft: 2,
      },
    ],
    bannerAfterIndex: 2,
    batchBanner: {
      headingLines: ['Do you want to customize', 'your batch request?'],
      ctaLabel: 'Request a Batch',
      ctaHref: '#contact',
      imageSrc: '/images/hero/person.png',
      imageAlt: 'Learning advisor ready to help',
    },
    trustLabels: ['Secure Payment', 'Easy Refund', '24/7 Support'],
    viewMoreLabel: 'View More Schedules',
    viewMoreHref: '#schedules',
    enrollLabel: 'Enroll Now',
  },
  planComparison: {
    titleLine1: 'Upgrade to Elite Plan by just',
    subtitle: 'Get standard plan and 10 more powerful benefits with Elite Plan.',
    extraAmount: 1256,
    standardPlan: {
      id: 'standard',
      name: 'Standard Plan',
      discountPercent: 30,
      price: 17135,
      originalPrice: 18999,
      enrollLabel: 'Enroll Now',
    },
    elitePlan: {
      id: 'elite',
      name: 'Elite Plan',
      discountPercent: 40,
      price: 20135,
      originalPrice: 28999,
      enrollLabel: 'Enroll Now',
      highlighted: true,
    },
    featuresColumnLabel: 'FEATURES',
    features: [
      { id: 'live-sessions', label: '16Hrs of Live, Instructor-Led Sessions', standard: true, elite: true },
      { id: 'membership', label: '2 Years Scrum Alliance Membership', standard: true, elite: true },
      { id: 'money-back', label: '100% Money Back Guarantee', standard: true, elite: true },
      { id: 'exam-fee', label: 'Certification Exam Fee Included', standard: true, elite: true },
      { id: 'exam-retakes', label: '2 Exam Retakes (First Exam Attempt)', standard: true, elite: true },
      { id: 'cert-plan', label: '2-Year Certification Plan', standard: true, elite: true },
      { id: 'course-material', label: 'Course Material Available for Life', standard: true, elite: true },
      { id: 'simulated-exams', label: 'Access to Premium Quality Simulated Exams', standard: true, elite: true },
      { id: 'mentorship-meetups', label: 'Post Class Mentorship Meetups', standard: false, elite: true },
      { id: 'ama-sessions', label: 'Ask Me Anything sessions with Industry Experts', standard: false, elite: true },
      { id: 'mock-sessions', label: '4 Guiding Mock Sessions by Expert', standard: false, elite: true },
      { id: 'lifetime-recordings', label: 'Lifetime Recordings of All Sessions', standard: false, elite: true },
      { id: 'guaranteed-run', label: 'Guaranteed to Run courses', standard: false, elite: true },
    ],
  },
  trainers: {
    title: 'Our Certified Scrum Trainers',
    trainers: [
      {
        id: 'trainer-1',
        name: 'Raja Vikramarka Rao',
        title: 'Certified Scrum Trainer (CST)',
        bio: 'Raja brings 20+ years of Agile coaching experience across global enterprises. He specializes in Scrum transformations, team facilitation, and helping professionals clear CSM certification with confidence.',
        associationLabel: 'ASSOCIATED WITH',
        associationLogoSrc: '/images/hero/google.png',
        associationLogoAlt: 'Claude',
        experience: 'Experience 20+ Years',
        linkedinHref: 'https://www.linkedin.com',
        imageSrc: '/images/hero/person.png',
        imageAlt: 'Raja Vikramarka Rao',
      },
      {
        id: 'trainer-2',
        name: 'Raja Vikramarka Rao',
        title: 'Certified Scrum Trainer (CST)',
        bio: 'Raja brings 20+ years of Agile coaching experience across global enterprises. He specializes in Scrum transformations, team facilitation, and helping professionals clear CSM certification with confidence.',
        associationLabel: 'ASSOCIATED WITH',
        associationLogoSrc: '/images/hero/google.png',
        associationLogoAlt: 'Claude',
        experience: 'Experience 20+ Years',
        linkedinHref: 'https://www.linkedin.com',
        imageSrc: '/images/hero/person.png',
        imageAlt: 'Raja Vikramarka Rao',
      },
      {
        id: 'trainer-3',
        name: 'Raja Vikramarka Rao',
        title: 'Certified Scrum Trainer (CST)',
        bio: 'Raja brings 20+ years of Agile coaching experience across global enterprises. He specializes in Scrum transformations, team facilitation, and helping professionals clear CSM certification with confidence.',
        associationLabel: 'ASSOCIATED WITH',
        associationLogoSrc: '/images/hero/google.png',
        associationLogoAlt: 'Claude',
        experience: 'Experience 20+ Years',
        linkedinHref: 'https://www.linkedin.com',
        imageSrc: '/images/hero/person.png',
        imageAlt: 'Raja Vikramarka Rao',
      },
      {
        id: 'trainer-4',
        name: 'Raja Vikramarka Rao',
        title: 'Certified Scrum Trainer (CST)',
        bio: 'Raja brings 20+ years of Agile coaching experience across global enterprises. He specializes in Scrum transformations, team facilitation, and helping professionals clear CSM certification with confidence.',
        associationLabel: 'ASSOCIATED WITH',
        associationLogoSrc: '/images/hero/google.png',
        associationLogoAlt: 'Claude',
        experience: 'Experience 20+ Years',
        linkedinHref: 'https://www.linkedin.com',
        imageSrc: '/images/hero/person.png',
        imageAlt: 'Raja Vikramarka Rao',
      },
    ],
    cta: {
      headingLines: ['Ready to unlock your full potential', 'as Scrum Master?'],
      ctaLabel: 'Connect with us',
      ctaHref: '#contact',
      imageSrc: '/images/hero/person.png',
      imageAlt: 'Learning advisor ready to help',
    },
  },
  eligibilityRequirements: {
    title: 'Eligibility Requirements',
    subtitle:
      'Build a strong foundation in Agile and Scrum with beginner-friendly Certified ScrumMaster® training. No Prior Experience Required.',
    items: [
      {
        id: 'no-prerequisites',
        title: 'No Mandatory Prerequisites',
        description:
          'Anyone interested in Agile and Scrum can enroll in the Certified ScrumMaster® (CSM) training program.',
        icon: 'forbidden',
      },
      {
        id: 'basic-knowledge',
        title: 'Basic Scrum Knowledge is Helpful',
        description:
          'A general understanding of Scrum concepts and Agile methodologies can help you learn faster, but it is not compulsory.',
        icon: 'book',
      },
      {
        id: 'learn-confidence',
        title: 'Learn with Confidence',
        description:
          'Even without prior Scrum experience, our expert-led training and practical workshops make it easy to understand and apply Scrum principles effectively.',
        icon: 'bulb',
      },
    ],
    certificateImageSrc: '/images/course/csm-certificate.png',
    certificateImageAlt: 'Scrum Alliance CSM Certificate',
    idealForTitle: 'CSM Certificate Programs is ideal for:',
    idealForRoles: [
      'Project Managers',
      'Product Owners',
      'Scrum Masters',
      'Agile Coaches',
      'Business Analysts',
      'Software Developers',
      'QA & Testing Professionals',
      'Team Leads',
    ],
    idealForImageSrc: '/images/hero/person.png',
    idealForImageAlt: 'Professional in business attire',
  },
  reviews: {
    title: 'What Our Learners Saying',
    tabs: [
      { id: 'all', label: 'All Reviews' },
      {
        id: 'google',
        label: 'Google',
        logoSrc: '/images/g.png',
        logoAlt: 'Google',
      },
      {
        id: 'trustpilot',
        label: 'Trustpilot',
        logoSrc: '/images/star.png',
        logoAlt: 'Trustpilot',
      },
    ],
    video: {
      thumbnailSrc: '/images/Alex.png',
      thumbnailAlt: 'Alex video testimonial',
      videoUrl: '#',
    },
    reviews: [
      {
        id: 'review-1',
        title: 'It was a great Experience !!!',
        quote:
          'The CSM training was incredibly engaging and practical. The trainer explained complex Scrum concepts with real-world examples that I could apply immediately at work.',
        readOnLabel: 'Read on Google',
        readOnLogoSrc: '/images/hero/google.png',
        readOnLogoAlt: 'Google',
        readOnHref: '#',
        name: 'JOHN WILLIAMS',
        role: 'CEO & Co-Founder, Innotech',
        avatarSrc: '/images/hero/person.png',
        rating: 5,
        platform: 'google',
      },
      {
        id: 'review-2',
        title: 'It was a great Experience !!!',
        quote:
          'ScaleX made certification feel achievable. Live sessions, mock tests, and post-training support helped me clear the CSM exam on my first attempt.',
        readOnLabel: 'Read on Google',
        readOnLogoSrc: '/images/hero/google.png',
        readOnLogoAlt: 'Google',
        readOnHref: '#',
        name: 'JOHN WILLIAMS',
        role: 'Agile Coach, TCS',
        avatarSrc: '/images/hero/person.png',
        rating: 5,
        platform: 'google',
      },
      {
        id: 'review-3',
        title: 'Highly recommend ScaleX',
        quote:
          'Excellent faculty and structured curriculum. The Trustpilot reviews were accurate — this is one of the best CSM programs in India.',
        readOnLabel: 'Read on Trustpilot',
        readOnLogoSrc: '/images/star.png',
        readOnLogoAlt: 'Trustpilot',
        readOnHref: '#',
        name: 'Sneha Reddy',
        role: 'Project Manager',
        avatarSrc: '/images/hero/person.png',
        rating: 5,
        platform: 'trustpilot',
      },
    ],
    platformRatings: [
      {
        id: 'google',
        name: 'Google',
        logoSrc: '/images/hero/google.png',
        logoAlt: 'Google',
        rating: '4.8/5',
        reviewsLabel: '9845 Reviews',
      },
      {
        id: 'facebook',
        name: 'Facebook',
        logoSrc: '/images/Facebook.svg',
        logoAlt: 'Facebook',
        rating: '4.8/5',
        reviewsLabel: '9845 Reviews',
      },
      {
        id: 'trustpilot',
        name: 'Trustpilot',
        logoSrc: '/images/hero/trustpilot.png',
        logoAlt: 'Trustpilot',
        rating: '4.8/5',
        reviewsLabel: '9845 Reviews',
      },
      {
        id: 'switchup',
        name: 'Switchup',
        logoSrc: '/images/course/switc.png',
        logoAlt: 'Switchup',
        rating: '4.8/5',
        reviewsLabel: '9845 Reviews',
      },
    ],
  },
  awards: {
    title: 'Awards and Recognitions',
    cards: [
      {
        id: 'award-1',
        title: 'Ed Tech Company of the Year',
        subtitle: 'Awarded by The Corporate Titan',
        variant: 'gold',
      },
      {
        id: 'award-2',
        title: 'Ed Tech Company of the Year',
        subtitle: 'Awarded by The Corporate Titan',
        variant: 'red',
      },
      {
        id: 'award-3',
        title: 'Ed Tech Company of the Year',
        subtitle: 'Awarded by The Corporate Titan',
        variant: 'teal',
      },
      {
        id: 'award-4',
        title: 'Ed Tech Company of the Year',
        subtitle: 'Awarded by The Corporate Titan',
        variant: 'gold',
      },
    ],
  },
  credentials: {
    title: 'Earn Valuable Credentials',
    subtitle:
      'Build a strong foundation in Agile and Scrum with beginner-friendly Certified ScrumMaster® training. No Prior Experience Required.',
    certificateImageSrc: '/images/certifi.png',
    certificateImageAlt: 'Scrum Alliance Certified ScrumMaster certificate',
    features: [
      {
        id: 'save-time',
        title: 'Save Time writing copy',
        description:
          'Define team ground rules, build a shared understanding, engage and support virtual teams, and more.',
      },
      {
        id: 'export-results',
        title: 'Export your results to a downloadable file',
        description:
          'Define team ground rules, build a shared understanding, engage and support virtual teams, and more.',
      },
      {
        id: 'perfect-result',
        title: 'Perfect result on the first try',
        description:
          'Define team ground rules, build a shared understanding, engage and support virtual teams, and more.',
      },
    ],
  },
  faqs: {
    title: 'Frequently Asked Questions',
    viewMoreLabel: 'View More FAQs',
    viewMoreHref: '#faqs',
    tabs: [
      {
        id: 'csm-training',
        label: 'CSM Training',
        items: [
          {
            id: 'what-is-csm',
            question: 'What is CSM Certification and who should get it?',
            learningObjectives: [
              'Master the 4 values and 12 principles of the Agile Manifesto and transition from legacy workflows to Agile ways of working.',
              'Understand who should pursue CSM certification — from aspiring Scrum Masters to project managers, developers, and business analysts.',
            ],
            topicsCovered: [
              'Scrum Foundations: Core frameworks, foundational roles, and modern organizational dynamics.',
              'The Agile Manifesto: Deep-dive into the 4 values, 12 principles, and their real-world application.',
            ],
          },
          {
            id: 'apply-exam',
            question: 'How to apply for the CSM Exam?',
            learningObjectives: [
              'Learn the step-by-step process to apply for and schedule your CSM exam through the Scrum Alliance portal.',
            ],
            topicsCovered: [
              'Creating your Scrum Alliance account, redeeming your exam voucher, and booking your proctored online exam slot.',
            ],
          },
          {
            id: 'pause-exam',
            question: 'Can I pause your CSM certification exam in between and resume it later?',
            learningObjectives: [
              'Understand whether the CSM online exam allows pausing mid-session and how to plan your exam window.',
            ],
            topicsCovered: [
              'Exam duration limits, break policies, and what to do if your session is interrupted.',
            ],
          },
          {
            id: 'open-book',
            question: 'Is the CSM online exam is an open-book exam?',
            learningObjectives: [
              'Clarify the open-book policy and what reference materials you may use during the CSM exam.',
            ],
            topicsCovered: [
              'Permitted resources, prohibited aids, and tips for preparing without relying on external notes.',
            ],
          },
          {
            id: 'reappear',
            question: 'Can I reappear if I cannot clear the CSM exam on your first attempt?',
            learningObjectives: [
              'Learn retake eligibility, waiting periods, and ScaleX support if you do not pass on your first attempt.',
            ],
            topicsCovered: [
              'Retake fees, cooldown rules, exam pass guarantee terms, and how to schedule a second attempt.',
            ],
          },
          {
            id: 'download-csm',
            question: 'How do I download the CSM after completing my CSM Examination?',
            learningObjectives: [
              'Know where and how to access your digital CSM certificate after passing the exam.',
            ],
            topicsCovered: [
              'Downloading your certificate from Scrum Alliance, sharing credentials on LinkedIn, and verifying your certification status.',
            ],
          },
        ],
      },
      {
        id: 'workshop',
        label: 'Workshop Experience',
        items: [
          {
            id: 'workshop-format',
            question: 'What is the format of the live CSM workshop?',
            learningObjectives: [
              'Understand how live virtual sessions are structured over two days of interactive training.',
            ],
            topicsCovered: [
              'Session timings, breakout activities, Q&A, and hands-on Scrum simulations',
            ],
          },
          {
            id: 'workshop-materials',
            question: 'What study materials are included with the workshop?',
            learningObjectives: [
              'Review all resources provided before, during, and after your CSM training.',
            ],
            topicsCovered: [
              'Course workbook, mock tests, exam guide, and post-training mentorship access',
            ],
          },
        ],
      },
      {
        id: 'finance',
        label: 'Finance',
        items: [
          {
            id: 'payment-options',
            question: 'What payment options are available?',
            learningObjectives: [
              'Explore flexible payment methods and installment options for CSM enrollment.',
            ],
            topicsCovered: [
              'Credit/debit cards, UPI, EMI partners, and corporate invoicing',
            ],
          },
          {
            id: 'refund-policy',
            question: 'What is the refund and money-back policy?',
            learningObjectives: [
              'Learn about ScaleX refund terms and the 100% money-back guarantee conditions.',
            ],
            topicsCovered: [
              'Cancellation windows, refund processing timelines, and guarantee eligibility',
            ],
          },
        ],
      },
      {
        id: 'others',
        label: 'Others',
        items: [
          {
            id: 'pdus-seus',
            question: 'How many PDUs and SEUs will I earn?',
            learningObjectives: [
              'Confirm the professional development credits awarded upon CSM course completion.',
            ],
            topicsCovered: [
              '16 SEUs and 20 PDUs credited to your Scrum Alliance and PMI profiles',
            ],
          },
          {
            id: 'membership',
            question: 'How long is the Scrum Alliance membership valid?',
            learningObjectives: [
              'Understand membership duration included with your CSM certification package.',
            ],
            topicsCovered: [
              '2-year Scrum Alliance membership benefits and renewal options',
            ],
          },
        ],
      },
    ],
  },
  expertCta: {
    headingLines: ['Have more questions or need', 'personal guidance?'],
    ctaLabel: 'Contact Learning Advisor',
    ctaHref: '#contact',
    imageSrc: '/images/hero/person.png',
    imageAlt: 'Learning advisor ready to help',
  },
  aboutCertification: {
    title: 'About Certified Scrum Master Certification',
    learningObjectives: {
      heading: 'Learning Objectives',
      paragraphs: [
        'Master the Scrum framework, roles, events, and artifacts required to lead high-performing Agile teams.',
        'Build practical skills in facilitation, servant leadership, and impediment removal to drive team success.',
        'Prepare confidently for the Scrum Alliance CSM exam and earn a globally recognized credential.',
      ],
    },
    topicsCovered: {
      heading: 'Topics Covered',
      paragraphs: [
        'Scrum Foundations: core roles, events, artifacts, and empirical process control.',
        'Agile coaching techniques, team dynamics, and scaling Scrum in enterprise environments.',
        'Exam preparation strategies, certification process, and post-certification career pathways.',
      ],
    },
    sideHeading: {
      heading: 'Side Heading',
      paragraphs: [
        'The Certified ScrumMaster (CSM) credential validates your understanding of Scrum principles and your ability to apply them in real-world projects. ScaleX CSM training combines live CST-led instruction with hands-on activities so you are ready to coach teams from day one.',
        'Whether you are a developer, project manager, or aspiring Scrum Master, this certification opens doors to Agile leadership roles across industries worldwide.',
      ],
    },
  },
  relatedCourses: {
    title: 'Also view other courses',
    currencySymbol: '₹',
    courses: CSM_RELATED_COURSES,
  },
  trainingCities: {
    title: 'CSM Training in other Cities',
    cities: Array.from({ length: 30 }).map((_, index) => ({
      id: `csm-city-${index + 1}`,
      label: CSM_TRAINING_CITIES[index % CSM_TRAINING_CITIES.length],
      href: '#schedules',
    })),
  },
  sidebar: {
    assistTitle: 'Let us assist you',
    purposes: [
      { id: 'career-growth', label: 'Career Growth' },
      { id: 'certification', label: 'Get Certified' },
      { id: 'upskill-team', label: 'Upskill My Team' },
      { id: 'other', label: 'Other' },
    ],
    termsHref: '/terms',
    privacyHref: '/privacy',
    ctaLabel: 'Talk To Us',
    brochureText: 'Explore the world class Brochure here',
    brochureCtaLabel: 'Download Brochure',
    mentorship: {
      title: 'Free 1-on-1 Mentorship',
      phone: '+91 - 93245 67345',
      imageSrc: '/images/hero/person.png',
      imageAlt: 'Mentor',
    },
  },
};

const COURSE_BODY: Record<string, CourseBodyContent> = {
  'certified-scrum-master': CSM_BODY,
};

export function getCourseBodyBySlug(slug: string): CourseBodyContent | undefined {
  return COURSE_BODY[slug];
}
