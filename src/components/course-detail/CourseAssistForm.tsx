'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { sendContact } from '@/app/actions/contactActions';
import { useLeadSuccess } from '@/components/feedback/LeadSuccessProvider';
import { useContactFieldErrors, fieldErrorClass } from '@/components/feedback/useContactFieldErrors';
import { COURSE_SECTION_CARD } from './courseSectionCard';

const fieldClassName =
  'h-10 w-full rounded-lg border border-[#6E6E6E] bg-white px-3 text-[13px] text-heading placeholder:text-placeholder focus:border-brand focus:outline-none';

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

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

export type CourseAssistFormConfig = {
  assistTitle: string;
  purposes: { id: string; label: string }[];
  termsHref: string;
  privacyHref: string;
  ctaLabel: string;
};

export default function CourseAssistForm({
  config,
  className,
}: {
  config: CourseAssistFormConfig;
  className?: string;
}) {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { showLeadSuccess } = useLeadSuccess();
  const { fieldErrors, setFieldErrors, clearFieldError } = useContactFieldErrors();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setFieldErrors({});
    const purposeLabel = config.purposes.find((p) => p.id === purpose)?.label ?? purpose;
    const result = await sendContact({
      name,
      email,
      phone,
      purpose: purposeLabel,
    });
    if (result.success) {
      setStatus('idle');
      setName('');
      setEmail('');
      setPhone('');
      setPurpose('');
      showLeadSuccess();
    } else {
      setStatus('error');
      setErrorMessage(result.message);
      setFieldErrors(result.fieldErrors);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`shrink-0 ${COURSE_SECTION_CARD} p-5 ${className ?? ''}`}>
      <h2 className="text-[16px] font-medium leading-normal text-heading">{config.assistTitle}</h2>
      <div className="mt-4 grid gap-3">
        <div>
          <input
            type="text"
            required
            placeholder="Full Name"
            className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.name)}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError('name');
            }}
          />
          {fieldErrors.name ? <p className="mt-1 text-[11px] font-medium text-brand">{fieldErrors.name}</p> : null}
        </div>
        <div>
          <input
            type="email"
            required
            placeholder="Email ID"
            className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.email)}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError('email');
            }}
          />
          {fieldErrors.email ? <p className="mt-1 text-[11px] font-medium text-brand">{fieldErrors.email}</p> : null}
        </div>
        <div>
          <input
            type="tel"
            required
            placeholder="Contact Number"
            className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.phone)}`}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              clearFieldError('phone');
            }}
          />
          {fieldErrors.phone ? <p className="mt-1 text-[11px] font-medium text-brand">{fieldErrors.phone}</p> : null}
        </div>
        <div>
          <select
            required
            value={purpose}
            onChange={(e) => {
              setPurpose(e.target.value);
              clearFieldError('purpose');
            }}
            className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.purpose)}`}
          >
            <option value="" disabled>
              Purpose
            </option>
            {config.purposes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          {fieldErrors.purpose ? <p className="mt-1 text-[11px] font-medium text-brand">{fieldErrors.purpose}</p> : null}
        </div>
      </div>
      <label className="mt-3 flex items-start gap-2 text-[12px] font-normal leading-4 text-heading">
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
          <Link href={config.termsHref} target="_blank" rel="noopener noreferrer" className="hover:underline active:underline">
            Terms &amp; Conditions
          </Link>{' '}
          &amp;{' '}
          <Link href={config.privacyHref} target="_blank" rel="noopener noreferrer" className="hover:underline active:underline">
            Privacy Policy.
          </Link>
        </span>
      </label>
      <button
        type="submit"
        disabled={!agreed || status === 'submitting'}
        className="btn-brand mt-4 inline-flex h-10 w-full items-center justify-center gap-2 text-[13px] font-semibold disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting…' : config.ctaLabel}
        <ArrowRightIcon className="btn-arrow-icon shrink-0" />
      </button>
      {status === 'error' && Object.keys(fieldErrors).length === 0 ? (
        <p className="mt-3 text-center text-[12px] font-medium text-brand">
          {errorMessage || 'Something went wrong. Please try again.'}
        </p>
      ) : null}
    </form>
  );
}
