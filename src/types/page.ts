/** Dynamic route segment params — keys match [param] in the path. */
export type PageParams = Promise<Record<string, string>>;

/** Query string from the URL. */
export type PageSearchParams = Promise<Record<string, string | string[]>>;

export interface PageProps {
  params?: PageParams;
  searchParams?: PageSearchParams;
}
