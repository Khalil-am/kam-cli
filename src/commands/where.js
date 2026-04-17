"use strict";

const kleur = require("kleur");
const { paths } = require("../paths");

module.exports = function register(program) {
  program
    .command("where")
    .description("Show resolved KAM paths (state dir, config, dashboard URL).")
    .action(() => {
      const p = paths();
      console.log(kleur.bold("KAM paths:"));
      console.log("  State dir: " + kleur.cyan(p.KAM_STATE_DIR));
      console.log("  Config:    " + kleur.cyan(p.configPath));
      console.log("  Legacy:    " + kleur.gray(p.LEGACY_OPENCLAW_DIR) +
        (p.hasLegacyOpenclaw ? kleur.yellow("  [exists — run `kam start --migrate` to import]") : ""));
      console.log("  Dashboard: " + kleur.cyan("http://127.0.0.1:18789/"));
    });
};
