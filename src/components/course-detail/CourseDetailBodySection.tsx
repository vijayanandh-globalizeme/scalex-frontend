import type { CourseBodyContent } from '@/lib/courseBody';
import { AwardsSection } from '@/components/awards';
import { courseAwardsCards } from './courseAwardsContent';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import { WhyScaleXSection } from '@/components/why-scalex';
import { courseWhyScaleXContent } from './courseWhyScaleXContent';
import CourseAboutCertificationSection from './CourseAboutCertificationSection';
import CourseBatchRequestBanner from './CourseBatchRequestBanner';
import CourseContentSection from './CourseContentSection';
import CourseCredentialsSection from './CourseCredentialsSection';
import CourseFaqsSection from './CourseFaqsSection';
import CourseDetailSidebar from './CourseDetailSidebar';
import CourseDetailStickyNav from './CourseDetailStickyNav';
import CourseEligibilityRequirementsSection from './CourseEligibilityRequirementsSection';
import CourseOverviewSection from './CourseOverviewSection';
import CoursePlanComparisonSection from './CoursePlanComparisonSection';
import CourseRelatedCoursesSection from './CourseRelatedCoursesSection';
import CourseReviewsSection from './CourseReviewsSection';
import CourseSchedulesSection from './CourseSchedulesSection';
import CourseTrainersSection from './CourseTrainersSection';
import CourseTrainingCitiesSection from './CourseTrainingCitiesSection';

export default function CourseDetailBodySection({ body }: { body: CourseBodyContent }) {
  return (
    <section className="full-bleed overflow-visible bg-[#F5F6F8] pb-16 pt-1" aria-label="Course details">
      <CourseDetailStickyNav items={body.navItems} phone={body.phone} />

      <div className="site-container pb-15 pt-4">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_246px] lg:gap-[80px]">
          <div className="min-w-0 space-y-8">
            <CourseOverviewSection overview={body.overview} career={body.career} />
            <CourseContentSection courseContent={body.courseContent} />
            <CourseSchedulesSection schedules={body.schedules} />
            <CoursePlanComparisonSection planComparison={body.planComparison} />
            <CourseTrainersSection trainers={body.trainers} />
            <CourseEligibilityRequirementsSection
              eligibilityRequirements={body.eligibilityRequirements}
            />
            <CourseReviewsSection reviews={body.reviews} />
            <AwardsSection
              heading="Awards and Recognitions"
              subheading=""
              cards={courseAwardsCards}
              visibleCount={3}
              autoplay={false}
              id="awards"
              variant="embedded"
            />
            <CourseCredentialsSection credentials={body.credentials} />
            <CourseFaqsSection faqs={body.faqs} />
            <CourseBatchRequestBanner banner={body.expertCta} className="pb-6 md:pb-8" />
            <WhyScaleXSection {...courseWhyScaleXContent} id="why-scalex" variant="embedded" />
            <CourseAboutCertificationSection about={body.aboutCertification} />
            <CourseRelatedCoursesSection relatedCourses={body.relatedCourses} />
            <CourseTrainingCitiesSection trainingCities={body.trainingCities} />
          </div>

          <CourseDetailSidebar sidebar={body.sidebar} />
        </div>
      </div>

      <GuidanceSection {...defaultGuidanceContent} />
    </section>
  );
}
