'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CarouselNavIcon } from '@/components/category/CategoryCarouselNav';
import CategoryExploreAllSection from '@/components/category/CategoryExploreAllSection';
import CategoryCoursesSection from '@/components/category/CategoryCoursesSection';
import { getCoursesForCategorySlug, getCategoryCoursesHeading, CATEGORY_COURSES_SUBHEADING } from '@/lib/categoryCourses';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';

const FEATURED_BLOGS = [
  {
    id: '1',
    tag: 'FEATURED',
    category: 'Agile and Scrum',
    readTime: '8 MIN READ',
    title: 'The Complete Guide to Agile Transformation in Indian Enterprises: 2025 Edition',
    excerpt:
      'Agile transformation is redefining how Indian enterprises deliver value. Learn the frameworks, tools, and best practices that 500+ organizations used to successfully scale Agile across teams.',
    imageSrc: '/images/blog1.png',
    imageAlt: 'Agile Workflow - Scrum Team',
    author: { name: 'Praneeth Kuridi', avatarSrc: '/images/pranee.png' },
    date: 'May 28, 2025',
    publication: 'Edge X Learning',
    href: '/blogs/agile-transformation-guide',
  },
  {
    id: '2',
    tag: 'FEATURED',
    category: 'DevOps',
    readTime: '6 MIN READ',
    title: 'DevOps in 2025: How Indian Tech Teams Are Embracing Continuous Delivery',
    excerpt:
      'From CI/CD pipelines to infrastructure-as-code, discover how leading Indian engineering teams are accelerating releases and reducing downtime through modern DevOps practices.',
    imageSrc: '/images/blog2.png',
    imageAlt: 'DevOps CI/CD pipeline illustration',
    author: { name: 'Narayana Ajay', avatarSrc: '/images/naray.png' },
    date: 'Jun 5, 2025',
    publication: 'ScaleX Insights',
    href: '/blogs/devops-2025',
  },
  {
    id: '3',
    tag: 'FEATURED',
    category: 'Product Management',
    readTime: '10 MIN READ',
    title: 'Product Management Career Roadmap: From Engineer to PM in 12 Months',
    excerpt:
      'Thinking of transitioning into product management? This step-by-step roadmap covers everything — from building your portfolio to acing PM interviews at top product companies.',
    imageSrc: '/images/blog3.png',
    imageAlt: 'Product management career roadmap',
    author: { name: 'Anitha Reddy', avatarSrc: '/images/aninth.png' },
    date: 'Jun 12, 2025',
    publication: 'ScaleX Insights',
    href: '/blogs/pm-career-roadmap',
  },
];

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
    <svg width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

const CATEGORIES = ['All Blogs', 'Agile and Scrum', 'Product Management', 'Interview Bootcamp', 'DevOps', 'Software Testing', 'IT Service & Infrastructure'];

export default function BlogsPage() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Blogs');

  const total = FEATURED_BLOGS.length;
  const blog = FEATURED_BLOGS[page];

  const filteredBlogs = activeCategory === 'All Blogs'
    ? FEATURED_BLOGS
    : FEATURED_BLOGS.filter((b) => b.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section
        className="full-bleed relative pt-10 md:pt-14 pb-10 md:pb-14"
        style={{ background: 'linear-gradient(11deg, rgba(255, 201, 211, 0.15) -2.77%, #F5F6F8 90.42%)', height: '594px', zIndex: 10, position: 'relative' }}
      >
        {/* Decorative ScaleX watermark */}
        <div className="pointer-events-none absolute right-0 top-1/4 z-0 hidden h-[340px] w-[300px] opacity-[0.07] md:block" aria-hidden>
          <Image src="/images/scalex-mark.png" alt="" fill className="object-contain object-right" />
        </div>

        <div className="site-container relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1 transition-colors hover:text-brand" aria-label="Home">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M2.5 7.5L10 1.667L17.5 7.5V17.5H13.333V12.5H6.667V17.5H2.5V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <span className="text-muted" aria-hidden>&gt;</span>
            <span className="font-medium text-brand">Blogs</span>
          </nav>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-[28px] font-bold leading-[1.3] text-heading md:text-[40px] md:font-extrabold md:leading-[60px]">
              Your Gateway to Career Knowledge
            </h1>
            <span className="mt-1 block h-[19px] w-full max-w-[358px] overflow-hidden mx-auto" aria-hidden>
              <span className="inline-block h-[19px] w-[358px] max-w-full origin-left animate-category-title-underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="358" height="19" viewBox="0 0 358 19" fill="none" className="block h-[19px] w-[358px] max-w-full">
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
            <p className="mx-auto mt-4 max-w-2xl text-[15px] font-medium leading-[26px] text-muted md:text-[16px]">
              Expert articles on Agile, Scrum, DevOps, Cloud, and career growth. Unlock insights to accelerate your professional journey.
            </p>
          </div>

          {/* Search bar */}
          <div className="mx-auto mb-10 flex max-w-2xl items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Blogs of your interest"
                className="h-[52px] w-full rounded-xl border border-[#E2E8F0] bg-white pl-11 pr-4 text-[15px] text-heading placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <button
              type="button"
              className="btn-brand inline-flex h-[52px] shrink-0 items-center gap-2 rounded-xl px-6 text-[15px] font-semibold text-white"
            >
              Find Now
              <ArrowRightIcon />
            </button>
          </div>

          {/* Featured slider card */}
          <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_24px_0_rgba(30,41,59,0.08)]" style={{ position: 'relative', zIndex: 20 }}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {FEATURED_BLOGS.map((b) => (
                <div key={b.id} className="flex w-full shrink-0 flex-col md:flex-row">
                  {/* Image */}
                  <div className="shrink-0 overflow-hidden">
                    <Image
                      src="/images/blog.png"
                      alt={b.imageAlt}
                      width={460}
                      height={290}
                      className="h-[290px] w-[460px] object-cover"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-6 md:p-8">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-brand">{b.tag}</span>
                        <span className="text-[#CBD5E1]">•</span>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">{b.readTime}</span>
                      </div>
                      <h2 className="mt-3 text-[18px] font-bold leading-[1.4] text-heading md:text-[22px]">{b.title}</h2>
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
                      <Link href={b.href} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand transition hover:underline">
                        Read Article
                        <ArrowRightIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider controls */}
          <div className="mt-4 flex items-center justify-end gap-3">
            <button type="button" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous blog" className="disabled:opacity-40">
              <CarouselNavIcon direction="prev" variant="outline" size={36} />
            </button>
            <button type="button" onClick={() => setPage((p) => Math.min(total - 1, p + 1))} disabled={page === total - 1} aria-label="Next blog" className="disabled:opacity-40">
              <CarouselNavIcon direction="next" variant="filled" size={36} />
            </button>
          </div>
        </div>
      </section>

      {/* All Blogs Section */}
      <section className="full-bleed bg-white pb-12 md:pb-16 mt-[200px]">
        <div className="site-container">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-[26px] font-bold text-heading md:text-[32px]">All Blogs</h2>
            <p className="mx-auto mt-2 max-w-2xl text-[14px] text-muted">
              The most effective project-based immersive learning experience to educate that combines hands-on projects with deep, engaging learning.
            </p>
          </div>

          {/* Category tabs */}
          <div
            role="tablist"
            aria-label="Blog categories"
            className="mt-8 mb-6 flex items-center gap-2 overflow-x-auto rounded-lg bg-surface-raised p-2 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-10 md:flex-wrap md:justify-center lg:justify-between"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={cat === activeCategory}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2.5 text-center text-[16px] font-medium leading-[140%] ${cat === activeCategory ? 'courses-tab-active' : 'btn-mui-brand-tint text-heading'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="mb-6 flex justify-end">
            <span className="text-[13px] text-muted">Sort: Latest ▾</span>
          </div>

          {/* Blog cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.length === 0 ? (
              <p className="col-span-3 py-10 text-center text-[14px] text-muted">No blogs available in this category yet.</p>
            ) : filteredBlogs.map((b) => (
              <Link key={b.id} href={b.href} className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition hover:shadow-md">
                <div className="relative h-[200px] w-full overflow-hidden">
                  <Image src="/images/blog.png" alt={b.imageAlt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-[#FFF0F3] px-3 py-1 text-[11px] font-semibold text-brand">{b.tag}</span>
                      <span className="flex items-center gap-1 text-[11px] text-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        12,480 Views
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {b.readTime}
                      </span>
                    </div>
                    <h3 className="line-clamp-2 text-[15px] font-bold leading-[1.4] text-heading">{b.title}</h3>
                    <p className="mt-2 line-clamp-3 text-[13px] leading-[1.6] text-muted">{b.excerpt}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-zinc-100">
                        <Image src={b.author.avatarSrc} alt={b.author.name} fill className="object-cover" sizes="32px" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-heading">{b.author.name}</p>
                        <p className="text-[11px] text-muted">{b.date}</p>
                      </div>
                    </div>
                    <span className="text-brand">
                      <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}

          <div className="mt-8 flex items-center justify-between">
            <p className="text-[13px] text-muted">Showing {filteredBlogs.length} of {FEATURED_BLOGS.length}+ articles</p>
            <button type="button" className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand hover:underline">
              View More Blogs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>
      </section>

      <CategoryCoursesSection
        heading="Master the Skills that Scale Your Career"
        subheading={CATEGORY_COURSES_SUBHEADING}
        courses={getCoursesForCategorySlug('agile-and-scrum', 'Agile and Scrum').slice(0, 3)}
        initialVisibleCount={3}
        loadMoreStep={3}
      />

      <div style={{ minHeight: '90vh' }}>
        <GuidanceSection {...defaultGuidanceContent} />
      </div>
    </>
  );
}
