'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
}: {
  isOpen: boolean;
  onClose: () => void;
  form: CourseLeadFormProps;
  leadType?: BrochureModalType;
  courseId?: string | null;
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

    // Compensate for the scrollbar that `overflow: hidden` removes — otherwise the
    // page reflows a few pixels wider and sticky elements (e.g. the course sidebar)
    // visibly jump when the modal opens/closes.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = previousPaddingRight;
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
        className={`${styles.panel} relative z-10 w-full max-w-[528px] max-h-[min(90vh,640px)] overflow-y-auto ${isAnimated ? styles.isOpen : ''}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="btn-mui-ink-tint absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-heading shadow-sm"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <CourseLeadForm
          {...form}
          showArrowDecor={false}
          titleId="course-brochure-modal-title"
          leadType={leadType}
          courseId={courseId}
        />
      </div>
    </div>,
    document.body,
  );
}
