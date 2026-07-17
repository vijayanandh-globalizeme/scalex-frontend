import type { WorkforceSectionProps } from './WorkforceSection';

export const defaultWorkforceContent: WorkforceSectionProps = {
  headingBefore: 'Future-Proof Your Workforce with',
  brandLogo: { alt: 'Edge X' },
  headingAfter: 'Hiring Partners',
  subheading:
    'Empower your team with industry-leading skills and custom learning pathways designed to drive innovation and measurable growth.',
  features: [
    { id: 'immersive', label: 'Immersive Learning' },
    { id: 'driven', label: 'Result-Driven Journeys' },
    { id: 'tailored', label: 'Tailored Pathways' },
    { id: 'future', label: 'Future-Ready Workforce' },
  ],
  cta: { label: 'Request A Demo', href: '/request-demo' },
  stats: [
    { id: 'avg-salary', label: 'Average Salary', value: '60 LPA' },
    { id: 'highest-salary', label: 'Highest Salary', value: '110LPA' },
    { id: 'offers', label: 'Highest no.of Offers', value: '18' },
    { id: 'engineers', label: 'Enrolled Engineers', value: '20000+' },
    { id: 'years', label: 'Years in Ed Tech Industry', value: '8+' },
    { id: 'roi', label: 'Average ROI on Course Price', value: '10000+' },
  ],
  partners: [
    { id: 'google', name: 'Google', logoSrc: '/images/hero/google.png', logoAlt: 'Google' },
    { id: 'stanford', name: 'Stanford', logoSrc: '/images/hero/stanford.png', logoAlt: 'Stanford' },
    { id: 'ibm', name: 'IBM', logoSrc: '/images/sm-ibm.png', logoAlt: 'IBM' },
    { id: 'infosys', name: 'Infosys', logoSrc: '/images/sm-info.png', logoAlt: 'Infosys' },
    { id: 'claude', name: 'Claude', logoSrc: '/images/sm-claude.png', logoAlt: 'Claude' },
    { id: 'capgemini', name: 'Capgemini', logoSrc: '/images/sm-capgemni.png', logoAlt: 'Capgemini' },
    { id: 'deloitte', name: 'Deloitte', logoSrc: '/images/sm-deloitte.png', logoAlt: 'Deloitte' },
    { id: 'tcs', name: 'TCS', logoSrc: '/images/sm-tcs.png', logoAlt: 'Tata Consultancy Services' },
  ],
};
