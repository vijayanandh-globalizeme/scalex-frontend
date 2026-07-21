import Image from 'next/image';

export interface CourseLicensedPartnerLogo {
  src: string;
  alt: string;
}

export interface CourseLicensedPartnerStripProps {
  label: string;
  logos: CourseLicensedPartnerLogo[];
}

export default function CourseLicensedPartnerStrip({ label, logos }: CourseLicensedPartnerStripProps) {
  if (!logos.length) return null;

  return (
    <div className="flex justify-center">
      <div className="inline-flex flex-col items-start">
        <p className="text-[18px] font-medium leading-normal text-[#1E293B]">{label}</p>
        <div className="mt-3 flex items-center gap-8">
          {logos.map((logo) => (
            <div key={logo.src} className="relative h-8 w-24">
              <Image src={logo.src} alt={logo.alt} fill sizes="96px" className="object-contain object-left" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
