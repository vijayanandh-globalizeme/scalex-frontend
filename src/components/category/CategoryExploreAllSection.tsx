'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';
import { EXPLORE_ALL_CATEGORIES, type ExploreCategoryItem } from '@/lib/categoryPageSections';

function CategoryCircleIcon({ fill, className }: { fill: string; className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      aria-hidden
    >
      <circle cx="23" cy="23" r="23" fill={fill} />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      className="relative z-10"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 7.5V6a2 2 0 012-2h4a2 2 0 012 2v1.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7.5h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2z"
        stroke="white"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M5 11.5h14" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CategoryIcon({ fill }: { fill: string }) {
  return (
    <span className="relative inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center">
      <CategoryCircleIcon fill={fill} className="absolute inset-0 h-full w-full" />
      <BriefcaseIcon />
    </span>
  );
}

function ExploreArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#explore-category-arrow-clip)">
        <path
          d="M0.185621 9.81207C0.429805 10.0559 0.766385 10.0694 1.01717 9.81207L7.71568 2.9445L9.062 1.4545C9.28643 1.22423 9.28643 0.919448 9.06862 0.70272C8.85081 0.479221 8.54725 0.472449 8.3295 0.70272L6.87756 2.08436L0.185621 8.95868C-0.0651623 9.21605 -0.0585627 9.5615 0.185621 9.81207ZM8.55387 5.00341V7.50255C8.55387 7.82767 8.83101 8.11889 9.15445 8.11889C9.47119 8.11889 9.75496 7.84799 9.75496 7.4755L9.7484 0.668858C9.7484 0.276039 9.49761 0.0119019 9.10822 0.0119019H2.46907C2.09949 0.0119019 1.84871 0.296358 1.84871 0.621449C1.84871 0.946544 2.13249 1.22423 2.44267 1.22423H4.73931L8.71227 1.08877L8.55387 5.00341Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="explore-category-arrow-clip">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function CategoryCard({ item }: { item: ExploreCategoryItem }) {
  return (
    <Link
      href={item.href}
      prefetch
      className="group flex items-center gap-4 rounded-xl border border-zinc-100/80 bg-white p-5 shadow-[0_4px_14px_-4px_rgba(30,41,59,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(30,41,59,0.16)]"
    >
      <CategoryIcon fill={item.iconBg} />
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-bold leading-snug text-heading">{item.label}</span>
        <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-medium text-muted transition group-hover:text-subtle">
          Explore
          <ExploreArrowIcon className="btn-arrow-icon shrink-0" />
        </span>
      </span>
    </Link>
  );
}

const PAGE_SIZE = 8;

function usePrefetchCategoryRoutes(hrefs: string[]) {
  const router = useRouter();
  useEffect(() => {
    const unique = [...new Set(hrefs)];
    for (const href of unique) {
      router.prefetch(href);
    }
  }, [hrefs, router]);
}

export default function CategoryExploreAllSection() {
  const { heading, subheading, items } = EXPLORE_ALL_CATEGORIES;
  const [page, setPage] = useState(0);
  const [, startTransition] = useTransition();
  const pages = useMemo(() => chunkPages(items, PAGE_SIZE), [items]);
  const totalPages = pages.length;
  const categoryHrefs = useMemo(() => items.map((item) => item.href), [items]);
  usePrefetchCategoryRoutes(categoryHrefs);

  return (
    <section
      className="full-bleed bg-surface pb-14 pt-14 md:pb-20 md:pt-16"
      aria-labelledby="explore-categories-heading"
    >
      <div className="site-container">
        <header className="mx-auto max-w-6xl text-center">
          <h2
            id="explore-categories-heading"
            className="text-[26px] font-extrabold leading-tight text-heading md:text-[40px] md:leading-[60px]"
          >
            {heading}
          </h2>
          <p className="mt-3 text-[15px] font-medium leading-[140%] text-muted md:text-[18px]">
            {subheading}
          </p>
        </header>

        <CategoryCarouselTrack page={page} className="mt-10 md:mt-12">
          {pages.map((pageItems, pageIndex) => (
            <div
              key={pageIndex}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            >
              {pageItems.map((item) => (
                <CategoryCard key={item.id} item={item} />
              ))}
            </div>
          ))}
        </CategoryCarouselTrack>

        <div className="mt-10">
          <CategoryCarouselControls
            page={page}
            totalPages={totalPages}
            onPrev={() => startTransition(() => setPage(Math.max(0, page - 1)))}
            onNext={() => startTransition(() => setPage(Math.min(totalPages - 1, page + 1)))}
            prevLabel="Previous categories"
            nextLabel="Next categories"
          />
        </div>
      </div>
    </section>
  );
}
