"use strict";

const { resolveKamEnv } = require("../paths");
const { runOpenclaw } = require("../openclaw");

module.exports = function register(program) {
  const tg = program
    .command("telegram")
    .description("Configure the Telegram channel for KAM (add bot, list, pair, status).");

  tg.command("add <token>")
    .description("Register a Telegram bot (BotFather token).")
    .action((token) => {
      process.exit(
        runOpenclaw(["channels", "add", "--channel", "telegram", "--token", token], {
          env: resolveKamEnv(),
        })
      );
    });

  tg.command("list")
    .description("List configured channels including Telegram.")
    .action(() => {
      process.exit(runOpenclaw(["channels", "list"], { env: resolveKamEnv() }));
    });

  tg.command("status")
    .description("Probe Telegram + other channels.")
    .action(() => {
      process.exit(
        runOpenclaw(["channels", "status", "--probe"], { env: resolveKamEnv() })
      );
    });

  tg.command("pair <code>")
    .description("Approve a pairing code from a Telegram user (BotFather bot sends one when they first DM).")
    .action((code) => {
      process.exit(
        runOpenclaw(["pairing", "approve", "telegram", code], { env: resolveKamEnv() })
      );
    });
};
