import Image from 'next/image';

export interface CourseLicensedPartnerStripProps {
  label: string;
  logoSrc: string;
  logoAlt: string;
  /** When true, renders inline inside the hero grid (no outer section padding). */
  embedded?: boolean;
}

export default function CourseLicensedPartnerStrip({
  label,
  logoSrc,
  logoAlt,
  embedded = false,
}: CourseLicensedPartnerStripProps) {
  const content = (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${embedded ? 'w-full justify-center' : 'justify-center'}`}
    >
      <p className="shrink-0 text-[18px] font-medium leading-[18px] tracking-[-0.18px] text-black">
        {label}
      </p>
      <div className="relative h-[48px] w-[220px] shrink-0 md:h-[52px] md:w-[240px]">
        <Image src={logoSrc} alt={logoAlt} fill sizes="240px" className="object-contain object-center" />
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="full-bleed py-8 md:py-10" aria-label="Licensed training partner">
      <div className="site-container">{content}</div>
    </section>
  );
}
