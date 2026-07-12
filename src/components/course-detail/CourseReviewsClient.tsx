'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useMemo, useState } from 'react';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';
import type { ApiReview } from '@/services/courseApi';
import type { LayoutSettings } from '@/services/layoutApi';
import { REVIEWS_TYPE, REVIEW_VIDEO_SECTION } from '@/lib/courseDetailStatics';
import { ReviewPlatformRow } from '@/components/testimonials';

const SECTION_CARD = 'rounded-[20px] bg-transparent';

const REVIEW_CARD =
  'interactive-card relative flex h-full min-h-[282px] min-w-0 flex-col overflow-visible rounded-[20px] border border-[#EBEBEB] bg-white px-5 pb-5 pt-6';

const TAB_BAR_SCROLL =
  'inline-flex h-[52px] items-stretch gap-8 overflow-x-auto rounded-lg bg-[#FCFCFC] px-8 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)] [-ms-overflow-style:none] [scrollbar-width:none] md:gap-10 [&::-webkit-scrollbar]:hidden';

const STAR_PATH =
  'M3.01902 14.8627C3.30952 15.0888 3.67795 15.0111 4.11724 14.6932L7.86538 11.9453L11.6206 14.6932C12.0598 15.0111 12.4212 15.0888 12.7188 14.8627C13.0093 14.6437 13.073 14.2845 12.8959 13.7678L11.4151 9.37398L15.1986 6.66138C15.638 6.35057 15.8151 6.02562 15.7017 5.67242C15.5883 5.33335 15.2553 5.17087 14.7098 5.17087H10.0689L8.65889 0.784104C8.4889 0.261369 8.2338 0 7.86538 0C7.50399 0 7.24894 0.261369 7.0789 0.784104L5.66892 5.17087H1.02805C0.482481 5.17087 0.149473 5.33335 0.0361076 5.67242C-0.0843426 6.02562 0.099875 6.35057 0.539164 6.66138L4.32271 9.37398L2.84188 13.7678C2.66475 14.2845 2.72852 14.6437 3.01902 14.8627Z';

function Star({ fraction, gradientId }: { fraction: number; gradientId: string }) {
  // fraction === 0 or 1 doesn't need a gradient, but using one uniformly keeps this simple.
  const pct = Math.round(fraction * 100);
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${pct}%`} stopColor="#F4AA1F" />
          <stop offset={`${pct}%`} stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <path d={STAR_PATH} fill={`url(#${gradientId})`} />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const uid = useId();
  const clamped = Math.max(0, Math.min(5, rating));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${clamped} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} fraction={Math.max(0, Math.min(1, clamped - index))} gradientId={`${uid}-star-${index}`} />
      ))}
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="white" />
      <path d="M9.1942 25.5999C7.77198 25.5999 6.53527 25.0827 5.48406 24.0484C4.49469 22.9494 4 21.5918 4 19.9757C4 16.9373 4.83478 14.2544 6.50435 11.9272C8.23575 9.53525 10.2145 7.72515 12.4406 6.49687L12.8116 6.3999C12.9353 6.3999 13.028 6.46455 13.0899 6.59384C13.2135 6.72313 13.2754 6.85242 13.2754 6.98172C13.2754 7.17566 13.2135 7.33728 13.0899 7.46657C10.8019 9.5999 9.65797 11.5716 9.65797 13.3817C9.65797 14.4161 10.0908 15.1272 10.9565 15.5151C11.9459 16.0322 12.7188 16.6464 13.2754 17.3575C13.8937 18.0686 14.2029 19.0383 14.2029 20.2666C14.2029 21.7534 13.7082 23.014 12.7188 24.0484C11.7913 25.0827 10.6164 25.5999 9.1942 25.5999ZM22.9913 25.5999C21.5691 25.5999 20.3324 25.0827 19.2812 24.0484C18.2918 22.9494 17.7971 21.5918 17.7971 19.9757C17.7971 16.9373 18.6319 14.2544 20.3014 11.9272C22.0329 9.53525 24.0116 7.72515 26.2377 6.49687L26.6087 6.3999C26.7324 6.3999 26.8251 6.46455 26.887 6.59384C27.0106 6.72313 27.0725 6.85242 27.0725 6.98172C27.0725 7.17566 27.0106 7.33728 26.887 7.46657C24.599 9.5999 23.4551 11.5716 23.4551 13.3817C23.4551 14.4161 23.8879 15.1272 24.7536 15.5151C25.743 16.0322 26.5159 16.6464 27.0725 17.3575C27.6908 18.0686 28 19.0383 28 20.2666C28 21.7534 27.5053 23.014 26.5159 24.0484C25.5884 25.0827 24.4135 25.5999 22.9913 25.5999Z" fill="#FD022D" />
    </svg>
  );
}

type TypeMeta = typeof REVIEWS_TYPE[number];

function ReviewCard({ review, typeMap }: { review: ApiReview; typeMap: Map<string, TypeMeta> }) {
  const typeMeta = typeMap.get(review.type);
  return (
    <article className={REVIEW_CARD}>
      <div className="absolute top-0 left-5 z-10 -translate-y-1/2">
        <QuoteIcon />
      </div>
      <p className="mt-3 line-clamp-3 flex-1 text-[13px] font-normal leading-normal text-muted">
        {review.review}
      </p>
      {review.reviewUrl ? (
        <Link
          href={review.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 ml-auto inline-flex items-center gap-2 text-[12px] font-medium text-heading transition hover:text-brand"
        >
          Read on
          {typeMeta?.logoSrc ? (
            <Image src={typeMeta.logoSrc} alt={typeMeta.logoAlt ?? ''} height={16} width={80} className="h-4 w-auto object-contain object-left shrink-0" />
          ) : (
            <span>{typeMeta?.label ?? ''}</span>
          )}
        </Link>
      ) : null}
      <div className="mt-4 border-t border-[#EBEBEB] pt-4">
        <div className="flex min-w-0 items-start gap-2.5">
          <div className="relative h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full bg-zinc-100">
            {review.avatar ? (
              <Image src={review.avatar.url} alt={review.name} fill className="object-cover grayscale" sizes="50px" />
            ) : null}
          </div>
          <div className="min-w-0">
            <p className="interactive-card-title truncate text-[14px] font-medium leading-[20px] text-heading">{review.name}</p>
            <p className="mt-0.5 truncate text-[12px] font-normal leading-normal text-muted">{review.role}</p>
            <div className="mt-1.5">
              <StarRating rating={review.rating} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


function VideoCard({ video }: { video: { thumbnailSrc: string; thumbnailAlt: string; videoUrl?: string | null } }) {
  return (
    <div className="interactive-card interactive-card-media relative h-[282px] w-full max-w-full overflow-hidden rounded-[20px] md:max-w-[295px]">
      <Image
        src={video.thumbnailSrc}
        alt={video.thumbnailAlt}
        fill
        className="object-cover object-center"
        sizes="295px"
      />
      <div className="absolute inset-0 bg-[rgba(30,41,59,0.40)]" aria-hidden />
      <Link
        href={video.videoUrl ?? '#'}
        className="absolute inset-0 z-10 flex items-center justify-center"
        aria-label="Play video testimonial"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_4px_12px_rgba(253,2,45,0.35)]">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden>
            <path d="M2 1.5v15l12-7.5L2 1.5z" />
          </svg>
        </span>
      </Link>
    </div>
  );
}

export default function CourseReviewsClient({
  title,
  reviews,
  settings,
  videoUrl,
}: {
  title: string;
  reviews: ApiReview[];
  settings: LayoutSettings;
  videoUrl?: string | null;
}) {
  const typeMap = useMemo(() => new Map(REVIEWS_TYPE.map((t) => [t.id, t])), []);

  const presentTypes = useMemo(() => {
    const seen = new Set(reviews.map((r) => r.type));
    return REVIEWS_TYPE.filter((t) => t.id === 'all' || seen.has(t.id));
  }, [reviews]);

  const [activeTabId, setActiveTabId] = useState(presentTypes[0]?.id ?? 'all');
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => { setIsMobile(e.matches); setPage(0); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const filteredReviews = useMemo(
    () => activeTabId === 'all' ? reviews : reviews.filter((r) => r.type === activeTabId),
    [activeTabId, reviews],
  );

  const pageSize = isMobile ? 1 : 2;
  const pages = useMemo(() => chunkPages(filteredReviews, pageSize), [filteredReviews, pageSize]);
  const totalPages = Math.max(1, pages.length);


  return (
    <div id="reviews" className={`scroll-mt-[116px] py-5 md:py-6 ${SECTION_CARD}`}>
      <h2 className="section-heading text-heading">{title}</h2>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0" role="tablist" aria-label="Review platforms">
          <div className={TAB_BAR_SCROLL}>
            {presentTypes.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => { setActiveTabId(tab.id); setPage(0); }}
                  className={`flex h-full shrink-0 items-center gap-2 border-0 border-b-[3px] bg-transparent px-0 text-[14px] font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'border-b-brand text-brand' : 'border-b-transparent text-heading hover:text-brand'
                  }`}
                >
                  {tab.logoSrc ? (
                    <span className="relative h-[18px] w-[18px] shrink-0">
                      <Image src={tab.logoSrc} alt="" fill className="object-contain object-left" sizes="18px" />
                    </span>
                  ) : null}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <CategoryCarouselControls
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          prevLabel="Previous reviews"
          nextLabel="Next reviews"
        />
      </div>

      <div className="mt-5 pt-4 flex flex-col gap-4 md:flex-row md:gap-5">
        <VideoCard video={{ ...REVIEW_VIDEO_SECTION, videoUrl: videoUrl ?? REVIEW_VIDEO_SECTION.videoUrl }} />

        <div className="min-w-0 flex-1 overflow-x-clip">
          <CategoryCarouselTrack page={page} className="pb-2" clipX={false}>
            {pages.map((pageReviews, pageIndex) => (
              <div key={pageIndex} className="grid grid-cols-1 gap-4 overflow-visible md:grid-cols-2 md:gap-5">
                {pageReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} typeMap={typeMap} />
                ))}
              </div>
            ))}
          </CategoryCarouselTrack>
        </div>
      </div>

      <ReviewPlatformRow
        settings={settings}
        className="mt-5 grid grid-cols-2 gap-y-5 rounded-[20px] border border-[#EBEBEB] bg-white px-5 py-5 shadow-[0_4px_14px_-4px_rgba(30,41,59,0.10),0_4px_4px_0_rgba(30,41,59,0.03)] sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6"
      />
    </div>
  );
}
