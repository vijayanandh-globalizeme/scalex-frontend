import type { Metadata } from 'next';
import { fetchCheckoutBatch } from '@/services/checkoutApi';
import CheckoutView from './components/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout',
};

interface Props {
  searchParams: Promise<{ batchId?: string; planNumber?: string; courseId?: string; quantity?: string }>;
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { batchId, planNumber, quantity } = await searchParams;

  if (!batchId || !planNumber) {
    return (
      <div className="site-container py-24 text-center">
        <h1 className="text-[28px] font-bold text-heading md:text-[34px]">Checkout</h1>
        <p className="mt-3 text-[15px] text-muted">We couldn&apos;t find the batch you were enrolling in. Please go back and try again.</p>
      </div>
    );
  }

  const batch = await fetchCheckoutBatch(batchId);

  if (!batch) {
    return (
      <div className="site-container py-24 text-center">
        <h1 className="text-[28px] font-bold text-heading md:text-[34px]">Checkout</h1>
        <p className="mt-3 text-[15px] text-muted">This batch is no longer available.</p>
      </div>
    );
  }

  return (
    <CheckoutView
      batch={batch}
      planNumber={Number(planNumber)}
      initialQuantity={quantity ? Math.max(1, Number(quantity)) : 1}
    />
  );
}
