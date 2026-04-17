"use strict";

const { resolveKamEnv } = require("../paths");
const { runOpenclaw } = require("../openclaw");

module.exports = function register(program) {
  program
    .command("agent <id> <message...>")
    .description("Send a single turn to a KAM agent (kyle/main, kade, knox, or any custom).")
    .option("--timeout <seconds>", "override timeout")
    .option("--json", "output as JSON")
    .action((id, messageParts, opts) => {
      const message = messageParts.join(" ");
      const args = ["agent", "--agent", id, "--message", message];
      if (opts.timeout) args.push("--timeout", String(opts.timeout));
      if (opts.json) args.push("--json");
      process.exit(runOpenclaw(args, { env: resolveKamEnv() }));
    });

  program
    .command("kyle <message...>")
    .description("Shortcut — send a message to Kyle (the strategic main agent).")
    .action((messageParts) => {
      process.exit(
        runOpenclaw(
          ["agent", "--agent", "main", "--message", messageParts.join(" ")],
          { env: resolveKamEnv() }
        )
      );
    });

  program
    .command("kade <message...>")
    .description("Shortcut — send a message to Kade (coding/implementation).")
    .action((messageParts) => {
      process.exit(
        runOpenclaw(
          ["agent", "--agent", "kade", "--message", messageParts.join(" ")],
          { env: resolveKamEnv() }
        )
      );
    });

  program
    .command("knox <message...>")
    .description("Shortcut — send a message to Knox (QA/validation).")
    .action((messageParts) => {
      process.exit(
        runOpenclaw(
          ["agent", "--agent", "knox", "--message", messageParts.join(" ")],
          { env: resolveKamEnv() }
        )
      );
    });
};
