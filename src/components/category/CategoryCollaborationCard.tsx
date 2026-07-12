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
      className={`relative z-10 mr-auto flex h-auto w-[95%] flex-col justify-center overflow-hidden rounded-lg border border-[#EBEBEB] bg-white px-6 py-[26px] shadow-[0_4px_4px_0_rgba(30,41,59,0.11),0_4px_4px_0_rgba(30,41,59,0.03)] md:px-10 ${className ?? ''}`}
    >
        <p
          className="mb-2 text-center text-[20px] font-semibold leading-normal text-[#1E293B]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {collaboration.lineBefore}
          <span className="font-semibold text-brand">{collaboration.lineHighlight}</span>
          {collaboration.lineAfter}
        </p>
        <div className="w-full min-w-0 overflow-hidden">
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
