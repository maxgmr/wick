import readline from "node:readline/promises";

import { Command } from "commander";

import { VERSION } from "./consts";

const DESC = "Read Wikipedia articles in the terminal.";

/**
 * Initialises the program using the given args.
 */
export const programInit = (argv: string[]): Command => {
  const program = new Command();
  program
    .showHelpAfterError()
    .version(VERSION)
    .description(DESC)
    .option("-i, --interactive", "Prompt the user to select an article")
    .option("-s --strict", "Only open exact article title matches")
    .argument("[Wikipedia search term]", "The article to search for", "")
    .parse(argv);
  return program;
};

/**
 * If a Wikipedia search term was given in the CLI call, then return it. Otherwise,
 * read a search term from stdin and return that.
 */
export const getProgramQuery = (program: Command): Promise<string> => {
  if (program?.args?.[0]) {
    // Search term was already given. Return it.
    return new Promise((resolve) => {
      resolve(program.args[0]);
    });
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.on("line", (res) => {
      rl.close();
      resolve(res);
    }),
  );
};
