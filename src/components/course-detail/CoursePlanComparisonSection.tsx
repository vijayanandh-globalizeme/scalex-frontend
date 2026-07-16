'use client';

import React from 'react';
import Link from 'next/link';
import type { ApiCoursePlanBatch, ApiCoursePlan, ApiCoursePlanFeature } from '@/services/courseApi';
import { COURSE_PLAN_COMPARISON_STATIC } from '@/lib/courseDetailStatics';

const SECTION_CARD =
  'rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

const ELITE_COLUMN_BG =
  'border-l border-l-[1px] border-l-[#FD022D]/35 bg-[linear-gradient(90deg,#fff6f8_0%,rgba(255,239,242,0.45)_100%)]';

function formatPrice(amount: number, currencySymbol: string) {
  return `${currencySymbol}${amount.toLocaleString('en-IN')}`;
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function FeatureCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#course-plan-check-clip)">
        <path d="M15.715 7.9961C15.715 12.4018 12.1945 15.9922 7.85749 15.9922C3.52817 15.9922 0 12.4018 0 7.9961C0 3.58256 3.52817 0 7.85749 0C12.1945 0 15.715 3.58256 15.715 7.9961ZM10.2532 4.88389L6.96389 10.2617L5.40009 8.20775C5.20751 7.94906 5.03804 7.8785 4.81464 7.8785C4.46798 7.8785 4.19837 8.16858 4.19837 8.5213C4.19837 8.7016 4.2677 8.87411 4.38325 9.03088L6.3168 11.4454C6.51709 11.7198 6.73279 11.8295 6.99471 11.8295C7.25662 11.8295 7.48002 11.7041 7.64179 11.4454L11.2624 5.6443C11.3548 5.47968 11.455 5.29937 11.455 5.12691C11.455 4.75846 11.1391 4.52329 10.8002 4.52329C10.5999 4.52329 10.3996 4.64871 10.2532 4.88389Z" fill="#43BE11" fillOpacity="0.85" />
      </g>
      <defs>
        <clipPath id="course-plan-check-clip"><rect width="16" height="16" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function FeatureCrossIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#course-plan-cross-clip)">
        <path d="M15.715 7.9961C15.715 12.4018 12.1945 15.9922 7.85749 15.9922C3.52817 15.9922 0 12.4018 0 7.9961C0 3.58256 3.52817 0 7.85749 0C12.1945 0 15.715 3.58256 15.715 7.9961ZM10.1377 4.79766L7.86583 7.09323L5.60039 4.79766C5.47713 4.67223 5.32307 4.60952 5.15359 4.60952C4.79923 4.60952 4.51421 4.89173 4.51421 5.2445C4.51421 5.4248 4.58354 5.58158 4.69909 5.70702L6.96035 8.00816L4.69909 10.293C4.58354 10.4263 4.51421 10.5752 4.51421 10.7555C4.51421 11.1162 4.79923 11.4141 5.15359 11.4141C5.33847 11.4141 5.49254 11.3356 5.61579 11.218L7.86359 8.92733L10.1146 11.218C10.2378 11.3356 10.3919 11.4141 10.5768 11.4141C10.9235 11.4141 11.2085 11.1162 11.2085 10.7555C11.2085 10.5752 11.1469 10.4263 11.0236 10.293L8.76714 8.00654L11.0236 5.70702C11.1469 5.58158 11.2085 5.4248 11.2085 5.2445C11.2085 4.89173 10.9235 4.60952 10.5768 4.60952C10.3996 4.60952 10.2532 4.67223 10.1377 4.79766Z" fill="#D61534" fillOpacity="0.85" />
      </g>
      <defs>
        <clipPath id="course-plan-cross-clip"><rect width="16" height="16" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function FeatureStatusIcon({ included }: { included: boolean }) {
  return included ? <FeatureCheckIcon /> : <FeatureCrossIcon />;
}

export type ActivePlanInfo = {
  plan: ApiCoursePlan;
  retailPrice: number;
  sellingPrice: number;
};

function discountPercent(retail: number, selling: number) {
  return Math.round(((retail - selling) / retail) * 100);
}

function PlanCard({
  planInfo,
  isElite,
  currencySymbol,
  batchId,
  courseId,
}: {
  planInfo: ActivePlanInfo;
  isElite: boolean;
  currencySymbol: string;
  batchId: string;
  courseId?: string | null;
}) {
  const { plan, retailPrice, sellingPrice } = planInfo;
  const pct = discountPercent(retailPrice, sellingPrice);

  const checkoutParams = new URLSearchParams({
    batchId,
    planNumber: String(plan.planNumber),
  });
  if (courseId) checkoutParams.set('courseId', courseId);
  const checkoutHref = `/checkout?${checkoutParams.toString()}`;

  return (
    <div
      className={`interactive-card relative flex w-[232px] flex-col rounded-[20px] border bg-white p-4 ${
        isElite ? 'border-[#FD022D]' : 'border-[#EBEBEB]'
      }`}
    >
      {plan.isTrending ? (
        <span className="absolute top-3 right-3 inline-flex h-[30px] items-center rounded-[8px] bg-[#FFF2F2] px-2.5 text-[10px] font-medium leading-normal text-[#FD022D]">
          Trending
        </span>
      ) : pct > 0 ? (
        <span className="absolute top-3 right-3 inline-flex h-[30px] items-center rounded-[8px] bg-[#FFF2F2] px-2.5 text-[10px] font-medium leading-normal text-[#FD022D]">
          {pct}% Off
        </span>
      ) : null}
      <p className="interactive-card-title pr-12 text-[14px] font-medium leading-[140%] text-heading">{plan.name}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
        <span className="text-[16px] font-semibold leading-[140%] text-heading">
          {formatPrice(sellingPrice, currencySymbol)}
        </span>
        {retailPrice > sellingPrice ? (
          <span className="text-[12px] leading-normal text-muted line-through">
            {formatPrice(retailPrice, currencySymbol)}
          </span>
        ) : null}
      </div>
      <Link
        href={checkoutHref}
        className={
          isElite
            ? 'btn-brand mt-3 inline-flex h-[40px] w-[139px] items-center justify-around gap-2 rounded-lg px-4 text-[12px] font-medium leading-[18px] text-white shadow-none'
            : 'btn-brand-outline btn-brand-outline--flat mt-3 inline-flex h-[40px] w-[139px] items-center justify-around gap-2 rounded-lg bg-white px-4 text-[12px] font-medium leading-[18px]'
        }
      >
        {plan.btnName ?? 'Enroll Now'}
        <ArrowRightIcon className={`btn-arrow-icon shrink-0 ${isElite ? 'text-white' : 'text-brand'}`} />
      </Link>
    </div>
  );
}

function featureValue(feature: ApiCoursePlanFeature, planNum: number): boolean {
  const key = `plan${planNum}` as keyof ApiCoursePlanFeature;
  return Boolean(feature[key]);
}

function parsePrice(value: string | null | undefined): number | null {
  if (value == null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export type BatchPrices = {
  plan1RetailPrice: string | null;
  plan1SellingPrice: string | null;
  plan2RetailPrice: string | null;
  plan2SellingPrice: string | null;
  plan3RetailPrice: string | null;
  plan3SellingPrice: string | null;
};

function planPricesForNumber(
  batch: BatchPrices,
  planNumber: number,
): { retail: number | null; selling: number | null } {
  const retail =
    planNumber === 1
      ? parsePrice(batch.plan1RetailPrice)
      : planNumber === 2
        ? parsePrice(batch.plan2RetailPrice)
        : parsePrice(batch.plan3RetailPrice);
  const selling =
    planNumber === 1
      ? parsePrice(batch.plan1SellingPrice)
      : planNumber === 2
        ? parsePrice(batch.plan2SellingPrice)
        : parsePrice(batch.plan3SellingPrice);
  return { retail, selling };
}

function resolvePlanPrices(
  batch: BatchPrices,
  planNumber: number,
  fallbackBatch?: BatchPrices | null,
): { retailPrice: number; sellingPrice: number } | null {
  let { retail, selling } = planPricesForNumber(batch, planNumber);

  if (selling == null && fallbackBatch) {
    const fallback = planPricesForNumber(fallbackBatch, planNumber);
    retail = retail ?? fallback.retail;
    selling = fallback.selling;
  }

  if (selling == null) return null;

  const retailPrice = retail ?? selling;
  return { retailPrice, sellingPrice: selling };
}

export function buildActivePlans(
  plans: ApiCoursePlan[],
  batch: BatchPrices,
  quantity: number,
  fallbackBatch?: BatchPrices | null,
): ActivePlanInfo[] {
  const activePlans: ActivePlanInfo[] = [];

  for (const plan of [...plans].sort((a, b) => a.planNumber - b.planNumber)) {
    const prices = resolvePlanPrices(batch, plan.planNumber, fallbackBatch);
    if (!prices) continue;
    activePlans.push({
      plan,
      retailPrice: prices.retailPrice * quantity,
      sellingPrice: prices.sellingPrice * quantity,
    });
  }

  return activePlans;
}

export default function CoursePlanComparisonSection({
  plans,
  features,
  batch,
  courseId = null,
  quantity = 1,
  fallbackBatch = null,
}: {
  plans: ApiCoursePlan[];
  features: ApiCoursePlanFeature[];
  batch: ApiCoursePlanBatch | null | undefined;
  courseId?: string | null;
  /** Seat count from the schedule card's quantity stepper — scales every plan's price. */
  quantity?: number;
  /** Reference batch from /plans when the selected schedule batch lacks plan2/plan3 prices. */
  fallbackBatch?: ApiCoursePlanBatch | null;
}) {
  if (!batch) return null;

  const s = COURSE_PLAN_COMPARISON_STATIC;

  const activePlans = buildActivePlans(plans, batch, quantity, fallbackBatch);

  if (activePlans.length < 1) return null;

  const basePlan = activePlans[0];
  const elitePlan = activePlans.length > 1 ? activePlans[activePlans.length - 1] : null;
  const extraAmount = elitePlan ? elitePlan.sellingPrice - basePlan.sellingPrice : 0;
  const titleLine1 = elitePlan
    ? `Upgrade to ${elitePlan.plan.name} Plan by just`
    : `${basePlan.plan.name} Plan`;

  const gridCols = activePlans.length === 1
    ? 'grid-cols-[minmax(0,1fr)_287px]'
    : activePlans.length === 2
      ? 'grid-cols-[minmax(0,1fr)_260px_287px]'
      : 'grid-cols-[minmax(0,1fr)_260px_287px_287px]';

  const scrollFeatures = features.length > 8;

  return (
    <div className={`${SECTION_CARD} overflow-hidden`}>
      <div className="overflow-x-auto">
        <div className={`min-w-[600px]`}>
          {/* Header: title + plan cards + column labels — never scrolls */}
          <div className={`grid ${gridCols}`}>
            {/* Title cell */}
            <div className="self-start px-6 py-5 md:px-8 md:py-6">
              <h2 className="max-w-[348px] text-[20px] font-semibold leading-[140%] text-heading">
                <span className="block">{titleLine1}</span>
                {elitePlan ? (
                  <span className="block">
                    paying{' '}
                    <span className="text-[#FD022D]">
                      {batch.currencySymbol}{extraAmount.toLocaleString('en-IN')}
                    </span>{' '}
                    Extra
                  </span>
                ) : null}
              </h2>
              <p className="mt-2 max-w-[348px] text-[14px] font-normal leading-[140%] text-muted">
                {elitePlan
                  ? `Get ${basePlan.plan.name} plan and more powerful benefits with ${elitePlan.plan.name} Plan.`
                  : s.subtitle}
              </p>
            </div>

            {/* Plan card header cells */}
            {activePlans.map((planInfo, idx) => {
              const isElite = idx === activePlans.length - 1;
              return (
                <div
                  key={planInfo.plan.planNumber}
                  className={`flex items-end justify-center px-3 pb-0 pt-5 md:px-4 md:pt-6 ${isElite ? ELITE_COLUMN_BG : 'bg-white'}`}
                >
                  <PlanCard
                    planInfo={planInfo}
                    isElite={isElite}
                    currencySymbol={batch.currencySymbol}
                    batchId={batch.id}
                    courseId={courseId}
                  />
                </div>
              );
            })}

            {/* Column label row */}
            <div className="bg-white px-5 pb-3 pt-10 text-[16px] font-semibold leading-normal text-heading uppercase">
              {s.featuresColumnLabel}
            </div>
            {activePlans.map((planInfo, idx) => {
              const isElite = idx === activePlans.length - 1;
              return (
                <div
                  key={`label-${planInfo.plan.planNumber}`}
                  className={`px-3 pb-3 pt-10 text-center text-[16px] font-semibold leading-normal text-heading uppercase ${isElite ? ELITE_COLUMN_BG : 'bg-white'}`}
                >
                  {planInfo.plan.name.toUpperCase()}
                </div>
              );
            })}
          </div>

          {/* Feature rows — scrollable only when there are more than 8 */}
          <div className={scrollFeatures ? 'max-h-[480px] overflow-y-auto' : ''}>
            <div className={`grid ${gridCols}`}>
              {features.map((feature, index) => {
                const isLast = index === features.length - 1;
                return (
                  <React.Fragment key={feature.id}>
                    <p className="border-t border-[#EBEBEB] bg-white px-5 py-4 text-[14px] font-normal leading-normal text-heading">
                      {feature.title}
                    </p>
                    {activePlans.map((planInfo, idx) => {
                      const isElite = idx === activePlans.length - 1;
                      const included = featureValue(feature, planInfo.plan.planNumber);
                      return (
                        <div
                          key={`${feature.id}-plan${planInfo.plan.planNumber}`}
                          className={`flex items-center justify-center border-t border-[#EBEBEB] px-3 py-4 ${isElite ? ELITE_COLUMN_BG : 'bg-white'} ${isElite && isLast ? 'rounded-br-[20px]' : ''}`}
                        >
                          <FeatureStatusIcon included={included} />
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
