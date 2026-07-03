import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default function CheckoutPage() {
  return (
    <div className="site-container py-24 text-center">
      <h1 className="text-[28px] font-bold text-heading md:text-[34px]">Checkout</h1>
      <p className="mt-3 text-[15px] text-muted">This page is coming soon.</p>
    </div>
  );
}
