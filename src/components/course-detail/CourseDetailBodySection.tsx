import { BOOTCAMP_NAV_ITEMS, COURSE_NAV_ITEMS } from '@/lib/courseNavItems';
import { sidebar } from '@/lib/courseSideBar';
import { GuidanceSection, defaultGuidanceContent } from '@/components/guidance';
import CourseDetailSidebar from './CourseDetailSidebar';
import CourseDetailStickyNav from './CourseDetailStickyNav';
import CourseContentSection from './CourseContentSection';
import CourseFaqsSection from './CourseFaqsSection';
import CourseOverviewSection from './CourseOverviewSection';
import WhyScaleXSection from '../why-scalex/WhyScaleXSection';
import { getCourseDetails } from '@/app/actions/courseActions';
import { courseWhyScaleXContent } from '@/lib/courseWhyScaleXContent';

export default async function CourseDetailBodySection({
  courseUri,
  categoryUri,
  isTechnical = false,
  phone,
  syllabusUrl,
  courseContentTitle,
  faqTitle,
}: {
  courseUri: string;
  categoryUri: string;
  isTechnical?: boolean;
  phone?: string;
  syllabusUrl?: string | null;
  courseContentTitle?: string | null;
  faqTitle?: string | null;
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
              </>
            ) : null}
            <WhyScaleXSection {...courseWhyScaleXContent} id="why-scalex" variant="embedded" />
          </div>
          <CourseDetailSidebar sidebar={sidebar} />
        </div>
      </div>

      <GuidanceSection {...defaultGuidanceContent} />
    </section>
  );
}
