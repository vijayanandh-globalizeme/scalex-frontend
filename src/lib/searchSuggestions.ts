import type { MegaMenuCategory } from '@/lib/allCoursesMegaMenu';

export type SearchSuggestion = {
  label: string;
  href: string;
};

/** Default list shown when the search box is focused (before typing). */
export const DEFAULT_SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  {
    label: 'Automation Testing Course with Placement',
    href: '/categories/software-testing#courses',
  },
  {
    label: 'Certified Scrum Master',
    href: '/categories/agile-and-scrum#courses',
  },
  {
    label: 'Certified Scrum Product Owner',
    href: '/categories/agile-and-scrum#courses',
  },
  {
    label: 'DevOps Certification Training',
    href: '/categories/devops#courses',
  },
  {
    label: 'Leading SAFe® Agilist',
    href: '/categories/agile-and-scrum#courses',
  },
];

export function getAllSearchSuggestions(categories: MegaMenuCategory[] = []): SearchSuggestion[] {
  const fromCourses = categories.flatMap((category) => category.courses);
  const seen = new Set<string>();

  return [...DEFAULT_SEARCH_SUGGESTIONS, ...fromCourses].filter((item) => {
    const key = item.label.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function filterSearchSuggestions(
  suggestions: SearchSuggestion[],
  query: string,
): SearchSuggestion[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return DEFAULT_SEARCH_SUGGESTIONS;

  return suggestions.filter((item) => item.label.toLowerCase().includes(normalized));
}
