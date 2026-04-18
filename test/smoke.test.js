"use strict";

// Smoke tests for the KAM CLI — run via `npm test` (node:test, built-in, no deps).
// These tests must pass WITHOUT OpenClaw being installed — they exercise the
// wrapper, not the underlying runtime.

const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");

const BIN = path.resolve(__dirname, "..", "bin", "kam.js");

function run(args, env) {
  const res = spawnSync(process.execPath, [BIN, ...args], {
    env: Object.assign({}, process.env, env || {}, { KAM_NO_BANNER: "1" }),
    encoding: "utf-8",
  });
  return {
    code: res.status == null ? 1 : res.status,
    stdout: res.stdout || "",
    stderr: res.stderr || "",
  };
}

test("kam --version prints a semver", () => {
  const { code, stdout } = run(["--version"]);
  assert.equal(code, 0);
  assert.match(stdout, /^\d+\.\d+\.\d+/);
});

test("kam --help lists all top-level commands", () => {
  const { code, stdout } = run(["--help"]);
  assert.equal(code, 0);
  for (const cmd of ["start", "gateway", "telegram", "agent", "kyle", "kade", "knox", "doctor", "config", "where", "version", "raw"]) {
    assert.match(stdout, new RegExp(`\\b${cmd}\\b`), `expected '${cmd}' in help output`);
  }
});

test("kam where prints KAM state dir and dashboard url", () => {
  const { code, stdout } = run(["where"]);
  assert.equal(code, 0);
  assert.match(stdout, /State dir:/);
  assert.match(stdout, /Config:/);
  assert.match(stdout, /Dashboard: /);
});

test("kam version shows platform + node + kam version", () => {
  const { code, stdout } = run(["version"]);
  assert.equal(code, 0);
  assert.match(stdout, /KAM\s+\d+\.\d+\.\d+/);
  assert.match(stdout, /Node:\s+v\d+\.\d+\.\d+/);
  assert.match(stdout, /Platform:/);
});

test("banner is suppressed when --quiet passed", () => {
  const { stdout } = run(["--quiet", "where"]);
  // The ASCII block starts with "██" — make sure it's not there.
  assert.doesNotMatch(stdout, /██/);
});

test("package.json exposes `kam` bin + correct name", () => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "package.json"), "utf-8"));
  assert.equal(pkg.name, "kam-cli");
  assert.equal(pkg.bin.kam, "./bin/kam.js");
  assert.ok(pkg.engines && pkg.engines.node, "engines.node should be set");
});
