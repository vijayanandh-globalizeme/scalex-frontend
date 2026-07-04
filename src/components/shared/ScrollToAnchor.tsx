'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ScrollToAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Element id to scroll to (without the leading #). */
  targetId: string;
  className?: string;
  children: ReactNode;
}

/**
 * In-page anchor that jumps to `#targetId` like a normal `<a href="#...">`,
 * but without writing the hash into the URL/history — click behaves exactly
 * like a native anchor jump (instant, no smooth animation) minus the URL change.
 */
export default function ScrollToAnchor({ targetId, className, children, ...rest }: ScrollToAnchorProps) {
  return (
    <a
      href={`#${targetId}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
