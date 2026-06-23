'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { MegaMenuCategory } from '@/lib/allCoursesMegaMenu';

const TRUSTED_BY_LOGOS = [
  { alt: 'Google', src: '/images/hero/google.png' },
  { alt: 'IBM', src: '/images/hero/ibm.png' },
  { alt: 'Infosys', src: '/images/hero/infosys.png' },
  { alt: 'Stanford', src: '/images/hero/stanford.png' },
  { alt: 'TCS', src: '/images/hero/tcs.png' },
];

function OutlineButtonChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="7"
      viewBox="0 0 13 7"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.50374 7C6.69084 7 6.87795 6.92839 7.00517 6.79244L12.7979 1.11657C12.9251 0.994886 13 0.837425 13 0.658489C13 0.286295 12.7081 0 12.3189 0C12.1318 0 11.9597 0.0715751 11.8325 0.186097L6.09959 5.79038H6.9004L1.16753 0.186097C1.04778 0.0715751 0.875649 0 0.681059 0C0.291882 0 0 0.286295 0 0.658489C0 0.837425 0.0748416 0.994886 0.202073 1.12372L5.99482 6.79244C6.13701 6.92839 6.30915 7 6.50374 7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      aria-hidden
    >
      <path
        d="M0.5 0.5L5 5L0.5 9.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const triggerClass =
  'btn-brand-outline btn-brand-outline-hover-fill header-fluid-text flex h-[40px] w-[133px] shrink-0 items-center justify-center gap-1 cursor-pointer shadow-none';

type MegaMenuPanelProps = {
  categories: MegaMenuCategory[];
  activeCategory: MegaMenuCategory;
  onCategoryHover: (slug: string) => void;
};

function MegaMenuPanel({ categories, activeCategory, onCategoryHover }: MegaMenuPanelProps) {
  return (
    <div className="mx-auto grid w-full max-w-[1300px] grid-cols-[minmax(240px,280px)_minmax(280px,1fr)_minmax(200px,1fr)] bg-white shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]">
      <div className="border-r border-zinc-100 py-6 pl-6 pr-4">
        <p className="mb-4 text-[15px] font-bold text-heading">Category</p>
        <ul className="space-y-0.5" role="list">
          {categories.map((category) => {
            const isActive = category.slug === activeCategory.slug;
            return (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  onMouseEnter={() => onCategoryHover(category.slug)}
                  className={`header-fluid-text flex items-center justify-between gap-2 rounded-md px-3 py-2.5 font-medium ${
                    isActive
                      ? 'btn-mui-filled-surface bg-brand text-white'
                      : 'btn-mui-nav-link text-ink'
                  }`}
                >
                  <span className="min-w-0 truncate">{category.label}</span>
                  <ChevronRight
                    className={`h-2.5 w-1.5 shrink-0 ${isActive ? 'text-white' : 'text-ink/50'}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex min-h-[320px] flex-col border-r border-zinc-100 px-6 py-6">
        <p className="mb-4 text-[15px] font-bold text-heading">Course</p>
        {activeCategory.courses.length === 0 ? (
          <p className="header-fluid-text flex-1 px-2 py-2 text-ink/50">No courses available</p>
        ) : (
          <>
            <ul className="flex-1 space-y-0.5" role="list">
              {activeCategory.courses.map((course) => (
                <li key={course.label}>
                  <Link
                    href={course.href}
                    className="btn-mui-nav-link header-fluid-text block px-2 py-2 font-normal text-ink"
                  >
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={activeCategory.href}
              className="header-fluid-text mt-4 inline-flex items-center gap-1.5 font-semibold text-brand transition hover:underline"
            >
              View All Courses
              <span aria-hidden>&raquo;</span>
            </Link>
          </>
        )}
      </div>

      <div className="py-6 pr-6 pl-6">
        <p className="mb-4 text-[15px] font-bold text-heading">Trusted By</p>
        <ul className="grid grid-cols-2 gap-3" role="list">
          {TRUSTED_BY_LOGOS.map((logo) => (
            <li
              key={logo.alt}
              className="flex h-16 items-center justify-center px-3"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={96}
                height={32}
                className="h-7 w-auto object-contain opacity-80"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AllCoursesMegaMenu({ categories }: { categories: MegaMenuCategory[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? '');
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCategory = categories.find((c) => c.slug === activeSlug) ?? categories[0];

  const hasCategories = categories.length > 0 && !!activeCategory;

  const handleOpen = () => {
    if (!hasCategories) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveSlug(categories[0]?.slug ?? '');
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(handleClose, 120);
  };

  return (
    <div
      className="relative hidden min-[1200px]:block"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={triggerClass}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="All Courses menu"
      >
        All Courses
        <OutlineButtonChevron
          className={`shrink-0 text-current transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {hasCategories && (
        <div
          className={`fixed inset-x-0 top-16 z-50 ${
            isOpen ? 'visible' : 'invisible pointer-events-none'
          }`}
          role="menu"
          aria-label="All Courses"
          aria-hidden={!isOpen}
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
        >
          {/* Invisible bridge only — keeps hover path, no visible gap */}
          <div className="absolute -top-3 left-0 right-0 h-3" aria-hidden />
          <MegaMenuPanel categories={categories} activeCategory={activeCategory!} onCategoryHover={setActiveSlug} />
        </div>
      )}
    </div>
  );
}
