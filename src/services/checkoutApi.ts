import { get, postWithErrors } from '@/services/http';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ApiCheckoutBatch = {
  id: string;
  courseId: string;
  countryId: string;
  countryCode: string;
  trainerId: string;
  availability: string;
  venue: string;
  noOfSessions: string;
  dayType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  label?: string | null;
  plan1RetailPrice: string | null;
  plan1SellingPrice: string | null;
  plan1HasEMI: boolean;
  plan1EMIMonthCount: number | null;
  plan2RetailPrice: string | null;
  plan2SellingPrice: string | null;
  plan3RetailPrice: string | null;
  plan3SellingPrice: string | null;
  isActive: boolean;
  course: {
    id: string;
    name: string;
    uri: string;
    shortName: string;
    category: { uri: string };
  };
  country: {
    id: string;
    name: string;
    isoCode: string;
    currency: string;
    currencySymbol: string;
    timezone: string;
    taxationName: string;
    taxationPercentage: string;
  };
  trainer: { id: string; name: string };
  plan: { plan1Name: string | null; plan2Name: string | null; plan3Name: string | null } | null;
};

export type ApiAvailableCoupon = {
  couponCode: string;
  discountType: 'FLAT' | 'PERCENTAGE';
  discountValue: number;
  expiredAt: string;
};

export type CouponValidateResult =
  | {
      success: true;
      couponId: string;
      couponCode: string;
      discountType: 'FLAT' | 'PERCENTAGE';
      discountValue: number;
      discountAmount: number;
    }
  | { success: false; message: string };

export type CheckoutSubmitPayload = {
  batchId: string;
  planNumber: number;
  quantity: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  designation: string;
  couponCode?: string;
};

export type CheckoutFieldErrors = Record<string, string>;

export type CheckoutSubmitResult =
  | { success: true }
  | { success: false; message: string; fieldErrors: CheckoutFieldErrors };

// ─────────────────────────────────────────────
// API calls
// ─────────────────────────────────────────────

type BatchApiResponse = { success: boolean; data: ApiCheckoutBatch };

/** GET /checkout/batch/:batchId */
export async function fetchCheckoutBatch(batchId: string): Promise<ApiCheckoutBatch | null> {
  const res = await get<BatchApiResponse>(`checkout/batch/${batchId}`, { revalidate: 0 });
  return res?.success ? res.data : null;
}

type CouponsApiResponse = { success: boolean; data: ApiAvailableCoupon[] };

/** GET /checkout/coupons?batchId=&planNumber= */
export async function fetchAvailableCoupons(batchId: string, planNumber: number): Promise<ApiAvailableCoupon[]> {
  const res = await get<CouponsApiResponse>(
    `checkout/coupons?batchId=${encodeURIComponent(batchId)}&planNumber=${planNumber}`,
    { revalidate: 0 },
  );
  return res?.success ? res.data : [];
}

type ValidateApiErrorItem = { field?: string; message: string };
type ValidateApiResponse = {
  success: boolean;
  message?: string;
  data?: {
    couponId: string;
    couponCode: string;
    discountType: 'FLAT' | 'PERCENTAGE';
    discountValue: number;
    discountAmount: number;
  };
  errors?: ValidateApiErrorItem[];
};

/** POST /checkout/coupon/validate */
export async function validateCoupon(payload: {
  couponCode: string;
  batchId: string;
  planNumber: number;
  quantity: number;
}): Promise<CouponValidateResult> {
  const { ok, data } = await postWithErrors<ValidateApiResponse>('checkout/coupon/validate', payload, { revalidate: 0 });

  if (ok && data?.success && data.data) {
    return { success: true, ...data.data };
  }

  return {
    success: false,
    message: data?.message || 'This coupon could not be applied.',
  };
}

type SubmitApiErrorItem = { field?: string; message: string };
type SubmitApiResponse = {
  success: boolean;
  message?: string;
  errors?: SubmitApiErrorItem[];
};

/** POST /checkout/submit */
export async function submitCheckout(payload: CheckoutSubmitPayload): Promise<CheckoutSubmitResult> {
  const { ok, data } = await postWithErrors<SubmitApiResponse>('checkout/submit', payload, { revalidate: 0 });

  if (ok && data?.success) return { success: true };

  const fieldErrors: CheckoutFieldErrors = {};
  for (const err of data?.errors ?? []) {
    if (err.field && err.message) fieldErrors[err.field] = err.message;
  }

  return {
    success: false,
    message: data?.message || 'Something went wrong. Please try again.',
    fieldErrors,
  };
}
