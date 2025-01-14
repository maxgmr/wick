import { EMAIL } from "./consts.js";

const HEADERS = {
  "User-Agent": EMAIL,
};

const SEARCH_URL_BASE = "https://en.wikipedia.org/w/rest.php/v1/search/page?";
const PAGE_URL_BASE =
  "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=1&titles=";
const PAGE_URL_EXINTRO = "&exintro";
const PAGE_URL_TITLE = "&titles=";

export interface WikiSearchResult {
  id: number;
  key: string;
  title: string;
  excerpt: string;
  matched_title: string;
  description: string;
}

export interface WikiPageResult {
  pageid: number;
  title: string;
  extract: string;
}

/**
 * Get the Search API params as a string.
 */
const wikiSearchParams = (query: string, limit: number): string => {
  const searchParams: Record<string, any> = new URLSearchParams();
  searchParams.append("q", query);
  searchParams.append("limit", limit);
  return searchParams.toString();
};

/**
 * Construct a Wiki Search API URL.
 */
const searchApiUrl = (query: string, limit: number): string =>
  SEARCH_URL_BASE + wikiSearchParams(query, limit);

/**
 * Construct a Wiki Page API URL.
 */
const pageApiUrl = (page: string, is_full: boolean): string =>
  PAGE_URL_BASE + (is_full ? "" : PAGE_URL_EXINTRO) + PAGE_URL_TITLE + page;

/**
 * Make a Wikipedia Search API request.
 */
export const wikiSearch = async (
  query: string,
  limit: number,
): Promise<WikiSearchResult[]> => {
  const response = await fetch(searchApiUrl(query, limit), {
    headers: HEADERS,
  });
  const data = await response.json();
  return data.pages as WikiSearchResult[];
};

/**
 * Make a Wikipedia Page API request.
 */
export const wikiPage = async (
  page: string,
  is_full: boolean,
): Promise<WikiPageResult | null> => {
  const response = await fetch(pageApiUrl(page, is_full), {
    headers: HEADERS,
  });
  const data = await response.json();
  for (const key in data?.query?.pages ?? []) {
    if (data?.query?.pages?.[key]?.extract)
      return data?.query?.pages[key] as WikiPageResult;
  }
  return null;
};
