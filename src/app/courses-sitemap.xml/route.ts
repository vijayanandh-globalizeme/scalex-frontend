import { fetchSitemapCourses } from '@/services/courseApi';
import { buildUrlsetXml } from '@/lib/sitemapXml';
import { getSiteOrigin } from '@/lib/site';

export const revalidate = 3600;

export async function GET() {
  const origin = getSiteOrigin();
  const courses = await fetchSitemapCourses();

  const xml = buildUrlsetXml(
    courses.map((course) => ({
      loc: `${origin}/${course.categoryUri}/${course.uri}`,
      lastmod: course.updatedAt,
      changefreq: 'weekly',
      priority: 0.8,
    })),
  );

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
