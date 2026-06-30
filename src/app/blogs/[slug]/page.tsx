'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import CategoryCoursesSection from '@/components/category/CategoryCoursesSection';
import { getCoursesForCategorySlug, CATEGORY_COURSES_SUBHEADING } from '@/lib/categoryCourses';

// ─── Icons ────────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="#FF002C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Blog detail data (static for now) ────────────────────────────────────────

const BLOG = {
  slug: 'csm-vs-psm',
  category: 'Agile & Scrum',
  title: 'CSM vs PSM: Which Scrum Certification Should You Choose in 2026?',
  excerpt:
    'A complete comparison of Certified Scrum Master and Professional Scrum Master — covering exam format, cost, career impact, and which one to choose based on your role.',
  author: {
    name: 'Ravi Shankar',
    role: 'Chief Learning Officer, Scale X Learning',
    avatarSrc: '/images/pranee.png',
  },
  date: 'Jun 3, 2025',
  views: '12,480 Views',
  readTime: '9 min read',
  imageSrc: '/images/blog.png',
  imageAlt: 'CSM vs PSM Scrum Certifications',
};

const RELATED_BLOGS = [
  {
    id: 'r1',
    category: 'Agile & Scrum',
    title: 'The Complete Guide to Agile Transformation in Indian Enterprises: 2025 Edition',
    excerpt: 'Agile transformation is redefining how Indian enterprises deliver value. Learn the frameworks, tools, and best practices.',
    imageSrc: '/images/blog.png',
    author: 'Praneeth Kuridi',
    date: 'May 28, 2025',
    readTime: '8 min read',
    href: '/blogs/agile-transformation-guide',
  },
  {
    id: 'r2',
    category: 'DevOps',
    title: 'DevOps in 2025: How Indian Tech Teams Are Embracing Continuous Delivery',
    excerpt: 'From CI/CD pipelines to infrastructure-as-code, discover how leading Indian engineering teams are accelerating releases.',
    imageSrc: '/images/blog.png',
    author: 'Narayana Ajay',
    date: 'Jun 5, 2025',
    readTime: '6 min read',
    href: '/blogs/devops-2025',
  },
  {
    id: 'r3',
    category: 'Product Management',
    title: 'Product Management Career Roadmap: From Engineer to PM in 12 Months',
    excerpt: 'Thinking of transitioning into product management? This step-by-step roadmap covers everything.',
    imageSrc: '/images/blog.png',
    author: 'Anitha Reddy',
    date: 'Jun 12, 2025',
    readTime: '10 min read',
    href: '/blogs/pm-career-roadmap',
  },
];

const TRENDING_BLOGS = [
  {
    id: 't1',
    category: 'Agile & Scrum',
    views: '12,480 Views',
    readTime: '9 min read',
    title: 'CSM vs PSM: Which Scrum Certification Should You Choose in 2026?',
    excerpt: 'Both CSM and PSM are globally respected. We break down differences, costs, pass rates, and career outcomes.',
    imageSrc: '/images/blog.png',
    author: { name: 'Ravi Shankar', avatarSrc: '/images/pranee.png', date: 'Jun 3, 2026' },
    href: '/blogs/csm-vs-psm',
  },
  {
    id: 't2',
    category: 'Agile & Scrum',
    views: '12,480 Views',
    readTime: '9 min read',
    title: 'DevOps Roadmap for 2026: Tools, Skills, and Certifications You Need',
    excerpt: 'Both CSM and PSM are globally respected. We break down differences, costs, pass rates, and career outcomes.',
    imageSrc: '/images/blog.png',
    author: { name: 'Ravi Shankar', avatarSrc: '/images/aninth.png', date: 'Jun 3, 2026' },
    href: '/blogs/devops-2025',
  },
  {
    id: 't3',
    category: 'Agile & Scrum',
    views: '12,480 Views',
    readTime: '9 min read',
    title: 'PMP Exam 2026: New Format, Predictive vs. Agile Questions, and Study Plan',
    excerpt: 'Both CSM and PSM are globally respected. We break down differences, costs, pass rates, and career outcomes.',
    imageSrc: '/images/blog.png',
    author: { name: 'Ravi Shankar', avatarSrc: '/images/naray.png', date: 'Jun 3, 2026' },
    href: '/blogs/pmp-exam-2026',
  },
  {
    id: 't4',
    category: 'DevOps',
    views: '8,200 Views',
    readTime: '7 min read',
    title: 'CI/CD Pipeline Best Practices for Growing Engineering Teams in 2026',
    excerpt: 'Both CSM and PSM are globally respected. We break down differences, costs, pass rates, and career outcomes.',
    imageSrc: '/images/blog.png',
    author: { name: 'Ravi Shankar', avatarSrc: '/images/pranee.png', date: 'Jun 3, 2026' },
    href: '/blogs/cicd-best-practices',
  },
];

function BlogCard({ blog }: { blog: typeof TRENDING_BLOGS[0] }) {
  return (
    <Link
      href={blog.href}
      className="group flex w-full flex-col rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{ minWidth: 0 }}
    >
      <div className="relative h-[200px] overflow-hidden shrink-0">
        <Image src={blog.imageSrc} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-[#FFF0F3] px-3 py-1 text-[12px] font-semibold text-brand">{blog.category}</span>
          <span className="flex items-center gap-1 text-[12px] text-muted"><EyeIcon /> {blog.views}</span>
          <span className="flex items-center gap-1 text-[12px] text-muted"><ClockIcon /> {blog.readTime}</span>
        </div>
        <h3 className="text-[15px] font-bold text-heading leading-snug line-clamp-2 group-hover:text-brand transition-colors mb-2">{blog.title}</h3>
        <p className="text-[13px] text-muted line-clamp-2 flex-1">{blog.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={blog.author.avatarSrc} alt={blog.author.name} width={32} height={32} className="rounded-full object-cover" />
            <div>
              <p className="text-[13px] font-semibold text-heading">{blog.author.name}</p>
              <p className="text-[11px] text-muted">{blog.author.date}</p>
            </div>
          </div>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0F3] text-brand group-hover:bg-brand group-hover:text-white transition-colors">
            <svg width="14" height="12" viewBox="0 0 18 15" fill="currentColor">
              <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function TrendingBlogsSection() {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setPerPage(1);
      else if (window.innerWidth < 1024) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const total = TRENDING_BLOGS.length;
  const maxIndex = Math.max(0, total - perPage);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="full-bleed bg-[#F5F6F8] py-12 md:py-16">
      <div className="site-container">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-[24px] font-extrabold text-heading md:text-[36px]">
            Trending Blogs that enhance your skills
          </h2>
          <p className="mt-2 text-[15px] text-muted">Find the right course that leaps your career</p>
        </div>

        {/* Slider track */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${index} * (100% / ${perPage} + (${perPage - 1} * 1.5rem / ${perPage}))))` }}
          >
            {TRENDING_BLOGS.map((blog) => (
              <div key={blog.id} className="shrink-0" style={{ width: `calc((100% - ${(perPage - 1) * 24}px) / ${perPage})` }}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-brand disabled:opacity-30 hover:bg-brand hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={index >= maxIndex}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white disabled:opacity-30 hover:bg-brand/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { label: 'What is CSM?',                href: '#what-is-csm',     id: 'what-is-csm' },
  { label: 'What is PSM?',                href: '#what-is-psm',     id: 'what-is-psm' },
  { label: 'CSM vs PSM: Key Differences', href: '#key-differences', id: 'key-differences' },
  { label: 'Exam Format & Difficulty',    href: '#exam-format',     id: 'exam-format' },
  { label: 'Cost Comparison (India)',     href: '#cost-comparison', id: 'cost-comparison' },
  { label: 'Career Impact',              href: '#career-impact',   id: 'career-impact' },
  { label: 'Which Should You Choose?',   href: '#which-to-choose', id: 'which-to-choose' },
];

export default function BlogDetailPage() {
  const [readProgress, setReadProgress] = useState(0);
  const [activeId, setActiveId] = useState('what-is-csm');

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setReadProgress(Math.min(100, progress));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="full-bleed relative"
        style={{
          background: 'linear-gradient(83deg, #0D0D0D -37.91%, #161A26 28%, #FF002C 212.06%)',
        }}
      >
        {/* Watermark */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[180px] font-black leading-none text-white/[0.03]"
        >
          BLOG
        </span>

        <div className="site-container relative z-10 py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="Home">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </Link>
            <span className="text-white/40">&gt;</span>
            <Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link>
            <span className="text-white/40">&gt;</span>
            <span className="text-[#FF002C] font-medium">CSM vs PSM</span>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
            {/* Left content */}
            <div className="flex-1">
              {/* Category badge */}
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur-sm mb-5">
                {BLOG.category}
              </span>

              {/* Title */}
              <h1 className="text-[22px] font-extrabold leading-[1.2] text-white md:text-[32px] lg:text-[40px]">
                {BLOG.title}
              </h1>

              {/* Excerpt */}
              <p className="mt-4 text-[15px] leading-[1.7] text-white/70 md:text-[16px]">
                {BLOG.excerpt}
              </p>

              {/* Author + meta */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={BLOG.author.avatarSrc}
                    alt={BLOG.author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover ring-2 ring-white/20"
                  />
                  <div>
                    <p className="text-[14px] font-semibold text-white">{BLOG.author.name}</p>
                    <p className="text-[12px] text-white/50">{BLOG.author.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[13px] text-white/60">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    {BLOG.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <EyeIcon />
                    {BLOG.views}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon />
                    {BLOG.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Right image — flush to container right edge */}
            <div className="hidden shrink-0 lg:block" style={{ width: '460px', height: '380px' }}>
              <Image
                src={BLOG.imageSrc}
                alt={BLOG.imageAlt}
                width={460}
                height={380}
                className="h-full w-full rounded-2xl object-cover shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Three-column layout ───────────────────────────────────────────────── */}
      <section className="full-bleed py-12 md:py-16" style={{ background: '#F5F6F8' }}>
        <div className="site-container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">

            {/* ── LEFT SIDEBAR ─────────────────────────────────────────────────── */}
            <aside className="hidden lg:block lg:w-[240px] shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100">
                    <span className="text-[16px]">📋</span>
                    <h3 className="text-[14px] font-bold text-heading">Table of Contents</h3>
                  </div>

                  {/* Items */}
                  <nav>
                    {TOC_ITEMS.map(({ label, href, id }, i) => {
                      const isActive = activeId === id;
                      return (
                        <a
                          key={id}
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(id);
                            if (el) {
                              const offset = 100;
                              const top = el.getBoundingClientRect().top + window.scrollY - offset;
                              window.scrollTo({ top, behavior: 'smooth' });
                            }
                          }}
                          className={`flex items-center gap-3 px-4 py-3 text-[13px] transition-colors border-b border-zinc-100 last:border-b-0 ${
                            isActive
                              ? 'border-l-[3px] border-l-brand bg-[#FFF5F6] font-bold text-heading'
                              : 'border-l-[3px] border-l-transparent text-muted hover:bg-zinc-50'
                          }`}
                        >
                          <span className={`shrink-0 text-[12px] font-bold w-5 ${isActive ? 'text-brand' : 'text-zinc-400'}`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="leading-snug">{label}</span>
                        </a>
                      );
                    })}
                  </nav>

                  {/* Progress bar */}
                  <div className="px-4 py-3 border-t border-zinc-100">
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand transition-all duration-200"
                        style={{ width: `${readProgress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted">{readProgress}% read</p>
                  </div>
                </div>

                {/* Social share */}
                <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
                  <p className="text-[14px] font-bold text-heading mb-4">Share This Article</p>
                  <div className="flex items-center justify-between">
                    {/* WhatsApp */}
                    <button className="hover:scale-110 transition-transform" aria-label="Share on WhatsApp">
                      <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="22" r="22" fill="#25D366"/>
                        <path d="M30.5 13.5A11.9 11.9 0 0022 10C15.37 10 10 15.37 10 22c0 2.12.56 4.18 1.62 6L10 34l6.18-1.6A12 12 0 0022 34c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.5-8.5zm-8.5 18.4a9.93 9.93 0 01-5.07-1.38l-.36-.22-3.74.98 1-3.65-.24-.38A9.94 9.94 0 0112 22c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.48-7.48c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" fill="white"/>
                      </svg>
                    </button>
                    {/* Instagram */}
                    <button className="hover:scale-110 transition-transform" aria-label="Share on Instagram">
                      <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="22" r="22" fill="url(#ig-grad)"/>
                        <defs>
                          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                            <stop offset="0%" stopColor="#fdf497"/>
                            <stop offset="5%" stopColor="#fdf497"/>
                            <stop offset="45%" stopColor="#fd5949"/>
                            <stop offset="60%" stopColor="#d6249f"/>
                            <stop offset="90%" stopColor="#285AEB"/>
                          </radialGradient>
                        </defs>
                        <rect x="13" y="13" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5" fill="none"/>
                        <circle cx="22" cy="22" r="4" stroke="white" strokeWidth="1.5" fill="none"/>
                        <circle cx="27.5" cy="16.5" r="1" fill="white"/>
                      </svg>
                    </button>
                    {/* Facebook */}
                    <button className="hover:scale-110 transition-transform" aria-label="Share on Facebook">
                      <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="22" r="22" fill="#1877F2"/>
                        <path d="M28 14h-3a5 5 0 00-5 5v3h-3v4h3v8h4v-8h3l1-4h-4v-3a1 1 0 011-1h3v-4z" fill="white"/>
                      </svg>
                    </button>
                    {/* X / Twitter */}
                    <button className="hover:scale-110 transition-transform" aria-label="Share on X">
                      <svg width="32" height="32" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="22" r="22" fill="#0F0F0F"/>
                        <path d="M24.2 20.7L31 13h-1.6l-5.9 6.8L18.8 13H13l7.1 10.3L13 31h1.6l6.2-7.2 5 7.2H32L24.2 20.7zm-2.2 2.6l-.7-1L15.2 14.2h2.4l4.6 6.6.7 1 6 8.6h-2.4l-4.5-6.6-.02-.03z" fill="white"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100">
                    <span className="text-[16px]">📚</span>
                    <h3 className="text-[14px] font-bold text-heading">Related Articles</h3>
                  </div>
                  {/* Items */}
                  <div className="divide-y divide-zinc-100">
                    {[
                      { tag: 'Agile & Scrum', title: 'What is Scrum? A Complete Guide for 2025', href: '#' },
                      { tag: 'Certification', title: 'How to Pass the CSM Exam in 7 Days', href: '#' },
                      { tag: 'Project Mgmt', title: 'PMP vs PRINCE2: Which Project Mgmt Cert?', href: '#' },
                    ].map((r) => (
                      <Link key={r.title} href={r.href} className="block px-4 py-3 group hover:bg-zinc-50 transition-colors">
                        <span className="inline-block rounded-full bg-[#FFF0F3] px-3 py-1 mb-2" style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '9px', fontWeight: 500, lineHeight: 'normal' }}>
                          {r.tag}
                        </span>
                        <p className="group-hover:text-brand transition-colors line-clamp-2" style={{ color: '#1E293B', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, lineHeight: 'normal' }}>
                          {r.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── ARTICLE (middle) ─────────────────────────────────────────────── */}
            <article className="min-w-0 flex-1">
              {/* Blog content */}
              <div className="max-w-none space-y-6 text-[15px] leading-[1.8] text-muted">

                {/* Intro paragraph */}
                <p>
                  Choosing between the CSM and PSM certification is one of the most common questions professionals ask when starting their Agile journey. Both are highly respected globally, but they differ in governing body, exam format, renewal requirements, and how employers perceive them. In this guide, we break down every difference to help you make the right choice for your career.
                </p>

                {/* What is CSM */}
                <div>
                  <h2 id="what-is-csm" className="text-[22px] font-extrabold text-heading mb-1">What is CSM? (Certified Scrum Master)</h2>
                  <div className="w-10 h-[3px] bg-brand rounded-full mb-4" />
                  <p>
                    The Certified Scrum Master (CSM) is offered by Scrum Alliance — one of the oldest and largest Agile certification governing bodies in the world. To earn the CSM, you must attend a 2-day live training with a Certified Scrum Trainer (CST) and pass a 50-question online exam with a 74% passing score.
                  </p>
                  <p className="mt-3">
                    CSM holders receive 2 years of Scrum Alliance membership and must renew by earning Scrum Education Units (SEUs). Scale X Learning is an official Scrum Alliance Registered Education Ally (REA) and offers CSM certification programs with globally certified trainers.
                  </p>
                  {/* Quick Fact callout */}
                  <div className="mt-4 px-4 py-3" style={{ borderRadius: '12px', border: '1px solid rgba(14, 165, 233, 0.30)', borderLeft: '4px solid #0EA5E9', background: '#E0F2FE' }}>
                    <div>
                      <p className="mb-1" style={{ color: '#0EA5E9', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, lineHeight: 'normal' }}>⚡ Quick Fact</p>
                      <p style={{ color: '#46505F', fontFamily: 'Inter', fontSize: '14px', fontWeight: 400, lineHeight: 'normal' }}>
                        CSM is the most widely recognized Scrum certification globally, with over 1.1 million CSM holders as of 2025.
                      </p>
                    </div>
                  </div>
                </div>

                {/* What is PSM */}
                <div>
                  <h2 id="what-is-psm" className="text-[22px] font-extrabold text-heading mb-1">What is PSM? (Professional Scrum Master)</h2>
                  <div className="w-10 h-[3px] bg-brand rounded-full mb-4" />
                  <p>
                    The Professional Scrum Master (PSM) is offered by Scrum.org — a platform founded by Scrum co-creator Ken Schwaber. Unlike CSM, PSM does not require attending a formal training course. You can self-study and register directly for the exam, making it more accessible and cost-effective.
                  </p>
                  <p className="mt-3">
                    PSM has three levels: PSM I, PSM II, and PSM III, allowing practitioners to demonstrate progressively deeper Scrum mastery. The PSM I exam has a rigorous 85% passing threshold with 80 questions in 60 minutes.
                  </p>
                </div>

                {/* CSM vs PSM Key Differences */}
                <div>
                  <h2 id="key-differences" className="text-[22px] font-extrabold text-heading mb-1">CSM vs PSM: Key Differences</h2>
                  <div className="w-10 h-[3px] bg-brand rounded-full mb-4" />
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="bg-[#1A1A2E] text-left">
                          <th className="px-4 py-3 font-semibold text-white">Criteria</th>
                          <th className="px-4 py-3 font-semibold text-white">CSM (Scrum Alliance)</th>
                          <th className="px-4 py-3 font-semibold text-white">PSM (Scrum.org)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {[
                          ['Governing Body', 'Scrum Alliance', 'Scrum.org'],
                          ['Training Required', 'Yes (2-day live)', 'No (self-study OK)'],
                          ['Exam Questions', '50 questions', '80 questions'],
                          ['Passing Score', '74% (37/50)', '85% (68/80)'],
                          ['Cost (India)', '₹35,000–₹55,000', '$150 (~₹12,500)'],
                          ['Validity', '2 years (renew)', 'Lifetime (no renewal)'],
                          ['Renewal Required', 'Yes (SEUs)', 'No'],
                          ['Brand Recognition', 'Very High (India & Global)', 'High (Tech companies)'],
                          ['Best For', 'Corporate/Enterprise roles', 'Tech-first, startups'],
                        ].map(([factor, csm, psm]) => (
                          <tr key={factor} className="hover:bg-zinc-50">
                            <td className="px-4 py-2.5 font-semibold text-heading">{factor}</td>
                            <td className="px-4 py-2.5 text-muted">{csm}</td>
                            <td className="px-4 py-2.5 text-muted">{psm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Exam Format & Difficulty */}
                <div>
                  <h2 id="exam-format" className="text-[22px] font-extrabold text-heading mb-1">Exam Format &amp; Difficulty</h2>
                  <div className="w-10 h-[3px] bg-brand rounded-full mb-4" />
                  <p>
                    The CSM exam is considered moderate in difficulty. It tests your conceptual understanding of Scrum values, artifacts, events, and roles. Most candidates who attend the 2-day training pass on their first attempt.
                  </p>
                  <p className="mt-4 font-bold text-heading">PSM I Difficulty</p>
                  <p className="mt-1">
                    PSM I is harder than CSM. The 85% pass threshold and time pressure (80 questions in 60 minutes) require deep conceptual understanding of the Scrum Guide. Many candidates report needing 2–3 weeks of self-study beyond the guide to pass comfortably.
                  </p>
                </div>

                {/* Cost Comparison */}
                <div>
                  <h2 id="cost-comparison" className="text-[22px] font-extrabold text-heading mb-1">Cost Comparison in India</h2>
                  <div className="w-10 h-[3px] bg-brand rounded-full mb-4" />
                  <p>
                    Cost is often a deciding factor for Indian professionals. Here is a clear breakdown of what you will spend for each certification path:
                  </p>
                  {/* EdgeX Insight callout */}
                  <div className="mt-4 px-4 py-3" style={{ borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.30)', borderLeft: '4px solid #22C55E', background: 'rgba(220, 252, 231, 0.50)' }}>
                    <p className="text-[12px] font-bold text-green-700 mb-1">💡 EdgeX Insight</p>
                    <p className="text-[13px] text-green-900 leading-relaxed">
                      Scale X Learning offers CSM certification programs starting at ₹12,999 with EMI options, exclusive study materials, and 100% exam pass guarantee. The total ROI on CSM in India is typically achieved within 3 months of earning the certification.
                    </p>
                  </div>
                </div>

                {/* Career Impact */}
                <div>
                  <h2 id="career-impact" className="text-[22px] font-extrabold text-heading mb-1">Career Impact &amp; Salary Data</h2>
                  <div className="w-10 h-[3px] bg-brand rounded-full mb-4" />
                  <p>
                    Both certifications command salary premiums in India, but the magnitude varies by industry and role. Based on salary data from 500+ Scale X alumni who earned Scrum certifications in 2024–25:
                  </p>
                  <ul className="mt-3 space-y-2 list-none">
                    {[
                      'CSM holders earn an average of ₹12.4 LPA',
                      'PSM I holders earn an average of ₹13.1 LPA',
                      'Holding both increases average compensation to ₹15.8 LPA',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Which Should You Choose */}
                <div>
                  <h2 id="which-to-choose" className="text-[22px] font-extrabold text-heading mb-1">Which Should You Choose?</h2>
                  <div className="w-10 h-[3px] bg-brand rounded-full mb-4" />
                  <p>
                    If you&apos;re starting out and want structured learning, go with <strong className="text-heading">CSM</strong>. If you want a rigorous, cost-effective, lifetime credential, choose <strong className="text-heading">PSM I</strong>. Either way, the Scrum Master role is one of the most in-demand positions in India&apos;s Agile landscape — and either certification will open doors.
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {['Scrum', 'Agile', 'CSM', 'PSM', 'Certification', 'Career'].map((tag) => (
                  <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-[12px] font-medium text-muted hover:bg-[#FFF0F3] hover:text-brand cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author card */}
              <div className="mt-8 rounded-2xl bg-[#0D0D0D] p-5">
                {/* Top row */}
                <div className="flex items-center gap-3">
                  <Image
                    src={BLOG.author.avatarSrc}
                    alt={BLOG.author.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-bold text-white">{BLOG.author.name}</p>
                    <p className="text-[13px] text-white/50 mt-0.5">Chief Learning Officer &nbsp;•&nbsp; 38 Articles Published</p>
                  </div>
                  <span className="shrink-0 flex items-center gap-1.5 rounded-full bg-brand px-4 py-1.5 text-[13px] font-semibold text-white">
                    ✏️ Author
                  </span>
                </div>
                {/* Divider */}
                <div className="mt-4 mb-4 h-px bg-white/10" />
                {/* Bio */}
                <p className="text-[14px] text-white/70 leading-[1.7]">
                  Ravi Shankar is a Certified Scrum Trainer (CST) and PMP-certified professional with 12+ years of experience in Agile transformation, enterprise training, and career coaching. He has trained over 5,000 professionals across India, UAE, and Singapore, helping them earn globally recognised certifications and accelerate their careers.
                </p>
              </div>
            </article>

            {/* ── RIGHT SIDEBAR ─────────────────────────────────────────────────── */}
            <aside className="hidden lg:block lg:w-[240px] shrink-0">
              <div className="sticky top-24 space-y-5">
                {/* Lead form */}
                <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm">
                  <h3 className="text-[14px] font-bold text-heading mb-4">Let us assist you</h3>
                  <div className="space-y-3">
                    <input type="text" placeholder="Full Name" className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-[13px] text-heading placeholder-zinc-400 focus:border-brand focus:outline-none" />
                    <input type="email" placeholder="Email ID" className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-[13px] text-heading placeholder-zinc-400 focus:border-brand focus:outline-none" />
                    <input type="tel" placeholder="Contact Number" className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-[13px] text-heading placeholder-zinc-400 focus:border-brand focus:outline-none" />
                    <select className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-[13px] text-zinc-400 focus:border-brand focus:outline-none bg-white">
                      <option value="" disabled selected>Purpose</option>
                      <option>Course Enquiry</option>
                      <option>Career Guidance</option>
                      <option>Corporate Training</option>
                      <option>Other</option>
                    </select>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 accent-brand" />
                      <span className="text-[11px] text-muted leading-relaxed">I agree to ScaleX&apos;s Terms &amp; Conditions &amp; Privacy Policy.</span>
                    </label>
                    <button className="w-full rounded-lg bg-brand py-2.5 text-[13px] font-semibold text-white hover:bg-brand/90 transition-colors flex items-center justify-center gap-2">
                      Talk To Us
                      <svg width="14" height="14" viewBox="0 0 18 15" fill="currentColor"><path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z"/></svg>
                    </button>
                  </div>
                </div>

                {/* Course card */}
                <div className="relative overflow-hidden p-5" style={{ width: '246px', height: '180px', borderRadius: '20px', border: '1px solid #EBEBEB', background: '#0D0D0D', boxShadow: '0 4px 4px 0 rgba(30, 41, 59, 0.08), 0 4px 4px 0 rgba(30, 41, 59, 0.03)' }}>

                  {/* Text content */}
                  <div className="relative z-10">
                    <p className="text-[13px] font-bold text-white leading-snug mb-1.5">
                      Explore Scrum Master Certification
                    </p>
                    <p className="text-[11px] text-white/50 leading-relaxed mb-3">
                      Upon course completion, you will earn an expertise and certificate
                    </p>
                    <Link
                      href="/categories/agile-and-scrum"
                      className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-brand/90 transition-colors"
                    >
                      Explore Now
                    </Link>
                  </div>

                  {/* Mentorship cross icon — behind person */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 51 55"
                    fill="none"
                    aria-hidden
                    className="absolute bottom-0 right-0 z-10"
                    style={{ width: '50px', height: '55px' }}
                  >
                    <g opacity="0.2">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.2891 16.172L31.4723 39.5205H38.7234L17.1774 16.172H10.2891Z" fill="white" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M34.1782 8.35467L7.9832 45.3972C7.27763 46.3949 7.12952 46.6017 6.9781 46.8183C6.82667 47.0348 6.72953 47.1797 6.58669 47.402C6.44385 47.6243 6.30878 47.8398 5.65367 48.8714L2.79659 53.3702C2.59095 53.694 2.68683 54.1232 3.01074 54.3287C3.29269 54.5077 3.6621 54.4607 3.8903 54.217L7.59881 50.2557C8.41299 49.386 8.57876 49.2108 8.74799 49.0287C8.91723 48.8467 9.02347 48.7287 9.18688 48.5414C9.3503 48.3541 9.50722 48.1709 10.2872 47.2705L39.64 13.3844C40.0335 12.9301 40.3943 12.4486 40.7199 11.9436C41.2022 11.1963 41.4713 11.3602 41.5276 12.4356C41.567 13.1855 41.6208 14.2117 41.689 15.5142C41.7826 17.2984 43.3053 18.669 45.0901 18.5755C46.8749 18.482 48.2459 16.9598 48.1524 15.1755L47.5759 4.17861C47.5712 4.08941 47.5675 4.00016 47.5647 3.91088C47.5103 2.17101 47.2088 1.11412 46.6603 0.740234C45.2264 -0.237205 42.1681 0.334554 41.3314 0.482466C40.1617 0.689244 36.023 1.30099 28.9154 2.3177C27.3892 2.53602 26.329 3.94986 26.5473 5.47559C26.5597 5.56198 26.5761 5.64775 26.5965 5.7326L26.612 5.79697C27.0063 7.4367 28.6082 8.48717 30.2698 8.19565L33.1272 7.69423C33.1902 7.68317 33.2532 7.67164 33.316 7.65963C33.9034 7.54715 34.2561 7.53296 34.374 7.61686C34.4977 7.70494 34.4325 7.95088 34.1782 8.35467Z" fill="white" />
                    </g>
                  </svg>

                  {/* Person image — in front of arrow */}
                  <div className="absolute bottom-0 right-0 z-20" style={{ width: '87px', height: '76.765px' }}>
                    <Image
                      src="/images/person-3.png"
                      alt="Course instructor"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>


      {/* ── Courses ───────────────────────────────────────────────────────────── */}
      <CategoryCoursesSection
        heading="Popular Courses that Scale Your Career"
        subheading={CATEGORY_COURSES_SUBHEADING}
        courses={getCoursesForCategorySlug('agile-and-scrum', 'Agile and Scrum').slice(0, 3)}
        initialVisibleCount={3}
        loadMoreStep={3}
        sectionClassName="full-bleed relative z-0 overflow-visible bg-[#F5F6F8] pb-10 pt-4 md:pb-12 md:pt-6"
      />

      {/* ── Trending Blogs ───────────────────────────────────────────────────── */}
      <TrendingBlogsSection />

      {/* ── Guidance ──────────────────────────────────────────────────────────── */}
      <div style={{ minHeight: '90vh' }}>
        <GuidanceSection {...defaultGuidanceContent} />
      </div>
    </>
  );
}
