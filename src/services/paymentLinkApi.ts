import { get, postWithErrors } from '@/services/http';
import type { CheckoutFieldErrors, PaymentInitiateResult } from '@/services/checkoutApi';

export type PaymentLinkStatus = 'ACTIVE' | 'EXPIRED' | 'PAID' | 'REVOKED';
export type PaymentLinkType = 'FULL' | 'TOKEN' | 'REMAINING';

export type ApiPaymentLink = {
  code: string;
  status: PaymentLinkStatus;
  courseName: string;
  planName: string | null;
  paymentType: PaymentLinkType;
  payerEmail: string;
  currency: string;
  taxName: string | null;
  taxPercentage: string;
  expiresAt: string;
  paidOrderNo: string | null;
  amount: { base: number; tax: number; total: number };
  course: { uri: string; category: { uri: string } } | null;
  country: { name: string } | null;
  batch: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    dayType: string;
    trainer: { name: string } | null;
  } | null;
};

export type PaymentLinkPayPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  companyName?: string;
  designation?: string;
};

type LinkApiResponse = { success: boolean; data: ApiPaymentLink };

/** GET /payment-link/:code — counts the visit, so never cached. */
export async function fetchPaymentLink(code: string): Promise<ApiPaymentLink | null> {
  const res = await get<LinkApiResponse>(`payment-link/${encodeURIComponent(code)}`, { revalidate: 0 });
  return res?.success ? res.data : null;
}

type PayApiResponse = {
  success: boolean;
  message?: string;
  data?: { orderId: string; txnToken: string; mid: string; amount: number; actionUrl: string };
  errors?: { field?: string; message: string }[];
};

/** POST /payment-link/:code/pay — same result shape as the checkout initiate. */
export async function payPaymentLink(code: string, payload: PaymentLinkPayPayload): Promise<PaymentInitiateResult> {
  const { ok, data } = await postWithErrors<PayApiResponse>(`payment-link/${encodeURIComponent(code)}/pay`, payload, {
    revalidate: 0,
  });

  if (ok && data?.success && data.data) {
    return { success: true, ...data.data };
  }

  const fieldErrors: CheckoutFieldErrors = {};
  for (const err of data?.errors ?? []) {
    if (err.field && err.message) fieldErrors[err.field] = err.message;
  }

  return {
    success: false,
    message: data?.message || 'Could not start payment. Please try again.',
    fieldErrors,
  };
}
