'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { payPaymentLinkAction } from '@/app/actions/paymentLinkActions';
import type { ApiPaymentLink } from '@/services/paymentLinkApi';

const fieldClassName =
  'h-11 w-full rounded-lg border border-[#6E6E6E] bg-white px-4 text-[14px] text-heading placeholder:text-placeholder focus:border-brand focus:outline-none';

const fieldErrorClass = (hasError: boolean) => (hasError ? 'border-brand' : '');

const TYPE_LABEL: Record<ApiPaymentLink['paymentType'], string> = {
  FULL: 'Full Payment',
  TOKEN: 'Token Payment',
  REMAINING: 'Remaining Payment',
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function money(currency: string, value: number): string {
  return `${currency} ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;
}

export default function PayLinkView({ link }: { link: ApiPaymentLink }) {
  const [firstName, setFirstName]     = useState('');
  const [lastName, setLastName]       = useState('');
  const [phone, setPhone]             = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [agreed, setAgreed]           = useState(false);
  const [status, setStatus]           = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [paytmRedirect, setPaytmRedirect] = useState<{ actionUrl: string; mid: string; orderId: string; txnToken: string } | null>(null);
  const paytmFormRef = useRef<HTMLFormElement>(null);

  // Once Paytm's redirect fields are in the DOM, auto-submit to the hosted page.
  useEffect(() => {
    if (paytmRedirect) paytmFormRef.current?.submit();
  }, [paytmRedirect]);

  const clearFieldError = (key: string) => {
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: '' }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting' || !agreed) return;
    setStatus('submitting');
    setErrorMessage(null);

    const result = await payPaymentLinkAction(link.code, { firstName, lastName, phone, companyName, designation });

    if (result.success) {
      // Leaves status 'submitting' — the page is about to navigate away to Paytm.
      setPaytmRedirect({
        actionUrl: result.actionUrl,
        mid: result.mid,
        orderId: result.orderId,
        txnToken: result.txnToken,
      });
      return;
    }

    setStatus('error');
    setErrorMessage(result.message);
    setFieldErrors(result.fieldErrors);
  }

  const b = link.batch;
  const taxPct = Number(link.taxPercentage);
  const dateRange = b ? (b.startDate === b.endDate ? formatDate(b.startDate) : `${formatDate(b.startDate)} - ${formatDate(b.endDate)}`) : null;

  return (
    <section className="full-bleed relative overflow-x-clip bg-[#F5F6F8]">
      <div className="site-container relative z-10 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
          {/* ── LHS: Billing form ─────────────────────────────────────── */}
          <div>
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#FFF6E9] px-4 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-heading text-[12px] font-semibold text-white">1</span>
              <h2 className="text-[16px] font-semibold text-heading">Your Details</h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-white p-6 shadow-[0_4px_4px_0_rgba(30,41,59,0.03),0_4px_4px_0_rgba(30,41,59,0.08)] md:p-8"
            >
              <h3 className="text-[16px] font-semibold text-heading">Billing Information</h3>

              {errorMessage ? (
                <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-[13px] font-medium text-brand">{errorMessage}</p>
              ) : null}

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="First Name *"
                    className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.firstName)}`}
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); clearFieldError('firstName'); }}
                  />
                  {fieldErrors.firstName ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.firstName}</p> : null}
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Last Name *"
                    className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.lastName)}`}
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); clearFieldError('lastName'); }}
                  />
                  {fieldErrors.lastName ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.lastName}</p> : null}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5">
                <div>
                  <input type="email" value={link.payerEmail} readOnly className={`${fieldClassName} cursor-not-allowed bg-[#F5F6F8] text-muted`} />
                  <p className="mt-1 text-[12px] text-subtle">This payment link is personal to this email address.</p>
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone *"
                    className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.phone)}`}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); clearFieldError('phone'); }}
                  />
                  {fieldErrors.phone ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.phone}</p> : null}
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className={fieldClassName}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Designation"
                    className={fieldClassName}
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
              </div>

              <label className="mt-4 flex items-start gap-2 text-[12px] text-subtle">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-[2px] h-4 w-4 accent-[var(--color-success,#16a34a)]"
                />
                <span>
                  I agree to EdgeX&apos;s{' '}
                  <Link href="/legal/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                    Terms &amp; Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                    Privacy Policy.
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed || status === 'submitting'}
                className="btn-brand mt-5 inline-flex h-[46px] w-full items-center justify-center gap-2 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? 'Please wait…' : `Pay ${money(link.currency, link.amount.total)}`}
              </button>
            </form>
          </div>

          {/* ── RHS: Summary ──────────────────────────────────────────── */}
          <aside className="h-fit rounded-2xl border border-border bg-white p-6 shadow-[0_4px_4px_0_rgba(30,41,59,0.03),0_4px_4px_0_rgba(30,41,59,0.08)]">
            <span className="inline-flex rounded-full bg-[#FFF6E9] px-3 py-1 text-[12px] font-semibold text-heading">
              {TYPE_LABEL[link.paymentType]}
            </span>
            <h2 className="mt-3 text-[18px] font-bold leading-snug text-heading">{link.courseName}</h2>
            {link.planName ? <p className="mt-1 text-[13px] text-muted">{link.planName}</p> : null}

            {b ? (
              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-[13px]">
                {dateRange ? (
                  <div className="flex justify-between gap-4"><dt className="text-muted">Batch</dt><dd className="text-right font-medium text-heading">{dateRange}</dd></div>
                ) : null}
                <div className="flex justify-between gap-4"><dt className="text-muted">Time</dt><dd className="text-right font-medium text-heading">{b.startTime} - {b.endTime}</dd></div>
                {b.trainer ? (
                  <div className="flex justify-between gap-4"><dt className="text-muted">Trainer</dt><dd className="text-right font-medium text-heading">{b.trainer.name}</dd></div>
                ) : null}
                {link.country ? (
                  <div className="flex justify-between gap-4"><dt className="text-muted">Location</dt><dd className="text-right font-medium text-heading">{link.country.name}</dd></div>
                ) : null}
              </dl>
            ) : null}

            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-[14px]">
              <div className="flex justify-between"><dt className="text-muted">Amount</dt><dd className="text-heading">{money(link.currency, link.amount.base)}</dd></div>
              <div className="flex justify-between">
                <dt className="text-muted">{link.taxName || 'Tax'}{taxPct ? ` (${taxPct}%)` : ''}</dt>
                <dd className="text-heading">{money(link.currency, link.amount.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-[16px] font-bold">
                <dt className="text-heading">Total</dt>
                <dd className="text-heading">{money(link.currency, link.amount.total)}</dd>
              </div>
            </dl>

            <p className="mt-4 text-[12px] text-subtle">
              Link valid until {new Date(link.expiresAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}.
              Payments are processed securely by Paytm.
            </p>
          </aside>
        </div>

        {/* Hidden, auto-submitting POST to Paytm's hosted checkout page. */}
        {paytmRedirect ? (
          <form ref={paytmFormRef} method="post" action={paytmRedirect.actionUrl} className="hidden">
            <input type="hidden" name="mid" value={paytmRedirect.mid} />
            <input type="hidden" name="orderId" value={paytmRedirect.orderId} />
            <input type="hidden" name="txnToken" value={paytmRedirect.txnToken} />
          </form>
        ) : null}

        {status === 'submitting' ? (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-[380px] overflow-hidden rounded-2xl bg-white p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
              <p className="text-[15px] font-medium text-heading">Redirecting you to Paytm to complete payment…</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
