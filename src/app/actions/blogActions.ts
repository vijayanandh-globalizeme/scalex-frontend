'use server';

export type { ApiBlog } from '@/services/blogApi';
import { fetchBlogs } from '@/services/blogApi';

export async function getBlogs(options: { limit?: number; offset?: number; categoryId?: string } = {}) {
  return fetchBlogs(options);
}
