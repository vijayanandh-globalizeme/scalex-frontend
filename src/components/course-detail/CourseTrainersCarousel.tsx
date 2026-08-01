'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  CategoryCarouselControls,
  CategoryCarouselTrack,
  chunkPages,
} from '@/components/category/CategoryCarouselNav';
import CourseBatchRequestBanner from '@/components/course-detail/CourseBatchRequestBanner';
import type { ApiTrainer } from '@/services/courseApi';
import { withNewTabLinks } from '@/lib/richText';

const TRAINER_CARD_BASE =
  'relative flex h-full flex-col overflow-visible rounded-[20px] border border-[#EBEBEB] bg-white px-5 pb-5 pt-12 text-center';

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none" aria-hidden>
      <g clipPath="url(#trainer-briefcase-clip)">
        <path d="M3.41708 3.2491V14.2187H4.71767V3.2491H3.41708ZM13.9753 3.2491V14.2187H15.2759V3.2491H13.9753ZM2.49617 14.9923H16.2049C17.8771 14.9923 18.701 14.2187 18.701 12.6329V5.10574C18.701 3.51987 17.8771 2.74627 16.2049 2.74627H2.49617C0.832057 2.74627 0 3.51987 0 5.10574V12.6329C0 14.2187 0.832057 14.9923 2.49617 14.9923ZM2.51233 13.7546C1.72066 13.7546 1.3006 13.3677 1.3006 12.5709V5.16763C1.3006 4.37855 1.72066 3.98403 2.51233 3.98403H16.1887C16.9804 3.98403 17.4005 4.37855 17.4005 5.16763V12.5709C17.4005 13.3677 16.9804 13.7546 16.1887 13.7546H2.51233ZM5.25084 3.4193H6.50296V2.05003C6.50296 1.4621 6.86648 1.12945 7.49658 1.12945H11.2045C11.8345 1.12945 12.19 1.4621 12.19 2.05003V3.40383H13.4421V2.13512C13.4421 0.680765 12.6424 0 11.1802 0H7.51274C6.13137 0 5.25084 0.680765 5.25084 2.13512V3.4193Z" fill="#1E293B" />
      </g>
      <defs>
        <clipPath id="trainer-briefcase-clip"><rect width="19" height="15" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function TrainerCard({ trainer }: { trainer: ApiTrainer }) {
  const experienceMatch = trainer.experience.match(/^Experience\s+(.+)$/i);
  const experienceValue = experienceMatch?.[1] ?? trainer.experience;

  return (
    <article
      className={`trainer-card ${TRAINER_CARD_BASE} max-md:shadow-[0_2px_8px_0_rgba(30,41,59,0.10)] md:interactive-card`}
    >
      <div className="interactive-card-media absolute top-0 left-1/2 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-[#FD022D] bg-zinc-100">
        <Image
          src={trainer.avatar?.url ?? '/images/avatar-placeholder.png'}
          alt={trainer.name}
          width={72}
          height={72}
          className="h-full w-full object-cover"
          sizes="72px"
        />
      </div>

      <h3 className="interactive-card-title text-[20px] font-semibold leading-normal text-heading">{trainer.name}</h3>
      <p className="mt-1 text-[14px] font-medium leading-normal text-[#FD022D]">{trainer.role}</p>
      <p
        className="mt-3 line-clamp-4 text-left text-[14px] font-normal leading-normal text-muted [&_a]:text-brand [&_a]:no-underline [&_a]:hover:underline [&_a]:underline-offset-2"
        dangerouslySetInnerHTML={{ __html: withNewTabLinks(trainer.about) }}
      />

      <div className="mt-5 border-t border-[#EBEBEB] pt-4">
        <div className="flex w-full flex-row flex-wrap items-center justify-between gap-2">
          <p className="text-[12px] font-normal leading-normal text-muted uppercase">Associated with</p>
          {trainer.assocWith ? (
            <div className="relative flex h-9 min-w-[106px] items-center justify-end">
              <Image
                src={trainer.assocWith.url}
                alt={trainer.name}
                width={106}
                height={35}
                className="h-auto max-h-9 w-auto max-w-full object-contain"
                sizes="106px"
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex w-full items-center gap-[20px] rounded-lg bg-[#F5F6F8] px-[10px] py-2 text-left">
        <span className="shrink-0 text-muted"><BriefcaseIcon /></span>
        <span className="flex flex-col gap-[3px]">
          <span className="block text-[10px] leading-normal text-muted">Experience</span>
          <span className="block text-[14px] font-medium leading-normal text-[#1E293B]" style={{ fontFamily: 'Inter, sans-serif' }}>{experienceValue}</span>
        </span>
      </div>

      <Link
        href={trainer.linkedInProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-1.5 text-[14px] font-medium leading-[18px] text-[#FD022D] transition hover:underline"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        View Profile on
        <Image src="/images/linked.png" alt="" width={22} height={22} className="h-[22px] w-[22px] shrink-0 object-contain" aria-hidden />
      </Link>
    </article>
  );
}

export default function CourseTrainersCarousel({
  title,
  trainers,
  cta,
}: {
  title: string;
  trainers: ApiTrainer[];
  cta?: React.ComponentProps<typeof CourseBatchRequestBanner>['banner'];
}) {
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

  const pages = useMemo(() => chunkPages(trainers, pageSize), [trainers, pageSize]);
  const totalPages = pages.length;

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  return (
    <div id="trainers" className="scroll-mt-[116px] mb-0 max-md:mb-[20px] overflow-visible">
      <div className="overflow-visible max-md:pb-0 pb-2 md:pt-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="section-heading text-heading">{title}</h2>
          {totalPages > 1 ? (
            <CategoryCarouselControls
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              prevLabel="Previous trainers"
              nextLabel="Next trainers"
            />
          ) : null}
        </div>

        <div className="min-w-0 max-md:overflow-x-clip">
          <CategoryCarouselTrack
            page={page}
            clipX={false}
            className="trainers-carousel-track mt-6 pt-10 max-md:pb-0 md:pb-6"
          >
            {pages.map((pageTrainers, pageIndex) => (
              <div key={pageIndex} className="grid grid-cols-1 gap-5 overflow-visible md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {pageTrainers.map((trainer) => (
                  <div key={trainer.id} className="overflow-visible max-md:px-0.5 max-md:pt-1">
                    <TrainerCard trainer={trainer} />
                  </div>
                ))}
              </div>
            ))}
          </CategoryCarouselTrack>
        </div>
      </div>

      {cta ? <CourseBatchRequestBanner banner={cta} /> : null}
    </div>
  );
}
