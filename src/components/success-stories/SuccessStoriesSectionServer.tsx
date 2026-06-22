import { fetchReviewers } from '@/services/peopleApi';
import SuccessStoriesSection from './SuccessStoriesSection';
import { defaultSuccessStoriesContent } from './defaultSuccessStoriesContent';

export default async function SuccessStoriesSectionServer() {
  const stories = await fetchReviewers(10);
  return <SuccessStoriesSection {...defaultSuccessStoriesContent} stories={stories} />;
}
