import type { MentorsSectionProps } from './MentorsSection';

export const defaultMentorsContent: Omit<MentorsSectionProps, 'mentors'> = {
  heading: 'Learn from Experienced Industry Experts',
  subheading:
    'Bring real-world industry expertise into your workforce through trainers and consultants with hands-on experience across leading organizations and technologies.',
  stats: [
    { id: 'experts', label: 'Industry Experts', value: '200+' },
    { id: 'courses', label: 'Technology & Business Skills', value: '50+' },
    { id: 'agile', label: 'Enterprise Engagements', value: '500+' },
    { id: 'countries', label: 'Industry Domains', value: '20+' },
  ],
};
