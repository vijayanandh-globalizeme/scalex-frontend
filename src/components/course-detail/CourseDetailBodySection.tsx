import { BOOTCAMP_NAV_ITEMS, COURSE_NAV_ITEMS } from '@/lib/courseNavItems';
import { EXPERTS_COURSE_BANNER } from '@/lib/courseDetailStatics';
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
import CourseCredentialsSection from './CourseCredentialsSection';

export default async function CourseDetailBodySection({
  courseUri,
  categoryUri,
  isTechnical = false,
  phone,
  syllabusUrl,
  courseContentTitle,
  faqTitle,
  aboutTitle,
  aboutContent,
}: {
  courseUri: string;
  categoryUri: string;
  isTechnical?: boolean;
  phone?: string;
  syllabusUrl?: string | null;
  courseContentTitle?: string | null;
  faqTitle?: string | null;
  aboutTitle?: string | null;
  aboutContent?: string | null;
}) {
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
                <CourseFaqsSection faqs={details.courseFaq} title={faqTitle} />

                <CourseCredentialsSection 
                  credentials={details.credentials}
                  careerTabs={details.otherDetails.filter((d) => d.type === 'CREDENTIALS')}
                />
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
