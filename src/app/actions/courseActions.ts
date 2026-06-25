'use server';

export type { ApiCourse, ApiCourseOverview, ApiCourseDetails } from '@/services/courseApi';
import { fetchCourses, fetchCourseOverview, fetchCourseDetails } from '@/services/courseApi';

export async function getCourses(options: { categoryId?: string; limit?: number; offset?: number } = {}) {
  return fetchCourses(options);
}

export async function getCourseOverview(courseUri: string, categoryUri: string) {
  return fetchCourseOverview(courseUri, categoryUri);
}

export async function getCourseDetails(courseUri: string, categoryUri: string) {
  return fetchCourseDetails(courseUri, categoryUri);
}
