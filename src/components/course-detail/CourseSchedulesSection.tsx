'use client';

import { useState, useTransition, useRef, useEffect, type ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import CourseBrochureCta from './CourseBrochureCta';
import { COURSE_SECTION_CARD } from './courseSectionCard';
import { COURSE_SCHEDULE_FILTERS } from '@/lib/courseFilter';
import type { ApiCourseBatch } from '@/services/courseApi';

// ── Icons ────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function GuaranteeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden>
      <g clipPath="url(#css-guarantee-clip)">
        <path d="M0.577331 6.48311C-0.00702101 6.48311 -0.153109 6.86724 0.163415 7.30623L1.9814 9.79911C2.24923 10.1597 2.6388 10.1519 2.89851 9.79911L4.70838 7.2984C5.0249 6.86724 4.8707 6.48311 4.30258 6.48311H0.577331ZM18.1322 7.9961C18.1322 3.58256 14.4232 0 9.85394 0C5.28462 0 1.58371 3.57472 1.5756 8.00393C1.58371 8.37239 1.88401 8.66243 2.25734 8.66243C2.6388 8.66243 2.95533 8.36453 2.95533 7.9961C2.95533 4.31162 6.0394 1.33269 9.85394 1.33269C13.6684 1.33269 16.7526 4.31162 16.7526 7.9961C16.7526 11.6806 13.6684 14.6595 9.85394 14.6595C7.54086 14.6595 5.50375 13.562 4.27012 11.9001C4.01852 11.5786 3.63707 11.4768 3.29619 11.6727C2.97156 11.8688 2.87416 12.3156 3.15011 12.6605C4.65969 14.683 7.07014 15.9922 9.85394 15.9922C14.4232 15.9922 18.1322 12.4096 18.1322 7.9961Z" fill="#FD022D" />
        <path d="M8.99357 8.66243C10.2759 8.66243 11.2499 8.01961 11.4203 6.8202H12.0534C12.2157 6.8202 12.3293 6.70261 12.3293 6.56151C12.3293 6.4204 12.2157 6.30281 12.0534 6.30281H11.4365C11.396 5.78541 11.1687 5.30722 10.7548 4.97796H12.0534C12.2157 4.97796 12.3293 4.86038 12.3293 4.71927C12.3293 4.57032 12.2157 4.46057 12.0534 4.46057H7.56518C7.35416 4.46057 7.23242 4.59384 7.23242 4.81334V4.86821C7.23242 5.07987 7.35416 5.21315 7.56518 5.21315H8.88811C9.69159 5.21315 10.3328 5.53456 10.4544 6.30281H7.5246C7.36228 6.30281 7.24054 6.4204 7.24054 6.56151C7.24054 6.70261 7.36228 6.8202 7.5246 6.8202H10.4544C10.3408 7.61197 9.7078 7.90203 8.87996 7.90203H7.75997C7.44344 7.90203 7.25677 8.08237 7.25677 8.34101V8.36453C7.25677 8.59187 7.35416 8.72512 7.54083 8.88198L10.3165 11.3906C10.4544 11.5159 10.56 11.61 10.771 11.61C11.0064 11.61 11.1849 11.4297 11.1849 11.2102C11.1849 11.0613 11.1119 10.9515 10.9902 10.8496L8.57155 8.66243H8.99357Z" fill="#FD022D" />
      </g>
      <defs><clipPath id="css-guarantee-clip"><rect width="20" height="16" fill="white" /></clipPath></defs>
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1.85616 12H9.93101C11.1665 12 11.7813 11.3229 11.7813 9.98162V2.03152C11.7813 0.690223 11.1665 0.0130615 9.93101 0.0130615H1.85616C0.62069 0.0130615 0 0.683708 0 2.03152V9.98162C0 11.3294 0.62069 12 1.85616 12ZM1.76749 10.9518C1.24138 10.9518 0.951728 10.6458 0.951728 10.0402V3.90021C0.951728 3.30119 1.24138 2.98865 1.76749 2.98865H10.0079C10.534 2.98865 10.8296 3.30119 10.8296 3.90021V10.0402C10.8296 10.6458 10.534 10.9518 10.0079 10.9518H1.76749Z" fill="currentColor" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <g clipPath="url(#css-clock-clip)">
        <path d="M6.8753 13.9932C10.6702 13.9932 13.7506 10.8584 13.7506 6.99659C13.7506 3.13474 10.6702 0 6.8753 0C3.0804 0 0 3.13474 0 6.99659C0 10.8584 3.0804 13.9932 6.8753 13.9932ZM6.8753 12.8271C3.70727 12.8271 1.14589 10.2205 1.14589 6.99659C1.14589 3.77267 3.70727 1.1661 6.8753 1.1661C10.0433 1.1661 12.6047 3.77267 12.6047 6.99659C12.6047 10.2205 10.0433 12.8271 6.8753 12.8271Z" fill="currentColor" />
        <path d="M3.35074 7.73744H6.86928C7.13214 7.73744 7.34114 7.53171 7.34114 7.25728V2.63407C7.34114 2.36655 7.13214 2.16077 6.86928 2.16077C6.6064 2.16077 6.40418 2.36655 6.40418 2.63407V6.784H3.35074C3.08112 6.784 2.87891 6.98978 2.87891 7.25728C2.87891 7.53171 3.08112 7.73744 3.35074 7.73744Z" fill="currentColor" />
      </g>
      <defs><clipPath id="css-clock-clip"><rect width="14" height="14" fill="white" /></clipPath></defs>
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1.19302 11.9933H10.5488C11.2953 11.9933 11.7418 11.6598 11.7418 11.1062C11.7418 9.38517 9.48832 7.01056 5.86743 7.01056C2.25349 7.01056 0 9.38517 0 11.1062C0 11.6598 0.446511 11.9933 1.19302 11.9933ZM5.87441 5.81655C7.36743 5.81655 8.6651 4.53584 8.6651 2.86825C8.6651 1.22068 7.36743 0 5.87441 0C4.38139 0 3.08372 1.24736 3.08372 2.88159C3.08372 4.53584 4.37441 5.81655 5.87441 5.81655Z" fill="currentColor" />
    </svg>
  );
}

function SlotsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none" aria-hidden>
      <path d="M4.48144 8.99995C4.73915 8.99995 4.92168 8.74526 5.05415 8.35092L7.39863 1.32263C7.46307 1.13367 7.49888 0.965258 7.49888 0.825596C7.49888 0.558593 7.35571 0.394287 7.12303 0.394287C7.00135 0.394287 6.85459 0.435366 6.68994 0.509304L0.533333 3.21628C0.232662 3.34773 0 3.55722 0 3.85709C0 4.23501 0.250559 4.36234 0.594181 4.48146L2.52707 5.15514C2.75615 5.23729 2.88501 5.22905 3.03892 5.06475L6.96554 0.854351C7.01209 0.805057 7.06575 0.813272 7.10156 0.850241C7.13737 0.89132 7.14092 0.952934 7.09796 1.00634L3.4434 5.52891C3.3038 5.69733 3.29306 5.83702 3.36107 6.1122L3.93021 8.28109C4.03757 8.69596 4.14855 8.99995 4.48144 8.99995Z" fill="#1E293B" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Date Range Picker ─────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toIso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function DateRangePicker({
  value,
  onChange,
  onClose,
}: {
  value: { from: string; to: string } | null;
  onChange: (v: { from: string; to: string } | null) => void;
  onClose: () => void;
}) {
  const now = new Date();
  const today = toIso(now);
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
  const [selecting, setSelecting] = useState<'from' | 'to'>('from');
  const [draft, setDraft] = useState<{ from: string | null; to: string | null }>(
    value ? { from: value.from, to: value.to } : { from: null, to: null },
  );

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to 6 rows if needed
  while (cells.length % 7 !== 0) cells.push(null);

  function prevMonth() {
    if (isCurrentMonth) return;
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function isPast(day: number) {
    return toIso(new Date(viewYear, viewMonth, day)) < today;
  }

  function selectDay(day: number) {
    if (isPast(day)) return;
    const d = new Date(viewYear, viewMonth, day);
    const iso = toIso(d);
    if (selecting === 'from') {
      setDraft({ from: iso, to: null });
      setSelecting('to');
    } else {
      const from = draft.from!;
      const [f, t] = iso < from ? [iso, from] : [from, iso];
      setDraft({ from: f, to: t });
      setSelecting('from');
    }
  }

  function inRange(day: number) {
    if (!draft.from || !draft.to) return false;
    const d = toIso(new Date(viewYear, viewMonth, day));
    return d > draft.from && d < draft.to;
  }

  function isFrom(day: number) {
    return draft.from === toIso(new Date(viewYear, viewMonth, day));
  }
  function isTo(day: number) {
    return draft.to === toIso(new Date(viewYear, viewMonth, day));
  }

  function apply() {
    if (draft.from && draft.to) {
      onChange({ from: draft.from, to: draft.to });
    }
    onClose();
  }

  function clear() {
    setDraft({ from: null, to: null });
    onChange(null);
    onClose();
  }

  const fmt = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : '—';

  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-[300px] rounded-2xl border border-[#EBEBEB] bg-white p-4 shadow-[0_8px_32px_0_rgba(30,41,59,0.14)]">
      {/* Month nav */}
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={prevMonth} disabled={isCurrentMonth} className="btn-mui-ink-tint flex h-7 w-7 items-center justify-center rounded-lg text-heading disabled:pointer-events-none disabled:opacity-30">
          <ChevronDownIcon className="rotate-90" />
        </button>
        <span className="text-[13px] font-semibold text-heading">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} className="btn-mui-ink-tint flex h-7 w-7 items-center justify-center rounded-lg text-heading">
          <ChevronDownIcon className="-rotate-90" />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d} className="text-[10px] font-medium text-muted">{d}</span>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <span key={`e-${i}`} />;
          const past = isPast(day);
          const from = isFrom(day);
          const to = isTo(day);
          const range = inRange(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => selectDay(day)}
              disabled={past}
              className={`relative flex h-8 w-full items-center justify-center text-[12px] font-medium transition
                ${past ? 'cursor-not-allowed text-zinc-300' : ''}
                ${!past && (from || to) ? 'z-10 rounded-lg bg-brand text-white' : ''}
                ${!past && range ? 'bg-[#FFF0F1] text-heading' : ''}
                ${!past && !from && !to && !range ? 'rounded-lg text-heading hover:bg-[#F4F4F4]' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected range display */}
      <div className="mt-3 flex items-center justify-between rounded-lg bg-[#F5F6F8] px-3 py-2 text-[11px] text-muted">
        <span>{fmt(draft.from)}</span>
        <span className="text-zinc-300">→</span>
        <span>{fmt(draft.to)}</span>
      </div>

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={clear} className="btn-mui-ink-tint flex-1 rounded-lg py-2 text-[12px] font-medium text-heading">
          Clear
        </button>
        <button
          type="button"
          onClick={apply}
          disabled={!draft.from || !draft.to}
          className="flex-1 rounded-lg bg-brand py-2 text-[12px] font-medium text-white disabled:opacity-40"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// ── Schedule Card ─────────────────────────────────────────────────────────────

const SCHEDULE_CARD =
  'relative overflow-hidden rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function discountPct(retail: number, selling: number) {
  return retail > selling ? Math.round(((retail - selling) / retail) * 100) : 0;
}

function MetaItem({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF6F7]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-heading">{title}</p>
        <p className="mt-0.5 text-[12px] text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

function QuantityStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex shrink-0 items-center overflow-hidden rounded-lg border border-[#EBEBEB] bg-white">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} className="btn-mui-ink-tint flex h-8 w-8 items-center justify-center text-[16px] text-brand" aria-label="Decrease">−</button>
      <span className="flex h-8 min-w-8 items-center justify-center border-x border-zinc-200 px-1 text-[13px] font-medium text-heading">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className="btn-mui-ink-tint flex h-8 w-8 items-center justify-center text-[16px] text-brand" aria-label="Increase">+</button>
    </div>
  );
}

function ScheduleCard({ batch, quantity, onQuantityChange }: {
  batch: ApiCourseBatch;
  quantity: number;
  onQuantityChange: (n: number) => void;
}) {
  const sym = batch.currencySymbol;
  const retail = Number(batch.plan1RetailPrice ?? 0);
  const selling = Number(batch.plan1SellingPrice ?? 0);
  const pct = discountPct(retail, selling);

  const startLabel = formatDate(batch.startDate);
  const endLabel = formatDate(batch.endDate);
  const dateRange = startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`;
  const timeLabel = `${batch.timezone}: ${batch.startTime} – ${batch.endTime}`;
  const dayLabel = batch.dayType === 'WEEKDAY' ? 'Weekday Batch' : 'Weekend Batch';

  return (
    <article className={SCHEDULE_CARD}>
      {batch.isTrending ? (
        <span className="absolute top-3 right-4 rounded-lg bg-[#FFF6F7] px-2 py-0.5 text-[10px] font-medium text-brand">Trending</span>
      ) : null}
      <span className="absolute inset-y-0 left-0 w-1 rounded-l-[20px] bg-brand" aria-hidden />
      <div className="flex flex-col xl:flex-row">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 border-b border-zinc-100 py-4 pr-4 pl-[30px] sm:flex-row sm:items-start sm:justify-between md:py-5 md:pr-5">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFF6F7] px-2 py-1 text-[12px] font-medium leading-[140%] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                LIVE VIRTUAL TRAINING
              </span>
              <p className="mt-3 text-[24px] font-semibold text-heading">{dateRange}</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[14px] font-medium text-muted">
                <ClockIcon className="shrink-0 text-brand" />
                {timeLabel}
              </p>
            </div>
            <QuantityStepper value={quantity} onChange={onQuantityChange} />
          </div>

          <div className="grid gap-4 py-4 pr-4 pl-[35px] sm:grid-cols-3 md:py-5 md:pr-5">
            <MetaItem icon={<CalendarIcon className="text-brand" />} title={dayLabel} subtitle={`${batch.noOfSessions} Sessions`} />
            <MetaItem icon={<PersonIcon className="text-brand" />} title={batch.trainerName} subtitle="Certified Trainer" />
            <MetaItem icon={<ClockIcon className="text-brand" />} title={batch.venue} subtitle={batch.availability} />
          </div>
        </div>

        <div className="flex shrink-0 flex-col justify-between border-t border-zinc-100 bg-[linear-gradient(90deg,#FFF_76.35%,#FFF7F8_99.67%)] p-4 xl:w-[216px] xl:rounded-r-[20px] xl:border-t-0 xl:border-l xl:p-5">
          <div>
            {pct > 0 ? (
              <span className="inline-flex rounded-lg border border-brand bg-white px-2 py-[5px] text-[10px] font-normal leading-[140%] text-brand">
                {pct}% Off
              </span>
            ) : null}
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="inline-flex items-baseline gap-1">
                <span className="text-[14px] font-medium leading-[18px] text-brand">{sym}</span>
                <span className="text-[24px] font-semibold leading-[18px] text-heading">
                  {selling.toLocaleString('en-IN')}
                </span>
              </span>
              {retail > selling ? (
                <span className="text-[13px] text-muted line-through">{sym} {retail.toLocaleString('en-IN')}</span>
              ) : null}
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#F5F6F8] px-2.5 py-1 text-[12px] font-normal leading-[140%] text-heading">
              <SlotsIcon className="shrink-0" />
              {batch.availability === 'AVAILABLE' ? 'Available' : batch.availability}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-center text-[10px] text-muted">
              <span>Secure<br />Payment</span>
              <span className="text-zinc-300" aria-hidden>|</span>
              <span>Easy<br />Refund</span>
              <span className="text-zinc-300" aria-hidden>|</span>
              <span>24/7<br />Support</span>
            </div>
            <CourseBrochureCta openModal className="btn-brand mt-3 inline-flex w-[139px] items-center justify-center gap-[11px] px-4 py-[11px] text-[14px] font-medium leading-[18px]">
              Enroll Now
              <ArrowRightIcon className="btn-arrow-icon shrink-0 text-white" />
            </CourseBrochureCta>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export default function CourseSchedulesSection({
  initialBatches,
  courseName,
}: {
  initialBatches: ApiCourseBatch[];
  courseName: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeFilter = searchParams.get('filter') ?? '';
  const activeDateFrom = searchParams.get('dateFrom') ?? '';
  const activeDateTo = searchParams.get('dateTo') ?? '';
  const hasDateRange = Boolean(activeDateFrom && activeDateTo);

  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(initialBatches.map((b) => [b.id, 1])),
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    }
    if (pickerOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [pickerOpen]);

  function handleFilterClick(param: string) {
    startTransition(() => {
      const next = new URLSearchParams();
      if (activeFilter !== param) next.set('filter', param);
      // clear date range when a preset filter is selected
      router.push(`${pathname}?${next.toString()}`);
    });
  }

  function handleDateRange(v: { from: string; to: string } | null) {
    startTransition(() => {
      const next = new URLSearchParams();
      if (v) {
        next.set('dateFrom', v.from);
        next.set('dateTo', v.to);
      }
      router.push(`${pathname}?${next.toString()}`);
    });
  }

  const dateRangeLabel = hasDateRange
    ? `${new Date(activeDateFrom).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${new Date(activeDateTo).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
    : 'Month';

  return (
    <div className={`overflow-visible ${COURSE_SECTION_CARD} px-5 py-5 md:px-6 md:py-5`}>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-[22px] font-bold leading-[140%] text-heading">Upcoming Schedules</h2>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-[#FFF6F7] px-2.5 py-1 text-[11px] font-medium leading-[140%] text-brand">
          <GuaranteeIcon className="shrink-0" />
          100% Money Back Guarantee
        </span>
      </div>

      {/* Filters */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {COURSE_SCHEDULE_FILTERS.map((filter) => {
          const isActive = activeFilter === filter.param && !hasDateRange;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => handleFilterClick(filter.param)}
              disabled={isPending}
              className={`inline-flex h-8 items-center rounded-lg px-3 text-[12px] font-medium leading-[140%] transition ${
                isActive
                  ? 'bg-brand/10 text-brand ring-1 ring-brand/30'
                  : 'btn-mui-ink-tint bg-[#F4F4F4] text-heading'
              }`}
            >
              {filter.label}
            </button>
          );
        })}

        {/* Month / date range picker */}
        <div ref={pickerRef} className="relative">
          <button
            type="button"
            onClick={() => setPickerOpen((o) => !o)}
            disabled={isPending}
            className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] font-medium leading-[140%] transition ${
              hasDateRange
                ? 'bg-brand/10 text-brand ring-1 ring-brand/30'
                : 'btn-mui-ink-tint bg-[#F4F4F4] text-heading'
            }`}
          >
            <CalendarIcon className="shrink-0 opacity-70" />
            {dateRangeLabel}
            <ChevronDownIcon className={`shrink-0 opacity-60 transition-transform ${pickerOpen ? 'rotate-180' : ''}`} />
          </button>

          {pickerOpen ? (
            <DateRangePicker
              value={hasDateRange ? { from: activeDateFrom, to: activeDateTo } : null}
              onChange={handleDateRange}
              onClose={() => setPickerOpen(false)}
            />
          ) : null}
        </div>
      </div>

      {/* Batch list */}
      <div className={`mt-5 space-y-4 overflow-visible transition-opacity duration-200 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {initialBatches.length === 0 ? (
          <p className="py-8 text-center text-[14px] text-muted">No schedules found for the selected filter.</p>
        ) : (
          initialBatches.map((batch) => (
            <ScheduleCard
              key={batch.id}
              batch={batch}
              quantity={quantities[batch.id] ?? 1}
              onQuantityChange={(n) => setQuantities((prev) => ({ ...prev, [batch.id]: n }))}
            />
          ))
        )}
      </div>
    </div>
  );
}
