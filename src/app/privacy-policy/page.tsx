import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLegalPage } from '@/services/legalApi';
import LegalPageView from '@/components/legal/LegalPageView';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage('privacy-policy');
  return {
    title: page?.title ?? 'Privacy Policy',
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage('privacy-policy');
  if (!page) notFound();

  return (
    <LegalPageView
      title={page.title}
      content={page.content}
      updatedAt={page.updatedAt}
      breadcrumb="Privacy Policy"
    />
  );
}
