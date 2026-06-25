'use server';

export type { ApiCourse } from '@/services/courseApi';
import { fetchCourses } from '@/services/courseApi';

export async function getCourses(options: { categoryId?: string; limit?: number; offset?: number } = {}) {
  return fetchCourses(options);
}
