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

/**
 * LHS artwork of the popup, keyed by the designer's file names. The artwork's
 * rounded corners are transparent; `bg` is the colour next to its top/bottom
 * right corners so the LHS container fills them seamlessly.
 */
export const BROCHURE_POPUP_IMAGES = {
  'download-brochure': { src: '/images/lead-popup/download-brochure.webp', alt: 'Begin your path to a thriving tech career', bg: ['#010101', '#ad4e5d'], label: 'Download Brochure' },
  'free-guide': { src: '/images/lead-popup/free-guide.webp', alt: 'Download our free learning book now', bg: ['#000000', '#a54f5e'], label: 'Free Learning Guide' },
  'expert-call': { src: '/images/lead-popup/expert-call.webp', alt: 'Receive tailored support for your professional journey', bg: ['#020101', '#803e46'], label: 'Get an Expert Call' },
  'placement-report': { src: '/images/lead-popup/placement-report.webp', alt: 'Download placement report', bg: ['#010000', '#904a55'], label: 'Placement Report' },
  'request-batch': { src: '/images/lead-popup/request-batch.webp', alt: 'Request a batch at your convenience', bg: ['#010000', '#b55768'], label: 'Request a Batch' },
  'request-demo': { src: '/images/lead-popup/request-demo.webp', alt: 'Launch your path to a thriving tech career', bg: ['#000000', '#7c474f'], label: 'Request a Demo' },
  'skill-up-team': { src: '/images/lead-popup/skill-up-team.webp', alt: 'Talk to our consultant', bg: ['#000000', '#763c28'], label: 'Skill Up Your Team' },
  webinar: { src: '/images/lead-popup/webinar.webp', alt: 'Register for free webinar', bg: ['#020202', '#924654'], label: 'Free Webinar' },
} as const;

export type BrochurePopupArtwork = (typeof BROCHURE_POPUP_IMAGES)[keyof typeof BROCHURE_POPUP_IMAGES];

export type BrochurePopupImage = keyof typeof BROCHURE_POPUP_IMAGES;

const DEFAULT_POPUP_IMAGE: Record<BrochureModalType, BrochurePopupImage> = {
  contact: 'expert-call',
  webinar: 'webinar',
  demo: 'request-demo',
};

export type OpenBrochureModalOptions = {
  type?: BrochureModalType;
  /** LHS artwork; defaults by `type` (webinar → webinar, demo → request-demo, contact → expert-call). */
  image?: BrochurePopupImage;
  /** RHS pill text; defaults to the artwork's own label (e.g. "Download Syllabus" on the brochure artwork). */
  label?: string;
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
  const [image, setImage] = useState<BrochurePopupImage>('expert-call');
  const [label, setLabel] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const openBrochureModal = useCallback((options?: OpenBrochureModalOptions) => {
    const type = options?.type ?? 'contact';
    setLeadType(type);
    setImage(options?.image ?? DEFAULT_POPUP_IMAGE[type]);
    setLabel(options?.label ?? null);
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
        image={BROCHURE_POPUP_IMAGES[image]}
        label={label ?? BROCHURE_POPUP_IMAGES[image].label}
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
