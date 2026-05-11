import type { MentorsSectionProps } from './MentorsSection';

const placeholderPortrait = '/images/Keerthi.png';
const claudeLogo = '/images/hero/google.png';
const tcsLogo = '/images/hero/tcs.png';

export const defaultMentorsContent: MentorsSectionProps = {
  heading: 'Learn from the Architects of Modern Industry',
  subheading:
    'Get mentored by global leaders who have built and scaled world-class products. Our experts bring decades of real-world experience from top Fortune 500 companies directly to your screen',
  stats: [
    { id: 'experts', label: 'Industry Experts', value: '1250+' },
    { id: 'courses', label: 'Comprehensive Courses', value: '400+' },
    { id: 'agile', label: 'Agile Transformations', value: '1550+' },
    { id: 'countries', label: 'Countries & Counting', value: '100+' },
  ],
  mentors: Array.from({ length: 5 }).map((_, i) => ({
    id: `mentor-${i + 1}`,
    name: 'Keerthi Priya',
    role: 'Project Management Guru',
    portraitSrc: placeholderPortrait,
    portraitAlt: 'Keerthi Priya, Project Management Guru',
    linkedinUrl: 'https://linkedin.com',
    workedWith: [
      { id: 'claude', src: claudeLogo, alt: 'Claude' },
      { id: 'tcs', src: tcsLogo, alt: 'Tata Consultancy Services' },
    ],
  })),
};
