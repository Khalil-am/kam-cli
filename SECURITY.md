# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.x     | ✅ (active development) |

## Reporting a Vulnerability

Please **do not** open public GitHub issues for security concerns.

Email: **khalil-am@outlook.com** with:
- A clear description of the issue
- Steps to reproduce
- Affected versions
- Suggested fix (if known)

You can expect an initial response within 72 hours. Verified issues will be fixed in a patch release, credited (if you'd like), and disclosed in the [CHANGELOG](CHANGELOG.md).

## Scope

KAM CLI is a thin wrapper. Security issues in the underlying runtime (OpenClaw, Claude Code, MCP servers) should be reported upstream to those projects.

**In scope:**
- Secret leakage via KAM CLI output, logs, or error messages
- Path traversal or command injection in KAM wrappers
- Supply-chain concerns around KAM's own dependencies

**Out of scope:**
- Issues that require a compromised machine to exploit (KAM runs as your OS user)
- Vulnerabilities in OpenClaw, Claude Code, or other dependencies — report upstream
- "Agent did something unexpected" — that's the underlying model, not a CLI vulnerability

## Responsible use

KAM makes it easy to grant an AI agent broad access to your machine (OpenClaw's `yolo` preset, sandbox off, approvals disabled). This is powerful on a trusted personal machine. It is **not** an appropriate configuration for shared or production systems. Only you can decide what's safe for your environment.

KAM's config file at `~/.kam/openclaw.json` typically contains API keys and tokens. Treat it like any other credentials file — back it up privately, keep it out of source control, and rotate tokens on compromise.
