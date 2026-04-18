# Contributing to KAM CLI

Thanks for considering a contribution. KAM CLI is a thin branded wrapper around [OpenClaw](https://openclaw.ai) — its job is to stay small, clear, and close to the underlying runtime.

## Scope

**In scope** — anything that makes KAM a better branded shell:
- Polish to CLI ergonomics, error messages, help output
- New `kam <subcommand>` wrappers around existing OpenClaw features
- Docs, translations, onboarding improvements
- Bug fixes, cross-platform compatibility (Windows/macOS/Linux)

**Out of scope** — anything OpenClaw itself should fix:
- New model backends, channel integrations, MCP primitives
- Changes to the agent runtime or gateway internals

If OpenClaw needs a change, open an issue upstream.

## Development

```bash
git clone https://github.com/Khalil-am/kam-cli
cd kam-cli
npm install
npm link            # installs a dev `kam` on PATH
npm test            # runs smoke tests
node bin/kam.js --help
```

### Commit style

- Short imperative subject (≤70 chars): `Add Arabic README`, `Fix banner rendering on Windows CMD`
- Body optional; explain *why* when it's non-obvious.
- Link related issues: `Fixes #12`

### Pull requests

- Small, focused PRs. One concern per PR.
- Include test coverage for new behavior if possible.
- Run `npm test` locally before pushing.
- Fill in the PR template.
- Keep the readme + CHANGELOG up to date with your change.

## Code style

- 2-space indentation (see `.editorconfig`)
- `"use strict"` at the top of every file
- CommonJS (`require` / `module.exports`) — we deliberately avoid ESM so we can stay dependency-light and work well in CLI contexts.
- Shell out to `openclaw` via `src/openclaw.js` — do not duplicate runtime logic here.

## Reporting bugs

- Open an issue with the output of `kam version` and `kam doctor`.
- Include the exact command you ran and what you expected.
- If it's a security issue, see [SECURITY.md](SECURITY.md).

## License

By contributing, you agree your changes are released under the MIT License (see [LICENSE](LICENSE)).
