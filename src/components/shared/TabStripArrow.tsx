'use client';

/**
 * Mobile-only "next tab" arrow overlaid on the right edge of an overflowing tab strip:
 * a tinted round button over a fade into the bar colour.
 * Place it in a `relative` wrapper around the strip; `className` sets its vertical extent.
 */
export default function TabStripArrow({
  onClick,
  disabled,
  className = '',
}: {
  onClick: () => void;
  disabled: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute right-0 flex items-center rounded-r-lg bg-linear-to-l from-[#FCFCFC] from-55% to-transparent pl-8 pr-2 md:hidden ${className}`}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label="Next tab"
        className="pointer-events-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 bg-brand/10 p-0 text-brand transition-opacity disabled:cursor-default disabled:opacity-40"
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
