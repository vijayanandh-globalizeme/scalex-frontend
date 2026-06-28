'use server';

import { fetchWebinars } from '@/services/webinarApi';

export { type Webinar } from '@/services/webinarApi';

export async function getWebinars(limit = 10) {
  return fetchWebinars(limit);
}
