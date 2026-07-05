import { ReactNode } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { fetchLayout, fetchSetting } from '@/services/layoutApi';
import { CourseBrochureModalProvider } from '@/components/course-detail';
import { LeadSuccessProvider } from '@/components/feedback/LeadSuccessProvider';
import { DEFAULT_LEAD_FORM } from '@/lib/leadForm';

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const [layoutData, settingsData] = await Promise.all([fetchLayout(), fetchSetting()]);
  const megaMenuCategories = layoutData?.megaMenu ?? [];
  const otherMenus = layoutData?.otherMenus ?? [];
  const footerMenu = layoutData?.footer ?? { categories: [], courses: [] };
  const settings = settingsData ?? {};
  return (
    <LeadSuccessProvider>
      <CourseBrochureModalProvider form={DEFAULT_LEAD_FORM}>
        <div className="flex min-h-screen flex-col overflow-x-clip">
          <Header megaMenuCategories={megaMenuCategories} otherMenus={otherMenus} />
          <main id="main-content" className="min-w-0 flex-1 overflow-visible">
            {children}
          </main>
          <Footer settings={settings} footerMenu={footerMenu} />
        </div>
      </CourseBrochureModalProvider>
    </LeadSuccessProvider>
  );
};

export default MainLayout;
