import Image from 'next/image';
import Link from 'next/link';

export interface CategoryReview {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  rating: string;
  reviewsLabel: string;
}

export interface CategoryLogo {
  alt: string;
  src?: string;
}

export interface CategoryPageContent {
  slug: string;
  breadcrumbLabel: string;
  titlePrefix: string;
  titleAccent: string;
  subheading: string;
  heroImage: { src: string; alt: string; /** Bump when replacing the file at the same path */ version?: number | string };
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  reviews: CategoryReview[];
  collaboration: {
    lineBefore: string;
    lineHighlight: string;
    lineAfter: string;
    logos: CategoryLogo[];
  };
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 6.5L8 2l5.5 4.5V13a1 1 0 01-1 1h-3.5v-4H7v4H3.5a1 1 0 01-1-1V6.5z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="15"
      viewBox="0 0 18 15"
      fill="none"
      aria-hidden
    >
      <path
        d="M10.6333 15C10.8659 15 11.0694 14.9109 11.2633 14.7229L17.7092 8.16292C17.903 7.97492 18 7.74735 18 7.49999C18 7.25263 17.903 7.02506 17.7092 6.83707L11.2827 0.296834C11.0694 0.0791556 10.8659 0 10.6333 0C10.1583 0 9.78996 0.3562 9.78996 0.850923C9.78996 1.08839 9.86751 1.31596 10.0226 1.47428L12.1939 3.73021L16.2358 7.49999L12.1939 11.2697L10.0226 13.5257C9.86751 13.6741 9.78996 13.9116 9.78996 14.149C9.78996 14.6438 10.1583 15 10.6333 15ZM0.852987 8.3806H13.1147L16.2358 8.18271C16.6332 8.15303 16.9046 7.90566 16.9046 7.49999C16.9046 7.09432 16.6332 6.84696 16.2358 6.81728L13.1147 6.61938H0.852987C0.348949 6.61938 0 6.98548 0 7.49999C0 8.01451 0.348949 8.3806 0.852987 8.3806Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <g clipPath="url(#category-phone-clip)">
        <path
          d="M14.1797 19.0725C15.8789 19.0725 17.002 18.6135 17.9883 17.51C18.0664 17.4221 18.1348 17.344 18.2129 17.2561C18.7988 16.6116 19.0723 15.9768 19.0723 15.3713C19.0723 14.6682 18.6719 13.9846 17.8027 13.3889L15.3516 11.7092C14.5996 11.2014 13.9648 11.1721 13.0273 11.6213L11.5137 12.3635C11.2207 12.5002 10.9668 12.5002 10.6836 12.3245C10.2539 12.051 9.16992 11.1819 8.4375 10.4299C7.69531 9.68774 6.97266 8.79907 6.65039 8.24243C6.52344 8.01782 6.54297 7.83228 6.70898 7.5686L7.58789 6.19165C7.96875 5.58618 8.08594 4.7561 7.59766 4.05298L5.66406 1.27954C5.05859 0.4104 4.4043 0.0100097 3.70117 0.000244095C3.0957 -0.00952153 2.46094 0.273682 1.80664 0.859619C1.72852 0.927978 1.64062 1.0061 1.5625 1.08423C0.458984 2.06079 0 3.18384 0 4.87329C0 7.66626 1.72852 11.0842 4.86328 14.2092C7.97852 17.3245 11.3867 19.0725 14.1797 19.0725ZM14.1895 17.5881C11.6992 17.637 8.51562 15.7229 5.98633 13.2034C3.4375 10.6643 1.43555 7.36353 1.48438 4.86353C1.50391 3.78931 1.875 2.87134 2.64648 2.19751C2.70508 2.14868 2.76367 2.09985 2.82227 2.05103C3.11523 1.79712 3.4375 1.6604 3.71094 1.6604C4.00391 1.6604 4.24805 1.76782 4.44336 2.06079L6.20117 4.69751C6.36719 4.94165 6.35742 5.15649 6.16211 5.49829L5.18555 7.06079C4.75586 7.75415 4.83398 8.28149 5.26367 8.86743C5.83008 9.61938 6.67969 10.7034 7.43164 11.4456C8.17383 12.1877 9.41406 13.2424 10.0879 13.7112C10.6738 14.1409 11.2012 14.2385 12.1094 13.7991L13.75 13.0178C14.1211 12.8518 14.4141 12.9006 14.7266 13.0959L17.0117 14.6292C17.3047 14.8147 17.4121 15.0686 17.4121 15.3616C17.4121 15.635 17.2754 15.9573 17.0215 16.2502C16.9727 16.3088 16.9238 16.3674 16.875 16.426C16.2012 17.1975 15.2734 17.5686 14.1895 17.5881Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
      </g>
      <defs>
        <clipPath id="category-phone-clip">
          <rect width="19.4336" height="19.0728" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.01902 14.8627C3.30952 15.0888 3.67795 15.0111 4.11724 14.6932L7.86538 11.9453L11.6206 14.6932C12.0598 15.0111 12.4212 15.0888 12.7188 14.8627C13.0093 14.6437 13.073 14.2835 12.8959 13.7678L11.4151 9.37398L15.1986 6.66138C15.638 6.35057 15.8151 6.02562 15.7017 5.67242C15.5883 5.33335 15.2553 5.17087 14.7098 5.17087H10.0689L8.65889 0.784104C8.4889 0.261369 8.2338 0 7.86538 0C7.50399 0 7.24894 0.261369 7.0789 0.784104L5.66892 5.17087H1.02805C0.482481 5.17087 0.149473 5.33335 0.0361076 5.67242C-0.0843426 6.02562 0.099875 6.35057 0.539164 6.66138L4.32271 9.37398L2.84188 13.7678C2.66475 14.2835 2.72852 14.6437 3.01902 14.8627Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CategoryLogoRow({ logos }: { logos: CategoryLogo[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 md:justify-around">
      {logos.map((logo) => (
        <div
          key={`${logo.alt}-${logo.src ?? 'text'}`}
          className="flex h-9 min-w-[80px] max-w-[120px] items-center justify-center px-2 md:min-w-[100px] md:max-w-[140px]"
        >
          {logo.src ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={36}
              className="h-auto max-h-full w-auto max-w-full object-contain"
              sizes="140px"
            />
          ) : (
            <span className="text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              {logo.alt}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function ReviewBlock({ review }: { review: CategoryReview }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <div className="relative h-6 w-20">
        <Image src={review.logoSrc} alt={review.logoAlt} fill sizes="80px" className="object-contain object-left" />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-heading">
        <StarIcon className="shrink-0 text-black" />
        <span>{review.rating}</span>
        <span className="font-medium text-subtle">{review.reviewsLabel}</span>
      </div>
    </div>
  );
}

export default function CategoryHeroSection({
  breadcrumbLabel,
  titlePrefix,
  titleAccent,
  subheading,
  heroImage,
  primaryCta,
  secondaryCta,
  reviews,
  collaboration,
}: CategoryPageContent) {
  const accentParts = (() => {
    if (titleAccent === 'Agile and Scrum') {
      return [
        { text: 'Agile', className: 'text-brand' },
        { text: ' and ', className: 'text-gold' },
        { text: 'Scrum', className: 'text-success' },
      ];
    }
    return [{ text: titleAccent, className: 'text-career-growth-gradient bg-clip-text text-transparent' }];
  })();

  return (
    <section
      className="full-bleed relative overflow-visible bg-surface pb-8 pt-8 md:pb-10 md:pt-10 lg:pb-12"
      aria-labelledby="category-hero-heading"
    >
      <div className="site-container relative z-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[14px] font-medium">
          <Link href="/" className="text-brand transition hover:opacity-80" aria-label="Home">
            <HomeIcon className="h-4 w-4" />
          </Link>
          <span className="text-brand/60" aria-hidden>
            &gt;
          </span>
          <span className="text-brand">{breadcrumbLabel}</span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          <div className="max-w-xl">
            <h1 id="category-hero-heading" className="text-heading">
              <span className="block text-[40px] font-extrabold leading-[60px] text-heading">
                {titlePrefix}
              </span>
              <span className="mt-1 block text-[40px] font-extrabold leading-[1.1] tracking-tight md:text-[52px] lg:text-[64px]">
                {accentParts.map((part) => (
                  <span key={part.text} className={part.className}>
                    {part.text}
                  </span>
                ))}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-[16px] font-medium leading-[1.6] text-muted md:text-[17px]">
              {subheading}
            </p>

            {reviews.length > 0 ? (
              <div className="mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-5">
                {reviews.map((review) => (
                  <ReviewBlock key={review.id} review={review} />
                ))}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link href={primaryCta.href} className="btn-brand h-[54px] gap-2 px-6 md:px-7">
                {primaryCta.label}
                <ArrowRightIcon className="shrink-0" />
              </Link>
              <Link
                href={secondaryCta.href}
                className="btn-brand-outline inline-flex h-[54px] items-center justify-center gap-[18px] px-6 text-sm font-semibold shadow-[0_4px_4px_0_rgba(30,41,59,0.03),0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.11)] transition hover:bg-brand/5 md:px-8 md:text-[15px]"
              >
                {secondaryCta.label}
                <PhoneIcon className="h-5 w-5 text-brand" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[558px] lg:mx-0 lg:ml-auto">
            <div className="relative h-[610px] w-[558px] max-w-full overflow-hidden rounded-2xl shadow-[0_8px_30px_-12px_rgba(15,23,42,0.2)]">
              <Image
                src={
                  heroImage.version != null
                    ? `${heroImage.src}?v=${heroImage.version}`
                    : heroImage.src
                }
                alt={heroImage.alt}
                width={558}
                height={610}
                priority
                sizes="558px"
                className="h-[610px] w-[558px] max-w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="relative -mt-15">
          <div className="relative z-10 rounded-lg border border-zinc-100 bg-white px-6 py-8 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:px-10 md:py-10">
            <p className="mb-6 text-center text-[22px] font-semibold leading-normal text-heading md:text-[28px]">
              {collaboration.lineBefore}
              <span className="font-semibold text-brand">
                {collaboration.lineHighlight}
              </span>
              {collaboration.lineAfter}
            </p>
            <CategoryLogoRow logos={collaboration.logos} />
          </div>
        </div>
      </div>
    </section>
  );
}
