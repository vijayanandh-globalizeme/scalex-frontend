'use server';

import { fetchAllCategories, fetchCategoryByUri } from '@/services/categoryApi';

export async function getAllCategories() {
  return fetchAllCategories();
}

export async function getCategoryByUri(uri: string) {
  return fetchCategoryByUri(uri);
}
