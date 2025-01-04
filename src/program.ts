import { Command } from "commander";
import { VERSION } from "./consts";

const DESC = "Read Wikipedia articles in the terminal.";

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
