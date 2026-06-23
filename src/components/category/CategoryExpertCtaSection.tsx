import Image from 'next/image';
import Link from 'next/link';
import { EXPERT_CTA } from '@/lib/categoryPageSections';

export type ExpertCtaContent = {
  headingLines: string[];
  subheading?: string;
  cta: { href: string; label: string };
  image: { src: string; alt: string };
};

export type CategoryExpertCtaSectionProps = {
  variant?: 'fullBleed' | 'card';
  content?: ExpertCtaContent;
  headingId?: string;
  className?: string;
};

function ExpertDecorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="190"
      height="206"
      viewBox="0 0 190 206"
      fill="none"
      aria-hidden
    >
      <g opacity="0.1">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.6735 60.9705L118.511 149.177L145.721 149.38L65.5219 61.1628L39.6735 60.9705Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M129.542 32.3057L30.2113 170.576C27.5358 174.3 26.9742 175.072 26.4 175.881C25.8257 176.689 25.4571 177.23 24.9149 178.06C24.3727 178.89 23.8598 179.695 21.3727 183.548L10.5259 200.35C9.74522 201.559 10.093 203.172 11.3027 203.953C12.3557 204.632 13.7433 204.466 14.6064 203.558L28.6332 188.797C31.7127 185.556 32.3396 184.903 32.9798 184.225C33.6199 183.546 34.0219 183.107 34.6403 182.408C35.2588 181.71 35.8527 181.027 38.8047 177.67L149.897 51.3322C151.386 49.6386 152.754 47.8419 153.99 45.9556C155.82 43.165 156.826 43.7877 157.007 47.8247C157.134 50.6398 157.307 54.4921 157.527 59.3814C157.828 66.0793 163.504 71.265 170.204 70.9639C176.904 70.6629 182.091 64.9891 181.79 58.2912L179.934 17.0092C179.919 16.6743 179.907 16.3393 179.899 16.0042C179.744 9.47381 178.642 5.49945 176.594 4.08111C171.241 0.373226 159.749 2.43335 156.605 2.96502C152.21 3.70829 136.662 5.88828 109.962 9.50499C104.229 10.2816 100.211 15.5574 100.988 21.2889C101.032 21.6134 101.091 21.9357 101.165 22.2546L101.222 22.4966C102.656 28.6607 108.637 32.6473 114.881 31.5998L125.617 29.798C125.854 29.7583 126.09 29.7168 126.326 29.6735C128.534 29.2678 129.858 29.2244 130.298 29.5425C130.76 29.8765 130.508 30.7976 129.542 32.3057Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <g clipPath="url(#category-expert-phone-clip)">
        <path
          d="M14.1797 19.0725C15.8789 19.0725 17.002 18.6135 17.9883 17.51C18.0664 17.4221 18.1348 17.344 18.2129 17.2561C18.7988 16.6116 19.0723 15.9768 19.0723 15.3713C19.0723 14.6682 18.6719 13.9846 17.8027 13.3889L15.3516 11.7092C14.5996 11.2014 13.9648 11.1721 13.0273 11.6213L11.5137 12.3635C11.2207 12.5002 10.9668 12.5002 10.6836 12.3245C10.2539 12.051 9.16992 11.1819 8.4375 10.4299C7.69531 9.68774 6.97266 8.79907 6.65039 8.24243C6.52344 8.01782 6.54297 7.83228 6.70898 7.5686L7.58789 6.19165C7.96875 5.58618 8.08594 4.7561 7.59766 4.05298L5.66406 1.27954C5.05859 0.4104 4.4043 0.0100097 3.70117 0.000244095C3.0957 -0.00952153 2.46094 0.273682 1.80664 0.859619C1.72852 0.927978 1.64062 1.0061 1.5625 1.08423C0.458984 2.06079 0 3.18384 0 4.87329C0 7.66626 1.72852 11.0842 4.86328 14.2092C7.97852 17.3245 11.3867 19.0725 14.1797 19.0725Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="category-expert-phone-clip">
          <rect width="19.4336" height="19.0728" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="15" viewBox="0 0 18 15" fill="currentColor" aria-hidden>
      <path d="M10.6333 15c.2326 0 .4361-.0891.63-.2771l6.4459-6.5599c.1938-.188.2908-.4156.2908-.663s-.097-.475-.2908-.663L11.2827.2968C11.0694.0792 10.8659 0 10.6333 0c-.475 0-.8434.3562-.8434.851 0 .2375.0775.465.2326.6234l2.1714 2.2559 4.0419 3.7698-4.0419 3.7697-2.1714 2.256c-.1551.1484-.2326.3859-.2326.6233 0 .495.3684.851.8434.851ZM.853 8.3806h12.2617l3.1211-.1979c.3974-.0297.6688-.277.6688-.6827 0-.4057-.2714-.6531-.6688-.6828l-3.1211-.1978H.853C.349 6.6194 0 6.9855 0 7.5c0 .5145.349.8806.853.8806Z" />
    </svg>
  );
}

function ExpertCtaCard({ content, headingId }: { content: ExpertCtaContent; headingId: string }) {
  const { headingLines, cta, image } = content;

  return (
    <div className="category-expert-heading relative overflow-hidden rounded-lg bg-[#0D0D0D]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_120%_at_100%_50%,rgba(253,2,45,0.45),transparent_65%)]"
        aria-hidden
      />
      <div className="relative flex flex-col items-center gap-4 px-5 py-6 sm:flex-row sm:gap-8 md:px-8 md:py-7">
        <div className="relative mx-auto h-[150px] w-[130px] shrink-0 sm:mx-0 sm:h-[170px] sm:w-[150px]">
          <ExpertDecorIcon className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-[120px] sm:w-[140px]" />
          <div className="relative z-10 h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="150px"
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center text-center sm:items-start sm:text-left">
          <h2
            id={headingId}
            className="max-w-lg text-[16px] font-medium leading-snug text-white md:text-[18px]"
          >
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Link
            href={cta.href}
            className="btn-brand mt-4 inline-flex h-10 items-center justify-center gap-2 px-5 text-[13px] font-semibold"
          >
            {cta.label}
            <ArrowRightIcon className="btn-arrow-icon shrink-0 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ExpertCtaFullBleed({ content, headingId }: { content: ExpertCtaContent; headingId: string }) {
  const { headingLines, subheading, cta, image } = content;

  return (
    <section
      className="category-expert-heading full-bleed relative z-20 overflow-visible bg-[#0D0D0D] pb-[100px] md:pb-0"
      aria-labelledby={headingId}
    >
      <div className="site-container relative overflow-visible">
        <div className="grid items-center gap-[35px] overflow-visible lg:grid-cols-[minmax(0,3.5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="relative mx-auto flex min-w-0 w-full items-center justify-center overflow-visible lg:mx-0 lg:justify-start">
            <ExpertDecorIcon className="pointer-events-none absolute bottom-0 right-[calc(var(--spacing)*6)] z-0 h-auto w-[290px]" />

            <div className="relative z-10 lg:-mt-10 overflow-visible">
              <div className="relative mx-auto h-[400px] w-[300px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="300px"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 max-w-full self-center pb-0 text-center lg:justify-self-end lg:text-left">
            <h2
              id={headingId}
              className="max-w-full text-[28px] font-bold leading-[1.25] text-white md:text-[34px] lg:text-[36px]"
            >
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            {subheading ? (
              <p className="mt-4 text-[16px] font-medium leading-[1.6] text-white/80 md:text-[17px]">
                {subheading}
              </p>
            ) : null}
            <Link
              href={cta.href}
              className="btn-brand mt-8 inline-flex h-[54px] items-center justify-center gap-3 px-8"
            >
              {cta.label}
              <PhoneIcon className="h-5 w-5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CategoryExpertCtaSection({
  variant = 'fullBleed',
  content = EXPERT_CTA,
  headingId = 'category-expert-heading',
  className,
}: CategoryExpertCtaSectionProps = {}) {
  if (variant === 'card') {
    return (
      <div className={className}>
        <ExpertCtaCard content={content} headingId={headingId} />
      </div>
    );
  }

  return <ExpertCtaFullBleed content={content} headingId={headingId} />;
}
