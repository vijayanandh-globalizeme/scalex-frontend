export type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export type SitemapUrlEntry = {
  loc: string;
  lastmod: string | Date;
  changefreq?: ChangeFreq;
  priority?: number;
};

export type SitemapIndexEntry = {
  loc: string;
  lastmod: string | Date;
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default:  return '&apos;';
    }
  });
}

function toIsoString(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value;
}

function stylesheetTag(xslHref?: string): string {
  return xslHref ? `<?xml-stylesheet type="text/xsl" href="${xslHref}"?>\n` : '';
}

export function buildUrlsetXml(entries: SitemapUrlEntry[], xslHref = '/sitemap-urlset.xsl'): string {
  const urls = entries
    .map((entry) => {
      const changefreq = entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : '';
      const priority = entry.priority !== undefined ? `\n    <priority>${entry.priority.toFixed(1)}</priority>` : '';
      return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${toIsoString(entry.lastmod)}</lastmod>${changefreq}${priority}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n${stylesheetTag(xslHref)}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function buildSitemapIndexXml(entries: SitemapIndexEntry[], xslHref = '/sitemap-index.xsl'): string {
  const sitemaps = entries
    .map(
      (entry) =>
        `  <sitemap>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${toIsoString(entry.lastmod)}</lastmod>\n  </sitemap>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n${stylesheetTag(xslHref)}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>`;
}
