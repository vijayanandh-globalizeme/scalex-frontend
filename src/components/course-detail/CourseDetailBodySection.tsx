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
import { getCourseDetails, getCourseLearners } from '@/app/actions/courseActions';
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
import CourseWebinarCtaSection from './CourseWebinarCtaSection';
import CoursePrepComparisonSection from './CoursePrepComparisonSection';
import CourseCareerTransformationsSection from './CourseCareerTransformationsSection';
import CourseRelatedCoursesSection from './CourseRelatedCoursesSection';
import CourseTrainingCitiesSection from './CourseTrainingCitiesSection';
import CourseSchedulesSection from './CourseSchedulesSection';

export default async function CourseDetailBodySection({
  courseUri,
  categoryUri,
  isTechnical: isTechnicalProp = false,
  phone,
  courseDetails,
  settings,
  countryUri,
  cityUri,
}: {
  courseUri: string;
  categoryUri: string;
  isTechnical?: boolean;
  phone?: string;
  courseDetails?: ApiCourseOverview | null;
  settings?: LayoutSettings;
  countryUri?: string;
  cityUri?: string;
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
  const startedAt    = courseDetails?.startedAt        ?? null;
  const templateType = courseDetails?.templateType     ?? null;
  const isTechnicalFromDetails = templateType === 'TECHNICAL' || templateType === 'BOOTCAMP';
  // When courseDetails is available derive from templateType, otherwise use the prop
  const isTechnical  = courseDetails ? isTechnicalFromDetails : isTechnicalProp;
  const hasBootcamp  = templateType === 'BOOTCAMP';

  const navItems = isTechnical ? BOOTCAMP_NAV_ITEMS : COURSE_NAV_ITEMS;
  const locationOpts = { countryUri, cityUri };
  const [details, learners] = await Promise.all([
    getCourseDetails(courseUri, categoryUri, locationOpts),
    isTechnical ? getCourseLearners(courseUri, categoryUri, locationOpts) : Promise.resolve([]),
  ]);

  return (
    <section className="full-bleed overflow-visible bg-[#F5F6F8] pb-16 pt-1" aria-label="Course details">
      <CourseDetailStickyNav items={navItems} phone={phone ?? ''} />

      <div className="site-container pb-15 pt-4">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_246px] lg:gap-[80px]">
          <div className="min-w-0 space-y-8 overflow-visible">
            {details?.overview && details.otherDetails ? (
              <CourseOverviewSection
                overview={details.overview}
                careerTabs={details.otherDetails.filter((d) => d.type === 'OVERVIEW')}
                variant={isTechnical ? 'technical' : 'default'}
              />
            ) : null}

            {details?.courseContent ? (
              <CourseContentSection
                courseContent={details.courseContent}
                syllabusUrl={syllabusUrl}
                title={courseContentTitle}
              />
            ) : null}
            
            {isTechnical && learners.length > 0 ? (
              <CourseCareerTransformationsSection
                learners={learners}
                title={d?.careerTitle}
              />
            ) : null}

            {isTechnical && details?.skillsTools && details.otherDetails ? (
              <CourseSkillsToolsSection
                skillsTools={details.skillsTools}
                tools={details.otherDetails.filter((d) => d.type === 'TOOLS')}
              />
            ) : null}

            {isTechnical && details?.roadmaps && details.otherDetails ? (
              <CourseProgramRoadmapSection 
                roadmap={details.roadmaps}
                content={details.otherDetails.filter((d) => d.type === 'ROADMAP')}
              />
            ) : null}

            {!isTechnical ? (
              <CourseBatchRequestBanner banner={UNLOCK_COURSE_BANNER} className="pb-6 md:pb-8" />
            ) : null}

            {courseUri && categoryUri ? (
              <div id="schedules">
                <CourseSchedulesSection
                  courseUri={courseUri}
                  categoryUri={categoryUri}
                  courseName={courseDetails?.name ?? ''}
                  variant={isTechnical ? 'technical' : 'default'}
                />
              </div>
            ) : null}
            
            {isTechnical && details?.eligibility ? (
              <CourseEligibilityRequirementsSection eligibilityRequirements={details.eligibility} />
            ) : null}

            {hasBootcamp ? (
              <CoursePrepComparisonSection />
            ) : null}
            
            {courseUri && categoryUri ? (
              <CourseTrainersSection
                courseUri={courseUri}
                categoryUri={categoryUri}
                title={trainerTitle ?? 'Our Trainers'}
              />
            ) : null}

            {!isTechnical && details?.eligibility ? (
              <CourseEligibilityRequirementsSection eligibilityRequirements={details.eligibility} />
            ) : null}

            {isTechnical && startedAt ? (
              <CourseWebinarCtaSection startedAt={startedAt} />
            ) : null}

            {courseUri && categoryUri ? (
              <CourseReviewsSection
                courseUri={courseUri}
                categoryUri={categoryUri}
                title={reviewsTitle ?? 'Learner Reviews'}
                settings={settings ?? {}}
              />
            ) : null}

            {details?.credentials && details.otherDetails ? (
              <CourseCredentialsSection
                credentials={details.credentials}
                careerTabs={details.otherDetails.filter((d) => d.type === 'CREDENTIALS')}
              />
            ) : null}

            {details?.courseFaq && faqTitle ? (
                <CourseFaqsSection faqs={details.courseFaq} title={faqTitle} />
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
            
            {courseUri && categoryUri ? (
              <CourseRelatedCoursesSection courseUri={courseUri} />
            ) : null}


            <CourseTrainingCitiesSection courseUri={courseUri} categoryUri={categoryUri} />
          </div>
          <CourseDetailSidebar sidebar={sidebar} />


        </div>
      </div>

      <GuidanceSection {...defaultGuidanceContent} />
    </section>
  );
}
