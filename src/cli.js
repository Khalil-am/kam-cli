"use strict";

// Respect --no-color and NO_COLOR before anything else prints.
if (process.argv.includes("--no-color") || process.env.NO_COLOR) {
  process.env.FORCE_COLOR = "0";
}

const { Command } = require("commander");
const kleur = require("kleur");
const pkg = require("../package.json");
const { printBanner } = require("./banner");
const { resolveKamEnv } = require("./paths");
const { runOpenclaw } = require("./openclaw");
const log = require("./logger");

const program = new Command();

program
  .name("kam")
  .description(
    "KAM — AI-powered enterprise execution platform by Kam Solutions.\n" +
      "Branded AI command layer for consulting, delivery, coding, QA, and decision support."
  )
  .version(pkg.version, "-v, --version", "show KAM version")
  .helpOption("-h, --help", "show help")
  .option("--quiet", "suppress KAM banner")
  .option("--no-color", "disable ANSI colors")
  .hook("preAction", (thisCommand) => {
    if (!thisCommand.opts().quiet && !process.env.KAM_NO_BANNER) {
      printBanner();
    }
  });

require("./commands/start")(program);
require("./commands/gateway")(program);
require("./commands/telegram")(program);
require("./commands/agent")(program);
require("./commands/doctor")(program);
require("./commands/config")(program);
require("./commands/where")(program);
require("./commands/version")(program);
require("./commands/raw")(program);

// Friendly footer on help.
program.addHelpText(
  "after",
  "\nDocs: https://github.com/Khalil-am/kam-cli\n" +
    "Brand: Kam Solutions — AI-powered consulting, execution, intelligent operations.\n"
);

process.on("unhandledRejection", (reason) => {
  log.fail("unhandled error: " + (reason && reason.message ? reason.message : String(reason)));
  log.hint("Run 'kam doctor' for diagnostics.");
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  log.fail("uncaught exception: " + (err && err.message ? err.message : String(err)));
  log.hint("Run 'kam doctor' for diagnostics.");
  process.exit(1);
});

program.parseAsync(process.argv).catch((err) => {
  log.fail(err && err.message ? err.message : String(err));
  process.exit(1);
});

// Silence an unused-import warning without affecting behavior.
void kleur;
void runOpenclaw;
void resolveKamEnv;
