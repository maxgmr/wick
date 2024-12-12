use std::env;

/// String displaying the package version, build date, & system OS version.
const VERSION_MESSAGE: &str = concat!(
    env!("CARGO_PKG_VERSION"),
    " (",
    env!("VERGEN_BUILD_DATE"),
    ")\n",
    env!("VERGEN_SYSINFO_OS_VERSION"),
);

/// String displaying the total memory used on the system to run the build.
const TOTAL_MEMORY: &str = env!("VERGEN_SYSINFO_TOTAL_MEMORY");

/// Get the version, author info, and directories of the package.
pub fn info() -> String {
    format!(
        "{}\nAuthors:\t{}\nTotal Memory:\t{}",
        VERSION_MESSAGE,
        clap::crate_authors!(),
        TOTAL_MEMORY,
    )
}
