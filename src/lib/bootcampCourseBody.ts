import type { CourseBodyContent } from '@/lib/courseBody';
import { getCourseBodyBySlug } from '@/lib/courseBody';
import type { TechnicalCourseDefinition } from '@/lib/technicalCourses';
import {
  PRIMARY_TECHNICAL_COURSE_SLUG,
  TECHNICAL_COURSE_DEFINITIONS,
  TECHNICAL_PRIMARY_NAV_ITEMS,
} from '@/lib/technicalCourses';

const BASE = getCourseBodyBySlug('certified-scrum-master')!;

const CHANDRA_CAREER_STORY = {
  id: 'chandra-uthhappu',
  name: 'Chandra Uthhappu',
  quote:
    "My time with EdgeX Learning has been invaluable in shaping my professional journey. It's more than just training — the hands-on Gen AI projects and mentor support helped me transition into a high-impact role at a leading AI company.",
  hikePercent: 80,
  imageSrc: '/images/carrowr-transportation.png',
  imageAlt: 'Chandra Uthhappu holding a laptop',
  before: {
    role: 'System Engineer',
    companyLogoSrc: '/images/course/capgem.png',
    companyLogoAlt: 'Capgemini',
  },
  after: {
    role: 'GEN AI\nEngineer',
    companyLogoSrc: '/images/course/claude.png',
    companyLogoAlt: 'Claude',
  },
};

function cloneCareerStory(
  id: string,
  overrides?: Partial<Omit<typeof CHANDRA_CAREER_STORY, 'id' | 'before' | 'after'>>,
) {
  return {
    ...CHANDRA_CAREER_STORY,
    ...overrides,
    id,
    before: { ...CHANDRA_CAREER_STORY.before },
    after: { ...CHANDRA_CAREER_STORY.after },
  };
}

function buildTechnicalBody(def: TechnicalCourseDefinition): CourseBodyContent {
  const courseHref = `/bootcamp-courses/${def.slug}`;
  const isPrimary = def.slug === PRIMARY_TECHNICAL_COURSE_SLUG;

  return {
    ...BASE,
    navItems: isPrimary
      ? [...TECHNICAL_PRIMARY_NAV_ITEMS]
      : BASE.navItems.map((item) =>
          item.id === 'eligibility' ? { ...item, label: 'Eligibility Requirements' } : item,
        ),
    overview: {
      ...BASE.overview,
      title: def.heroTitle.includes('Gen AI') ? 'Gen AI Course Overview' : `${def.heroTitle} Overview`,
      description: `Accelerate your career with  EdgeX 's ${def.heroTitle} program. Delivered by industry experts, this immersive training equips you with real-world data analytics skills, Gen AI tools, and hands-on projects to drive business insights, build predictive models, and unlock high-growth opportunities at leading tech companies.`,
      standoutTitle: 'Most Standout Features',
      features: BASE.overview.features,
      skillsTitle: 'Skills Covered',
      skills: BASE.overview.skills,
    },
    career: {
      ...BASE.career,
      title: 'Accelerate Your Tech Career',
    },
    careerTransformations: isPrimary
      ? {
          title: 'Career Transformations',
          subtitle: 'Real Journeys. Real Growth. Real Impact.',
          stories: [
            CHANDRA_CAREER_STORY,
            cloneCareerStory('priya-sharma', {
              imageSrc: '/images/hero/person.png',
              imageAlt: 'Priya Sharma',
            }),
            cloneCareerStory('rahul-mehta'),
          ],
        }
      : undefined,
    skillsTools: isPrimary
      ? {
          title: 'Skills and Tools to master',
          subtitle:
            'Build in-demand skills and advance your career. Explore essential tools used by top professionals',
          skillsTitle: 'Skills',
          toolsTitle: 'Tools',
          skills: [
            { name: 'AWS EC2', category: 'Cloud' },
            { name: 'ELB', category: 'Cloud' },
            { name: 'Azure', category: 'Cloud' },
            { name: 'Blobs', category: 'Storage' },
            { name: 'Replication', category: 'Database' },
            { name: 'CD', category: 'DevOps' },
            { name: 'Azure VM', category: 'Cloud' },
            { name: 'Access', category: 'Security' },
            { name: 'Linux', category: 'OS' },
            { name: 'Docker', category: 'Containers' },
            { name: 'Selenium', category: 'Testing' },
            { name: 'Maven', category: 'Build Tool' },
            { name: 'Jenkins', category: 'CI/CD' },
            { name: 'Nagios', category: 'Monitoring' },
            { name: 'Python', category: 'Language' },
            { name: 'Lambda', category: 'Serverless' },
            { name: 'Pandas', category: 'Data' },
            { name: 'Splunk', category: 'Mentoring' },
          ],
          tools: [
            { name: 'AWS', logoSrc: '/images/aws.png', logoAlt: 'AWS' },
            { name: 'EC2', logoSrc: '/images/ec2.png', logoAlt: 'Amazon EC2' },
            { name: 'Amazon ELB', logoSrc: '/images/amaonblb.png', logoAlt: 'Amazon ELB' },
            { name: 'Azure', logoSrc: '/images/azure.png', logoAlt: 'Microsoft Azure' },
            { name: 'PowerShell', logoSrc: '/images/powershell.png', logoAlt: 'PowerShell' },
            { name: 'Python', logoSrc: '/images/pytho.png', logoAlt: 'Python' },
          ],
          toolRows: 4,
        }
      : undefined,
    programRoadmap: isPrimary
      ? {
          title: 'Program Road Map',
          subtitle:
            'A structured journey that takes you from foundational learning to interview readiness and successful career placement.',
          stages: [
            {
              id: 'learning-track',
              stageNumber: '01',
              trackLabel: 'Learning Track',
              description:
                'Build strong foundations through structured courses and hands-on projects.',
              theme: 'learning',
              contentHeading: 'Your Learning Journey Starts Here',
              highlights: [
                'Coverage entire course syllabus: including Hackathons and case studies.',
                'Community Access: Connect with peers, mentors, and alumni.',
                '1:1 Expert Mentorship: Personalized Guidance tailored for you.',
                'Internship Certificate: Get official, industry-recognized proof of your experience.',
                'Letter of Recommendation: Stand out to future employers with a personalized endorsement.',
                'Course Certification: Validate your newly acquired skills with a verified completion certificate.',
                'Explore Expert-Approved Projects',
              ],
              projects: [
                { company: 'Yulu', projectName: 'Ride Demand AI', logoSrc: '/images/yulu.png', logoAlt: 'Yulu' },
                { company: 'Bajaj Insurance', projectName: 'Cross - Sell AI', logoSrc: '/images/bajaj.png', logoAlt: 'Bajaj Insurance' },
                { company: 'Kindle', projectName: 'Smart Recommender', logoSrc: '/images/kindle.png', logoAlt: 'Kindle' },
                { company: 'Myntra', projectName: 'Retail Clustering Engine', logoSrc: '/images/myntra.png', logoAlt: 'Myntra' },
                { company: 'Ola', projectName: 'Surge AI', logoSrc: '/images/ola.png', logoAlt: 'Ola' },
                { company: 'Bajaj Insurance', projectName: 'Cross - Sell AI', logoSrc: '/images/bajaj.png', logoAlt: 'Bajaj Insurance' },
              ],
              nextStageLabel: '02 - Interview Prep Track',
              nextStageId: 'interview-prep-track',
            },
            {
              id: 'interview-prep-track',
              stageNumber: '02',
              trackLabel: 'Interview Prep Track',
              description:
                'Strengthen your confidence with mock interviews, assessments, and personal mentoring.',
              theme: 'interview',
              contentHeading: '200 Questions spanning 15 Categories',
              topics: [
                'Arrays',
                'Linked Lists',
                'Sorting',
                'Searching',
                'Greedy Algorithms',
                'Binary Search Trees',
                'Recursion',
                'Tries and Routes',
                'Binary Trees',
                'Dynamic Programming',
                'Famous Algorithms',
                'Strings',
                'Heaps',
                'Stacks and Queues',
              ],
              showMoreLabel: 'Show More',
              nextStageLabel: '03 - Placement Track',
              nextStageId: 'placement-track',
            },
            {
              id: 'placement-track',
              stageNumber: '03',
              trackLabel: 'Placement Track',
              description:
                'Connect with opportunities and receive end-to-end placement support.',
              theme: 'placement',
              contentHeading: 'Turn your skills into career opportunities',
              placementFeatures: [
                {
                  title: '50+ Mock Interviews & GDs',
                  description:
                    'Real hiring simulations that build composure and clarity.',
                },
                {
                  title: 'Soft Skill Training',
                  description:
                    'Real hiring simulations that build composure and clarity.',
                },
                {
                  title: 'Resume Building',
                  description:
                    'Real hiring simulations that build composure and clarity.',
                },
                {
                  title: 'Career Oriented Sessions',
                  description:
                    'Real hiring simulations that build composure and clarity.',
                },
                {
                  title: 'Access to EdgeX Job Portal',
                  description:
                    'Real hiring simulations that build composure and clarity.',
                },
              ],
              hiringPartnersTitle: 'Get access to our 1200+ hiring partners!',
              hiringPartnerLogos: [
                { src: '/images/course/google.png', alt: 'Google' },
                { src: '/images/course/ibm.png', alt: 'IBM' },
                { src: '/images/course/info.png', alt: 'Infosys' },
                { src: '/images/course/claude.png', alt: 'Claude' },
                { src: '/images/course/capgem.png', alt: 'Capgemini' },
                { src: '/images/course/tcs.png', alt: 'TCS' },
              ],
            },
          ],
        }
      : undefined,
    courseFee: isPrimary
      ? {
          title: 'Course Fee',
          subtitle: 'Access to global opportunities made accessible and affordable',
          advisorCtaLabel: 'Talk to Advisor',
          advisorPhone: BASE.phone,
          infoHeading: "Your Career Can't Wait, We Make It Affordable",
          features: [
            {
              title: 'Connect with Admissions',
              description: 'Discuss program & payment options',
            },
            {
              title: 'Start Your Journey',
              description: 'Begin learning with full support',
            },
          ],
          partnersLabel: 'In Partner with',
          partnerLogos: [
            { name: 'HDFC BANK', logoSrc: '/images/HDFC_Bank_Logo.png' },
            { name: 'ICICI Bank', logoSrc: '/images/ICICI_Bank_Logo.png' },
            { name: 'BAJAJ FINSERV', logoSrc: '/images/Bajaj_Finserv_Logo.png' },
          ],
          pricingOptions: [
            {
              id: 'emi',
              label: 'Pay in EMI',
              price: '₹6000',
              priceSuffix: '/month',
              description:
                'Pay in easy monthly installments. Financing options for as low as 0% interest',
              enrollLabel: 'Enroll Now',
              highlighted: true,
              badge: 'Popular',
            },
            {
              id: 'full',
              label: 'Pay in Full',
              price: '₹75000',
              priceSuffix: '+18% GST',
              description:
                'Secure One-Time Pay through Internet Banking, Debit/Card & Digital Wallets',
              enrollLabel: 'Enroll Now',
            },
          ],
        }
      : undefined,
    careerAssurance: isPrimary
      ? {
          brandTitle: 'Learning Career Assurance+',
          subheading:
            'Empower your team with industry-leading skills and custom learning pathways.',
          features: [
            { id: 'hiring-partners', label: 'Exclusive Access to 1200+ Hiring Partners' },
            { id: 'fresher-drives', label: 'Exclusive Access to Fresher Hiring Drives' },
            { id: 'pre-interview', label: 'Pre-Interview Dedicated Support' },
            { id: 'post-placement', label: '6-Month Post-Placement Support' },
          ],
          ctaLabel: 'Download Placement Report 2026',
          imageSrc: '/images/julio-lopez.png',
          imageAlt: 'Career advisor with arms crossed',
        }
      : undefined,
    prepComparison: isPrimary
      ? {
          heading: 'A Better Way to Prep Scrum Master',
          columns: ['CSM', 'Bootcamp'],
          rows: [
            { offering: '100+ Practice Questions', values: [true, true] },
            { offering: 'Data Structures Content', values: [true, true] },
            { offering: 'Guided Format', values: [true, true] },
            { offering: 'High Quality Solutions', values: [true, true] },
            { offering: 'Multiple Programming Languages', values: [false, true] },
            { offering: 'Coding Workspace', values: [false, true] },
            { offering: 'Video Explanations', values: [false, true] },
            { offering: 'Mock Interviews', values: [false, true] },
            { offering: 'All-In-One Platform', values: [false, true] },
          ],
        }
      : undefined,
    trainers: isPrimary
      ? {
          title: BASE.trainers.title,
          trainers: BASE.trainers.trainers,
        }
      : BASE.trainers,
    webinarCta: isPrimary
      ? {
          headingLines: [
            'Get Closer to your dream by registering',
            'for our free webinar',
          ],
          ctaLabel: 'Register for FREE Webinar',
          ctaHref: '#schedules',
          countdownLabel: 'Next Webinar Starts in',
          imageSrc: '/images/julio-lopez-ii.png',
          imageAlt: 'Professional holding a tablet',
        }
      : undefined,
    courseContent: {
      ...BASE.courseContent,
      title: isPrimary ? 'Course Content' : 'Program Curriculum',
      downloadSyllabusLabel: 'Download Syllabus',
      viewMoreLabel: 'View More Courses',
      viewMoreHref: `/bootcamp-courses/${PRIMARY_TECHNICAL_COURSE_SLUG}`,
      modules: isPrimary ? BASE.courseContent.modules : [
        {
          id: 'module-1',
          title: 'Module 1: Web Foundations',
          learningObjectives: [
            'Build responsive layouts with modern HTML and CSS.',
            'Write clean, maintainable JavaScript for interactive UIs.',
          ],
          topicsCovered: [
            'HTML5 semantic structure',
            'CSS Flexbox and Grid',
            'JavaScript ES6+ fundamentals',
            'DOM manipulation and events',
          ],
        },
        {
          id: 'module-2',
          title: 'Module 2: Frontend with React',
          learningObjectives: [
            'Develop component-based UIs with React and hooks.',
            'Manage application state and routing in SPAs.',
          ],
          topicsCovered: [
            'React components and props',
            'State management with hooks',
            'React Router',
            'API integration patterns',
          ],
        },
        {
          id: 'module-3',
          title: 'Module 3: Backend & APIs',
          learningObjectives: [
            'Design RESTful APIs with Node.js and Express.',
            'Connect applications to databases securely.',
          ],
          topicsCovered: [
            'Node.js and Express setup',
            'REST API design',
            'MongoDB / SQL basics',
            'Authentication fundamentals',
          ],
        },
        {
          id: 'module-4',
          title: 'Module 4: Full Stack Projects',
          learningObjectives: [
            'Ship end-to-end applications from design to deployment.',
            'Collaborate using Git workflows and code reviews.',
          ],
          topicsCovered: [
            'Project architecture',
            'Git branching strategies',
            'Deployment to cloud platforms',
            'Performance and security basics',
          ],
        },
        {
          id: 'module-5',
          title: 'Module 5: Interview Preparation',
          learningObjectives: [
            'Solve common DSA patterns for technical interviews.',
            'Present projects confidently to hiring managers.',
          ],
          topicsCovered: [
            'Arrays, strings, and hash maps',
            'System design introductions',
            'Behavioral interview prep',
            'Portfolio presentation',
          ],
        },
        {
          id: 'module-6',
          title: 'Module 6: Career Launch',
          learningObjectives: [
            'Finalize your portfolio and job search strategy.',
            'Navigate offer evaluation and onboarding.',
          ],
          topicsCovered: [
            'Resume and LinkedIn optimization',
            'Mock technical interviews',
            'Salary negotiation basics',
            'First 90 days on the job',
          ],
        },
      ],
    },
    eligibilityRequirements: {
      ...BASE.eligibilityRequirements,
      title: 'Eligibility Requirements',
      subtitle:
        'Our technical programs are beginner-friendly. Basic computer literacy is enough to get started — we guide you from fundamentals to job-ready skills.',
      items: [
        {
          id: 'no-degree',
          title: 'No Degree Required',
          description:
            'Anyone motivated to learn programming can enroll — a CS degree is not mandatory.',
          icon: 'forbidden',
        },
        {
          id: 'basic-computer',
          title: 'Basic Computer Skills',
          description:
            'Familiarity with using a computer and the internet is helpful but no prior coding is required.',
          icon: 'book',
        },
        {
          id: 'commitment',
          title: 'Commitment to Practice',
          description:
            'Consistent practice and project work are key — our mentors help you stay on track throughout.',
          icon: 'bulb',
        },
      ],
      idealForTitle: 'This program is ideal for:',
      idealForRoles: [
        'Career Switchers',
        'Fresh Graduates',
        'Working Professionals',
        'Freelancers',
        'Startup Founders',
        'Self-Taught Developers',
        'IT Support Engineers',
        'QA Professionals',
      ],
    },
    aboutCertification: {
      ...BASE.aboutCertification,
      title: isPrimary
        ? 'About Certified Scrum Master Certification'
        : `About ${def.menuLabel}`,
      learningObjectives: {
        heading: 'What You Will Learn',
        paragraphs: [
          `Master the core skills needed for ${def.menuLabel.toLowerCase()} roles in today's job market.`,
          'Build real projects, collaborate in teams, and graduate with a portfolio that demonstrates your abilities.',
          'Prepare for technical interviews with structured DSA practice and mock sessions.',
        ],
      },
      topicsCovered: {
        heading: 'Program Structure',
        paragraphs: [
          'Foundation modules cover web technologies, followed by frontend and backend specialization.',
          'Capstone projects simulate real workplace scenarios with mentor feedback at every stage.',
          'Career modules cover interview prep, portfolio building, and job search strategy.',
        ],
      },
      sideHeading: {
        heading: 'Why This Program',
        paragraphs: [
          ` EdgeX ${def.menuLabel} is designed for learners who want practical, job-focused training — not just theory.`,
          'With live instruction, hands-on labs, and placement support, you graduate ready to contribute from day one.',
        ],
      },
    },
    relatedCourses: {
      ...BASE.relatedCourses,
      title: 'Explore More Technical Courses',
      courses: BASE.relatedCourses.courses.map((course, index) => ({
        ...course,
        id: `technical-related-${index + 1}`,
        category: 'technical',
        categoryLabel: 'Technical Course',
        title: TECHNICAL_COURSE_DEFINITIONS[index % TECHNICAL_COURSE_DEFINITIONS.length].menuLabel,
        href: `/bootcamp-courses/${TECHNICAL_COURSE_DEFINITIONS[index % TECHNICAL_COURSE_DEFINITIONS.length].slug}`,
      })),
    },
    trainingCities: {
      ...BASE.trainingCities,
      title: `${def.titlePrefix} Training in other Cities`,
      cities: BASE.trainingCities.cities.map((city) => ({
        ...city,
        href: courseHref,
      })),
    },
    sidebar: {
      ...BASE.sidebar,
      brochureText: 'Explore the complete program brochure here',
    },
  };
}

const TECHNICAL_BODIES: Record<string, CourseBodyContent> = Object.fromEntries(
  TECHNICAL_COURSE_DEFINITIONS.map((def) => [def.slug, buildTechnicalBody(def)]),
);

export function getBootcampCourseBodyBySlug(slug: string): CourseBodyContent | undefined {
  return TECHNICAL_BODIES[slug];
}
