'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import {
  isBrochureModalHref,
  useCourseBrochureModal,
  type BrochureModalType,
} from './CourseBrochureModalContext';

export default function CourseBrochureCta({
  href,
  openModal = false,
  type = 'contact',
  courseId = null,
  downloadUrl = null,
  className,
  style,
  children,
}: {
  href?: string;
  /** Open contact popup even without a brochure/contact hash href (e.g. Enroll Now). */
  openModal?: boolean;
  /** Lead type recorded when the modal opens from this CTA. */
  type?: BrochureModalType;
  courseId?: string | null;
  /** File (brochure/guide/syllabus) to unlock after a successful submit. */
  downloadUrl?: string | null;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const { openBrochureModal } = useCourseBrochureModal();

  if (openModal || isBrochureModalHref(href)) {
    return (
      <button
        type="button"
        onClick={() => openBrochureModal({ type, courseId, downloadUrl })}
        className={`cursor-pointer ${className ?? ''}`}
        style={style}
      >
        {children}
      </button>
    );
  }

  if (href?.startsWith('/')) {
    return (
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
}
