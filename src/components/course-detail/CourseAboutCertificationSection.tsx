import { COURSE_SECTION_CARD } from './courseSectionCard';

export default function CourseAboutCertificationSection({
  title,
  content,
}: {
  title?: string | null;
  content?: string | null;
}) {
  if (!title && !content) return null;

  return (
    <div className={`max-md:mt-[60px] md:mt-[80px] ${COURSE_SECTION_CARD} px-6 py-5 md:px-8 md:py-6`}>
      {title ? (
        <h2 className="section-heading text-heading">{title}</h2>
      ) : null}

      {content ? (
        <div className="mt-5 rounded-lg bg-[#F4F4F4] p-5 md:p-6 course-accordion-answer">
          <div
            className="space-y-5 [&_h3]:text-[16px] [&_h3]:font-medium [&_h3]:leading-normal [&_h3]:text-heading [&_p]:mt-2 [&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-muted md:[&_p]:text-[14px]"
            dangerouslySetInnerHTML={{ __html: content.replaceAll('&nbsp;', ' ') }}
          />
        </div>
      ) : null}
    </div>
  );
}
