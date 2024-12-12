use clap::Parser;

use super::cli_utils;

/// The CLI parser.
#[derive(Parser, Debug)]
#[command(name = "wick")]
#[command(author)]
#[command(version = cli_utils::info())]
#[command(about = "Read Wikipedia articles in your terminal.")]
pub struct Cli {
    /// Only display an article if it matches the given article name exactly.
    #[clap(short = 's', long = "strict")]
    pub strict: bool,
    /// Interactive: instead of selecting the first match, interactively select the article to read
    /// from a list of matches.
    #[clap(short = 'i', long = "interactive")]
    pub interactive: bool,
    /// The name of the article to read.
    pub article: String,
}
