'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';
import type { ExploreCategoryItem } from '@/lib/categoryPageSections';
import { getAllCategories } from '@/app/actions/categoryActions';

function CategoryIcon({ fill, icon }: { fill: string; icon: string }) {
  return (
    <span
      className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full text-white"
      style={{ backgroundColor: fill }}
      aria-hidden
    >
      <i className={`fa fa-${icon} text-[18px]`} />
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

const CATEGORY_CARD_SHADOW =
  'max-md:!shadow-[0_2px_8px_0_rgba(30,41,59,0.10)] max-md:hover:!shadow-[0_2px_8px_0_rgba(30,41,59,0.10)] md:shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)] md:hover:!shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

function CategoryCard({ item }: { item: ExploreCategoryItem }) {
  return (
    <Link
      href={item.href}
      prefetch
      className={`interactive-card group flex w-full min-w-0 max-w-full items-center gap-4 overflow-visible rounded-xl border border-[#EBEBEB] bg-white p-5 transition-shadow duration-300 ${CATEGORY_CARD_SHADOW}`}
    >
      <CategoryIcon fill={item.iconBg} icon={item.icon} />
      <span className="min-w-0 flex-1">
        <span className="interactive-card-title block truncate text-[15px] font-bold leading-snug text-heading">{item.label}</span>
        <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-medium text-muted transition group-hover:text-subtle">
          Explore
          <ExploreArrowIcon className="btn-arrow-icon shrink-0" />
        </span>
      </span>
    </Link>
  );
}

const MOBILE_PAGE_SIZE = 2;
const DESKTOP_PAGE_SIZE = 8;

const ICON_COLORS = ['#E95A58', '#7C3AED', '#2563EB', '#0D9488', '#1E293B', '#16A34A', '#F97316', '#0891B2'];

function usePrefetchCategoryRoutes(hrefs: string[]) {
  const router = useRouter();
  useEffect(() => {
    const unique = [...new Set(hrefs)];
    for (const href of unique) {
      router.prefetch(href);
    }
  }, [hrefs, router]);
}

export default function CategoryExploreAllSection({ excludeId }: { excludeId?: string } = {}) {
  const [items, setItems] = useState<ExploreCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(MOBILE_PAGE_SIZE);
  const [isMobile, setIsMobile] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 767px)');
    const sm = window.matchMedia('(min-width: 640px)');
    const update = () => {
      setIsMobile(mobileMq.matches);
      setPageSize(sm.matches ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE);
      setPage(0);
    };
    update();
    mobileMq.addEventListener('change', update);
    sm.addEventListener('change', update);
    return () => {
      mobileMq.removeEventListener('change', update);
      sm.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    getAllCategories().then((cats) => {
      const filtered = excludeId ? cats.filter((cat) => cat.id !== excludeId) : cats;
      setItems(filtered.map((cat, i) => ({
        id:     cat.id,
        label:  cat.name,
        href:   `/${cat.uri}`,
        iconBg: ICON_COLORS[i % ICON_COLORS.length],
        icon:   cat.icon || 'fa-solid fa-briefcase',
      })));
      setLoading(false);
    });
  }, [excludeId]);

  const pages = useMemo(() => chunkPages(items, pageSize), [items, pageSize]);
  const totalPages = pages.length;

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  const categoryHrefs = useMemo(() => items.map((item) => item.href), [items]);
  usePrefetchCategoryRoutes(categoryHrefs);

  return (
    <section
      className="full-bleed overflow-visible bg-surface max-md:pt-15 max-md:pb-15 md:pb-8 md:pt-16"
      aria-labelledby="explore-categories-heading"
    >
      <div className="site-container">
        <header className="mx-auto max-w-6xl text-center">
          <h2
            id="explore-categories-heading"
            className="text-center text-[34px] font-bold leading-[140%] text-[#1E293B]"
          >
            Explore All Course Categories
          </h2>
          <p className="mb-4 mt-3 text-[15px] font-medium leading-[140%] text-muted md:mb-6 md:text-[18px]">
            Dive into specialized categories and find the specific guidance you need to master your field.
          </p>
        </header>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 md:mt-6">
            {Array.from({ length: pageSize }).map((_, i) => (
              <div key={i} className="animate-pulse h-[72px] rounded-xl bg-muted/20" />
            ))}
          </div>
        ) : (
          <div className="explore-categories-carousel mt-6 md:mt-6">
            {isMobile ? (
              <CategoryCarouselTrack page={page} pixelSlides={false} className="max-md:pb-4">
                {pages.map((pageItems, pageIndex) => (
                  <div key={pageIndex} className="box-border grid w-full min-w-0 grid-cols-1 gap-4 px-2 py-1">
                    {pageItems.map((item) => (
                      <div key={item.id} className="min-w-0 w-full overflow-visible py-1">
                        <CategoryCard item={item} />
                      </div>
                    ))}
                  </div>
                ))}
              </CategoryCarouselTrack>
            ) : (
              <CategoryCarouselTrack page={page} className="pb-4 pt-1">
                {pages.map((pageItems, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="box-border grid w-full min-w-0 max-w-full grid-cols-2 gap-5 px-3 py-1 lg:grid-cols-4 lg:gap-6"
                  >
                    {pageItems.map((item) => (
                      <div key={item.id} className="min-w-0 overflow-visible">
                        <CategoryCard item={item} />
                      </div>
                    ))}
                    {pageItems.length < DESKTOP_PAGE_SIZE
                      ? Array.from({ length: DESKTOP_PAGE_SIZE - pageItems.length }).map((_, i) => (
                          <div key={`pad-${pageIndex}-${i}`} className="hidden lg:block" aria-hidden />
                        ))
                      : null}
                  </div>
                ))}
              </CategoryCarouselTrack>
            )}
          </div>
        )}

        {!loading && totalPages > 1 && <div className="mt-6 max-md:mt-4">
          <CategoryCarouselControls
            page={page}
            totalPages={totalPages}
            onPrev={() => startTransition(() => setPage(Math.max(0, page - 1)))}
            onNext={() => startTransition(() => setPage(Math.min(totalPages - 1, page + 1)))}
            prevLabel="Previous categories"
            nextLabel="Next categories"
          />
        </div>}
      </div>
    </section>
  );
}
