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
): Promise<ApiCourseDetails | null> {
  const params = new URLSearchParams({ categoryUri });
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
): Promise<ApiLearner[]> {
  const params = new URLSearchParams({ categoryUri });
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
