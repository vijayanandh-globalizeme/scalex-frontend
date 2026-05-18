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

export type NavDropdownItem = {
  label: string;
  href: string;
};

type NavDropdownProps = {
  label: string;
  items: NavDropdownItem[];
  triggerClassName?: string;
};

const triggerBaseClass =
  'rounded-lg px-2.5 py-1.5 transition-colors duration-200 ease-out group-hover/nav:bg-accent-soft group-focus-within/nav:bg-accent-soft';

const NavDropdown = ({ label, items, triggerClassName }: NavDropdownProps) => {
  return (
    <div className="group/nav relative">
      <button
        type="button"
        className={[triggerBaseClass, triggerClassName].filter(Boolean).join(' ')}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        {label}
        <ChevronDown className="shrink-0 text-nav-chevron transition-transform duration-300 ease-out group-hover/nav:rotate-180" />
      </button>

      {/* Hover bridge + animated panel */}
      <div
        className="pointer-events-none absolute left-0 top-full z-50 min-w-[260px] pt-3 opacity-0 invisible -translate-y-1 scale-[0.98] transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:pointer-events-auto group-hover/nav:visible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:scale-100 group-focus-within/nav:pointer-events-auto group-focus-within/nav:visible group-focus-within/nav:opacity-100 group-focus-within/nav:translate-y-0 group-focus-within/nav:scale-100"
        role="menu"
        aria-label={label}
      >
        <ul className="overflow-hidden rounded-xl border border-zinc-100 bg-white py-1.5 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.18)] ring-1 ring-zinc-900/5">
          {items.map((item) => (
            <li key={item.label} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className="header-fluid-text block px-4 py-2.5 font-normal text-ink tracking-[-0.16px] transition-[background-color,color,padding-left] duration-200 ease-out hover:bg-accent-soft hover:pl-5 hover:text-brand focus-visible:bg-accent-soft focus-visible:pl-5 focus-visible:text-brand focus-visible:outline-none"
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
