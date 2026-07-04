'use client';

import { useEffect, useRef, useState } from 'react';
import type { CourseNavItem } from '@/lib/courseNavItems';

const HEADER_HEIGHT_PX = 64;
const NAV_HEIGHT_PX = 52;
const SCROLL_IDLE_MS = 150;

function getNavTargetId(item: CourseNavItem) {
  return item.href.replace(/^#/, '');
}

function CallIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#course-sticky-call-clip)">
        <path
          d="M18.2229 23.9996C20.4066 23.9996 21.85 23.422 23.1175 22.0335C23.2179 21.9229 23.3058 21.8246 23.3936 21.714C24.1467 20.903 24.5106 20.1042 24.5106 19.3423C24.5106 18.4575 23.996 17.5973 22.879 16.8477L19.729 14.7341C18.7626 14.0951 17.9468 14.0583 16.7419 14.6235L14.7841 15.5574C14.4202 15.7295 14.0939 15.7295 13.7299 15.5084C13.1777 15.1642 11.7847 14.0706 10.8308 13.1243C9.88957 12.1904 8.96086 11.0722 8.5467 10.3717C8.38355 10.0891 8.40865 9.85564 8.62199 9.52385L9.75152 7.79118C10.241 7.02929 10.3916 5.98477 9.75152 5.10001L7.27912 1.61009C6.50101 0.516421 5.6476 0.0125956 4.75653 0.000307154C3.97841 -0.0119813 3.16266 0.344384 2.32179 1.08169C2.22139 1.16771 2.10843 1.26601 2.00803 1.36433C0.58986 2.59317 0 4.00634 0 6.13224C0 9.64673 2.20884 13.9477 6.23746 17.88C10.2535 21.8 14.6335 23.9996 18.2229 23.9996ZM18.2355 22.1317C15.0351 22.1933 10.9312 19.7847 7.68073 16.6143C4.41768 13.4193 1.84489 9.2658 1.90764 6.11996C1.93274 4.76823 2.40964 3.61311 3.4011 2.76521C3.47641 2.70376 3.55171 2.64232 3.62702 2.58089C4.00351 2.26138 4.41768 2.08934 4.76909 2.08934C5.14559 2.08934 5.45935 2.22451 5.71035 2.59317L7.96939 5.91105C8.18274 6.21826 8.17019 6.4886 7.90663 6.9187L6.66417 8.88485C6.11196 9.75733 6.19981 10.4209 6.76456 11.1582C7.47993 12.1044 8.58435 13.4685 9.55071 14.4024C10.5045 15.3362 12.0984 16.6634 12.9518 17.2533C13.7174 17.794 14.3951 17.9168 15.5497 17.3639L17.6707 16.3808C18.1476 16.1719 18.5242 16.2333 18.9258 16.479L21.8625 18.4085C22.2264 18.6419 22.377 18.9614 22.377 19.3301C22.377 19.6741 22.2013 20.0797 21.875 20.4482C21.7997 20.522 21.7495 20.5957 21.6742 20.6694C20.8208 21.6402 19.6285 22.1072 18.2355 22.1317Z"
          fill="#FD022D"
        />
        <path
          d="M23.1183 1.63466L22.8044 6.41487L22.792 8.24585C22.8044 8.7251 23.181 9.09376 23.6705 9.11833C24.1599 9.14291 24.5991 8.74968 24.5991 8.24585V1.11855C24.5867 0.479553 24.2604 0.147766 23.6076 0.147766H16.3034C15.789 0.147766 15.3874 0.565573 15.425 1.0694C15.4501 1.54864 15.814 1.90502 16.3034 1.89272L18.2111 1.90502L23.1183 1.63466ZM23.5449 2.28595C23.8211 1.97874 23.8336 1.49949 23.5449 1.20457C23.2437 0.909649 22.7417 0.921938 22.428 1.20457L19.7924 3.58853L14.3959 8.89714C14.195 9.09376 14.082 9.31495 14.082 9.57301C14.0946 10.0523 14.4962 10.4332 15.0234 10.4209C15.2744 10.4332 15.4877 10.3472 15.676 10.1629L21.085 4.86653L23.5449 2.28595Z"
          fill="#FD022D"
        />
      </g>
      <defs>
        <clipPath id="course-sticky-call-clip">
          <rect width="25" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function CourseDetailStickyNav({
  items,
  phone,
}: {
  items: readonly CourseNavItem[];
  phone: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? 'overview');
  const pendingScrollIdRef = useRef<string | null>(null);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stickyOffset = HEADER_HEIGHT_PX + NAV_HEIGHT_PX;

    function clearScrollIdleTimer() {
      if (scrollIdleTimerRef.current !== null) {
        clearTimeout(scrollIdleTimerRef.current);
        scrollIdleTimerRef.current = null;
      }
    }

    function releasePendingScroll() {
      if (pendingScrollIdRef.current === null) return;
      pendingScrollIdRef.current = null;
      updateActiveFromScroll();
    }

    function schedulePendingScrollRelease() {
      clearScrollIdleTimer();
      scrollIdleTimerRef.current = setTimeout(releasePendingScroll, SCROLL_IDLE_MS);
    }

    function getSectionTop(item: CourseNavItem) {
      const element = document.getElementById(getNavTargetId(item));
      if (!element) return null;
      return element.getBoundingClientRect().top + window.scrollY;
    }

    function updateActiveFromScroll() {
      if (pendingScrollIdRef.current) {
        setActiveId(pendingScrollIdRef.current);
        schedulePendingScrollRelease();
        return;
      }

      const scrollLine = window.scrollY + stickyOffset + 2;

      const sections = items
        .map((item) => ({ item, top: getSectionTop(item) }))
        .filter((entry): entry is { item: CourseNavItem; top: number } => entry.top !== null)
        .sort((a, b) => a.top - b.top);

      if (sections.length === 0) return;

      let active = sections[0].item;
      for (const section of sections) {
        if (section.top <= scrollLine) {
          active = section.item;
        }
      }

      setActiveId(active.id);
      // auto-scroll the nav bar on mobile so the active tab is visible
      const navEl = navScrollRef.current;
      if (navEl) {
        const activeBtn = navEl.querySelector<HTMLButtonElement>(`[data-navid="${active.id}"]`);
        if (activeBtn) {
          const btnLeft = activeBtn.offsetLeft;
          const btnRight = btnLeft + activeBtn.offsetWidth;
          const visLeft = navEl.scrollLeft;
          const visRight = visLeft + navEl.offsetWidth;
          if (btnLeft < visLeft) {
            navEl.scrollTo({ left: btnLeft - 16, behavior: 'smooth' });
          } else if (btnRight > visRight) {
            navEl.scrollTo({ left: btnRight - navEl.offsetWidth + 16, behavior: 'smooth' });
          }
        }
      }
    }

    updateActiveFromScroll();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveFromScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll);
    window.addEventListener('scrollend', releasePendingScroll);

    return () => {
      cancelAnimationFrame(frame);
      clearScrollIdleTimer();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
      window.removeEventListener('scrollend', releasePendingScroll);
    };
  }, [items]);

  function scrollToSection(item: CourseNavItem) {
    const targetId = getNavTargetId(item);
    const target = document.getElementById(targetId);
    if (!target) return;

    const stickyOffset = HEADER_HEIGHT_PX + NAV_HEIGHT_PX;
    const top = target.getBoundingClientRect().top + window.scrollY - stickyOffset;

    pendingScrollIdRef.current = item.id;
    setActiveId(item.id);

    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth',
    });
  }

  return (
    <nav className="sticky top-16 z-40 mb-12" aria-label="Course sections">
      <div className="full-bleed bg-[#fcfcfc] shadow-[0_4px_4px_0_rgba(30,41,59,0.08),4px_-4px_4px_0_rgba(30,41,59,0.03)]">
        <div className="site-container">
          <div ref={navScrollRef} className="flex h-[52px] w-full items-stretch gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:justify-between lg:gap-0 [&::-webkit-scrollbar]:hidden">
            {items.map((item) => {
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  data-navid={item.id}
                  type="button"
                  onClick={() => scrollToSection(item)}
                  className={`flex shrink-0 cursor-pointer items-center border-0 border-b-[3px] bg-transparent p-0 text-[14px] font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-b-brand text-brand'
                      : 'border-b-transparent text-heading hover:text-brand'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className="btn-mui-brand-tint group flex h-9 w-9 shrink-0 cursor-pointer self-center items-center justify-center rounded-full"
              aria-label={`Call ${phone}`}
            >
              <CallIcon className="h-6 w-[25px] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 group-active:scale-95" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
