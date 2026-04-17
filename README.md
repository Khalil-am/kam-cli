# KAM

**AI-powered enterprise execution by Kam Solutions.**
Turn strategy, requirements, and operations into structured action through intelligent agents, workflow automation, and business-aware execution.

KAM is a branded AI command layer for consulting, delivery, coding, QA, and decision support. It wraps [OpenClaw](https://openclaw.ai) with KAM Solutions theming, three opinionated agents (Kyle · Kade · Knox), and a configuration layout under `~/.kam/` so your KAM installation lives in its own clearly-branded space.

> **Consulting intelligence. Operational execution. One AI platform.**

## What KAM is for

KAM is designed for professionals and organizations that need to:

- **Structure complexity** — requirements, workflows, policies, governance models
- **Accelerate delivery** — move from idea to implementation faster
- **Improve quality** — QA discipline, UAT support, validation logic, defect detection
- **Automate knowledge work** — business analysis, documentation, reporting
- **Support better decisions** — executive dashboards, benchmarking, decision support
- **Operationalize AI** in real enterprise environments

Unlike consumer AI tools that focus on conversation alone, KAM is positioned as a **working layer for professionals** — it transforms ideas into deliverables, requirements into systems, decisions into action.

## The KAM agents

KAM ships with three coordinated agents that mirror how real delivery teams work:

| Agent | Role | Handles |
|-------|------|---------|
| **Kyle** 🧠 | Strategic coordination & executive support | BRDs, exec emails, meeting notes, orchestration, research, proposals |
| **Kade** 🛠️ | Technical implementation | Code, APIs, dashboards, integrations, automation, architecture |
| **Knox** 🛡️ | Quality assurance & validation | Test cases, UAT, defect detection, requirements review, readiness |

Kyle is the coordinator and delegates to Kade and Knox when a task fits their role. Each agent has its own workspace, identity, and operating instructions.

## Requirements

- **Node.js 20+**
- **[OpenClaw](https://openclaw.ai)** installed globally (`npm i -g openclaw`) — KAM uses OpenClaw as its execution runtime.
- **Claude Code** CLI (for the default `claude-cli` model backend) or an Anthropic API key (for the embedded backend).

## Install

```bash
npm i -g openclaw      # KAM's runtime dependency
npm i -g kam           # the KAM CLI
```

## Quick start

```bash
kam start              # first-run onboarding + migrates ~/.openclaw/ into ~/.kam/
```

That's it. First run will:

1. Copy any existing OpenClaw config into `~/.kam/openclaw.json`
2. Run the interactive onboarding wizard
3. Launch the gateway on `http://127.0.0.1:18789/`

Open the dashboard and you're live.

## Common commands

```bash
# Send a turn to each agent
kam kyle "Draft an executive update on the Q2 BRD rollout"
kam kade "Add a /health endpoint to the FastAPI service at src/api/app.py"
kam knox "Review BRD v0.3 for completeness and flag any weak requirements"

# Generic form
kam agent <id> <message>

# Gateway controls
kam gateway status
kam gateway start
kam gateway stop
kam gateway run-bg     # background process (useful on Windows if scheduled-task mode misbehaves)

# Telegram channel
kam telegram add <BOT_TOKEN>
kam telegram list
kam telegram status
kam telegram pair <CODE>    # approve a user pairing code

# Config helpers
kam config file
kam config get gateway.mode
kam config set gateway.mode local
kam config validate

# Doctor
kam doctor
kam doctor --fix

# Where is everything?
kam where

# Passthrough to raw openclaw CLI, with KAM state dir
kam raw -- plugins list
kam raw -- skills install openclaw-github-assistant
```

## State & config location

KAM stores everything under **`~/.kam/`**:

```
~/.kam/
├── openclaw.json          # main config
├── agents/                # per-agent state
├── workspaces/            # per-agent workspace (Kyle / Kade / Knox)
├── extensions/            # installed plugins
├── credentials/           # OAuth/API tokens
└── gateway.log            # when using `kam gateway run-bg`
```

KAM sets `OPENCLAW_STATE_DIR=~/.kam` and `OPENCLAW_CONFIG_PATH=~/.kam/openclaw.json` for every openclaw subprocess, so your KAM installation is fully isolated from any plain OpenClaw installation on the same machine.

## Connecting channels

### Telegram

1. Create a bot with [@BotFather](https://t.me/BotFather), copy the token.
2. `kam telegram add <TOKEN>`
3. Restart the gateway: `kam gateway stop && kam gateway run-bg`
4. DM your bot — first message returns a pairing code.
5. Approve it: `kam telegram pair <CODE>`

### MCP servers (optional but recommended)

KAM works with any [MCP server](https://modelcontextprotocol.io). Typical integrations:

- **[Maton](https://maton.ai)** — unified access to 24+ SaaS apps (Google Workspace, Notion, Slack, Salesforce, HubSpot, etc.)
- **Brave Search** — web search via the official MCP server
- Any other MCP you already use with Claude Code

Package MCPs as a Claude-format plugin (a directory with `.claude-plugin/plugin.json` + `.mcp.json`) and install it with `kam raw -- plugins install <path>`. See [docs/plugins.md](docs/plugins.md).

## Customizing the agents

Each agent's instructions live in its workspace as plain markdown:

- `~/.kam/workspace/` — Kyle (the default main agent)
- `~/.kam/workspaces/kade/` — Kade
- `~/.kam/workspaces/knox/` — Knox

Key files per workspace:

- `IDENTITY.md` — name, vibe, emoji, avatar
- `SOUL.md` — personality, operating style, delegation rules
- `USER.md` — what the agent knows about you
- `AGENTS.md` — workspace conventions and delegation playbook

Edit any of these and the change takes effect on the next agent turn.

## Brand

KAM is built by **Kam Solutions**, grounded in enterprise consulting, business analysis, and AI implementation across healthcare, government, finance, and enterprise systems. The brand reflects a belief that AI should not be separated from delivery — it should help professionals think better, move faster, reduce ambiguity, improve quality, and create outcomes that are ready for real organizations.

- **Name:** KAM
- **By:** Kam Solutions
- **Tagline:** Decision-ready. Delivery-ready.
- **Tone:** Professional. Clear. Strategic. Structured. Intelligent. Practical.

## Security

- KAM's config lives at `~/.kam/openclaw.json` and typically contains API keys (bot tokens, MCP provider keys, gateway auth tokens). It's `chmod 600` on Unix; keep it out of git and backups that leave your machine.
- Never commit your `~/.kam/` directory. The bundled `.gitignore` already excludes it — keep it that way.
- If you run KAM with `tools.profile: full` + sandbox off + approvals disabled ("yolo" preset), the agent has the same permissions as your OS user. Only do that on a trusted personal machine.

## License

MIT. See [LICENSE](LICENSE). KAM does **not** redistribute OpenClaw source — OpenClaw is a peer dependency users install themselves under its own license.

---

**KAM by Kam Solutions** — AI-powered consulting, execution, and intelligent operations.
