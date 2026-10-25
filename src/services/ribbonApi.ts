import { get } from '@/services/http';

/** Offer ribbon from the API. `title` / `offer` may contain **highlighted** words. */
export type ApiRibbon = {
  id: string;
  title: string;
  tag: string | null;
  offer: string;
  ctaName: string | null;
  /** ISO date-time — the ribbon stops showing after this. */
  expiresAt: string;
  priority: number | null;
};

type RibbonsApiResponse = { success: boolean; data: ApiRibbon[] };

/**
 * Live ribbons (active, not expired), highest priority first.
 * Cached under the `ribbons` tag — the API flushes it on every admin change;
 * the short revalidate also drops ribbons soon after they expire.
 */
export async function fetchRibbons(): Promise<ApiRibbon[]> {
  const json = await get<RibbonsApiResponse>('ribbons', { revalidate: 60, tags: ['ribbons'] });
  return json?.success ? (json.data ?? []) : [];
}
