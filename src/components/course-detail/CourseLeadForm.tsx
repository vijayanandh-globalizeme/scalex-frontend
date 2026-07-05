'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { sendContact } from '@/app/actions/contactActions';
import { useLeadSuccess } from '@/components/feedback/LeadSuccessProvider';
import { useContactFieldErrors, fieldErrorClass } from '@/components/feedback/useContactFieldErrors';
import { useCourseBrochureModal } from './CourseBrochureModalContext';

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
  /** Lead source context carried through from the CTA that opened this form (e.g. modal). */
  leadType?: string;
  courseId?: string | null;
  /**
   * File to unlock after a successful submit (brochure/guide/syllabus).
   * Held only in memory/closure — never rendered into the DOM — and opened
   * via `window.open` once the lead has actually been captured.
   */
  downloadUrl?: string | null;
  /** Drop the form's own card chrome (border/rounding/shadow) — used inside the modal's right column. */
  bare?: boolean;
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
  leadType,
  courseId,
  downloadUrl,
  bare = false,
}: CourseLeadFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { showLeadSuccess } = useLeadSuccess();
  const { closeBrochureModal } = useCourseBrochureModal();
  const { fieldErrors, setFieldErrors, clearFieldError } = useContactFieldErrors();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setFieldErrors({});
    const purposeLabel = purposes.find((p) => p.id === purpose)?.label ?? purpose;
    const result = await sendContact({ name, email, phone, purpose: purposeLabel });
    if (result.success) {
      setStatus('idle');
      setName('');
      setEmail('');
      setPhone('');
      setPurpose('');
      // Close the modal first so the success popup isn't layered on top of it.
      closeBrochureModal();
      if (downloadUrl) {
        // Triggered only after a verified successful submit — the URL is never
        // rendered as a link, so it never appears in the page's HTML source.
        window.open(downloadUrl, '_blank', 'noopener,noreferrer');
        showLeadSuccess('Thanks! Your download will begin shortly in a new tab.');
      } else {
        showLeadSuccess();
      }
    } else {
      setStatus('error');
      setErrorMessage(result.message);
      setFieldErrors(result.fieldErrors);
    }
  }

  return (
    <div className="relative w-full">
      {showArrowDecor ? <FormArrowDecor /> : null}
      <form
        onSubmit={handleSubmit}
        className={
          bare
            ? 'relative z-10 w-full bg-white p-6 md:p-8'
            : 'relative z-10 w-full rounded-[20px] border border-[#C7C7C7] bg-white p-6 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:p-8'
        }
      >
        <h2 id={titleId} className="text-left text-[20px] font-medium leading-normal text-heading">
          {title}
        </h2>
        {leadType ? <input type="hidden" name="leadType" value={leadType} /> : null}
        {courseId ? <input type="hidden" name="courseId" value={courseId} /> : null}

        <div className="mt-5 grid grid-cols-1 gap-5">
          <div>
            <input
              type="text"
              required
              placeholder="Full Name"
              className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.name)}`}
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError('name'); }}
            />
            {fieldErrors.name ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.name}</p> : null}
          </div>
          <div>
            <input
              type="email"
              required
              placeholder="Email ID"
              className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.email)}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }}
            />
            {fieldErrors.email ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.email}</p> : null}
          </div>
          <div>
            <input
              type="tel"
              required
              placeholder="Contact Number"
              className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.phone)}`}
              value={phone}
              onChange={(e) => { setPhone(e.target.value); clearFieldError('phone'); }}
            />
            {fieldErrors.phone ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.phone}</p> : null}
          </div>
          <div>
            <select
              required
              value={purpose}
              onChange={(e) => { setPurpose(e.target.value); clearFieldError('purpose'); }}
              className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.purpose)}`}
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
            {fieldErrors.purpose ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.purpose}</p> : null}
          </div>
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
            <Link href={termsHref} target="_blank" rel="noopener noreferrer" className="text-link hover:underline active:underline">
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link href={privacyHref} target="_blank" rel="noopener noreferrer" className="text-link hover:underline active:underline">
              Privacy Policy.
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreed || status === 'submitting'}
          className="btn-brand mt-5 inline-flex h-[44px] items-center justify-center gap-2 self-start px-6 text-[14px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Submitting…' : ctaLabel}
          <svg className="btn-arrow-icon" width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
            <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
          </svg>
        </button>

        {status === 'error' && Object.keys(fieldErrors).length === 0 ? (
          <p className="mt-3 text-[13px] font-medium text-brand">{errorMessage || 'Something went wrong. Please try again.'}</p>
        ) : null}
      </form>
    </div>
  );
}
