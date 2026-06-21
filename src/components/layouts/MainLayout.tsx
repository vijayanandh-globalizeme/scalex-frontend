import { ReactNode } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { fetchLayout } from '@/services/layoutApi';

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const layoutData = await fetchLayout();
  const megaMenuCategories = layoutData?.categories ?? [];
  return (
    <>
      <Header megaMenuCategories={megaMenuCategories} />
      <main id="main-content" className="min-w-0 overflow-visible">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
