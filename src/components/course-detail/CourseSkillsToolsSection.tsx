import Image from 'next/image';
import type { CourseSkillsToolsContent } from '@/lib/courseBody';
import { COURSE_SECTION_CARD } from './courseSectionCard';

const SKILL_TOOL_CARD =
  'flex min-h-[72px] flex-col justify-center rounded-[12px] border border-[#EBEBEB] bg-white px-3 py-3 shadow-[0_4px_4px_0_rgba(30,41,59,0.08),0_4px_4px_0_rgba(30,41,59,0.03)]';

function SkillCard({ name, category }: { name: string; category: string }) {
  return (
    <div className={SKILL_TOOL_CARD}>
      <p className="text-[14px] font-bold leading-[140%] text-[#1E293B]">{name}</p>
      <p className="mt-1 text-[12px] font-normal leading-[140%] text-[#788593]">{category}</p>
    </div>
  );
}

function ToolCard({ name, logoSrc, logoAlt }: { name: string; logoSrc: string; logoAlt: string }) {
  return (
    <div className={`${SKILL_TOOL_CARD} items-center`}>
      <div className="relative h-8 w-full">
        <Image src={logoSrc} alt={logoAlt} fill className="object-contain object-center" sizes="120px" />
      </div>
      <span className="sr-only">{name}</span>
    </div>
  );
}

export default function CourseSkillsToolsSection({
  content,
}: {
  content: CourseSkillsToolsContent;
}) {
  const toolRows = content.toolRows ?? 4;

  return (
    <section
      id="skills-tools"
      className={`scroll-mt-[116px] px-6 py-5 md:px-8 md:py-6 ${COURSE_SECTION_CARD}`}
      aria-labelledby="skills-tools-heading"
    >
      <h2 id="skills-tools-heading" className="text-[32px] font-bold leading-normal text-[#1E293B]">
        {content.title}
      </h2>
      <p className="mt-1 text-[14px] font-normal leading-[150%] text-[#788593]">{content.subtitle}</p>

      <h3 className="mt-8 text-[20px] font-bold leading-normal text-[#1E293B]">{content.skillsTitle}</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {content.skills.map((skill) => (
          <SkillCard key={`${skill.name}-${skill.category}`} name={skill.name} category={skill.category} />
        ))}
      </div>

      <h3 className="mt-8 text-[20px] font-bold leading-normal text-[#1E293B]">{content.toolsTitle}</h3>
      <div className="mt-4 space-y-3">
        {Array.from({ length: toolRows }, (_, rowIndex) => (
          <div
            key={`tools-row-${rowIndex}`}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
          >
            {content.tools.map((tool) => (
              <ToolCard
                key={`${rowIndex}-${tool.name}`}
                name={tool.name}
                logoSrc={tool.logoSrc}
                logoAlt={tool.logoAlt}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
