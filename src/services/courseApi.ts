// Shared types for the courses API — used by both server actions and client components

export type ApiBatch = {
  id: string;
  startDate: string;
  plan1RetailPrice: string;
  plan1SellingPrice: string;
  noOfSessions: string;
};

export type ApiCourse = {
  id: string;
  name: string;
  uri: string;
  duration: string | null;
  totalEnroll: string | null;
  featureImage: { id: string; url: string; extension: string } | null;
  category: { id: string; name: string; uri: string };
  schemaRating: string | null;
  batch: ApiBatch | null;
};
