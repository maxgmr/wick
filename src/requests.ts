const SEARCH_URL_START =
  "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0";
const SEARCH_URL_LIMIT = "&gsrlimit=";
const SEARCH_URL_QUERY = "&gsrsearch=";

export type WikiSearchResult = {
  pageid: number;
  title: string;
  index: number;
};

/**
 * Assemble a Wikipedia query URL with the given query and desired result count.
 */
const wikiSearchUrl = (query: string, resultCount: number): string => {
  return `${SEARCH_URL_START}${SEARCH_URL_LIMIT}${resultCount}${SEARCH_URL_QUERY}${query}`;
};

export const wikiSearch = async (
  query: string,
  resultCount: number,
): Promise<WikiSearchResult[]> => {
  const url = wikiSearchUrl(query, resultCount);
  const res = await fetch(url);
  const json = await res.json();

  // Convert to WikiSearchResults
  const result: WikiSearchResult[] = [];
  for (const key in json.query.pages) {
    const val = json.query.pages[key];
    result.push({ pageid: val.pageid, title: val.title, index: val.index });
  }
  result.sort((a, b) => a.index - b.index);
  return result;
};
