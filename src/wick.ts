#!/usr/bin/env node

import { getProgramQuery, programInit } from "./program";
import { wikiSearch } from "./requests";

(async (): Promise<number> => {
  const program = programInit(process.argv);
  const options = program.opts();
  const query = await getProgramQuery(program);

  const searchResults = await wikiSearch(
    query,
    options.interactive ? options.results : 1,
  );

  if (searchResults.length == 0) {
    console.error(`No results found for query "${query}".`);
    return 1;
  }

  return 0;
})();
