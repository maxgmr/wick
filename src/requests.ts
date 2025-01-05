const WIKI_URL_BASE = "https://en.wikipedia.org/w/api.php?";

const SEARCH_URL_START =
  "action=query&origin=*&format=json&generator=search&gsrnamespace=0";
const SEARCH_URL_LIMIT = "&gsrlimit=";
const SEARCH_URL_QUERY = "&gsrsearch=";

const PARSE_URL_START = "action=parse&origin=*&prop=text&format=json";
const PARSE_URL_PAGE = "&page=";

export type WikiSearchResult = {
  pageid: number;
  title: string;
  index: number;
};

/**
 * Assemble a Wikipedia query URL with the given query and desired result count.
 */
const wikiSearchUrl = (query: string, resultCount: number): string => {
  return `${WIKI_URL_BASE}${SEARCH_URL_START}${SEARCH_URL_LIMIT}${resultCount}${SEARCH_URL_QUERY}${query}`;
};

/**
 * Assemble a Wikipedia Parse API URL with the given page name.
 */
const wikiParseUrl = (page: string): string => {
  return `${WIKI_URL_BASE}${PARSE_URL_START}${PARSE_URL_PAGE}${page}`;
};

/**
 * Use the Wikipedia search API to search for a given query.
 */
export const wikiSearch = async (
  query: string,
  resultCount: number,
): Promise<WikiSearchResult[]> => {
  const url = wikiSearchUrl(query, resultCount);
  const res = await fetch(url);
  const json = await res.json();

  // Convert to WikiSearchResults
  const result: WikiSearchResult[] = [];
  for (const key in json?.query?.pages ?? {}) {
    const val = json.query.pages[key];
    result.push({ pageid: val.pageid, title: val.title, index: val.index });
  }
  result.sort((a, b) => a.index - b.index);
  return result;
};

/**
 * Use the Wikipedia Parse API to get the HTML text of a given page.
 */
export const wikiParse = async (query: string): Promise<string> => {
  const url = wikiParseUrl(query);
  const res = await fetch(url);
  const json = await res.json();
  if (json?.error) {
    throw new Error(json.error.info);
  }
  return json?.parse?.text?.["*"] ?? "";
};
