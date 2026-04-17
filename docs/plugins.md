# Plugins — Adding MCP servers to KAM

KAM inherits OpenClaw's plugin system. To expose an external MCP server (Maton, Brave Search, etc.) to your KAM agents, package it as a Claude-format plugin.

## Plugin layout

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json       # plugin manifest
└── .mcp.json             # MCP server declarations
```

### `plugin.json`

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "What this plugin does"
}
```

### `.mcp.json`

```json
{
  "mcpServers": {
    "brave-search": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/node_modules/@modelcontextprotocol/server-brave-search/dist/index.js"],
      "env": { "BRAVE_API_KEY": "YOUR_KEY" }
    },
    "maton-google-calendar": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/node_modules/@maton/mcp/dist/index.js", "google-calendar", "--actions=all"],
      "env": { "MATON_API_KEY": "YOUR_KEY" }
    }
  }
}
```

**Tip:** use direct `node /path/to/index.js` instead of `npx -y @package`. `npx` cold-starts add multi-second latency to every agent turn.

## Install

```bash
kam raw -- plugins install /path/to/my-plugin
kam gateway stop && kam gateway run-bg   # restart to load
```

## Verify

```bash
kam raw -- plugins list
kam raw -- plugins inspect my-plugin
kam kyle "Search for Claude Code release notes" # tests brave-search tool
```

## Why a plugin?

OpenClaw's `claude-cli` backend only ships MCP servers to Claude Code via plugin bundles, not from `mcp.servers` at the top of the config. Packaging MCPs as a plugin is the supported path for the `claude-cli` agent to see those tools.
