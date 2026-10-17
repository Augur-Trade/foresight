# Liquidity Lobe

Meteora DLMM pools, positions and the LP whales we track on chain.

3 tools · MCP server `https://augur-trade.com/hub/mcp/pump`

| Tool | What it does | Price |
|---|---|---|
| [`dlmm_pool`](#dlmm_pool) | State of a Meteora DLMM pool: price, bin step, fees, TVL, volume and fees by window (30 m–24 h), 24 h fee yield and its annualized APR/APY. | $0.002 |
| [`dlmm_positions`](#dlmm_positions) | Open Meteora DLMM positions of any wallet: value, unclaimed fees, PnL, in/out of range — or its closed-position history. | $0.005 |
| [`dlmm_whales`](#dlmm_whales) | Meteora DLMM liquidity providers ranked by measured on-chain edge: net USD, median multiple, win rate, hold time, size, recency. | $0.02 |

---

### `dlmm_pool`

**Meteora DLMM pool** · $0.002 · 10 free calls/day

State of a Meteora DLMM pool: price, bin step, fees, TVL, volume and fees by window (30 m–24 h), 24 h fee yield and its annualized APR/APY.

For LP agents choosing where to provide liquidity.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/dlmm_pool` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `dlmm_pool` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `pool` | string | yes | DLMM pool (pair) address. Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/dlmm_pool \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"pool": "HTvjzsfX3yU6BUodCjZ5vZkUrAxMDTrBs3CJaq43ashR"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.dlmmPool({"pool": "HTvjzsfX3yU6BUodCjZ5vZkUrAxMDTrBs3CJaq43ashR"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.dlmm_pool(pool='HTvjzsfX3yU6BUodCjZ5vZkUrAxMDTrBs3CJaq43ashR')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "dlmm_pool", "arguments": {"pool": "HTvjzsfX3yU6BUodCjZ5vZkUrAxMDTrBs3CJaq43ashR"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "dlmm_pool",
 "ms": 315,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "pool": "HTvjzsfX3yU6BUodCjZ5vZkUrAxMDTrBs3CJaq43ashR",
  "name": "SOL-USDC",
  "current_price": 104.57119919955942,
  "tvl_usd": 253735.44457093943,
  "fee_yield_24h_pct": 0.2146,
  "apr_pct": 78.35,
  "apy_pct_daily_compounding": 118.72,
  "yield_note": "annualized from the last 24 h of fees; DLMM fees swing hour to hour and exclude impermanent loss",
  "token_x": {
   "address": "So11111111111111111111111111111111111111112",
   "symbol": "SOL",
   "decimals": 9,
   "price": 104.54458120718088,
   "holders": 3820662,
   "is_verified": true
  },
  "token_y": {
   "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
   "symbol": "USDC",
   "decimals": 6,
   "price": 0.999750235082267,
   "holders": 5248202,
   "is_verified": true
  },
  "reserves": {
   "x": 1571.841320745,
   "y": 89427.984262
  },
  "config": {
   "bin_step": 1,
   "base_fee_pct": 0.01,
   "max_fee_pct": 0,
   "protocol_fee_pct": 5,
   "collect_fee_mode": 0
  },
  "dynamic_fee_pct": 3.2999999999999997e-06,
  "volume": {
   "30m": 7229.020133009095,
   "1h": 16950.657078737055,
   "2h": 260912.38835314824,
   "4h": 686584.4107027104,
   "12h": 1837749.978902419,
   "24h": 4350373.307905967
  },
  "fees": {
   "30m": 0.7436390873231472,
   "1h": 1.8536027748556063,
   "2h": 26.954031397664068,
   "4h": 71.31571565868813,
   "12h": 211.3272532513201,
   "24h": 544.6393955374253
  },
  "fee_tvl_ratio": {
   "30m": 0.0002930765500975329,
   "1h": 0.0007305257560645516,
   "2h": 0.010622887725931503,
   "4h": 0.02810632774592501,
   "12h": 0.08328645357713794,
   "24h": 0.21464852750801036
  },
  "created_at": "2024-02-16T22:10:07.000Z"
 }
}
```

</details>

---

### `dlmm_positions`

**Wallet DLMM positions** · $0.005 · 10 free calls/day

Open Meteora DLMM positions of any wallet: value, unclaimed fees, PnL, in/out of range — or its closed-position history.

Set history=true for closed positions with deposits, withdrawals, fees and PnL per pool.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/dlmm_positions` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `dlmm_positions` |
| Price | $0.005 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `wallet` | string | yes | wallet address. Base58 Solana address, 32-44 chars. |
| `history` | boolean |  | true = closed-position history instead of open positions. Default false. (default `false`) |
| `page` | integer |  | Page of closed-position history (only with history=true). Range 1-50. Default 1. (default `1`, range 1–50) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/dlmm_positions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"wallet": "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.dlmmPositions({"wallet": "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.dlmm_positions(wallet='86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "dlmm_positions", "arguments": {"wallet": "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "dlmm_positions",
 "ms": 327,
 "billing": {
  "mode": "credits",
  "usd": 0.005
 },
 "data": {
  "wallet": "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
  "mode": "open",
  "page": 1,
  "has_next": false,
  "pools_total": 0,
  "positions_total": 0,
  "pools": []
 }
}
```

</details>

---

### `dlmm_whales`

**DLMM LP whales** · $0.02 · 10 free calls/day

Meteora DLMM liquidity providers ranked by measured on-chain edge: net USD, median multiple, win rate, hold time, size, recency.

Produced by our own discovery engine, which decodes DLMM liquidity instructions across high-volume and high-yield pools every few hours and scores each wallet's completed round trips. These are the wallets our live copier watches.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/dlmm_whales` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `dlmm_whales` |
| Price | $0.02 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `limit` | integer |  | How many ranked LP wallets to return. Range 1-25. Default 10. (default `10`, range 1–25) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/dlmm_whales \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"limit": 5}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.dlmmWhales({"limit": 5});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.dlmm_whales(limit=5)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "dlmm_whales", "arguments": {"limit": 5}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "dlmm_whales",
 "ms": 1,
 "billing": {
  "mode": "credits",
  "usd": 0.02
 },
 "data": {
  "generated_at": "2026-10-13T16:28:06.744Z",
  "pools_scanned": 50,
  "method": "completed DLMM round trips per wallet, scored on net USD, median multiple, win rate, recency and size; wallets with too few round trips are rejected",
  "whales": [
   {
    "wallet": "9op6SEN4wrVGo1oPiMp3jdPPRrbjotH6JeNGUQuhZ6Cy",
    "score": 0,
    "net_usd": 441,
    "roundtrips": 3,
    "win_rate_pct": 66.7,
    "median_multiple": 1.0106,
    "median_hold_h": 6.5,
    "avg_trade_usd": 848,
    "pools_traded": 1,
    "last_seen": "2026-10-04T20:58:54.000Z"
   },
   {
    "wallet": "82abgG9n467jbttW6LE4RYancZKzXkZ2L3GxaCHmWhyi",
    "score": 0,
    "net_usd": 110,
    "roundtrips": 4,
    "win_rate_pct": 75,
    "median_multiple": 1.0143,
    "median_hold_h": 6.8,
    "avg_trade_usd": 5989,
    "pools_traded": 4,
    "last_seen": "2026-10-02T16:15:21.000Z"
   },
   {
    "wallet": "7fe9DpF15WYiUrYkcimznpXKvoLqgbNk5KRs7J2RrDLt",
    "score": 0,
    "net_usd": 85,
    "roundtrips": 5,
    "win_rate_pct": 60,
    "median_multiple": 1.0766,
    "median_hold_h": 12.2,
    "avg_trade_usd": 515,
    "pools_traded": 4,
    "last_seen": "2026-09-30T05:19:44.000Z"
   },
   "… 2 more"
  ]
 }
}
```

</details>

---

[← All endpoints](README.md)
