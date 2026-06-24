'use server';

import { get, getApiUrl } from '@/services/http';
import type { ApiCourse } from '@/services/courseApi';

type CoursesApiResponse = {
  success: boolean;
  data: {
    items: ApiCourse[];
    limit: number;
    offset: number;
  };
};

export async function getCourses(options: {
  categoryId?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<ApiCourse[]> {
  const { categoryId, limit = 12, offset = 0 } = options;

  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('offset', String(offset));
  if (categoryId) params.set('categoryId', categoryId);

  const url = `courses?${params.toString()}`;
  const json = await get<CoursesApiResponse>(url, { revalidate: 0 });
  return json?.success ? (json.data.items ?? []) : [];
}
