# MCP

Foresight speaks MCP over streamable HTTP. Use the main server, or a focused one so your agent sees 15 tools or fewer.

| Server | URL | Tools |
|---|---|---|
| A.U.G.U.R Foresight (main: flagship tools, accepts any tool by name) | `https://augur-trade.com/hub/mcp` | 79 |
| A.U.G.U.R Foresight · Pump & LP | `https://augur-trade.com/hub/mcp/pump` | 12 |
| A.U.G.U.R Foresight · Wallets & Risk | `https://augur-trade.com/hub/mcp/risk` | 15 |
| A.U.G.U.R Foresight · Chain | `https://augur-trade.com/hub/mcp/chain` | 15 |
| A.U.G.U.R Foresight · Web & Research | `https://augur-trade.com/hub/mcp/web` | 15 |
| A.U.G.U.R Foresight · World | `https://augur-trade.com/hub/mcp/world` | 8 |
| A.U.G.U.R Foresight · Utils | `https://augur-trade.com/hub/mcp/util` | 10 |
| A.U.G.U.R Foresight · Bundle Forensics | `https://augur-trade.com/hub/mcp/forensics` | 4 |

Configs: [Claude Desktop](../examples/mcp/claude-desktop.json) · [Cursor](../examples/mcp/cursor.json) · [Claude Code](../examples/mcp/claude-code.md)

```bash
claude mcp add --transport http augur-synapse https://augur-trade.com/hub/mcp
```

Paid tools over MCP: the free tier applies automatically; after that, pass an x402 payment in `params._meta["x402/payment"]`, or send `Authorization: Bearer hk_…` on the MCP connection to bill a credit key.
