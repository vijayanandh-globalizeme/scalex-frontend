'use client';

import Image from 'next/image';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { CategoryCarouselControls } from '@/components/category/CategoryCarouselNav';
import type {
  CareerTransformationStory,
  CourseCareerTransformationsContent,
} from '@/lib/courseBody';
import { COURSE_SECTION_CARD } from './courseSectionCard';

const PERSON_IMAGE_WIDTH = 251;
const PERSON_IMAGE_HEIGHT = 255;
const PERSON_OUTSIDE_LEFT_PX = Math.round(PERSON_IMAGE_WIDTH * 0.1);
const PERSON_IMAGE_LEFT_PX = 20;
const PERSON_IMAGE_BOTTOM_PX = 0;
const PERSON_LEFT_GUTTER_PX = PERSON_OUTSIDE_LEFT_PX + 8;

const SLIDE_TRANSITION =
  'will-change-transform transition-transform duration-500 ease-in-out motion-reduce:transition-none';

function HikeBadgeIcon() {
  const clipId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="12" fill="#FFDDDD" />
      <g transform="translate(8.5, 6.5)">
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M2.95482 9.22548C4.51779 9.22548 5.8634 8.44559 5.8634 6.95926C5.8634 5.58301 4.77674 5.09211 3.4866 4.78474L2.59877 4.56915C1.75717 4.36731 1.05893 4.00489 1.05893 3.21125C1.05893 2.32128 2.01612 1.86711 2.9502 1.86711C3.9074 1.86711 4.60102 2.3121 4.85534 3.12868C4.92935 3.34429 5.07269 3.49109 5.31313 3.49109C5.55358 3.49109 5.7293 3.32594 5.7293 3.0828C5.7293 2.7158 5.48421 2.22035 5.16516 1.90381C4.60102 1.34414 3.79179 1.08265 2.9502 1.08265C1.50285 1.08265 0.171093 1.84418 0.171093 3.28006C0.171093 4.5508 1.26239 5.12424 2.45079 5.39492L3.34325 5.60133C4.23109 5.80779 4.98021 6.12892 4.98021 7.02804C4.98021 8.03732 4.04612 8.44559 2.96408 8.44559C1.94214 8.44559 1.11442 8.03732 0.869339 7.12439C0.799975 6.8996 0.665876 6.77117 0.430045 6.77117C0.171093 6.77117 0 6.9455 0 7.17484C0 7.60147 0.282072 8.09693 0.601138 8.39974C1.2254 8.98233 2.10398 9.22548 2.95482 9.22548ZM2.93171 10.3402C3.09817 10.3402 3.23227 10.2026 3.23227 10.0375V0.298188C3.23227 0.137625 3.09817 0 2.93171 0C2.76523 0 2.63113 0.137625 2.63113 0.298188V10.0375C2.63113 10.2026 2.76523 10.3402 2.93171 10.3402Z"
            fill="#FD022D"
          />
        </g>
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="6.03448" height="10.3448" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TransformationArrow() {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="39"
      height="24"
      viewBox="0 0 39 24"
      fill="none"
      aria-hidden
      className="mb-6 shrink-0 -translate-y-[10px]"
    >
      <path
        opacity="0.7"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.6168 4.87612L5.18712 19.8293C4.5291 20.2321 4.39163 20.3151 4.24981 20.4029C4.10798 20.4908 4.01552 20.5506 3.87724 20.6439C3.73896 20.7372 3.60687 20.8285 2.96968 21.2635L0.190795 23.1604C-0.00921417 23.297 -0.06061 23.5698 0.0759999 23.7698C0.194911 23.9439 0.420878 24.0087 0.614015 23.9243L3.75271 22.5514C4.4418 22.25 4.58162 22.1897 4.72518 22.1263C4.86874 22.0629 4.95977 22.021 5.10126 21.9531C5.24275 21.8852 5.37943 21.8181 6.05634 21.4903L31.5305 9.15527C31.872 8.98991 32.2014 8.80063 32.5162 8.58886C32.9822 8.2757 33.0974 8.43788 32.8619 9.07567C32.6978 9.52043 32.4731 10.129 32.1879 10.9015C31.7973 11.9597 32.3387 13.1343 33.3972 13.5251C34.4557 13.9159 35.6305 13.3749 36.0211 12.3167L38.4288 5.79468C38.4484 5.74178 38.4684 5.68908 38.4891 5.6366C38.8914 4.61389 38.98 3.92573 38.7551 3.57211C38.1672 2.64765 36.2508 2.2167 35.7286 2.09385C34.9986 1.92212 32.4456 1.24497 28.0697 0.0623914C27.13 -0.191547 26.1625 0.364126 25.9088 1.30352C25.8944 1.35671 25.8825 1.41054 25.8732 1.46484L25.8661 1.50604C25.686 2.55541 26.3532 3.56412 27.3896 3.80936L29.1719 4.23101C29.2112 4.24031 29.2506 4.24931 29.29 4.25802C29.6588 4.33926 29.8669 4.41897 29.9143 4.49701C29.9642 4.57896 29.865 4.70533 29.6168 4.87612Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="35.4533"
          y1="2.93484"
          x2="-2.37893"
          y2="22.9819"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FD022D" />
          <stop offset="0.475962" stopColor="#FFB700" />
          <stop offset="1" stopColor="#00C017" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ROLE_CARD_SIZE = {
  width: '100px',
  height: '136px',
  minWidth: '100px',
  maxWidth: '100px',
  minHeight: '136px',
  maxHeight: '136px',
  boxSizing: 'border-box' as const,
};

function RoleTransitionCard({
  variant,
  role,
  logoSrc,
  logoAlt,
}: {
  variant: 'before' | 'after';
  role: string;
  logoSrc: string;
  logoAlt: string;
}) {
  const isAfter = variant === 'after';

  const boxStyle = isAfter
    ? {
        ...ROLE_CARD_SIZE,
        borderRadius: 'var(--Radius-radius-20, 20px)',
        border: '1px solid var(--Primary, #FD022D)',
        background: '#FFF',
        boxShadow:
          '0 4px 4px 0 rgba(30, 41, 59, 0.08), 0 4px 4px 0 rgba(30, 41, 59, 0.03)',
      }
    : {
        ...ROLE_CARD_SIZE,
        borderRadius: 'var(--Radius-radius-20, 20px)',
        border: '1px solid #D4D4D4',
        background: '#FFF',
        boxShadow:
          '0 4px 4px 0 rgba(30, 41, 59, 0.08), 0 4px 4px 0 rgba(30, 41, 59, 0.03)',
      };

  return (
    <div className="box-border flex shrink-0 flex-col items-center px-2 py-3" style={boxStyle}>
      <span
        className={
          isAfter
            ? 'inline-flex h-[26px] w-[52px] items-center justify-center rounded-[8px] bg-[#E2FFD4] text-[10px] font-medium uppercase leading-[140%] tracking-wide text-[#388E0E]'
            : 'inline-flex rounded-[8px] bg-[#FFF6F7] px-2 py-0.5 text-[10px] font-medium uppercase leading-[140%] tracking-wide text-[var(--Primary,#FD022D)]'
        }
      >
        {isAfter ? 'After' : 'Before'}
      </span>
      <p
        className="mt-2 whitespace-pre-line text-center text-[14px] font-medium leading-[140%] text-[#000]"
      >
        {role}
      </p>
      <div className="relative mt-auto h-8 w-full pt-2">
        <Image src={logoSrc} alt={logoAlt} fill className="object-contain" sizes="80px" />
      </div>
    </div>
  );
}

const PERSON_IMAGE_OFFSET_Y_PX = 8;

const PERSON_IMAGE_SLIDE2_LEFT_OFFSET_PX = -30;

function getPersonImageLeftPx(storyId: string) {
  return PERSON_IMAGE_LEFT_PX + (storyId === 'priya-sharma' ? PERSON_IMAGE_SLIDE2_LEFT_OFFSET_PX : 0);
}

function StoryPersonImage({ story }: { story: CareerTransformationStory }) {
  return (
    <div
      className="pointer-events-none absolute z-[60] h-[255px] w-[251px]"
      style={{
        left: `${getPersonImageLeftPx(story.id)}px`,
        bottom: PERSON_IMAGE_BOTTOM_PX,
        transform: `translateY(${PERSON_IMAGE_OFFSET_Y_PX}px)`,
      }}
    >
      <Image
        src={story.imageSrc}
        alt={story.imageAlt}
        width={PERSON_IMAGE_WIDTH}
        height={PERSON_IMAGE_HEIGHT}
        className="relative z-[60] h-[255px] w-[251px] object-contain object-bottom"
        sizes="251px"
      />
    </div>
  );
}

function HikeBadge({ hikePercent }: { hikePercent: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center gap-1.5"
      style={{
        width: '121px',
        height: '56px',
        borderRadius: 'var(--Radius-radius-20, 20px)',
        border: '1px solid var(--Primary, #FD022D)',
        background: '#FFF',
        boxShadow:
          '0 4px 4px 0 rgba(30, 41, 59, 0.08), 0 4px 4px 0 rgba(30, 41, 59, 0.03)',
      }}
    >
      <HikeBadgeIcon />
      <span className="whitespace-nowrap text-[14px] font-medium leading-[140%] text-[#000]">
        {hikePercent}% Hike
      </span>
    </div>
  );
}

function TransformationStoryCard({ story }: { story: CareerTransformationStory }) {
  return (
    <article className="relative w-full overflow-visible">
      <div className="pointer-events-none absolute top-[40px] left-1/2 z-30 -translate-x-1/2 max-md:static max-md:pointer-events-auto max-md:mx-auto max-md:mb-4 max-md:translate-x-0 md:left-[135px] md:translate-x-0">
        <HikeBadge hikePercent={story.hikePercent} />
      </div>

      <div
        className="relative z-0 min-h-[210px] w-full overflow-visible rounded-[20px] border border-[#DCDCDC] shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]"
        style={{ background: 'linear-gradient(259deg, #FFF 64.75%, #FFD3D3 108.27%)' }}
      >
        <div className="relative z-10 flex w-full min-w-0 max-w-full flex-col gap-6 px-8 py-6 max-md:pt-36 md:grid md:min-h-[210px] md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6 md:py-7 md:pl-[240px] md:pt-6">
          <div className="min-w-0 md:pl-[66px]">
            <h3 className="text-[18px] font-bold leading-normal text-[#1E293B] md:text-[20px]">
              {story.name}
            </h3>
            <p className="mt-3 text-[14px] font-normal leading-[150%] text-[#788593]">{story.quote}</p>
          </div>

          <div className="flex min-w-0 items-end justify-center gap-1.5 md:justify-end">
            <div className="translate-y-[26px] shrink-0">
              <RoleTransitionCard
                variant="before"
                role={story.before.role}
                logoSrc={story.before.companyLogoSrc}
                logoAlt={story.before.companyLogoAlt}
              />
            </div>
            <TransformationArrow />
            <div className="translate-x-[15px] -translate-y-[20px] shrink-0">
              <RoleTransitionCard
                variant="after"
                role={story.after.role}
                logoSrc={story.after.companyLogoSrc}
                logoAlt={story.after.companyLogoAlt}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute bottom-0 z-[60] h-[200px] w-[200px] max-md:top-0 max-md:bottom-auto max-md:left-1/2 md:hidden ${
          story.id === 'priya-sharma'
            ? 'max-md:translate-x-[calc(-50%-30px)]'
            : 'max-md:-translate-x-1/2'
        } left-[-25px]`}
      >
        <Image
          src={story.imageSrc}
          alt={story.imageAlt}
          width={PERSON_IMAGE_WIDTH}
          height={PERSON_IMAGE_HEIGHT}
          className="relative z-[60] h-full w-full object-contain object-bottom"
          sizes="200px"
        />
      </div>
    </article>
  );
}

export default function CourseCareerTransformationsSection({
  content,
}: {
  content: CourseCareerTransformationsContent;
}) {
  const [page, setPage] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const totalPages = content.stories.length;

  useLayoutEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const updateSlideWidth = () => {
      const width = Math.round(node.getBoundingClientRect().width);
      if (width > 0) {
        setSlideWidth(width);
      }
    };

    updateSlideWidth();

    const observer = new ResizeObserver(updateSlideWidth);
    observer.observe(node);
    window.addEventListener('resize', updateSlideWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, []);

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  if (totalPages === 0) return null;

  const activeStory = content.stories[page];
  const offsetPx = page * slideWidth;
  const trackStyle = {
    transform: slideWidth > 0 ? `translate3d(-${offsetPx}px, 0, 0)` : undefined,
  };
  const slideStyle =
    slideWidth > 0
      ? { width: slideWidth, minWidth: slideWidth, flexBasis: slideWidth }
      : { width: '100%', minWidth: '100%', flexBasis: '100%' };

  return (
    <section
      id="career-transformations"
      className={`relative isolate scroll-mt-[116px] overflow-visible px-6 py-5 md:px-8 md:py-6 ${COURSE_SECTION_CARD}`}
      aria-labelledby="career-transformations-heading"
    >
      <div className="relative z-40 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="career-transformations-heading"
            className="text-[32px] font-bold leading-normal text-[#1E293B]"
          >
            {content.title}
          </h2>
          <p className="mt-1 text-[14px] font-normal leading-[150%] text-[#788593]">
            {content.subtitle}
          </p>
        </div>
        {totalPages > 1 ? (
          <CategoryCarouselControls
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            prevLabel="Previous career story"
            nextLabel="Next career story"
          />
        ) : null}
      </div>

      <div
        className="relative z-0 box-content overflow-visible pt-5"
        style={{
          marginLeft: `-${PERSON_LEFT_GUTTER_PX}px`,
          paddingLeft: `${PERSON_LEFT_GUTTER_PX}px`,
        }}
      >
        {activeStory ? (
          <div
            key={activeStory.id}
            className="pointer-events-none absolute inset-x-0 top-5 z-[60] hidden overflow-visible md:block md:pt-11"
            aria-hidden
          >
            <div className="relative min-h-[210px] overflow-visible">
              <StoryPersonImage story={activeStory} />
            </div>
          </div>
        ) : null}

        <div
          ref={viewportRef}
          className="relative z-0 w-full min-w-0 overflow-x-hidden overflow-y-visible max-md:pt-14 md:pt-11"
        >
          <div className={`flex ${SLIDE_TRANSITION}`} style={trackStyle}>
            {content.stories.map((story) => (
              <div
                key={story.id}
                className="box-border shrink-0 grow-0 overflow-visible"
                style={slideStyle}
              >
                <TransformationStoryCard story={story} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
