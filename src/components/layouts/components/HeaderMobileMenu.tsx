'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import HeaderSearch from './HeaderSearch';
import type { NavDropdownItem } from './NavDropdown';

const MENU_TRANSITION_MS = 450;

type HeaderMobileMenuProps = {
  allCoursesItems: NavDropdownItem[];
  interviewPrepItems: readonly NavDropdownItem[];
  certificationPrepItems: readonly NavDropdownItem[];
  resourcesItems: readonly NavDropdownItem[];
};

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SignInArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="15"
      viewBox="0 0 19 15"
      fill="none"
      aria-hidden
    >
      <path
        d="M10.7129 14.8047C10.9473 14.8047 11.1523 14.7168 11.3477 14.5312L17.8418 8.05664C18.0371 7.87109 18.1348 7.64648 18.1348 7.40234C18.1348 7.1582 18.0371 6.93359 17.8418 6.74805L11.3672 0.292969C11.1523 0.078125 10.9473 0 10.7129 0C10.2344 0 9.86328 0.351562 9.86328 0.839844C9.86328 1.07422 9.94141 1.29883 10.0977 1.45508L12.2852 3.68164L16.3574 7.40234L12.2852 11.123L10.0977 13.3496C9.94141 13.4961 9.86328 13.7305 9.86328 13.9648C9.86328 14.4531 10.2344 14.8047 10.7129 14.8047ZM0.859375 8.27148H13.2129L16.3574 8.07617C16.7578 8.04688 17.0312 7.80273 17.0312 7.40234C17.0312 7.00195 16.7578 6.75781 16.3574 6.72852L13.2129 6.5332H0.859375C0.351562 6.5332 0 6.89453 0 7.40234C0 7.91016 0.351562 8.27148 0.859375 8.27148Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MobileNavSection({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: readonly NavDropdownItem[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-zinc-100">
      <button
        type="button"
        className="header-fluid-text flex w-full items-center justify-between py-3.5 text-left font-normal text-ink"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {label}
        <span
          className={`text-nav-chevron transition-transform duration-300 ease-out ${expanded ? 'rotate-180' : ''}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      <div className={`header-mobile-nav-collapse ${expanded ? 'is-expanded' : ''}`}>
        <div>
          <ul className="space-y-0.5 pb-3">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="btn-mui-nav-link header-fluid-text block px-3 py-2.5 font-normal text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function HeaderMobileMenu({
  allCoursesItems,
  interviewPrepItems,
  certificationPrepItems,
  resourcesItems,
}: HeaderMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPanelMounted, setIsPanelMounted] = useState(false);
  const [isPanelAnimated, setIsPanelAnimated] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      setIsPanelMounted(true);
      setIsPanelAnimated(false);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsPanelAnimated(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setIsPanelAnimated(false);
    const timer = window.setTimeout(() => setIsPanelMounted(false), MENU_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isPanelMounted) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isPanelMounted]);

  return (
    <>
      <button
        type="button"
        className="btn-mui-ink-tint flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink"
        aria-expanded={isOpen}
        aria-controls="header-mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isPanelMounted ? (
        <>
          <button
            type="button"
            className={`header-mobile-overlay fixed inset-0 top-16 z-40 bg-black/40 ${isPanelAnimated ? 'is-open' : ''}`}
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            id="header-mobile-menu"
            className={`header-mobile-drawer fixed inset-x-0 top-16 bottom-0 z-50 w-full overflow-y-auto bg-white shadow-2xl ${isPanelAnimated ? 'is-open' : ''}`}
          >
            <div className="px-5 py-4 sm:px-6">
              <HeaderSearch className="mb-4 w-full" />

              <nav aria-label="Mobile primary">
                <MobileNavSection
                  label="All Courses"
                  items={allCoursesItems}
                  onNavigate={closeMenu}
                />
                <MobileNavSection
                  label="Interview Prep"
                  items={interviewPrepItems}
                  onNavigate={closeMenu}
                />
                <MobileNavSection
                  label="Certification Prep"
                  items={certificationPrepItems}
                  onNavigate={closeMenu}
                />
                <MobileNavSection
                  label="Resources"
                  items={resourcesItems}
                  onNavigate={closeMenu}
                />
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="header-fluid-text block border-b border-zinc-100 py-3.5 font-normal text-ink hover:text-brand"
                >
                  Contact Us
                </Link>
              </nav>

              <Link
                href="#"
                onClick={closeMenu}
                className="btn-brand-outline btn-brand-outline-hover-fill header-fluid-text mt-4 flex w-full items-center justify-center gap-2 px-4 py-3"
              >
                Sign In
                <SignInArrow className="btn-arrow-icon shrink-0 text-current" />
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
