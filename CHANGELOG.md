# Changelog

All notable changes to KAM CLI will be documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning: [SemVer](https://semver.org/).

## [0.2.0] — 2026-04-18

### Added
- `kam version` command — shows KAM, OpenClaw, Node, and platform in one call.
- `src/logger.js` — consistent colored output with secret redaction.
- `--no-color` flag and `NO_COLOR` env var support.
- Smoke test suite (`test/smoke.test.js`) using Node's built-in test runner — runs via `npm test`.
- CI workflow (`.github/workflows/ci.yml`) — tests on Ubuntu, macOS, Windows × Node 20.
- Arabic companion README (`README.ar.md`).
- `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `.nvmrc`, `.editorconfig`.
- Issue + PR templates under `.github/`.

### Changed
- Package renamed from `kam` to `kam-cli` (the `kam` name was taken on npm; the user-facing command is still `kam`).
- README — added badges, TOC, troubleshooting section, FAQ.
- Uniform error handling: unhandled rejections and exceptions now produce actionable messages and hint at `kam doctor`.
- `kam start` now fails fast with a clear message if OpenClaw isn't installed, and prints the install command.

### Fixed
- Redacted potential secret leakage in CLI output paths (defensive — no known live leaks).

## [0.1.0] — 2026-04-18

Initial release. Branded wrapper around [OpenClaw](https://openclaw.ai) with Kyle/Kade/Knox agent trio, config rooted at `~/.kam/` via `OPENCLAW_STATE_DIR`, and KAM Solutions theming.
