import Image from 'next/image';
import type { ApiCourseDetails, ApiOtherDetail } from '@/services/courseApi';
import { COURSE_SECTION_CARD } from './courseSectionCard';
import { SKILLS_TOOLS_SKILLS_TITLE, SKILLS_TOOLS_TOOLS_TITLE } from '@/lib/courseDetailStatics';
import { withNewTabLinks } from '@/lib/richText';

type ApiSkillsTools = NonNullable<ApiCourseDetails['skillsTools']>;

const SKILL_TOOL_CARD =
  'interactive-card flex min-h-[72px] flex-col justify-center rounded-[12px] border border-[#EBEBEB] bg-white px-2 py-2';

function parseSkills(raw: string): { name: string; category: string }[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = '', category = ''] = line.split(',').map((s) => s.trim());
      return { name, category };
    });
}

function SkillCard({ name, category }: { name: string; category: string }) {
  return (
    <div className={SKILL_TOOL_CARD}>
      <p className="interactive-card-title text-[14px] font-bold leading-[140%] text-[#1E293B]">{name}</p>
      <p className="mt-1 text-[12px] font-normal leading-[140%] text-[#788593]">{category}</p>
    </div>
  );
}

function ToolCard({ tool }: { tool: ApiOtherDetail }) {
  return (
    <div className={`${SKILL_TOOL_CARD} items-center`}>
      {tool.file ? (
        <div className="interactive-card-media relative h-20 w-full">
          <Image
            src={tool.file.url}
            alt={tool.title}
            fill
            className="object-contain object-center"
            sizes="120px"
          />
        </div>
      ) : (
        <p className="interactive-card-title text-center text-[12px] font-semibold leading-[140%] text-[#1E293B]">{tool.title}</p>
      )}
    </div>
  );
}

export default function CourseSkillsToolsSection({
  skillsTools,
  tools,
}: {
  skillsTools: ApiSkillsTools | null;
  tools: ApiOtherDetail[];
}) {
  if (!skillsTools && !tools.length) return null;

  const skills = skillsTools?.skill ? parseSkills(skillsTools.skill) : [];

  return (
    <section
      id="skill-and-tool"
      className={`scroll-mt-[116px] px-6 py-5 md:px-8 md:py-6 ${COURSE_SECTION_CARD}`}
      aria-labelledby="skills-tools-heading"
    >
      {skillsTools ? (
        <>
          <h2 id="skills-tools-heading" className="section-heading text-[#1E293B] md:text-[32px]">
            {skillsTools.title}
          </h2>
          <p
            className="mt-1 text-[14px] font-normal leading-[150%] text-[#788593] [&_a]:text-brand [&_a]:no-underline [&_a]:hover:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: withNewTabLinks(skillsTools.description) }}
          />
        </>
      ) : (
        <h2 id="skills-tools-heading" className="section-heading text-[#1E293B] md:text-[32px]">
          {SKILLS_TOOLS_SKILLS_TITLE}
        </h2>
      )}

      {skills.length > 0 ? (
        <>
          <h3 className="mt-8 text-[20px] font-bold leading-normal text-[#1E293B]">{SKILLS_TOOLS_SKILLS_TITLE}</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {skills.map((skill, i) => (
              <SkillCard key={`${skill.name}-${i}`} name={skill.name} category={skill.category} />
            ))}
          </div>
        </>
      ) : null}

      {tools.length > 0 ? (
        <>
          <h3 className="mt-8 text-[20px] font-bold leading-normal text-[#1E293B]">{SKILLS_TOOLS_TOOLS_TITLE}</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
