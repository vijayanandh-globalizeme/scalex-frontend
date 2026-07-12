import { getCourseBodyBySlug } from '@/lib/courseBody';
import type { ApiReview } from '@/services/courseApi';

const PLATFORM_TO_API_TYPE: Record<string, string> = {
  google: 'GOOGLE_REVIEW',
  trustpilot: 'TRUST_PILOT_REVIEW',
  facebook: 'FACEBOOK_REVIEW',
  all: 'GOOGLE_REVIEW',
};

const SHARED_REVIEWS_SLUG = 'certified-scrum-master';

/** Shared “What Our Learners Saying” cards (CSM design) used across course pages. */
export function getStaticCourseReviews(courseUri?: string): {
  reviews: ApiReview[];
  title: string;
  videoUrl?: string | null;
} {
  const content =
    (courseUri ? getCourseBodyBySlug(courseUri)?.reviews : undefined) ??
    getCourseBodyBySlug(SHARED_REVIEWS_SLUG)?.reviews;

  if (!content?.reviews?.length) {
    return { reviews: [], title: 'What Our Learners Saying', videoUrl: null };
  }

  return {
    title: content.title || 'What Our Learners Saying',
    videoUrl: content.video?.videoUrl ?? null,
    reviews: content.reviews.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      review: r.quote,
      rating: r.rating,
      type: PLATFORM_TO_API_TYPE[r.platform] ?? 'GOOGLE_REVIEW',
      reviewUrl: r.readOnHref && r.readOnHref !== '#' ? r.readOnHref : '',
      avatar: r.avatarSrc
        ? { id: `${r.id}-avatar`, url: r.avatarSrc, extension: 'png' }
        : null,
    })),
  };
}
