'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { isBrochureModalHref, useCourseBrochureModal } from './CourseBrochureModalContext';

export default function CourseBrochureCta({
  href,
  openModal = false,
  className,
  children,
}: {
  href?: string;
  /** Open contact popup even without a brochure/contact hash href (e.g. Enroll Now). */
  openModal?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { openBrochureModal } = useCourseBrochureModal();

  if (openModal || isBrochureModalHref(href)) {
    return (
      <button type="button" onClick={openBrochureModal} className={`cursor-pointer ${className ?? ''}`}>
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
