'use server';

export type { ApiCourse, ApiCourseOverview, ApiCourseDetails, ApiTrainer, ApiReview, ApiLearner, ApiCoursePlansData } from '@/services/courseApi';
import { fetchCourses, fetchRelatedCourses, fetchCourseOverview, fetchCourseDetails, fetchCourseTrainers, fetchCourseReviews, fetchCourseLearners, fetchCoursePlans } from '@/services/courseApi';

export async function getCourses(options: { categoryId?: string; limit?: number; offset?: number } = {}) {
  return fetchCourses(options);
}

export async function getCourseOverview(courseUri: string, categoryUri: string) {
  return fetchCourseOverview(courseUri, categoryUri);
}

export async function getCourseDetails(courseUri: string, categoryUri: string) {
  return fetchCourseDetails(courseUri, categoryUri);
}

export async function getCourseTrainers(courseUri: string, categoryUri: string) {
  return fetchCourseTrainers(courseUri, categoryUri);
}

export async function getCourseReviews(courseUri: string, categoryUri: string) {
  return fetchCourseReviews(courseUri, categoryUri);
}

export async function getCourseLearners(courseUri: string, categoryUri: string) {
  return fetchCourseLearners(courseUri, categoryUri);
}

export async function getCoursePlans(courseUri: string, categoryUri: string) {
  return fetchCoursePlans(courseUri, categoryUri);
}

export async function getRelatedCourses(courseUri: string) {
  return fetchRelatedCourses(courseUri);
}
