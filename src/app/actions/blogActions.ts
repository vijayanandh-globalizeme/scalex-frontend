'use server';

import { get } from '@/services/http';

export type ApiBlog = {
  id: string;
  title: string;
  shortDescription: string;
  uri: string;
  createdAt: string;
  featureImage: { id: string; url: string; extension: string } | null;
  trainer: { id: string; name: string } | null;
};

type BlogsApiResponse = {
  success: boolean;
  data: {
    items: ApiBlog[];
    total: number;
    limit: number;
    offset: number;
  };
};

export async function getBlogs(options: { limit?: number; offset?: number; categoryId?: string } = {}): Promise<{ items: ApiBlog[]; total: number }> {
  const { limit = 6, offset = 0, categoryId } = options;
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('offset', String(offset));
  if (categoryId) params.set('courseCategoryId', categoryId);

  const json = await get<BlogsApiResponse>(`blogs?${params.toString()}`, { revalidate: 0 });
  if (!json?.success) return { items: [], total: 0 };
  return { items: json.data.items ?? [], total: json.data.total ?? 0 };
}
