"use strict";

const { resolveKamEnv } = require("../paths");
const { runOpenclaw } = require("../openclaw");

module.exports = function register(program) {
  program
    .command("doctor")
    .description("Health check for gateway, channels, plugins, and config.")
    .option("--fix", "apply auto-fixes where possible")
    .action((opts) => {
      const args = ["doctor"];
      if (opts.fix) args.push("--fix");
      process.exit(runOpenclaw(args, { env: resolveKamEnv() }));
    });
};
