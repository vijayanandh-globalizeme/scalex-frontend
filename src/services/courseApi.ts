import { get } from '@/services/http';

// ── Course Overview (single-course page) ──────────────────────────────────────

export type ApiCourseFile = {
  id: string;
  url: string;
  extension: string;
};

export type ApiCourseOverview = {
  id: string;
  name: string;
  duration: string | null;
  categoryName: string;
  hasBootcamp: boolean;
  isBestSeller: boolean;
  rankedContent: string | null;
  shortName: string;
  title: string;
  startedAt: string | null;
  totalEnroll: string | null;
  details: {
    reviewSchemaName: string | null;
    reviewSchemaMessage: string | null;
    reviewSchemaRating: string | null;
    reviewSchemaPrice: string | null;
    faqSchema: string | null;
    aboutContent: string;
    courseContentTitle: string;
    careerTitle: string;
    scheduleTitle: string;
    trainerTitle: string;
    reviewsTitle: string;
    faqTitle: string;
    aboutTitle: string;
    courseVideoUrl: string | null;
    introduction: string;
    syllabus: ApiCourseFile | null;
    brochure: ApiCourseFile | null;
  } | null;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  } | null;
};

type CourseOverviewApiResponse = {
  success: boolean;
  data: ApiCourseOverview;
};

export async function fetchCourseOverview(
  courseUri: string,
  categoryUri: string,
): Promise<ApiCourseOverview | null> {
  const params = new URLSearchParams({ categoryUri });
  const json = await get<CourseOverviewApiResponse>(
    `course/${courseUri}?${params.toString()}`,
    { revalidate: 300, tags: [`course-${courseUri}`] },
  );
  return json?.success ? (json.data ?? null) : null;
}

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
