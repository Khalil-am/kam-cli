"use strict";

const { spawnSync, spawn } = require("child_process");
const kleur = require("kleur");
const log = require("./logger");

function detectOpenclaw() {
  // Use openclaw from PATH; `npm i -g openclaw` should have put it there.
  // On Windows, spawn needs shell:true to resolve .cmd/.ps1 shims.
  return { bin: "openclaw", shell: process.platform === "win32" };
}

function runOpenclaw(args, { env, inherit = true, capture = false } = {}) {
  const { bin, shell } = detectOpenclaw();
  try {
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
    if (res.error && res.error.code === "ENOENT") {
      missingOpenclaw();
      return 127;
    }
    return res.status == null ? 1 : res.status;
  } catch (err) {
    log.fail(`failed to run openclaw: ${err.message}`);
    return 1;
  }
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

function missingOpenclaw() {
  log.fail("OpenClaw is not installed or not on PATH.");
  log.hint("KAM is a thin wrapper around OpenClaw. Install it with:");
  process.stderr.write("  " + kleur.bold("npm i -g openclaw") + "\n");
  log.hint("Then re-run: " + kleur.bold("kam start"));
}

function requireOpenclawInstalled() {
  const res = spawnSync("openclaw", ["--version"], {
    shell: process.platform === "win32",
    encoding: "utf-8",
  });
  if (res.status !== 0 || (res.error && res.error.code === "ENOENT")) {
    missingOpenclaw();
    process.exit(1);
  }
  return (res.stdout || "").trim();
}

function tryOpenclawVersion() {
  const res = spawnSync("openclaw", ["--version"], {
    shell: process.platform === "win32",
    encoding: "utf-8",
  });
  if (res.status === 0) return (res.stdout || "").trim();
  return null;
}

module.exports = {
  runOpenclaw,
  spawnOpenclawDetached,
  requireOpenclawInstalled,
  tryOpenclawVersion,
};
