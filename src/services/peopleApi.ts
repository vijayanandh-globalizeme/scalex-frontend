import { get } from '@/services/http';

type ImageAsset = {
  id: string;
  url: string;
  extension: string;
};

type LearnerApiItem = {
  id: string;
  name: string;
  currentRole: string;
  prevRole: string;
  hike: string;
  review: string;
  avatar: ImageAsset | null;
  currentCompany: ImageAsset | null;
  prevCompany: ImageAsset | null;
};

type ReviewerApiItem = {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: ImageAsset | null;
  type: string;
  reviewDate: string;
  reviewUrl?: string;
};

export type Learner = {
  id: string;
  name: string;
  currentRole: string;
  hike: string;
  review: string;
  avatarUrl: string;
  currentCompanyUrl: string;
  prevCompanyUrl: string;
};

export type Reviewer = {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatarUrl: string;
};

type LearnersApiResponse = {
  success: boolean;
  data: LearnerApiItem[];
};

type ReviewersApiResponse = {
  success: boolean;
  data: ReviewerApiItem[];
};

export async function fetchLearners(limit = 10): Promise<Learner[]> {
  const json = await get<LearnersApiResponse>(`people/learners?limit=${limit}`);
  if (!json?.success) return [];
  return (json.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    currentRole: item.currentRole,
    hike: item.hike,
    review: item.review,
    avatarUrl: item.avatar?.url ?? '',
    currentCompanyUrl: item.currentCompany?.url ?? '',
    prevCompanyUrl: item.prevCompany?.url ?? '',
  }));
}

type TrainerApiItem = {
  id: string;
  name: string;
  role: string;
  linkedInProfile?: string;
  profileImage: ImageAsset | null;
  workedWith: ImageAsset | null;
};

export type Trainer = {
  id: string;
  name: string;
  role: string;
  linkedInProfile?: string;
  profileImageUrl: string;
  workedWithUrl: string;
};

type TrainersApiResponse = {
  success: boolean;
  data: TrainerApiItem[];
};

export async function fetchTrainers(limit = 10): Promise<Trainer[]> {
  const json = await get<TrainersApiResponse>(`people/trainers?limit=${limit}`);
  if (!json?.success) return [];
  return (json.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    linkedInProfile: item.linkedInProfile,
    profileImageUrl: item.profileImage?.url ?? '',
    workedWithUrl: item.workedWith?.url ?? '',
  }));
}

export async function fetchReviewers(limit = 10): Promise<Reviewer[]> {
  const json = await get<ReviewersApiResponse>(`people/reviewers?limit=${limit}`);
  if (!json?.success) return [];
  return (json.data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    review: item.review,
    rating: Math.min(item.rating, 5),
    avatarUrl: item.avatar?.url ?? '',
  }));
}
