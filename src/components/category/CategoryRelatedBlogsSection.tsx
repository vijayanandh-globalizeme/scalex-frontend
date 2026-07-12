'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';
import { getBlogs, type ApiBlogListItem } from '@/app/actions/blogActions';

const FETCH_LIMIT = 6;
const MOBILE_SLIDE_SIZE = 2;
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
      className={`mt-auto flex items-center justify-between gap-2 border-t ${compact ? 'pt-3' : 'pt-4'} ${isSolid ? 'border-white/25' : 'border-zinc-100'}`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`relative shrink-0 overflow-hidden rounded-full ${compact ? 'h-8 w-8' : 'h-9 w-9'} ${isSolid ? 'ring-2 ring-white/30' : 'ring-1 ring-zinc-200'}`}
        >
          <Image src={blog.authorAvatar} alt="" fill sizes="36px" loading="eager" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span
            className={`block truncate text-[11px] font-bold uppercase tracking-wide ${isSolid ? 'text-white' : 'text-heading'}`}
          >
            {blog.author}
          </span>
          <span className={`text-[11px] font-medium ${isSolid ? 'text-white/75' : 'text-muted'}`}>{blog.date}</span>
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
          className={`line-clamp-2 leading-relaxed text-white/90 ${mobile ? 'mt-1.5 text-[11px]' : 'mt-2 text-[13px]'}`}
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

function BlogMobileGrid({ items }: { items: BlogItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 overflow-visible">
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
    <div className="grid grid-cols-1 gap-6 overflow-visible md:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-8">
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className={`flex flex-col gap-6 lg:gap-8 ${BLOG_CARD_WIDTH} mx-auto lg:mx-0`}
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
  const [mobileSlide, setMobileSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState<BlogItem[]>([]);

  const cache = useRef<Map<number, BlogItem[]>>(new Map());

  useEffect(() => {
    const md = window.matchMedia('(min-width: 768px)');
    const update = () => setIsMobile(!md.matches);
    update();
    md.addEventListener('change', update);
    return () => md.removeEventListener('change', update);
  }, []);

  const mobilePages = useMemo(
    () => chunkPages(currentItems, MOBILE_SLIDE_SIZE),
    [currentItems],
  );

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

  async function switchBatch(apiPage: number, slide: number | 'last' = 0) {
    const isFirstLoad = currentItems.length === 0;
    if (isFirstLoad) {
      setLoading(true);
    } else {
      setPageFetching(true);
    }

    try {
      const items = await fetchBlogPage(apiPage);
      const slideCount = chunkPages(items, MOBILE_SLIDE_SIZE).length;
      const slideIndex = slide === 'last' ? Math.max(0, slideCount - 1) : slide;

      setPage(apiPage);
      setCurrentItems(items);
      setMobileSlide(slideIndex);
    } finally {
      setLoading(false);
      setPageFetching(false);
    }
  }

  useEffect(() => {
    void switchBatch(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMobileSlide((current) => Math.min(current, Math.max(0, mobilePages.length - 1)));
  }, [mobilePages.length, page]);

  function handleNext() {
    if (isMobile && mobileSlide < mobilePages.length - 1) {
      setMobileSlide((current) => current + 1);
      return;
    }
    if (page < totalPages - 1) {
      void switchBatch(page + 1, 0);
    }
  }

  function handlePrev() {
    if (isMobile && mobileSlide > 0) {
      setMobileSlide((current) => current - 1);
      return;
    }
    if (page > 0) {
      void switchBatch(page - 1, 'last');
    }
  }

  const isEmpty = !loading && !pageFetching && currentItems.length === 0;
  const canGoPrev = isMobile ? mobileSlide > 0 || page > 0 : page > 0;
  const canGoNext = isMobile
    ? mobileSlide < mobilePages.length - 1 || page < totalPages - 1
    : page < totalPages - 1;
  const showControls = !loading && !pageFetching && !isEmpty && (isMobile ? canGoPrev || canGoNext : totalPages > 1);
  const carouselPage = isMobile ? mobileSlide : page;
  const carouselTotalPages = isMobile ? mobilePages.length : totalPages;

  return (
    <section className="full-bleed overflow-visible bg-surface pb-14 md:pb-20" aria-labelledby="related-blogs-heading">
      <div className="site-container">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="related-blogs-heading"
            className="text-[26px] font-extrabold leading-tight text-heading md:text-[40px] md:leading-[60px]"
          >
            Related Blogs
          </h2>
          <p className="mt-3 text-[16px] font-medium leading-[140%] text-muted md:text-[18px]">
            Go deeper into specialized topics with our latest blog posts, designed to help you navigate your career path with confidence.
          </p>
        </header>

        <div
          className="mt-10 overflow-visible md:mt-12"
          style={{ paddingTop: BLOG_IMAGE_OVERFLOW_PX }}
        >
          {loading && currentItems.length === 0 ? (
            isMobile ? (
              <div className="grid grid-cols-1 gap-6">
                {Array.from({ length: MOBILE_SLIDE_SIZE }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: FETCH_LIMIT }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )
          ) : isEmpty ? (
            <p className="py-16 text-center text-[15px] text-muted">No blogs found.</p>
          ) : isMobile ? (
            pageFetching ? (
              <div className="grid grid-cols-1 gap-6">
                {Array.from({ length: MOBILE_SLIDE_SIZE }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <CategoryCarouselTrack
                key={`related-blogs-mobile-${page}`}
                page={mobileSlide}
                clipX={false}
                slideGap={16}
              >
                {mobilePages.map((slideItems, slideIndex) => (
                  <BlogMobileGrid key={`${page}-${slideIndex}`} items={slideItems} />
                ))}
              </CategoryCarouselTrack>
            )
          ) : (
            <BlogMasonryGrid items={currentItems} />
          )}
        </div>

        {showControls && (
          <div className="mt-10">
            <CategoryCarouselControls
              page={carouselPage}
              totalPages={carouselTotalPages}
              onPrev={handlePrev}
              onNext={handleNext}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
              prevLabel="Previous blogs"
              nextLabel="Next blogs"
            />
          </div>
        )}
      </div>
    </section>
  );
}
