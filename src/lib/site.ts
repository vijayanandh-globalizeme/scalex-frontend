/** Set in production, e.g. https://example.com (no trailing slash). */
export const SITE_NAME = ' EdgeX Learning';

/** Default meta description . */
export const SITE_DESCRIPTION =
  ' EdgeX Learning offers professional training and certification prep in agile, project management, cloud, and more. Learn from expert trainers and scale your career.';

/** Seed keywords for root metadata; extend per route as content grows. */
export const SITE_KEYWORDS = [
  ' EdgeX Learning',
  'online training',
  'certification prep',
  'PMP',
  'Scrum',
  'agile training',
  'project management courses',
  'corporate training',
] as const;

export function getSiteUrl(): URL {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  try {
    return new URL(raw);
  } catch {
    return new URL('http://localhost:3000');
  }
}

export function getSiteOrigin(): string {
  return getSiteUrl().origin;
}

/** Root JSON-LD: */
export function getRootJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: SITE_NAME,
        url: origin,
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en-US',
        publisher: { '@id': `${origin}/#organization` },
      },
    ],
  };
}
