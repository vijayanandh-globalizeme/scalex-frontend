'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toVideoEmbedUrl } from '@/lib/videoEmbed';
import styles from './VideoModal.module.css';

const TRANSITION_MS = 350;

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsAnimated(false);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimated(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setIsAnimated(false);
    const timer = window.setTimeout(() => setIsMounted(false), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isMounted) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    // Same pattern as CourseBrochureModal: freeze body in place instead of
    // `overflow: hidden`, which would break `position: sticky` for descendants.
    const { body } = document;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = scrollbarWidth > 0 ? `calc(100% - ${scrollbarWidth}px)` : '100%';

    document.addEventListener('keydown', onKeyDown);

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMounted, onClose]);

  if (!isMounted || typeof document === 'undefined') return null;

  const embed = toVideoEmbedUrl(videoUrl);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className={`${styles.overlay} fixed inset-0 bg-black/70 ${isAnimated ? styles.isOpen : ''}`}
        aria-label="Close video"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Review video"
        className={`${styles.panel} relative z-10 aspect-video w-full max-w-[900px] overflow-hidden rounded-[16px] bg-black shadow-[0_24px_60px_rgba(0,0,0,0.5)] ${isAnimated ? styles.isOpen : ''}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="btn-mui-ink-tint absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-heading shadow-sm"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {embed.type === 'video' ? (
          <video src={embed.src} controls autoPlay className="h-full w-full">
            <track kind="captions" />
          </video>
        ) : (
          <iframe
            src={embed.src}
            title="Review video"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>,
    document.body,
  );
}
