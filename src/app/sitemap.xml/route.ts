import { buildSitemapIndexXml } from '@/lib/sitemapXml';
import { getSiteOrigin } from '@/lib/site';

export const revalidate = 3600;

const SUB_SITEMAPS = [
  'static-sitemap.xml',
  'category-sitemap.xml',
  'courses-sitemap.xml',
  'blogs-sitemap.xml',
];

export async function GET() {
  const origin = getSiteOrigin();
  const lastmod = new Date();

  const xml = buildSitemapIndexXml(
    SUB_SITEMAPS.map((path) => ({ loc: `${origin}/${path}`, lastmod })),
  );

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
