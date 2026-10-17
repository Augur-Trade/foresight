# MCP

Synapse speaks MCP over streamable HTTP. Use the main server, or a focused one so your agent sees 15 tools or fewer.

| Server | URL | Tools |
|---|---|---|
| A.U.G.U.R Synapse (main: flagship tools, accepts any tool by name) | `https://augur-trade.com/hub/mcp` | 79 |
| A.U.G.U.R Synapse · Pump & LP | `https://augur-trade.com/hub/mcp/pump` | 12 |
| A.U.G.U.R Synapse · Wallets & Risk | `https://augur-trade.com/hub/mcp/risk` | 15 |
| A.U.G.U.R Synapse · Chain | `https://augur-trade.com/hub/mcp/chain` | 15 |
| A.U.G.U.R Synapse · Web & Research | `https://augur-trade.com/hub/mcp/web` | 15 |
| A.U.G.U.R Synapse · World | `https://augur-trade.com/hub/mcp/world` | 8 |
| A.U.G.U.R Synapse · Utils | `https://augur-trade.com/hub/mcp/util` | 10 |
| A.U.G.U.R Synapse · Bundle Forensics | `https://augur-trade.com/hub/mcp/forensics` | 4 |

Configs: [Claude Desktop](../examples/mcp/claude-desktop.json) · [Cursor](../examples/mcp/cursor.json) · [Claude Code](../examples/mcp/claude-code.md)

```bash
claude mcp add --transport http augur-synapse https://augur-trade.com/hub/mcp
```

Paid tools over MCP: the free tier applies automatically; after that, pass an x402 payment in `params._meta["x402/payment"]`, or send `Authorization: Bearer hk_…` on the MCP connection to bill a credit key.
