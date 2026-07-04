'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

type LeadSuccessContextValue = {
  /** Show the global success popup. Optional custom message. */
  showLeadSuccess: (message?: string) => void;
};

const LeadSuccessContext = createContext<LeadSuccessContextValue | null>(null);

const DEFAULT_MESSAGE = 'Thanks for reaching out — our team will contact you shortly.';
const AUTO_CLOSE_MS = 6000;
const TRANSITION_MS = 300;

function SuccessPopup({
  animated,
  message,
  onClose,
}: {
  animated: boolean;
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          animated ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="lead-success-title"
        aria-describedby="lead-success-desc"
        className={`relative z-10 w-full max-w-[380px] overflow-hidden rounded-2xl bg-white p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.25)] transition-all duration-300 ${
          animated ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
        }`}
      >
        {/* Animated check badge */}
        <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E7F8EF]">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-success transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              animated ? 'scale-100' : 'scale-0'
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 6L9 17l-5-5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h2 id="lead-success-title" className="mt-5 text-[20px] font-extrabold text-heading">
          Thank you!
        </h2>
        <p id="lead-success-desc" className="mt-2 text-[14px] leading-relaxed text-muted">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="btn-brand mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg text-[14px] font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export function LeadSuccessProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const close = useCallback(() => setOpen(false), []);

  const showLeadSuccess = useCallback((custom?: string) => {
    setMessage(custom ?? DEFAULT_MESSAGE);
    setOpen(true);
  }, []);

  // Mount → next frame → animate in; on close, keep mounted through the transition.
  useEffect(() => {
    if (open) {
      setMounted(true);
      setAnimated(false);
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
      const auto = window.setTimeout(() => setOpen(false), AUTO_CLOSE_MS);
      return () => {
        cancelAnimationFrame(frame);
        window.clearTimeout(auto);
      };
    }
    setAnimated(false);
    const timer = window.setTimeout(() => setMounted(false), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!mounted) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mounted]);

  return (
    <LeadSuccessContext.Provider value={{ showLeadSuccess }}>
      {children}
      {mounted && typeof document !== 'undefined'
        ? createPortal(
            <SuccessPopup animated={animated} message={message} onClose={close} />,
            document.body,
          )
        : null}
    </LeadSuccessContext.Provider>
  );
}

export function useLeadSuccess() {
  const context = useContext(LeadSuccessContext);
  if (!context) {
    throw new Error('useLeadSuccess must be used within a LeadSuccessProvider');
  }
  return context;
}
