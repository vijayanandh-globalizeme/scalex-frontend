'use client';

import { useState } from 'react';

const DISCLAIMER_TEXT =
  "The content on the website and/or Platform is for informational and educational purposes only. The user of this website and/or Platform (User) should not construe any such information as legal, investment, tax, financial or any other advice. Nothing contained herein constitutes any representation, solicitation, recommendation, endorsement, or offer by ScaleX Learning or any third-party service provider to buy or sell any securities or other financial instruments in this or in any other jurisdiction in which such solicitation or offer would be unlawful under the securities laws of such jurisdiction. All content on this website is information of a general nature and does not address the circumstances of any particular individual or entity. Nothing in the website constitutes professional and/or financial advice, nor does any information on the website constitute a comprehensive or complete statement of the matters discussed or the law relating thereto. ScaleX Learning is not a fiduciary by virtue of any person's use of or access to the website or its content.";

export default function FooterDisclaimer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t border-zinc-200 pt-8 lg:pt-10">
      <p className={`text-sm leading-relaxed text-zinc-400 ${expanded ? '' : 'line-clamp-2'}`}>
        {DISCLAIMER_TEXT}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-heading underline underline-offset-2 transition hover:text-brand"
      >
        {expanded ? 'Read less' : 'Read more'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
