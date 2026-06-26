'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { ApiRoadmap, ApiRoadmapQuestion, ApiOtherDetail } from '@/services/courseApi';
import { COURSE_SECTION_CARD } from './courseSectionCard';
import { ROADMAP_SHOW_MORE_LABEL, ROADMAP_HIRING_PARTNERS_TITLE } from '@/lib/courseDetailStatics';

const STAGE_SCROLL_OFFSET = 116;
const SCROLL_IDLE_MS = 150;
const INTERVIEW_MAX_VISIBLE = 7;

type StageTheme = 'learning' | 'interview' | 'placement';

function getTheme(type: number): StageTheme {
  if (type === 2) return 'interview';
  if (type === 3) return 'placement';
  return 'learning';
}

function getActiveStageIndex(elements: HTMLElement[]) {
  const activationLine = window.innerHeight * 0.55;

  for (let index = elements.length - 1; index >= 0; index -= 1) {
    if (elements[index].getBoundingClientRect().top <= activationLine) {
      return index;
    }
  }

  return 0;
}

const STAGE_THEME: Record<StageTheme, { accent: string; iconBg: string; softBg: string; dot: string }> = {
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
    <span className="shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <g clipPath="url(#clip0_883_16797)">
          <path d="M8.57525 0.626172L9.57579 1.63596C9.67977 1.73496 9.77072 1.76796 9.90717 1.76796H11.3105C12.4799 1.76796 13.0127 2.32235 13.0127 3.49714V4.92933C13.0127 5.06133 13.0517 5.16033 13.1492 5.25933L14.1432 6.27572C14.9618 7.10734 14.9683 7.87948 14.1432 8.71109L13.1492 9.72748C13.0517 9.83311 13.0127 9.9255 13.0127 10.0641V11.4897C13.0127 12.6776 12.4735 13.2188 11.3105 13.2188H9.90717C9.77072 13.2188 9.67977 13.2584 9.57579 13.3575L8.57525 14.3672C7.7566 15.1988 6.9965 15.2055 6.17785 14.3672L5.17732 13.3575C5.07986 13.2584 4.98241 13.2188 4.85246 13.2188H3.44261C2.27965 13.2188 1.74039 12.6711 1.74039 11.4897V10.0641C1.74039 9.9255 1.7079 9.83311 1.61045 9.72748L0.616407 8.71109C-0.202217 7.87948 -0.208714 7.10734 0.616407 6.27572L1.61045 5.25933C1.7079 5.16033 1.74039 5.06133 1.74039 4.92933V3.49714C1.74039 2.30916 2.27965 1.76796 3.44261 1.76796H4.85246C4.98241 1.76796 5.07986 1.73496 5.17732 1.63596L6.17785 0.626172C6.9965 -0.205421 7.7566 -0.212021 8.57525 0.626172ZM9.40035 4.87653L6.62615 9.40409L5.30726 7.67491C5.14483 7.45709 5.00189 7.39112 4.81998 7.39112C4.52112 7.39112 4.29372 7.6353 4.29372 7.93889C4.29372 8.08412 4.35219 8.23592 4.44965 8.36791L6.0804 10.4007C6.24932 10.6317 6.43124 10.7175 6.65214 10.7175C6.87303 10.7175 7.06144 10.6119 7.19789 10.4007L10.2515 5.51013C10.3294 5.37813 10.4139 5.22633 10.4139 5.07453C10.4139 4.77094 10.1475 4.57294 9.86818 4.57294C9.69275 4.57294 9.52383 4.67194 9.40035 4.87653Z" fill="#1E293B" />
        </g>
        <defs>
          <clipPath id="clip0_883_16797">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}

function formatHighlight(text: string) {
  const colonIndex = text.indexOf(':');
  if (colonIndex === -1) {
    return <span className="font-medium text-[#1E293B]">{text}</span>;
  }

  const label = text.slice(0, colonIndex + 1);
  const rest = text.slice(colonIndex + 1);

  return (
    <>
      <span className="font-medium text-[#1E293B]">{label}</span>
      <span className="font-normal text-[#1E293B]">{rest}</span>
    </>
  );
}

function RoadmapDotNav({
  stages,
  activeIndex,
  onSelect,
}: {
  stages: ApiRoadmap[];
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
        const theme = getTheme(stage.type);
        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => onSelect(index)}
            className="flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-110"
            aria-label={`Go to stage ${index + 1}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 8,
                height: isActive ? 10 : 8,
                backgroundColor: isActive ? STAGE_THEME[theme].dot : '#D4D4D4',
              }}
            />
          </button>
        );
      })}
    </aside>
  );
}

function StageSidebarIcon({ icon, theme }: { icon: string; theme: StageTheme }) {
  const gradients: Record<StageTheme, string> = {
    learning: LEARNING_GRADIENT,
    interview: 'linear-gradient(99deg, #FFB700 47.39%, #00C017 187.55%)',
    placement: 'linear-gradient(99deg, #FFB700 -19.21%, #00C017 33.47%)',
  };

  return (
    <div
      className="flex h-[60px] w-[60px] items-center justify-center rounded-full"
      style={{ background: gradients[theme] }}
    >
      <i className={`fa fa-${icon} text-[24px] text-white`} aria-hidden />
    </div>
  );
}

function StageSidebarArrow({ theme }: { theme: StageTheme }) {
  const gradients: Record<StageTheme, { id: string; stops: { offset?: string; color: string }[] }> = {
    learning: {
      id: 'learning-arrow',
      stops: [
        { offset: '0.269231', color: '#FD022D' },
        { offset: '0.515229', color: '#FFB700' },
        { offset: '0.914683', color: '#00C017' },
      ],
    },
    interview: {
      id: 'interview-arrow',
      stops: [
        { offset: '0.322115', color: '#FFB700' },
        { offset: '1', color: '#00C017' },
      ],
    },
    placement: {
      id: 'placement-arrow',
      stops: [
        { color: '#FFB700' },
        { offset: '0.254808', color: '#00C017' },
      ],
    },
  };

  const g = gradients[theme];

  return (
    <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="39" viewBox="0 0 35 39" fill="none">
        <g clipPath={`url(#clip-${g.id})`}>
          <path
            d="M5 30.3531V9.64705C5 7.37601 6.55271 6 8.56581 6C9.18425 6 9.82897 6.18713 10.4079 6.52105L28.1974 16.8874C29.3947 17.582 30 18.771 30 20C30 21.229 29.3947 22.4313 28.1974 23.1126L10.4079 33.479C9.81576 33.8397 9.18425 34 8.56581 34C6.55271 34 5 32.624 5 30.3531Z"
            fill={`url(#grad-${g.id})`}
          />
        </g>
        <defs>
          <linearGradient id={`grad-${g.id}`} x1="28.6607" y1="40.507" x2="16.6871" y2="-24.6815" gradientUnits="userSpaceOnUse">
            {g.stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
          <clipPath id={`clip-${g.id}`}>
            <rect width="39" height="35" fill="white" transform="matrix(0 -1 -1 0 35 39)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LearningStageSidebar({ stage, stageNumber }: { stage: ApiRoadmap; stageNumber: string }) {
  const [first, ...rest] = stage.sideTitle.split(' ');
  return (
    <div className="relative shrink-0 md:w-[250px]">
      <StageSidebarIcon icon={stage.icon} theme="learning" />
      <p className="mt-6 pl-[7px] text-[16px] font-semibold uppercase leading-[140%] text-[#788593]" style={{ fontFamily: 'Inter' }}>Stage</p>
      <p
        className="mt-2 bg-clip-text text-[64px] font-bold leading-none text-transparent"
        style={{ backgroundImage: LEARNING_GRADIENT }}
      >
        {stageNumber}
      </p>
      <p className="mt-3 text-[34px] font-bold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>
        {first}<br />{rest.join(' ')}
      </p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.sideDescription}
      </p>
      <StageSidebarArrow theme="learning" />
    </div>
  );
}

function InterviewStageSidebar({ stage, stageNumber }: { stage: ApiRoadmap; stageNumber: string }) {
  const [first, ...rest] = stage.sideTitle.split(' ');
  return (
    <div className="relative shrink-0 md:w-[250px]">
      <StageSidebarIcon icon={stage.icon} theme="interview" />
      <p className="mt-6 pl-[7px] text-[16px] font-semibold uppercase leading-[140%] text-[#788593]" style={{ fontFamily: 'Inter' }}>Stage</p>
      <p className="mt-2 text-[64px] font-bold leading-none">
        <span style={{ color: '#FFB700' }}>{stageNumber.slice(0, -1)}</span>
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(99deg, #FFB700 47.39%, #00C017 187.55%)' }}
        >{stageNumber.slice(-1)}</span>
      </p>
      <p className="mt-3 text-[34px] font-bold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>
        {first}<br />{rest.join(' ')}
      </p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.sideDescription}
      </p>
      <StageSidebarArrow theme="interview" />
    </div>
  );
}

function PlacementStageSidebar({ stage, stageNumber }: { stage: ApiRoadmap; stageNumber: string }) {
  return (
    <div className="relative shrink-0 md:w-[250px]">
      <StageSidebarIcon icon={stage.icon} theme="placement" />
      <p className="mt-6 pl-[7px] text-[16px] font-semibold uppercase leading-[140%] text-[#788593]" style={{ fontFamily: 'Inter' }}>Stage</p>
      <p
        className="mt-2 bg-clip-text text-[64px] font-bold leading-none text-transparent"
        style={{ backgroundImage: 'linear-gradient(99deg, #FFB700 -19.21%, #00C017 33.47%)' }}
      >{stageNumber}</p>
      <p className="mt-3 text-[34px] font-bold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>{stage.sideTitle}</p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">
        {stage.sideDescription}
      </p>
      <StageSidebarArrow theme="placement" />
    </div>
  );
}

function StageSidebar({ stage, stageNumber }: { stage: ApiRoadmap; stageNumber: string }) {
  const theme = getTheme(stage.type);
  if (theme === 'learning') return <LearningStageSidebar stage={stage} stageNumber={stageNumber} />;
  if (theme === 'interview') return <InterviewStageSidebar stage={stage} stageNumber={stageNumber} />;
  return <PlacementStageSidebar stage={stage} stageNumber={stageNumber} />;
}

function ProgramRoadmapSectionHeader({
  title,
  description,
  headingId,
}: {
  title: string;
  description?: string;
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
      {description ? (
        <p
          className="mt-1 max-w-3xl text-[18px] font-medium leading-[140%] text-[#788593]"
          style={{ fontFamily: 'Inter' }}
        >
          {description}
        </p>
      ) : null}
    </>
  );
}

function LearningStageContent({
  stage,
  otherDetails,
  sectionTitle,
  sectionDescription,
  headingId,
}: {
  stage: ApiRoadmap;
  otherDetails: ApiOtherDetail[];
  sectionTitle?: string;
  sectionDescription?: string;
  headingId?: string;
}) {
  const highlights = stage.content
    ? stage.content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    : [];

  const projects = otherDetails.filter((d) => d.entityId === stage.id);

  return (
    <div className="min-w-0 flex-1">
      {sectionTitle ? (
        <ProgramRoadmapSectionHeader
          title={sectionTitle}
          description={sectionDescription}
          headingId={headingId}
        />
      ) : null}
      <h4
        className={`text-[20px] font-semibold leading-[140%] text-[#1E293B] ${sectionTitle ? 'mt-8' : ''}`}
        style={{ fontFamily: 'Inter' }}
      >
        {stage.heading}
      </h4>
      <ul className="mt-6 space-y-4" role="list">
        {highlights.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <RedCircleCheckIcon />
            <span className="text-[14px] leading-[152%]" style={{ fontFamily: 'Inter' }}>
              {formatHighlight(item)}
            </span>
          </li>
        ))}
      </ul>
      {projects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between gap-4 rounded-[12px] border border-[#EBEBEB] bg-white px-5 py-4 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]"
            >
              <p className="min-w-0 text-[14px] font-medium text-[#000]" style={{ fontFamily: 'Inter', lineHeight: '20px' }}>{project.title}</p>
              {project.file ? (
                <div className="relative h-8 w-16 shrink-0">
                  <Image
                    src={project.file.url}
                    alt={project.title}
                    fill
                    className="object-contain object-right"
                    sizes="64px"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function InterviewStageContent({
  stage,
  sectionTitle,
  sectionDescription,
  headingId,
}: {
  stage: ApiRoadmap;
  sectionTitle?: string;
  sectionDescription?: string;
  headingId?: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const questions = stage.questions ?? [];
  const visible = showAll ? questions : questions.slice(0, INTERVIEW_MAX_VISIBLE);

  return (
    <div className="min-w-0 flex-1">
      {sectionTitle ? (
        <ProgramRoadmapSectionHeader
          title={sectionTitle}
          description={sectionDescription}
          headingId={headingId}
        />
      ) : null}
      <h4
        className={`text-[20px] font-semibold leading-[140%] text-[#1E293B] ${sectionTitle ? 'mt-8' : ''}`}
        style={{ fontFamily: 'Inter' }}
      >
        {stage.heading}
      </h4>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((q, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 rounded-[12px] border border-[#EBEBEB] bg-white px-4 py-3.5 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-full bg-[#FFF6F7]" aria-hidden>
                <i className={`fa fa-${q.icon} text-[13px] text-[#FD022D]`} />
              </span>
              <span className="text-[14px] font-medium text-[#1E293B]">{q.title}</span>
            </div>
            <DarkCircleCheckIcon />
          </div>
        ))}
      </div>
      {!showAll && questions.length > INTERVIEW_MAX_VISIBLE ? (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-5 text-[14px] font-semibold text-[#FD022D]"
        >
          {ROADMAP_SHOW_MORE_LABEL}
        </button>
      ) : null}
    </div>
  );
}

function PlacementStageContent({
  stage,
  sectionTitle,
  sectionDescription,
  headingId,
}: {
  stage: ApiRoadmap;
  sectionTitle?: string;
  sectionDescription?: string;
  headingId?: string;
}) {
  const features = stage.questions ?? [];

  return (
    <div className="min-w-0 flex-1">
      {sectionTitle ? (
        <ProgramRoadmapSectionHeader
          title={sectionTitle}
          description={sectionDescription}
          headingId={headingId}
        />
      ) : null}
      <h4
        className={`text-[20px] font-semibold leading-[140%] text-[#1E293B] ${sectionTitle ? 'mt-8' : ''}`}
        style={{ fontFamily: 'Inter' }}
      >
        {stage.heading}
      </h4>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col gap-2" style={{ maxWidth: '264px' }}>
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0]">
              <i className={`fa fa-${feature.icon} text-[16px] text-[#FD022D]`} aria-hidden />
            </span>
            <div>
              <p className="text-[14px] font-bold leading-[140%] text-[#1E293B]">{feature.title}</p>
              <p className="mt-1 text-[13px] font-normal leading-[150%] text-[#788593]">
                {feature.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <p className="text-[18px] font-medium leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>
          {ROADMAP_HIRING_PARTNERS_TITLE}
        </p>
      </div>
    </div>
  );
}

function StageNextLink({
  onClick,
  theme,
}: {
  onClick: () => void;
  theme: StageTheme;
}) {
  const chevronColor =
    theme === 'learning' ? '#FD022D' : theme === 'interview' ? '#E6A100' : '#388E0E';

  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-10 flex flex-col items-center gap-1 text-[14px] font-medium text-[#788593] transition-colors hover:text-[#1E293B]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M4 6L8 10L12 6" stroke={chevronColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 9L8 13L12 9" stroke={chevronColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
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
  otherDetails,
  sectionTitle,
  sectionDescription,
  headingId,
}: {
  stage: ApiRoadmap;
  stageIndex: number;
  stageRef: (node: HTMLElement | null) => void;
  stageContentRef: (node: HTMLElement | null) => void;
  stages: ApiRoadmap[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onNext?: () => void;
  otherDetails: ApiOtherDetail[];
  sectionTitle?: string;
  sectionDescription?: string;
  headingId?: string;
}) {
  const isLearning = stage.type === 1;
  const isInterview = stage.type === 2;
  const isPlacement = stage.type === 3;
  const isFlatStage = isLearning || isInterview || isPlacement;
  const theme = getTheme(stage.type);
  const stageNumber = String(stageIndex + 1).padStart(2, '0');

  return (
    <article
      id={stage.id}
      ref={stageRef}
      data-stage-index={stageIndex}
      className={`relative scroll-mt-[116px] px-6 py-5 pr-10 md:px-8 md:py-6 md:pr-12 ${COURSE_SECTION_CARD} rounded-none`}
    >
      {stageIndex === 0 && sectionTitle ? (
        <div className="mb-8">
          <ProgramRoadmapSectionHeader
            title={sectionTitle}
            description={sectionDescription}
            headingId={headingId}
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
        <StageSidebar stage={stage} stageNumber={stageNumber} />
        {isLearning ? (
          <LearningStageContent stage={stage} otherDetails={otherDetails} />
        ) : isInterview ? (
          <InterviewStageContent stage={stage} />
        ) : (
          <PlacementStageContent stage={stage} />
        )}
      </div>
      {onNext ? (
        <StageNextLink theme={theme} onClick={onNext} />
      ) : null}
    </article>
  );
}

export default function CourseProgramRoadmapSection({
  roadmap,
  content,
}: {
  roadmap: ApiRoadmap[];
  content: ApiOtherDetail[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const stageContentRefs = useRef<(HTMLElement | null)[]>([]);
  const pendingScrollIndexRef = useRef<number | null>(null);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionTitle = roadmap[0]?.title ?? '';
  const sectionDescription = roadmap[0]?.description;

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
  }, [roadmap.length]);

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

  if (!roadmap.length) return null;

  return (
    <section
      ref={sectionRef}
      id="program-roadmap"
      className="relative scroll-mt-[116px]"
      aria-labelledby="program-roadmap-heading"
    >
      {roadmap.map((stage, index) => (
        <StagePanel
          key={stage.id}
          stage={stage}
          stageIndex={index}
          stages={roadmap}
          activeIndex={activeIndex}
          onSelect={scrollToStage}
          otherDetails={content}
          sectionTitle={index === 0 ? sectionTitle : undefined}
          sectionDescription={index === 0 ? sectionDescription : undefined}
          headingId={index === 0 ? 'program-roadmap-heading' : undefined}
          stageRef={(node) => {
            stageRefs.current[index] = node;
          }}
          stageContentRef={(node) => {
            stageContentRefs.current[index] = node;
          }}
          onNext={index < roadmap.length - 1 ? () => scrollToStage(index + 1) : undefined}
        />
      ))}
    </section>
  );
}
