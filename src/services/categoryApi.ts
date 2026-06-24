import { get } from '@/services/http';

export type ApiCategoryDetail = {
  id: string;
  name: string;
  uri: string;
  learnerCount: string;
  priority: number;
  description: string;
  highlights: string;
  posterImage: { id: string; url: string; extension: string } | null;
  seo: { metaTitle: string; metaDescription: string; metaKeywords: string } | null;
};

export type ApiCategoryItem = {
  id: string;
  name: string;
  uri: string;
  icon: string;
};

type CategoryDetailResponse = { success: boolean; data: ApiCategoryDetail };
type CategoryListResponse   = { success: boolean; data: ApiCategoryItem[] };

export async function fetchCategoryByUri(uri: string): Promise<ApiCategoryDetail | null> {
  const json = await get<CategoryDetailResponse>(`course-categories/${uri}`, { revalidate: 300 });
  return json?.success ? json.data : null;
}

export async function fetchAllCategories(): Promise<ApiCategoryItem[]> {
  const json = await get<CategoryListResponse>('course-categories', { revalidate: 300 });
  return json?.success ? (json.data ?? []) : [];
}
