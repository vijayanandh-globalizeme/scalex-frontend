import { BOOTCAMP_NAV_ITEMS, COURSE_NAV_ITEMS } from '@/lib/courseNavItems';
import { EXPERTS_COURSE_BANNER, UNLOCK_COURSE_BANNER } from '@/lib/courseDetailStatics';
import { sidebar } from '@/lib/courseSideBar';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import CourseDetailSidebar from './CourseDetailSidebar';
import CourseDetailStickyNav from './CourseDetailStickyNav';
import CourseContentSection from './CourseContentSection';
import {AwardsSection} from "@/components/awards";
import CourseFaqsSection from './CourseFaqsSection';
import CourseOverviewSection from './CourseOverviewSection';
import WhyScaleXSection from '../why-scalex/WhyScaleXSection';
import { getCourseDetails } from '@/app/actions/courseActions';
import { courseWhyScaleXContent } from '@/lib/courseWhyScaleXContent';
import {courseAwardsCards} from "@/lib/courseAwardsContent";
import CourseAboutCertificationSection from './CourseAboutCertificationSection';
import CourseBatchRequestBanner from './CourseBatchRequestBanner';
import type { ApiCourseOverview } from '@/services/courseApi';
import type { LayoutSettings } from '@/services/layoutApi';
import CourseCredentialsSection from './CourseCredentialsSection';
import CourseTrainersSection from './CourseTrainersSection';
import CourseReviewsSection from './CourseReviewsSection';
import CourseEligibilityRequirementsSection from './CourseEligibilityRequirementsSection';
import CourseSkillsToolsSection from './CourseSkillsToolsSection';
import CourseProgramRoadmapSection from './CourseProgramRoadmapSection';

export default async function CourseDetailBodySection({
  courseUri,
  categoryUri,
  isTechnical = false,
  phone,
  courseDetails,
  settings,
}: {
  courseUri: string;
  categoryUri: string;
  isTechnical?: boolean;
  phone?: string;
  courseDetails?: ApiCourseOverview | null;
  settings?: LayoutSettings;
}) {
  const d = courseDetails?.details;

  const syllabusUrl       = d?.syllabus?.url       ?? null;
  const courseContentTitle = d?.courseContentTitle  ?? null;
  const faqTitle          = d?.faqTitle             ?? null;
  const aboutTitle        = d?.aboutTitle           ?? null;
  const aboutContent      = d?.aboutContent         ?? null;
  const trainerTitle      = d?.trainerTitle         ?? null;
  const reviewsTitle      = d?.reviewsTitle         ?? null;
  const reviewVideoUrl    = d?.courseVideoUrl        ?? null;

  const navItems = isTechnical ? BOOTCAMP_NAV_ITEMS : COURSE_NAV_ITEMS;
  const details = await getCourseDetails(courseUri, categoryUri);

  return (
    <section className="full-bleed overflow-visible bg-[#F5F6F8] pb-16 pt-1" aria-label="Course details">
      <CourseDetailStickyNav items={navItems} phone={phone ?? ''} />

      <div className="site-container pb-15 pt-4">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_246px] lg:gap-[80px]">
          <div className="min-w-0 space-y-8 overflow-visible">
            {details ? (
              <>
                <CourseOverviewSection
                  overview={details.overview}
                  careerTabs={details.otherDetails.filter((d) => d.type === 'OVERVIEW')}
                  variant={isTechnical ? 'technical' : 'default'}
                />
                <CourseContentSection
                  courseContent={details.courseContent}
                  syllabusUrl={syllabusUrl}
                  title={courseContentTitle}
                />
              </>
            ) : null}

            {isTechnical && details ? (
              <>
                <CourseSkillsToolsSection
                  skillsTools={details.skillsTools}
                  tools={details.otherDetails.filter((d) => d.type === 'TOOLS')}
                />
                <CourseEligibilityRequirementsSection eligibilityRequirements={details.eligibility} />
              </>
            ) : null}

            <CourseTrainersSection
              courseUri={courseUri}
              categoryUri={categoryUri}
              title={trainerTitle ?? 'Our Trainers'}
            />

            <CourseBatchRequestBanner banner={UNLOCK_COURSE_BANNER} className="pb-6 md:pb-8" />

            {!isTechnical && details ? (
              <CourseEligibilityRequirementsSection eligibilityRequirements={details.eligibility} />
            ) : null}

            <CourseReviewsSection
              courseUri={courseUri}
              categoryUri={categoryUri}
              title={reviewsTitle ?? 'Learner Reviews'}
              settings={settings ?? {}}
            />
            {details ? (
              <>
                <CourseCredentialsSection
                  credentials={details.credentials}
                  careerTabs={details.otherDetails.filter((d) => d.type === 'CREDENTIALS')}
                />

                <CourseFaqsSection faqs={details.courseFaq} title={faqTitle} />
              </>
            ) : null}

            <CourseBatchRequestBanner banner={EXPERTS_COURSE_BANNER} className="pb-6 md:pb-8" />
            <WhyScaleXSection {...courseWhyScaleXContent} id="why-scalex" variant="embedded" />
            <AwardsSection
              heading="Awards and Recognitions"
              subheading=""
              cards={courseAwardsCards}
              visibleCount={3}
              autoplay={false}
              id="awards"
              variant="embedded"
            />
            <CourseAboutCertificationSection title={aboutTitle} content={aboutContent} />
          </div>
          <CourseDetailSidebar sidebar={sidebar} />
        </div>
      </div>

      <GuidanceSection {...defaultGuidanceContent} />
    </section>
  );
}
