# Getting started

**1. Browse the catalog.** `GET https://augur-trade.com/hub/api/v1/tools` returns every tool with its price and JSON input schema. It is also in [`spec/tools.json`](../spec/tools.json).

**2. Call a free tool.**

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/price -H 'Content-Type: application/json' \
  -d '{"mints":["So11111111111111111111111111111111111111112"]}'
```

**3. Try a paid tool on the free tier** (10 calls a day):

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/launch_scan -H 'Content-Type: application/json' -H 'X-Synapse-Free: 1' \
  -d '{"mint":"<a pump.fun mint>"}'
```

**4. Pay as you go** with x402 or a credit key: see [payments](payments.md).

**5. Or plug it into your agent over MCP**: see [MCP](mcp.md).

SDKs: [JavaScript](../sdk/js) · [Python](../sdk/python). Every endpoint, with examples and real responses: [endpoint reference](endpoints/README.md).
