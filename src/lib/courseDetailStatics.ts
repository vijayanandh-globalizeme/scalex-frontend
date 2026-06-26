export const COURSE_FAQ_TITLE = "Frequently Asked Questions";
export const COURSE_CONTENT_TITLE = "Course Content";
export const COURSE_CONTENT_SYLLABUS_LABEL = "Download Syllabus";
export const COURSE_OVERVIEW_STANDOUT_TITLE = "Most Standout Features";
export const COURSE_OVERVIEW_SKILLS_TITLE = "Skills Covered";
export const COURSE_OVERVIEW_DEMAND_LABEL = "of enterprises level skill";
export const SKILLS_TOOLS_SKILLS_TITLE    = 'Skills';
export const SKILLS_TOOLS_TOOLS_TITLE     = 'Tools & Technologies';

export const CAREER_SECTION_TITLE = "Accelerate Your Career";
export const CAREER_SALARY_SUBTITLE = "Annual Salary in India (INR)";
export const CAREER_SALARY_BADGE = "Competitive Salaries for In-Demand Skills";
export const CAREER_COMPANIES_SUBTITLE = "Leading Organizations";
export const CAREER_COMPANIES_BADGE =
  "Across Industries . Global Opportunities";
export const CAREER_DEMAND_SUBTITLE = "Professionals";
export const CAREER_DEMAND_BADGE = "Proven. Preferred. In Demand";

export const HIRING_COMPANIES: {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
}[] = [
  {
    id: "claude",
    name: "Claude",
    logoSrc: "/images/course/claude.png",
    logoAlt: "Claude",
  },
  {
    id: "google",
    name: "Google",
    logoSrc: "/images/course/google.png",
    logoAlt: "Google",
  },
  {
    id: "amazon",
    name: "Amazon",
    logoSrc: "/images/course/amazon.png",
    logoAlt: "Amazon",
  },
  { id: "ibm", name: "IBM", logoSrc: "/images/course/ibm.png", logoAlt: "IBM" },
  {
    id: "walmart",
    name: "Walmart",
    logoSrc: "/images/course/walmart.png",
    logoAlt: "Walmart",
  },
  {
    id: "sapient",
    name: "Sapient",
    logoSrc: "/images/course/sapient.png",
    logoAlt: "Sapient",
  },
  {
    id: "hsbc",
    name: "HSBC",
    logoSrc: "/images/course/hsbc.png",
    logoAlt: "HSBC",
  },
  {
    id: "accenture",
    name: "Accenture",
    logoSrc: "/images/course/accenture.png",
    logoAlt: "Accenture",
  },
];

export const UNLOCK_COURSE_BANNER = {
  headingLines: ["Ready to unlock your full potential", "on your Job?"],
  ctaLabel: "Contact with us",
  ctaHref: "#contact",
  imageSrc: "/images/hero/person.png",
  imageAlt: "Learning advisor ready to help",
};

export const EXPERTS_COURSE_BANNER = {
  headingLines: ["Have more questions or need", "personal guidance?"],
  ctaLabel: "Contact Learning Advisor",
  ctaHref: "#contact",
  imageSrc: "/images/hero/person.png",
  imageAlt: "Learning advisor ready to help",
};

export const REVIEW_VIDEO_SECTION = {
  thumbnailSrc: "/images/Alex.png",
  thumbnailAlt: "Alex video testimonial",
  videoUrl: "#",
};

export const CREDENTIALS_FEATURES: {
  title: string;
  subtitle: string;
  certificateImageSrc: string;
  certificateImageAlt: string;
  features: {
    id: string;
    title: string;
    description: string;
  }[];
} = {
  title: "Earn Valuable Credentials",
  subtitle:
    "Build a strong foundation in Agile and Scrum with beginner-friendly Certified ScrumMaster® training. No Prior Experience Required.",
  certificateImageSrc: "/images/certifi.png",
  certificateImageAlt: "Scrum Alliance Certified ScrumMaster certificate",
  features: [
    {
      id: "save-time",
      title: "Save Time writing copy",
      description:
        "Define team ground rules, build a shared understanding, engage and support virtual teams, and more.",
    },
    {
      id: "export-results",
      title: "Export your results to a downloadable file",
      description:
        "Define team ground rules, build a shared understanding, engage and support virtual teams, and more.",
    },
    {
      id: "perfect-result",
      title: "Perfect result on the first try",
      description:
        "Define team ground rules, build a shared understanding, engage and support virtual teams, and more.",
    },
  ],
};

export const REVIEWS_TYPE: {
  id: string;
  label: string;
  logoSrc?: string;
  logoAlt?: string;
}[] = [
  {
    id: "all",
    label: "All Reviews",
  },
  {
    id: "GOOGLE_REVIEW",
    label: "Google",
    logoSrc: "/images/g.png",
    logoAlt: "Google",
  },
  {
    id: "FACEBOOK_REVIEW",
    label: "Facebook",
    logoSrc: "/images/star.png",
    logoAlt: "Facebook",
  },
  {
    id: "TRUST_PILOT_REVIEW",
    label: "Trustpilot",
    logoSrc: "/images/star.png",
    logoAlt: "Trustpilot",
  },
  {
    id: "SWTICH_UP_REVIEW",
    label: "SwitchUp",
    logoSrc: "/images/star.png",
    logoAlt: "SwitchUp",
  },
];
