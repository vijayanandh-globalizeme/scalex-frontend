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
  isOpen,
  onToggle,
  onNavigate,
}: {
  category: MegaMenuCategory;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const hasCourses = category.courses.length > 0;
  const panelId = `mobile-category-${category.slug}`;

  return (
    <div className="border-b border-zinc-100 last:border-b-0">
      <div className={`flex items-center transition-colors ${isOpen ? 'bg-accent-soft/60' : ''}`}>
        <Link
          href={category.href}
          onClick={onNavigate}
          className="header-fluid-text flex-1 py-3.5 pl-4 pr-2 text-[13px] font-medium text-ink/80 transition-colors active:text-brand"
        >
          {category.label}
        </Link>
        {hasCourses && (
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className={`flex h-11 w-11 shrink-0 items-center justify-center transition-colors active:bg-zinc-100 ${isOpen ? 'text-brand' : 'text-ink/40'}`}
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${category.label} courses`}
          >
            <ChevronDown expanded={isOpen} />
          </button>
        )}
      </div>

      {hasCourses && (
        <div id={panelId} className={`header-mobile-nav-collapse ${isOpen ? 'is-expanded' : ''}`}>
          <ul className="overflow-hidden bg-zinc-50">
            {category.courses.slice(0, 8).map((course) => (
              <li key={course.label}>
                <Link
                  href={course.href}
                  onClick={onNavigate}
                  className="btn-mui-nav-link header-fluid-text block py-3 pl-8 pr-4 text-[12px] font-normal text-ink/60 transition-colors active:bg-zinc-100 active:text-brand"
                >
                  {course.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Level 2: All Courses (categories + nested courses) ── */
function AllCoursesSection({
  categories,
  isOpen,
  onToggle,
  onNavigate,
}: {
  categories: MegaMenuCategory[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const panelId = 'mobile-section-all-courses';

  return (
    <div className="border-b border-zinc-100">
      <button
        type="button"
        className={`header-fluid-text flex w-full items-center justify-between rounded-lg px-1 py-4 text-left text-[15px] font-semibold transition-colors active:bg-zinc-50 ${isOpen ? 'text-brand' : 'text-ink'}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        All Courses
        <ChevronDown expanded={isOpen} />
      </button>

      <div id={panelId} className={`header-mobile-nav-collapse ${isOpen ? 'is-expanded' : ''}`}>
        <div className="overflow-hidden">
          <div className="mb-3 rounded-lg border border-zinc-100 bg-white overflow-hidden">
            {categories.map((category) => (
              <CategorySection
                key={category.slug}
                category={category}
                isOpen={openCategory === category.slug}
                onToggle={() => setOpenCategory((prev) => (prev === category.slug ? null : category.slug))}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Level 2: flat item list sections (Interview Prep, etc.) ── */
function MobileNavSection({
  label,
  items,
  isOpen,
  onToggle,
  onNavigate,
}: {
  label: string;
  items: readonly NavDropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = `mobile-section-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="border-b border-zinc-100">
      <button
        type="button"
        className={`header-fluid-text flex w-full items-center justify-between rounded-lg px-1 py-4 text-left text-[15px] font-semibold transition-colors active:bg-zinc-50 ${isOpen ? 'text-brand' : 'text-ink'}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {label}
        <ChevronDown expanded={isOpen} />
      </button>

      <div id={panelId} className={`header-mobile-nav-collapse ${isOpen ? 'is-expanded' : ''}`}>
        <div className="overflow-hidden">
          <ul className="mb-3 rounded-lg border border-zinc-100 bg-white overflow-hidden">
            {items.map((item) => (
              <li key={item.label} className="border-b border-zinc-100 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="btn-mui-nav-link header-fluid-text block px-4 py-3.5 text-[13px] font-medium text-ink/80 transition-colors active:bg-zinc-100 active:text-brand"
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
  categories,
  otherMenus,
}: HeaderMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPanelMounted, setIsPanelMounted] = useState(false);
  const [isPanelAnimated, setIsPanelAnimated] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const closeMenu = () => setIsOpen(false);
  const toggleSection = (key: string) => setOpenSection((prev) => (prev === key ? null : key));

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
            className={`header-mobile-drawer fixed inset-x-0 top-16 bottom-0 z-50 flex w-full flex-col bg-white shadow-2xl ${isPanelAnimated ? 'is-open' : ''}`}
          >
            <div className="shrink-0 border-b border-zinc-100 px-5 py-4 sm:px-6">
              <HeaderSearch className="w-full" />
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto px-5 py-2 sm:px-6" aria-label="Mobile primary">
              {/* Level 1 → Level 2 → Level 3 */}
              <AllCoursesSection
                categories={categories}
                isOpen={openSection === 'all-courses'}
                onToggle={() => toggleSection('all-courses')}
                onNavigate={closeMenu}
              />

              {/* Level 1 → Level 2 */}
              {otherMenus.map((menu) => (
                <MobileNavSection
                  key={menu.title}
                  label={menu.title}
                  items={menu.items}
                  isOpen={openSection === menu.title}
                  onToggle={() => toggleSection(menu.title)}
                  onNavigate={closeMenu}
                />
              ))}

              {/* Level 1 → Level 2 — static Resources (Blog, About Us), mirrors desktop */}
              <MobileNavSection
                label="Resources"
                items={RESOURCES_ITEMS}
                isOpen={openSection === 'resources'}
                onToggle={() => toggleSection('resources')}
                onNavigate={closeMenu}
              />

              {/* Level 1 — direct links */}
              <Link
                href="/contact-us"
                onClick={closeMenu}
                className="header-fluid-text block rounded-lg px-1 py-4 text-[15px] font-semibold text-ink transition-colors active:bg-zinc-50 active:text-brand"
              >
                Contact Us
              </Link>
            </nav>

            <div
              className="shrink-0 border-t border-zinc-100 bg-white px-5 py-4 sm:px-6"
              style={{
                boxShadow: '0 -4px 12px 0 rgba(30, 41, 59, 0.06)',
                paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
              }}
            >
              <Link
                href="#"
                onClick={closeMenu}
                className="btn-brand-outline btn-brand-outline-hover-fill header-fluid-text flex w-full items-center justify-center gap-2 px-4 py-3.5 transition-transform duration-150 active:scale-[0.98]"
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
