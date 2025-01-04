#!/usr/bin/env node

import { getProgramQuery, programInit } from "./program";

(async () => {
  const program = programInit(process.argv);
  const options = program.opts();
  console.log(JSON.stringify(options, null, 2));
  const query = await getProgramQuery(program);
  console.log(`your query: <${query}>`);
})();
