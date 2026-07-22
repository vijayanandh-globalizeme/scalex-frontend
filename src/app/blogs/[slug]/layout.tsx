import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { fetchBlogByUri } from '@/services/blogApi';
import { SITE_NAME, getSiteOrigin } from '@/lib/site';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

// page.tsx under this route is a client component (it needs hooks for scroll
// progress, active TOC section, etc.), and generateMetadata can only be
// exported from a Server Component — hence a sibling layout for SEO tags.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogByUri(slug);

  if (!blog) return { title: 'Blog Not Found' };

  const title       = blog.seo?.metaTitle       ?? blog.title;
  const description = blog.seo?.metaDescription ?? blog.shortDescription;
  const canonical   = `${getSiteOrigin()}/blogs/${slug}`;
  const shareImage  = blog.featureImage ? { url: blog.featureImage.url, alt: blog.title } : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      images: shareImage ? [shareImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: shareImage ? [shareImage] : undefined,
    },
    ...(blog.seo?.metaKeywords ? { keywords: blog.seo.metaKeywords } : {}),
  };
}

export default function BlogDetailLayout({ children }: LayoutProps) {
  return children;
}
