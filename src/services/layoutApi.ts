import { cache } from 'react';
import { get } from '@/services/http';
import type { MegaMenuCategory } from '@/lib/allCoursesMegaMenu';

export type ReviewEntry = {
  rating: string;
  count: number;
  url?: string;
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

export type OtherMenuItem = {
  label: string;
  href: string;
};

export type OtherMenu = {
  title: string;
  items: OtherMenuItem[];
};

export type FooterMenu = {
  categories: { label: string; href: string }[];
  courses: { label: string; href: string }[];
};

export type LayoutData = {
  megaMenu: MegaMenuCategory[];
  otherMenus: OtherMenu[];
  footer: FooterMenu;
  settings: LayoutSettings;
};

type ApiCategory = {
  id: string;
  name: string;
  uri: string;
  courses: { id: string; name: string; uri: string; priority?: number }[];
};

type ApiOtherMenu = {
  title: string;
  items: { label: string; url: string }[];
};

type ApiFooterMenu = {
  categories: { id: string; name: string; uri: string }[];
  courses: { id: string; name: string; uri: string; categoryUri: string }[];
};

type LayoutApiResponse = {
  success: boolean;
  data: {
    megaMenu: ApiCategory[];
    otherMenus: ApiOtherMenu[];
    footer: ApiFooterMenu;
    settings: LayoutSettings;
  };
};

type SettingsApiResponse = {
  success: boolean;
  data: LayoutSettings;
};

function toMegaMenuCategories(apiCategories: ApiCategory[]): MegaMenuCategory[] {
  return apiCategories.map((cat) => ({
    id:    cat.id,
    slug:  cat.uri,
    label: cat.name,
    href:  `/${cat.uri}`,
    courses: cat.courses.map((course) => ({
      label:    course.name,
      href:     `/${cat.uri}/${course.uri}`,
      priority: course.priority,
    })),
  }));
}

function toOtherMenus(apiOtherMenus: ApiOtherMenu[]): OtherMenu[] {
  return apiOtherMenus.map((menu) => ({
    title: menu.title,
    items: menu.items.map((item) => ({ label: item.label, href: item.url })),
  }));
}

function toFooterMenu(apiFooter: ApiFooterMenu | undefined): FooterMenu {
  return {
    categories: (apiFooter?.categories ?? []).map((cat) => ({ label: cat.name, href: `/${cat.uri}` })),
    courses: (apiFooter?.courses ?? []).map((course) => ({
      label: course.name,
      href: `/${course.categoryUri}/${course.uri}`,
    })),
  };
}

export const fetchLayout = cache(async (): Promise<LayoutData | null> => {
  const json = await get<LayoutApiResponse>('layout');
  if (!json?.success) return null;
  return {
    megaMenu: toMegaMenuCategories(json.data.megaMenu ?? []),
    otherMenus: toOtherMenus(json.data.otherMenus ?? []),
    footer: toFooterMenu(json.data.footer),
    settings: json.data.settings ?? {},
  };
});

export const fetchSetting = cache(async (): Promise<LayoutSettings | null> => {
  const json = await get<SettingsApiResponse>('layout/settings');
  if (!json?.success) return null;
  return json.data ?? {};
});
