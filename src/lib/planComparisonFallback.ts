import { getCourseBodyBySlug, type CoursePlanComparisonContent } from '@/lib/courseBody';
import type { ApiCoursePlansData } from '@/services/courseApi';

function stripPlanSuffix(name: string) {
  return name.replace(/\s+Plan$/i, '');
}

export function buildPlansDataFromStatic(
  content: CoursePlanComparisonContent,
  batchId = 'static-batch',
): ApiCoursePlansData {
  return {
    moneyBack: true,
    plans: [
      {
        planNumber: 1,
        name: stripPlanSuffix(content.standardPlan.name),
        btnName: content.standardPlan.enrollLabel,
        tagline: null,
        isTrending: false,
        moneyBack: true,
      },
      {
        planNumber: 2,
        name: stripPlanSuffix(content.elitePlan.name),
        btnName: content.elitePlan.enrollLabel,
        tagline: null,
        isTrending: content.elitePlan.highlighted ?? true,
        moneyBack: true,
      },
    ],
    features: content.features.map((feature, index) => ({
      id: feature.id,
      title: feature.label,
      priority: index,
      plan1: feature.standard,
      plan2: feature.elite,
      plan3: false,
    })),
    batch: {
      id: batchId,
      startDate: '',
      noOfSessions: '',
      currency: 'INR',
      currencySymbol: '₹',
      plan1RetailPrice: String(content.standardPlan.originalPrice),
      plan1SellingPrice: String(content.standardPlan.price),
      plan1HasEMI: false,
      plan1EMIMonthCount: null,
      plan2RetailPrice: String(content.elitePlan.originalPrice),
      plan2SellingPrice: String(content.elitePlan.price),
      plan3RetailPrice: null,
      plan3SellingPrice: null,
    },
  };
}

type PriceSource = {
  id?: string;
  currency?: string;
  currencySymbol?: string;
  plan1RetailPrice?: string | null;
  plan1SellingPrice?: string | null;
  plan1HasEMI?: boolean;
  plan1EMIMonthCount?: number | null;
  plan2RetailPrice?: string | null;
  plan2SellingPrice?: string | null;
  plan3RetailPrice?: string | null;
  plan3SellingPrice?: string | null;
};

export type PlansDataSource = 'api' | 'static-fallback' | 'none';

export type ResolvedPlansData = {
  data: ApiCoursePlansData | null;
  source: PlansDataSource;
};

function createBatchFromSchedule(source: PriceSource): NonNullable<ApiCoursePlansData['batch']> {
  return {
    id: source.id ?? 'schedule-batch',
    startDate: '',
    noOfSessions: '',
    currency: source.currency ?? 'INR',
    currencySymbol: source.currencySymbol ?? '₹',
    plan1RetailPrice: source.plan1RetailPrice ?? null,
    plan1SellingPrice: source.plan1SellingPrice ?? null,
    plan1HasEMI: source.plan1HasEMI ?? false,
    plan1EMIMonthCount: source.plan1EMIMonthCount ?? null,
    plan2RetailPrice: source.plan2RetailPrice ?? null,
    plan2SellingPrice: source.plan2SellingPrice ?? null,
    plan3RetailPrice: source.plan3RetailPrice ?? null,
    plan3SellingPrice: source.plan3SellingPrice ?? null,
  };
}

function overlayBatchPrices(target: ApiCoursePlansData, source: PriceSource): ApiCoursePlansData {
  const baseBatch = target.batch ?? createBatchFromSchedule(source);

  return {
    ...target,
    batch: {
      ...baseBatch,
      id: source.id ?? baseBatch.id,
      currency: source.currency ?? baseBatch.currency,
      currencySymbol: source.currencySymbol ?? baseBatch.currencySymbol,
      plan1RetailPrice: source.plan1RetailPrice ?? baseBatch.plan1RetailPrice,
      plan1SellingPrice: source.plan1SellingPrice ?? baseBatch.plan1SellingPrice,
      plan1HasEMI: source.plan1HasEMI ?? baseBatch.plan1HasEMI,
      plan1EMIMonthCount: source.plan1EMIMonthCount ?? baseBatch.plan1EMIMonthCount,
      plan2RetailPrice: source.plan2RetailPrice ?? baseBatch.plan2RetailPrice,
      plan2SellingPrice: source.plan2SellingPrice ?? baseBatch.plan2SellingPrice,
      plan3RetailPrice: source.plan3RetailPrice ?? baseBatch.plan3RetailPrice,
      plan3SellingPrice: source.plan3SellingPrice ?? baseBatch.plan3SellingPrice,
    },
  };
}

/** Use API plans when complete; otherwise fall back to CSM static comparison content. */
export function resolvePlansDataForCourse(
  apiData: ApiCoursePlansData | null,
  courseUri: string,
  categoryUri: string,
  scheduleBatch?: PriceSource | null,
): ResolvedPlansData {
  if (apiData?.plans?.length >= 2) {
    if (scheduleBatch) {
      return { data: overlayBatchPrices(apiData, scheduleBatch), source: 'api' };
    }
    return { data: apiData, source: 'api' };
  }

  if (courseUri !== 'certified-scrum-master' || categoryUri !== 'agile-and-scrum') {
    return { data: apiData, source: apiData ? 'api' : 'none' };
  }

  const staticContent = getCourseBodyBySlug('certified-scrum-master')?.planComparison;
  if (!staticContent) return { data: apiData, source: apiData ? 'api' : 'none' };

  let resolved = buildPlansDataFromStatic(staticContent, scheduleBatch?.id ?? apiData?.batch?.id ?? 'static-batch');
  if (scheduleBatch) resolved = overlayBatchPrices(resolved, scheduleBatch);
  else if (apiData?.batch) resolved = overlayBatchPrices(resolved, apiData.batch);

  return { data: resolved, source: 'static-fallback' };
}
