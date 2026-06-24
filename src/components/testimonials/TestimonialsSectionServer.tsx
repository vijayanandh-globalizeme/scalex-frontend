import { fetchLearners } from '@/services/peopleApi';
import type { LayoutSettings } from '@/services/layoutApi';
import TestimonialsSection from './TestimonialsSection';
import { defaultTestimonialsContent } from './defaultTestimonialsContent';

export default async function TestimonialsSectionServer({ settings }: { settings?: LayoutSettings }) {
  const learners = await fetchLearners(10);
  return (
    <TestimonialsSection
      {...defaultTestimonialsContent}
      testimonials={learners}
      reviews={[]}
      settings={settings}
    />
  );
}
