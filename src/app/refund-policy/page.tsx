import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLegalPage } from '@/services/legalApi';
import LegalPageView from '@/components/legal/LegalPageView';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('refund-policy');
  return {
    title: page?.title ?? 'Refund Policy',
  };
}

export default async function RefundPolicyPage() {
  const page = await getLegalPage('refund-policy');
  if (!page) notFound();

  return (
    <LegalPageView
      title={page.title}
      content={page.content}
      updatedAt={page.updatedAt}
      breadcrumb="Refund Policy"
    />
  );
}
