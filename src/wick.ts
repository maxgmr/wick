#!/usr/bin/env node

import { formatHtml } from "./formatting.js";
import { getProgramQuery, programInit, selectArticle } from "./program.js";
import { wikiParse, wikiSearch } from "./requests.js";

(async (): Promise<number> => {
  const program = programInit(process.argv);
  const options = program.opts();
  const query = await getProgramQuery(program);

  // TODO go straight to Parse API if strict
  const pageTitle = await (async () => {
    if (options.strict) {
      // Go straight to parse API
      return query;
    }

    // Otherwise, search Wikipedia for the page title
    const searchResults = await wikiSearch(
      query,
      options.interactive ? options.results : 1,
    );
    if (searchResults.length == 0) {
      throw new Error(`No results found for query "${query}".`);
    }
    const chosenResult = await selectArticle(searchResults);
    return chosenResult.title;
  })();

  const pageHtml = await wikiParse(pageTitle);
  if (!pageHtml) {
    throw new Error(`No page HTML for page "${pageTitle}".`);
  }

  const pageText = formatHtml(pageHtml);
  console.log(pageText);

  return 0;
})();
