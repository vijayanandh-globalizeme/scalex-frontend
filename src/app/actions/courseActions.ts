'use server';

export type { ApiCourse, ApiCourseOverview, ApiCourseDetails, ApiTrainer, ApiReview, ApiLearner, ApiCoursePlansData, ApiCourseBatch } from '@/services/courseApi';
import { fetchCourses, fetchRelatedCourses, fetchCourseLocations, fetchCourseOverview, fetchCourseDetails, fetchCourseTrainers, fetchCourseReviews, fetchCourseLearners, fetchCoursePlans, fetchCourseBatches } from '@/services/courseApi';

export async function getCourses(options: { categoryId?: string; limit?: number; offset?: number } = {}) {
  return fetchCourses(options);
}

export async function getCourseOverview(
  courseUri: string,
  categoryUri: string,
  options?: { countryUri?: string; cityUri?: string },
) {
  return fetchCourseOverview(courseUri, categoryUri, options);
}

export async function getCourseDetails(
  courseUri: string,
  categoryUri: string,
  options?: { countryUri?: string; cityUri?: string },
) {
  return fetchCourseDetails(courseUri, categoryUri, options);
}

export async function getCourseTrainers(courseUri: string, categoryUri: string) {
  return fetchCourseTrainers(courseUri, categoryUri);
}

export async function getCourseReviews(courseUri: string, categoryUri: string) {
  return fetchCourseReviews(courseUri, categoryUri);
}

export async function getCourseLearners(
  courseUri: string,
  categoryUri: string,
  options?: { countryUri?: string; cityUri?: string },
) {
  return fetchCourseLearners(courseUri, categoryUri, options);
}

export async function getCoursePlans(
  courseUri: string,
  categoryUri: string,
  options?: { countryUri?: string; cityUri?: string },
) {
  return fetchCoursePlans(courseUri, categoryUri, options);
}

export async function getRelatedCourses(courseUri: string) {
  return fetchRelatedCourses(courseUri);
}

export async function getCourseLocations(courseUri: string) {
  return fetchCourseLocations(courseUri);
}

export async function getCourseBatches(courseUri: string, categoryUri: string, filter?: string) {
  return fetchCourseBatches(courseUri, categoryUri, filter);
}
