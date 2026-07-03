import Image from 'next/image';
import type { CourseFeePartnerLogo } from '@/lib/courseBody';
import type { ApiCoursePlanBatch } from '@/services/courseApi';
import { COURSE_FEE_STATIC } from '@/lib/courseDetailStatics';
import { COURSE_SECTION_CARD } from './courseSectionCard';
import CourseBrochureCta from './CourseBrochureCta';

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M14.1797 19.0725C15.8789 19.0725 17.002 18.6135 17.9883 17.51C18.0664 17.4221 18.1348 17.344 18.2129 17.2561C18.7988 16.6116 19.0723 15.9768 19.0723 15.3713C19.0723 14.6682 18.6719 13.9846 17.8027 13.3889L15.3516 11.7092C14.5996 11.2014 13.9648 11.1721 13.0273 11.6213L11.5137 12.3635C11.2207 12.5002 10.9668 12.5002 10.6836 12.3245C10.2539 12.051 9.16992 11.1819 8.4375 10.4299C7.69531 9.68774 6.97266 8.79907 6.65039 8.24243C6.52344 8.01782 6.54297 7.83228 6.70898 7.5686L7.58789 6.19165C7.96875 5.58618 8.08594 4.7561 7.59766 4.05298L5.66406 1.27954C5.05859 0.4104 4.4043 0.0100097 3.70117 0.000244095C3.0957 -0.00952153 2.46094 0.273682 1.80664 0.859619C1.72852 0.927978 1.64062 1.0061 1.5625 1.08423C0.458984 2.06079 0 3.18384 0 4.87329C0 7.66626 1.72852 11.0842 4.86328 14.2092C7.97852 17.3245 11.3867 19.0725 14.1797 19.0725Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeeFeatureIcon() {
  return (
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0]">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="6.5" stroke="#FD022D" strokeWidth="1.4" />
        <path d="M9 9L9 5.5" stroke="#FD022D" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9 9L11.8 10.6" stroke="#FD022D" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="9" r="1" fill="#FD022D" />
      </svg>
    </span>
  );
}

function PartnerLogo({ partner }: { partner: CourseFeePartnerLogo }) {
  if (partner.logoSrc) {
    return (
      <div className="relative h-8 w-[88px] shrink-0">
        <Image
          src={partner.logoSrc}
          alt={partner.logoAlt ?? partner.name}
          fill
          className="object-contain object-left"
          sizes="88px"
        />
      </div>
    );
  }
  if (partner.name === 'HDFC BANK') {
    return (
      <div className="flex h-8 shrink-0 items-center rounded bg-[#004C8F] px-2">
        <span className="text-[10px] font-bold tracking-wide text-white">HDFC BANK</span>
      </div>
    );
  }
  if (partner.name === 'ICICI Bank') {
    return (
      <div className="flex h-8 shrink-0 items-center gap-1">
        <span className="text-[18px] font-bold leading-none text-[#F58220]">i</span>
        <span className="text-[11px] font-semibold text-[#B02A30]">ICICI Bank</span>
      </div>
    );
  }
  if (partner.name === 'BAJAJ FINSERV') {
    return (
      <div className="flex h-8 shrink-0 items-center">
        <span className="text-[11px] font-bold tracking-wide text-[#005DAA]">BAJAJ FINSERV</span>
      </div>
    );
  }
  return <span className="text-[11px] font-semibold text-[#1E293B]">{partner.name}</span>;
}

function PricingCard({
  label,
  price,
  priceSuffix,
  description,
  enrollLabel,
  highlighted,
  badge,
  isEmi,
  onEnroll,
}: {
  label: string;
  price: string;
  priceSuffix?: string;
  description: string;
  enrollLabel: string;
  highlighted?: boolean;
  badge?: string;
  isEmi?: boolean;
  onEnroll?: () => void;
}) {
  return (
    <div
      className={`relative flex w-full min-w-0 flex-col rounded-[20px] border bg-white p-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)] sm:w-[232px] ${
        highlighted ? 'border-[#FD022D]' : 'border-[#EBEBEB]'
      }`}
      style={highlighted ? { background: 'linear-gradient(180deg, #FFF6F7 0%, #FFFFFF 28%)' } : undefined}
    >
      {badge ? (
        <span className="absolute top-4 right-4 rounded-lg bg-[#FFF6F7] px-2 py-0.5 text-[10px] font-medium leading-normal text-[#FD022D]">
          {badge}
        </span>
      ) : null}
      <p className="pr-16 text-[14px] font-medium leading-[140%] text-[#788593]">{label}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-1">
        <span className="text-[24px] font-bold leading-[140%] text-[#1E293B]">{price}</span>
        {priceSuffix ? (
          <span className="text-[14px] font-medium leading-[140%] text-[#788593]">{priceSuffix}</span>
        ) : null}
      </div>
      <p className="mt-3 text-[13px] font-normal leading-[150%] text-[#788593]">{description}</p>
      {isEmi ? (
        <button
          type="button"
          onClick={onEnroll}
          className="btn-brand-outline btn-brand-outline--flat mt-5 inline-flex h-[40px] w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-[12px] font-medium leading-[18px]"
        >
          {enrollLabel}
          <PhoneIcon className="shrink-0 text-brand" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onEnroll}
          className="btn-brand-outline btn-brand-outline--flat mt-5 inline-flex h-[40px] w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-[12px] font-medium leading-[18px]"
        >
          {enrollLabel}
          <ArrowRightIcon className="btn-arrow-icon shrink-0 text-brand" />
        </button>
      )}
    </div>
  );
}

export default function CourseFeeSection({
  batch,
  onEnroll,
  courseId = null,
}: {
  batch: ApiCoursePlanBatch;
  onEnroll?: (batch: ApiCoursePlanBatch) => void;
  courseId?: string | null;
}) {
  if (!batch?.plan1HasEMI) return null;

  const s = COURSE_FEE_STATIC;
  const sym = batch.currencySymbol ?? '₹';

  const emiPrice = batch.plan1SellingPrice && batch.plan1EMIMonthCount
    ? `${sym}${Math.ceil(Number(batch.plan1SellingPrice) / batch.plan1EMIMonthCount).toLocaleString('en-IN')}`
    : null;

  const fullPrice = batch.plan1SellingPrice
    ? `${sym}${Number(batch.plan1SellingPrice).toLocaleString('en-IN')}`
    : null;

  return (
    <section
      id="course-fee"
      className={`scroll-mt-[116px] px-6 py-5 md:px-8 md:py-6 ${COURSE_SECTION_CARD}`}
      aria-labelledby="course-fee-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="course-fee-heading" className="text-[34px] font-bold leading-[140%] text-[#1E293B]">
            {s.title}
          </h2>
          <p className="mt-1 max-w-2xl text-[18px] font-medium leading-[140%] text-[#788593]">
            {s.subtitle}
          </p>
        </div>
        <CourseBrochureCta
          openModal
          type="contact"
          courseId={courseId}
          className="btn-brand-outline btn-brand-outline--flat inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg px-5 text-[14px] font-semibold sm:self-auto"
        >
          {s.advisorCtaLabel}
          <PhoneIcon className="text-brand" />
        </CourseBrochureCta>
      </div>

      <div className="mt-10 flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-12">
        <div className="min-w-0 xl:max-w-[360px]">
          <h3 className="text-[20px] font-bold leading-[140%] text-[#1E293B]">{s.infoHeading}</h3>
          <ul className="mt-6 space-y-5" role="list">
            {s.features.map((feature) => (
              <li key={feature.title} className="flex gap-3">
                <FeeFeatureIcon />
                <div>
                  <p className="text-[14px] font-bold leading-[140%] text-[#1E293B]">{feature.title}</p>
                  <p className="mt-1 text-[13px] font-normal leading-[150%] text-[#788593]">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-[13px] font-normal leading-[150%] text-[#788593]">{s.partnersLabel}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 gap-y-3">
              {s.partnerLogos.map((partner) => (
                <PartnerLogo key={partner.name} partner={partner} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:justify-end xl:shrink-0">
          {emiPrice ? (
            <PricingCard
              label={s.emiLabel}
              price={emiPrice}
              priceSuffix={s.emiSuffix}
              description={s.emiDescription}
              enrollLabel={s.emiEnrollLabel}
              highlighted
              badge="Popular"
              isEmi
              onEnroll={() => onEnroll?.(batch)}
            />
          ) : null}
          {fullPrice ? (
            <PricingCard
              label={s.fullLabel}
              price={fullPrice}
              description={s.fullDescription}
              enrollLabel={s.fullEnrollLabel}
              onEnroll={() => onEnroll?.(batch)}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
