"use strict";

const { spawnSync, spawn } = require("child_process");
const kleur = require("kleur");

function detectOpenclaw() {
  // Use openclaw from PATH; `npm i -g openclaw` should have put it there.
  // On Windows, spawn needs shell:true to resolve .cmd/.ps1 shims.
  return { bin: "openclaw", shell: process.platform === "win32" };
}

function runOpenclaw(args, { env, inherit = true, capture = false } = {}) {
  const { bin, shell } = detectOpenclaw();
  if (capture) {
    const res = spawnSync(bin, args, {
      env: env || process.env,
      shell,
      encoding: "utf-8",
    });
    return {
      code: res.status == null ? 1 : res.status,
      stdout: res.stdout || "",
      stderr: res.stderr || "",
    };
  }
  const res = spawnSync(bin, args, {
    env: env || process.env,
    shell,
    stdio: inherit ? "inherit" : "pipe",
  });
  return res.status == null ? 1 : res.status;
}

function spawnOpenclawDetached(args, { env, logFile } = {}) {
  const { bin, shell } = detectOpenclaw();
  const fs = require("fs");
  const out = logFile ? fs.openSync(logFile, "a") : "ignore";
  const child = spawn(bin, args, {
    env: env || process.env,
    shell,
    detached: true,
    stdio: ["ignore", out, out],
  });
  child.unref();
  return child.pid;
}

function requireOpenclawInstalled() {
  const res = spawnSync("openclaw", ["--version"], {
    shell: process.platform === "win32",
    encoding: "utf-8",
  });
  if (res.status !== 0) {
    console.error(kleur.red("KAM requires OpenClaw to be installed."));
    console.error("Install with: " + kleur.bold("npm i -g openclaw"));
    process.exit(1);
  }
  return (res.stdout || "").trim();
}

module.exports = { runOpenclaw, spawnOpenclawDetached, requireOpenclawInstalled };
