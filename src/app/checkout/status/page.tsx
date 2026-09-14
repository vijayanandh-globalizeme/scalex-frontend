import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchOrderStatus } from '@/services/checkoutApi';

export const metadata: Metadata = {
  title: 'Payment Status',
};

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutStatusPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  // The status shown here is always re-fetched from our own database, never
  // trusted off the URL — the query string only carries the orderId to look up.
  const order = orderId ? await fetchOrderStatus(orderId) : null;

  if (!order) {
    return (
      <div className="site-container py-24 text-center">
        <h1 className="text-[28px] font-bold text-heading md:text-[34px]">Payment Status</h1>
        <p className="mt-3 text-[15px] text-muted">We couldn&apos;t find that order.</p>
      </div>
    );
  }

  const courseHref = `/${order.batch.course.category.uri}/${order.batch.course.uri}`;

  if (order.status === 'SUCCESS') {
    return (
      <div className="site-container flex flex-col items-center py-24 text-center">
        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E7F8EF]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <h1 className="mt-5 text-[24px] font-extrabold text-heading">Payment Successful!</h1>
        <p className="mt-2 max-w-[420px] text-[14px] leading-relaxed text-muted">
          Thanks for enrolling in {order.batch.course.name}. Our team will reach out with the next steps shortly.
        </p>
        <Link
          href={courseHref}
          className="btn-brand mt-6 inline-flex h-11 items-center justify-center rounded-lg px-6 text-[14px] font-semibold"
        >
          Back to course
        </Link>
      </div>
    );
  }

  if (order.status === 'PENDING') {
    return (
      <div className="site-container py-24 text-center">
        <h1 className="text-[24px] font-extrabold text-heading">Payment pending</h1>
        <p className="mt-3 text-[15px] text-muted">
          We&apos;re still confirming your payment with Paytm. This page will update once it&apos;s done — you can
          safely refresh in a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="site-container flex flex-col items-center py-24 text-center">
      <h1 className="text-[24px] font-extrabold text-heading">Payment failed</h1>
      <p className="mt-3 max-w-[420px] text-[14px] leading-relaxed text-muted">
        Your payment for {order.batch.course.name} couldn&apos;t be completed. No amount has been charged. Please try
        again.
      </p>
      <Link
        href={courseHref}
        className="btn-brand mt-6 inline-flex h-11 items-center justify-center rounded-lg px-6 text-[14px] font-semibold"
      >
        Back to course
      </Link>
    </div>
  );
}
