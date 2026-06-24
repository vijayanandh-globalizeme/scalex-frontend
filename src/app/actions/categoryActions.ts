'use server';

import { fetchAllCategories } from '@/services/categoryApi';

export async function getAllCategories() {
  return fetchAllCategories();
}
