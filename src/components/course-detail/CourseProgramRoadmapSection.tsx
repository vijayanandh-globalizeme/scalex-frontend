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
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FD022D]">
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
      className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
      style={{ background: LEARNING_GRADIENT }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16 8L4 14.5V17.5L16 24L28 17.5V14.5L16 8Z"
          stroke="#FFF"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M4 14.5L16 21L28 14.5" stroke="#FFF" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16 21V26" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M22 17V22.5" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
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
      <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.14em] text-[#788593]">Stage</p>
      <p
        className="mt-2 bg-clip-text text-[64px] font-bold leading-none text-transparent"
        style={{ backgroundImage: LEARNING_GRADIENT }}
      >
        {stage.stageNumber}
      </p>
      <p className="mt-3 text-[20px] font-bold leading-normal text-[#1E293B]">{stage.trackLabel}</p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.description}
      </p>
      <div
        className="absolute -right-4 top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[7px] border-l-[9px] border-y-transparent border-l-[#FD022D] md:block"
        aria-hidden
      />
    </div>
  );
}

function InterviewStageSidebar({ stage }: { stage: ProgramRoadmapStage }) {
  return (
    <div className="relative shrink-0 md:w-[250px]">
      <InterviewStageIcon />
      <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.14em] text-[#788593]">Stage</p>
      <p
        className="mt-2 bg-clip-text text-[64px] font-bold leading-none text-transparent"
        style={{ backgroundImage: INTERVIEW_NUMBER_GRADIENT }}
      >
        {stage.stageNumber}
      </p>
      <p className="mt-3 text-[20px] font-bold leading-normal text-[#1E293B]">{stage.trackLabel}</p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.description}
      </p>
      <div
        className="absolute -right-4 top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[7px] border-l-[9px] border-y-transparent border-l-[#E6A100] md:block"
        aria-hidden
      />
    </div>
  );
}

function PlacementStageSidebar({ stage }: { stage: ProgramRoadmapStage }) {
  return (
    <div className="relative shrink-0 md:w-[250px]">
      <PlacementStageIcon />
      <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.14em] text-[#788593]">Stage</p>
      <p className="mt-2 text-[64px] font-bold leading-none text-[#388E0E]">{stage.stageNumber}</p>
      <p className="mt-3 text-[20px] font-bold leading-normal text-[#1E293B]">{stage.trackLabel}</p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.description}
      </p>
      <div
        className="absolute -right-4 top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[7px] border-l-[9px] border-y-transparent border-l-[#388E0E] md:block"
        aria-hidden
      />
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
        className={`text-[20px] font-bold leading-normal text-[#1E293B] ${
          sectionTitle ? 'mt-8' : ''
        }`}
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
        className={`text-[20px] font-bold leading-normal text-[#1E293B] ${
          sectionTitle ? 'mt-8' : ''
        }`}
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
        className={`text-[20px] font-bold leading-normal text-[#1E293B] ${
          sectionTitle ? 'mt-8' : ''
        }`}
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
