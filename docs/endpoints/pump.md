# Pump Cortex

Every pump.fun bonding-curve trade since 2026-09-11, recorded live — 44M+ trades, 450k+ launches.

9 tools · MCP server `https://augur-trade.com/hub/mcp/pump`

| Tool | What it does | Price |
|---|---|---|
| [`pump_pulse`](#pump_pulse) | Live pump.fun heartbeat: trades/min, launches, graduations, graduation rate, hottest tokens in the last 15 min. | free |
| [`pump_history`](#pump_history) | pump.fun over time: launches, graduations, graduation rate, trades, SOL volume and unique wallets per day or hour since 2026-09-11 — with a compare window. | free |
| [`pump_launches`](#pump_launches) | The newest pump.fun tokens with dev buy, early buyers/volume, curve progress, market cap and creator launch count. | $0.002 |
| [`pump_token`](#pump_token) | Full bonding-curve forensics for one pump.fun mint: flow, dev buys/sells, launch snipers, top curve holders, peak, graduation, red flags. | $0.01 |
| [`pump_wallet`](#pump_wallet) | Any wallet's pump.fun trading record: realized PnL, win rate, hold time, frequency (bot or human), tokens it launched. | $0.01 |
| [`pump_dev`](#pump_dev) | A creator wallet's launch history: launches, graduation rate, launch cadence, how fast the dev sells, verdict. | $0.01 |
| [`pump_odds`](#pump_odds) | Probability a pump.fun launch graduates, from how comparable launches in our tape actually ended — with the lift over the ~3% base rate. | $0.01 |
| [`smart_money`](#smart_money) | The pump.fun wallets with the best realized PnL in the last 24 h — and the tokens those wallets are buying right now. | $0.02 |
| [`copy_backtest`](#copy_backtest) | Would copying this wallet have made money? Replays its pump.fun entries and exits 0–25 slots late on the recorded curve and shows where the edge dies. | $0.03 |

---

### `pump_pulse`

**pump.fun market pulse** · free

Live pump.fun heartbeat: trades/min, launches, graduations, graduation rate, hottest tokens in the last 15 min.

Computed from our own live recording of every pump.fun bonding-curve trade. Use it to decide whether the launch market is hot or dead before scanning individual tokens.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/pump_pulse` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `pump_pulse` |
| Price | free |

**Arguments**

_No arguments: send `{}`._

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/pump_pulse \
  -H 'Content-Type: application/json' \
  -d '{}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.pumpPulse();
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.pump_pulse()['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "pump_pulse", "arguments": {}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "pump_pulse",
 "ms": 781,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "as_of": "2026-10-17T04:22:37.000Z",
  "sol_usd": 104.57,
  "trades_per_min": 2338,
  "last_hour": {
   "trades": 139286,
   "sol_volume": 28008.7895,
   "unique_wallets": 11747,
   "active_tokens": 3084,
   "launches": 1547,
   "graduations": 40
  },
  "last_24h": {
   "launches": 39656,
   "graduations": 839,
   "graduation_rate_pct": 2.12
  },
  "hottest_15m": [
   {
    "mint": "BBaunKJdi2W5rDmB9yiEw8Y6yXqHbTEAYSSGDbDVeNGc",
    "symbol": "P-256",
    "name": "NIST P-256",
    "buy_sol": 258.7012,
    "sell_sol": 173.6958,
    "net_sol": 85.0054,
    "wallets": 407,
    "trades": 996
   },
   {
    "mint": "CGvEnRk49677q7tFZPU1hTUbHLeFVF8AbWMJypJupump",
    "symbol": "TKNZ",
    "name": "Tokenz",
    "buy_sol": 227.9732,
    "sell_sol": 225.0369,
    "net_sol": 2.9363,
    "wallets": 379,
    "trades": 2758
   },
   {
    "mint": "9vsxEPf1AEaq2wxwrcXDzzHZvUW847HuKt3ka7XYpump",
    "symbol": "Beaver",
    "name": "Justin Beaver",
    "buy_sol": 198.8979,
    "sell_sol": 155.4935,
    "net_sol": 43.4044,
    "wallets": 404,
    "trades": 903
   },
   "… 5 more"
  ],
  "recent_graduations": [
   {
    "mint": "ABmp7kvhMFXEUvjq9cybBPPbrju8uv8GTQPCDbvLpump",
    "symbol": "GUILD",
    "name": "Guildhall",
    "graduated_at": "2026-10-17T04:19:25.000Z"
   },
   {
    "mint": "BBaunKJdi2W5rDmB9yiEw8Y6yXqHbTEAYSSGDbDVeNGc",
    "symbol": "P-256",
    "name": "NIST P-256",
    "graduated_at": "2026-10-17T04:18:06.000Z"
   },
   {
    "mint": "9vsxEPf1AEaq2wxwrcXDzzHZvUW847HuKt3ka7XYpump",
    "symbol": "Beaver",
    "name": "Justin Beaver",
    "graduated_at": "2026-10-17T04:16:04.000Z"
   },
   "… 2 more"
  ],
  "coverage": "every pump.fun bonding-curve trade since 2026-09-11, recorded live"
 }
}
```

</details>

---

### `pump_history`

**pump.fun history** · free

pump.fun over time: launches, graduations, graduation rate, trades, SOL volume and unique wallets per day or hour since 2026-09-11 — with a compare window.

The same tape as pump_pulse, sliced into UTC days or hours so an agent can compare the market over time instead of reading one snapshot. Pass compare_from/compare_to to get a second window and the per-period change (e.g. this week vs last week). Closed periods are precomputed from our own live recording of every bonding-curve trade; the open period is marked partial. Also reports the share of trades made by pump.fun's own mayhem agent, so it can be separated from real demand.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/pump_history` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `pump_history` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `granularity` | string |  | Bucket size: "day" or "hour". Default "day". (default `"day"`) |
| `from` | string |  | UTC start, e.g. 2026-09-18 or 2026-09-18T06 (default: 14 days / 48 hours back) |
| `to` | string |  | UTC end, inclusive (default: now) |
| `compare_from` | string |  | start of a second window to compare against |
| `compare_to` | string |  | end of the comparison window, inclusive |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/pump_history \
  -H 'Content-Type: application/json' \
  -d '{"granularity": "day", "from": "2026-09-19", "to": "2026-09-25", "compare_from": "2026-09-12", "compare_to": "2026-09-18"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.pumpHistory({"granularity": "day", "from": "2026-09-19", "to": "2026-09-25", "compare_from": "2026-09-12", "compare_to": "2026-09-18"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.pump_history(granularity='day', from_='2026-09-19', to='2026-09-25', compare_from='2026-09-12', compare_to='2026-09-18')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "pump_history", "arguments": {"granularity": "day", "from": "2026-09-19", "to": "2026-09-25", "compare_from": "2026-09-12", "compare_to": "2026-09-18"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "pump_history",
 "ms": 4,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "granularity": "day",
  "timezone": "UTC",
  "rows": [
   {
    "period": "2026-09-19",
    "launches": 32004,
    "graduations": 1138,
    "graduation_rate_pct": 3.56,
    "trades": 3282900,
    "buy_share_pct": 52.9,
    "sol_volume": 920368.1196,
    "unique_wallets": 163457,
    "active_tokens": 45918,
    "mayhem_agent_trade_pct": 18.7
   },
   {
    "period": "2026-09-20",
    "launches": 30736,
    "graduations": 1122,
    "graduation_rate_pct": 3.65,
    "trades": 2933093,
    "buy_share_pct": 52.9,
    "sol_volume": 893299.0869,
    "unique_wallets": 108314,
    "active_tokens": 49031,
    "mayhem_agent_trade_pct": 19.1
   },
   {
    "period": "2026-09-21",
    "launches": 34759,
    "graduations": 1159,
    "graduation_rate_pct": 3.33,
    "trades": 3447391,
    "buy_share_pct": 52.5,
    "sol_volume": 1043671.7206,
    "unique_wallets": 178648,
    "active_tokens": 52323,
    "mayhem_agent_trade_pct": 16.6
   },
   "… 4 more"
  ],
  "summary": {
   "periods": 7,
   "from": "2026-09-19",
   "to": "2026-09-25",
   "launches": 234285,
   "graduations": 7745,
   "graduation_rate_pct": 3.31,
   "trades": 23766139,
   "sol_volume": 6926397.7,
   "avg_unique_wallets_per_day": 165006
  },
  "definitions": {
   "graduation_rate_pct": "graduations in the period / launches in the period (same definition as pump_pulse); not a per-launch cohort rate",
   "mayhem_agent_trade_pct": "share of trades by pump.fun's own fee-free mayhem agent; subtract it to see human/bot demand",
   "partial": "the period is still open; numbers will grow",
   "unique_wallets": "distinct wallets that traded in the period; null for a day still in progress"
  },
  "coverage": "every pump.fun bonding-curve trade since 2026-09-11T07:21Z, recorded live by our own watcher",
  "compare": {
   "against": {
    "periods": 7,
    "from": "2026-09-12",
    "to": "2026-09-18",
    "launches": 227188,
    "graduations": 7828,
    "graduation_rate_pct": 3.45,
    "trades": 21985288,
    "sol_volume": 5899347.44,
    "avg_unique_wallets_per_day": 138250
   },
   "change_pct_per_period": {
    "launches": 3.1,
    "graduations": -1.1,
    "trades": 8.1,
    "sol_volume": 17.4
   },
   "graduation_rate_change_pts": -0.14,
   "note": "changes are per day, so windows of different length compare fairly"
  }
 }
}
```

</details>

---

### `pump_launches`

**Newest pump.fun launches** · $0.002 · 10 free calls/day

The newest pump.fun tokens with dev buy, early buyers/volume, curve progress, market cap and creator launch count.

Returns up to 50 of the most recent launches (seconds old) with the first-N-seconds flow already aggregated, so an agent can shortlist without replaying the chain.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/pump_launches` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `pump_launches` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `limit` | integer |  | How many of the newest launches to return. Range 1-50. Default 20. (default `20`, range 1–50) |
| `window_s` | integer |  | early-flow window after creation. Range 30-3600. Default 300. (default `300`, range 30–3600) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/pump_launches \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"limit": 10, "window_s": 120}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.pumpLaunches({"limit": 10, "window_s": 120});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.pump_launches(limit=10, window_s=120)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "pump_launches", "arguments": {"limit": 10, "window_s": 120}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "pump_launches",
 "ms": 65,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "window_s": 120,
  "launches": [
   {
    "mint": "DQeq99cTrieceHucb7SkRtHwFXUYnQQ2WBhdwaMgpump",
    "symbol": "DEX PAID OG",
    "name": "SeedCoin OG 9 HOUR",
    "creator": "CL1aqjtvwaQz6TZBf9SJ6XVMN2GRVKSYW1Coi1gENC4W",
    "created_at": "2026-10-17T04:22:35.000Z",
    "age_s": 3,
    "mayhem": false,
    "token_program": "token-2022",
    "dev_buy_sol": null,
    "dev_sold_sol": null,
    "early": {
     "trades": 0,
     "unique_buyers": 0,
     "buy_sol": null,
     "sell_sol": null
    },
    "curve_progress_pct": 0,
    "mcap_sol": 27.96,
    "mcap_usd": 2924,
    "creator_launches": 10
   },
   {
    "mint": "8sKZ4ixqTyroZKhvgYZXAg7RwswZTHgknoy2oQKwpump",
    "symbol": "DEX PAID OG",
    "name": "SeedCoin OG 9 HOUR",
    "creator": "CL1aqjtvwaQz6TZBf9SJ6XVMN2GRVKSYW1Coi1gENC4W",
    "created_at": "2026-10-17T04:22:35.000Z",
    "age_s": 3,
    "mayhem": false,
    "token_program": "token-2022",
    "dev_buy_sol": null,
    "dev_sold_sol": null,
    "early": {
     "trades": 0,
     "unique_buyers": 0,
     "buy_sol": null,
     "sell_sol": null
    },
    "curve_progress_pct": 0,
    "mcap_sol": 27.96,
    "mcap_usd": 2924,
    "creator_launches": 10
   },
   {
    "mint": "B74gwfkwezhjhd4csC7ywh6fVPseSQayFuT37TkGpump",
    "symbol": "marumaflow",
    "name": "marumaflow",
    "creator": "29cWNiWFwHNvjHKksJexvABdWL7WBsknEd3reByLeLbP",
    "created_at": "2026-10-17T04:22:32.000Z",
    "age_s": 6,
    "mayhem": false,
    "token_program": "token-2022",
    "dev_buy_sol": 0.5698,
    "dev_sold_sol": 0.5882,
    "early": {
     "trades": 3,
     "unique_buyers": 2,
     "buy_sol": 1.0636,
     "sell_sol": 0.5882
    },
    "curve_progress_pct": 2.11,
    "mcap_sol": 28.85,
    "mcap_usd": 3017,
    "creator_launches": 1
   },
   "… 7 more"
  ]
 }
}
```

</details>

---

### `pump_token`

**pump.fun token forensics** · $0.01 · 10 free calls/day

Full bonding-curve forensics for one pump.fun mint: flow, dev buys/sells, launch snipers, top curve holders, peak, graduation, red flags.

Aggregates every recorded curve trade of the token: unique wallets, buy/sell SOL, first-60-second flow, whether the dev sold out, non-dev wallets that bought in the launch slots (bundles), top net holders on the curve, peak market cap and post-graduation liquidity.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/pump_token` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `pump_token` |
| Price | $0.01 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `mint` | string | yes | pump.fun token mint. Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/pump_token \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.pumpToken({"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.pump_token(mint='2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "pump_token", "arguments": {"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "pump_token",
 "ms": 296,
 "billing": {
  "mode": "credits",
  "usd": 0.01
 },
 "data": {
  "found": true,
  "mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump",
  "symbol": "genny",
  "name": "this is genny",
  "creator": "4bBUYn34ddvQ32vg8XdbZvEYjk6L6NG6Ne2GwpGXCKTS",
  "created_at": "2026-09-25T02:51:11.000Z",
  "mayhem": false,
  "token_program": "token-2022",
  "socials": null,
  "curve": {
   "progress_pct": 0.67,
   "price_sol": null,
   "real_sol_in_curve": 0,
   "graduated": false,
   "graduated_at": null,
   "mcap_sol": null,
   "mcap_usd": null,
   "peak": {
    "mcap_sol": null,
    "mcap_usd": null
   }
  },
  "flow": {
   "trades": 950,
   "buys": 517,
   "sells": 433,
   "unique_wallets": 336,
   "buy_sol": 7531.3243,
   "sell_sol": 7525.8398,
   "net_sol": 5.4845,
   "first_trade": "2026-09-25T02:51:11.000Z",
   "last_trade": "2026-10-03T19:54:51.000Z"
  },
  "first_60s": {
   "trades": 48,
   "unique_buyers": 29,
   "buy_sol": 812.049,
   "sell_sol": 468.4895
  },
  "dev": {
   "bought_sol": 0,
   "sold_sol": 0,
   "holds_pct": 0,
   "launches": 1,
   "graduated": 0
  },
  "launch_snipers": {
   "wallets": 7,
   "bought_sol": 347.5853,
   "still_hold_pct": 0
  },
  "top_curve_holders": [
   {
    "wallet": "HKtXuWMgbDVdWNQ7aEdNJZf1WzqVX8fAmVjzHeA7mxbo",
    "pct": 0.91
   },
   {
    "wallet": "GSLTKaAezLjoP1yxpoGsBRMUdz49A7FCseLLWUBvjztN",
    "pct": 0.53
   },
   {
    "wallet": "6DqwStHBhuxWGutooviZUgVDhT3F4Dy5pAiP2YErRCEe",
    "pct": 0.43
   },
   "… 7 more"
  ],
  "post_graduation": null,
  "flags": [
   "950 of 950 trades use a curve layout we cannot decode: SOL amounts and PnL for this token are unreliable",
   "7 non-dev wallets bought within 2 slots of launch (bundle/sniper pattern)"
  ],
  "note": "curve holders = net bought on the bonding curve; wallet-to-wallet transfers and post-graduation DEX trades are not included",
  "swap_url": "https://augur-trade.com/swap/?mint=2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump&src=synapse"
 }
}
```

</details>

---

### `pump_wallet`

**pump.fun wallet profile** · $0.01 · 10 free calls/day

Any wallet's pump.fun trading record: realized PnL, win rate, hold time, frequency (bot or human), tokens it launched.

Analyses up to the last 20,000 curve trades of the wallet. Use it to judge whether a wallet is smart money, a sniper bot, a serial dumper or a dev.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/pump_wallet` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `pump_wallet` |
| Price | $0.01 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `wallet` | string | yes | wallet address. Base58 Solana address, 32-44 chars. |
| `limit` | integer |  | How many of the wallet's most recent recorded trades to analyse. Range 100-20000. Default 20000. (default `20000`, range 100–20000) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/pump_wallet \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"wallet": "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.pumpWallet({"wallet": "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.pump_wallet(wallet='BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "pump_wallet", "arguments": {"wallet": "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "pump_wallet",
 "ms": 130,
 "billing": {
  "mode": "credits",
  "usd": 0.01
 },
 "data": {
  "found": true,
  "wallet": "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s",
  "label": "pump.fun mayhem agent (fee-free, ~25% of all curve trades)",
  "window": {
   "trades_analyzed": 20000,
   "truncated": true,
   "from": "2026-10-17T03:48:26.000Z",
   "to": "2026-10-17T04:22:35.000Z"
  },
  "activity": {
   "buys": 7999,
   "sells": 8041,
   "tokens_traded": 225,
   "unpriced_tokens": 35,
   "buy_sol": 305.687,
   "sell_sol": 326.4134,
   "avg_buy_sol": 0.0382,
   "trades_per_day": 20000
  },
  "closed_positions": {
   "count": 134,
   "win_rate_pct": 96.3,
   "realized_pnl_sol": 39.0863,
   "median_hold_s": 49,
   "best": 2.9644,
   "worst": -0.5652
  },
  "classification": "bot-like (very high frequency)",
  "created_tokens": {
   "count": 0,
   "graduated": 0,
   "recent": []
  },
  "recent_tokens": [
   {
    "mint": "8HW8qDA6gfsSEdmvN1mHTSXTPa2SJj7pxUgFmfbGpump",
    "symbol": "100001",
    "name": "100000",
    "bought_sol": 2.17,
    "sold_sol": 2.3564,
    "pnl_sol": null,
    "status": "holding",
    "last_trade": "2026-10-17T04:22:35.000Z"
   },
   {
    "mint": "46YXMeB6XrJ6xncKKMbwPmh4ou3v3KVPKemymxWopump",
    "symbol": "SACK",
    "name": "Sack",
    "bought_sol": 0.0832,
    "sold_sol": 0.2495,
    "pnl_sol": 0.1663,
    "status": "closed",
    "last_trade": "2026-10-17T04:22:35.000Z"
   },
   {
    "mint": "5jxxS5NWY9cfis8gHYcUahvv8Gw8PA2TSAiTKFXgpump",
    "symbol": "PEBBLE",
    "name": "PAILEY",
    "bought_sol": 4.9963,
    "sold_sol": 4.9977,
    "pnl_sol": null,
    "status": "holding",
    "last_trade": "2026-10-17T04:22:35.000Z"
   },
   "… 7 more"
  ],
  "note": "curve trades only (pump.fun bonding curve); fees and DEX trades after graduation are not included"
 }
}
```

</details>

---

### `pump_dev`

**pump.fun dev track record** · $0.01 · 10 free calls/day

A creator wallet's launch history: launches, graduation rate, launch cadence, how fast the dev sells, verdict.

Looks up every token the wallet created since recording began and replays the dev's own trades on its 15 most recent launches.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/pump_dev` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `pump_dev` |
| Price | $0.01 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `creator` | string | yes | creator (dev) wallet. Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/pump_dev \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"creator": "AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.pumpDev({"creator": "AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.pump_dev(creator='AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "pump_dev", "arguments": {"creator": "AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "pump_dev",
 "ms": 225,
 "billing": {
  "mode": "credits",
  "usd": 0.01
 },
 "data": {
  "found": true,
  "creator": "AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo",
  "launches": 518,
  "graduated": 11,
  "graduation_rate_pct": 2.12,
  "launches_last_24h": 0,
  "median_gap_between_launches_s": 47,
  "first_launch": "2026-09-18T00:44:49.000Z",
  "last_launch": "2026-10-10T22:45:07.000Z",
  "verdict": [
   "serial launcher",
   "usually sells within 5 minutes of launch"
  ],
  "recent_launches": [
   {
    "mint": "9KfDgkrJKD7rnBZ3XZMb287szNx5aqneECRuURW9pump",
    "symbol": "Burn",
    "created_at": "2026-10-10T22:45:07.000Z",
    "graduated": false,
    "trades": 68,
    "unique_wallets": 9,
    "volume_sol": 1.4254,
    "peak_mcap_sol": 28.1,
    "dev_bought_sol": 0.2441,
    "dev_sold_sol": 0.1062,
    "dev_first_sell_after_s": 45
   },
   {
    "mint": "4s7jxpks7RS68zUdN7cft8mt9EKLHpihGCYks9UZpump",
    "symbol": "Burn",
    "created_at": "2026-10-10T22:44:40.000Z",
    "graduated": false,
    "trades": 26,
    "unique_wallets": 3,
    "volume_sol": 0.8993,
    "peak_mcap_sol": 28.1,
    "dev_bought_sol": 0.1582,
    "dev_sold_sol": 0.0832,
    "dev_first_sell_after_s": 15
   },
   {
    "mint": "9JmSxLpkDdc5GoYazuxF29RKPuT3zhnpgb6viSuPpump",
    "symbol": "Burn",
    "created_at": "2026-10-10T22:44:06.000Z",
    "graduated": false,
    "trades": 32,
    "unique_wallets": 4,
    "volume_sol": 0.8838,
    "peak_mcap_sol": 44.9,
    "dev_bought_sol": 0.2569,
    "dev_sold_sol": 0.2099,
    "dev_first_sell_after_s": 19
   },
   "… 12 more"
  ],
  "baseline": "across all pump.fun launches, ~1% graduate"
 }
}
```

</details>

---

### `pump_odds`

**Graduation odds** · $0.01 · 10 free calls/day

Probability a pump.fun launch graduates, from how comparable launches in our tape actually ended — with the lift over the ~3% base rate.

Buckets the launch's first 60 seconds (unique buyers, buy SOL, dev buy) and returns the empirical graduation rate of thousands of comparable recent launches whose outcome is known, shrunk toward coarser buckets when samples are thin. Rebuilt every 6 hours.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/pump_odds` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `pump_odds` |
| Price | $0.01 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `mint` | string | yes | pump.fun token mint. Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/pump_odds \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.pumpOdds({"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.pump_odds(mint='2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "pump_odds", "arguments": {"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "pump_odds",
 "ms": 3,
 "billing": {
  "mode": "credits",
  "usd": 0.01
 },
 "data": {
  "found": true,
  "mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump",
  "symbol": "genny",
  "created_at": "2026-09-25T02:51:11.000Z",
  "age_s": 1906288,
  "status": "stalled (6 h+ old, under 50% curve)",
  "curve_progress_pct": 0.67,
  "launch_minute": {
   "unique_buyers": 29,
   "buy_sol": 812.049,
   "dev_buy_sol": 0
  },
  "graduation": {
   "probability_pct": 3.86,
   "base_rate_pct": 2.21,
   "lift": 1.75,
   "comparable_launches": 42,
   "cell": "b5s5d0",
   "bucket": {
    "unique_buyers_60s": "21–41",
    "buy_sol_60s": "40+",
    "dev_buy_sol": "0–0.01"
   }
  },
  "model": {
   "built_at": "2026-10-16T19:53:52.239Z",
   "sample": 15000,
   "base_rate_pct": 2.21,
   "window": "launches 6 h – 7 d old"
  },
  "method": "empirical: share of comparable launches (same first-60-second buyers / buy SOL / dev buy buckets) that graduated, shrunk toward coarser buckets when samples are thin. Launch-minute signal only — later flow is in pump_token.",
  "swap_url": "https://augur-trade.com/swap/?mint=2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump&src=synapse"
 }
}
```

</details>

---

### `smart_money`

**Smart money on pump.fun** · $0.02 · 10 free calls/day

The pump.fun wallets with the best realized PnL in the last 24 h — and the tokens those wallets are buying right now.

Leaderboard of wallets by realized profit on fully-closed curve positions (min 8 closed, rebuilt every 30 min), sortable by PnL, win rate or ROI, plus a live feed of what the top 50 bought in the last N minutes, ranked by how many of them piled in.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/smart_money` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `smart_money` |
| Price | $0.02 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `limit` | integer |  | How many top wallets to return. Range 1-50. Default 20. (default `20`, range 1–50) |
| `window_min` | integer |  | look-back for buying_now. Range 1-120. Default 15. (default `15`, range 1–120) |
| `sort` | string |  | Rank by realized PnL in SOL ("pnl"), win rate ("win_rate") or return on SOL spent ("roi"). Default "pnl". (default `"pnl"`) |
| `exclude_bots` | boolean |  | drop sub-20-second and high-frequency wallets. Default false. (default `false`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/smart_money \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"limit": 10, "window_min": 15, "sort": "pnl", "exclude_bots": true}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.smartMoney({"limit": 10, "window_min": 15, "sort": "pnl", "exclude_bots": true});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.smart_money(limit=10, window_min=15, sort='pnl', exclude_bots=True)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "smart_money", "arguments": {"limit": 10, "window_min": 15, "sort": "pnl", "exclude_bots": true}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "smart_money",
 "ms": 41,
 "billing": {
  "mode": "credits",
  "usd": 0.02
 },
 "data": {
  "leaderboard_built_at": "2026-10-17T03:58:27.053Z",
  "window": "last 24 h of curve trades",
  "sort": "pnl",
  "wallets": [
   {
    "wallet": "5gxzZhVpoTq715PyPFy6G9fwVkssWcFEbWCMF5ZGtzKx",
    "closed": 91,
    "pnl_sol": 143.714,
    "win_rate_pct": 97.8,
    "volume_sol": 309.58,
    "avg_hold_s": 28,
    "roi_pct": 46.4,
    "style": "scalper"
   },
   {
    "wallet": "GTuctg8YR5oH1jdAaGMvkb51MSWPHE9nLCc1zUrwss6L",
    "closed": 115,
    "pnl_sol": 126.833,
    "win_rate_pct": 44.3,
    "volume_sol": 581.1,
    "avg_hold_s": 255,
    "roi_pct": 21.8,
    "style": "scalper"
   },
   {
    "wallet": "G2B45WGoTyissw6hH1bqKFjERs9wnfFpxRaeueUp8krL",
    "closed": 14,
    "pnl_sol": 106.358,
    "win_rate_pct": 28.6,
    "volume_sol": 16.78,
    "avg_hold_s": 3711,
    "roi_pct": 633.7,
    "style": "discretionary"
   },
   "… 7 more"
  ],
  "buying_now": {
   "window_min": 15,
   "among_top": 50,
   "tokens": [
    {
     "mint": "2minfzQg5GNPUzWXorvaXmqMWYEi9Jdstpjo3WzJpump",
     "symbol": "TRUMP",
     "name": "The Meme Messiah",
     "smart_wallets": 7,
     "buy_sol": 16.0485,
     "last_buy": "2026-10-17T04:15:55.000Z"
    },
    {
     "mint": "5AJx7XY37DM12hnseAsADWvxC3BnBXFMntenJ2xP6C2t",
     "symbol": "SEED",
     "name": "seedcoin",
     "smart_wallets": 5,
     "buy_sol": 7.1816,
     "last_buy": "2026-10-17T04:20:20.000Z"
    },
    {
     "mint": "BrEZbQhPpdYLp7TMmLivEH8mQCMACUd1taAMwcZ4pump",
     "symbol": "SEED",
     "name": "seedcoin",
     "smart_wallets": 4,
     "buy_sol": 6.7726,
     "last_buy": "2026-10-17T04:22:32.000Z"
    },
    "… 12 more"
   ]
  },
  "note": "realized PnL on fully-closed pump.fun curve positions (sold ≥95% of what was bought); the fee-free pump.fun mayhem agent is excluded. High PnL can also mean a bot or insider — check pump_wallet before copying anyone."
 }
}
```

</details>

---

### `copy_backtest`

**Copy-trade backtest** · $0.03 · 10 free calls/day

Would copying this wallet have made money? Replays its pump.fun entries and exits 0–25 slots late on the recorded curve and shows where the edge dies.

Takes the wallet's pump.fun positions over the last 1–14 days and simulates a copier that buys the same token and sells when the leader sells, arriving 0, 1, 2, 5, 10 or 25 slots (0–10 s) late. Fills use the bonding-curve reserves our tape recorded at that moment, including curve fees and the copy's own price impact. Returns PnL, win rate and ROI per latency, the leader's own median ROI for contrast, and a verdict: copyable, latency-sensitive (edge gone by N slots), or not copyable. A wallet that looks great on its own PnL often loses money for anyone who follows it.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/copy_backtest` |
| MCP | `https://augur-trade.com/hub/mcp/pump` → tool `copy_backtest` |
| Price | $0.03 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `wallet` | string | yes | leader wallet to copy. Base58 Solana address, 32-44 chars. |
| `days` | integer |  | How many days of the wallet's history to replay. Range 1-14. Default 3. (default `3`, range 1–14) |
| `size_sol` | number |  | SOL per copied entry. Range 0.01-10. Default 0.1. (default `0.1`, range 0.01–10) |
| `exit` | string |  | sell on the leader's first sell, or once it has sold 90%. Default "first_sell". (default `"first_sell"`) |
| `max_positions` | integer |  | most recent positions to replay. Range 10-300. Default 150. (default `150`, range 10–300) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/copy_backtest \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"wallet": "HNhuE4Y3RNCx5tPBkNsCTWKT14542NxnGi9aXEyN1x8E", "days": 3, "size_sol": 0.1}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.copyBacktest({"wallet": "HNhuE4Y3RNCx5tPBkNsCTWKT14542NxnGi9aXEyN1x8E", "days": 3, "size_sol": 0.1});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.copy_backtest(wallet='HNhuE4Y3RNCx5tPBkNsCTWKT14542NxnGi9aXEyN1x8E', days=3, size_sol=0.1)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "copy_backtest", "arguments": {"wallet": "HNhuE4Y3RNCx5tPBkNsCTWKT14542NxnGi9aXEyN1x8E", "days": 3, "size_sol": 0.1}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "copy_backtest",
 "ms": 800,
 "billing": {
  "mode": "credits",
  "usd": 0.03
 },
 "data": {
  "found": true,
  "wallet": "HNhuE4Y3RNCx5tPBkNsCTWKT14542NxnGi9aXEyN1x8E",
  "setup": {
   "window_days": 3,
   "size_sol": 0.1,
   "exit_rule": "sell everything on the leader's first sell",
   "positions_considered": 18,
   "unpriceable": 6,
   "from": "2026-10-14T04:54:09.000Z",
   "fees": "pump.fun curve fee on both legs"
  },
  "by_lag": [
   {
    "lag_slots": 0,
    "approx_ms": 0,
    "copied": 12,
    "missed_after_graduation": 0,
    "win_rate_pct": 41.7,
    "pnl_sol": -0.1151,
    "roi_pct": -9.6,
    "median_roi_pct": -15.9,
    "still_open": 0,
    "graduated": 0
   },
   {
    "lag_slots": 1,
    "approx_ms": 400,
    "copied": 12,
    "missed_after_graduation": 0,
    "win_rate_pct": 16.7,
    "pnl_sol": -0.1452,
    "roi_pct": -12.1,
    "median_roi_pct": -11.6,
    "still_open": 0,
    "graduated": 0
   },
   {
    "lag_slots": 2,
    "approx_ms": 800,
    "copied": 12,
    "missed_after_graduation": 0,
    "win_rate_pct": 16.7,
    "pnl_sol": -0.1143,
    "roi_pct": -9.5,
    "median_roi_pct": -8.7,
    "still_open": 0,
    "graduated": 0
   },
   "… 3 more"
  ],
  "verdict": "not copyable: loses money even copied in the same slot",
  "leader_median_roi_pct": 11.7,
  "fast_flips_pct": 16.7,
  "biggest_at_2_slots": [
   {
    "mint": "BESLk8u8aHErPu95dnrv3ZKEz2coL7yHu3JKehyLpump",
    "symbol": "cigcat",
    "name": "cat wif cigarette",
    "pnl_sol_at_2_slots": -0.0267,
    "roi_pct": -26.7,
    "hold_s": 4,
    "status": "closed"
   },
   {
    "mint": "BJpBqM5SCFkqiEFmJzY5JtXbdJouRKSdTatk3QFypump",
    "symbol": "Najmeh",
    "name": "Justice for Najmeh Amini",
    "pnl_sol_at_2_slots": -0.0184,
    "roi_pct": -18.4,
    "hold_s": 4,
    "status": "closed"
   },
   {
    "mint": "CbNZ4sPWLqDxJ6Xo7c6ThTMoNByL8zT5av4KoEDcpump",
    "symbol": "Epstein",
    "name": "Jeffrey Epstein",
    "pnl_sol_at_2_slots": -0.0175,
    "roi_pct": -17.5,
    "hold_s": 2,
    "status": "closed"
   },
   "… 5 more"
  ],
  "note": "Fills are simulated on the bonding-curve reserves our tape recorded at the moment a copier would land (1 slot ≈ 400 ms), including our own price impact on entry. Graduated tokens are valued at the end of the curve; open positions at the last curve price. Past copy results, not a …"
 }
}
```

</details>

---

[← All endpoints](README.md)
