'use server';

import type { PaymentInitiateResult } from '@/services/checkoutApi';
import { payPaymentLink, type PaymentLinkPayPayload } from '@/services/paymentLinkApi';

/** Server action backing the /pay/[code] page's "Pay now" button. */
export async function payPaymentLinkAction(code: string, payload: PaymentLinkPayPayload): Promise<PaymentInitiateResult> {
  return payPaymentLink(code, payload);
}
