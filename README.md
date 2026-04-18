# KAM

[![CI](https://github.com/Khalil-am/kam-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/Khalil-am/kam-cli/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/kam-cli.svg?color=blue)](https://www.npmjs.com/package/kam-cli)
[![node](https://img.shields.io/node/v/kam-cli.svg)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/kam-cli.svg)](LICENSE)
[![Arabic](https://img.shields.io/badge/readme-العربية-success)](README.ar.md)

**AI-powered enterprise execution by Kam Solutions.**
Turn strategy, requirements, and operations into structured action through intelligent agents, workflow automation, and business-aware execution.

KAM is a branded AI command layer for **consulting, delivery, coding, QA, and decision support**. It wraps [OpenClaw](https://openclaw.ai) with KAM Solutions theming, a three-agent trio (Kyle · Kade · Knox), and a configuration layout under `~/.kam/` so your installation lives in its own clearly-branded space.

> **Consulting intelligence. Operational execution. One AI platform.**

---

## Contents

- [Why KAM](#why-kam)
- [The KAM agents](#the-kam-agents)
- [Requirements](#requirements)
- [Install](#install)
- [Quick start](#quick-start)
- [Commands](#commands)
- [State & config location](#state--config-location)
- [Channels — Telegram](#channels--telegram)
- [Plugins & MCP](#plugins--mcp)
- [Customizing the agents](#customizing-the-agents)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Why KAM

Unlike consumer AI tools that focus on conversation alone, KAM is positioned as a **working layer for professionals** — it transforms ideas into deliverables, requirements into systems, decisions into action. It's designed for teams that need:

- **Structure complexity** — requirements, workflows, policies, governance models
- **Accelerate delivery** — from idea to implementation faster
- **Improve quality** — QA discipline, UAT support, validation logic, defect detection
- **Automate knowledge work** — business analysis, documentation, reporting
- **Support better decisions** — executive dashboards, benchmarking, decision support
- **Operationalize AI** in real enterprise environments

Grounded in real enterprise work — digital transformation, business analysis, governance, PMO systems, executive decision support — across healthcare, government, finance, and enterprise systems.

## The KAM agents

KAM ships with three coordinated agents that mirror how real delivery teams work:

| Agent | Role | Handles |
|-------|------|---------|
| **Kyle** 🧠 | Strategic coordination & executive support | BRDs, exec emails, meeting notes, orchestration, research, proposals |
| **Kade** 🛠️ | Technical implementation | Code, APIs, dashboards, integrations, automation, architecture |
| **Knox** 🛡️ | Quality assurance & validation | Test cases, UAT, defect detection, requirements review, readiness |

Kyle is the coordinator and delegates to Kade and Knox when a task fits their role. Each agent has its own workspace, identity, and operating instructions — fully customizable via plain markdown files.

## Requirements

- **Node.js 20+** (`node --version`)
- **[OpenClaw](https://openclaw.ai)** installed globally (`npm i -g openclaw`) — KAM uses OpenClaw as its runtime.
- A model backend — either Claude Code CLI (free with your Claude subscription) or an Anthropic API key for the embedded backend.

## Install

```bash
npm i -g openclaw      # KAM's runtime dependency
npm i -g kam-cli       # the KAM CLI (command installed as `kam`)
```

> **Note:** the npm package is called `kam-cli` because the short name `kam` was taken. The command you run remains `kam`.

## Quick start

```bash
kam start
```

First run will:

1. Copy any existing `~/.openclaw/openclaw.json` into `~/.kam/openclaw.json`
2. Run the interactive onboarding wizard
3. Launch the gateway on `http://127.0.0.1:18789/`

Open the dashboard — KAM is live.

## Commands

```bash
# Talk to each agent
kam kyle "Draft an executive update on the Q2 BRD rollout"
kam kade "Add a /health endpoint to the FastAPI service at src/api/app.py"
kam knox "Review BRD v0.3 for completeness and flag any weak requirements"

# Generic form
kam agent <id> <message>

# Gateway
kam gateway status
kam gateway start
kam gateway stop
kam gateway run-bg     # background process (useful on Windows if scheduled-task mode misbehaves)

# Telegram
kam telegram add <BOT_TOKEN>
kam telegram list
kam telegram status
kam telegram pair <CODE>

# Config
kam config file
kam config get <path>
kam config set <path> <value>
kam config validate

# Observability
kam doctor
kam doctor --fix
kam where              # resolved paths
kam version            # kam + openclaw + node + platform

# Escape hatch — any raw openclaw arg, scoped to ~/.kam
kam raw -- plugins list
kam raw -- skills install openclaw-github-assistant
```

## State & config location

KAM stores everything under **`~/.kam/`**:

```
~/.kam/
├── openclaw.json          # main config (treat as secrets)
├── agents/                # per-agent state
├── workspaces/            # per-agent workspace (Kyle / Kade / Knox)
├── extensions/            # installed plugins (e.g., Maton, Brave Search)
├── credentials/           # OAuth/API tokens
└── gateway.log            # when using `kam gateway run-bg`
```

KAM sets `OPENCLAW_STATE_DIR=~/.kam` and `OPENCLAW_CONFIG_PATH=~/.kam/openclaw.json` for every openclaw subprocess, so your KAM installation is fully isolated from any plain OpenClaw install on the same machine.

## Channels — Telegram

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the token.
2. `kam telegram add <TOKEN>`
3. Restart the gateway: `kam gateway stop && kam gateway run-bg`
4. DM your bot — the first message returns a pairing code.
5. Approve it: `kam telegram pair <CODE>`

From then on, messages to your bot route to Kyle by default. Reply, and you're talking to your KAM agent.

## Plugins & MCP

KAM works with any [MCP server](https://modelcontextprotocol.io) — Maton (24+ SaaS apps incl. Google Workspace, Notion, Slack, Salesforce), Brave Search, GitHub tooling, and more.

Package MCP servers as a Claude-format plugin (directory with `.claude-plugin/plugin.json` + `.mcp.json`), then install:

```bash
kam raw -- plugins install /path/to/my-plugin
kam gateway stop && kam gateway run-bg
```

See [docs/plugins.md](docs/plugins.md) for the full plugin format, and [docs/agents.md](docs/agents.md) for the agent trio's delegation protocol.

## Customizing the agents

Each agent's instructions live in its workspace as plain markdown:

- `~/.kam/workspace/` — Kyle (main)
- `~/.kam/workspaces/kade/` — Kade
- `~/.kam/workspaces/knox/` — Knox

Key files per workspace:

| File | Purpose |
|------|---------|
| `IDENTITY.md` | Name, vibe, emoji, avatar |
| `SOUL.md` | Personality, operating style, delegation rules |
| `USER.md` | What the agent knows about you |
| `AGENTS.md` | Workspace conventions, delegation playbook |

Edit any of these; the change takes effect on the next agent turn. No restart needed.

## Troubleshooting

### Gateway won't start

```bash
kam doctor               # diagnose
kam doctor --fix         # attempt auto-fix
```

If the scheduled-task mode fails on Windows (known quirk), fall back to:
```bash
kam gateway run-bg
```

### MCP tools aren't visible to the agent

OpenClaw's `claude-cli` backend only bridges MCPs from plugin bundles (not `mcp.servers` in the config). If your Maton/Brave/etc. tools don't appear:
1. Package them as a Claude-format plugin (see [docs/plugins.md](docs/plugins.md))
2. `kam raw -- plugins install /path/to/plugin`
3. Restart the gateway

### Agent says "no matching tool" after MCP install

The MCP servers are loading but Claude Code's one-shot `-p` mode doesn't wait for slow servers. Use direct `node /path/to/index.js` instead of `npx -y @pkg` in your MCP config — global installs start instantly.

### Rotate leaked credentials

If API keys were pasted into chat or logs, rotate immediately:
- **Maton:** https://maton.ai/api-keys → revoke + regenerate
- **Brave Search:** https://brave.com/search/api/ → revoke + regenerate
- **Telegram:** DM BotFather `/revoke` → select bot

Paste new keys via `kam raw -- configure` (interactive), not on the shell.

## FAQ

**Is KAM a fork of OpenClaw?**
No. KAM is a thin npm wrapper around OpenClaw. OpenClaw stays upstream; KAM adds branding, opinionated defaults, and the Kyle/Kade/Knox agent trio.

**Does KAM cost anything?**
The CLI is MIT-licensed and free. You'll need a model backend — either Claude Code (comes with your Claude subscription) or an Anthropic API key (pay-per-token).

**Is my data sent anywhere?**
Only to the model provider you configure (Anthropic, etc.) and any channels/MCPs you explicitly wire up (Telegram, Maton, Brave Search). KAM itself has no telemetry.

**Can I run this on a shared/production server?**
Not recommended. KAM is designed for a single trusted user on a personal machine. The default "yolo" config gives the agent full OS-user permissions. For production, you'd want a harder sandbox policy.

**What about Arabic?**
Kyle/Kade/Knox are bilingual — their `SOUL.md` explicitly supports Arabic + English. The CLI itself is English-only but the docs have an [Arabic companion](README.ar.md).

## Security

- `~/.kam/openclaw.json` typically contains API keys and OAuth tokens. It's `chmod 600` on Unix; keep it out of git and backups that leave your machine.
- Never commit your `~/.kam/` directory. Our `.gitignore` already excludes it.
- Report vulnerabilities per [SECURITY.md](SECURITY.md) — not as public issues.

## Contributing

Pull requests welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for scope, commit style, and development setup. Quick start:

```bash
git clone https://github.com/Khalil-am/kam-cli
cd kam-cli
npm install && npm link
npm test
```

## License

MIT. See [LICENSE](LICENSE). KAM does **not** redistribute OpenClaw source — OpenClaw is a peer dependency users install themselves under its own license.

---

**KAM by Kam Solutions** — AI-powered consulting, execution, and intelligent operations.
