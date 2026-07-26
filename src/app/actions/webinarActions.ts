'use server';

import { fetchWebinars } from '@/services/webinarApi';

export { type Webinar, type WebinarListResult } from '@/services/webinarApi';

export async function getWebinars(limit = 10, offset = 0) {
  return fetchWebinars(limit, offset);
}
