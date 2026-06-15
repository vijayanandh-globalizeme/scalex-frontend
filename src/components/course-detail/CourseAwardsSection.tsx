'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';
import type { CourseAwardCard, CourseAwardsContent } from '@/lib/courseBody';
import { COURSE_SECTION_CARD } from './courseSectionCard';

const CARD_SHADOW =
  'shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

const VARIANT_STYLES: Record<CourseAwardCard['variant'], string> = {
  gold: 'bg-[linear-gradient(150deg,#F5980F_-75.58%,#B9CA63_182.49%)]',
  red: 'bg-[linear-gradient(180deg,#EF4C40_-16.69%,#F5A416_121.61%)]',
  teal: 'bg-[linear-gradient(180deg,#0EA5E9_0%,#06B6D4_100%)]',
};

function MedalBadge() {
  return (
    <div
      className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-4 border-[#1E293B] bg-[#1E293B] text-white shadow-md"
      aria-hidden
    >
      <div className="flex flex-col items-center leading-none">
        <span className="text-[9px] font-semibold uppercase tracking-wide text-[#F4AA1F]">Top</span>
        <span className="text-[22px] font-extrabold text-[#F4AA1F]">10</span>
      </div>
    </div>
  );
}

function AwardCardItem({ card }: { card: CourseAwardCard }) {
  return (
    <article
      className={`relative h-[160px] w-full rounded-2xl px-5 pb-5 pt-12 text-white ${VARIANT_STYLES[card.variant]} ${CARD_SHADOW}`}
    >
      <div className="absolute -top-11 left-1/2 z-10 -translate-x-1/2">
        <MedalBadge />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-30">
        <Image
          src="/images/xaero.png"
          alt=""
          fill
          className="object-contain object-right"
          sizes="50vw"
        />
      </div>
      <div className="relative z-10 mt-1">
        <h3 className="text-[16px] font-semibold leading-snug text-white">{card.title}</h3>
        <p className="mt-1 text-[12px] font-medium text-white/90">{card.subtitle}</p>
      </div>
    </article>
  );
}

export default function CourseAwardsSection({ awards }: { awards: CourseAwardsContent }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const update = () => {
      const nextSize = window.innerWidth >= 1024 ? 3 : 1;
      setPageSize(nextSize);
      setPage(0);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = useMemo(() => chunkPages(awards.cards, pageSize), [awards.cards, pageSize]);
  const totalPages = pages.length;

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  return (
    <div
      id="why-scalex"
      className={`scroll-mt-[116px] ${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6`}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[20px] font-semibold text-heading">{awards.title}</h2>
        {totalPages > 1 ? (
          <CategoryCarouselControls
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            prevLabel="Previous awards"
            nextLabel="Next awards"
          />
        ) : null}
      </div>

      <CategoryCarouselTrack page={page} className="mt-6 pt-12">
        {pages.map((pageCards, pageIndex) => (
          <div
            key={pageIndex}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {pageCards.map((card) => (
              <AwardCardItem key={card.id} card={card} />
            ))}
          </div>
        ))}
      </CategoryCarouselTrack>
    </div>
  );
}
