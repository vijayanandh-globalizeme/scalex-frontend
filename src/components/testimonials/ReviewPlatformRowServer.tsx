import { fetchSetting } from '@/services/layoutApi';
import { ReviewPlatformRow } from './TestimonialsSection';

export default async function ReviewPlatformRowServer() {
  const settings = await fetchSetting();
  return <ReviewPlatformRow settings={settings ?? undefined} align="center" />;
}
