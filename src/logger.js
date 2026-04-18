"use strict";

const kleur = require("kleur");

// Keys that should never be printed verbatim. We redact them if they appear in
// anything we're about to log. This is a defense-in-depth belt for the CLI —
// the real secrets live in ~/.kam/openclaw.json and never leave that file.
const SECRET_KEY_PATTERNS = [
  /MATON_API_KEY/i,
  /BRAVE_API_KEY/i,
  /ANTHROPIC_API_KEY/i,
  /OPENAI_API_KEY/i,
  /GEMINI_API_KEY/i,
  /OAUTH_TOKEN/i,
  /BOT_TOKEN/i,
  /GATEWAY.*TOKEN/i,
  /\bBearer [A-Za-z0-9\-_.~+/=]{8,}\b/,
];

function redact(text) {
  if (!text) return text;
  let out = String(text);
  for (const pat of SECRET_KEY_PATTERNS) {
    out = out.replace(pat, (m) => `${m.slice(0, 3)}…REDACTED`);
  }
  return out;
}

function info(msg) {
  process.stderr.write(kleur.cyan("► ") + redact(msg) + "\n");
}
function ok(msg) {
  process.stderr.write(kleur.green("✔ ") + redact(msg) + "\n");
}
function warn(msg) {
  process.stderr.write(kleur.yellow("⚠ ") + redact(msg) + "\n");
}
function fail(msg) {
  process.stderr.write(kleur.red("✖ ") + redact(msg) + "\n");
}
function hint(msg) {
  process.stderr.write(kleur.gray("  " + redact(msg)) + "\n");
}

module.exports = { info, ok, warn, fail, hint, redact };
