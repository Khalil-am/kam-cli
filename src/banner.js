"use strict";

const kleur = require("kleur");

const ART = [
  "",
  "  ██╗  ██╗  █████╗  ███╗   ███╗",
  "  ██║ ██╔╝ ██╔══██╗ ████╗ ████║",
  "  █████╔╝  ███████║ ██╔████╔██║",
  "  ██╔═██╗  ██╔══██║ ██║╚██╔╝██║",
  "  ██║  ██╗ ██║  ██║ ██║ ╚═╝ ██║",
  "  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝     ╚═╝",
  ""
];

function printBanner() {
  const brand = kleur.bold().cyan;
  const accent = kleur.yellow;
  const muted = kleur.gray;

  for (const line of ART) {
    process.stdout.write(brand(line) + "\n");
  }
  process.stdout.write(
    "  " + brand("KAM") +
    muted(" by ") +
    accent("Kam Solutions") +
    muted(" — AI-powered enterprise execution.\n")
  );
  process.stdout.write(
    "  " + muted("Strategy · Delivery · Code · QA · Decision Support\n\n")
  );
}

module.exports = { printBanner };
