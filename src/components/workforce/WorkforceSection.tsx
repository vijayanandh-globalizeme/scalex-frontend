'use client';

import type { ReactNode } from 'react';
import { LogoMarquee } from '@/components/shared';
import { useCourseBrochureModal } from '@/components/course-detail';

export interface WorkforceStat {
  id: string;
  label: string;
  value: string;
  /** Optional icon. Defaults to a built-in award/users icon. */
  icon?: ReactNode;
  /** Color variant for the icon circle (alternates by default). */
  variant?: 'mentors' | 'learners';
}

export interface WorkforceFeature {
  id: string;
  label: string;
}

export interface WorkforcePartner {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
}

export interface WorkforceSectionProps {
  /** Heading split around the inline brand name (e.g. "Future-Proof Your Workforce with " + brand + " Hiring Partners"). */
  headingBefore: string;
  /** Alt text for the inline EdgeX brand in the heading. */
  brandLogo: { alt: string };
  headingAfter: string;
  subheading: string;
  features: WorkforceFeature[];
  cta: { label: string; href: string };
  stats: WorkforceStat[];
  partners: WorkforcePartner[];
  /** Optional decorative background arrow on the left. */
  decorativeArrow?: { src: string; alt?: string };
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function WorkforceDecorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="190"
      height="206"
      viewBox="0 0 190 206"
      fill="none"
      aria-hidden
    >
      <g opacity="0.1">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.6735 60.9705L118.511 149.177L145.721 149.38L65.5219 61.1628L39.6735 60.9705Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M129.542 32.3057L30.2113 170.576C27.5358 174.3 26.9742 175.072 26.4 175.881C25.8257 176.689 25.4571 177.23 24.9149 178.06C24.3727 178.89 23.8598 179.695 21.3727 183.548L10.5259 200.35C9.74522 201.559 10.093 203.172 11.3027 203.953C12.3557 204.632 13.7433 204.466 14.6064 203.558L28.6332 188.797C31.7127 185.556 32.3396 184.903 32.9798 184.225C33.6199 183.546 34.0219 183.107 34.6403 182.408C35.2588 181.71 35.8527 181.027 38.8047 177.67L149.897 51.3322C151.386 49.6386 152.754 47.8419 153.99 45.9556C155.82 43.165 156.826 43.7877 157.007 47.8247C157.134 50.6398 157.307 54.4921 157.527 59.3814C157.828 66.0793 163.504 71.265 170.204 70.9639C176.904 70.6629 182.091 64.9891 181.79 58.2912L179.934 17.0092C179.919 16.6743 179.907 16.3393 179.899 16.0042C179.744 9.47381 178.642 5.49945 176.594 4.08111C171.241 0.373226 159.749 2.43335 156.605 2.96502C152.21 3.70829 136.662 5.88828 109.962 9.50499C104.229 10.2816 100.211 15.5574 100.988 21.2889C101.032 21.6134 101.091 21.9357 101.165 22.2546L101.222 22.4966C102.656 28.6607 108.637 32.6473 114.881 31.5998L125.617 29.798C125.854 29.7583 126.09 29.7168 126.326 29.6735C128.534 29.2678 129.858 29.2244 130.298 29.5425C130.76 29.8765 130.508 30.7976 129.542 32.3057Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none" aria-hidden>
      <path
        d="M13.1487 0.96013L14.6829 2.50848C14.8423 2.66027 14.9818 2.71087 15.191 2.71087H17.3427C19.1359 2.71087 19.9528 3.56094 19.9528 5.36229V7.55831C19.9528 7.76071 20.0126 7.91251 20.162 8.06431L21.6862 9.62277C22.9414 10.8979 22.9514 12.0819 21.6862 13.357L20.162 14.9155C20.0126 15.0774 19.9528 15.2191 19.9528 15.4316V17.6175C19.9528 19.439 19.126 20.2689 17.3427 20.2689H15.191C14.9818 20.2689 14.8423 20.3296 14.6829 20.4814L13.1487 22.0297C11.8935 23.3049 10.728 23.315 9.47271 22.0297L7.93855 20.4814C7.78912 20.3296 7.63969 20.2689 7.44044 20.2689H5.27867C3.49546 20.2689 2.6686 19.429 2.6686 17.6175V15.4316C2.6686 15.2191 2.61879 15.0774 2.46936 14.9155L0.945157 13.357C-0.310066 12.0819 -0.320029 10.8979 0.945157 9.62277L2.46936 8.06431C2.61879 7.91251 2.6686 7.76071 2.6686 7.55831V5.36229C2.6686 3.54071 3.49546 2.71087 5.27867 2.71087H7.44044C7.63969 2.71087 7.78912 2.66027 7.93855 2.50848L9.47271 0.96013C10.728 -0.314978 11.8935 -0.325098 13.1487 0.96013ZM14.4139 7.47735L10.1601 14.4196L8.13779 11.7682C7.88874 11.4342 7.66957 11.3331 7.39064 11.3331C6.93238 11.3331 6.5837 11.7075 6.5837 12.173C6.5837 12.3957 6.67336 12.6284 6.8228 12.8308L9.32328 15.9477C9.58229 16.3019 9.86123 16.4335 10.1999 16.4335C10.5386 16.4335 10.8275 16.2715 11.0368 15.9477L15.7189 8.44886C15.8385 8.24647 15.968 8.01371 15.968 7.78095C15.968 7.31543 15.5596 7.01184 15.1312 7.01184C14.8622 7.01184 14.6032 7.16364 14.4139 7.47735Z"
        fill="white"
        fillOpacity="0.85"
      />
    </svg>
  );
}

function DefaultStatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.9 10.74L14.16 17.85c.01.08 0 .17-.04.24a.34.34 0 01-.16.18.36.36 0 01-.25.04.43.43 0 01-.23-.09L10.5 16a.99.99 0 00-.5-.16.95.95 0 00-.5.16l-2.99 2.24a.43.43 0 01-.23.09.36.36 0 01-.24-.04.34.34 0 01-.17-.18.42.42 0 01-.04-.24l1.27-7.13"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="6.67" r="5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatPill({ stat }: { stat: WorkforceStat }) {
  const iconBg =
    stat.variant === 'learners'
      ? 'bg-[#CEFAFE] text-[#0092B8]'
      : 'bg-[#DBEAFE] text-[#155DFC]';

  return (
    <div className="inline-flex h-[62px] min-w-[150px] items-center rounded-xl border border-zinc-100 bg-white px-2.5 py-2 shadow-lg shadow-zinc-900/10 min-[1305px]:min-w-[180px] min-[1305px]:px-3">
      <div className="flex w-full items-start gap-2 min-[1305px]:gap-2.5">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full min-[1305px]:h-9 min-[1305px]:w-9 ${iconBg}`} aria-hidden>
          {stat.icon ?? <DefaultStatIcon className="h-[18px] w-[18px]" />}
        </div>
        <div className="min-w-0">
          <p className="whitespace-nowrap text-[12px] font-medium leading-[16px] text-subtle">{stat.label}</p>
          <p className="whitespace-nowrap text-[14px] font-bold leading-[20px] text-strong">{stat.value}</p>
        </div>
      </div>
    </div>
  );
}

export default function WorkforceSection({
  headingBefore,
  brandLogo,
  headingAfter,
  subheading,
  features,
  cta,
  stats,
  partners,
}: WorkforceSectionProps) {
  const { openBrochureModal } = useCourseBrochureModal();
  return (
    <section
      className="full-bleed relative z-20 overflow-visible bg-[#0D0D0D] pt-16 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32"
      aria-labelledby="workforce-heading"
    >
      <WorkforceDecorIcon className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-[120px] md:w-[160px] lg:w-[190px]" />

      <div className="site-container relative z-10">
        <div className="grid items-center gap-10 min-[1100px]:grid-cols-[1.15fr_1fr] min-[1100px]:gap-8 min-[1305px]:grid-cols-[1.1fr_1fr] min-[1305px]:gap-16">
          {/* Left: pyramid-stacked stat badges (3 / 2 / 1); centered below 1100px */}
          <div className="flex flex-col items-center gap-2 md:gap-5 min-[1100px]:items-start ">
            {/* Row 1: first 3 stats, left-aligned */}
            <div className="flex w-full flex-wrap justify-center gap-2 sm:w-fit sm:flex-nowrap sm:items-center min-[1305px]:gap-4 max-sm:flex-col max-sm:w-[100%]">
              {stats.slice(0, 3).map((s, i) => {
                const variant: 'learners' | 'mentors' =
                  s.variant ?? (i % 2 === 0 ? 'mentors' : 'learners');
                return <StatPill key={s.id} stat={{ ...s, variant }} />;
              })}
            </div>
            {/* Row 2: next 2 stats, indented */}
            <div className="flex w-full flex-wrap justify-center gap-2 sm:w-fit sm:flex-nowrap sm:items-center min-[1100px]:pl-10 min-[1305px]:gap-4 min-[1305px]:pl-20 max-sm:flex-col max-sm:w-[100%]">
              {stats.slice(3, 5).map((s, i) => {
                const variant: 'learners' | 'mentors' =
                  s.variant ?? ((i + 3) % 2 === 0 ? 'mentors' : 'learners');
                return <StatPill key={s.id} stat={{ ...s, variant }} />;
              })}
            </div>
            {/* Row 3: final stat, more indented */}
            {stats[5] ? (
              <div className="flex w-fit min-[1100px]:pl-20 min-[1305px]:pl-40 max-sm:flex-col max-sm:w-[100%]">
                <StatPill
                  stat={{
                    ...stats[5],
                    variant: stats[5].variant ?? 'mentors',
                  }}
                />
              </div>
            ) : null}
          </div>

          {/* Right: headline, subheading, features, CTA */}
          <div className="text-white min-[1100px]:ml-auto min-[1100px]:w-full min-[1100px]:max-w-[560px] min-[1100px]:justify-self-end">
            <h2
              id="workforce-heading"
              className="section-heading font-extrabold leading-tight md:text-[34px] lg:text-[36px]"
            >
              {headingBefore}
              <span className="mx-2 inline-block align-middle whitespace-nowrap" aria-label={brandLogo.alt}>
                Edge X
              </span>
              {headingAfter}
            </h2>
            <p className="mt-4 text-[18px] font-medium leading-[140%] text-white">
              {subheading}
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.id} className="inline-flex items-center gap-2 text-[14px] font-semibold text-white">
                  <CheckIcon className="h-[18px] w-[18px] shrink-0" />
                  {f.label}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openBrochureModal({ type: 'demo', courseId: null })}
              className="btn-mui-filled-dark mt-7 inline-flex h-[48px] cursor-pointer items-center justify-center gap-2 rounded-lg px-6 text-[14px] font-semibold"
            >
              {cta.label}
              <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom: hiring partners strip (overlaps next section by half) */}
        {partners.length > 0 ? (
          <div className="relative z-50 mt-1 overflow-visible pb-6 md:mt-12 md:pb-8">
            <div className="mb-[-72px] translate-y-1/2 rounded-2xl bg-white px-6 py-8 shadow-[0_4px_24px_0_rgba(30,41,59,0.08),0_12px_40px_0_rgba(15,23,42,0.14)] md:mb-[-130px] md:px-10 md:py-10">
            <div className="w-full min-w-0 overflow-hidden">
              <LogoMarquee
                logos={partners.map((p) => ({ id: p.id, src: p.logoSrc, alt: p.logoAlt }))}
                size="sm"
                largeOnMobile
                ariaLabel="Hiring partners"
              />
            </div>
          </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
