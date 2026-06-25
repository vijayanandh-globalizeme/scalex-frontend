import { get } from '@/services/http';

// Shared types for the courses API — used by both server actions and client components

export type ApiBatch = {
  id: string;
  startDate: string;
  plan1RetailPrice: string;
  plan1SellingPrice: string;
  noOfSessions: string;
};

export type ApiCourse = {
  id: string;
  name: string;
  uri: string;
  duration: string | null;
  totalEnroll: string | null;
  featureImage: { id: string; url: string; extension: string } | null;
  category: { id: string; name: string; uri: string };
  schemaRating: string | null;
  batch: ApiBatch | null;
};

type CoursesApiResponse = {
  success: boolean;
  data: {
    items: ApiCourse[];
    limit: number;
    offset: number;
  };
};

export async function fetchCourses(options: { categoryId?: string; limit?: number; offset?: number } = {}): Promise<ApiCourse[]> {
  const { categoryId, limit = 12, offset = 0 } = options;
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('offset', String(offset));
  if (categoryId) params.set('categoryId', categoryId);

  const json = await get<CoursesApiResponse>(`courses?${params.toString()}`, { revalidate: 0 });
  return json?.success ? (json.data.items ?? []) : [];
}
