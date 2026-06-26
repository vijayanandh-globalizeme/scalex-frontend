import Image from 'next/image';

export interface ComparisonRow {
  id: string;
  /** Row label rendered on the far left (e.g., Features, Learning Mode...) */
  label: string;
  others: { title: string; description: string };
  scalex: { title: string; description: string };
}

export interface WhyScaleXSectionProps {
  headingBefore: string;
  headingAfter: string;
  brandLogo: { src: string; alt: string };
  subheading: string;
  rows: ComparisonRow[];
  othersLabel?: string;
  scalexBrandLogo?: { src: string; alt: string };
  id?: string;
  className?: string;
  variant?: 'fullBleed' | 'embedded';
  headingId?: string;
}

const CARD_SHADOW =
  'shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)]';

const EMBEDDED_CARD_SHADOW =
  'shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

const SCALEX_CARD_CLASS = `rounded-lg border-[0.5px] border-[#FD022D] bg-white ${CARD_SHADOW}`;

const EMBEDDED_OTHERS_CARD_CLASS = `rounded-[20px] border border-[#EBEBEB] bg-white ${EMBEDDED_CARD_SHADOW}`;

const EMBEDDED_SCALEX_CARD_CLASS = `rounded-[20px] border-[0.5px] border-[#FD022D] bg-white ${EMBEDDED_CARD_SHADOW}`;

const ROW_MIN_HEIGHT = 'min-h-[92px]';

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M19.6437 9.99512C19.6437 15.5022 15.2432 19.9903 9.82186 19.9903C4.41021 19.9903 0 15.5022 0 9.99512C0 4.47821 4.41021 0 9.82186 0C15.2432 0 19.6437 4.47821 19.6437 9.99512ZM12.6722 5.99707L9.83228 8.86654L7.00048 5.99707C6.84641 5.84028 6.65383 5.7619 6.44198 5.7619C5.99903 5.7619 5.64276 6.11466 5.64276 6.55562C5.64276 6.781 5.72942 6.97698 5.87386 7.13378L8.70043 10.0102L5.87386 12.8663C5.72942 13.0329 5.64276 13.219 5.64276 13.4444C5.64276 13.8952 5.99903 14.2676 6.44198 14.2676C6.67309 14.2676 6.86567 14.1696 7.01974 14.0226L9.82948 11.1592L12.6433 14.0226C12.7973 14.1696 12.9899 14.2676 13.221 14.2676C13.6544 14.2676 14.0106 13.8952 14.0106 13.4444C14.0106 13.219 13.9336 13.0329 13.7795 12.8663L10.9589 10.0082L13.7795 7.13378C13.9336 6.97698 14.0106 6.781 14.0106 6.55562C14.0106 6.11466 13.6544 5.7619 13.221 5.7619C12.9995 5.7619 12.8165 5.84028 12.6722 5.99707Z"
        fill="#788593"
      />
    </svg>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 23 23" fill="none" aria-hidden>
      <path
        d="M13.1487 0.96013L14.6829 2.50848C14.8423 2.66027 14.9818 2.71087 15.191 2.71087H17.3427C19.1359 2.71087 19.9528 3.56094 19.9528 5.36229V7.55831C19.9528 7.76071 20.0126 7.91251 20.162 8.06431L21.6862 9.62277C22.9414 10.8979 22.9514 12.0819 21.6862 13.357L20.162 14.9155C20.0126 15.0774 19.9528 15.2191 19.9528 15.4316V17.6175C19.9528 19.439 19.126 20.2689 17.3427 20.2689H15.191C14.9818 20.2689 14.8423 20.3296 14.6829 20.4814L13.1487 22.0297C11.8935 23.3049 10.728 23.315 9.47271 22.0297L7.93855 20.4814C7.78912 20.3296 7.63969 20.2689 7.44044 20.2689H5.27867C3.49546 20.2689 2.6686 19.429 2.6686 17.6175V15.4316C2.6686 15.2191 2.61879 15.0774 2.46936 14.9155L0.945157 13.357C-0.310066 12.0819 -0.320029 10.8979 0.945157 9.62277L2.46936 8.06431C2.61879 7.91251 2.6686 7.76071 2.6686 7.55831V5.36229C2.6686 3.54071 3.49546 2.71087 5.27867 2.71087H7.44044C7.63969 2.71087 7.78912 2.66027 7.93855 2.50848L9.47271 0.96013C10.728 -0.314978 11.8935 -0.325098 13.1487 0.96013Z"
        fill="#FD022D"
      />
      <path
        d="M14.4139 7.47735L10.1601 14.4196L8.13779 11.7682C7.88874 11.4342 7.66957 11.3331 7.39064 11.3331C6.93238 11.3331 6.5837 11.7075 6.5837 12.173C6.5837 12.3957 6.67336 12.6284 6.8228 12.8308L9.32328 15.9477C9.58229 16.3019 9.86123 16.4335 10.1999 16.4335C10.5386 16.4335 10.8275 16.2715 11.0368 15.9477L15.7189 8.44886C15.8385 8.24647 15.968 8.01371 15.968 7.78095C15.968 7.31543 15.5596 7.01184 15.1312 7.01184C14.8622 7.01184 14.6032 7.16364 14.4139 7.47735Z"
        fill="white"
        fillOpacity="0.95"
      />
    </svg>
  );
}

export default function WhyScaleXSection({
  headingBefore,
  headingAfter,
  brandLogo,
  subheading,
  rows,
  othersLabel = 'Others',
  scalexBrandLogo,
  id,
  className,
  variant = 'fullBleed',
  headingId = 'why-scalex-heading',
}: WhyScaleXSectionProps) {
  const cardHeaderHeight = 'h-[52px]';
  const isEmbedded = variant === 'embedded';

  const header = (
    <header className={`w-full ${isEmbedded ? 'text-left' : 'text-center'}`}>
      <h2
        id={headingId}
        className={`inline-flex flex-wrap items-center gap-x-2 text-heading ${
          isEmbedded
            ? 'text-[34px] font-bold leading-[140%]'
            : 'justify-center text-center text-[34px] font-bold leading-[140%]'
        }`}
      >
        <span>{headingBefore}</span>
        <span className="inline-flex items-center">
          <Image
            src={brandLogo.src}
            alt={brandLogo.alt}
            width={162}
            height={62}
            className="h-[62px] w-[162px] object-contain"
          />
        </span>
        {headingAfter ? <span>{headingAfter}</span> : null}
      </h2>
      <p
        className={`text-muted ${
          isEmbedded
            ? 'mt-3 text-[18px] font-medium leading-[140%]'
            : 'mt-3 text-center text-[18px] font-medium leading-[140%]'
        }`}
      >
        {subheading}
      </p>
    </header>
  );

  const rowLabelClassName = isEmbedded
    ? 'text-[16px] font-medium text-muted'
    : 'text-[16px] font-medium text-heading';

  const comparisonGrid = (
    <div className={`w-full ${isEmbedded ? 'mt-10 md:mt-14' : 'mx-auto mt-10 max-w-[1080px] md:mt-14'}`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-5">
        {/* Row labels — desktop only */}
        <div className="hidden shrink-0 lg:block lg:w-[148px]">
          <div
            className={`${cardHeaderHeight} flex items-center justify-end pr-4 text-right ${rowLabelClassName}`}
          >
            Features
          </div>
          <div className="flex flex-col">
            {rows.map((row) => (
              <div
                key={`label-${row.id}`}
                className={`flex ${ROW_MIN_HEIGHT} items-center justify-end pr-4 text-right ${rowLabelClassName}`}
              >
                {row.label}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison cards */}
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 md:grid-cols-2 md:gap-5">
          {/* Others */}
          <div
            className={`${
              isEmbedded
                ? EMBEDDED_OTHERS_CARD_CLASS
                : `rounded-lg border border-zinc-100 bg-white ${CARD_SHADOW}`
            } px-6 py-6 md:px-7 md:py-7`}
          >
            <h3
              className={`${cardHeaderHeight} flex items-center justify-center text-[18px] font-semibold text-heading md:text-[20px]`}
            >
              {othersLabel}
            </h3>
            <ul className="flex flex-col">
              {rows.map((row) => (
                <li
                  key={`others-${row.id}`}
                  className={`flex ${ROW_MIN_HEIGHT} items-start gap-3 pt-1 first:pt-0`}
                >
                  <CrossIcon className="mt-0.5 h-5 w-5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold leading-snug text-heading md:text-[16px]">
                      {row.others.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted md:text-[14px]">
                      {row.others.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* EdgeX */}
          <div
            className={`${
              isEmbedded ? EMBEDDED_SCALEX_CARD_CLASS : SCALEX_CARD_CLASS
            } px-6 py-6 md:px-7 md:py-7`}
          >
            <div className={`${cardHeaderHeight} flex items-center justify-center`}>
              {scalexBrandLogo ? (
                <Image
                  src={scalexBrandLogo.src}
                  alt={scalexBrandLogo.alt}
                  width={130}
                  height={40}
                  className="h-[40px] w-auto max-w-[130px] object-contain"
                />
              ) : (
                <h3 className="text-[18px] font-semibold text-heading md:text-[20px]">ScaleX</h3>
              )}
            </div>
            <ul className="flex flex-col">
              {rows.map((row) => (
                <li
                  key={`scalex-${row.id}`}
                  className={`flex ${ROW_MIN_HEIGHT} items-start gap-3 pt-1 first:pt-0`}
                >
                  <CheckBadgeIcon className="mt-0.5 h-[22px] w-[22px] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold leading-snug md:text-[16px]">
                      {row.scalex.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted md:text-[14px]">
                      {row.scalex.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  if (isEmbedded) {
    return (
      <section
        id={id}
        className={`scroll-mt-[116px] ${className ?? ''}`}
        aria-labelledby={headingId}
      >
        {header}
        {comparisonGrid}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`full-bleed relative bg-surface py-16 md:py-20 lg:py-24 ${className ?? ''}`}
      aria-labelledby={headingId}
    >
      <div className="site-container relative z-10">
        {header}
        {comparisonGrid}
      </div>
    </section>
  );
}
