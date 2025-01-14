import { EMAIL } from "./consts.js";

const HEADERS = {
  "User-Agent": EMAIL,
};

const SEARCH_URL_BASE = "https://en.wikipedia.org/w/rest.php/v1/search/page?";

export interface WikiSearchResult {
  id: number;
  key: string;
  title: string;
  excerpt: string;
  matched_title: string;
  description: string;
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
 * Make a Wikipedia Search API request.
 */
export const wikiSearch = async (
  query: string,
  limit: number,
): Promise<WikiSearchResult[]> => {
  const response = await fetch(
    SEARCH_URL_BASE + wikiSearchParams(query, limit),
    { headers: HEADERS },
  );
  const data = await response.json();
  return data.pages as WikiSearchResult[];
};
