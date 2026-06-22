import { fetchLayout } from '@/services/layoutApi';
import { ReviewPlatformRow } from './TestimonialsSection';

export default async function ReviewPlatformRowServer() {
  const layoutData = await fetchLayout();
  const settings = layoutData?.settings;
  return <ReviewPlatformRow settings={settings} />;
}
