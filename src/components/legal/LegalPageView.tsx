'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { COURSE_SECTION_CARD } from '@/components/course-detail/courseSectionCard';
import { sendContact } from '@/app/actions/contactActions';
import { useLeadSuccess } from '@/components/feedback/LeadSuccessProvider';
import { useContactFieldErrors, fieldErrorClass } from '@/components/feedback/useContactFieldErrors';

// ── Sidebar contact form ──────────────────────────────────────────────────────

const PURPOSES = [
  { id: 'career-growth', label: 'Career Growth'    },
  { id: 'certification', label: 'Get Certified'    },
  { id: 'upskill-team',  label: 'Upskill My Team'  },
  { id: 'other',         label: 'Other'            },
];

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
      {checked && (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6.5L4.8 9 10 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
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

function LegalSidebar() {
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
    const purposeLabel = PURPOSES.find((p) => p.id === purpose)?.label ?? purpose;
    const result = await sendContact({ name, email, phone, purpose: purposeLabel });
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
    <aside className="hidden w-[246px] shrink-0 lg:block" aria-label="Get in touch">
      <div
        className="sticky z-30 flex max-h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto overscroll-contain"
        style={{ top: 'calc(4rem + 4.5rem)' }}
      >
        <form onSubmit={handleSubmit} className={`${COURSE_SECTION_CARD} p-5`}>
          <h2 className="text-[16px] font-medium leading-normal text-heading">Let us assist you</h2>
          <div className="mt-4 grid gap-3">
            <div>
              <input
                type="text"
                required
                placeholder="Full Name"
                className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.name)}`}
                value={name}
                onChange={(e) => { setName(e.target.value); clearFieldError('name'); }}
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
                onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }}
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
                onChange={(e) => { setPhone(e.target.value); clearFieldError('phone'); }}
              />
              {fieldErrors.phone ? <p className="mt-1 text-[11px] font-medium text-brand">{fieldErrors.phone}</p> : null}
            </div>
            <div>
              <select
                required
                value={purpose}
                onChange={(e) => { setPurpose(e.target.value); clearFieldError('purpose'); }}
                className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.purpose)}`}
              >
                <option value="" disabled>Purpose</option>
                {PURPOSES.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
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
              <Link href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="hover:underline active:underline">Terms &amp; Conditions</Link>{' '}
              &amp;{' '}
              <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline active:underline">Privacy Policy.</Link>
            </span>
          </label>
          <button
            type="submit"
            disabled={!agreed || status === 'submitting'}
            className="btn-brand mt-4 inline-flex h-10 w-full items-center justify-center gap-2 text-[13px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Submitting…' : 'Talk To Us'}
            <ArrowRightIcon className="btn-arrow-icon shrink-0" />
          </button>
          {status === 'error' && Object.keys(fieldErrors).length === 0 ? (
            <p className="mt-3 text-center text-[12px] font-medium text-brand">{errorMessage || 'Something went wrong. Please try again.'}</p>
          ) : null}
        </form>

        {/* Quick links card */}
        <div className={`${COURSE_SECTION_CARD} mt-5 p-5`}>
          <h3 className="mb-3 text-[14px] font-semibold text-heading">Legal Pages</h3>
          <ul className="space-y-2.5">
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Use', href: '/terms-of-use' },
              { label: 'Refund Policy', href: '/refund-policy' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-[13px] text-heading transition hover:text-brand"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

// ── Main view ─────────────────────────────────────────────────────────────────

export default function LegalPageView({
  title,
  content,
  updatedAt,
  breadcrumb,
}: {
  title: string;
  content: string;
  updatedAt: string;
  breadcrumb: string;
}) {
  const updated = new Date(updatedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Content is stored with &nbsp; between every word (copy-pasted from a
  // fixed-width source). &nbsp; is a non-breaking space that prevents normal
  // word-wrap, causing the browser to split words at the container edge.
  const sanitizedContent = content
    .replace(/&nbsp;/gi, ' ')        // non-breaking spaces → regular spaces
    .replace(/<br\s*\/?>/gi, ' ')    // <br> variants → space
    .replace(/\r\n|\r|\n/g, ' ')     // raw newlines
    .replace(/\s{2,}/g, ' ');        // collapse leftover double-spaces

  return (
    <section className="full-bleed bg-[#F5F6F8] pb-16 pt-6">
      <div className="site-container">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 transition hover:text-brand">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M2.5 7.5L10 1.667L17.5 7.5V17.5H13.333V12.5H6.667V17.5H2.5V7.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span className="text-muted">{'>'}</span>
          <span className="font-medium text-brand">{breadcrumb}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_246px] lg:gap-[40px]">
          {/* Content */}
          <div className="min-w-0 overflow-hidden">
            <div className={`${COURSE_SECTION_CARD} p-6 md:p-8`}>
              <h1 className="mb-1 text-2xl font-bold leading-tight text-heading md:text-3xl">{title} - test</h1>
              <p className="mb-6 text-sm text-muted">Last updated: {updated}</p>
              <div
                className="prose prose-sm max-w-none text-heading prose-headings:font-semibold prose-headings:text-heading prose-a:text-brand prose-a:underline prose-li:marker:text-brand"
                style={{ overflowWrap: 'break-word', minWidth: 0 }}
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </div>
          </div>

          {/* Sticky sidebar */}
          <LegalSidebar />
        </div>
      </div>
    </section>
  );
}
