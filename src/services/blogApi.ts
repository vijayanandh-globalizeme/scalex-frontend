import { get, post } from '@/services/http';

// ── Types ────────────────────────────────────────────────────────────────

export type ApiFile = { id: string; url: string; extension: string | null };

export type ApiBlogListItem = {
  id: string;
  title: string;
  uri: string;
  shortDescription: string;
  views: number;
  readTimeMinutes: number;
  createdAt: string;
  categoryName: string | null;
  featureImage: ApiFile | null;
  trainerName: string | null;
  trainerAvatar: ApiFile | null;
};

export type ApiBlogListResult = {
  items: ApiBlogListItem[];
  total: number;
  limit: number;
  offset: number;
};

export type ApiBlogRelatedResult = {
  items: ApiBlogListItem[];
};

export type ApiBlogCategory = { id: string; name: string; uri: string };

export type ApiBlogTocItem = { label: string; target: string };

export type ApiBlogTrainer = {
  name: string;
  role: string;
  about: string;
  linkedInProfile: string;
  articlesPublished: number;
  avatar: ApiFile | null;
};

export type ApiBlogDetail = {
  id: string;
  title: string;
  shortDescription: string;
  uri: string;
  readTimeMinutes: number;
  popular: boolean;
  views: number;
  createdAt: string;
  featureImage: ApiFile | null;
  category: { id: string; name: string; uri: string } | null;
  courseCategories: { id: string; name: string; uri: string }[];
  trainer: ApiBlogTrainer | null;
  content: {
    tableTitle: string | null;
    tableOfContents: ApiBlogTocItem[] | null;
    content: string;
    bannerTitle: string;
    bannerDescription: string;
  } | null;
  seo: { metaTitle: string | null; metaDescription: string | null; metaKeywords: string | null } | null;
};

export type BlogSortBy = 'createdAt' | 'views' | 'title' | 'readTimeMinutes' | 'popular';

export type BlogListOptions = {
  categoryUri?: string;
  courseCategoryId?: string;
  q?: string;
  sortBy?: BlogSortBy;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
};

type BlogListApiResponse       = { success: boolean; data: ApiBlogListResult };
type BlogRelatedApiResponse    = { success: boolean; data: ApiBlogRelatedResult };
type BlogCategoriesApiResponse = { success: boolean; data: ApiBlogCategory[] };
type BlogDetailApiResponse     = { success: boolean; data: ApiBlogDetail };

function buildListParams(options: BlogListOptions): URLSearchParams {
  const params = new URLSearchParams();
  if (options.categoryUri)      params.set('categoryUri', options.categoryUri);
  if (options.courseCategoryId) params.set('courseCategoryId', options.courseCategoryId);
  if (options.q)                params.set('q', options.q);
  if (options.sortBy)      params.set('sortBy', options.sortBy);
  if (options.sortOrder)   params.set('sortOrder', options.sortOrder);
  params.set('limit',  String(options.limit ?? 12));
  params.set('offset', String(options.offset ?? 0));
  return params;
}

// ── Blog list ────────────────────────────────────────────────────────────

export async function fetchBlogs(options: BlogListOptions = {}): Promise<ApiBlogListResult> {
  const params = buildListParams(options);
  const json = await get<BlogListApiResponse>(`blogs?${params.toString()}`, {
    revalidate: 60,
    tags: ['blogs-list'],
  });
  return json?.success
    ? json.data
    : { items: [], total: 0, limit: options.limit ?? 12, offset: options.offset ?? 0 };
}

// ── Trending blogs (backed by the same list endpoint, popular=true, max 10) ─

export async function fetchTrendingBlogs(options: BlogListOptions = {}): Promise<ApiBlogListResult> {
  const limit = options.limit ?? 10;
  const params = buildListParams({ ...options, limit });
  const json = await get<BlogListApiResponse>(`blogs/trending?${params.toString()}`, {
    revalidate: 300,
    tags: ['blogs-trending'],
  });
  return json?.success ? json.data : { items: [], total: 0, limit, offset: 0 };
}

// ── Blog categories ──────────────────────────────────────────────────────

export async function fetchBlogCategories(): Promise<ApiBlogCategory[]> {
  const json = await get<BlogCategoriesApiResponse>('blogs/categories', {
    revalidate: 300,
    tags: ['blog-categories'],
  });
  return json?.success ? (json.data ?? []) : [];
}

// ── Blog detail ──────────────────────────────────────────────────────────

export async function fetchBlogByUri(uri: string): Promise<ApiBlogDetail | null> {
  const json = await get<BlogDetailApiResponse>(`blogs/${uri}`, {
    revalidate: 60,
    tags: [`blog-${uri}`],
  });
  return json?.success ? json.data : null;
}

// Fire-and-forget — increments the blog's view count by 1.
export async function incrementBlogView(uri: string): Promise<void> {
  await post(`blogs/${uri}/view`, {});
}

// ── Related blogs (max 10) ──────────────────────────────────────────────

export async function fetchRelatedBlogs(uri: string, limit = 10): Promise<ApiBlogListItem[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  const json = await get<BlogRelatedApiResponse>(`blogs/${uri}/related?${params.toString()}`, {
    revalidate: 300,
    tags: [`blog-${uri}-related`],
  });
  return json?.success ? (json.data.items ?? []) : [];
}

// ── Sitemap (every active blog) ────────────────────────────────────────────

export type ApiSitemapBlog = {
  uri: string;
  updatedAt: string;
};

type SitemapBlogsApiResponse = { success: boolean; data: ApiSitemapBlog[] };

export async function fetchSitemapBlogs(): Promise<ApiSitemapBlog[]> {
  const json = await get<SitemapBlogsApiResponse>('blogs/sitemap', { revalidate: 3600 });
  return json?.success ? (json.data ?? []) : [];
}
