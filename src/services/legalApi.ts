import { get } from '@/services/http';

export type LegalPageType = 'PRIVACY_POLICY' | 'TERMS_AND_CONDITIONS' | 'REFUND_POLICY';

export type LegalPage = {
  id: string;
  type: LegalPageType;
  title: string;
  content: string;
  updatedAt: string;
};

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  const res = await get<{ success: boolean; data: LegalPage }>(`legal/${slug}`, {
    revalidate: 86400,
    tags: [`legal-${slug}`],
  });
  return res?.data ?? null;
}
