'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
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
  className,
  children,
}: {
  href?: string;
  /** Open contact popup even without a brochure/contact hash href (e.g. Enroll Now). */
  openModal?: boolean;
  /** Lead type recorded when the modal opens from this CTA. */
  type?: BrochureModalType;
  courseId?: string | null;
  className?: string;
  children: ReactNode;
}) {
  const { openBrochureModal } = useCourseBrochureModal();

  if (openModal || isBrochureModalHref(href)) {
    return (
      <button
        type="button"
        onClick={() => openBrochureModal({ type, courseId })}
        className={`cursor-pointer ${className ?? ''}`}
      >
        {children}
      </button>
    );
  }

  if (href?.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
