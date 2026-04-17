"use strict";

const { resolveKamEnv } = require("../paths");
const { runOpenclaw } = require("../openclaw");

module.exports = function register(program) {
  program
    .command("raw")
    .description("Pass raw arguments through to the underlying openclaw CLI (scoped to ~/.kam).")
    .allowUnknownOption(true)
    .argument("[args...]", "arguments forwarded verbatim to openclaw")
    .action((args) => {
      process.exit(runOpenclaw(args || [], { env: resolveKamEnv() }));
    });
};
