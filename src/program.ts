import readline from "node:readline/promises";
import { Command, OptionValues } from "@commander-js/extra-typings";
import cliSelect from "cli-select";
import { bold, green } from "yoctocolors";

import { VERSION } from "./consts.js";
import { WikiSearchResult } from "./requests.js";

const DESC = "Read Wikipedia articles in the terminal.";

interface WickOptions extends OptionValues {
  interactive: boolean;
  results: number;
  strict: boolean;
}

/**
 * Initialises the program using the given args.
 */
export const programInit = (
  argv: string[],
): Command<[string?], WickOptions> => {
  const program = new Command<[string?], WickOptions>();
  program
    .showHelpAfterError()
    .version(VERSION)
    .description(DESC)
    .argument(
      "[Wikipedia search term]",
      "the article to search for",
      (val) => val || "",
    )
    .option("-i, --interactive", "prompt the user to select an article", false)
    .option(
      "-r, --results <number>",
      "the number of results to display in interactive mode",
      (val) => parseInt(val, 10),
      5,
    )
    .option("-s --strict", "only open exact article title matches", false)
    .parse(argv);
  return program;
};

/**
 * If a Wikipedia search term was given in the CLI call, then return it. Otherwise,
 * read a search term from stdin and return that.
 */
export const getProgramQuery = (
  program: Command<[string?], WickOptions>,
): Promise<string> => {
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

/**
 * Select an article interactively from the list of articles, returning immediately
 * if the list is length 1.
 */
export const selectArticle = async (
  results: WikiSearchResult[],
): Promise<WikiSearchResult> => {
  // Default: select first article
  if (results.length == 1) {
    return results[0];
  }

  // If multiple search results, select from list interactively
  const resolvedResult = await cliSelect({
    values: results,
    valueRenderer: (value, selected) => {
      if (selected) {
        return bold(green(value.title));
      }
      return value.title;
    },
  });
  return resolvedResult.value;
};
