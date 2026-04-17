"use strict";

const os = require("os");
const path = require("path");
const fs = require("fs");

const KAM_STATE_DIR = process.env.KAM_STATE_DIR || path.join(os.homedir(), ".kam");
const LEGACY_OPENCLAW_DIR = path.join(os.homedir(), ".openclaw");

function ensureKamDir() {
  if (!fs.existsSync(KAM_STATE_DIR)) {
    fs.mkdirSync(KAM_STATE_DIR, { recursive: true });
  }
  return KAM_STATE_DIR;
}

function hasLegacyOpenclaw() {
  return fs.existsSync(LEGACY_OPENCLAW_DIR) &&
    fs.readdirSync(LEGACY_OPENCLAW_DIR).length > 0;
}

function hasKamState() {
  return fs.existsSync(path.join(KAM_STATE_DIR, "openclaw.json"));
}

// Build env for the openclaw subprocess. Tells openclaw where to read/write
// its config + state (we point it at ~/.kam so users see a KAM-branded path).
function resolveKamEnv(extra) {
  const env = Object.assign({}, process.env);
  env.OPENCLAW_STATE_DIR = KAM_STATE_DIR;
  env.OPENCLAW_CONFIG_PATH = path.join(KAM_STATE_DIR, "openclaw.json");
  if (extra) Object.assign(env, extra);
  return env;
}

function paths() {
  return {
    KAM_STATE_DIR,
    LEGACY_OPENCLAW_DIR,
    configPath: path.join(KAM_STATE_DIR, "openclaw.json"),
    hasLegacyOpenclaw: hasLegacyOpenclaw(),
    hasKamState: hasKamState(),
  };
}

module.exports = { KAM_STATE_DIR, LEGACY_OPENCLAW_DIR, ensureKamDir, hasLegacyOpenclaw, hasKamState, resolveKamEnv, paths };
