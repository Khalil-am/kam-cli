"use strict";

const { Command } = require("commander");
const kleur = require("kleur");
const pkg = require("../package.json");
const { printBanner } = require("./banner");
const { resolveKamEnv } = require("./paths");
const { runOpenclaw } = require("./openclaw");

const program = new Command();

program
  .name("kam")
  .description("KAM — AI-powered enterprise execution platform by Kam Solutions.")
  .version(pkg.version, "-v, --version", "show KAM version")
  .helpOption("-h, --help", "show help")
  .option("--quiet", "suppress KAM banner")
  .hook("preAction", (thisCommand) => {
    if (!thisCommand.opts().quiet && !process.env.KAM_NO_BANNER) {
      printBanner();
    }
  });

// kam start — first-run onboarding + gateway up
require("./commands/start")(program);
// kam gateway <subcommand> — passthrough to `openclaw gateway`
require("./commands/gateway")(program);
// kam telegram <subcommand> — configure Telegram channel
require("./commands/telegram")(program);
// kam agent <id> <message>  — send a turn to a specific KAM agent
require("./commands/agent")(program);
// kam doctor — health checks
require("./commands/doctor")(program);
// kam config — config helpers
require("./commands/config")(program);
// kam where — print resolved state/config paths
require("./commands/where")(program);
// kam raw -- ...args — pass anything through to openclaw with KAM state dir
require("./commands/raw")(program);

// Fall through: any unknown subcommand is forwarded to `openclaw` with KAM env.
program
  .command("* ", { noHelp: true, hidden: true })
  .allowUnknownOption(true)
  .action(() => {
    const args = program.args;
    const env = resolveKamEnv();
    const code = runOpenclaw(args, { env, inherit: true });
    process.exit(code);
  });

program.parseAsync(process.argv).catch((err) => {
  console.error(kleur.red("kam: ") + (err && err.message ? err.message : String(err)));
  process.exit(1);
});
