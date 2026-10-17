#!/usr/bin/env bash
# A.U.G.U.R Synapse from the shell. Needs curl (and jq for pretty output).
set -euo pipefail
HUB=https://augur-trade.com/hub

# 1. The catalog: every tool, its price and its JSON input schema
curl -s "$HUB/api/v1/tools" | jq '.tools[] | {id, price_usd, summary}'

# 2. A free tool: live pump.fun heartbeat
curl -s -X POST "$HUB/api/v1/tools/pump_pulse" -H 'content-type: application/json' -d '{}' | jq .data.last_hour

# 3. A paid tool on the free tier (10 calls/day): rug-risk score for a token
curl -s -X POST "$HUB/api/v1/tools/token_risk" \
  -H 'content-type: application/json' -H 'X-Synapse-Free: 1' \
  -d '{"mint":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"}' | jq '{billing, score: .data.score, grade: .data.grade}'

# 4. The same call without the free-tier header: HTTP 402 with x402 payment requirements
curl -s -o /dev/null -w 'status %{http_code}\n' -X POST "$HUB/api/v1/tools/token_risk" \
  -H 'content-type: application/json' -d '{"mint":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"}'
