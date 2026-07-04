'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import CourseLeadForm, { type CourseLeadFormProps } from './CourseLeadForm';
import type { BrochureModalType } from './CourseBrochureModalContext';
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
  leadType,
  courseId,
  downloadUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  form: CourseLeadFormProps;
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
        className={`${styles.panel} relative z-10 flex w-full max-w-[860px] max-h-[min(90vh,640px)] overflow-hidden rounded-[20px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] ${isAnimated ? styles.isOpen : ''}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="btn-mui-ink-tint absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-heading shadow-sm"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* LHS — branded image panel (hidden on small screens) */}
        <div
          className="relative hidden w-[320px] shrink-0 overflow-hidden md:block"
          style={{ background: 'linear-gradient(160deg, #0D0D0D 0%, #161A26 55%, #FF002C 220%)' }}
        >
          <div className="relative z-10 p-7">
            <p className="text-[24px] font-extrabold leading-tight text-white">
              Let&apos;s scale
              <br />
              your career
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/70">
              Talk to our experts for a personalised roadmap, syllabus and pricing.
            </p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px]">
            <Image
              src="/images/person-3.png"
              alt="ScaleX course advisor"
              fill
              className="object-contain object-bottom"
              sizes="320px"
            />
          </div>
        </div>

        {/* RHS — lead form */}
        <div className="relative min-w-0 flex-1 overflow-y-auto">
          <CourseLeadForm
            {...form}
            showArrowDecor={false}
            bare
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
