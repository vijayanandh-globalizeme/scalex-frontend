import { get } from '@/services/http';
import type { MegaMenuCategory } from '@/lib/allCoursesMegaMenu';

export type ReviewEntry = {
  rating: string;
  count: number;
};

export type LayoutSettings = {
  YOUTUBE?: string;
  CONTACT_EMAIL?: string;
  FACEBOOK?: string;
  CONTACT_PHONE_NO?: string;
  INSTAGRAM?: string;
  CONTACT_WHATSAPP_NO?: string;
  TWITTER?: string;
  CONTACT_ADDRESS?: string;
  LINKEDIN?: string;
  CONTACT_ADDRESS_STATE?: string;
  CONTACT_ADDRESS_COUNTRY?: string;
  CONTACT_ADDRESS_PINCODE?: string;
  TOTAL_LEARNERS?: string;
  GOOGLE_REVIEW?: ReviewEntry;
  FACEBOOK_REVIEW?: ReviewEntry;
  TRUST_PILOT_REVIEW?: ReviewEntry;
  SWTICH_UP_REVIEW?: ReviewEntry;
};

export type LayoutData = {
  categories: MegaMenuCategory[];
  settings: LayoutSettings;
};

type ApiCategory = {
  id: string;
  name: string;
  uri: string;
  courses: { id: string; name: string; uri: string; priority?: number }[];
};

type LayoutApiResponse = {
  success: boolean;
  data: {
    categories: ApiCategory[];
    settings: LayoutSettings;
  };
};

function toMegaMenuCategories(apiCategories: ApiCategory[]): MegaMenuCategory[] {
  return apiCategories.map((cat) => ({
    slug: cat.uri,
    label: cat.name,
    href: `/${cat.uri}`,
    courses: cat.courses.map((course) => ({
      label: course.name,
      href: `/${cat.uri}/${course.uri}`,
      priority: course.priority,
    })),
  }));
}

export async function fetchLayout(): Promise<LayoutData | null> {
  const json = await get<LayoutApiResponse>('layout');
  if (!json?.success) return null;
  return {
    categories: toMegaMenuCategories(json.data.categories ?? []),
    settings: json.data.settings ?? {},
  };
}
