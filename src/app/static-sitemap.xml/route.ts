import { buildUrlsetXml } from '@/lib/sitemapXml';
import { getSiteOrigin } from '@/lib/site';

export const revalidate = 3600;

// Static, non-enumerable routes only — courses, blogs, and categories each
// have their own dedicated sitemap since they can number in the thousands.
const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: '', priority: 1.0 },
  { path: '/courses', priority: 0.9 },
  { path: '/blogs', priority: 0.8 },
  { path: '/about-us', priority: 0.6 },
  { path: '/contact-us', priority: 0.6 },
  { path: '/privacy-policy', priority: 0.3 },
  { path: '/refund-policy', priority: 0.3 },
  { path: '/terms-of-use', priority: 0.3 },
];

export async function GET() {
  const origin = getSiteOrigin();
  const lastmod = new Date();

  const xml = buildUrlsetXml(
    STATIC_PATHS.map(({ path, priority }) => ({
      loc: `${origin}${path}`,
      lastmod,
      changefreq: 'weekly',
      priority,
    })),
  );

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
