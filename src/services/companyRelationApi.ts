import { cache } from 'react';
import { get } from '@/services/http';
import type { LogoMarqueeItem } from '@/components/shared/LogoMarquee';

export type CompanyRelationType = 'COLLABORATE' | 'HIRING' | 'ENTERPRISE';

type ApiCompanyLogo = { id: string; url: string };

type GroupedApiResponse = {
  success: boolean;
  data?: Record<CompanyRelationType, ApiCompanyLogo[]>;
};

export type GroupedCompanyLogos = Record<CompanyRelationType, LogoMarqueeItem[]>;

function toLogoItems(logos: ApiCompanyLogo[] | undefined): LogoMarqueeItem[] {
  return (logos ?? []).map((logo) => ({ id: logo.id, src: logo.url, alt: 'Company logo' }));
}

export const fetchCompanyLogos = cache(async (): Promise<GroupedCompanyLogos> => {
  const json = await get<GroupedApiResponse>('company-relation', {
    revalidate: 300,
    tags: ['company-relations'],
  });

  return {
    COLLABORATE: toLogoItems(json?.data?.COLLABORATE),
    HIRING: toLogoItems(json?.data?.HIRING),
    ENTERPRISE: toLogoItems(json?.data?.ENTERPRISE),
  };
});
