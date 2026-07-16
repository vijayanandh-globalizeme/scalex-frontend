import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CourseDetailBodySection,
  CourseDetailHeroSection,
  CourseDetailPageShell,
  CourseEnterpriseSection,
  TechnicalCourseHeroSection,
} from '@/components/course-detail';
import JsonLd from '@/components/seo/JsonLd';
import { getCourseOverview } from '@/app/actions/courseActions';
import { buildCourseDetailProps, buildTechnicalCourseProps } from '@/lib/coursePropsFromApi';
import { fetchSetting } from '@/services/layoutApi';
import { SITE_NAME, getSiteOrigin } from '@/lib/site';
import type { ApiCourseOverview } from '@/services/courseApi';

type PageProps = {
  params: Promise<{ categoryUri: string; courseUri: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoryUri, courseUri } = await params;
  const course = await getCourseOverview(courseUri, categoryUri);

  if (!course) return { title: 'Course Not Found' };

  const title       = course.seo?.metaTitle       ?? course.title;
  const description = course.seo?.metaDescription ?? course.details?.aboutContent ?? '';
  const canonical   = `${getSiteOrigin()}/${categoryUri}/${courseUri}`;
  const shareImage  = { url: course.featureImage.url, alt: course.title };

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [shareImage],
    },
    ...(course.seo?.metaKeywords ? { keywords: course.seo.metaKeywords } : {}),
    ...(course.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Raw JSON-LD pasted by admins in "FAQ Schema" — output verbatim if it parses. */
function parseFaqSchema(raw: string | null | undefined): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

/** Admins fill in name/rating/price/message as plain fields — assemble the actual Course + Review structure here. */
function buildReviewJsonLd(course: ApiCourseOverview, canonicalUrl: string): Record<string, unknown> | null {
  const details = course.details;
  const rating = details?.reviewSchemaRating ? Number(details.reviewSchemaRating) : null;
  if (!details || rating === null || Number.isNaN(rating)) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: details.aboutContent || course.shortDescription || undefined,
    url: canonicalUrl,
    provider: { '@type': 'Organization', name: SITE_NAME, sameAs: getSiteOrigin() },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: 1,
    },
    review: {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: rating },
      author: details.reviewSchemaName ? { '@type': 'Person', name: details.reviewSchemaName } : undefined,
      reviewBody: details.reviewSchemaMessage || undefined,
    },
    ...(details.reviewSchemaPrice ? {
      offers: { '@type': 'Offer', price: details.reviewSchemaPrice, priceCurrency: 'INR' },
    } : {}),
  };
}

const DEFAULT_FORM = {
  title: "We're Here to Guide Your Success",
  purposes: [
    { id: 'career-growth', label: 'Career Growth' },
    { id: 'certification', label: 'Get Certified' },
    { id: 'upskill-team', label: 'Upskill My Team' },
    { id: 'other',        label: 'Other' },
  ],
  termsHref:   '/terms-of-use',
  privacyHref: '/privacy-policy',
  ctaLabel:    'Scale Your Career',
};

export default async function CourseDetailPage({ params }: PageProps) {
  const { categoryUri, courseUri } = await params;

  const [course, settingsData] = await Promise.all([
    getCourseOverview(courseUri, categoryUri),
    fetchSetting(),
  ]);

  if (!course) notFound();

  const settings   = settingsData ?? {};
  const isTechnical = course.templateType === 'TECHNICAL' || course.templateType === 'BOOTCAMP';

  const canonical = `${getSiteOrigin()}/${categoryUri}/${courseUri}`;
  const faqJsonLd = parseFaqSchema(course.details?.faqSchema);
  const reviewJsonLd = buildReviewJsonLd(course, canonical);
  const jsonLd = (
    <>
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      {reviewJsonLd ? <JsonLd data={reviewJsonLd} /> : null}
    </>
  );

  if (isTechnical) {
    const props = buildTechnicalCourseProps(course, categoryUri, courseUri, settings);
    return (
      <CourseDetailPageShell form={DEFAULT_FORM}>
        {jsonLd}
        <TechnicalCourseHeroSection {...props} />
        <CourseEnterpriseSection compact />
        <CourseDetailBodySection courseUri={courseUri} categoryUri={categoryUri} isTechnical phone={settings.CONTACT_WHATSAPP_NO} courseDetails={course} settings={settings} />
      </CourseDetailPageShell>
    );
  }

  const props = buildCourseDetailProps(course, categoryUri, courseUri, settings);
  return (
    <CourseDetailPageShell form={DEFAULT_FORM}>
      {jsonLd}
      <CourseDetailHeroSection {...props} />
      <CourseEnterpriseSection />
      <CourseDetailBodySection courseUri={courseUri} categoryUri={categoryUri} phone={settings.CONTACT_WHATSAPP_NO} courseDetails={course} settings={settings} />
    </CourseDetailPageShell>
  );
}