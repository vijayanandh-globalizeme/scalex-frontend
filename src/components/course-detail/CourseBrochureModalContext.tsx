'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import CourseBrochureModal from './CourseBrochureModal';
import type { CourseLeadFormProps } from './CourseLeadForm';

export function isBrochureModalHref(href?: string) {
  if (!href) return false;
  return (
    href === '#brochure' ||
    href === '#contact' ||
    href.endsWith('#brochure') ||
    href.endsWith('#contact')
  );
}

type CourseBrochureModalContextValue = {
  openBrochureModal: () => void;
  closeBrochureModal: () => void;
  isBrochureModalOpen: boolean;
};

const CourseBrochureModalContext = createContext<CourseBrochureModalContextValue | null>(null);

export function CourseBrochureModalProvider({
  form,
  children,
}: {
  form: CourseLeadFormProps;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openBrochureModal = useCallback(() => setIsOpen(true), []);
  const closeBrochureModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      openBrochureModal,
      closeBrochureModal,
      isBrochureModalOpen: isOpen,
    }),
    [openBrochureModal, closeBrochureModal, isOpen],
  );

  return (
    <CourseBrochureModalContext.Provider value={value}>
      {children}
      <CourseBrochureModal isOpen={isOpen} onClose={closeBrochureModal} form={form} />
    </CourseBrochureModalContext.Provider>
  );
}

export function useCourseBrochureModal() {
  const context = useContext(CourseBrochureModalContext);
  if (!context) {
    throw new Error('useCourseBrochureModal must be used within CourseBrochureModalProvider');
  }
  return context;
}
