'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';
import { RELATED_BLOGS, type RelatedBlogItem } from '@/lib/categoryPageSections';
import { useGsapScrollRevealStagger } from '@/hooks/useGsapScrollReveal';

const AUTHOR_AVATAR = '/images/Alex.png';
const DEFAULT_BLOG_IMAGE = '/images/course/course-1.png';
const BLOG_CARD_WIDTH = 'max-w-[412px] w-full';
const SOLID_CARD_HEIGHT = 'h-[196px]';

const SOLID_BG: Record<RelatedBlogItem['variant'], string | undefined> = {
  default: undefined,
  'image-middle': undefined,
  'solid-red': '#CB3D4D',
  'solid-tan': '#BB9255',
  'solid-teal': '#4899C2',
};

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

function BlogCardFooter({
  blog,
  isSolid,
  compact = false,
}: {
  blog: RelatedBlogItem;
  isSolid: boolean;
  compact?: boolean;
}) {
  const avatarSrc = blog.authorAvatar ?? AUTHOR_AVATAR;

  return (
    <div
      className={`mt-auto flex items-center justify-between gap-2 border-t ${compact ? 'pt-3' : 'pt-4'} ${isSolid ? 'border-white/25' : 'border-zinc-100'}`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`relative shrink-0 overflow-hidden rounded-full ${compact ? 'h-8 w-8' : 'h-9 w-9'} ${isSolid ? 'ring-2 ring-white/30' : 'ring-1 ring-zinc-200'}`}
        >
          <Image src={avatarSrc} alt="" fill sizes="36px" loading="eager" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span
            className={`block truncate text-[11px] font-bold tracking-wide ${isSolid ? 'text-white' : 'text-heading'}`}
          >
            {blog.author}
          </span>
          <span className={`text-[11px] font-medium ${isSolid ? 'text-white/75' : 'text-muted'}`}>
            {blog.date}
          </span>
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

function BlogCard({ blog }: { blog: RelatedBlogItem }) {
  const isSolid = blog.variant.startsWith('solid-');
  const bg = SOLID_BG[blog.variant];
  const imageSrc = blog.imageSrc ?? DEFAULT_BLOG_IMAGE;

  if (blog.variant === 'image-middle') {
    return (
      <article
        className={`flex flex-col overflow-hidden rounded-2xl border border-zinc-100/80 bg-white p-6 shadow-[0_4px_14px_-4px_rgba(30,41,59,0.12)] ${BLOG_CARD_WIDTH}`}
      >
        <div className="relative h-[170px] w-full overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 1024px) 33vw, 400px"
            loading="eager"
            className="object-cover"
          />
        </div>
        <h3 className="mt-5 text-[17px] font-bold leading-snug text-heading">{blog.title}</h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">{blog.excerpt}</p>
        <BlogCardFooter blog={blog} isSolid={false} />
      </article>
    );
  }

  if (isSolid && bg) {
    return (
      <article
        className={`flex ${SOLID_CARD_HEIGHT} ${BLOG_CARD_WIDTH} flex-col overflow-hidden rounded-[16px] p-5 shadow-[0_4px_14px_-4px_rgba(30,41,59,0.12)]`}
        style={{ backgroundColor: bg }}
      >
        <div className="min-h-0 flex-1">
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-white">{blog.title}</h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/90">{blog.excerpt}</p>
        </div>
        <BlogCardFooter blog={blog} isSolid compact />
      </article>
    );
  }

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-zinc-100/80 bg-white p-6 shadow-[0_4px_14px_-4px_rgba(30,41,59,0.12)] ${BLOG_CARD_WIDTH}`}
    >
      <div className="relative h-[170px] w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 1024px) 33vw, 400px"
          loading="eager"
          className="object-cover"
        />
      </div>
      <h3 className="mt-5 text-[17px] font-bold leading-snug text-heading">{blog.title}</h3>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">{blog.excerpt}</p>
      <BlogCardFooter blog={blog} isSolid={false} />
    </article>
  );
}

/** 3-column masonry: items ordered col1-top, col2-top, col3-top, col1-bottom, col2-bottom, col3-bottom */
function BlogMasonryGrid({
  items,
  onColumnRef,
}: {
  items: RelatedBlogItem[];
  onColumnRef?: (colIndex: number, el: HTMLDivElement | null) => void;
}) {
  const columns = [
    [items[0], items[3]],
    [items[1], items[4]],
    [items[2], items[5]],
  ].filter((col) => col.some(Boolean));

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-start">
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          ref={(el) => onColumnRef?.(colIndex, el)}
          className={`gsap-reveal-pending flex flex-col gap-6 ${BLOG_CARD_WIDTH} mx-auto lg:mx-0`}
        >
          {column.map((blog) => (blog ? <BlogCard key={blog.id} blog={blog} /> : null))}
        </div>
      ))}
    </div>
  );
}

const PAGE_SIZE = 6;
const MASONRY_COLUMNS = 3;

/** Off-screen carousel slides are lazy-loaded by default; warm the cache on mount. */
function usePrefetchBlogImages(items: RelatedBlogItem[]) {
  useEffect(() => {
    const sources = new Set<string>([AUTHOR_AVATAR, DEFAULT_BLOG_IMAGE]);
    for (const blog of items) {
      if (blog.imageSrc) sources.add(blog.imageSrc);
      if (blog.authorAvatar) sources.add(blog.authorAvatar);
    }
    for (const src of sources) {
      const img = new window.Image();
      img.src = src;
    }
  }, [items]);
}

export default function CategoryRelatedBlogsSection() {
  const { heading, subheading, items } = RELATED_BLOGS;
  const [page, setPage] = useState(0);
  const [, startTransition] = useTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pages = useMemo(() => chunkPages(items, PAGE_SIZE), [items]);
  const totalPages = pages.length;
  usePrefetchBlogImages(items);

  rowRefs.current.length = pages.length * MASONRY_COLUMNS;

  useGsapScrollRevealStagger(
    sectionRef,
    rowRefs,
    {
      y: 40,
      duration: 0.8,
      delay: 0.1,
      ease: 'power2.out',
      start: 'top 88%',
    },
    [pages.length, page],
  );

  const goToPage = (next: number) => {
    startTransition(() => setPage(next));
  };

  return (
    <section
      ref={sectionRef}
      className="full-bleed bg-surface pb-14 md:pb-20"
      aria-labelledby="related-blogs-heading"
    >
      <div className="site-container">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="related-blogs-heading"
            className="text-[26px] font-extrabold leading-tight text-heading md:text-[40px] md:leading-[60px]"
          >
            {heading}
          </h2>
          <p className="mt-3 text-[16px] font-medium leading-[140%] text-muted md:text-[18px]">
            {subheading}
          </p>
        </header>

        <CategoryCarouselTrack page={page} className="mt-10 md:mt-12">
          {pages.map((pageItems, pageIndex) => (
            <BlogMasonryGrid
              key={pageIndex}
              items={pageItems}
              onColumnRef={(colIndex, el) => {
                rowRefs.current[pageIndex * MASONRY_COLUMNS + colIndex] = el;
              }}
            />
          ))}
        </CategoryCarouselTrack>

        <div className="mt-10">
          <CategoryCarouselControls
            page={page}
            totalPages={totalPages}
            onPrev={() => goToPage(Math.max(0, page - 1))}
            onNext={() => goToPage(Math.min(totalPages - 1, page + 1))}
            prevLabel="Previous blogs"
            nextLabel="Next blogs"
          />
        </div>
      </div>
    </section>
  );
}
