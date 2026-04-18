"use strict";

const kleur = require("kleur");
const fs = require("fs");
const path = require("path");
const { ensureKamDir, resolveKamEnv, paths, LEGACY_OPENCLAW_DIR } = require("../paths");
const { runOpenclaw, requireOpenclawInstalled } = require("../openclaw");
const log = require("../logger");

function maybeMigrate(fromDir, toDir) {
  const files = ["openclaw.json"];
  let migrated = 0;
  for (const name of files) {
    const src = path.join(fromDir, name);
    const dst = path.join(toDir, name);
    if (fs.existsSync(src) && !fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
      log.hint(`migrated ${name} → ${toDir}`);
      migrated += 1;
    }
  }
  return migrated;
}

module.exports = function register(program) {
  program
    .command("start")
    .description("First-run onboarding, then launch the KAM gateway.")
    .option("--migrate", "copy existing ~/.openclaw/openclaw.json into ~/.kam/")
    .option("--skip-onboard", "skip the interactive onboarding wizard")
    .action((opts) => {
      const ocVersion = requireOpenclawInstalled();
      const p = paths();
      ensureKamDir();

      if (opts.migrate || (!p.hasKamState && p.hasLegacyOpenclaw)) {
        log.info("Migrating config from ~/.openclaw/ → ~/.kam/");
        const n = maybeMigrate(LEGACY_OPENCLAW_DIR, p.KAM_STATE_DIR);
        if (n === 0) log.hint("nothing to migrate (already present)");
      }

      const env = resolveKamEnv();

      if (!p.hasKamState && !opts.skipOnboard) {
        log.info("First run — starting KAM onboarding.");
        const code = runOpenclaw(["onboard"], { env });
        if (code !== 0) {
          log.fail(`onboarding exited with code ${code}`);
          process.exit(code);
        }
      }

      log.info(`Starting KAM gateway (OpenClaw ${ocVersion.split(" ")[1] || "unknown"})...`);
      const code = runOpenclaw(["gateway", "start"], { env });
      if (code === 0) {
        log.ok("KAM is up.");
        log.hint("Dashboard: " + kleur.cyan("http://127.0.0.1:18789/"));
        log.hint("Status:    " + kleur.bold("kam doctor"));
        log.hint("Send Kyle a message: " + kleur.bold('kam kyle "hello"'));
      }
      process.exit(code);
    });
};
