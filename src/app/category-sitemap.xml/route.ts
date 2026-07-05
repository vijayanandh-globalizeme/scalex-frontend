import { fetchSitemapCategories } from '@/services/categoryApi';
import { buildUrlsetXml } from '@/lib/sitemapXml';
import { getSiteOrigin } from '@/lib/site';

export const revalidate = 3600;

export async function GET() {
  const origin = getSiteOrigin();
  const categories = await fetchSitemapCategories();

  const xml = buildUrlsetXml(
    categories.map((category) => ({
      loc: `${origin}/${category.uri}`,
      lastmod: category.updatedAt,
      changefreq: 'weekly',
      priority: 0.9,
    })),
  );

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
