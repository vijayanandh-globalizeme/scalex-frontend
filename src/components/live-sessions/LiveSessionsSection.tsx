'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useGsapScrollRevealStagger } from '@/hooks/useGsapScrollReveal';
import { useGridColumns } from '@/hooks/useGridColumns';
import { getWebinars, type Webinar } from '@/app/actions/webinarActions';
import { useCourseBrochureModal } from '@/components/course-detail';

const HEADING = 'Upcoming Live Sessions';
const SUBHEADING = 'Join our expert-led live webinars and accelerate your career growth.';

interface LiveSession {
  id: string;
  title: string;
  date: string;
  time: string;
  learners: string;
  instructor: string;
  imageSrc: string;
  imageAlt: string;
  courseId: string | null;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function mapWebinar(item: Webinar): LiveSession {
  return {
    id: item.id,
    title: item.title,
    date: formatDate(item.startedAt),
    time: formatTime(item.startedAt),
    learners: item.learnersLabel,
    instructor: item.trainerName,
    imageSrc: item.imageUrl,
    imageAlt: item.title,
    courseId: item.courseId,
  };
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="14" viewBox="0 0 23 16" fill="none" aria-hidden>
      <path
        d="M9.83 10.09c-1.29 1.12-2.02 2.55-2.02 3.83 0 .37.07.72.25 1.03H2.14c-.98 0-1.37-.39-1.37-1.09 0-2.13 2.19-4.71 5.69-4.71 1.33 0 2.47.37 3.37.94zM9.17 4.99c0 1.68-1.26 2.97-2.7 2.97S3.76 6.67 3.76 5c0-1.66 1.27-2.91 2.71-2.91 1.44 0 2.7 1.22 2.7 2.9z"
        fill="currentColor"
      />
      <path
        d="M15.41 7.79c1.67 0 3.11-1.49 3.11-3.42 0-1.91-1.45-3.32-3.11-3.32s-3.11 1.45-3.11 3.34c0 1.92 1.44 3.4 3.11 3.4zm-4.89 7.16h9.77c1.22 0 1.65-.35 1.65-1.03 0-2-2.51-4.75-6.54-4.75-4.02 0-6.53 2.75-6.53 4.75 0 .68.43 1.03 1.65 1.03z"
        fill="currentColor"
      />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="5.5" r="2.75" stroke="currentColor" strokeWidth="2" />
      <path d="M2.5 14c0-2.5 2.46-4 5.5-4s5.5 1.5 5.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function SessionCard({ session }: { session: LiveSession }) {
  const { openBrochureModal } = useCourseBrochureModal();
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.03),0_4px_4px_0_rgba(30,41,59,0.06)] transition hover:shadow-lg">
      {session.imageSrc && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={session.imageSrc}
            alt={session.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[16px] font-bold leading-tight text-heading">{session.title}</h3>
        <ul className="flex flex-col gap-2 text-[12px] font-medium text-body">
          <li className="inline-flex items-center gap-2">
            <CalendarIcon className="h-3.5 w-3.5 text-heading" />
            <span>
              {session.date} <span className="ml-2">{session.time}</span>
            </span>
          </li>
          <li className="inline-flex items-center gap-2">
            <UsersIcon className="h-4 w-[18px] text-heading" />
            <span>{session.learners}</span>
          </li>
          <li className="inline-flex items-center gap-2">
            <PersonIcon className="h-3.5 w-3.5 text-heading" />
            <span>By {session.instructor}</span>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => openBrochureModal({ type: 'webinar', courseId: session.courseId })}
          className="btn-accent-outline mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 py-3 text-[14px]"
        >
          Register Now
          <ArrowRightIcon className="btn-arrow-icon h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function LiveSessionsSection() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cols = useGridColumns();

  useEffect(() => {
    getWebinars(10).then((data) => {
      setSessions(data.map(mapWebinar));
    });
  }, []);

  const sessionRows = useMemo(() => {
    const rows: LiveSession[][] = [];
    for (let i = 0; i < sessions.length; i += cols) {
      rows.push(sessions.slice(i, i + cols));
    }
    return rows;
  }, [sessions, cols]);

  rowRefs.current.length = sessionRows.length;

  useGsapScrollRevealStagger(
    sectionRef,
    rowRefs,
    {
      y: 40,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
      start: 'top 88%',
    },
    [sessionRows.length, cols],
  );

  return (
    <section
      ref={sectionRef}
      className="full-bleed relative bg-surface pb-14 pt-0 md:pb-16 lg:pb-20"
      aria-labelledby="live-sessions-heading"
    >
      <div className="site-container relative z-10">
        <header className="mx-auto text-center">
          <h2
            id="live-sessions-heading"
            className="text-[28px] font-bold leading-[140%] text-heading md:text-[34px]"
          >
            {HEADING}
          </h2>
          <p className="mt-3 text-[14px] font-medium leading-[140%] text-muted md:text-[15px]">
            {SUBHEADING}
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-6 md:mt-12">
          {sessionRows.map((rowSessions, rowIndex) => (
            <div
              key={`live-row-${rowIndex}`}
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
              className="gsap-reveal-pending grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {rowSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
