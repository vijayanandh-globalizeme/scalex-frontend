'use server';

import { submitContact, type ContactSubmitPayload, type ContactSubmitResult } from '@/services/contactApi';

/**
 * Server action for every site contact/lead form.
 * On failure, `fieldErrors` (keyed by API field name: name/email/phone/purpose/courseName)
 * lets the caller show a message under the respective field.
 * (Import ContactSubmitPayload/ContactSubmitResult directly from '@/services/contactApi'
 * where needed — a 'use server' module may only export async functions.)
 */
export async function sendContact(payload: ContactSubmitPayload): Promise<ContactSubmitResult> {
  return submitContact(payload);
}
