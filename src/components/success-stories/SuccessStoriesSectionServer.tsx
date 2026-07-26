import { fetchReviewers } from '@/services/peopleApi';
import type { LayoutSettings } from '@/services/layoutApi';
import SuccessStoriesSection from './SuccessStoriesSection';
import { defaultSuccessStoriesContent } from './defaultSuccessStoriesContent';

export default async function SuccessStoriesSectionServer({
  compact = false,
  settings,
}: { compact?: boolean; settings?: LayoutSettings } = {}) {
  const stories = await fetchReviewers(10);
  const featureMedia = {
    ...defaultSuccessStoriesContent.featureMedia,
    videoUrl: settings?.VIDEO_REVIEW_URL || undefined,
  };
  return (
    <SuccessStoriesSection
      {...defaultSuccessStoriesContent}
      featureMedia={featureMedia}
      stories={stories}
      compact={compact}
    />
  );
}
