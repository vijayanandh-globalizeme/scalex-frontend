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
  templateType: 'BASIC' | 'TECHNICAL' | 'BOOTCAMP' | null;
  isBestSeller: boolean;
  rankedContent: string | null;
  shortName: string;
  title: string;
  startedAt: string | null;
  totalEnroll: string | null;
  shortDescription: string | null;
  /** BASIC → single "Training partner" logo; TECHNICAL/BOOTCAMP → up to 2 "Collaboration with" logos. */
  companyLogos: ApiCourseFile[];
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
    relatedCourseTitle?: string | null;
    relatedCoursesTitle?: string | null;
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
  options?: { countryUri?: string; cityUri?: string },
): Promise<ApiCourseOverview | null> {
  const params = new URLSearchParams({ categoryUri });
  if (options?.countryUri) params.set('countryUri', options.countryUri);
  if (options?.cityUri) params.set('cityUri', options.cityUri);
  const json = await get<CourseOverviewApiResponse>(
    `course/${courseUri}?${params.toString()}`,
    { revalidate: 300, tags: [`course-${courseUri}`] },
  );
  return json?.success ? (json.data ?? null) : null;
}

// ── Course Details (full body) ────────────────────────────────────────────────

export type ApiCourseOverviewSection = {
  title: string;
  description: string;
  skillRequirements: string | null;
  features: { title: string; content: string }[];
  guide: ApiCourseFile | null;
};

export type ApiOtherDetail = {
  id: string;
  title: string;
  type: string;
  percentage: number;
  entityId: string;
  file: ApiCourseFile | null;
};

export type ApiRoadmapQuestion = {
  icon: string;
  title: string;
  content: string;
};

export type ApiRoadmap = {
  id: string;
  type: number;
  icon: string;
  title: string;
  description: string;
  sideTitle: string;
  sideDescription: string;
  heading: string;
  content: string | null;
  questions: ApiRoadmapQuestion[] | null;
};

export type ApiCourseDetails = {
  overview: ApiCourseOverviewSection;
  courseContent: { id: string; title: string; content: string; priority: number; category: null | { id: string; name: string } }[];
  courseFaq: { categoryId: string; categoryName: string; items: { id: string; title: string; content: string; priority: number }[] }[];
  credentials: { title: string; description: string } | null;
  eligibility: {
    title: string;
    description: string;
    requirements: { icon: string; title: string; content: string }[];
    subTitle: string;
    subContent: string;
    certificationImage: ApiCourseFile | null;
  } | null;
  skillsTools: { title: string; description: string; skill: string } | null;
  roadmaps: ApiRoadmap[];
  otherDetails: ApiOtherDetail[];
};

type CourseDetailsApiResponse = {
  success: boolean;
  data: ApiCourseDetails;
};

export async function fetchCourseDetails(
  courseUri: string,
  categoryUri: string,
  options?: { countryUri?: string; cityUri?: string },
): Promise<ApiCourseDetails | null> {
  const params = new URLSearchParams({ categoryUri });
  if (options?.countryUri) params.set('countryUri', options.countryUri);
  if (options?.cityUri) params.set('cityUri', options.cityUri);
  const json = await get<CourseDetailsApiResponse>(
    `course/${courseUri}/details?${params.toString()}`,
    { revalidate: 300, tags: [`course-${courseUri}-details`] },
  );
  return json?.success ? (json.data ?? null) : null;
}

export type ApiLearner = {
  id: string;
  name: string;
  currentRole: string;
  prevRole: string;
  hike: string;
  review: string;
  avatar: ApiCourseFile | null;
  currentCompanyImage: ApiCourseFile | null;
  prevCompanyImage: ApiCourseFile | null;
};

type LearnersApiResponse = { success: boolean; data: { learners: ApiLearner[] } };

export async function fetchCourseLearners(
  courseUri: string,
  categoryUri: string,
  options?: { countryUri?: string; cityUri?: string },
): Promise<ApiLearner[]> {
  const params = new URLSearchParams({ categoryUri });
  if (options?.countryUri) params.set('countryUri', options.countryUri);
  if (options?.cityUri) params.set('cityUri', options.cityUri);
  const json = await get<LearnersApiResponse>(
    `course/${courseUri}/learners?${params.toString()}`,
    { revalidate: 300, tags: [`course-${courseUri}-learners`] },
  );
  return json?.success ? (json.data.learners ?? []) : [];
}

export type ApiTrainer = {
  id: string;
  name: string;
  role: string;
  experience: string;
  linkedInProfile: string;
  about: string;
  avatar: ApiCourseFile | null;
  assocWith: ApiCourseFile | null;
};

type TrainerApiResponse = { success: boolean; data: { trainers: ApiTrainer[] } };

export async function fetchCourseTrainers(
  courseUri: string,
  categoryUri: string,
): Promise<ApiTrainer[]> {
  const params = new URLSearchParams({ categoryUri });
  const json = await get<TrainerApiResponse>(
    `course/${courseUri}/trainer?${params.toString()}`,
    { revalidate: 300, tags: [`course-${courseUri}-trainers`] },
  );
  return json?.success ? (json.data.trainers ?? []) : [];
}

export type ApiReview = {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  type: string;
  reviewUrl: string;
  avatar: ApiCourseFile | null;
};

type ReviewsApiResponse = { success: boolean; data: { reviews: ApiReview[] } };

export async function fetchCourseReviews(
  courseUri: string,
  categoryUri: string,
): Promise<ApiReview[]> {
  const params = new URLSearchParams({ categoryUri });
  const json = await get<ReviewsApiResponse>(
    `course/${courseUri}/reviews?${params.toString()}`,
    { revalidate: 300, tags: [`course-${courseUri}-reviews`] },
  );
  return json?.success ? (json.data.reviews ?? []) : [];
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
  isBestSeller: boolean;
};

type CoursesApiResponse = {
  success: boolean;
  data: {
    items: ApiCourse[];
    limit: number;
    offset: number;
  };
};

// ── Course Batches (Schedules) ────────────────────────────────────────────────

export type ApiCourseBatch = {
  id: string;
  isTrending: boolean;
  availability: string;
  label?: string;
  dayType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  noOfSessions: string;
  venue: string;
  plan1RetailPrice: string | null;
  plan1SellingPrice: string | null;
  plan1HasEMI: boolean;
  plan1EMIMonthCount: number | null;
  plan2RetailPrice: string | null;
  plan2SellingPrice: string | null;
  plan3RetailPrice: string | null;
  plan3SellingPrice: string | null;
  trainerName: string;
  trainerAvatar?: ApiCourseFile | null;
  currency: string;
  currencySymbol: string;
  timezone: string;
};

export type CourseBatchFilter = {
  filter?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
};

export type CourseBatchesResult = {
  batches: ApiCourseBatch[];
  total: number;
  limit: number;
  offset: number;
};

type CourseBatchesApiResponse = { success: boolean; data: CourseBatchesResult };

export async function fetchCourseBatches(
  courseUri: string,
  categoryUri: string,
  batchFilter?: CourseBatchFilter,
): Promise<CourseBatchesResult> {
  const params = new URLSearchParams({ categoryUri });
  if (batchFilter?.filter) params.set('filter', batchFilter.filter);
  if (batchFilter?.dateFrom) params.set('dateFrom', batchFilter.dateFrom);
  if (batchFilter?.dateTo) params.set('dateTo', batchFilter.dateTo);
  if (batchFilter?.limit !== undefined) params.set('limit', String(batchFilter.limit));
  if (batchFilter?.offset !== undefined) params.set('offset', String(batchFilter.offset));
  const json = await get<CourseBatchesApiResponse>(
    `course/${courseUri}/batches?${params.toString()}`,
    { revalidate: 0 },
  );
  return json?.success ? json.data : { batches: [], total: 0, limit: 10, offset: 0 };
}

// ── Course Locations ──────────────────────────────────────────────────────────

export type ApiCourseLocation = {
  labelName: string;
  uri: string;
};

type CourseLocationsApiResponse = { success: boolean; data: { locations: ApiCourseLocation[] } };

export async function fetchCourseLocations(courseUri: string): Promise<ApiCourseLocation[]> {
  const json = await get<CourseLocationsApiResponse>(
    `course/${courseUri}/locations`,
    { revalidate: 300, tags: [`course-${courseUri}-locations`] },
  );
  return json?.success ? (json.data.locations ?? []) : [];
}

export async function fetchRelatedCourses(courseUri: string): Promise<ApiCourse[]> {
  const params = new URLSearchParams({ courseUri, limit: '12', offset: '0' });
  const json = await get<CoursesApiResponse>(`course/fetch?${params.toString()}`, {
    revalidate: 300,
    tags: [`course-${courseUri}-related`],
  });
  return json?.success ? (json.data.items ?? []) : [];
}

export async function fetchCourses(options: { categoryId?: string; categoryIds?: string[]; limit?: number; offset?: number } = {}): Promise<ApiCourse[]> {
  const { categoryId, categoryIds, limit = 12, offset = 0 } = options;
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('offset', String(offset));
  if (categoryIds && categoryIds.length > 0) {
    categoryIds.forEach((id) => params.append('categoryIds', id));
  } else if (categoryId) {
    params.set('categoryId', categoryId);
  }

  const json = await get<CoursesApiResponse>(`courses?${params.toString()}`, { revalidate: 0 });
  return json?.success ? (json.data.items ?? []) : [];
}

// ── Course Search (header type-ahead) ───────────────────────────────────────

export type ApiCourseSearchItem = {
  name: string;
  courseUri: string;
  categoryUri: string;
};

type CourseSearchApiResponse = { success: boolean; data: ApiCourseSearchItem[] };

export async function searchCourses(q: string): Promise<ApiCourseSearchItem[]> {
  const params = new URLSearchParams({ q });
  const json = await get<CourseSearchApiResponse>(`course/search?${params.toString()}`, { revalidate: 0 });
  return json?.success ? (json.data ?? []) : [];
}

// ── Course Plans ──────────────────────────────────────────────────────────────

export type ApiCoursePlan = {
  planNumber: number;
  name: string;
  btnName: string | null;
  tagline: string | null;
  isTrending: boolean;
  moneyBack: boolean;
};

export type ApiCoursePlanFeature = {
  id: string;
  title: string;
  priority: number;
  plan1: boolean;
  plan2: boolean;
  plan3: boolean;
};

export type ApiCoursePlanBatch = {
  id: string;
  startDate: string;
  noOfSessions: string;
  currency: string;
  currencySymbol: string;
  plan1RetailPrice: string | null;
  plan1SellingPrice: string | null;
  plan1HasEMI: boolean;
  plan1EMIMonthCount: number | null;
  plan2RetailPrice: string | null;
  plan2SellingPrice: string | null;
  plan3RetailPrice: string | null;
  plan3SellingPrice: string | null;
};

export type ApiCoursePlansData = {
  moneyBack: boolean;
  plans: ApiCoursePlan[];
  features: ApiCoursePlanFeature[];
  batch?: ApiCoursePlanBatch | null;
};

type CoursePlansApiResponse = { success: boolean; data: ApiCoursePlansData };

export async function fetchCoursePlans(
  courseUri: string,
  categoryUri: string,
  options?: { countryUri?: string; cityUri?: string },
): Promise<ApiCoursePlansData | null> {
  const params = new URLSearchParams({ categoryUri });
  if (options?.countryUri) params.set('countryUri', options.countryUri);
  if (options?.cityUri) params.set('cityUri', options.cityUri);
  const json = await get<CoursePlansApiResponse>(
    `course/${courseUri}/plans?${params.toString()}`,
    { revalidate: 300, tags: [`course-${courseUri}-plans`] },
  );
  return json?.success ? (json.data ?? null) : null;
}

// ── Sitemap (every publicly-visible course, incl. country/city clones) ────────

export type ApiSitemapCourse = {
  uri: string;
  categoryUri: string;
  updatedAt: string;
};

type SitemapCoursesApiResponse = { success: boolean; data: ApiSitemapCourse[] };

export async function fetchSitemapCourses(): Promise<ApiSitemapCourse[]> {
  const json = await get<SitemapCoursesApiResponse>('courses/sitemap', { revalidate: 3600 });
  return json?.success ? (json.data ?? []) : [];
}
