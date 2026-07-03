import { ReactNode } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { fetchLayout } from '@/services/layoutApi';
import { CourseBrochureModalProvider } from '@/components/course-detail';
import { DEFAULT_LEAD_FORM } from '@/lib/leadForm';

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const layoutData = await fetchLayout();
  const megaMenuCategories = layoutData?.categories ?? [];
  const settings = layoutData?.settings ?? {};
  return (
    <CourseBrochureModalProvider form={DEFAULT_LEAD_FORM}>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <Header megaMenuCategories={megaMenuCategories} />
        <main id="main-content" className="min-w-0 flex-1 overflow-visible">
          {children}
        </main>
        <Footer settings={settings} categories={megaMenuCategories} />
      </div>
    </CourseBrochureModalProvider>
  );
};

export default MainLayout;
