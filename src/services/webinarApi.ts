import { get } from '@/services/http';

interface WebinarApiItem {
  id: string;
  title: string;
  startedAt: string;
  learnersLabel: string;
  trainer?: { name?: string; profileImage?: { url?: string } };
  featureImage?: { url?: string };
  course?: { id?: string; uri?: string; categoryUri?: string };
}

interface WebinarApiResponse {
  success: boolean;
  data?: {
    data?: WebinarApiItem[];
    total?: number;
    limit?: number;
    offset?: number;
  };
}

export interface Webinar {
  id: string;
  title: string;
  startedAt: string;
  learnersLabel: string;
  trainerName: string;
  imageUrl: string;
  slug: string;
  courseId: string | null;
}

export async function fetchWebinars(limit = 10): Promise<Webinar[]> {
  const json = await get<WebinarApiResponse>(`webinar?limit=${limit}&offset=0`);
  if (!json?.success) return [];
  return (json.data?.data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    startedAt: item.startedAt,
    learnersLabel: item.learnersLabel,
    trainerName: item.trainer?.name ?? '',
    imageUrl: item.featureImage?.url ?? '',
    slug: item.course ? `${item.course.categoryUri}/${item.course.uri}` : '',
    courseId: item.course?.id ?? null,
  }));
}
