import { fetchSitemapBlogs } from '@/services/blogApi';
import { buildUrlsetXml } from '@/lib/sitemapXml';
import { getSiteOrigin } from '@/lib/site';

export const revalidate = 3600;

export async function GET() {
  const origin = getSiteOrigin();
  const blogs = await fetchSitemapBlogs();

  const xml = buildUrlsetXml(
    blogs.map((blog) => ({
      loc: `${origin}/blogs/${blog.uri}`,
      lastmod: blog.updatedAt,
      changefreq: 'monthly',
      priority: 0.6,
    })),
  );

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
