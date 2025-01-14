#!/usr/bin/env node

import { formatHtml } from "./formatting.js";
import { getProgramQuery, programInit, selectArticle } from "./program.js";
import { wikiSearch } from "./requests.js";

(async (): Promise<number> => {
  const program = programInit(process.argv);
  const options = program.opts();
  const query = await getProgramQuery(program);

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

  return 0;
})();
