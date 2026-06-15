'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CourseFaqsContent } from '@/lib/courseBody';
import {
  COURSE_INNER_CARD,
  COURSE_ROW_DIVIDER_FULL,
  COURSE_SECTION_CARD,
  COURSE_TOP_DIVIDER_FULL,
} from './courseSectionCard';

const TAB_BAR_SCROLL =
  'flex h-[48px] items-stretch gap-6 overflow-x-auto rounded-lg bg-[#FCFCFC] px-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)] [-ms-overflow-style:none] [scrollbar-width:none] md:gap-10 md:px-6 [&::-webkit-scrollbar]:hidden';

function FaqChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-brand transition-transform duration-200 ${
        open ? 'rotate-180' : 'rotate-0'
      }`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViewMoreChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="11" viewBox="0 0 18 11" fill="none" aria-hidden>
      <path
        d="M7.50374 9C7.69084 9 7.87795 8.92839 8.00517 8.79244L13.7979 3.11657C13.9251 2.99489 14 2.83742 14 2.65849C14 2.2863 13.7081 2 13.3189 2C13.1318 2 12.9597 2.07158 12.8325 2.1861L7.09959 7.79038H7.9004L2.16753 2.1861C2.04778 2.07158 1.87565 2 1.68106 2C1.29188 2 1 2.2863 1 2.65849C1 2.83742 1.07484 2.99489 1.20207 3.12372L6.99482 8.79244C7.13701 8.92839 7.30915 9 7.50374 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CourseFaqsSection({ faqs }: { faqs: CourseFaqsContent }) {
  const [activeTabId, setActiveTabId] = useState(faqs.tabs[0]?.id ?? '');
  const [openItemId, setOpenItemId] = useState(faqs.tabs[0]?.items[0]?.id ?? '');

  const activeTab = faqs.tabs.find((tab) => tab.id === activeTabId) ?? faqs.tabs[0];

  if (!activeTab) return null;

  return (
    <div
      id="faqs"
      className={`scroll-mt-[116px] ${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6`}
    >
      <h2 className="text-[34px] font-bold leading-[140%] text-heading">{faqs.title}</h2>

      <div className="mt-5" role="tablist" aria-label={faqs.title}>
        <div className={TAB_BAR_SCROLL}>
          {faqs.tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setOpenItemId(tab.items[0]?.id ?? '');
                }}
                className={`flex h-full shrink-0 items-center border-0 border-b-[3px] bg-transparent px-0 text-[14px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-b-brand text-brand'
                    : 'border-b-transparent text-heading hover:text-brand'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`mt-5 ${COURSE_INNER_CARD}`} role="tabpanel">
        {activeTab.items.map((item, index) => {
          const isOpen = openItemId === item.id;
          const isLastItem = index === activeTab.items.length - 1;

          return (
            <div key={item.id} className={!isLastItem ? COURSE_ROW_DIVIDER_FULL : undefined}>
              <button
                type="button"
                onClick={() => setOpenItemId(isOpen ? '' : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                aria-expanded={isOpen}
              >
                <span className="text-[14px] font-semibold text-heading">{item.question}</span>
                <FaqChevron open={isOpen} />
              </button>
              {isOpen ? (
                <div className="px-5 pb-5 md:px-6">
                  <div className="ml-[5%] w-[95%] rounded-lg bg-[#F8F9FB] p-5 md:p-6">
                    <h4 className="text-[13px] font-semibold text-heading">Learning Objectives</h4>
                    <div className="mt-2 space-y-2">
                      {item.learningObjectives.map((paragraph) => (
                        <p key={paragraph} className="text-[13px] leading-relaxed text-muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <h4 className="mt-5 text-[13px] font-semibold text-heading">Topics Covered</h4>
                    <ul className="mt-2 space-y-1.5" role="list">
                      {item.topicsCovered.map((topic) => (
                        <li key={topic} className="text-[13px] leading-relaxed text-muted">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}

        <div className={`${COURSE_TOP_DIVIDER_FULL} px-5 py-4 text-center md:px-6`}>
          <Link
            href={faqs.viewMoreHref}
            className="group inline-flex items-center gap-2 text-[14px] font-medium leading-[18px] text-brand transition hover:underline"
          >
            {faqs.viewMoreLabel}
            <ViewMoreChevronIcon className="btn-download-icon shrink-0 text-brand" />
          </Link>
        </div>
      </div>
    </div>
  );
}
