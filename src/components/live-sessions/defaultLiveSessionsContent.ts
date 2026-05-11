import type { LiveSessionsSectionProps } from './LiveSessionsSection';

const placeholderImage = '/images/course/course-1.png';

export const defaultLiveSessionsContent: LiveSessionsSectionProps = {
  heading: 'Master the Future with Live Expert Sessions',
  subheading:
    'Join our live sessions led by industry pioneers. Gain deep insights into emerging trends, master new tools, and scale your expertise in real-time.',
  sessions: Array.from({ length: 3 }).map((_, i) => ({
    id: `session-${i + 1}`,
    title: 'Engineering Must Have Skills in 2026',
    date: '12 December 2026',
    time: '07:30 PM',
    learners: '75K+ Learners Registered',
    instructor: 'Praneeth Kuridi',
    imageSrc: placeholderImage,
    imageAlt: 'Live engineering skills session',
    href: '/live-sessions/engineering-skills-2026',
  })),
};
