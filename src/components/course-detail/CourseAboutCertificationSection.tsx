import type { CourseAboutCertificationContent } from '@/lib/courseBody';
import { COURSE_SECTION_CARD } from './courseSectionCard';

function ContentBlock({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) {
  return (
    <div>
      <h3 className="text-[16px] font-medium leading-normal text-heading">{heading}</h3>
      <div className="mt-2 space-y-2">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[13px] leading-relaxed text-muted md:text-[14px]">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function CourseAboutCertificationSection({
  about,
}: {
  about: CourseAboutCertificationContent;
}) {
  return (
    <div
      className={`mt-[80px] ${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6`}
    >
      <h2 className="text-[34px] font-bold leading-[140%] text-heading">{about.title}</h2>

      <div className="mt-5 rounded-lg bg-[#F4F4F4] p-5 md:p-6">
        <div className="space-y-5">
          <ContentBlock
            heading={about.learningObjectives.heading}
            paragraphs={about.learningObjectives.paragraphs}
          />
          <ContentBlock
            heading={about.topicsCovered.heading}
            paragraphs={about.topicsCovered.paragraphs}
          />
          <ContentBlock
            heading={about.sideHeading.heading}
            paragraphs={about.sideHeading.paragraphs}
          />
        </div>
      </div>
    </div>
  );
}
