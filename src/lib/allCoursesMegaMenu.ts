export type MegaMenuCourse = {
  label: string;
  href: string;
  priority?: number;
};

export type MegaMenuCategory = {
  id: string;
  slug: string;
  label: string;
  href: string;
  courses: MegaMenuCourse[];
};
