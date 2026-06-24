import { fetchTrainers } from '@/services/peopleApi';
import MentorsSection from './MentorsSection';
import { defaultMentorsContent } from './defaultMentorsContent';

export default async function MentorsSectionServer() {
  const mentors = await fetchTrainers(10);
  return <MentorsSection {...defaultMentorsContent} mentors={mentors} />;
}
