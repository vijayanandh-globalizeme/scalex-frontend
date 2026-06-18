'use client';

import { Fragment, useEffect, useState } from 'react';

const INITIAL_SECONDS = 4 * 3600 + 38 * 60 + 54;

function TimerDot() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
      <circle cx="4" cy="4" r="4" fill="#788593" />
    </svg>
  );
}

function TimerColonSeparator() {
  return (
    <div className="flex w-8 shrink-0 items-center justify-center" aria-hidden>
      <div className="flex flex-col items-center justify-center gap-2">
        <TimerDot />
        <TimerDot />
      </div>
    </div>
  );
}

function formatCountdown(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: 'Days', value: String(days).padStart(2, '0') },
    { label: 'Hours', value: String(hours).padStart(2, '0') },
    { label: 'Min', value: String(minutes).padStart(2, '0') },
    { label: 'Sec', value: String(seconds).padStart(2, '0') },
  ];
}

export default function TechnicalCourseWebinarCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = formatCountdown(secondsLeft);

  return (
    <div className="flex flex-wrap items-center">
      {units.map((unit, index) => (
        <Fragment key={unit.label}>
          {index > 0 ? <TimerColonSeparator /> : null}
          <div
            className="flex min-w-[58px] flex-col items-center rounded-[8px] border border-[#FD022D] bg-white px-2 py-1.5 shadow-[0_4px_4px_0_rgba(30,41,59,0.03),0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.11)]"
          >
            <span className="text-[16px] font-semibold leading-normal text-[#1E293B]">{unit.value}</span>
            <span className="mt-1 text-[14px] font-normal leading-normal text-[#788593]">{unit.label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
