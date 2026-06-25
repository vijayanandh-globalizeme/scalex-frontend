'use server';

export type { ApiCourse, ApiCourseOverview } from '@/services/courseApi';
import { fetchCourses, fetchCourseOverview } from '@/services/courseApi';

export async function getCourses(options: { categoryId?: string; limit?: number; offset?: number } = {}) {
  return fetchCourses(options);
}

export async function getCourseOverview(courseUri: string, categoryUri: string) {
  return fetchCourseOverview(courseUri, categoryUri);
}
