# Installation

## Prerequisites

- **Node.js 20+** — check with `node --version`
- **[OpenClaw](https://openclaw.ai)** — KAM's runtime dependency
- A model backend — either:
  - **Claude Code CLI** (free with your Claude subscription) — `claude -p` mode
  - **Anthropic API key** — pay-per-token embedded runner

## Step 1: Install OpenClaw

```bash
npm i -g openclaw
openclaw --version    # verify
```

## Step 2: Install KAM

```bash
npm i -g kam
kam --version         # shows KAM version
```

## Step 3: First run

```bash
kam start
```

This migrates any existing `~/.openclaw/openclaw.json` into `~/.kam/openclaw.json`, runs onboarding, and launches the gateway.

## Platform notes

### Windows

- Bash-style commands in this doc work in Git Bash, WSL, or PowerShell with minor adaptation.
- On some Windows configurations, OpenClaw's scheduled-task mode (`kam gateway start`) exits immediately. If that happens, use `kam gateway run-bg` which launches the gateway as a detached background process. Logs go to `~/.kam/gateway.log`.

### macOS / Linux

- `kam gateway start` uses a systemd/launchd unit where available.
- No known quirks.

## Upgrading

```bash
npm i -g kam@latest openclaw@latest
kam doctor --fix
```

## Uninstalling

```bash
kam gateway stop
npm uninstall -g kam
npm uninstall -g openclaw     # optional — removes the runtime too
rm -rf ~/.kam                 # optional — wipes all state
```
