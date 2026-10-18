'use server';

import {
  fetchAvailableCoupons,
  validateCoupon,
  initiatePayment,
  type ApiAvailableCoupon,
  type CouponValidateResult,
  type PaymentInitiatePayload,
  type PaymentInitiateResult,
} from '@/services/checkoutApi';

/**
 * Server actions backing the checkout page's client-side interactivity
 * (initial batch fetch happens directly in the server-component page).
 * (Import the payload/result types directly from '@/services/checkoutApi'
 * where needed — a 'use server' module may only export async functions.)
 */

export async function getAvailableCoupons(batchId: string, planNumber: number): Promise<ApiAvailableCoupon[]> {
  return fetchAvailableCoupons(batchId, planNumber);
}

export async function applyCoupon(payload: {
  couponCode: string;
  batchId: string;
  planNumber: number;
  quantity: number;
}): Promise<CouponValidateResult> {
  return validateCoupon(payload);
}

export async function initiatePaymentAction(payload: PaymentInitiatePayload): Promise<PaymentInitiateResult> {
  return initiatePayment(payload);
}
