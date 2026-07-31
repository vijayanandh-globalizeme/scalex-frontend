'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CategoryCarouselControls,
} from '@/components/category/CategoryCarouselNav';
import { getBlogs, type ApiBlogListItem } from '@/app/actions/blogActions';

const FETCH_LIMIT = 6;
const MOBILE_VISIBLE_COUNT = 3;
const AUTHOR_AVATAR = '/images/Alex.png';
const DEFAULT_BLOG_IMAGE = '/images/course/course-1.png';
const BLOG_CARD_WIDTH = 'max-w-[412px] w-full';
const BLOG_IMAGE_H = 170;
const BLOG_IMAGE_OVERFLOW_PX = Math.round(BLOG_IMAGE_H * 0.1);
const MOBILE_BLOG_IMAGE_H = 100;
const MOBILE_BLOG_IMAGE_OVERFLOW_PX = Math.round(MOBILE_BLOG_IMAGE_H * 0.1);
const SOLID_CARD_HEIGHT = 'min-h-[196px]';
type BlogVariant = 'default' | 'solid-red' | 'solid-tan' | 'solid-teal';

/** Matches screenshot: white / solid / white per row, 3-column masonry. */
const VARIANT_CYCLE: BlogVariant[] = [
  'default',
  'solid-red',
  'default',
  'solid-tan',
  'default',
  'solid-teal',
];

const SOLID_BG: Record<Exclude<BlogVariant, 'default'>, string> = {
  'solid-red': '#CB3D4D',
  'solid-tan': '#BB9255',
  'solid-teal': '#4899C2',
};

type BlogItem = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  href: string;
  variant: BlogVariant;
  imageSrc: string;
  authorAvatar: string;
};

function apiBlogToItem(blog: ApiBlogListItem, index: number): BlogItem {
  return {
    id: blog.id,
    title: blog.title,
    excerpt: blog.shortDescription ?? '',
    author: blog.trainerName ?? 'EdgeX Team',
    date: blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '',
    href: `/blogs/${blog.uri}`,
    variant: VARIANT_CYCLE[index % VARIANT_CYCLE.length],
    imageSrc: blog.featureImage?.url ?? DEFAULT_BLOG_IMAGE,
    authorAvatar: blog.trainerAvatar?.url ?? AUTHOR_AVATAR,
  };
}

function ArrowRightSmall({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="12" viewBox="0 0 18 15" fill="none" aria-hidden>
      <path
        d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BlogCardFooter({ blog, isSolid, compact = false }: { blog: BlogItem; isSolid: boolean; compact?: boolean }) {
  return (
    <div
      className={`mt-auto flex items-center justify-between gap-2 ${compact ? 'pt-3' : 'pt-4'}`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`relative shrink-0 overflow-hidden rounded-full ${compact ? 'h-8 w-8' : 'h-9 w-9'} ${isSolid ? 'ring-2 ring-white/30' : 'ring-1 ring-zinc-200'}`}
        >
          <Image src={blog.authorAvatar} alt="" fill sizes="36px" loading="eager" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span
            className={`block truncate text-[14px] font-normal leading-[20px] ${isSolid ? 'text-white' : 'text-heading'}`}
          >
            {blog.author}
          </span>
          <span className={`text-[12px] font-normal leading-normal ${isSolid ? 'text-white' : 'text-muted'}`}>{blog.date}</span>
        </span>
      </div>
      <Link
        href={blog.href}
        className={`inline-flex shrink-0 items-center gap-1 ${compact ? 'text-[12px]' : 'text-[13px]'} font-semibold ${isSolid ? 'text-white' : 'text-brand'}`}
      >
        Full Blog
        <ArrowRightSmall className="btn-arrow-icon" />
      </Link>
    </div>
  );
}

function WhiteBlogCard({ blog, mobile = false }: { blog: BlogItem; mobile?: boolean }) {
  const imageH = mobile ? MOBILE_BLOG_IMAGE_H : BLOG_IMAGE_H;
  const imageOverflow = mobile ? MOBILE_BLOG_IMAGE_OVERFLOW_PX : BLOG_IMAGE_OVERFLOW_PX;
  const widthClass = mobile ? 'w-full' : BLOG_CARD_WIDTH;

  return (
    <article className={`overflow-visible ${widthClass}`}>
      <div
        className={`interactive-card flex flex-col overflow-visible rounded-2xl border border-zinc-100 bg-white pt-0 ${
          mobile ? 'px-3 pb-4' : 'px-4 pb-6'
        }`}
      >
        <div
          className={`interactive-card-media relative z-10 w-full overflow-hidden rounded-2xl ${mobile ? 'mb-3' : 'mb-4'}`}
          style={{
            height: imageH,
            marginTop: -imageOverflow,
          }}
        >
          <Image
            src={blog.imageSrc}
            alt=""
            fill
            sizes={mobile ? '45vw' : '(max-width: 1024px) 90vw, 412px'}
            loading="eager"
            className="object-cover"
          />
        </div>
        <h3 className={`interactive-card-title font-bold leading-snug text-heading ${mobile ? 'line-clamp-2 text-[14px]' : 'text-[20px]'}`}>
          {blog.title}
        </h3>
        <p
          className={`flex-1 text-muted ${mobile ? 'mt-2 line-clamp-2 text-[12px] leading-relaxed' : 'mt-3 line-clamp-4 text-[14px] leading-relaxed'}`}
        >
          {blog.excerpt}
        </p>
        <BlogCardFooter blog={blog} isSolid={false} compact={mobile} />
      </div>
    </article>
  );
}

function SolidBlogCard({ blog, bg, mobile = false }: { blog: BlogItem; bg: string; mobile?: boolean }) {
  const widthClass = mobile ? 'w-full' : BLOG_CARD_WIDTH;

  return (
    <article
      className={`interactive-card flex flex-col overflow-visible rounded-2xl ${widthClass} ${
        mobile ? 'min-h-[168px] p-3' : `${SOLID_CARD_HEIGHT} p-5`
      }`}
      style={{ backgroundColor: bg }}
    >
      <div className="min-h-0 flex-1">
        <h3 className={`interactive-card-title line-clamp-2 font-bold leading-snug text-white ${mobile ? 'text-[13px]' : 'text-[20px]'}`}>
          {blog.title}
        </h3>
        <p
          className={`line-clamp-2 ${mobile ? 'mt-1.5 text-[11px] leading-relaxed text-white/90' : 'mt-2 text-[14px] font-normal leading-[150%] text-white'}`}
        >
          {blog.excerpt}
        </p>
      </div>
      <BlogCardFooter blog={blog} isSolid compact />
    </article>
  );
}

function BlogCard({ blog, mobile = false }: { blog: BlogItem; mobile?: boolean }) {
  if (blog.variant === 'default') {
    return <WhiteBlogCard blog={blog} mobile={mobile} />;
  }

  return <SolidBlogCard blog={blog} bg={SOLID_BG[blog.variant]} mobile={mobile} />;
}

function ViewMoreChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      aria-hidden
    >
      <path
        d="M7.50374 9C7.69084 9 7.87795 8.92839 8.00517 8.79244L13.7979 3.11657C13.9251 2.99489 14 2.83742 14 2.65849C14 2.2863 13.7081 2 13.3189 2C13.1318 2 12.9597 2.07158 12.8325 2.1861L7.09959 7.79038H7.9004L2.16753 2.1861C2.04778 2.07158 1.87565 2 1.68106 2C1.29188 2 1 2.2863 1 2.65849C1 2.83742 1.07484 2.99489 1.20207 3.12372L6.99482 8.79244C7.13701 8.92839 7.30915 9 7.50374 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BlogMobileGrid({ items }: { items: BlogItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-visible">
      {items.map((blog) => (
        <div key={blog.id} className="min-w-0 overflow-visible">
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
}

function BlogMasonryGrid({ items }: { items: BlogItem[] }) {
  const columns = [
    [items[0], items[3]],
    [items[1], items[4]],
    [items[2], items[5]],
  ].filter((col) => col.some(Boolean));

  return (
    <div className="grid grid-cols-1 gap-4 overflow-visible md:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-x-8 lg:gap-y-5">
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className={`flex flex-col gap-4 lg:gap-5 ${BLOG_CARD_WIDTH} mx-auto lg:mx-0`}
          style={colIndex === 1 ? undefined : { paddingTop: BLOG_IMAGE_OVERFLOW_PX }}
        >
          {column.map((blog, blogIndex) =>
            blog ? (
              <div
                key={blog.id}
                className="overflow-visible"
                style={
                  colIndex === 1 && blogIndex === 1 && blog.variant === 'default'
                    ? { paddingTop: 20 }
                    : blog.variant === 'default' && blogIndex > 0
                      ? { marginTop: -BLOG_IMAGE_OVERFLOW_PX }
                      : undefined
                }
              >
                <BlogCard blog={blog} />
              </div>
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
}

function SkeletonCard({ mobile = false }: { mobile?: boolean }) {
  const imageH = mobile ? MOBILE_BLOG_IMAGE_H : BLOG_IMAGE_H;
  const imageOverflow = mobile ? MOBILE_BLOG_IMAGE_OVERFLOW_PX : BLOG_IMAGE_OVERFLOW_PX;

  return (
    <div className="animate-pulse overflow-visible">
      <div className={`overflow-visible rounded-2xl bg-surface-raised pt-0 ${mobile ? 'px-3 pb-4' : 'px-4 pb-6'}`}>
        <div
          className={`mb-4 w-full rounded-2xl bg-muted/20 ${mobile ? 'mb-3' : ''}`}
          style={{ height: imageH, marginTop: -imageOverflow }}
        />
        <div className="h-4 w-4/5 rounded bg-muted/20" />
        <div className="h-4 w-2/3 rounded bg-muted/20" />
        {!mobile ? <div className="h-4 w-1/2 rounded bg-muted/20" /> : null}
      </div>
    </div>
  );
}

export default function CategoryRelatedBlogsSection({ categoryId }: { categoryId?: string }) {
  const [loading, setLoading] = useState(true);
  const [pageFetching, setPageFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState<BlogItem[]>([]);

  const cache = useRef<Map<number, BlogItem[]>>(new Map());
  const mobileItems = useMemo(
    () => currentItems.slice(0, MOBILE_VISIBLE_COUNT),
    [currentItems],
  );

  useEffect(() => {
    const md = window.matchMedia('(min-width: 768px)');
    const update = () => setIsMobile(!md.matches);
    update();
    md.addEventListener('change', update);
    return () => md.removeEventListener('change', update);
  }, []);

  async function fetchBlogPage(pageIndex: number): Promise<BlogItem[]> {
    if (cache.current.has(pageIndex)) {
      return cache.current.get(pageIndex)!;
    }

    const { items, total } = await getBlogs({
      limit: FETCH_LIMIT,
      offset: pageIndex * FETCH_LIMIT,
      courseCategoryId: categoryId,
    });
    const mapped = items.map((b, i) => apiBlogToItem(b, pageIndex * FETCH_LIMIT + i));
    cache.current.set(pageIndex, mapped);
    setTotalPages(total > 0 ? Math.ceil(total / FETCH_LIMIT) : 0);
    return mapped;
  }

  async function switchBatch(apiPage: number) {
    const isFirstLoad = currentItems.length === 0;
    if (isFirstLoad) {
      setLoading(true);
    } else {
      setPageFetching(true);
    }

    try {
      const items = await fetchBlogPage(apiPage);
      setPage(apiPage);
      setCurrentItems(items);
    } finally {
      setLoading(false);
      setPageFetching(false);
    }
  }

  useEffect(() => {
    void switchBatch(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleNext() {
    if (page < totalPages - 1) {
      void switchBatch(page + 1);
    }
  }

  function handlePrev() {
    if (page > 0) {
      void switchBatch(page - 1);
    }
  }

  const isEmpty = !loading && !pageFetching && currentItems.length === 0;
  const showControls = !loading && !pageFetching && !isEmpty && !isMobile && totalPages > 1;

  return (
    <section className="full-bleed overflow-visible bg-surface pb-0 md:pb-10" aria-labelledby="related-blogs-heading">
      <div className="site-container">
        <header className="mx-auto w-full text-center">
          <h2
            id="related-blogs-heading"
            className="text-center text-[34px] font-bold leading-[140%] text-[#1E293B]"
          >
            Related Blogs
          </h2>
          <p className="mt-3 whitespace-nowrap text-center text-[16px] font-medium leading-[140%] text-muted md:text-[18px]">
            Go deeper into specialized topics with our latest blog posts, designed to help you navigate your career path with confidence.
          </p>
        </header>

        <div
          className="mt-6 overflow-visible md:mt-8"
          style={{ paddingTop: BLOG_IMAGE_OVERFLOW_PX }}
        >
          {loading && currentItems.length === 0 ? (
            isMobile ? (
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: MOBILE_VISIBLE_COUNT }).map((_, i) => (
                  <SkeletonCard key={i} mobile />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: FETCH_LIMIT }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )
          ) : isEmpty ? (
            <p className="py-16 text-center text-[15px] text-muted">No blogs found.</p>
          ) : isMobile ? (
            pageFetching ? (
              <div className="grid grid-cols-1 gap-4">
                {Array.from({ length: MOBILE_VISIBLE_COUNT }).map((_, i) => (
                  <SkeletonCard key={i} mobile />
                ))}
              </div>
            ) : (
              <BlogMobileGrid items={mobileItems} />
            )
          ) : (
            <BlogMasonryGrid items={currentItems} />
          )}
        </div>

        {!loading && !pageFetching && !isEmpty && isMobile ? (
          <div className="mt-10 flex justify-center md:hidden">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand underline-offset-4 transition hover:underline"
            >
              View More
              <ViewMoreChevronIcon className="shrink-0 text-brand" />
            </Link>
          </div>
        ) : null}

        {showControls && (
          <div className="mt-10">
            <CategoryCarouselControls
              page={page}
              totalPages={totalPages}
              onPrev={handlePrev}
              onNext={handleNext}
              canGoPrev={page > 0}
              canGoNext={page < totalPages - 1}
              prevLabel="Previous blogs"
              nextLabel="Next blogs"
            />
          </div>
        )}
      </div>
    </section>
  );
}
