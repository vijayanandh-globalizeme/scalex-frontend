import type { MentorsSectionProps } from './MentorsSection';

export const defaultMentorsContent: Omit<MentorsSectionProps, 'mentors'> = {
  heading: 'Learn from the Architects of Modern Industry',
  subheading:
    'Get mentored by global leaders who have built and scaled world-class products.\nOur experts bring decades of real-world experience from top Fortune 500 companies directly to your screen',
  stats: [
    { id: 'experts', label: 'Industry Experts', value: '1250+' },
    { id: 'courses', label: 'Comprehensive Courses', value: '400+' },
    { id: 'agile', label: 'Agile Transformations', value: '1550+' },
    { id: 'countries', label: 'Countries & Counting', value: '100+' },
  ],
};
