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
      className="relative block h-9 w-9 overflow-hidden rounded-full shadow-md ring-2 ring-white"
      aria-hidden={!href}
    >
      <Image
        src="/images/image 20233.png"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
      />
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
    <div className="flex w-full items-center gap-2.5 rounded-xl border border-zinc-100 bg-white px-3 py-2 shadow-lg shadow-zinc-900/10 md:inline-flex md:w-auto md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none">
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
      <div className="relative h-[150px] w-[150px] rounded-full shadow-[0_4px_24px_0_rgba(30,41,59,0.08)]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-100">
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
      <p
        className="mt-1 text-center text-[14px] font-medium leading-[140%] text-[#788593]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {mentor.role}
      </p>
      {mentor.assocWithUrl ? (
        <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-2 text-center text-[12px] font-medium text-subtle">
          <span>Associated with</span>
          <div className="relative mx-auto flex h-[24px] w-[97px] items-center justify-center">
            <Image
              src={mentor.assocWithUrl}
              alt="Associated company"
              fill
              sizes="97px"
              className="object-contain object-center"
            />
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
      className="full-bleed relative z-10 overflow-visible bg-white pt-[96px] md:pt-[140px] pb-8 shadow-[0_10px_40px_0_rgba(30,41,59,0.1)] md:pb-16"
      aria-labelledby="mentors-heading"
    >
      <div className="site-container relative z-10">
        <header className="w-full text-center">
          <h2
            id="mentors-heading"
            className="section-heading scroll-mt-24 text-center text-heading"
          >
            {heading}
          </h2>
          <p className="mt-3 whitespace-pre-line text-center text-[18px] font-medium leading-[140%] text-muted">
            {subheading}
          </p>
        </header>

        {/* Inline stat row */}
        {stats.length > 0 ? (
          <div className="mt-8 flex flex-col items-stretch gap-4 md:mt-10 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-10 md:gap-y-4">
            {stats.map((s, i) => {
              const variant: 'learners' | 'mentors' =
                s.variant ?? (i % 2 === 0 ? 'mentors' : 'learners');
              return <StatPillInline key={s.id} stat={{ ...s, variant }} />;
            })}
          </div>
        ) : null}

        {/* Mentors row */}
        <div className="mt-10 grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 pb-4 md:mt-12 md:grid-cols-3 lg:grid-cols-5">
          {mentors.map((m) => (
            <MentorCard key={m.id} mentor={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
