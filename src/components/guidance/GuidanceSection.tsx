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
  decorativeArrow?: { src: string; alt?: string };
  variant?: 'fullBleed' | 'embedded';
  className?: string;
}

const FORM_SHADOW =
  'shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)]';

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

function GuidanceForm({
  formTitle,
  courses,
  purposes,
  termsHref,
  privacyHref,
  ctaLabel,
  agreed,
  onToggleAgreed,
  onSubmit,
  embedded,
}: {
  formTitle: string;
  courses: GuidanceCourseOption[];
  purposes: GuidancePurposeOption[];
  termsHref: string;
  privacyHref: string;
  ctaLabel: string;
  agreed: boolean;
  onToggleAgreed: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  embedded: boolean;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`w-full rounded-lg bg-white p-6 ${FORM_SHADOW} ${
        embedded ? '' : 'mx-auto max-w-[696px] md:p-8 lg:w-[695.792px]'
      }`}
    >
      <h3 className="text-[20px] font-medium leading-normal text-heading">{formTitle}</h3>

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
          onClick={onToggleAgreed}
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
        className="btn-brand mt-5 h-[44px] gap-2 rounded-md px-6 text-[14px] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {ctaLabel}
        <svg
          className="btn-arrow-icon"
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="currentColor"
          aria-hidden
        >
          <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
        </svg>
      </button>
    </form>
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
  variant = 'fullBleed',
  className,
}: GuidanceSectionProps) {
  const [agreed, setAgreed] = useState(true);
  const isEmbedded = variant === 'embedded';

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /* Hook up to your real submission endpoint. */
  }

  const content = (
    <>
      {decorativeArrow ? (
        <div
          className={`pointer-events-none absolute z-0 ${
            isEmbedded
              ? 'right-2 bottom-2 h-28 w-28 opacity-80'
              : 'right-4 bottom-4 hidden h-64 w-64 lg:block'
          }`}
          aria-hidden
        >
          <Image
            src={decorativeArrow.src}
            alt=""
            fill
            sizes={isEmbedded ? '112px' : '256px'}
            className="object-contain object-right-bottom opacity-90"
          />
        </div>
      ) : null}

      <div className={`relative z-10 ${isEmbedded ? '' : 'site-container'}`}>
        <div
          className={
            isEmbedded
              ? 'flex flex-col gap-8'
              : 'grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16'
          }
        >
          <div className="text-white">
            <h2
              id="guidance-heading"
              className={`whitespace-pre-line font-semibold leading-[140%] text-white ${
                isEmbedded ? 'text-[22px] md:text-[24px]' : 'text-[28px]'
              }`}
            >
              {heading}
            </h2>

            <ul
              className={`flex flex-col ${isEmbedded ? 'mt-6 gap-8' : 'mt-10 gap-14'}`}
            >
              {stats.map((s) => (
                <li key={s.id}>
                  <p
                    className={`font-bold leading-normal text-white ${
                      isEmbedded ? 'text-[28px]' : 'text-[34px]'
                    }`}
                  >
                    {s.value}
                  </p>
                  <p
                    className={`mt-2 font-medium leading-[140%] text-white ${
                      isEmbedded ? 'text-[15px]' : 'text-[18px]'
                    }`}
                  >
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className={isEmbedded ? 'relative w-full' : 'relative z-20 mb-[-40px] w-full self-start'}>
            <GuidanceForm
              formTitle={formTitle}
              courses={courses}
              purposes={purposes}
              termsHref={termsHref}
              privacyHref={privacyHref}
              ctaLabel={ctaLabel}
              agreed={agreed}
              onToggleAgreed={() => setAgreed((v) => !v)}
              onSubmit={handleSubmit}
              embedded={isEmbedded}
            />
          </div>
        </div>
      </div>
    </>
  );

  if (isEmbedded) {
    return (
      <section
        className={`relative overflow-hidden rounded-lg bg-[#0D0D0D] px-6 py-6 md:px-8 md:py-8 ${className ?? ''}`}
        aria-labelledby="guidance-heading"
      >
        {content}
      </section>
    );
  }

  return (
    <section
      className={`full-bleed relative z-10 overflow-visible bg-[#0D0D0D] pt-10 pb-12 ${className ?? ''}`}
      aria-labelledby="guidance-heading"
    >
      {content}
    </section>
  );
}
