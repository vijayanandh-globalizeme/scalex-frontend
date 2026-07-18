'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CarouselNavIcon } from '@/components/category/CategoryCarouselNav';
import CategoryCoursesSection from '@/components/category/CategoryCoursesSection';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import { getBlogs, getTrendingBlogs, getBlogCategories, type ApiBlogListItem, type ApiBlogCategory } from '@/app/actions/blogActions';

const PAGE_SIZE = 9;
const DEFAULT_BLOG_IMAGE = '/images/blog.png';
const DEFAULT_AUTHOR_AVATAR = '/images/pranee.png';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

type FeaturedBlog = {
  id: string;
  tag: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  author: { name: string; avatarSrc: string };
  date: string;
  publication: string;
  href: string;
};

function toFeaturedBlog(item: ApiBlogListItem): FeaturedBlog {
  return {
    id: item.id,
    tag: 'FEATURED',
    category: item.categoryName ?? '',
    readTime: `${item.readTimeMinutes} MIN READ`,
    title: item.title,
    excerpt: item.shortDescription,
    imageSrc: item.featureImage?.url ?? DEFAULT_BLOG_IMAGE,
    imageAlt: item.title,
    author: {
      name: item.trainerName ?? 'ScaleX Team',
      avatarSrc: item.trainerAvatar?.url ?? DEFAULT_AUTHOR_AVATAR,
    },
    date: formatDate(item.createdAt),
    publication: 'ScaleX Insights',
    href: `/blogs/${item.uri}`,
  };
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7.5" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M16.5 16.5L21 21" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="btn-arrow-icon" width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

type SortOption = 'latest' | 'popular' | 'trending';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'latest',   label: 'Latest' },
  { value: 'popular',  label: 'Popular' },
  { value: 'trending', label: 'Trending' },
];

function PageArrowIcon({ direction, className }: { direction: 'prev' | 'next'; className?: string }) {
  return (
    <svg
      className={className}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      aria-hidden
      style={direction === 'prev' ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Windowed page-number list with ellipses, e.g. [1, '...', 4, 5, 6, '...', 12].
function getPageNumbers(current: number, total: number): (number | '...')[] {
  const delta = 1;
  const pages: (number | '...')[] = [1];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  if (total > 1) pages.push(total);

  return pages;
}

export default function BlogsPage() {
  // Hero — trending blogs
  const [heroBlogs, setHeroBlogs] = useState<FeaturedBlog[]>([]);
  const [heroPage, setHeroPage] = useState(0);

  // Categories
  const [categories, setCategories] = useState<ApiBlogCategory[]>([]);
  const [activeCategoryUri, setActiveCategoryUri] = useState<string | null>(null); // null = "All Blogs"

  // Search
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  // Sort
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  // Blog grid + pagination
  const [items, setItems] = useState<ApiBlogListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 1-indexed
  const [loading, setLoading] = useState(true);
  const allBlogsSectionRef = useRef<HTMLElement>(null);
  const scrollAfterLoadRef = useRef(false);

  const isSearchActive = submittedQuery !== '';

  // Load hero + categories once
  useEffect(() => {
    getTrendingBlogs({ limit: 10 }).then((res) => setHeroBlogs(res.items.map(toFeaturedBlog)));
    getBlogCategories().then(setCategories);
  }, []);

  // Reload first page whenever category, search, or sort changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setCurrentPage(1);

    const sortParams =
      sortOption === 'popular'  ? { sortBy: 'views' as const, sortOrder: 'desc' as const } :
      sortOption === 'trending' ? { sortBy: 'popular' as const, sortOrder: 'desc' as const } :
      {};
    getBlogs({
      categoryUri: activeCategoryUri ?? undefined,
      q: submittedQuery || undefined,
      ...sortParams,
      limit: PAGE_SIZE,
      offset: 0,
    }).then((res) => {
      if (cancelled) return;
      setItems(res.items);
      setTotal(res.total);
      setLoading(false);
      if (scrollAfterLoadRef.current) {
        scrollAfterLoadRef.current = false;
        allBlogsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    return () => { cancelled = true; };
  }, [activeCategoryUri, submittedQuery, sortOption]);

  function handleSearchSubmit() {
    scrollAfterLoadRef.current = true;
    setSubmittedQuery(query.trim());
  }

  function handleResetSearch() {
    setQuery('');
    setSubmittedQuery('');
  }

  async function goToPage(pageNumber: number) {
    if (loading || pageNumber === currentPage || pageNumber < 1) return;
    setLoading(true);
    const sortParams =
      sortOption === 'popular'  ? { sortBy: 'views' as const, sortOrder: 'desc' as const } :
      sortOption === 'trending' ? { sortBy: 'popular' as const, sortOrder: 'desc' as const } :
      {};
    const res = await getBlogs({
      categoryUri: activeCategoryUri ?? undefined,
      q: submittedQuery || undefined,
      ...sortParams,
      limit: PAGE_SIZE,
      offset: (pageNumber - 1) * PAGE_SIZE,
    });
    setItems(res.items);
    setTotal(res.total);
    setCurrentPage(pageNumber);
    setLoading(false);
    allBlogsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const totalHero = heroBlogs.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <>
      {/* Hero Section */}
      <section
        className="full-bleed relative z-10 min-h-[594px] overflow-visible pt-4 pb-0 md:h-[594px] md:pt-6"
      >
        <div className="blogs-hero-bg pointer-events-none absolute inset-0" aria-hidden />
        {/* Decorative ScaleX watermark */}
        <div className="pointer-events-none absolute right-0 top-1/4 z-0 hidden h-[340px] w-[300px] opacity-[0.07] md:block" aria-hidden>
          <Image src="/images/scalex-mark.png" alt="" fill className="object-contain object-right" />
        </div>

        <div className="site-container relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1 transition-colors hover:text-brand" aria-label="Home">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M2.5 7.5L10 1.667L17.5 7.5V17.5H13.333V12.5H6.667V17.5H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <span className="text-muted" aria-hidden>&gt;</span>
            <span className="font-medium text-brand">Blogs</span>
          </nav>

          {/* Heading */}
          <div className="mb-4 pt-8 text-center md:pt-12 md:pb-6">
            <h1 className="text-[28px] font-bold leading-[1.3] text-heading md:text-[40px] md:font-extrabold md:leading-[60px]">
              Your Gateway to{' '}
              <span className="relative inline-block whitespace-nowrap pb-[23px] align-top">
                <span>Career Knowledge</span>
                <span className="absolute bottom-0 left-0 block h-[19px] w-full overflow-hidden" aria-hidden>
                  <span className="block h-[19px] w-full origin-left animate-category-title-underline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="358" height="19" viewBox="0 0 358 19" fill="none" className="block h-[19px] w-full">
                      <path d="M356.433 5.57693C311.699 1.53361 254.63 7.65521 197.333 7.97869C140.035 8.30216 83.0426 16.3565 25.745 16.6799C13.0292 17.1813 -2.07743 21.6484 0.237115 15.75C6.29024 7.76846 63.664 9.3777 120.885 7.12151C190.823 4.36396 260.607 -2.25902 330.773 0.781552C346.108 2.11261 362.715 3.39353 356.433 5.57693Z" fill="url(#blog-title-underline)" />
                      <defs>
                        <linearGradient id="blog-title-underline" x1="357.654" y1="1.02531" x2="-0.0681898" y2="15.13" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FD022D" />
                          <stop offset="0.5" stopColor="#FFB301" />
                          <stop offset="1" stopColor="#58BD0F" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-2 max-w-6xl text-[15px] font-medium leading-[26px] text-muted md:text-[16px]">
              Expert articles on Agile, Scrum, DevOps, Cloud, and career growth. Unlock insights to accelerate your professional journey.
            </p>
          </div>

          {/* Search bar */}
          <div className="mx-auto mb-4 flex max-w-2xl items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearchSubmit(); }}
                placeholder="Search Blogs of your interest"
                className="h-[52px] w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-[15px] text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="btn-brand h-[54px] w-[169px] shrink-0 gap-2 py-4 pr-[26px] pl-[34px]"
            >
              Find Now
              <ArrowRightIcon />
            </button>
          </div>

          {/* Featured slider — hangs ~20% below the hero into the next section */}
          {totalHero > 0 ? (
            <div className="relative z-20 mb-0 translate-y-0 pb-4 md:mb-[-60px] md:translate-y-[10%] md:pb-6">
              <div
                className="pointer-events-none absolute -right-8 -top-12 z-0 h-40 w-40 md:-right-20 md:-top-20 md:h-60 md:w-60 min-[1920px]:-right-28 min-[1920px]:-top-24 min-[1920px]:h-[320px] min-[1920px]:w-[320px]"
                aria-hidden
              >
                <Image
                  src="/images/aero-bg-v2.png"
                  alt=""
                  fill
                  sizes="(min-width: 1920px) 320px, (max-width: 767px) 160px, 240px"
                  className="object-contain"
                />
              </div>
              <div className="interactive-card relative rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_24px_0_rgba(30,41,59,0.08)]" style={{ position: 'relative', zIndex: 20 }}>
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${heroPage * 100}%)` }}
                  >
                    {heroBlogs.map((b) => (
                      <Link
                        key={b.id}
                        href={b.href}
                        className="flex w-full shrink-0 flex-col bg-white md:flex-row"
                      >
                      <div className="interactive-card-media shrink-0 overflow-hidden">
                        <Image
                          src={b.imageSrc}
                          alt={b.imageAlt}
                          width={460}
                          height={290}
                          className="h-[200px] w-full object-cover md:h-[290px] md:w-[460px]"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between p-6 md:p-8">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-brand">{b.tag}</span>
                            <span className="text-brand">•</span>
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-brand">{b.readTime}</span>
                          </div>
                          <h2 className="interactive-card-title mt-3 text-[18px] font-bold leading-[1.4] text-heading md:text-[22px]">{b.title}</h2>
                          <p className="mt-3 line-clamp-3 text-[14px] leading-[1.6] text-muted">{b.excerpt}</p>
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-zinc-100">
                              <Image src={b.author.avatarSrc} alt={b.author.name} fill className="object-cover" sizes="36px" />
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold leading-tight text-heading">{b.author.name}</p>
                              <p className="text-[12px] text-muted">{b.date} · {b.publication}</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand">
                            Read Article
                            <span className="inline-flex items-center">
                              <ArrowRightIcon />
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  </div>
                </div>
              </div>

              {totalHero > 1 ? (
                <div className="mt-4 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setHeroPage((p) => Math.max(0, p - 1))} disabled={heroPage === 0} aria-label="Previous blog" className="disabled:opacity-40">
                    <CarouselNavIcon direction="prev" variant="outline" size={36} />
                  </button>
                  <button type="button" onClick={() => setHeroPage((p) => Math.min(totalHero - 1, p + 1))} disabled={heroPage === totalHero - 1} aria-label="Next blog" className="disabled:opacity-40">
                    <CarouselNavIcon direction="next" variant="filled" size={36} />
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {/* All Blogs Section — top space clears the hanging slider (~20%) */}
      <section ref={allBlogsSectionRef} className="full-bleed relative z-0 bg-white pb-12 pt-12 md:pb-16 md:pt-44 scroll-mt-24">
        <div className="site-container">
          {/* Header */}
          <div className="mb-4 text-center">
            <h2 className="text-[26px] font-bold text-heading md:text-[32px]">All Blogs</h2>
            <p className="mx-auto mt-2 whitespace-nowrap text-[14px] text-muted">
              The most effective project-based immersive learning experience to educate that combines hands-on projects with deep, engaging learning.
            </p>
          </div>

          {/* Category tabs — hidden while a search is active */}
          {!isSearchActive && (
            <div
              role="tablist"
              aria-label="Blog categories"
              className="mt-5 mb-6 flex items-center gap-2 overflow-x-auto rounded-lg bg-surface-raised p-2 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)] [-ms-overflow-style:none] [scrollbar-width:none] md:mt-6 md:flex-wrap md:justify-center lg:justify-between"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategoryUri === null}
                onClick={() => setActiveCategoryUri(null)}
                className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-center text-[13px] font-normal leading-[140%] md:px-4 md:py-2.5 md:text-[16px] ${activeCategoryUri === null ? 'courses-tab-active' : 'btn-mui-brand-tint text-heading'}`}
              >
                All Blogs
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={cat.uri === activeCategoryUri}
                  onClick={() => setActiveCategoryUri(cat.uri)}
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-center text-[13px] font-normal leading-[140%] md:px-4 md:py-2.5 md:text-[16px] ${cat.uri === activeCategoryUri ? 'courses-tab-active' : 'btn-mui-brand-tint text-heading'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Reset (search only, lhs) + Sort */}
          <div className="mb-6 flex items-center gap-3">
            {isSearchActive && (
              <button
                type="button"
                onClick={handleResetSearch}
                title="Clear Search"
                className="btn-brand flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium shadow-none"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                Clear Search
              </button>
            )}
            <label className="ml-auto flex items-center gap-2 text-[13px] text-muted">
              Sort:
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-[13px] font-medium text-heading focus:border-brand focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Blog cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="col-span-3 py-10 text-center text-[14px] text-muted">Loading blogs…</p>
            ) : items.length === 0 ? (
              <p className="col-span-3 py-10 text-center text-[14px] text-muted">No blogs available in this category yet.</p>
            ) : items.map((b) => (
              <Link key={b.id} href={`/blogs/${b.uri}`} className="interactive-card flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
                <div className="interactive-card-media relative h-[180px] w-full">
                  <Image src={b.featureImage?.url ?? DEFAULT_BLOG_IMAGE} alt={b.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-3 flex w-full items-center gap-3">
                      <span
                        className="inline-flex h-[24px] w-[113px] shrink-0 items-center justify-center truncate rounded-[6px] bg-[#FFDEE4] px-2 text-[11px] font-medium leading-normal text-[#1E293B]"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {b.categoryName ?? 'Blog'}
                      </span>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[11px] text-muted">
                          <Image src="/images/eye-ic.png" alt="" width={14} height={14} className="h-[14px] w-[14px] shrink-0 object-contain" aria-hidden />
                          {b.views.toLocaleString()} Views
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-muted">
                          <Image src="/images/time-icon.png" alt="" width={14} height={14} className="h-[14px] w-[14px] shrink-0 object-contain" aria-hidden />
                          {b.readTimeMinutes} Min Read
                        </span>
                      </div>
                    </div>
                    <h3 className="interactive-card-title line-clamp-2 min-h-[42px] text-[15px] font-bold leading-snug text-heading">{b.title}</h3>
                    <p className="mt-2 line-clamp-3 min-h-[62px] text-[13px] leading-[1.6] text-muted">{b.shortDescription}</p>
                    <div className="mb-4 mt-4 border-b border-[#EBEBEB]" aria-hidden />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-zinc-100">
                        <Image src={b.trainerAvatar?.url ?? DEFAULT_AUTHOR_AVATAR} alt={b.trainerName ?? ''} fill className="object-cover" sizes="32px" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-heading">{b.trainerName ?? 'ScaleX Team'}</p>
                        <p className="text-[11px] text-muted">{formatDate(b.createdAt)}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center text-brand">
                      <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-muted">
              Showing {rangeStart}–{rangeEnd} of {total} articles
            </p>

            {totalPages > 1 ? (
              <nav aria-label="Blog pagination" className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={loading || currentPage === 1}
                  aria-label="Previous page"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#E2E8F0] text-heading transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <PageArrowIcon direction="prev" />
                </button>

                {getPageNumbers(currentPage, totalPages).map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-[13px] text-muted">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      onClick={() => goToPage(p)}
                      disabled={loading}
                      aria-current={p === currentPage ? 'page' : undefined}
                      className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[13px] font-medium transition disabled:cursor-not-allowed ${
                        p === currentPage
                          ? 'bg-brand text-white'
                          : 'border border-[#E2E8F0] text-heading hover:border-brand hover:text-brand'
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={loading || currentPage === totalPages}
                  aria-label="Next page"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#E2E8F0] text-heading transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <PageArrowIcon direction="next" />
                </button>
              </nav>
            ) : null}
          </div>
        </div>
      </section>

      <CategoryCoursesSection
        heading="Master the Skills that Scale Your Career"
        maxCourses={12}
        initialVisibleCount={3}
        loadMoreStep={3}
        compactTop
      />

      <GuidanceSection {...defaultGuidanceContent} />
    </>
  );
}
