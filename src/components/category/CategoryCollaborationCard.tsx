import Image from 'next/image';
import type { CategoryLogo } from './CategoryHeroSection';

export type CategoryCollaboration = {
  lineBefore: string;
  lineHighlight: string;
  lineAfter: string;
  logos: CategoryLogo[];
};

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

export default function CategoryCollaborationCard({
  collaboration,
  className,
}: {
  collaboration: CategoryCollaboration;
  className?: string;
}) {
  return (
    <div
      className={`relative z-10 rounded-lg border border-zinc-100 bg-white px-6 py-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:px-10 md:py-6 ${className ?? ''}`}
    >
        <p className="mb-6 text-center text-[22px] font-semibold leading-normal text-heading md:text-[28px]">
          {collaboration.lineBefore}
          <span className="font-semibold text-brand">{collaboration.lineHighlight}</span>
          {collaboration.lineAfter}
        </p>
        <CategoryLogoRow logos={collaboration.logos} />
    </div>
  );
}
