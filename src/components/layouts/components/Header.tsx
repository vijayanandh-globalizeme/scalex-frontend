import Image from 'next/image';
import Link from 'next/link';
import AllCoursesMegaMenu from './AllCoursesMegaMenu';
import HeaderMobileMenu from './HeaderMobileMenu';
import HeaderSearch from './HeaderSearch';
import NavDropdown from './NavDropdown';
import type { MegaMenuCategory } from '@/lib/allCoursesMegaMenu';

const INTERVIEW_PREP_ITEMS = [
  { label: 'DevOps With Placement', href: '#' },
  { label: 'Data Science With Placement', href: '#' },
  { label: 'Automation Testing With Placement', href: '#' },
] as const;

const CERTIFICATION_PREP_ITEMS = [
  { label: 'PMP Certification Training', href: '#' },
  { label: 'AWS Solutions Architect', href: '#' },
  { label: 'Scrum Master Certification', href: '#' },
  { label: 'Six Sigma Green Belt', href: '#' },
] as const;

const RESOURCES_ITEMS = [
  { label: 'Blog & Articles', href: '#' },
  { label: 'Free Study Guides', href: '#' },
  { label: 'Webinars & Events', href: '#' },
  { label: 'Career Resources', href: '#' },
] as const;

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
      <g clipPath="url(#clip0_sign_in_arrow)">
        <path
          d="M10.7129 14.8047C10.9473 14.8047 11.1523 14.7168 11.3477 14.5312L17.8418 8.05664C18.0371 7.87109 18.1348 7.64648 18.1348 7.40234C18.1348 7.1582 18.0371 6.93359 17.8418 6.74805L11.3672 0.292969C11.1523 0.078125 10.9473 0 10.7129 0C10.2344 0 9.86328 0.351562 9.86328 0.839844C9.86328 1.07422 9.94141 1.29883 10.0977 1.45508L12.2852 3.68164L16.3574 7.40234L12.2852 11.123L10.0977 13.3496C9.94141 13.4961 9.86328 13.7305 9.86328 13.9648C9.86328 14.4531 10.2344 14.8047 10.7129 14.8047ZM0.859375 8.27148H13.2129L16.3574 8.07617C16.7578 8.04688 17.0312 7.80273 17.0312 7.40234C17.0312 7.00195 16.7578 6.75781 16.3574 6.72852L13.2129 6.5332H0.859375C0.351562 6.5332 0 6.89453 0 7.40234C0 7.91016 0.351562 8.27148 0.859375 8.27148Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_sign_in_arrow">
          <rect width="18.4961" height="14.8145" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const navLinkClass =
  'header-fluid-text flex h-10 items-center gap-1 px-1.5 py-0 font-normal not-italic tracking-[-0.16px] whitespace-nowrap max-[1399px]:px-1.5 min-[1400px]:px-2.5';

const Header = ({ megaMenuCategories }: { megaMenuCategories: MegaMenuCategory[] }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white">
      <div className="site-container">
        {/* Mobile: logo + hamburger (below 1200px) */}
        <div className="flex h-16 w-full min-w-0 items-center justify-between min-[1200px]:hidden">
          <Link href="/" className="flex shrink-0 items-center" aria-label=" EdgeX Learning home">
            <Image
              src="/images/logo.png"
              alt="EdgeX Learning"
              width={110}
              height={42}
              className="h-8 w-auto object-contain sm:h-9"
              sizes="(max-width: 768px) 100px, 110px"
              priority
            />
          </Link>
          <HeaderMobileMenu
            categories={megaMenuCategories}
            interviewPrepItems={INTERVIEW_PREP_ITEMS}
            certificationPrepItems={CERTIFICATION_PREP_ITEMS}
            resourcesItems={RESOURCES_ITEMS}
          />
        </div>

        {/* Desktop: single row (1200px+) — gaps shrink between 1200–1399px */}
        <div className="hidden min-[1200px]:flex min-[1200px]:h-16 min-[1200px]:w-full min-[1200px]:items-center">
          <div className="header-desktop-bar flex w-full min-w-0 items-center justify-between">
            <div className="header-desktop-bar__left flex min-w-0 flex-1 items-center">
              <Link
                href="/"
                className="flex shrink-0 items-center"
                aria-label=" EdgeX Learning home"
              >
                <Image
                  src="/images/logo.png"
                  alt="EdgeX Learning"
                  width={110}
                  height={42}
                  className="h-10 w-auto object-contain"
                  sizes="110px"
                  priority
                />
              </Link>

              <div className="shrink-0">
                <AllCoursesMegaMenu categories={megaMenuCategories} />
              </div>

              <HeaderSearch className="header-desktop-bar__search min-w-0 shrink" categories={megaMenuCategories} />
            </div>

            <div className="header-desktop-bar__right flex shrink-0 items-center">
              <nav
                className="flex min-w-0 flex-nowrap items-center gap-x-1 min-[1400px]:gap-x-2"
                aria-label="Primary"
              >
                <NavDropdown
                  label="Resources"
                  items={[...RESOURCES_ITEMS]}
                  triggerClassName={navLinkClass}
                />
                <Link href="/contact" className={`${navLinkClass} header-nav-parent-hover`}>
                  Contact Us
                </Link>
              </nav>

              <Link
                href="#"
                className="btn-brand-outline btn-brand-outline-hover-fill header-fluid-text flex h-10 shrink-0 items-center gap-1.5 px-3 py-0 shadow-none min-[1400px]:gap-2 min-[1400px]:px-4"
              >
                Sign In
                <SignInArrow className="btn-arrow-icon shrink-0 text-current" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
