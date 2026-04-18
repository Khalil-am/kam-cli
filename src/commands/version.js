"use strict";

const kleur = require("kleur");
const pkg = require("../../package.json");
const { tryOpenclawVersion } = require("../openclaw");

module.exports = function register(program) {
  program
    .command("version")
    .description("Show versions of kam, openclaw, node, and platform.")
    .action(() => {
      const oc = tryOpenclawVersion();
      console.log(kleur.bold().cyan("KAM") + " " + kleur.white(pkg.version));
      console.log(kleur.gray("  OpenClaw: ") + (oc ? kleur.white(oc) : kleur.red("not installed")));
      console.log(kleur.gray("  Node:     ") + kleur.white(process.version));
      console.log(kleur.gray("  Platform: ") + kleur.white(`${process.platform} (${process.arch})`));
      console.log(kleur.gray("  Repo:     ") + kleur.white("https://github.com/Khalil-am/kam-cli"));
    });
};
