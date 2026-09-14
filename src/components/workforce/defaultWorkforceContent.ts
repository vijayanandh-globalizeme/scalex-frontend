import type { WorkforceSectionProps } from './WorkforceSection';

export const defaultWorkforceContent: WorkforceSectionProps = {
  headingBefore: 'Build a Future-Ready Workforce with ',
  brandLogo: { alt: 'Edge X' },
  headingAfter: '',
  subheading:
    'Upskill your teams with industry-focused training designed around your business, technology and workforce needs.',
  features: [
    { id: 'immersive', label: 'Customized Training' },
    { id: 'driven', label: 'Expert-Led Learning' },
    { id: 'tailored', label: 'Hands-On Learning' },
    { id: 'future', label: 'Flexible Delivery' },
  ],
  cta: { label: 'Request A Demo', href: '/request-demo' },
  stats: [
    { id: 'avg-salary', label: 'Enterprise Clients', value: '250+' },
    { id: 'highest-salary', label: 'Professionals Upskilled', value: '25K+' },
    { id: 'offers', label: 'Consulting Engagements', value: '500+' },
    { id: 'engineers', label: 'Training Hours Delivered', value: '100K+' },
    { id: 'years', label: 'Industry Experts', value: '200+' },
    { id: 'roi', label: 'Industry Experience', value: '10+ Years' },
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
