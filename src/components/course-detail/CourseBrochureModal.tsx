'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import CourseLeadForm, { type CourseLeadFormProps } from './CourseLeadForm';
import type { BrochureModalType, BrochurePopupArtwork } from './CourseBrochureModalContext';
import styles from './CourseBrochureModal.module.css';

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

export default function CourseBrochureModal({
  isOpen,
  onClose,
  form,
  image,
  label,
  leadType,
  courseId,
  downloadUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  form: CourseLeadFormProps;
  image: BrochurePopupArtwork;
  /** RHS pill text. */
  label: string;
  leadType?: BrochureModalType;
  courseId?: string | null;
  downloadUrl?: string | null;
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

    // `overflow: hidden` on body would disable `position: sticky` for every
    // descendant (the course sidebar, CourseDetailStickyNav) — any ancestor
    // with overflow other than `visible` breaks sticky positioning for its
    // subtree. So instead of hiding overflow, freeze body in place at its
    // current scroll offset; nothing scrolls, sticky elements stay untouched.
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
      // `html { scroll-behavior: smooth }` (globals.css) would otherwise animate
      // this restore from 0 up to scrollY — force an instant jump instead.
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMounted, onClose]);

  if (!isMounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className={`${styles.overlay} fixed inset-0 bg-black/50 ${isAnimated ? styles.isOpen : ''}`}
        aria-label="Close brochure form"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-brochure-modal-title"
        className={`${styles.panel} relative z-10 flex w-full max-w-[420px] max-h-[90vh] overflow-hidden rounded-[20px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:h-[min(90vh,544px)] md:max-w-[820px] ${isAnimated ? styles.isOpen : ''}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B] transition-colors hover:bg-[#E2E8F0] hover:text-heading"
          aria-label="Close"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {/* LHS — CTA-specific artwork, 50% width (hidden on small screens).
            The artwork's rounded corners are transparent; the split background
            matches the colour beside its top/bottom corners so they disappear. */}
        <div
          className="relative hidden w-1/2 shrink-0 overflow-hidden md:block"
          style={{ background: `linear-gradient(to bottom, ${image.bg[0]} 50%, ${image.bg[1]} 50%)` }}
        >
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover object-top"
            sizes="410px"
          />
        </div>

        {/* RHS — lead form, 50% width */}
        <div className="relative flex min-w-0 flex-1 flex-col justify-center overflow-y-auto md:w-1/2">
          <CourseLeadForm
            {...form}
            showArrowDecor={false}
            bare
            eyebrow={label}
            titleId="course-brochure-modal-title"
            leadType={leadType}
            courseId={courseId}
            downloadUrl={downloadUrl}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
