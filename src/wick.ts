#!/usr/bin/env node

import { formatHtml } from "./formatting.js";
import { getProgramQuery, programInit, selectArticle } from "./program.js";
import { wikiPage, wikiSearch } from "./requests.js";

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
      return "";
    }
    const chosenResult = await selectArticle(searchResults);
    return chosenResult.title;
  })();
  if (!pageTitle) {
    console.error(`No results found for query "${query}".`);
    return 1;
  }

  const page = await wikiPage(pageTitle, options.full);
  if (!page) {
    console.error(`No page found with title "${pageTitle}".`);
    return 1;
  }

  console.log(page.extract);

  return 0;
})();
