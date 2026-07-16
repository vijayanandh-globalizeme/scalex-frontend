'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import HeaderSearch from './HeaderSearch';
import { RESOURCES_ITEMS } from '@/lib/headerStaticNav';
import type { NavDropdownItem } from './NavDropdown';
import type { MegaMenuCategory } from '@/lib/allCoursesMegaMenu';
import type { OtherMenu } from '@/services/layoutApi';

const MENU_TRANSITION_MS = 450;

type HeaderMobileMenuProps = {
  categories: MegaMenuCategory[];
  otherMenus: OtherMenu[];
};

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SignInArrow({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none" aria-hidden>
      <path d="M10.7129 14.8047C10.9473 14.8047 11.1523 14.7168 11.3477 14.5312L17.8418 8.05664C18.0371 7.87109 18.1348 7.64648 18.1348 7.40234C18.1348 7.1582 18.0371 6.93359 17.8418 6.74805L11.3672 0.292969C11.1523 0.078125 10.9473 0 10.7129 0C10.2344 0 9.86328 0.351562 9.86328 0.839844C9.86328 1.07422 9.94141 1.29883 10.0977 1.45508L12.2852 3.68164L16.3574 7.40234L12.2852 11.123L10.0977 13.3496C9.94141 13.4961 9.86328 13.7305 9.86328 13.9648C9.86328 14.4531 10.2344 14.8047 10.7129 14.8047ZM0.859375 8.27148H13.2129L16.3574 8.07617C16.7578 8.04688 17.0312 7.80273 17.0312 7.40234C17.0312 7.00195 16.7578 6.75781 16.3574 6.72852L13.2129 6.5332H0.859375C0.351562 6.5332 0 6.89453 0 7.40234C0 7.91016 0.351562 8.27148 0.859375 8.27148Z" fill="currentColor" />
    </svg>
  );
}

function ChevronDown({ expanded }: { expanded: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-300 ease-out ${expanded ? 'rotate-180' : ''}`}
    >
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Level 3: courses under a category ── */
function CategorySection({
  category,
  onNavigate,
}: {
  category: MegaMenuCategory;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasCourses = category.courses.length > 0;

  return (
    <div className="border-b border-zinc-100 last:border-b-0">
      <div className="flex items-center">
        <Link
          href={category.href}
          onClick={onNavigate}
          className="header-fluid-text flex-1 py-3 pl-4 pr-2 text-[13px] font-medium text-ink/80 hover:text-brand"
        >
          {category.label}
        </Link>
        {hasCourses && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={(e) => { e.stopPropagation(); setExpanded((prev) => !prev); }}
            className="flex h-10 w-10 shrink-0 items-center justify-center text-ink/40 hover:text-ink"
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${category.label} courses`}
          >
            <ChevronDown expanded={expanded} />
          </button>
        )}
      </div>

      {hasCourses && expanded && (
        <ul className="border-t border-zinc-100 bg-zinc-50 pb-2 pt-1">
          {category.courses.slice(0, 8).map((course) => (
            <li key={course.label}>
              <Link
                href={course.href}
                onClick={onNavigate}
                className="btn-mui-nav-link header-fluid-text block py-2.5 pl-8 pr-4 text-[12px] font-normal text-ink/60 hover:text-brand"
              >
                {course.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Level 2: All Courses (categories + nested courses) ── */
function AllCoursesSection({
  categories,
  onNavigate,
}: {
  categories: MegaMenuCategory[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-zinc-100">
      <button
        type="button"
        className="header-fluid-text flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold text-ink"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        All Courses
        <ChevronDown expanded={expanded} />
      </button>

      <div className={`header-mobile-nav-collapse ${expanded ? 'is-expanded' : ''}`}>
        <div className="mb-3 rounded-lg border border-zinc-100 bg-white overflow-hidden">
          {categories.map((category) => (
            <CategorySection key={category.slug} category={category} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Level 2: flat item list sections (Interview Prep, etc.) ── */
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
        className="header-fluid-text flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold text-ink"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {label}
        <ChevronDown expanded={expanded} />
      </button>

      <div className={`header-mobile-nav-collapse ${expanded ? 'is-expanded' : ''}`}>
        <ul className="mb-3 rounded-lg border border-zinc-100 bg-white overflow-hidden">
          {items.map((item) => (
            <li key={item.label} className="border-b border-zinc-100 last:border-b-0">
              <Link
                href={item.href}
                onClick={onNavigate}
                className="btn-mui-nav-link header-fluid-text block px-4 py-3 text-[13px] font-medium text-ink/80 hover:text-brand"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HeaderMobileMenu({
  categories,
  otherMenus,
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
    const shouldLockScroll = isOpen || isPanelMounted;
    if (!shouldLockScroll) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    const { body } = document;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = scrollbarWidth > 0 ? `calc(100% - ${scrollbarWidth}px)` : '100%';

    document.addEventListener('keydown', onKeyDown);

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, isPanelMounted]);

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
                {/* Level 1 → Level 2 → Level 3 */}
                <AllCoursesSection categories={categories} onNavigate={closeMenu} />

                {/* Level 1 → Level 2 */}
                {otherMenus.map((menu) => (
                  <MobileNavSection key={menu.title} label={menu.title} items={menu.items} onNavigate={closeMenu} />
                ))}

                {/* Level 1 → Level 2 — static Resources (Blog, About Us), mirrors desktop */}
                <MobileNavSection label="Resources" items={RESOURCES_ITEMS} onNavigate={closeMenu} />

                {/* Level 1 — direct links */}
                <Link
                  href="/contact-us"
                  onClick={closeMenu}
                  className="header-fluid-text block border-b border-zinc-100 py-4 text-[15px] font-semibold text-ink hover:text-brand"
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
