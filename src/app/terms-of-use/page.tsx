import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLegalPage } from '@/services/legalApi';
import LegalPageView from '@/components/legal/LegalPageView';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('terms-and-conditions');
  return {
    title: page?.title ?? 'Terms of Use',
  };
}

export default async function TermsOfUsePage() {
  const page = await getLegalPage('terms-and-conditions');
  if (!page) notFound();

  return (
    <LegalPageView
      title={page.title}
      content={page.content}
      updatedAt={page.updatedAt}
      breadcrumb="Terms of Use"
    />
  );
}
