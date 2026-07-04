'use client';

import { useState } from 'react';
import type { ContactFieldErrors } from '@/services/contactApi';

/**
 * Shared field-error state for contact/lead forms. Field errors are keyed by
 * the API's validated field names (name/email/phone/purpose/courseName) —
 * see contactCreateSchema on the API.
 */
export function useContactFieldErrors() {
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  return { fieldErrors, setFieldErrors, clearFieldError };
}

/** Red border on the field when it has a server-side error. */
export function fieldErrorClass(hasError: boolean) {
  return hasError ? 'border-brand focus:border-brand' : '';
}
