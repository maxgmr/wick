#!/usr/bin/env node

import { programInit } from "./program";

(async () => {
  const program = programInit(process.argv);
  const options = program.opts();
  console.log(JSON.stringify(options, null, 2));
})();
