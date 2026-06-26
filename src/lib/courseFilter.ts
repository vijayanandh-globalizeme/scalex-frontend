export type CourseFilterId =
  | 'this_month'
  | 'next_month'
  | 'weekends'
  | 'weekday';

export interface CourseFilter {
  id: CourseFilterId;
  label: string;
  param: string;
}

export const COURSE_SCHEDULE_FILTERS: CourseFilter[] = [
  { id: 'this_month', label: 'This Month', param: 'this_month' },
  { id: 'next_month', label: 'Next Month', param: 'next_month' },
  { id: 'weekends',   label: 'Weekends',   param: 'weekends' },
  { id: 'weekday',    label: 'Weekdays',   param: 'weekday' },
];
