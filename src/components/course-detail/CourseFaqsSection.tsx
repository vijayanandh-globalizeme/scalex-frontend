'use client';

import { useState } from 'react';
import type { ApiCourseDetails } from '@/services/courseApi';
import { COURSE_FAQ_TITLE } from '@/lib/courseDetailStatics';
import {
  COURSE_INNER_CARD,
  COURSE_ROW_DIVIDER_FULL,
  COURSE_SECTION_CARD,
  COURSE_TOP_DIVIDER_FULL,
  COURSE_ACCORDION_PANEL,
  COURSE_ACCORDION_PANEL_OPEN,
  COURSE_ACCORDION_PANEL_CLOSED,
  COURSE_ACCORDION_INNER,
  COURSE_ACCORDION_INNER_OPEN,
  COURSE_ACCORDION_INNER_CLOSED,
  COURSE_ACCORDION_CHEVRON,
  COURSE_ACCORDION_ANSWER,
} from './courseSectionCard';

const DEFAULT_VISIBLE = 5;

const TAB_BAR_SCROLL =
  'flex h-[48px] items-stretch gap-6 overflow-x-auto rounded-lg bg-[#FCFCFC] px-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)] [-ms-overflow-style:none] [scrollbar-width:none] md:gap-10 md:px-6 [&::-webkit-scrollbar]:hidden';

function FaqChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-brand ${COURSE_ACCORDION_CHEVRON} ${open ? 'rotate-180' : 'rotate-0'}`}
      viewBox="0 0 16 16" fill="none" aria-hidden
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ViewMoreChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="11" viewBox="0 0 18 11" fill="none" aria-hidden>
      <path d="M7.50374 9C7.69084 9 7.87795 8.92839 8.00517 8.79244L13.7979 3.11657C13.9251 2.99489 14 2.83742 14 2.65849C14 2.2863 13.7081 2 13.3189 2C13.1318 2 12.9597 2.07158 12.8325 2.1861L7.09959 7.79038H7.9004L2.16753 2.1861C2.04778 2.07158 1.87565 2 1.68106 2C1.29188 2 1 2.2863 1 2.65849C1 2.83742 1.07484 2.99489 1.20207 3.12372L6.99482 8.79244C7.13701 8.92839 7.30915 9 7.50374 9Z" fill="currentColor" />
    </svg>
  );
}

type FaqGroup = ApiCourseDetails['courseFaq'][number];

export default function CourseFaqsSection({ faqs, title }: { faqs: FaqGroup[]; title?: string | null }) {
  const [activeCategoryId, setActiveCategoryId] = useState(faqs[0]?.categoryId ?? '');
  const [openItemId, setOpenItemId]             = useState(faqs[0]?.items[0]?.id ?? '');
  const [showAll, setShowAll]                   = useState(false);

  const activeGroup = faqs.find((g) => g.categoryId === activeCategoryId) ?? faqs[0];

  if (!activeGroup) return null;

  const visible = showAll ? activeGroup.items : activeGroup.items.slice(0, DEFAULT_VISIBLE);
  const hasMore  = activeGroup.items.length > DEFAULT_VISIBLE;

  function handleTabChange(categoryId: string) {
    const group = faqs.find((g) => g.categoryId === categoryId);
    setActiveCategoryId(categoryId);
    setOpenItemId(group?.items[0]?.id ?? '');
    setShowAll(false);
  }

  return (
    <div id="faqs" className={`scroll-mt-[116px] ${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6`}>
      <h2 className="section-heading text-heading">{title ?? COURSE_FAQ_TITLE}</h2>

      {/* Category tabs */}
      <div className="mt-5" role="tablist" aria-label={COURSE_FAQ_TITLE}>
        <div className={TAB_BAR_SCROLL}>
          {faqs.map((group) => {
            const isActive = group.categoryId === activeCategoryId;
            return (
              <button
                key={group.categoryId}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(group.categoryId)}
                className={`flex h-full shrink-0 cursor-pointer items-center border-0 border-b-[3px] bg-transparent px-0 text-[14px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-b-brand text-brand'
                    : 'border-b-transparent text-heading hover:text-brand'
                }`}
              >
                {group.categoryName}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ items for active category */}
      <div className={`mt-5 ${COURSE_INNER_CARD}`} role="tabpanel" aria-label={activeGroup.categoryName}>
        {visible.map((item, index) => {
          const isOpen  = openItemId === item.id;
          const isFirst = index === 0;
          const isLast  = index === visible.length - 1;
          const addBottomPad = isLast && !hasMore;

          return (
            <div
              key={item.id}
              className={!isLast || hasMore ? COURSE_ROW_DIVIDER_FULL : undefined}
            >
              <button
                type="button"
                onClick={() => setOpenItemId(isOpen ? '' : item.id)}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 px-5 text-left transition-colors hover:bg-[#FAFAFA] md:px-6${isFirst ? ' pt-4 pb-3' : ' py-4'}`}
                aria-expanded={isOpen}
              >
                <span className="text-[14px] font-semibold text-heading">{item.title}</span>
                <FaqChevron open={isOpen} />
              </button>

              <div className={`${COURSE_ACCORDION_PANEL} ${isOpen ? COURSE_ACCORDION_PANEL_OPEN : COURSE_ACCORDION_PANEL_CLOSED} ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className={`${COURSE_ACCORDION_INNER} ${isOpen ? COURSE_ACCORDION_INNER_OPEN : COURSE_ACCORDION_INNER_CLOSED}`}>
                  <div className="px-5 pb-5 md:px-6">
                    <div
                      className={`w-full rounded-[20px] border border-[#F5F6F8] bg-[#F5F6F8] p-5 md:ml-[5%] md:w-[95%] md:p-6 ${COURSE_ACCORDION_ANSWER} [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-[13px] [&_h3]:font-semibold [&_h3:first-child]:mt-0`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      dangerouslySetInnerHTML={{ __html: item.content.replaceAll('&nbsp;', ' ') }}
                    />
                  </div>
                </div>
              </div>

              {addBottomPad && !isOpen ? <div className="pb-4" /> : null}
            </div>
          );
        })}

        {hasMore && !showAll ? (
          <div className={`${COURSE_TOP_DIVIDER_FULL} px-5 py-4 text-center md:px-6`}>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="group inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium leading-[18px] text-brand transition hover:underline"
            >
              View More
              <ViewMoreChevronIcon className="btn-download-icon shrink-0 text-brand" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
