import Image from 'next/image';
import Link from 'next/link';
import NavDropdown from './NavDropdown';

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

function AllCoursesChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="7"
      viewBox="0 0 13 7"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.50374 7C6.69084 7 6.87795 6.92839 7.00517 6.79244L12.7979 1.11657C12.9251 0.994886 13 0.837425 13 0.658489C13 0.286295 12.7081 0 12.3189 0C12.1318 0 11.9597 0.0715751 11.8325 0.186097L6.09959 5.79038H6.9004L1.16753 0.186097C1.04778 0.0715751 0.875649 0 0.681059 0C0.291882 0 0 0.286295 0 0.658489C0 0.837425 0.0748416 0.994886 0.202073 1.12372L5.99482 6.79244C6.13701 6.92839 6.30915 7 6.50374 7Z"
        fill="currentColor"
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

const navLinkClass =
  'header-fluid-text flex items-center gap-1 font-normal not-italic text-ink tracking-[-0.16px] transition hover:opacity-90 whitespace-nowrap';

const Header = () => {
  return (
    <header className="relative z-40 border-b border-zinc-100 bg-white">
      <div className="site-container py-3 md:py-4 lg:flex lg:h-16 lg:items-center lg:py-0">
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-0">
          <div className="flex shrink-0 flex-wrap items-center gap-x-[48px] gap-y-3 lg:mr-[33px]">
            <Link href="/" className="flex shrink-0 items-center" aria-label="ScaleX Learning home">
              <Image
                src="/images/logos.png"
                alt="ScaleX Learning"
                width={110}
                height={42}
                className="h-8 w-auto object-contain sm:h-9 md:h-10"
                sizes="(max-width: 768px) 100px, 110px"
                priority
              />
            </Link>

            <button
              type="button"
              className="btn-brand-outline header-fluid-text flex h-[40px] w-[133px] shrink-0 items-center justify-center gap-1"
            >
              All Courses
              <AllCoursesChevron className="shrink-0 text-brand" />
            </button>
          </div>

          <div className="flex min-h-[44px] w-full min-w-0 items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 md:mx-auto md:max-w-xl lg:mx-0 lg:mr-[30px] lg:h-10 lg:min-h-0 lg:w-[243px] lg:max-w-[243px] lg:flex-none lg:shrink-0 lg:py-0">
            <SearchIcon className="shrink-0 text-ink/40" />
            <input
              type="search"
              placeholder="Find your next course"
              className="header-fluid-text min-w-0 w-full flex-1 bg-transparent text-zinc-900 placeholder:text-zinc-400 outline-none"
              aria-label="Search courses"
            />
          </div>

          <div className="w-full min-w-0 lg:flex lg:flex-1 lg:justify-end">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6 lg:shrink-0 xl:gap-x-7 min-[1920px]:gap-x-4 min-[1920px]:sm:gap-x-5 min-[1920px]:xl:gap-x-6">
              <nav
                className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6 xl:gap-x-7 min-[1920px]:gap-x-4 min-[1920px]:sm:gap-x-5 min-[1920px]:xl:gap-x-6"
                aria-label="Primary"
              >
                <NavDropdown
                  label="Interview Prep"
                  items={[...INTERVIEW_PREP_ITEMS]}
                  triggerClassName={`${navLinkClass} cursor-pointer hover:opacity-100`}
                />
                <NavDropdown
                  label="Certification Prep"
                  items={[...CERTIFICATION_PREP_ITEMS]}
                  triggerClassName={`${navLinkClass} cursor-pointer hover:opacity-100`}
                />
                <NavDropdown
                  label="Resources"
                  items={[...RESOURCES_ITEMS]}
                  triggerClassName={`${navLinkClass} cursor-pointer hover:opacity-100`}
                />
                <Link href="#" className={`${navLinkClass} !gap-0`}>
                  Contact Us
                </Link>
              </nav>

              <Link
                href="#"
                className="btn-brand-outline header-fluid-text flex items-center gap-2 px-4 py-2 lg:h-10 lg:py-0"
              >
                Sign In
                <SignInArrow className="shrink-0 text-brand" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
