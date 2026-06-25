import type { AwardCard } from '@/components/awards';

const COURSE_AWARD_MEDAL = {
  medalSrc: '/images/top10.png',
  medalAlt: 'Top 10 Ed Tech Platform award',
} as const;

const COURSE_AWARD_SUBTITLE = {
  subtitle: 'Awarded by The Corporate Titan',
  subtitleLine1: 'Awarded by',
  subtitleLine2: 'The Corporate Titan',
} as const;

export const courseAwardsCards: AwardCard[] = [
  {
    id: 'course-award-1',
    title: 'Ed Tech Company of the Year',
    ...COURSE_AWARD_SUBTITLE,
    variant: 'gold',
    backgroundColor: '#BB9255',
    ...COURSE_AWARD_MEDAL,
  },
  {
    id: 'course-award-2',
    title: 'Ed Tech Company of the Year',
    ...COURSE_AWARD_SUBTITLE,
    variant: 'orange',
    backgroundColor: '#CB3D4D',
    ...COURSE_AWARD_MEDAL,
  },
  {
    id: 'course-award-3',
    title: 'Ed Tech Company of the Year',
    ...COURSE_AWARD_SUBTITLE,
    variant: 'red',
    backgroundColor: '#4899C2',
    ...COURSE_AWARD_MEDAL,
  },
  {
    id: 'course-award-4',
    title: 'Ed Tech Company of the Year',
    ...COURSE_AWARD_SUBTITLE,
    variant: 'gold',
    backgroundColor: '#BB9255',
    ...COURSE_AWARD_MEDAL,
  },
];
