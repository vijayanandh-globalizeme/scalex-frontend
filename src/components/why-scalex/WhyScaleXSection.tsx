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
}

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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 23 23" fill="none" aria-hidden>
      <path
        d="M13.1487 0.96013L14.6829 2.50848C14.8423 2.66027 14.9818 2.71087 15.191 2.71087H17.3427C19.1359 2.71087 19.9528 3.56094 19.9528 5.36229V7.55831C19.9528 7.76071 20.0126 7.91251 20.162 8.06431L21.6862 9.62277C22.9414 10.8979 22.9514 12.0819 21.6862 13.357L20.162 14.9155C20.0126 15.0774 19.9528 15.2191 19.9528 15.4316V17.6175C19.9528 19.439 19.126 20.2689 17.3427 20.2689H15.191C14.9818 20.2689 14.8423 20.3296 14.6829 20.4814L13.1487 22.0297C11.8935 23.3049 10.728 23.315 9.47271 22.0297L7.93855 20.4814C7.78912 20.3296 7.63969 20.2689 7.44044 20.2689H5.27867C3.49546 20.2689 2.6686 19.429 2.6686 17.6175V15.4316C2.6686 15.2191 2.61879 15.0774 2.46936 14.9155L0.945157 13.357C-0.310066 12.0819 -0.320029 10.8979 0.945157 9.62277L2.46936 8.06431C2.61879 7.91251 2.6686 7.76071 2.6686 7.55831V5.36229C2.6686 3.54071 3.49546 2.71087 5.27867 2.71087H7.44044C7.63969 2.71087 7.78912 2.66027 7.93855 2.50848L9.47271 0.96013C10.728 -0.314978 11.8935 -0.325098 13.1487 0.96013ZM14.4139 7.47735L10.1601 14.4196L8.13779 11.7682C7.88874 11.4342 7.66957 11.3331 7.39064 11.3331C6.93238 11.3331 6.5837 11.7075 6.5837 12.173C6.5837 12.3957 6.67336 12.6284 6.8228 12.8308L9.32328 15.9477C9.58229 16.3019 9.86123 16.4335 10.1999 16.4335C10.5386 16.4335 10.8275 16.2715 11.0368 15.9477L15.7189 8.44886C15.8385 8.24647 15.968 8.01371 15.968 7.78095C15.968 7.31543 15.5596 7.01184 15.1312 7.01184C14.8622 7.01184 14.6032 7.16364 14.4139 7.47735Z"
        fill="white"
        fillOpacity="0.85"
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
}: WhyScaleXSectionProps) {
  return (
    <section
      className="full-bleed relative bg-surface py-16 md:py-20 lg:py-24"
      aria-labelledby="why-scalex-heading"
    >
      <div className="site-container relative z-10">
        <header className="w-full text-center">
          <h2
            id="why-scalex-heading"
            className="inline-flex flex-wrap items-center justify-center gap-x-3 text-center text-[34px] font-bold leading-[140%] text-heading"
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
            <span>{headingAfter}</span>
          </h2>
          <p className="mt-3 text-center text-[18px] font-medium leading-[140%] text-muted">
            {subheading}
          </p>
        </header>

        {/* Comparison grid: row labels | Others | ScaleX */}
        <div className="mx-auto mt-10 grid w-full max-w-[1080px] grid-cols-1 gap-6 md:mt-14 md:grid-cols-[160px_1fr_1fr] md:gap-0">
          {/* Row labels (md+) */}
          <div className="hidden flex-col gap-12 pt-16 pr-4 text-right md:flex">
            {rows.map((r) => (
              <div
                key={`label-${r.id}`}
                className="text-[16px] font-medium leading-normal text-heading"
              >
                {r.label}
              </div>
            ))}
          </div>

          {/* Others column */}
          <div className="rounded-2xl bg-white px-6 pb-8 pt-6 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] md:rounded-r-none md:rounded-l-2xl md:px-8 md:pt-8">
            <h3 className="mb-6 text-center text-[18px] font-semibold text-heading md:text-[20px]">
              {othersLabel}
            </h3>
            <ul className="flex flex-col gap-6">
              {rows.map((r) => (
                <li key={`others-${r.id}`} className="flex items-start gap-3">
                  <CrossIcon className="mt-0.5 h-[18px] w-[18px] shrink-0" />
                  <div>
                    <p className="text-[16px] font-medium leading-normal text-heading">
                      {r.others.title}
                    </p>
                    <p className="mt-0.5 text-[14px] font-normal leading-normal text-muted">
                      {r.others.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ScaleX column */}
          <div className="rounded-2xl bg-navy px-6 pb-8 pt-6 text-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.35)] md:rounded-l-none md:rounded-r-2xl md:px-8 md:pt-8">
            <div className="mb-6 flex items-center justify-center">
              {scalexBrandLogo ? (
                <Image
                  src={scalexBrandLogo.src}
                  alt={scalexBrandLogo.alt}
                  width={110}
                  height={42}
                  className="h-[42px] w-[110px] object-contain"
                />
              ) : (
                <h3 className="text-[18px] font-semibold md:text-[20px]">ScaleX</h3>
              )}
            </div>
            <ul className="flex flex-col gap-6">
              {rows.map((r) => (
                <li key={`scalex-${r.id}`} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-[18px] w-[18px] shrink-0" />
                  <div>
                    <p className="text-[16px] font-medium leading-normal text-white">
                      {r.scalex.title}
                    </p>
                    <p className="mt-0.5 text-[14px] font-normal leading-normal text-navy-muted">
                      {r.scalex.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
