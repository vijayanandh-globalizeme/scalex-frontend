'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type {
  CourseProgramRoadmapContent,
  ProgramRoadmapStage,
  ProgramRoadmapStageTheme,
} from '@/lib/courseBody';
import { COURSE_SECTION_CARD } from './courseSectionCard';

const STAGE_SCROLL_OFFSET = 116;
const SCROLL_IDLE_MS = 150;

function getActiveStageIndex(elements: HTMLElement[]) {
  const activationLine = window.innerHeight * 0.55;

  for (let index = elements.length - 1; index >= 0; index -= 1) {
    if (elements[index].getBoundingClientRect().top <= activationLine) {
      return index;
    }
  }

  return 0;
}

const STAGE_THEME: Record<
  ProgramRoadmapStageTheme,
  { accent: string; iconBg: string; softBg: string; dot: string }
> = {
  learning: {
    accent: '#FD022D',
    iconBg: '#FFF6F7',
    softBg: '#FFF6F7',
    dot: '#FD022D',
  },
  interview: {
    accent: '#E6A100',
    iconBg: '#FFF9E6',
    softBg: '#FFF9E6',
    dot: '#E6A100',
  },
  placement: {
    accent: '#388E0E',
    iconBg: '#E2FFD4',
    softBg: '#E2FFD4',
    dot: '#388E0E',
  },
};

const LEARNING_GRADIENT = 'linear-gradient(180deg, #FD022D 0%, #FFB700 100%)';
const INTERVIEW_ICON_GRADIENT = 'linear-gradient(180deg, #FFB700 0%, #FF8A00 100%)';
const INTERVIEW_NUMBER_GRADIENT = 'linear-gradient(180deg, #FFB700 0%, #388E0E 100%)';
const PLACEMENT_ICON_GRADIENT = 'linear-gradient(180deg, #4ADE80 0%, #388E0E 100%)';

const INTERVIEW_TOPIC_ICON_STYLES: Record<string, { bg: string; color: string }> = {
  Arrays: { bg: '#FFF0F0', color: '#FD022D' },
  'Linked Lists': { bg: '#FFF0F6', color: '#E91E8C' },
  Sorting: { bg: '#FFF6F0', color: '#FF6B00' },
  Searching: { bg: '#F0F6FF', color: '#2563EB' },
  'Greedy Algorithms': { bg: '#F5F0FF', color: '#7C3AED' },
  'Binary Search Trees': { bg: '#F0FFF4', color: '#16A34A' },
  Recursion: { bg: '#FFF8F0', color: '#D97706' },
  'Tries and Routes': { bg: '#F0FAFF', color: '#0891B2' },
  'Binary Trees': { bg: '#F0FFF0', color: '#15803D' },
  'Dynamic Programming': { bg: '#FFF0F5', color: '#DB2777' },
  'Famous Algorithms': { bg: '#F0F0FF', color: '#4F46E5' },
  Strings: { bg: '#FFF5F5', color: '#DC2626' },
  Heaps: { bg: '#FFFBEB', color: '#CA8A04' },
  'Stacks and Queues': { bg: '#F0FDFA', color: '#0D9488' },
};

function RedCircleCheckIcon() {
  return (
    <span className="mt-0.5 shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <g clipPath="url(#clip0_883_16683)">
          <path d="M8.57525 0.626172L9.57579 1.63596C9.67977 1.73496 9.77072 1.76796 9.90717 1.76796H11.3105C12.4799 1.76796 13.0127 2.32235 13.0127 3.49714V4.92933C13.0127 5.06133 13.0517 5.16033 13.1492 5.25933L14.1432 6.27572C14.9618 7.10734 14.9683 7.87948 14.1432 8.71109L13.1492 9.72748C13.0517 9.83311 13.0127 9.9255 13.0127 10.0641V11.4897C13.0127 12.6776 12.4735 13.2188 11.3105 13.2188H9.90717C9.77072 13.2188 9.67977 13.2584 9.57579 13.3575L8.57525 14.3672C7.7566 15.1988 6.9965 15.2055 6.17785 14.3672L5.17732 13.3575C5.07986 13.2584 4.98241 13.2188 4.85246 13.2188H3.44261C2.27965 13.2188 1.74039 12.6711 1.74039 11.4897V10.0641C1.74039 9.9255 1.7079 9.83311 1.61045 9.72748L0.616407 8.71109C-0.202217 7.87948 -0.208714 7.10734 0.616407 6.27572L1.61045 5.25933C1.7079 5.16033 1.74039 5.06133 1.74039 4.92933V3.49714C1.74039 2.30916 2.27965 1.76796 3.44261 1.76796H4.85246C4.98241 1.76796 5.07986 1.73496 5.17732 1.63596L6.17785 0.626172C6.9965 -0.205421 7.7566 -0.212021 8.57525 0.626172ZM9.40035 4.87653L6.62615 9.40409L5.30726 7.67491C5.14483 7.45709 5.00189 7.39112 4.81998 7.39112C4.52112 7.39112 4.29372 7.6353 4.29372 7.93889C4.29372 8.08412 4.35219 8.23592 4.44965 8.36791L6.0804 10.4007C6.24932 10.6317 6.43124 10.7175 6.65214 10.7175C6.87303 10.7175 7.06144 10.6119 7.19789 10.4007L10.2515 5.51013C10.3294 5.37813 10.4139 5.22633 10.4139 5.07453C10.4139 4.77094 10.1475 4.57294 9.86818 4.57294C9.69275 4.57294 9.52383 4.67194 9.40035 4.87653Z" fill="#FD022D" />
        </g>
        <defs>
          <clipPath id="clip0_883_16683">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}

function DarkCircleCheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E293B]">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
        <path
          d="M1 4.2L3.6 6.8L9 1.4"
          stroke="#FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function InterviewStageIcon() {
  return (
    <div
      className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
      style={{ background: INTERVIEW_ICON_GRADIENT }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="7" y="18" width="4" height="7" rx="1" fill="#FFF" />
        <rect x="14" y="13" width="4" height="12" rx="1" fill="#FFF" />
        <rect x="21" y="8" width="4" height="17" rx="1" fill="#FFF" />
      </svg>
    </div>
  );
}

function InterviewTopicIcon({ topic }: { topic: string }) {
  const style = INTERVIEW_TOPIC_ICON_STYLES[topic] ?? { bg: '#FFF6F7', color: '#FD022D' };

  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
      style={{ backgroundColor: style.bg, color: style.color }}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {topic === 'Arrays' ? (
          <>
            <rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor" />
            <rect x="10" y="3" width="5" height="5" rx="1" fill="currentColor" opacity="0.7" />
            <rect x="3" y="10" width="5" height="5" rx="1" fill="currentColor" opacity="0.7" />
            <rect x="10" y="10" width="5" height="5" rx="1" fill="currentColor" opacity="0.5" />
          </>
        ) : topic === 'Linked Lists' ? (
          <>
            <circle cx="5" cy="9" r="2.5" fill="currentColor" />
            <circle cx="11" cy="9" r="2.5" fill="currentColor" opacity="0.75" />
            <circle cx="17" cy="9" r="2.5" fill="currentColor" opacity="0.5" />
          </>
        ) : (
          <>
            <rect x="4" y="11" width="3" height="5" rx="0.5" fill="currentColor" />
            <rect x="8" y="8" width="3" height="8" rx="0.5" fill="currentColor" opacity="0.8" />
            <rect x="12" y="5" width="3" height="11" rx="0.5" fill="currentColor" opacity="0.6" />
          </>
        )}
      </svg>
    </span>
  );
}

function PlacementStageIcon() {
  return (
    <div
      className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
      style={{ background: PLACEMENT_ICON_GRADIENT }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="8" y="12" width="16" height="12" rx="2" stroke="#FFF" strokeWidth="1.8" />
        <path
          d="M13 12V10.5C13 9.12 14.12 8 15.5 8H16.5C17.88 8 19 9.12 19 10.5V12"
          stroke="#FFF"
          strokeWidth="1.8"
        />
        <path d="M8 18H24" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function PlacementFeatureIcon() {
  return (
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0]">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path
          d="M9 3.5C6.5 3.5 4.5 5.5 4.5 8C4.5 11.5 9 15.5 9 15.5C9 15.5 13.5 11.5 13.5 8C13.5 5.5 11.5 3.5 9 3.5Z"
          stroke="#FD022D"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="8" r="1.8" fill="#FD022D" />
        <path d="M9 8V5.8" stroke="#FD022D" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function LearningStageIcon() {
  return (
    <div
      className="flex h-[60px] w-[60px] items-center justify-center rounded-full"
      style={{ background: LEARNING_GRADIENT }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none" aria-hidden>
        <g clipPath="url(#clip0_883_16670)">
          <path d="M14.3001 18.5562C15.205 18.5666 16.0994 18.3387 17.2148 17.8417L27.5794 13.1817C28.2634 12.8711 28.6106 12.2705 28.6106 11.6491C28.6106 11.0382 28.2634 10.4375 27.5794 10.1268L17.2148 5.46682C16.0994 4.96976 15.205 4.74194 14.3001 4.75229C13.4056 4.74194 12.5112 4.96976 11.3853 5.46682L1.0312 10.1268C0.347242 10.4375 0 11.0382 0 11.6491C0 12.2705 0.347242 12.8711 1.0312 13.1817L11.3853 17.8417C12.5112 18.3387 13.4056 18.5666 14.3001 18.5562ZM14.3001 16.92C13.6056 16.92 12.9216 16.744 12.0272 16.3402L2.33599 12.0012C2.14659 11.9183 2.0624 11.794 2.0624 11.6491C2.0624 11.5145 2.14659 11.3902 2.33599 11.3074L12.0272 6.96838C12.9216 6.56452 13.6056 6.38847 14.3001 6.38847C15.0051 6.38847 15.6785 6.56452 16.5834 6.96838L26.2747 11.3074C26.4535 11.3902 26.5483 11.5145 26.5483 11.6491C26.5483 11.794 26.4535 11.9183 26.2747 12.0012L16.5834 16.3402C15.6785 16.744 15.0051 16.92 14.3001 16.92ZM4.10376 19.4365C4.10376 22.5328 8.10231 25.1527 14.3001 25.1527C20.5083 25.1527 24.5068 22.5328 24.5068 19.4365V13.9687H22.8128V19.4365C22.8128 21.6008 19.4876 23.589 14.3001 23.589C9.12299 23.589 5.79789 21.6008 5.79789 19.4365V13.9687H4.10376V19.4365ZM14.3421 12.8296C15.4785 12.8296 16.573 12.3222 16.573 11.6491C16.573 10.9967 15.4785 10.4996 14.3421 10.4996C13.2162 10.4996 12.1009 10.9967 12.1009 11.6491C12.1009 12.3222 13.2162 12.8296 14.3421 12.8296ZM7.94448 15.5634L14.1843 12.3118L13.6056 11.2453L6.57656 14.8489L7.94448 15.5634ZM6.57656 25.7223H7.94448V15.5634L6.57656 14.9007V25.7223ZM5.74527 25.9294V28.6529C5.74527 29.471 6.28192 29.9991 7.11319 29.9991H7.3973C8.22858 29.9991 8.76523 29.471 8.76523 28.6529V25.9294C8.76523 25.1113 8.22858 24.5832 7.3973 24.5832H7.11319C6.28192 24.5832 5.74527 25.1113 5.74527 25.9294Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_883_16670">
            <rect width="29" height="30" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function formatHighlight(text: string) {
  const colonIndex = text.indexOf(':');
  if (colonIndex === -1) {
    return <span className="font-bold text-[#1E293B]">{text}</span>;
  }

  const label = text.slice(0, colonIndex + 1);
  const rest = text.slice(colonIndex + 1);

  return (
    <>
      <span className="font-bold text-[#1E293B]">{label}</span>
      <span>{rest}</span>
    </>
  );
}

function RoadmapDotNav({
  stages,
  activeIndex,
  onSelect,
}: {
  stages: ProgramRoadmapStage[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <aside
      className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3"
      aria-label="Program roadmap stages"
    >
      {stages.map((stage, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => onSelect(index)}
            className="flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-110"
            aria-label={`Go to stage ${stage.stageNumber}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 8,
                height: isActive ? 10 : 8,
                backgroundColor: isActive ? STAGE_THEME[stage.theme].dot : '#D4D4D4',
              }}
            />
          </button>
        );
      })}
    </aside>
  );
}

function LearningStageSidebar({ stage }: { stage: ProgramRoadmapStage }) {
  return (
    <div className="relative shrink-0 md:w-[250px]">
      <LearningStageIcon />
      <p className="mt-6 pl-[7px] text-[16px] font-semibold uppercase leading-[140%] text-[#788593]" style={{ fontFamily: 'Inter' }}>Stage</p>
      <p
        className="mt-2 bg-clip-text text-[64px] font-bold leading-none text-transparent"
        style={{ backgroundImage: LEARNING_GRADIENT }}
      >
        {stage.stageNumber}
      </p>
      <p className="mt-3 text-[34px] font-bold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>
        {(() => { const [first, ...rest] = stage.trackLabel.split(' '); return <>{first}<br />{rest.join(' ')}</>; })()}
      </p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.description}
      </p>
      <div
        className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="39" viewBox="0 0 35 39" fill="none" aria-hidden>
          <g clipPath="url(#clip0_883_16664)">
            <path d="M5 30.3531V9.64705C5 7.37601 6.55271 6 8.56581 6C9.18425 6 9.82897 6.18713 10.4079 6.52105L28.1974 16.8874C29.3947 17.582 30 18.771 30 20C30 21.229 29.3947 22.4313 28.1974 23.1126L10.4079 33.479C9.81576 33.8397 9.18425 34 8.56581 34C6.55271 34 5 32.624 5 30.3531Z" fill="url(#paint0_linear_883_16664)" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_883_16664" x1="28.6607" y1="40.507" x2="16.6871" y2="-24.6815" gradientUnits="userSpaceOnUse">
              <stop offset="0.269231" stopColor="#FD022D" />
              <stop offset="0.515229" stopColor="#FFB700" />
              <stop offset="0.914683" stopColor="#00C017" />
            </linearGradient>
            <clipPath id="clip0_883_16664">
              <rect width="39" height="35" fill="white" transform="matrix(0 -1 -1 0 35 39)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function InterviewStageSidebar({ stage }: { stage: ProgramRoadmapStage }) {
  return (
    <div className="relative shrink-0 md:w-[250px]">
      <InterviewStageIcon />
      <p className="mt-6 pl-[7px] text-[16px] font-semibold uppercase leading-[140%] text-[#788593]" style={{ fontFamily: 'Inter' }}>Stage</p>
      <p
        className="mt-2 bg-clip-text text-[64px] font-bold leading-none text-transparent"
        style={{ backgroundImage: INTERVIEW_NUMBER_GRADIENT }}
      >
        {stage.stageNumber}
      </p>
      <p className="mt-3 text-[34px] font-bold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>{stage.trackLabel}</p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.description}
      </p>
      <div
        className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="39" viewBox="0 0 35 39" fill="none" aria-hidden>
          <g clipPath="url(#clip0_883_16664b)">
            <path d="M5 30.3531V9.64705C5 7.37601 6.55271 6 8.56581 6C9.18425 6 9.82897 6.18713 10.4079 6.52105L28.1974 16.8874C29.3947 17.582 30 18.771 30 20C30 21.229 29.3947 22.4313 28.1974 23.1126L10.4079 33.479C9.81576 33.8397 9.18425 34 8.56581 34C6.55271 34 5 32.624 5 30.3531Z" fill="url(#paint0_linear_883_16664b)" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_883_16664b" x1="28.6607" y1="40.507" x2="16.6871" y2="-24.6815" gradientUnits="userSpaceOnUse">
              <stop offset="0.269231" stopColor="#FD022D" />
              <stop offset="0.515229" stopColor="#FFB700" />
              <stop offset="0.914683" stopColor="#00C017" />
            </linearGradient>
            <clipPath id="clip0_883_16664b">
              <rect width="39" height="35" fill="white" transform="matrix(0 -1 -1 0 35 39)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function PlacementStageSidebar({ stage }: { stage: ProgramRoadmapStage }) {
  return (
    <div className="relative shrink-0 md:w-[250px]">
      <PlacementStageIcon />
      <p className="mt-6 pl-[7px] text-[16px] font-semibold uppercase leading-[140%] text-[#788593]" style={{ fontFamily: 'Inter' }}>Stage</p>
      <p className="mt-2 text-[64px] font-bold leading-none text-[#388E0E]">{stage.stageNumber}</p>
      <p className="mt-3 text-[34px] font-bold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>{stage.trackLabel}</p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.description}
      </p>
      <div
        className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="39" viewBox="0 0 35 39" fill="none" aria-hidden>
          <g clipPath="url(#clip0_883_16664c)">
            <path d="M5 30.3531V9.64705C5 7.37601 6.55271 6 8.56581 6C9.18425 6 9.82897 6.18713 10.4079 6.52105L28.1974 16.8874C29.3947 17.582 30 18.771 30 20C30 21.229 29.3947 22.4313 28.1974 23.1126L10.4079 33.479C9.81576 33.8397 9.18425 34 8.56581 34C6.55271 34 5 32.624 5 30.3531Z" fill="url(#paint0_linear_883_16664c)" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_883_16664c" x1="28.6607" y1="40.507" x2="16.6871" y2="-24.6815" gradientUnits="userSpaceOnUse">
              <stop offset="0.269231" stopColor="#FD022D" />
              <stop offset="0.515229" stopColor="#FFB700" />
              <stop offset="0.914683" stopColor="#00C017" />
            </linearGradient>
            <clipPath id="clip0_883_16664c">
              <rect width="39" height="35" fill="white" transform="matrix(0 -1 -1 0 35 39)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function StageSidebar({ stage }: { stage: ProgramRoadmapStage }) {
  if (stage.theme === 'learning') {
    return <LearningStageSidebar stage={stage} />;
  }

  if (stage.theme === 'interview') {
    return <InterviewStageSidebar stage={stage} />;
  }

  if (stage.theme === 'placement') {
    return <PlacementStageSidebar stage={stage} />;
  }

  return null;
}

function ProgramRoadmapSectionHeader({
  title,
  subtitle,
  headingId,
}: {
  title: string;
  subtitle?: string;
  headingId?: string;
}) {
  return (
    <>
      <h2
        id={headingId}
        className="text-[34px] font-bold leading-[140%] text-[#1E293B]"
        style={{ fontFamily: 'Inter' }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className="mt-1 max-w-3xl text-[18px] font-medium leading-[140%] text-[#788593]"
          style={{ fontFamily: 'Inter' }}
        >
          {subtitle}
        </p>
      ) : null}
    </>
  );
}

function LearningStageContent({
  stage,
  sectionTitle,
  sectionSubtitle,
  headingId,
}: {
  stage: ProgramRoadmapStage;
  sectionTitle?: string;
  sectionSubtitle?: string;
  headingId?: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      {sectionTitle ? (
        <ProgramRoadmapSectionHeader
          title={sectionTitle}
          subtitle={sectionSubtitle}
          headingId={headingId}
        />
      ) : null}
      <h4
        className={`text-[20px] font-semibold leading-[140%] text-[#1E293B] ${
          sectionTitle ? 'mt-8' : ''
        }`}
        style={{ fontFamily: 'Inter' }}
      >
        {stage.contentHeading}
      </h4>
      <ul className="mt-6 space-y-4" role="list">
        {stage.highlights?.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <RedCircleCheckIcon />
            <span className="text-[14px] font-normal leading-[150%] text-[#788593]">
              {formatHighlight(item)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {stage.projects?.map((project, index) => {
          const title = `${project.company} ${project.projectName}`;

          return (
            <div
              key={`${project.company}-${project.projectName}-${index}`}
              className="flex items-center justify-between gap-4 rounded-[12px] border border-[#EBEBEB] bg-white px-5 py-4 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]"
            >
              <p className="min-w-0 text-[14px] font-bold leading-[140%] text-[#1E293B]">{title}</p>
              {project.logoSrc ? (
                <div className="relative h-8 w-16 shrink-0">
                  <Image
                    src={project.logoSrc}
                    alt={project.logoAlt ?? project.company}
                    fill
                    className="object-contain object-right"
                    sizes="64px"
                  />
                </div>
              ) : (
                <span className="shrink-0 text-right text-[12px] font-bold uppercase tracking-wide text-[#788593]">
                  {project.company.split(' ')[0]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InterviewStageContent({
  stage,
  sectionTitle,
  sectionSubtitle,
  headingId,
}: {
  stage: ProgramRoadmapStage;
  sectionTitle?: string;
  sectionSubtitle?: string;
  headingId?: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      {sectionTitle ? (
        <ProgramRoadmapSectionHeader
          title={sectionTitle}
          subtitle={sectionSubtitle}
          headingId={headingId}
        />
      ) : null}
      <h4
        className={`text-[20px] font-semibold leading-[140%] text-[#1E293B] ${
          sectionTitle ? 'mt-8' : ''
        }`}
        style={{ fontFamily: 'Inter' }}
      >
        {stage.contentHeading}
      </h4>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {stage.topics?.map((topic) => (
          <div
            key={topic}
            className="flex items-center justify-between gap-3 rounded-[12px] border border-[#EBEBEB] bg-white px-4 py-3.5 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <InterviewTopicIcon topic={topic} />
              <span className="text-[14px] font-medium text-[#1E293B]">{topic}</span>
            </div>
            <DarkCircleCheckIcon />
          </div>
        ))}
      </div>
      {stage.showMoreLabel ? (
        <button type="button" className="mt-5 text-[14px] font-semibold text-[#FD022D]">
          {stage.showMoreLabel}
        </button>
      ) : null}
    </div>
  );
}

function PlacementStageContent({
  stage,
  sectionTitle,
  sectionSubtitle,
  headingId,
}: {
  stage: ProgramRoadmapStage;
  sectionTitle?: string;
  sectionSubtitle?: string;
  headingId?: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      {sectionTitle ? (
        <ProgramRoadmapSectionHeader
          title={sectionTitle}
          subtitle={sectionSubtitle}
          headingId={headingId}
        />
      ) : null}
      <h4
        className={`text-[20px] font-semibold leading-[140%] text-[#1E293B] ${
          sectionTitle ? 'mt-8' : ''
        }`}
        style={{ fontFamily: 'Inter' }}
      >
        {stage.contentHeading}
      </h4>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {stage.placementFeatures?.map((feature) => (
          <div key={feature.title} className="flex gap-3">
            <PlacementFeatureIcon />
            <div>
              <p className="text-[14px] font-bold leading-[140%] text-[#1E293B]">{feature.title}</p>
              <p className="mt-1 text-[13px] font-normal leading-[150%] text-[#788593]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {stage.hiringPartnersTitle ? (
        <div className="mt-10">
          <p className="text-[14px] font-bold text-[#1E293B]">{stage.hiringPartnersTitle}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
            {stage.hiringPartnerLogos?.map((logo) => (
              <div key={logo.alt} className="relative h-8 w-20">
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="80px" />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StagePanel({
  stage,
  stageIndex,
  stageRef,
  stageContentRef,
  stages,
  activeIndex,
  onSelect,
  onNext,
  sectionTitle,
  sectionSubtitle,
  headingId,
}: {
  stage: ProgramRoadmapStage;
  stageIndex: number;
  stageRef: (node: HTMLElement | null) => void;
  stageContentRef: (node: HTMLElement | null) => void;
  stages: ProgramRoadmapStage[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onNext?: () => void;
  sectionTitle?: string;
  sectionSubtitle?: string;
  headingId?: string;
}) {
  const isLearning = stage.theme === 'learning';
  const isInterview = stage.theme === 'interview';
  const isPlacement = stage.theme === 'placement';
  const isFlatStage = isLearning || isInterview || isPlacement;

  return (
    <article
      id={stage.id}
      ref={stageRef}
      data-stage-index={stageIndex}
      className={`relative scroll-mt-[116px] px-6 py-5 pr-10 md:px-8 md:py-6 md:pr-12 ${COURSE_SECTION_CARD} rounded-none`}
    >
      {sectionTitle ? (
        <div className="mb-8">
          <ProgramRoadmapSectionHeader
            title={sectionTitle}
            subtitle={sectionSubtitle}
          />
        </div>
      ) : null}
      <RoadmapDotNav stages={stages} activeIndex={activeIndex} onSelect={onSelect} />

      <div
        ref={stageContentRef}
        className={`flex flex-col gap-8 ${
          isFlatStage ? 'md:flex-row md:items-start md:gap-10 xl:gap-14' : 'lg:flex-row lg:gap-10'
        }`}
      >
        <StageSidebar stage={stage} />
        {isLearning ? (
          <LearningStageContent stage={stage} />
        ) : isInterview ? (
          <InterviewStageContent stage={stage} />
        ) : (
          <PlacementStageContent stage={stage} />
        )}
      </div>
      {stage.nextStageLabel && stage.nextStageId && onNext ? (
        <StageNextLink
          label={stage.nextStageLabel}
          theme={stage.theme}
          onClick={onNext}
        />
      ) : null}
    </article>
  );
}

function StageNextLink({
  label,
  onClick,
  theme,
}: {
  label: string;
  onClick: () => void;
  theme: ProgramRoadmapStageTheme;
}) {
  const chevronColor =
    theme === 'learning' ? '#FD022D' : theme === 'interview' ? '#E6A100' : '#388E0E';

  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-10 flex flex-col items-center gap-1 text-[14px] font-medium text-[#788593] transition-colors hover:text-[#1E293B]"
    >
      {label}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M4 6L8 10L12 6"
          stroke={chevronColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 9L8 13L12 9"
          stroke={chevronColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function CourseProgramRoadmapSection({
  content,
}: {
  content: CourseProgramRoadmapContent;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const stageContentRefs = useRef<(HTMLElement | null)[]>([]);
  const pendingScrollIndexRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    let frame = 0;

    const clearScrollIdleTimer = () => {
      if (scrollIdleTimerRef.current !== null) {
        clearTimeout(scrollIdleTimerRef.current);
        scrollIdleTimerRef.current = null;
      }
    };

    const releasePendingScroll = () => {
      if (pendingScrollIndexRef.current === null) return;
      pendingScrollIndexRef.current = null;
      updateActiveFromScroll();
    };

    const schedulePendingScrollRelease = () => {
      clearScrollIdleTimer();
      scrollIdleTimerRef.current = setTimeout(releasePendingScroll, SCROLL_IDLE_MS);
    };

    const updateActiveFromScroll = () => {
      if (pendingScrollIndexRef.current !== null) {
        setActiveIndex(pendingScrollIndexRef.current);
        schedulePendingScrollRelease();
        return;
      }

      const elements = stageContentRefs.current.filter((el): el is HTMLElement => el !== null);
      if (elements.length === 0) return;

      const nextIndex = getActiveStageIndex(elements);
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveFromScroll);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll);
    window.addEventListener('scrollend', releasePendingScroll);
    window.addEventListener('hashchange', updateActiveFromScroll);

    return () => {
      cancelAnimationFrame(frame);
      clearScrollIdleTimer();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
      window.removeEventListener('scrollend', releasePendingScroll);
      window.removeEventListener('hashchange', updateActiveFromScroll);
    };
  }, [content.stages.length]);

  const scrollToStage = (index: number) => {
    const target = stageRefs.current[index];
    if (!target) return;

    pendingScrollIndexRef.current = index;
    setActiveIndex(index);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, {
      duration: 1,
      ease: 'power2.inOut',
      scrollTo: { y: target, offsetY: STAGE_SCROLL_OFFSET },
      onComplete: () => {
        pendingScrollIndexRef.current = null;
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="program-roadmap"
      className="relative scroll-mt-[116px]"
      aria-labelledby="program-roadmap-heading"
    >
      {content.stages.map((stage, index) => (
        <StagePanel
          key={stage.id}
          stage={stage}
          stageIndex={index}
          stages={content.stages}
          activeIndex={activeIndex}
          onSelect={scrollToStage}
          sectionTitle={content.title}
          sectionSubtitle={content.subtitle}
          stageRef={(node) => {
            stageRefs.current[index] = node;
          }}
          stageContentRef={(node) => {
            stageContentRefs.current[index] = node;
          }}
          onNext={stage.nextStageId ? () => scrollToStage(index + 1) : undefined}
        />
      ))}
    </section>
  );
}
