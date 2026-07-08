import { LogoMarquee } from '@/components/shared';
import type { CategoryLogo } from './CategoryHeroSection';

export type CategoryCollaboration = {
  lineBefore: string;
  lineHighlight: string;
  lineAfter: string;
  logos: CategoryLogo[];
};

export default function CategoryCollaborationCard({
  collaboration,
  className,
}: {
  collaboration: CategoryCollaboration;
  className?: string;
}) {
  return (
    <div
      className={`relative z-10 mx-auto w-full rounded-lg border border-zinc-100 bg-white px-6 py-5 shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:px-10 md:py-6 ${className ?? ''}`}
    >
        <p className="mb-6 text-center text-[22px] font-semibold leading-normal text-heading md:text-[28px]">
          {collaboration.lineBefore}
          <span className="font-semibold text-brand">{collaboration.lineHighlight}</span>
          {collaboration.lineAfter}
        </p>
        <div className="w-full min-w-0 overflow-hidden py-5">
          <LogoMarquee
            logos={collaboration.logos}
            size="md"
            largeOnMobile
            ariaLabel="Certifying body partners"
          />
        </div>
    </div>
  );
}
