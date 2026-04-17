"use strict";
// Minimal postinstall — just advise the user to install openclaw if they haven't.
try {
  const { spawnSync } = require("child_process");
  const res = spawnSync("openclaw", ["--version"], {
    shell: process.platform === "win32",
    encoding: "utf-8",
  });
  if (res.status !== 0) {
    console.log("\n▶ KAM is installed. Missing dependency: openclaw");
    console.log("  Run: npm i -g openclaw\n");
  } else {
    console.log("\n✔ KAM installed. Run: kam start\n");
  }
} catch (_) { /* ignore */ }
