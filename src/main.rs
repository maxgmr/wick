use clap::Parser;
use color_eyre::eyre;

mod cli_parser;
mod cli_utils;

use cli_parser::Cli;

fn main() -> eyre::Result<()> {
    color_eyre::install()?;

    // Parse CLI args
    let args = Cli::parse();

    Ok(())
}
