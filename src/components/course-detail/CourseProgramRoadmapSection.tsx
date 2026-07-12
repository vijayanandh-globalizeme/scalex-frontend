'use client';

import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import type { ApiRoadmap, ApiOtherDetail } from '@/services/courseApi';
import { COURSE_SECTION_CARD } from './courseSectionCard';
import {
  ROADMAP_SHOW_MORE_LABEL,
  ROADMAP_HIRING_PARTNERS_TITLE,
  ROADMAP_HIRING_PARTNER_LOGOS,
} from '@/lib/courseDetailStatics';

const INTERVIEW_MAX_VISIBLE = 14;

type StageTheme = 'learning' | 'interview' | 'placement';

function getTheme(type: number): StageTheme {
  if (type === 2) return 'interview';
  if (type === 3) return 'placement';
  return 'learning';
}

const LEARNING_GRADIENT = 'linear-gradient(180deg, #FD022D 0%, #FFB700 100%)';

// ─── Icons ────────────────────────────────────────────────────────────────────

function RedCircleCheckIcon() {
  return (
    <span className="mt-0.5 shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <g clipPath="url(#rcc)">
          <path d="M8.57525 0.626172L9.57579 1.63596C9.67977 1.73496 9.77072 1.76796 9.90717 1.76796H11.3105C12.4799 1.76796 13.0127 2.32235 13.0127 3.49714V4.92933C13.0127 5.06133 13.0517 5.16033 13.1492 5.25933L14.1432 6.27572C14.9618 7.10734 14.9683 7.87948 14.1432 8.71109L13.1492 9.72748C13.0517 9.83311 13.0127 9.9255 13.0127 10.0641V11.4897C13.0127 12.6776 12.4735 13.2188 11.3105 13.2188H9.90717C9.77072 13.2188 9.67977 13.2584 9.57579 13.3575L8.57525 14.3672C7.7566 15.1988 6.9965 15.2055 6.17785 14.3672L5.17732 13.3575C5.07986 13.2584 4.98241 13.2188 4.85246 13.2188H3.44261C2.27965 13.2188 1.74039 12.6711 1.74039 11.4897V10.0641C1.74039 9.9255 1.7079 9.83311 1.61045 9.72748L0.616407 8.71109C-0.202217 7.87948 -0.208714 7.10734 0.616407 6.27572L1.61045 5.25933C1.7079 5.16033 1.74039 5.06133 1.74039 4.92933V3.49714C1.74039 2.30916 2.27965 1.76796 3.44261 1.76796H4.85246C4.98241 1.76796 5.07986 1.73496 5.17732 1.63596L6.17785 0.626172C6.9965 -0.205421 7.7566 -0.212021 8.57525 0.626172ZM9.40035 4.87653L6.62615 9.40409L5.30726 7.67491C5.14483 7.45709 5.00189 7.39112 4.81998 7.39112C4.52112 7.39112 4.29372 7.6353 4.29372 7.93889C4.29372 8.08412 4.35219 8.23592 4.44965 8.36791L6.0804 10.4007C6.24932 10.6317 6.43124 10.7175 6.65214 10.7175C6.87303 10.7175 7.06144 10.6119 7.19789 10.4007L10.2515 5.51013C10.3294 5.37813 10.4139 5.22633 10.4139 5.07453C10.4139 4.77094 10.1475 4.57294 9.86818 4.57294C9.69275 4.57294 9.52383 4.67194 9.40035 4.87653Z" fill="#FD022D" />
        </g>
        <defs><clipPath id="rcc"><rect width="15" height="15" fill="white" /></clipPath></defs>
      </svg>
    </span>
  );
}

function DarkCircleCheckIcon() {
  return (
    <span className="shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
        <g clipPath="url(#dcc)">
          <path d="M8.57525 0.626172L9.57579 1.63596C9.67977 1.73496 9.77072 1.76796 9.90717 1.76796H11.3105C12.4799 1.76796 13.0127 2.32235 13.0127 3.49714V4.92933C13.0127 5.06133 13.0517 5.16033 13.1492 5.25933L14.1432 6.27572C14.9618 7.10734 14.9683 7.87948 14.1432 8.71109L13.1492 9.72748C13.0517 9.83311 13.0127 9.9255 13.0127 10.0641V11.4897C13.0127 12.6776 12.4735 13.2188 11.3105 13.2188H9.90717C9.77072 13.2188 9.67977 13.2584 9.57579 13.3575L8.57525 14.3672C7.7566 15.1988 6.9965 15.2055 6.17785 14.3672L5.17732 13.3575C5.07986 13.2584 4.98241 13.2188 4.85246 13.2188H3.44261C2.27965 13.2188 1.74039 12.6711 1.74039 11.4897V10.0641C1.74039 9.9255 1.7079 9.83311 1.61045 9.72748L0.616407 8.71109C-0.202217 7.87948 -0.208714 7.10734 0.616407 6.27572L1.61045 5.25933C1.7079 5.16033 1.74039 5.06133 1.74039 4.92933V3.49714C1.74039 2.30916 2.27965 1.76796 3.44261 1.76796H4.85246C4.98241 1.76796 5.07986 1.73496 5.17732 1.63596L6.17785 0.626172C6.9965 -0.205421 7.7566 -0.212021 8.57525 0.626172ZM9.40035 4.87653L6.62615 9.40409L5.30726 7.67491C5.14483 7.45709 5.00189 7.39112 4.81998 7.39112C4.52112 7.39112 4.29372 7.6353 4.29372 7.93889C4.29372 8.08412 4.35219 8.23592 4.44965 8.36791L6.0804 10.4007C6.24932 10.6317 6.43124 10.7175 6.65214 10.7175C6.87303 10.7175 7.06144 10.6119 7.19789 10.4007L10.2515 5.51013C10.3294 5.37813 10.4139 5.22633 10.4139 5.07453C10.4139 4.77094 10.1475 4.57294 9.86818 4.57294C9.69275 4.57294 9.52383 4.67194 9.40035 4.87653Z" fill="#1E293B" />
        </g>
        <defs><clipPath id="dcc"><rect width="15" height="15" fill="white" /></clipPath></defs>
      </svg>
    </span>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function StageSidebarIcon({ icon, theme }: { icon: string; theme: StageTheme }) {
  const gradients: Record<StageTheme, string> = {
    learning:  LEARNING_GRADIENT,
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
  const configs: Record<StageTheme, { id: string; stops: { offset?: string; color: string }[] }> = {
    learning:  { id: 'la', stops: [{ offset: '0.269231', color: '#FD022D' }, { offset: '0.515229', color: '#FFB700' }, { offset: '0.914683', color: '#00C017' }] },
    interview: { id: 'ia', stops: [{ offset: '0.322115', color: '#FFB700' }, { offset: '1', color: '#00C017' }] },
    placement: { id: 'pa', stops: [{ color: '#FFB700' }, { offset: '0.254808', color: '#00C017' }] },
  };
  const g = configs[theme];
  return (
    <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="39" viewBox="0 0 35 39" fill="none">
        <g clipPath={`url(#clip-${g.id})`}>
          <path d="M5 30.3531V9.64705C5 7.37601 6.55271 6 8.56581 6C9.18425 6 9.82897 6.18713 10.4079 6.52105L28.1974 16.8874C29.3947 17.582 30 18.771 30 20C30 21.229 29.3947 22.4313 28.1974 23.1126L10.4079 33.479C9.81576 33.8397 9.18425 34 8.56581 34C6.55271 34 5 32.624 5 30.3531Z" fill={`url(#grad-${g.id})`} />
        </g>
        <defs>
          <linearGradient id={`grad-${g.id}`} x1="28.6607" y1="40.507" x2="16.6871" y2="-24.6815" gradientUnits="userSpaceOnUse">
            {g.stops.map((s, i) => <stop key={i} offset={s.offset} stopColor={s.color} />)}
          </linearGradient>
          <clipPath id={`clip-${g.id}`}><rect width="39" height="35" fill="white" transform="matrix(0 -1 -1 0 35 39)" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StageSidebar({ stage, stageNumber }: { stage: ApiRoadmap; stageNumber: string }) {
  const theme = getTheme(stage.type);
  const [first, ...rest] = stage.sideTitle.split(' ');

  const numberEl =
    theme === 'learning' ? (
      <p className="mt-2 bg-clip-text text-[64px] font-bold leading-none text-transparent" style={{ backgroundImage: LEARNING_GRADIENT }}>{stageNumber}</p>
    ) : theme === 'interview' ? (
      <p className="mt-2 text-[64px] font-bold leading-none">
        <span style={{ color: '#FFB700' }}>{stageNumber.slice(0, -1)}</span>
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(99deg, #FFB700 47.39%, #00C017 187.55%)' }}>{stageNumber.slice(-1)}</span>
      </p>
    ) : (
      <p className="mt-2 bg-clip-text text-[64px] font-bold leading-none text-transparent" style={{ backgroundImage: 'linear-gradient(99deg, #FFB700 -19.21%, #00C017 33.47%)' }}>{stageNumber}</p>
    );

  return (
    <div className="relative shrink-0 md:w-[250px]">
      <StageSidebarIcon icon={stage.icon} theme={theme} />
      <p className="mt-6 pl-[7px] text-[16px] font-semibold uppercase leading-[140%] text-[#788593]" style={{ fontFamily: 'Inter' }}>Stage</p>
      {numberEl}
      <p className="mt-3 text-[34px] font-bold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>
        {first}<br />{rest.join(' ')}
      </p>
      <p className="mt-3 max-w-[220px] text-[14px] font-normal leading-[150%] text-[#788593]">{stage.sideDescription}</p>
      <StageSidebarArrow theme={theme} />
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function ProgramRoadmapSectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h2 id="program-roadmap-heading" className="section-heading text-[#1E293B]" style={{ fontFamily: 'Inter' }}>{title}</h2>
      {description ? (
        <p className="mt-1 max-w-3xl text-[18px] font-medium leading-[140%] text-[#788593]" style={{ fontFamily: 'Inter' }}>{description}</p>
      ) : null}
    </div>
  );
}

// ─── Content panels ───────────────────────────────────────────────────────────

function formatHighlight(text: string) {
  const idx = text.indexOf(':');
  if (idx === -1) return <span className="font-medium text-[#1E293B]">{text}</span>;
  return (
    <>
      <span className="font-medium text-[#1E293B]">{text.slice(0, idx + 1)}</span>
      <span className="font-normal text-[#1E293B]">{text.slice(idx + 1)}</span>
    </>
  );
}

/** Prefer Kindle (3rd) before Myntra (4th) in Learning Track project cards. */
function orderLearningProjects(projects: ApiOtherDetail[]): ApiOtherDetail[] {
  const list = [...projects];
  const kindleIdx = list.findIndex((p) => /kindle/i.test(p.title));
  const myntraIdx = list.findIndex((p) => /myntra/i.test(p.title));
  if (kindleIdx >= 0 && myntraIdx >= 0 && myntraIdx < kindleIdx) {
    const tmp = list[kindleIdx]!;
    list[kindleIdx] = list[myntraIdx]!;
    list[myntraIdx] = tmp;
  }
  return list;
}

function LearningStageContent({ stage, otherDetails }: { stage: ApiRoadmap; otherDetails: ApiOtherDetail[] }) {
  const highlights = stage.content ? stage.content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean) : [];
  const projects = orderLearningProjects(otherDetails.filter((d) => d.entityId === stage.id));

  return (
    <div className="min-w-0 flex-1">
      <h4 className="text-[20px] font-semibold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>{stage.heading}</h4>
      <ul className="mt-6 space-y-4" role="list">
        {highlights.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <RedCircleCheckIcon />
            <span className="text-[14px] leading-[152%]" style={{ fontFamily: 'Inter' }}>{formatHighlight(item)}</span>
          </li>
        ))}
      </ul>
      {projects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between gap-4 rounded-[12px] border border-[#EBEBEB] bg-white px-5 py-4 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]">
              <p className="min-w-0 text-[14px] font-medium text-[#000]" style={{ fontFamily: 'Inter', lineHeight: '20px' }}>{project.title}</p>
              {project.file ? (
                <div className="relative h-8 w-16 shrink-0">
                  <Image src={project.file.url} alt={project.title} fill className="object-contain object-right" sizes="64px" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function InterviewStageContent({ stage }: { stage: ApiRoadmap }) {
  const [showAll, setShowAll] = useState(false);
  const questions = stage.questions ?? [];
  const visible = showAll ? questions : questions.slice(0, INTERVIEW_MAX_VISIBLE);

  return (
    <div className="min-w-0 flex-1">
      <h4 className="text-[20px] font-semibold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>{stage.heading}</h4>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((q, i) => (
          <div key={i} className="flex items-center justify-between gap-3 rounded-[12px] border border-[#EBEBEB] bg-white px-4 py-3.5 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]">
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
        <button type="button" onClick={() => setShowAll(true)} className="mt-5 text-[14px] font-semibold text-[#FD022D]">
          {ROADMAP_SHOW_MORE_LABEL}
        </button>
      ) : null}
    </div>
  );
}

function PlacementStageContent({ stage }: { stage: ApiRoadmap }) {
  const features = stage.questions ?? [];
  return (
    <div className="min-w-0 flex-1">
      <h4 className="text-[20px] font-semibold leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>{stage.heading}</h4>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col gap-2" style={{ maxWidth: '264px' }}>
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0]">
              <i className={`fa fa-${feature.icon} text-[16px] text-[#FD022D]`} aria-hidden />
            </span>
            <div>
              <p className="text-[14px] font-bold leading-[140%] text-[#1E293B]">{feature.title}</p>
              <p className="mt-1 text-[13px] font-normal leading-[150%] text-[#788593]">{feature.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <p className="text-[18px] font-medium leading-[140%] text-[#1E293B]" style={{ fontFamily: 'Inter' }}>{ROADMAP_HIRING_PARTNERS_TITLE}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4 pb-[50px]">
          {ROADMAP_HIRING_PARTNER_LOGOS.map((logo, index) => (
            <Fragment key={logo.alt}>
              {index === 4 && <div className="w-full" />}
              <div className="relative h-8 w-20">
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="80px" />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Scroll-to-next arrow button ──────────────────────────────────────────────

function NextStageButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="mt-10 flex justify-center">
      <a
        role="button"
        onClick={onClick}
        className="inline-flex cursor-pointer items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-[#788593]"
      >
        {label}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path d="M4 5L9 10L14 5" stroke="#FD022D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 9L9 14L14 9" stroke="#FD022D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function CourseProgramRoadmapSection({
  roadmap,
  content,
}: {
  roadmap: ApiRoadmap[];
  content: ApiOtherDetail[];
}) {
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!roadmap.length) return null;

  const scrollToStage = (index: number) => {
    stageRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="roadmap" className={`scroll-mt-[116px] px-6 py-5 md:px-8 md:py-6 ${COURSE_SECTION_CARD}`} aria-labelledby="program-roadmap-heading">
      {roadmap.map((stage, index) => {
        const stageNumber = String(index + 1).padStart(2, '0');
        const isLast = index === roadmap.length - 1;
        const nextStage = roadmap[index + 1];

        return (
          <div
            key={stage.id}
            ref={(el) => { stageRefs.current[index] = el; }}
            className={index > 0 ? 'mt-12 scroll-mt-[116px] border-t border-[#EBEBEB] pt-10' : ''}
          >
            <ProgramRoadmapSectionHeader title={stage.title} description={stage.description} />

            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10 xl:gap-14">
              <StageSidebar stage={stage} stageNumber={stageNumber} />
              {stage.type === 1 ? (
                <LearningStageContent stage={stage} otherDetails={content} />
              ) : stage.type === 2 ? (
                <InterviewStageContent stage={stage} />
              ) : (
                <PlacementStageContent stage={stage} />
              )}
            </div>

            {!isLast && nextStage && (
              <NextStageButton
                label={`${String(index + 2).padStart(2, '0')} - ${nextStage.sideTitle}`}
                onClick={() => scrollToStage(index + 1)}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}
