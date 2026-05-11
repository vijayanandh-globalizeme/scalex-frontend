import type { WhyScaleXSectionProps } from './WhyScaleXSection';

export const defaultWhyScaleXContent: WhyScaleXSectionProps = {
  headingBefore: 'Why',
  headingAfter: 'is the Preferred Choice for Professionals',
  brandLogo: { src: '/images/why-logo.png', alt: 'ScaleX' },
  subheading:
    "We don't just teach skills; we build careers. Our ecosystem is designed to bridge the gap between classroom learning and board-room execution.",
  scalexBrandLogo: { src: '/images/footer-logo.png', alt: 'ScaleX' },
  rows: [
    {
      id: 'features',
      label: 'Features',
      others: {
        title: 'Theory-Heavy',
        description: 'Traditional classroom approach with limited practical exposure.',
      },
      scalex: {
        title: 'Project-Led & Immersive',
        description:
          'Real-world simulations and hands-on projects that prepare you for day-one productivity.',
      },
    },
    {
      id: 'learning-mode',
      label: 'Learning Mode',
      others: {
        title: 'Generic Trainers',
        description: 'Academics or trainers with limited current industry experience.',
      },
      scalex: {
        title: 'Global Industry Architects',
        description: 'Direct 1-on-1 mentorship from Fortune 500 experts.',
      },
    },
    {
      id: 'mentorship',
      label: 'Mentorship',
      others: {
        title: 'Local Certifications',
        description: 'Certificates with limited global or industry recognition.',
      },
      scalex: {
        title: 'Globally Accredited',
        description: "Credentials recognized by the world's leading governing bodies.",
      },
    },
    {
      id: 'certifications',
      label: 'Certifications',
      others: {
        title: 'Basic Support',
        description: 'Limited job assistance with no long-term career tracking.',
      },
      scalex: {
        title: 'Scalable Career Growth',
        description: 'Lifelong access to our elite professional network and 100% placement aid.',
      },
    },
    {
      id: 'career-support',
      label: 'Career Support',
      others: {
        title: 'Simulated Projects',
        description: "Basic, outdated capstones that don't reflect industry reality.",
      },
      scalex: {
        title: 'Live Enterprise Projects',
        description: 'Work on actual projects for global brands and startups.',
      },
    },
    {
      id: 'real-time-impact',
      label: 'Real-Time Impact',
      others: {
        title: 'Limited Outcomes',
        description: 'Outcome tracking limited to course-completion certificates.',
      },
      scalex: {
        title: 'Measurable Career Lift',
        description: 'Track tangible salary, role, and skill outcomes after every milestone.',
      },
    },
  ],
};
