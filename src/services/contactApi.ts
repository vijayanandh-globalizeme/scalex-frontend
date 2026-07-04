import { postWithErrors } from '@/services/http';

export type ContactSubmitPayload = {
  name: string;
  email: string;
  phone: string;
  purpose: string;
  /** Course URI captured from the course-search field (footer form only). */
  courseName?: string;
};

/** Field name → message, keyed by the API's validated field names (name/email/phone/purpose/courseName). */
export type ContactFieldErrors = Record<string, string>;

export type ContactSubmitResult =
  | { success: true }
  | { success: false; message: string; fieldErrors: ContactFieldErrors };

type ContactApiErrorItem = { field?: string; message: string };
type ContactApiResponse = {
  success: boolean;
  message?: string;
  data?: { id: string };
  errors?: ContactApiErrorItem[];
};

/**
 * Submit a public contact/lead form.
 * On a 422 validation failure, returns per-field messages under `fieldErrors`
 * (keyed by the API's field names) so the caller can show them inline.
 */
export async function submitContact(payload: ContactSubmitPayload): Promise<ContactSubmitResult> {
  const { ok, data } = await postWithErrors<ContactApiResponse>('contact', payload, { revalidate: 0 });

  if (ok && data?.success) return { success: true };

  const fieldErrors: ContactFieldErrors = {};
  for (const err of data?.errors ?? []) {
    if (err.field && err.message) fieldErrors[err.field] = err.message;
  }

  return {
    success: false,
    message: data?.message || 'Something went wrong. Please try again.',
    fieldErrors,
  };
}
