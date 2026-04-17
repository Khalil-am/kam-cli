"use strict";

const { resolveKamEnv } = require("../paths");
const { runOpenclaw } = require("../openclaw");

module.exports = function register(program) {
  const cfg = program
    .command("config")
    .description("Inspect and modify the KAM config (~/.kam/openclaw.json).");

  cfg.command("get <path>")
    .description("Read a config value by dotted path.")
    .action((p) => {
      process.exit(runOpenclaw(["config", "get", p], { env: resolveKamEnv() }));
    });

  cfg.command("set <path> <value>")
    .description("Set a config value by dotted path.")
    .action((p, v) => {
      process.exit(runOpenclaw(["config", "set", p, v], { env: resolveKamEnv() }));
    });

  cfg.command("unset <path>")
    .description("Remove a config value by dotted path.")
    .action((p) => {
      process.exit(runOpenclaw(["config", "unset", p], { env: resolveKamEnv() }));
    });

  cfg.command("validate")
    .description("Validate the config file.")
    .action(() => {
      process.exit(runOpenclaw(["config", "validate"], { env: resolveKamEnv() }));
    });

  cfg.command("file")
    .description("Print the resolved config file path.")
    .action(() => {
      process.exit(runOpenclaw(["config", "file"], { env: resolveKamEnv() }));
    });
};
