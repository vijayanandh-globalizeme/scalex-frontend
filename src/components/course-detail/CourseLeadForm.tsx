'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

export interface CourseLeadFormProps {
  title: string;
  purposes: { id: string; label: string }[];
  termsHref: string;
  privacyHref: string;
  ctaLabel: string;
  /** Hide decorative arrow (e.g. in modal). */
  showArrowDecor?: boolean;
  /** Optional id for the title heading (dialog aria-labelledby). */
  titleId?: string;
}

const fieldClassName =
  'h-11 w-full rounded-lg border border-[#6E6E6E] bg-white px-4 text-[14px] text-heading placeholder:text-placeholder focus:border-brand focus:outline-none';

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <span
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded ${
        checked ? 'bg-success' : 'border border-border-muted bg-white'
      }`}
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

function FormArrowDecor() {
  return (
    <div
      className="pointer-events-none absolute -right-4 top-1/2 z-0 hidden h-[min(100%,480px)] w-[280px] -translate-y-1/2 lg:block xl:-right-8 xl:w-[320px]"
      aria-hidden
    >
      <svg viewBox="0 0 320 480" fill="none" className="h-full w-full opacity-35">
        <defs>
          <linearGradient id="course-form-arrow-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="45%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
        </defs>
        <path
          d="M160 24 L300 456 L160 384 L20 456 Z"
          fill="url(#course-form-arrow-gradient)"
        />
      </svg>
    </div>
  );
}

export default function CourseLeadForm({
  title,
  purposes,
  termsHref,
  privacyHref,
  ctaLabel,
  showArrowDecor = true,
  titleId,
}: CourseLeadFormProps) {
  const [agreed, setAgreed] = useState(true);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="relative w-full">
      {showArrowDecor ? <FormArrowDecor /> : null}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full rounded-[20px] border border-[#C7C7C7] bg-white p-6 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:p-8"
      >
        <h2 id={titleId} className="text-left text-[20px] font-medium leading-normal text-heading">
          {title}
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5">
          <input type="text" required placeholder="Full Name" className={fieldClassName} />
          <input type="email" required placeholder="Email ID" className={fieldClassName} />
          <input type="tel" required placeholder="Contact Number" className={fieldClassName} />
          <select required defaultValue="" className={fieldClassName}>
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
          className="btn-brand mt-5 inline-flex h-[44px] items-center justify-center gap-2 self-start px-6 text-[14px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {ctaLabel}
          <svg className="btn-arrow-icon" width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
            <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
