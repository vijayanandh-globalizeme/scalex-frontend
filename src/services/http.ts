const BASE_URL = (process.env.API_BASE_URL ?? '').replace(/\/$/, '');
const WEBSITE_URI = process.env.WEBSITE_URI ?? 'frontend';

export function getApiUrl(path: string): string {
  return `${BASE_URL}/v1/${WEBSITE_URI}/${path.replace(/^\//, '')}`;
}

function buildHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...Object.fromEntries(new Headers(extra ?? {})),
  });

  const apiKey = process.env.API_KEY;
  if (apiKey) headers.set('x-api-key', apiKey);

  return headers;
}

type FetchOptions = {
  revalidate?: number;
  tags?: string[];
  headers?: HeadersInit;
};

export async function get<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  const { revalidate = 300, tags, headers } = options;

  try {
    const res = await fetch(getApiUrl(path), {
      method: 'GET',
      headers: buildHeaders(headers),
      next: tags ? { revalidate, tags } : { revalidate },
    });

    if (!res.ok) return null;

    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function post<T>(path: string, body: unknown, options: FetchOptions = {}): Promise<T | null> {
  const { revalidate = 0, tags, headers } = options;

  try {
    const res = await fetch(getApiUrl(path), {
      method: 'POST',
      headers: buildHeaders(headers),
      body: JSON.stringify(body),
      next: tags ? { revalidate, tags } : { revalidate },
    });

    if (!res.ok) return null;

    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

/**
 * Like `post`, but returns the parsed JSON body even on a non-2xx response
 * (e.g. a 422 validation error), so callers can read field-level `errors`.
 */
export async function postWithErrors<T>(
  path: string,
  body: unknown,
  options: FetchOptions = {},
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const { revalidate = 0, tags, headers } = options;

  try {
    const res = await fetch(getApiUrl(path), {
      method: 'POST',
      headers: buildHeaders(headers),
      body: JSON.stringify(body),
      next: tags ? { revalidate, tags } : { revalidate },
    });

    const data = (await res.json().catch(() => null)) as T | null;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}
