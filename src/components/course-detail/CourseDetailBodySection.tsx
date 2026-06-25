import type { CourseBodyContent } from '@/lib/courseBody';
import { BOOTCAMP_NAV_ITEMS, COURSE_NAV_ITEMS } from '@/lib/courseNavItems';
import { AwardsSection } from '@/components/awards';
import { courseAwardsCards } from './courseAwardsContent';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import { WhyScaleXSection } from '@/components/why-scalex';
import { courseWhyScaleXContent } from './courseWhyScaleXContent';
import CourseAboutCertificationSection from './CourseAboutCertificationSection';
import CourseBatchRequestBanner from './CourseBatchRequestBanner';
import CourseCareerTransformationsSection from './CourseCareerTransformationsSection';
import CourseContentSection from './CourseContentSection';
import CourseCredentialsSection from './CourseCredentialsSection';
import CourseFaqsSection from './CourseFaqsSection';
import CourseDetailSidebar from './CourseDetailSidebar';
import CourseDetailStickyNav from './CourseDetailStickyNav';
import CourseEligibilityRequirementsSection from './CourseEligibilityRequirementsSection';
import CourseOverviewSection from './CourseOverviewSection';
import CoursePlanComparisonSection from './CoursePlanComparisonSection';
import CourseProgramRoadmapSection from './CourseProgramRoadmapSection';
import CourseFeeSection from './CourseFeeSection';
import CourseCareerAssuranceSection from './CourseCareerAssuranceSection';
import CourseWebinarCtaSection from './CourseWebinarCtaSection';
import CourseRelatedCoursesSection from './CourseRelatedCoursesSection';
import CourseReviewsSection from './CourseReviewsSection';
import CourseSkillsToolsSection from './CourseSkillsToolsSection';
import CourseSchedulesSection from './CourseSchedulesSection';
import CourseTrainersSection from './CourseTrainersSection';
import CoursePrepComparisonSection from './CoursePrepComparisonSection';
import CourseTrainingCitiesSection from './CourseTrainingCitiesSection';

export default function CourseDetailBodySection({
  isTechnical = false,
  phone,
}: {
  isTechnical?: boolean;
  phone?: string;
}) {
  const navItems = isTechnical ? BOOTCAMP_NAV_ITEMS : COURSE_NAV_ITEMS;

  return (
    <section className="full-bleed overflow-visible bg-[#F5F6F8] pb-16 pt-1" aria-label="Course details">
      <CourseDetailStickyNav items={navItems} phone={phone ?? body.phone} />

      {/* <div className="site-container pb-15 pt-4">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_246px] lg:gap-[80px]">
          <div className="min-w-0 space-y-8 overflow-visible">
            <CourseOverviewSection
              overview={body.overview}
              career={body.career}
              variant={isTechnical ? 'technical' : 'default'}
            />
            <CourseContentSection courseContent={body.courseContent} />
            {body.careerTransformations ? (
              <CourseCareerTransformationsSection content={body.careerTransformations} />
            ) : null}
            {body.skillsTools ? <CourseSkillsToolsSection content={body.skillsTools} /> : null}
            {body.programRoadmap ? (
              <CourseProgramRoadmapSection content={body.programRoadmap} />
            ) : null}
            {body.courseFee ? <CourseFeeSection content={body.courseFee} /> : null}
            {body.careerAssurance ? (
              <CourseCareerAssuranceSection content={body.careerAssurance} />
            ) : null}
            <CourseSchedulesSection schedules={body.schedules} />
            <CoursePlanComparisonSection planComparison={body.planComparison} />
            <CourseEligibilityRequirementsSection
              eligibilityRequirements={body.eligibilityRequirements}
            />
            {body.prepComparison ? <CoursePrepComparisonSection content={body.prepComparison} /> : null}
            <CourseTrainersSection trainers={body.trainers} />
            {body.webinarCta ? <CourseWebinarCtaSection content={body.webinarCta} /> : null}
            <CourseReviewsSection reviews={body.reviews} />
            <CourseCredentialsSection credentials={body.credentials} />
            <CourseFaqsSection faqs={body.faqs} />
            <CourseBatchRequestBanner banner={body.expertCta} className="pb-6 md:pb-8" />
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
            <CourseAboutCertificationSection about={body.aboutCertification} />
            <CourseRelatedCoursesSection relatedCourses={body.relatedCourses} />
            <CourseTrainingCitiesSection trainingCities={body.trainingCities} />
          </div>

          <CourseDetailSidebar sidebar={body.sidebar} />
        </div>
      </div>

      <GuidanceSection {...defaultGuidanceContent} /> */}
    </section>
  );
}
