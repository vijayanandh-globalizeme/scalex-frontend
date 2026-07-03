'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getCourseSearch } from '@/app/actions/courseActions';
import type { ApiCourseSearchItem } from '@/services/courseApi';

const DEBOUNCE_MS = 400;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 6.87582C0 10.667 3.05675 13.7516 6.81365 13.7516C8.29933 13.7516 9.65692 13.2692 10.7755 12.4592L14.9764 16.707C15.1727 16.9052 15.4289 17 15.7021 17C16.2827 17 16.684 16.5605 16.684 15.9832C16.684 15.7075 16.5815 15.4576 16.4023 15.2768L12.227 11.0375C13.1064 9.88293 13.6273 8.44398 13.6273 6.87582C13.6273 3.08464 10.5705 0 6.81365 0C3.05675 0 0 3.08464 0 6.87582ZM1.46007 6.87582C1.46007 3.89457 3.85936 1.47339 6.81365 1.47339C9.76796 1.47339 12.1672 3.89457 12.1672 6.87582C12.1672 9.85708 9.76796 12.2782 6.81365 12.2782C3.85936 12.2782 1.46007 9.85708 1.46007 6.87582Z"
        fill="currentColor"
      />
    </svg>
  );
}

type HeaderSearchProps = {
  className?: string;
};

export default function HeaderSearch({ className }: HeaderSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ApiCourseSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Guards against a slow, stale response overwriting the results of a newer query.
  const requestIdRef = useRef(0);

  // Debounced fetch — only fires once typing pauses. setState only happens
  // inside the timeout callback (deferred), never synchronously in the effect
  // body, so this doesn't trigger cascading renders on every keystroke.
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    debounceTimerRef.current = setTimeout(() => {
      const requestId = ++requestIdRef.current;
      getCourseSearch(trimmed).then((items) => {
        if (requestId !== requestIdRef.current) return; // a newer query has since fired
        setResults(items);
        setHasSearched(true);
        setIsLoading(false);
      });
    }, DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [query]);

  const showDropdown = isOpen && query.trim().length > 0;

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
  };

  const handleFocus = () => {
    if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    setIsOpen(true);
  };

  const handleBlur = () => {
    blurTimerRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleSuggestionClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <div
        className={`flex h-10 min-h-[44px] w-full min-w-0 items-center gap-2 rounded-lg border border-transparent bg-zinc-100 px-4 py-2.5 focus-within:border-brand focus-within:bg-white ${
          isOpen ? 'border-brand bg-white' : ''
        }`}
      >
        <SearchIcon className="shrink-0 text-ink/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Find your next course"
          className="header-fluid-text min-w-0 w-full flex-1 bg-transparent text-zinc-900 placeholder:text-zinc-400 outline-none"
          aria-label="Search courses"
          aria-expanded={showDropdown}
          aria-controls="header-search-suggestions"
          aria-autocomplete="list"
          role="combobox"
        />
      </div>

      {showDropdown ? (
        <ul
          id="header-search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[280px] overflow-y-auto rounded-lg border border-zinc-100 bg-white py-1 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.18)] ring-1 ring-zinc-900/5"
        >
          {isLoading ? (
            <li className="header-fluid-text px-4 py-3 text-zinc-400">Searching…</li>
          ) : results.length > 0 ? (
            results.map((item) => (
              <li
                key={`${item.categoryUri}-${item.courseUri}`}
                role="option"
                aria-selected={false}
                className="border-b border-zinc-100 last:border-b-0"
              >
                <Link
                  href={`/${item.categoryUri}/${item.courseUri}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleSuggestionClick}
                  className="btn-mui-nav-link header-fluid-text block px-4 py-3 font-normal text-ink"
                >
                  {item.name}
                </Link>
              </li>
            ))
          ) : hasSearched ? (
            <li className="header-fluid-text px-4 py-3 text-zinc-400">
              No courses found for &ldquo;{query.trim()}&rdquo;
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
