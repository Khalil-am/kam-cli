"use strict";

const kleur = require("kleur");
const fs = require("fs");
const path = require("path");
const { ensureKamDir, resolveKamEnv, paths, LEGACY_OPENCLAW_DIR } = require("../paths");
const { runOpenclaw, requireOpenclawInstalled } = require("../openclaw");

function maybeMigrate(fromDir, toDir) {
  const files = ["openclaw.json"];
  for (const name of files) {
    const src = path.join(fromDir, name);
    const dst = path.join(toDir, name);
    if (fs.existsSync(src) && !fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
      console.log(kleur.gray(`  migrated ${name} → ${toDir}`));
    }
  }
}

module.exports = function register(program) {
  program
    .command("start")
    .description("First-run onboarding, then launch the KAM gateway.")
    .option("--migrate", "copy existing ~/.openclaw/openclaw.json into ~/.kam/")
    .action((opts) => {
      requireOpenclawInstalled();
      const p = paths();
      ensureKamDir();

      if (opts.migrate || (!p.hasKamState && p.hasLegacyOpenclaw)) {
        console.log(kleur.cyan("► Migrating config from ~/.openclaw/ → ~/.kam/"));
        maybeMigrate(LEGACY_OPENCLAW_DIR, p.KAM_STATE_DIR);
      }

      const env = resolveKamEnv();

      if (!p.hasKamState) {
        console.log(kleur.cyan("► First run — starting KAM onboarding."));
        const code = runOpenclaw(["onboard"], { env });
        if (code !== 0) process.exit(code);
      }

      console.log(kleur.cyan("► Starting KAM gateway..."));
      const code = runOpenclaw(["gateway", "start"], { env });
      if (code === 0) {
        console.log(kleur.green("✔ KAM is up."));
        console.log(kleur.gray("  Dashboard: http://127.0.0.1:18789/"));
        console.log(kleur.gray("  Check status: ") + kleur.bold("kam doctor"));
      }
      process.exit(code);
    });
};
