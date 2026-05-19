'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  mediaSrc: string;
  mediaAlt: string;
  avatarSrc?: string;
  videoUrl?: string;
}

export interface SuccessStoriesSectionProps {
  heading: string;
  subheading: string;
  stories: SuccessStory[];
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#success-star-clip)">
        <path
          d="M3.01902 14.8627C3.30952 15.0888 3.67795 15.0111 4.11724 14.6932L7.86538 11.9453L11.6206 14.6932C12.0598 15.0111 12.4212 15.0888 12.7188 14.8627C13.0093 14.6437 13.073 14.2835 12.8959 13.7678L11.4151 9.37398L15.1986 6.66138C15.638 6.35057 15.8151 6.02562 15.7017 5.67242C15.5883 5.33335 15.2553 5.17087 14.7098 5.17087H10.0689L8.65889 0.784104C8.4889 0.261369 8.2338 0 7.86538 0C7.50399 0 7.24894 0.261369 7.0789 0.784104L5.66892 5.17087H1.02805C0.482481 5.17087 0.149473 5.33335 0.0361076 5.67242C-0.0843426 6.02562 0.099875 6.35057 0.539164 6.66138L4.32271 9.37398L2.84188 13.7678C2.66475 14.2835 2.72852 14.6437 3.01902 14.8627Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="success-star-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
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
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl bg-zinc-200 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.18)] ${
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
  );
}

function TestimonialCardOnly({ story }: { story: SuccessStory }) {
  return (
    <article
      className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.18)] md:p-6"
      style={{ width: SLIDE_W, height: SLIDE_H, minWidth: SLIDE_W, maxWidth: SLIDE_W }}
    >
      <p className="text-[13px] leading-[20px] text-body md:text-[14px] md:leading-[22px]">
        {story.quote}
      </p>
      <footer className="flex items-center gap-3 border-t border-zinc-100 pt-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-100">
          <Image
            src={story.avatarSrc ?? story.mediaSrc}
            alt={`${story.name} avatar`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold uppercase tracking-wide text-heading">{story.name}</p>
          <p className="text-[11px] font-medium text-subtle">{story.role}</p>
          <div className="mt-1 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={i < story.rating ? 'h-3.5 w-3.5 text-black' : 'h-3.5 w-3.5 text-black opacity-30'}
              />
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
  const total = stories.length;

  const stepPx = SLIDE_W + SLIDE_GAP;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    if (!autoplay || total <= 1 || isPaused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, autoplayIntervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayIntervalMs, total, isPaused]);

  return (
    <section
      className="full-bleed relative bg-surface pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-36 lg:pb-24"
      aria-labelledby="success-stories-heading"
    >
      <div className="site-container relative z-10">
        <header className="relative mx-auto max-w-3xl text-center">
          <h2
            id="success-stories-heading"
            className="text-[28px] font-bold leading-[140%] text-heading md:text-[34px]"
          >
            {heading}
          </h2>
          <p className="mt-3 text-[16px] font-medium leading-[140%] text-muted md:text-[18px]">
            {subheading}
          </p>
        </header>

        {/* lg+: fixed 432×404 video left + 422px testimonial slider right */}
        <div className="relative mt-10 hidden w-fit max-w-full md:mt-12 lg:block">
          {total > 1 ? (
            <div className="absolute right-0 top-4 z-30 flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous story"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-white text-accent transition hover:bg-accent-soft"
              >
                <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next story"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent-hover"
              >
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : null}

          <div
            className="relative flex items-center pt-14"
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

            {/* Right: testimonial slider — first card overlaps onto the video */}
            <div
              className="relative z-10 shrink-0 overflow-hidden"
              style={{
                width:
                  VISIBLE_SLIDES * SLIDE_W +
                  (VISIBLE_SLIDES - 1) * SLIDE_GAP +
                  SLIDE_GAP +
                  SLIDE_PEEK,
                height: SLIDE_H,
                marginLeft: -SLIDE_OVERLAP,
              }}
            >
              <div
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{
                  transform: `translateX(-${index * stepPx}px)`,
                  gap: SLIDE_GAP,
                }}
              >
                {stories.map((story) => (
                  <div key={story.id} className="shrink-0">
                    <TestimonialCardOnly story={story} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Below lg: stacked video + 422px testimonial slider (no horizontal overflow) */}
        <div
          className="relative mx-auto mt-10 lg:hidden md:mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {total > 1 ? (
            <div className="mb-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous story"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-white text-accent"
              >
                <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next story"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white"
              >
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : null}
          <div className="mx-auto flex w-full max-w-[422px] flex-col items-center gap-6">
            <VideoThumbnail
              src={featureMedia.src}
              alt={featureMedia.alt}
              videoUrl={featureMedia.videoUrl}
              width={VIDEO_W}
              height={VIDEO_H}
              responsive
            />
            <div className="w-full max-w-[422px] overflow-hidden" style={{ height: SLIDE_H }}>
              <div
                className="flex h-full transition-transform duration-500 ease-out will-change-transform"
                style={{
                  transform: `translateX(-${index * stepPx}px)`,
                  gap: SLIDE_GAP,
                }}
              >
                {stories.map((story) => (
                  <div key={story.id} className="shrink-0">
                    <TestimonialCardOnly story={story} />
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
