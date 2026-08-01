export const COURSE_SECTION_CARD =
  'rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

/** White course body section — card shell + standard padding + mobile bottom spacing. */
export const COURSE_SECTION_BODY = `${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6 max-md:mb-15`;

/** Enterprise Training hero card — shared shell; mobile keeps clear gap above/below. */
export const COURSE_ENTERPRISE_CARD = `${COURSE_SECTION_CARD} max-md:overflow-hidden max-md:pb-6`;

/** Desktop grid slot for enterprise card — ~30% of card height overlaps section below. */
export const COURSE_ENTERPRISE_HERO_SLOT =
  'relative z-20 max-md:mt-0 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mt-6 lg:mb-[-78px] lg:pb-6';

/** Lead form column in course hero — normal stack on mobile, no overlap. */
export const COURSE_HERO_FORM_SLOT =
  'relative mx-auto flex w-full flex-col max-md:mt-0 max-md:max-w-[528px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:ml-auto';

export const COURSE_INNER_CARD =
  'overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

export const COURSE_ROW_DIVIDER =
  'relative after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-[80%] after:-translate-x-1/2 after:bg-[#EBEBEB] after:content-[""]';

export const COURSE_TOP_DIVIDER =
  'relative before:pointer-events-none before:absolute before:top-0 before:left-1/2 before:h-px before:w-[80%] before:-translate-x-1/2 before:bg-[#EBEBEB] before:content-[""]';

export const COURSE_ROW_DIVIDER_FULL = 'border-b border-[#EBEBEB]';

export const COURSE_TOP_DIVIDER_FULL = 'border-t border-[#EBEBEB]';

/** Shared accordion expand/collapse — panel + chevron */
export const COURSE_ACCORDION_PANEL =
  'grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none';

export const COURSE_ACCORDION_PANEL_OPEN = 'delay-150';
export const COURSE_ACCORDION_PANEL_CLOSED = 'delay-0';

export const COURSE_ACCORDION_INNER =
  'overflow-hidden transition-opacity duration-[650ms] ease-out motion-reduce:transition-none';

export const COURSE_ACCORDION_INNER_OPEN = 'opacity-100 delay-[200ms]';
export const COURSE_ACCORDION_INNER_CLOSED = 'opacity-0 delay-0';

export const COURSE_ACCORDION_CHEVRON =
  'transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none';

/** Rich HTML body inside course content / FAQ accordions */
export const COURSE_ACCORDION_ANSWER = 'course-accordion-answer';
