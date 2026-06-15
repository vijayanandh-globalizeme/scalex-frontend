import { ReactNode } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main id="main-content" className="min-w-0 overflow-visible">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
