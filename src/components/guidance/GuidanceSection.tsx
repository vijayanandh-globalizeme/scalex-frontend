'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';

export interface GuidanceStat {
  id: string;
  value: string;
  label: string;
}

export interface GuidanceCourseOption {
  id: string;
  label: string;
}

export interface GuidancePurposeOption {
  id: string;
  label: string;
}

export interface GuidanceSectionProps {
  heading: string;
  stats: GuidanceStat[];
  formTitle: string;
  courses: GuidanceCourseOption[];
  purposes: GuidancePurposeOption[];
  termsHref: string;
  privacyHref: string;
  ctaLabel: string;
  /** Optional decorative arrow image in bottom-right. */
  decorativeArrow?: { src: string; alt?: string };
}

function CheckCircle({ className, checked }: { className?: string; checked: boolean }) {
  return (
    <span
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded ${
        checked ? 'bg-success' : 'border border-border-muted bg-white'
      } ${className ?? ''}`}
      aria-hidden
    >
      {checked ? (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6.5L4.8 9 10 3.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

export default function GuidanceSection({
  heading,
  stats,
  formTitle,
  courses,
  purposes,
  termsHref,
  privacyHref,
  ctaLabel,
  decorativeArrow,
}: GuidanceSectionProps) {
  const [agreed, setAgreed] = useState(true);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /* Hook up to your real submission endpoint. */
  }

  return (
    <section
      className="full-bleed relative z-10 overflow-visible bg-[#0D0D0D] pt-10 pb-0"
      aria-labelledby="guidance-heading"
    >
      {decorativeArrow ? (
        <div
          className="pointer-events-none absolute right-4 bottom-4 z-0 hidden h-64 w-64 lg:block"
          aria-hidden
        >
          <Image
            src={decorativeArrow.src}
            alt=""
            fill
            sizes="256px"
            className="object-contain object-right-bottom opacity-90"
          />
        </div>
      ) : null}

      <div className="site-container relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Left: heading + stats */}
          <div className="text-white">
            <h2
              id="guidance-heading"
              className="whitespace-pre-line text-[28px] font-semibold leading-[140%] text-white"
            >
              {heading}
            </h2>

            <ul className="mt-10 flex flex-col gap-14">
              {stats.map((s) => (
                <li key={s.id}>
                  <p className="text-[34px] font-bold leading-normal text-white">{s.value}</p>
                  <p className="mt-2 text-[18px] font-medium leading-[140%] text-white">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form card (overflows ~10% into next section) */}
          <div className="relative z-20 mb-[-40px] w-full self-start">
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full max-w-[696px] rounded-lg bg-white p-6 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:h-[578px] md:p-8 lg:w-[695.792px]"
            >
              <h3 className="text-[20px] font-medium leading-normal text-heading">
                {formTitle}
              </h3>

              <div className="mt-5 grid grid-cols-1 gap-5">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  className="h-11 w-full rounded-lg border border-border bg-surface-input px-4 text-[14px] text-heading placeholder:text-placeholder focus:border-brand focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  className="h-11 w-full rounded-lg border border-border bg-surface-input px-4 text-[14px] text-heading placeholder:text-placeholder focus:border-brand focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email ID"
                  className="h-11 w-full rounded-lg border border-border bg-surface-input px-4 text-[14px] text-heading placeholder:text-placeholder focus:border-brand focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Contact Number"
                  className="h-11 w-full rounded-lg border border-border bg-surface-input px-4 text-[14px] text-heading placeholder:text-placeholder focus:border-brand focus:outline-none"
                />
                <select
                  required
                  defaultValue=""
                  className="h-11 w-full rounded-lg border border-border bg-surface-input px-4 text-[14px] text-heading focus:border-brand focus:outline-none"
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <select
                  required
                  defaultValue=""
                  className="h-11 w-full rounded-lg border border-border bg-surface-input px-4 text-[14px] text-heading focus:border-brand focus:outline-none"
                >
                  <option value="" disabled>
                    Select Purpose
                  </option>
                  {purposes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className="mt-4 flex items-start gap-2 text-[12px] text-subtle">
                <button
                  type="button"
                  onClick={() => setAgreed((v) => !v)}
                  className="mt-[2px]"
                  aria-pressed={agreed}
                  aria-label="I agree to the Terms & Conditions and Privacy Policy"
                >
                  <CheckCircle checked={agreed} />
                </button>
                <span>
                  I agree to ScaleX&apos;s{' '}
                  <Link href={termsHref} className="text-link underline">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href={privacyHref} className="text-link underline">
                    Privacy Policy.
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed}
                className="mt-5 inline-flex h-[44px] items-center justify-center gap-2 rounded-md bg-brand px-6 text-[14px] font-semibold text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {ctaLabel}
                <svg width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
                  <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
