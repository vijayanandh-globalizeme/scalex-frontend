'use server';

export type {
  ApiFile,
  ApiBlogListItem,
  ApiBlogListResult,
  ApiBlogCategory,
  ApiBlogTocItem,
  ApiBlogTrainer,
  ApiBlogDetail,
  BlogSortBy,
  BlogListOptions,
} from '@/services/blogApi';

import {
  fetchBlogs,
  fetchTrendingBlogs,
  fetchBlogCategories,
  fetchBlogByUri,
  fetchRelatedBlogs,
  incrementBlogView,
  type BlogListOptions,
} from '@/services/blogApi';

export async function getBlogs(options: BlogListOptions = {}) {
  return fetchBlogs(options);
}

export async function getTrendingBlogs(options: BlogListOptions = {}) {
  return fetchTrendingBlogs(options);
}

export async function getBlogCategories() {
  return fetchBlogCategories();
}

export async function getBlogByUri(uri: string) {
  return fetchBlogByUri(uri);
}

export async function getRelatedBlogs(uri: string, limit = 10) {
  return fetchRelatedBlogs(uri, limit);
}

export async function viewBlog(uri: string) {
  return incrementBlogView(uri);
}
