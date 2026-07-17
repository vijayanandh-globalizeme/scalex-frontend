'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Reviewer } from '@/services/peopleApi';

export type { Reviewer as SuccessStory };

export interface SuccessStoriesSectionProps {
  heading: string;
  subheading: string;
  stories: Reviewer[];
  autoplay?: boolean;
  autoplayIntervalMs?: number;
  featureMedia: {
    src: string;
    alt: string;
    videoUrl?: string;
  };
}


const VIDEO_W = 432;
const VIDEO_H = 404;
const SLIDE_W = 422;
const SLIDE_H = 280;
const SLIDE_GAP = 16;
const VISIBLE_SLIDES = 2;
const SLIDE_OVERLAP = 60;
const SLIDE_PEEK = Math.round(SLIDE_W * 0.1);

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

const STAR_PATH = "M3.01902 14.8627C3.30952 15.0888 3.67795 15.0111 4.11724 14.6932L7.86538 11.9453L11.6206 14.6932C12.0598 15.0111 12.4212 15.0888 12.7188 14.8627C13.0093 14.6437 13.073 14.2835 12.8959 13.7678L11.4151 9.37398L15.1986 6.66138C15.638 6.35057 15.8151 6.02562 15.7017 5.67242C15.5883 5.33335 15.2553 5.17087 14.7098 5.17087H10.0689L8.65889 0.784104C8.4889 0.261369 8.2338 0 7.86538 0C7.50399 0 7.24894 0.261369 7.0789 0.784104L5.66892 5.17087H1.02805C0.482481 5.17087 0.149473 5.33335 0.0361076 5.67242C-0.0843426 6.02562 0.099875 6.35057 0.539164 6.66138L4.32271 9.37398L2.84188 13.7678C2.66475 14.2835 2.72852 14.6437 3.01902 14.8627Z";

function StarIcon({ fill, uid }: { fill: number; uid: string }) {
  const clipId = `star-clip-${uid}`;
  const fillWidth = (16 * Math.min(Math.max(fill, 0), 1)).toFixed(2);
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={fillWidth} height="16" />
        </clipPath>
      </defs>
      <path d={STAR_PATH} fill="#F49114" opacity="0.2" />
      {fill > 0 && (
        <path d={STAR_PATH} fill="#F49114" clipPath={`url(#${clipId})`} />
      )}
    </svg>
  );
}

function starsFromRating(rating: number): number[] {
  const clamped = Math.min(Math.max(rating, 0), 5);
  return Array.from({ length: 5 }, (_, i) => Math.min(Math.max(clamped - i, 0), 1));
}

function VideoThumbnail({
  src,
  alt,
  videoUrl,
  width,
  height,
  responsive,
}: {
  src: string;
  alt: string;
  videoUrl?: string;
  width: number;
  height: number;
  /** When true, fills up to max width while keeping aspect ratio (mobile). */
  responsive?: boolean;
}) {
  return (
    <div className={`relative isolate ${responsive ? 'w-full max-w-[432px]' : 'shrink-0'}`}>
      <span
        className="pointer-events-none absolute right-[-50px] -top-4 h-40 w-40 rounded-lg bg-[rgba(229,172,38,0.16)] blur-[32px]"
        aria-hidden
      />
      <div
        className={`interactive-card interactive-card-media relative z-10 shrink-0 overflow-hidden rounded-2xl bg-zinc-200 ${
          responsive ? `aspect-[432/404] w-full max-w-[432px]` : ''
        }`}
        style={
          responsive
            ? undefined
            : { width, height, minWidth: width, minHeight: height, maxWidth: width, maxHeight: height }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${width}px`}
          className="object-cover"
          priority={false}
        />
        {videoUrl ? (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Play testimonial video"
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:scale-105">
              <PlayIcon className="ml-0.5 h-6 w-6" />
            </span>
          </a>
        ) : (
          <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg">
              <PlayIcon className="ml-0.5 h-6 w-6" />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

function TestimonialCardOnly({ story, mobile = false }: { story: Reviewer; mobile?: boolean }) {
  const starFills = starsFromRating(story.rating ?? 0);
  return (
    <article
      className={`interactive-card flex flex-col overflow-visible border border-[#EBEBEB] bg-white p-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:p-6 ${
        mobile ? 'h-auto w-full gap-4 rounded-lg' : 'h-[280px] rounded-lg'
      }`}
      style={mobile ? undefined : { width: SLIDE_W, minWidth: SLIDE_W, maxWidth: SLIDE_W, height: SLIDE_H }}
    >
      <div className={`flex flex-col gap-2 ${mobile ? '' : 'min-h-0 flex-1 justify-center'}`}>
        <p className="text-[13px] leading-[20px] text-body md:text-[14px] md:leading-[22px]">
          {story.review}
        </p>
      </div>
      <footer className={`flex shrink-0 items-center gap-3 border-t border-zinc-100 pt-3 ${mobile ? '' : 'mt-4'}`}>
        {story.avatarUrl ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-100">
            <Image
              src={story.avatarUrl}
              alt={`${story.name} avatar`}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="interactive-card-title text-[13px] font-bold uppercase tracking-wide text-heading">{story.name}</p>
          <p className="text-[11px] font-medium text-subtle">{story.role}</p>
          <div className="mt-1 flex items-center gap-0.5">
            {starFills.map((fill, i) => (
              <StarIcon key={i} fill={fill} uid={`${story.id}-${i}`} />
            ))}
          </div>
        </div>
      </footer>
    </article>
  );
}

export default function SuccessStoriesSection({
  heading,
  subheading,
  stories,
  autoplay = true,
  autoplayIntervalMs = 6000,
  featureMedia,
}: SuccessStoriesSectionProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const mobileViewportRef = useRef<HTMLDivElement>(null);
  const [mobileSlideWidth, setMobileSlideWidth] = useState(0);
  const total = stories.length;
  const canNavigateDesktop = total > VISIBLE_SLIDES;
  const canNavigateMobile = total > 1;

  // Natural size of the side-by-side block (video + 2-card slider)
  const blockWidth =
    VIDEO_W +
    (VISIBLE_SLIDES * SLIDE_W + (VISIBLE_SLIDES - 1) * SLIDE_GAP + SLIDE_GAP + SLIDE_PEEK) -
    SLIDE_OVERLAP;
  const blockHeight = 56 + VIDEO_H; // pt-14 (56px) + video height

  // Fluid scale so the block always fills the container width from 1024px up
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const compute = () => {
      const vw = document.documentElement.clientWidth;
      if (vw < 1024) {
        setScale(1);
        return;
      }
      const container = vw >= 1400 ? 1300 : vw * 0.9;
      setScale(Math.min(1, container / blockWidth));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [blockWidth]);

  const stepPx = SLIDE_W + SLIDE_GAP;
  const mobileStepPx = mobileSlideWidth > 0 ? mobileSlideWidth + SLIDE_GAP : 0;

  useEffect(() => {
    const viewport = mobileViewportRef.current;
    if (!viewport) return undefined;

    const update = () => {
      const width = Math.round(viewport.clientWidth);
      if (width > 0) setMobileSlideWidth(width);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    if (!canNavigateDesktop) setIndex(0);
  }, [canNavigateDesktop]);

  useEffect(() => {
    if (!autoplay || isPaused) return;

    const canAutoplay = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      return isDesktop ? canNavigateDesktop : canNavigateMobile;
    };

    if (!canAutoplay()) return;

    const id = window.setInterval(() => {
      if (!canAutoplay()) return;
      setIndex((i) => (i + 1) % total);
    }, autoplayIntervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayIntervalMs, total, isPaused, canNavigateDesktop, canNavigateMobile]);

  return (
    <section
      className="full-bleed relative bg-surface pt-16 pb-2 md:pt-28 md:pb-10 lg:pt-32 lg:pb-12"
      aria-labelledby="success-stories-heading"
    >
      <div className="site-container relative z-10">
        <header className="relative mx-auto w-fit max-w-full pt-6 text-center md:pt-8 lg:pt-10">
          <h2
            id="success-stories-heading"
            className="section-heading scroll-mt-24 text-heading"
          >
            {heading}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-[16px] font-medium leading-[140%] text-muted md:text-[18px]">
            {subheading}
          </p>
        </header>

        {/* lg+: video left + testimonial slider right, scaled to fit the container */}
        <div
          className="relative hidden w-full overflow-x-hidden overflow-y-visible lg:block"
          style={{ minHeight: (blockHeight + 32) * scale }}
        >
         <div className="w-fit origin-top-left pb-8" style={{ transform: `scale(${scale})` }}>
          {canNavigateDesktop ? (
            <div className="absolute right-0 top-4 z-30 flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous story"
                className="btn-mui-brand-tint flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-white text-accent"
              >
                <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next story"
                className="btn-mui-icon-filled flex h-10 w-10 items-center justify-center rounded-full"
              >
                <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5" />
              </button>
            </div>
          ) : null}

          <div
            className="relative flex items-center pt-8 pb-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left: video thumbnail 432×404 (static) */}
            <div className="shrink-0">
              <VideoThumbnail
                src={featureMedia.src}
                alt={featureMedia.alt}
                videoUrl={featureMedia.videoUrl}
                width={VIDEO_W}
                height={VIDEO_H}
              />
            </div>

            {/* Right: testimonial slider — vertically centered to video height */}
            <div
              className="relative z-10 flex shrink-0 items-center overflow-x-hidden overflow-y-visible"
              style={{
                width:
                  VISIBLE_SLIDES * SLIDE_W +
                  (VISIBLE_SLIDES - 1) * SLIDE_GAP +
                  SLIDE_GAP +
                  SLIDE_PEEK,
                height: VIDEO_H,
                marginLeft: -SLIDE_OVERLAP,
              }}
            >
              <div
                className="flex items-center transition-transform duration-500 ease-out will-change-transform"
                style={{
                  transform: `translateX(-${index * stepPx}px)`,
                  gap: SLIDE_GAP,
                }}
              >
                {stories.map((story) => (
                  <div key={story.id} className="shrink-0 overflow-visible">
                    <TestimonialCardOnly story={story} />
                  </div>
                ))}
              </div>
            </div>
          </div>
         </div>
        </div>

        {/* Below lg: stacked video + 422px testimonial slider (no horizontal overflow) */}
        <div
          className="relative mt-10 w-full lg:hidden md:mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="mx-auto flex w-full flex-col items-center gap-6">
            <div className="w-full max-w-[432px]">
              <VideoThumbnail
                src={featureMedia.src}
                alt={featureMedia.alt}
                videoUrl={featureMedia.videoUrl}
                width={VIDEO_W}
                height={VIDEO_H}
                responsive
              />
            </div>
            {canNavigateMobile ? (
              <div className="flex w-full max-w-[432px] justify-end gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous story"
                  className="btn-mui-brand-tint flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-white text-accent"
                >
                  <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next story"
                  className="btn-mui-icon-filled flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <ArrowRightIcon className="btn-arrow-icon h-3.5 w-3.5" />
                </button>
              </div>
            ) : null}
            <div ref={mobileViewportRef} className="w-full overflow-x-hidden pb-6">
              <div
                className="flex items-stretch pb-2 transition-transform duration-500 ease-out will-change-transform"
                style={{
                  transform:
                    mobileStepPx > 0
                      ? `translate3d(-${index * mobileStepPx}px, 0, 0)`
                      : undefined,
                }}
              >
                {stories.map((story, storyIndex) => (
                  <div
                    key={story.id}
                    className="box-border shrink-0 overflow-visible pb-2"
                    style={
                      mobileSlideWidth > 0
                        ? {
                            width: mobileSlideWidth,
                            flex: `0 0 ${mobileSlideWidth}px`,
                            marginRight:
                              storyIndex < stories.length - 1 ? SLIDE_GAP : 0,
                          }
                        : { flex: '0 0 100%', width: '100%' }
                    }
                  >
                    <TestimonialCardOnly story={story} mobile />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
