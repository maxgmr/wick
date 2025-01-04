import { Command } from "commander";
import { VERSION } from "./consts";

const DESC = "Read Wikipedia articles in the terminal.";

export const programInit = (argv: string[]): Command => {
  const program = new Command();
  program
    .version(VERSION)
    .description(DESC)
    .option("-i, --interactive", "Prompt the user to select an article")
    .option("-s --strict", "Only open exact article title matches")
    .parse(argv);
  return program;
};
