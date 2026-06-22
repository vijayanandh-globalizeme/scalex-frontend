import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Trainer } from '@/services/peopleApi';

export interface MentorStat {
  id: string;
  label: string;
  value: string;
  /** Optional inline icon. Defaults to a built-in award/users icon. */
  icon?: ReactNode;
  variant?: 'mentors' | 'learners';
}

export type { Trainer as Mentor };

export interface MentorsSectionProps {
  heading: string;
  subheading: string;
  stats: MentorStat[];
  mentors: Trainer[];
}

function LinkedInBadge({ href, name }: { href?: string; name: string }) {
  const inner = (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-md bg-linkedin text-white shadow-md ring-2 ring-white"
      aria-hidden={!href}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57z" />
      </svg>
    </span>
  );
  if (!href) return inner;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn`}>
      {inner}
    </a>
  );
}

function DefaultStatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.9 10.74L14.16 17.85a.34.34 0 01-.04.24.34.34 0 01-.16.18.36.36 0 01-.25.04.43.43 0 01-.23-.09L10.5 16a.99.99 0 00-.5-.16.95.95 0 00-.5.16l-2.99 2.24a.43.43 0 01-.23.09.36.36 0 01-.24-.04.34.34 0 01-.17-.18.42.42 0 01-.04-.24l1.27-7.13"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="6.67"
        r="5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatPillInline({ stat }: { stat: MentorStat }) {
  const iconBg =
    stat.variant === 'learners'
      ? 'bg-[#CEFAFE] text-[#0092B8]'
      : 'bg-[#DBEAFE] text-[#155DFC]';

  return (
    <div className="inline-flex items-center gap-2.5">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`} aria-hidden>
        {stat.icon ?? <DefaultStatIcon className="h-[18px] w-[18px]" />}
      </div>
      <div>
        <p className="whitespace-nowrap text-[12px] font-medium leading-[16px] text-subtle">{stat.label}</p>
        <p className="whitespace-nowrap text-[14px] font-bold leading-[20px] text-strong">{stat.value}</p>
      </div>
    </div>
  );
}

function MentorCard({ mentor }: { mentor: Trainer }) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="relative h-[150px] w-[150px]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-100 shadow-sm">
          {mentor.profileImageUrl ? (
            <Image
              src={mentor.profileImageUrl}
              alt={mentor.name}
              fill
              sizes="150px"
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="absolute right-1 bottom-1">
          <LinkedInBadge href={mentor.linkedInProfile} name={mentor.name} />
        </div>
      </div>
      <h3 className="mt-3 text-center text-[18px] font-medium leading-[140%] text-heading">
        {mentor.name}
      </h3>
      <p className="mt-1 text-center text-[14px] font-medium leading-[140%] text-muted">
        {mentor.role}
      </p>
      {mentor.workedWithUrl ? (
        <div className="mt-4 flex w-full flex-nowrap items-center justify-end gap-2 whitespace-nowrap text-[12px] font-medium text-subtle">
          <span>Worked with</span>
          <div className="relative h-[16px] w-[68px] shrink-0">
            <Image src={mentor.workedWithUrl} alt="Company" fill sizes="68px" className="object-contain object-right" />
          </div>
        </div>
      ) : null}
    </article>
  );
}

export default function MentorsSection({
  heading,
  subheading,
  stats,
  mentors,
}: MentorsSectionProps) {
  return (
    <section
      className="full-bleed relative z-10 bg-white pt-[200px] pb-[150px]"
      aria-labelledby="mentors-heading"
    >
      <div className="site-container relative z-10">
        <header className="w-full text-center">
          <h2
            id="mentors-heading"
            className="text-center text-[34px] font-bold leading-[140%] text-heading"
          >
            {heading}
          </h2>
          <p className="mt-3 text-center text-[18px] font-medium leading-[140%] text-muted">
            {subheading}
          </p>
        </header>

        {/* Inline stat row */}
        {stats.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:mt-10">
            {stats.map((s, i) => {
              const variant: 'learners' | 'mentors' =
                s.variant ?? (i % 2 === 0 ? 'mentors' : 'learners');
              return <StatPillInline key={s.id} stat={{ ...s, variant }} />;
            })}
          </div>
        ) : null}

        {/* Mentors row */}
        <div className="mt-10 grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 md:mt-12 md:grid-cols-3 lg:grid-cols-5">
          {mentors.map((m) => (
            <MentorCard key={m.id} mentor={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
