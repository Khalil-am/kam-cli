# Agents — Kyle, Kade, Knox

KAM's default agent set is three coordinated agents.

## Kyle — Strategic coordinator 🧠

Khalil's primary AI agent. Strategic digital operator, executive assistant, research partner, workflow coordinator, decision-support agent.

**Use Kyle for:**
- Drafting executive emails, summaries, proposals, meeting notes
- Structuring BRDs, user stories, workflows, policies, governance models
- Translating rough ideas into clear plans and implementation steps
- Research, benchmarking, competitor analysis
- Orchestration and delegation to Kade / Knox

```bash
kam kyle "Write a 1-page BRD for the procurement approval workflow"
```

## Kade — Implementation engineer 🛠️

Technical agent. Turns product, system, and workflow ideas into real implementations.

**Use Kade for:**
- Writing, refactoring, improving production-ready code
- Frontend, backend, APIs, dashboards, workflow systems, integrations
- Converting business requirements into technical tasks
- Architecture, folder structure, data models, validation logic, API designs
- Debugging, automation, GitHub tasks

```bash
kam kade "Add idempotency keys to POST /orders in src/api/orders.ts"
```

## Knox — Quality & validation 🛡️

QA agent. Reviews critically, identifies defects, validates logic, ensures outputs are complete and fit for real enterprise use.

**Use Knox for:**
- Reviewing deliverables for quality, completeness, logic
- Validating BRDs, user stories, workflows, system behavior
- Writing test cases, UAT cases, validation checklists, defect reports
- UAT prep, issue tracking, signoff readiness

```bash
kam knox "Review the /orders idempotency implementation Kade just delivered — cover at least 6 edge cases"
```

## Delegation between agents

Each agent has delegation instructions built into its `SOUL.md`. Typical flow:

1. Khalil asks **Kyle** for a new feature
2. Kyle writes the BRD and hands implementation to **Kade**:
   `openclaw agent --agent kade --message "<task>"`
3. Kade ships the code, hands to **Knox** for review
4. Knox reports defects back to **Kade** (or Kyle for re-scoping)

The `openclaw agent` CLI is the delegation mechanism — each agent can spawn a turn on another agent and read its stdout reply.

## Customizing

Edit files in the agent's workspace:

- `~/.kam/workspace/` — Kyle (main)
- `~/.kam/workspaces/kade/` — Kade
- `~/.kam/workspaces/knox/` — Knox

Key files:
- `IDENTITY.md` — name, vibe, emoji
- `SOUL.md` — personality, operating style, delegation rules
- `USER.md` — what the agent knows about you
- `AGENTS.md` — workspace conventions

Changes take effect on the next agent turn.

## Adding a new agent

```bash
kam raw -- agents add <id> --workspace ~/.kam/workspaces/<id> --non-interactive
```

Then edit the new workspace's `IDENTITY.md` and `SOUL.md` to define the agent's role.
