import Link from 'next/link';

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.3681 8.00004C6.5513 8.00004 6.73451 7.92489 6.85908 7.78221L12.531 1.8254C12.6556 1.69769 12.7289 1.53244 12.7289 1.34465C12.7289 0.954031 12.4431 0.653564 12.062 0.653564C11.8788 0.653564 11.7103 0.728682 11.5857 0.848873L5.97238 6.73055H6.75649L1.14318 0.848873C1.02593 0.728682 0.857387 0.653564 0.666855 0.653564C0.285795 0.653564 0 0.954031 0 1.34465C0 1.53244 0.0732808 1.69769 0.197858 1.8329L5.8698 7.78221C6.00902 7.92489 6.17757 8.00004 6.3681 8.00004Z"
        fill="currentColor"
      />
    </svg>
  );
}

function OutlineButtonChevron({ className }: { className?: string }) {
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

export type NavDropdownItem = {
  label: string;
  href: string;
};

type NavDropdownProps = {
  label: string;
  items: NavDropdownItem[];
  triggerClassName?: string;
  /** `outline-button` matches the All Courses header button style */
  triggerVariant?: 'nav' | 'outline-button';
};

const triggerBaseClass =
  'header-nav-parent-hover flex h-10 cursor-pointer items-center gap-1 px-1.5 py-0 min-[1400px]:px-2.5';

const outlineButtonTriggerClass =
  'btn-brand-outline btn-brand-outline-hover-fill header-fluid-text flex h-[40px] w-[133px] shrink-0 items-center justify-center gap-1 cursor-pointer';

const NavDropdown = ({
  label,
  items,
  triggerClassName,
  triggerVariant = 'nav',
}: NavDropdownProps) => {
  const isOutlineButton = triggerVariant === 'outline-button';
  const triggerClasses = isOutlineButton
    ? [outlineButtonTriggerClass, triggerClassName]
    : [triggerBaseClass, triggerClassName];

  return (
    <div className="group/nav relative">
      <button
        type="button"
        className={triggerClasses.filter(Boolean).join(' ')}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        {label}
        {isOutlineButton ? (
          <OutlineButtonChevron className="shrink-0 text-current transition-transform duration-200 ease-out group-hover/nav:rotate-180" />
        ) : (
          <ChevronDown className="shrink-0 text-current transition-transform duration-200 ease-out group-hover/nav:rotate-180" />
        )}
      </button>

      <div
        className="pointer-events-none invisible absolute left-0 top-full z-50 min-w-[260px] pt-3 group-hover/nav:pointer-events-auto group-hover/nav:visible group-focus-within/nav:pointer-events-auto group-focus-within/nav:visible"
        role="menu"
        aria-label={label}
      >
        <ul className="overflow-hidden rounded-none border border-zinc-100 bg-white py-1.5 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.18)] ring-1 ring-zinc-900/5">
          {items.map((item) => (
            <li key={item.label} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className="btn-mui-nav-link header-fluid-text block px-4 py-2.5 font-normal text-ink tracking-[-0.16px] focus-visible:outline-none"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavDropdown;
