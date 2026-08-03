'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { getAvailableCoupons, applyCoupon, submitCheckoutForm } from '@/app/actions/checkoutActions';
import { useContactFieldErrors, fieldErrorClass } from '@/components/feedback/useContactFieldErrors';
import type { ApiCheckoutBatch, ApiAvailableCoupon } from '@/services/checkoutApi';

// ── Formatting helpers ──────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' });
}

function formatTime(time: string) {
  const [hStr, mStr] = time.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr || '0', 10);
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}:00 ${period}` : `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function batchLabel(dayType: string, startTime: string) {
  const h = parseInt(startTime.split(':')[0], 10);
  const timeOfDay = h < 12 ? 'Morning' : h < 18 ? 'Evening' : 'Night';
  return `${timeOfDay} Batch`;
}

function planNameFor(batch: ApiCheckoutBatch, planNumber: number): string {
  const name =
    planNumber === 1 ? batch.plan?.plan1Name : planNumber === 2 ? batch.plan?.plan2Name : batch.plan?.plan3Name;
  return name || `Plan ${planNumber}`;
}

function planPriceFor(batch: ApiCheckoutBatch, planNumber: number): { retail: number; selling: number } | null {
  const selling =
    planNumber === 1 ? batch.plan1SellingPrice : planNumber === 2 ? batch.plan2SellingPrice : batch.plan3SellingPrice;
  const retail =
    planNumber === 1 ? batch.plan1RetailPrice : planNumber === 2 ? batch.plan2RetailPrice : batch.plan3RetailPrice;
  if (selling == null) return null;
  return { retail: Number(retail ?? selling), selling: Number(selling) };
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
          <path d="M2 6.5L4.8 9 10 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  );
}

function QuantityStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex w-fit shrink-0 items-stretch overflow-hidden rounded-md border border-[#EBEBEB] bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="btn-mui-ink-tint flex h-9 w-9 items-center justify-center text-[15px] leading-none text-brand"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="flex h-9 w-9 items-center justify-center border-x border-zinc-200 text-[14px] font-medium text-heading">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="btn-mui-ink-tint flex h-9 w-9 items-center justify-center text-[15px] leading-none text-brand"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

interface AppliedCoupon {
  couponId: string;
  couponCode: string;
  discountType: 'FLAT' | 'PERCENTAGE';
  discountValue: number;
  discountAmount: number;
}

export default function CheckoutView({
  batch,
  planNumber,
  initialQuantity,
}: {
  batch: ApiCheckoutBatch;
  planNumber: number;
  initialQuantity: number;
}) {
  const router = useRouter();

  const [quantity, setQuantity] = useState(initialQuantity);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [agreed, setAgreed] = useState(true);

  const [availableCoupons, setAvailableCoupons] = useState<ApiAvailableCoupon[]>([]);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const { fieldErrors, setFieldErrors, clearFieldError } = useContactFieldErrors();

  useEffect(() => {
    getAvailableCoupons(batch.id, planNumber).then(setAvailableCoupons).catch(() => {});
  }, [batch.id, planNumber]);

  // A quantity change invalidates any already-applied discount amount (it
  // was computed for the previous quantity) — clear it and let the user re-apply.
  function handleQuantityChange(next: number) {
    setQuantity(next);
    if (appliedCoupon) {
      setAppliedCoupon(null);
      setCouponError('Quantity changed — please re-apply your coupon.');
    }
  }

  async function handleApplyCoupon(code: string = couponInput) {
    const trimmed = code.trim();
    if (!trimmed) return;
    setCouponLoading(true);
    setCouponError(null);
    const result = await applyCoupon({ couponCode: trimmed, batchId: batch.id, planNumber, quantity });
    setCouponLoading(false);
    if (result.success) {
      setAppliedCoupon(result);
      setCouponInput(result.couponCode);
    } else {
      setAppliedCoupon(null);
      setCouponError(result.message);
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError(null);
  }

  function handleCopyCoupon(code: string) {
    setCouponInput(code);
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting' || !agreed) return;
    setStatus('submitting');
    setFieldErrors({});
    setErrorMessage('');

    const result = await submitCheckoutForm({
      batchId: batch.id,
      planNumber,
      quantity,
      firstName,
      lastName,
      email,
      phone,
      companyName,
      designation,
      couponCode: appliedCoupon?.couponCode,
    });

    if (result.success) {
      setStatus('idle');
      setSuccessOpen(true);
    } else {
      setStatus('error');
      setErrorMessage(result.message);
      setFieldErrors(result.fieldErrors);
    }
  }

  const price = planPriceFor(batch, planNumber);
  const unitRetail = price?.retail ?? 0;
  const unitSelling = price?.selling ?? 0;
  const retailSubtotal = unitRetail * quantity;
  const sellingSubtotal = unitSelling * quantity;
  const discountAmount = appliedCoupon?.discountAmount ?? 0;
  const afterDiscount = Math.max(0, sellingSubtotal - discountAmount);
  const taxPercentage = Number(batch.country.taxationPercentage);
  const taxAmount = Math.round(afterDiscount * (taxPercentage / 100) * 100) / 100;
  const total = afterDiscount + taxAmount;
  const sym = batch.country.currencySymbol;

  const startLabel = formatDate(batch.startDate);
  const endLabel = formatDate(batch.endDate);
  const dateRange = startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;

  const courseDetailsHref = `/${batch.course.category.uri}/${batch.course.uri}`;

  return (
    <section className="full-bleed relative overflow-x-clip bg-[#F5F6F8]">
      <div
        className="category-hero-bg pointer-events-none absolute inset-0"
        style={{ backgroundColor: '#F5F6F8' }}
        aria-hidden
      />
      <div className="site-container relative z-10 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
        {/* ── LHS: Billing form ─────────────────────────────────────── */}
        <div>
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#FFF6E9] px-4 py-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-heading text-[12px] font-semibold text-white">1</span>
            <h2 className="text-[16px] font-semibold text-heading">Basic Information</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-white p-6 shadow-[0_4px_4px_0_rgba(30,41,59,0.03),0_4px_4px_0_rgba(30,41,59,0.08)] md:p-8"
          >
            <h3 className="text-[16px] font-semibold text-heading">Billing Information</h3>

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
                <input
                  type="email"
                  required
                  placeholder="Email Id *"
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
                  placeholder="Phone *"
                  className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.phone)}`}
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); clearFieldError('phone'); }}
                />
                {fieldErrors.phone ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.phone}</p> : null}
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Company Name *"
                  className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.companyName)}`}
                  value={companyName}
                  onChange={(e) => { setCompanyName(e.target.value); clearFieldError('companyName'); }}
                />
                {fieldErrors.companyName ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.companyName}</p> : null}
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Designation *"
                  className={`${fieldClassName} ${fieldErrorClass(!!fieldErrors.designation)}`}
                  value={designation}
                  onChange={(e) => { setDesignation(e.target.value); clearFieldError('designation'); }}
                />
                {fieldErrors.designation ? <p className="mt-1 text-[12px] font-medium text-brand">{fieldErrors.designation}</p> : null}
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
              {status === 'submitting' ? 'Submitting…' : 'Proceed'}
              {status !== 'submitting' ? (
                <svg width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
                  <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
                </svg>
              ) : null}
            </button>

            {status === 'error' && Object.keys(fieldErrors).length === 0 ? (
              <p className="mt-3 text-[13px] font-medium text-brand">{errorMessage}</p>
            ) : null}

            <div className="mt-4 flex items-center gap-2 text-[12px] text-muted">
              <span className="inline-flex items-center rounded border border-border-muted px-1.5 py-0.5 text-[10px] font-semibold text-heading">SSL SECURE</span>
              <span>Transactions are safe, secure &amp; PCI-DSS compliant.</span>
            </div>
          </form>
        </div>

        {/* ── RHS: Order summary ────────────────────────────────────── */}
        <div>
          <div className="rounded-2xl border border-border bg-white p-6">
            <h3 className="text-[16px] font-semibold text-heading">Order Summary</h3>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-lg bg-heading px-2.5 py-1 text-[11px] font-medium text-white">
                  {planNameFor(batch, planNumber)}
                </span>
                <span className="inline-flex items-center rounded-lg bg-[#FFF6E9] px-2.5 py-1 text-[11px] font-medium text-[#B7791F]">
                  {batchLabel(batch.dayType, batch.startTime)}
                </span>
              </div>
              <QuantityStepper value={quantity} onChange={handleQuantityChange} />
            </div>

            <p className="mt-4 text-[17px] font-semibold text-heading">{batch.course.name}</p>
            <p className="mt-1 text-[13px] text-muted">
              {dateRange} · {batch.noOfSessions} Session{Number(batch.noOfSessions) === 1 ? '' : 's'}
            </p>
            <p className="mt-1 text-[13px] text-muted">
              {formatTime(batch.startTime)} – {formatTime(batch.endTime)}
            </p>
            <p className="mt-1 text-[13px] text-muted">Trainer: {batch.trainer.name}</p>
            <p className="mt-1 text-[13px] text-muted">{batch.venue}</p>

            <div className="mt-5 border-t border-border pt-4 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-heading">
                  {discountAmount > 0 ? (
                    <span className="inline-flex items-center rounded bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {appliedCoupon?.discountType === 'PERCENTAGE' ? `${appliedCoupon.discountValue}% OFF` : 'OFF'}
                    </span>
                  ) : null}
                  Subtotal
                </span>
                <span className="flex items-center gap-2">
                  {retailSubtotal > sellingSubtotal ? (
                    <span className="text-muted line-through">{sym}{retailSubtotal.toLocaleString('en-IN')}</span>
                  ) : null}
                  <span className="font-medium text-heading">{sym}{sellingSubtotal.toLocaleString('en-IN')}</span>
                </span>
              </div>

              {discountAmount > 0 ? (
                <div className="mt-2 flex items-center justify-between text-brand">
                  <span>Coupon ({appliedCoupon?.couponCode})</span>
                  <span>− {sym}{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              ) : null}

              {taxPercentage > 0 ? (
                <div className="mt-2 flex items-center justify-between text-muted">
                  <span>+ {batch.country.taxationName} {taxPercentage}%</span>
                  <span>{sym}{taxAmount.toLocaleString('en-IN')}</span>
                </div>
              ) : null}

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[16px] font-semibold text-heading">
                <span>Total</span>
                <span>{sym}{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-white p-6">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={couponInput}
                onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(null); }}
                disabled={!!appliedCoupon}
                className="h-11 w-full rounded-lg border border-[#6E6E6E] bg-white px-4 text-[14px] text-heading placeholder:text-placeholder focus:border-brand focus:outline-none disabled:bg-surface disabled:text-muted"
              />
              {appliedCoupon ? (
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="h-11 shrink-0 rounded-lg border border-brand px-4 text-[13px] font-semibold text-brand"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApplyCoupon()}
                  disabled={couponLoading || !couponInput.trim()}
                  className="btn-brand-outline h-11 shrink-0 rounded-lg px-4 text-[13px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {couponLoading ? 'Checking…' : 'Apply'}
                </button>
              )}
            </div>

            {appliedCoupon ? (
              <p className="mt-2 text-[12px] font-medium text-success">
                &ldquo;{appliedCoupon.couponCode}&rdquo; applied — you saved {sym}{discountAmount.toLocaleString('en-IN')}.
              </p>
            ) : couponError ? (
              <p className="mt-2 text-[12px] font-medium text-brand">{couponError}</p>
            ) : null}

            {availableCoupons.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {availableCoupons.map((c) => (
                  <div key={c.couponCode} className="rounded-lg border border-border-muted p-2.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[13px] font-semibold text-heading">{c.couponCode}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCoupon(c.couponCode)}
                        className="text-muted hover:text-brand"
                        aria-label={`Copy ${c.couponCode}`}
                        title="Copy code"
                      >
                        <CopyIcon />
                      </button>
                    </div>
                    <p className="mt-0.5 text-[12px] font-medium text-brand">
                      {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% Flat Discount` : `${sym}${c.discountValue} Flat Discount`}
                    </p>
                    <p className="text-[11px] text-muted">Valid Till {formatDate(c.expiredAt)}</p>
                    {copiedCode === c.couponCode ? <p className="text-[10px] text-success">Copied!</p> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Success modal ─────────────────────────────────────────── */}
      {successOpen ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-[380px] overflow-hidden rounded-2xl bg-white p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E7F8EF]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <h2 className="mt-5 text-[20px] font-extrabold text-heading">Payment Successful!</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              Thanks for enrolling in {batch.course.name}. Our team will reach out with the next steps shortly.
            </p>
            <button
              type="button"
              onClick={() => router.push(courseDetailsHref)}
              className="btn-brand mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg text-[14px] font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
      </div>
    </section>
  );
}
