import LogoMarquee, { type LogoMarqueeItem } from './LogoMarquee';
import {
  HOME_LOGO_MARQUEE_CLASSNAME,
  HOME_LOGO_MARQUEE_SIZE,
  HOME_LOGO_MARQUEE_WRAPPER_CLASS,
} from './homeLogoMarquee';

export type CollaborationContent = {
  lineBefore: string;
  lineHighlight: string;
  lineAfter: string;
  logos: LogoMarqueeItem[];
};

export default function CollaborationStrip({
  collaboration,
  className,
}: {
  collaboration: CollaborationContent;
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
      <div className={HOME_LOGO_MARQUEE_WRAPPER_CLASS}>
        <LogoMarquee
          logos={collaboration.logos}
          size={HOME_LOGO_MARQUEE_SIZE}
          largeOnMobile
          className={HOME_LOGO_MARQUEE_CLASSNAME}
          ariaLabel="Certifying body partners"
        />
      </div>
    </div>
  );
}
