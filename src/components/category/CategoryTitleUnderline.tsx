import { useId } from 'react';

type CategoryTitleUnderlineProps = {
  className?: string;
};

export default function CategoryTitleUnderline({ className }: CategoryTitleUnderlineProps) {
  const gradientId = `category-title-underline-${useId().replace(/:/g, '')}`;

  return (
    <span
      className={`mt-1 block h-[19px] w-full max-w-[358px] overflow-hidden ${className ?? ''}`}
      aria-hidden
    >
      <span className="inline-block h-[19px] w-[358px] max-w-full origin-left animate-category-title-underline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="358"
          height="19"
          viewBox="0 0 358 19"
          fill="none"
          className="block h-[19px] w-[358px] max-w-full"
        >
        <path
          d="M356.433 5.57693C311.699 1.53361 254.63 7.65521 197.333 7.97869C140.035 8.30216 83.0426 16.3565 25.745 16.6799C13.0292 17.1813 -2.07743 21.6484 0.237115 15.75C6.29024 7.76846 63.664 9.3777 120.885 7.12151C190.823 4.36396 260.607 -2.25902 330.773 0.781552C346.108 2.11261 362.715 3.39353 356.433 5.57693Z"
          fill={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="357.654"
            y1="1.02531"
            x2="-0.0681898"
            y2="15.13"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FD022D" />
            <stop offset="0.5" stopColor="#FFB301" />
            <stop offset="1" stopColor="#58BD0F" />
          </linearGradient>
        </defs>
        </svg>
      </span>
    </span>
  );
}
