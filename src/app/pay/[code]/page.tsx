import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchPaymentLink } from '@/services/paymentLinkApi';
import PayLinkView from './PayLinkView';

export const metadata: Metadata = {
  title: 'Complete Your Payment',
  robots: { index: false, follow: false },
};

// Every visit is counted on the API, so this page must never be cached.
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ code: string }>;
}

function Message({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="site-container flex flex-col items-center py-24 text-center">
      <h1 className="text-[24px] font-extrabold text-heading md:text-[28px]">{title}</h1>
      <div className="mt-3 max-w-[460px] text-[15px] leading-relaxed text-muted">{body}</div>
      <Link href="/" className="btn-brand mt-6 inline-flex h-11 items-center justify-center rounded-lg px-6 text-[14px] font-semibold">
        Go to homepage
      </Link>
    </div>
  );
}

export default async function PayLinkPage({ params }: Props) {
  const { code } = await params;
  const link = await fetchPaymentLink(code);

  if (!link) {
    return <Message title="Invalid payment link" body="We couldn't find this payment link. Please check the link or contact us." />;
  }

  if (link.status === 'PAID') {
    return (
      <Message
        title="Already paid"
        body={
          <>
            This payment has already been completed{link.paidOrderNo ? <> (Order No <strong className="text-heading">{link.paidOrderNo}</strong>)</> : null}. Thank you!
          </>
        }
      />
    );
  }

  if (link.status === 'EXPIRED') {
    return <Message title="This link has expired" body="Please contact our team and we'll send you a new payment link." />;
  }

  if (link.status === 'REVOKED') {
    return <Message title="This link is no longer active" body="Please contact our team for help with your payment." />;
  }

  return <PayLinkView link={link} />;
}
