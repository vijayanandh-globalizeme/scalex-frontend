import { fetchRibbons } from '@/services/ribbonApi';
import OfferRibbonCarousel from './OfferRibbonCarousel';

/**
 * Offer ribbon between the header and every page's hero, driven by the
 * admin's Ribbons (GET /v1/frontend/ribbons — active, not expired, priority order).
 * Renders nothing when no ribbon is live.
 */
export default async function OfferRibbon() {
  const ribbons = await fetchRibbons();
  if (ribbons.length === 0) return null;
  return <OfferRibbonCarousel ribbons={ribbons} />;
}
