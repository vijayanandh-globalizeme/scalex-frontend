'use client';

import { useEffect, useRef, useState } from 'react';
import { getCourseSearch } from '@/app/actions/courseActions';
import type { ApiCourseSearchItem } from '@/services/courseApi';

interface CourseSearchSelectProps {
  className?: string;
  placeholder?: string;
  required?: boolean;
  /** Fires with the selected course, or null when the field is cleared/edited. */
  onSelect: (course: { name: string; courseUri: string } | null) => void;
}

/**
 * Type-ahead course picker backed by the course search API. Shows course names
 * in a dropdown; on selection it reports the course name + uri to the parent
 * (the footer form sends the uri as `courseName`).
 */
export default function CourseSearchSelect({
  className,
  placeholder = 'Search Course',
  required,
  onSelect,
}: CourseSearchSelectProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ApiCourseSearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Tracks whether the current text corresponds to a confirmed selection, so we
  // can require a real pick (native validity) rather than free-typed text.
  const [selectedUri, setSelectedUri] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  // Debounced search whenever the typed query changes (and isn't a selection).
  useEffect(() => {
    if (selectedUri) return; // text reflects a confirmed pick — don't re-search
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      const items = await getCourseSearch(q);
      setResults(items);
      setLoading(false);
      setOpen(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, selectedUri]);

  // Close the dropdown on outside click.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (selectedUri) {
      setSelectedUri('');
      onSelect(null); // editing after a pick invalidates it
    }
  }

  function pick(item: ApiCourseSearchItem) {
    setQuery(item.name);
    setSelectedUri(item.courseUri);
    setResults([]);
    setOpen(false);
    onSelect({ name: item.name, courseUri: item.courseUri });
  }

  return (
    <div ref={wrapRef} className="relative">
      <input
        type="text"
        value={query}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        className={className}
      />
      {open && (loading || results.length > 0) ? (
        <ul className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-white py-1 shadow-lg">
          {loading ? (
            <li className="px-4 py-2 text-[13px] text-placeholder">Searching…</li>
          ) : (
            results.map((c) => (
              <li key={c.courseUri}>
                <button
                  type="button"
                  onClick={() => pick(c)}
                  className="block w-full px-4 py-2 text-left text-[14px] text-heading hover:bg-zinc-50"
                >
                  {c.name}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
