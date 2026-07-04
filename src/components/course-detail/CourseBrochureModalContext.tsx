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

export type BrochureModalType = 'contact' | 'webinar' | 'demo';

export type OpenBrochureModalOptions = {
  type?: BrochureModalType;
  courseId?: string | null;
  /**
   * File to unlock after a successful submit (brochure/guide/syllabus).
   * Never rendered as a link — the form opens it via `window.open` only once
   * the lead has been captured, so the URL never appears in the page HTML.
   */
  downloadUrl?: string | null;
};

type CourseBrochureModalContextValue = {
  openBrochureModal: (options?: OpenBrochureModalOptions) => void;
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
  const [leadType, setLeadType] = useState<BrochureModalType>('contact');
  const [courseId, setCourseId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const openBrochureModal = useCallback((options?: OpenBrochureModalOptions) => {
    setLeadType(options?.type ?? 'contact');
    setCourseId(options?.courseId ?? null);
    setDownloadUrl(options?.downloadUrl ?? null);
    setIsOpen(true);
  }, []);
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
      <CourseBrochureModal
        isOpen={isOpen}
        onClose={closeBrochureModal}
        form={form}
        leadType={leadType}
        courseId={courseId}
        downloadUrl={downloadUrl}
      />
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
