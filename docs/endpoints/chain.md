# Chain Cortex

Every chain at once: prices, DeFi TVL and yields, stablecoins, perps funding, order books, gas and EVM contracts.

17 tools · MCP server `https://augur-trade.com/hub/mcp/chain`

| Tool | What it does | Price |
|---|---|---|
| [`crypto_price`](#crypto_price) | Live USD price and 24 h change for up to 30 crypto assets on any chain — by symbol, CoinGecko id, contract or mint address. | free |
| [`price_history`](#price_history) | Historical USD prices for any crypto asset (hourly or daily, up to 365 days) with return, high/low, max drawdown and annualized volatility. | $0.002 |
| [`defi_rankings`](#defi_rankings) | Top DeFi protocols by TVL (or 1 d / 7 d TVL change), filterable by chain and category — lending, DEX, liquid staking, bridges, perps… | free |
| [`defi_protocol`](#defi_protocol) | One DeFi protocol in depth: TVL by chain, TVL trend, fees and revenue (24 h/7 d/30 d), market cap, audits, links. | $0.002 |
| [`chain_tvl`](#chain_tvl) | Total value locked on every blockchain right now, ranked — or one chain's daily TVL history. | free |
| [`yield_pools`](#yield_pools) | Search ~19,000 DeFi yield pools across all chains: filter by chain, protocol, token, stablecoin-only, min TVL; sort by APY or TVL. Base vs reward APY, 30 d mean, IL risk. | $0.003 |
| [`stablecoins`](#stablecoins) | Every stablecoin's circulating supply, 1 d/7 d/30 d supply change, current price and peg deviation — spot depegs and mint/burn flows. | free |
| [`dex_volumes`](#dex_volumes) | DEX trading volume in the last 24 h / 7 d / 30 d — all chains or one — with the top DEXes and their share and change. | free |
| [`fees_revenue`](#fees_revenue) | Which protocols and chains earn the most: fees or revenue over 24 h / 7 d / 30 d, filterable by chain — the cash-flow view of crypto. | $0.002 |
| [`gas_now`](#gas_now) | What a transaction costs right now on 17 EVM chains, Solana and Bitcoin — gwei/priority fee and the USD cost of a transfer and a swap on each. | free |
| [`ens_resolve`](#ens_resolve) | ENS name → address and address → primary name, with avatar, twitter, github, url and email text records. | free |
| [`cex_ticker`](#cex_ticker) | Live bid/ask/last, 24 h change, volume and range for a pair on Kraken, Coinbase and OKX side by side — with the cross-venue spread. | $0.001 |
| [`orderbook_depth`](#orderbook_depth) | How much size a market can take: bid/ask depth within ±0.1/0.5/1/2/5%, spread, and the slippage of a $10k/$100k/$1M market order on Kraken, Coinbase or OKX. | $0.003 |
| [`funding_rates`](#funding_rates) | Perpetual funding for a coin on Hyperliquid, OKX and Kraken Futures side by side — per-interval rate and annualized APR — plus open interest and mark price. | $0.003 |
| [`hyperliquid_markets`](#hyperliquid_markets) | Every Hyperliquid perpetual: mark/oracle price, 24 h change and volume, open interest, funding APR, premium — ranked by volume, OI, funding or movers. | $0.002 |
| [`fear_greed`](#fear_greed) | The Crypto Fear & Greed Index (0–100) now and its history, with the 7 d / 30 d average and how extreme today is. | free |
| [`bitcoin_network`](#bitcoin_network) | Bitcoin right now: fee rates, mempool size, block height, next difficulty adjustment (% and ETA), hashrate. | free |

---

### `crypto_price`

**Crypto prices (any chain)** · free

Live USD price and 24 h change for up to 30 crypto assets on any chain — by symbol, CoinGecko id, contract or mint address.

Resolves each asset (BTC, "coingecko:ethereum", "base:0x…", a bare 0x address with chain, or a Solana mint) and prices it from DefiLlama's aggregated oracle (confidence score included). Symbols resolve against the top 1,000 coins by market cap first, so "USDC" means the real one; ambiguous symbols list the alternatives.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/crypto_price` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `crypto_price` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `assets` | array of string | yes | e.g. ["BTC","ETH","coingecko:solana","base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"]. 0-30 items. |
| `chain` | string (`ethereum`, `base`, `arbitrum`, `optimism`, `polygon`, `bsc`, `avalanche`, `linea`, `blast`, `scroll`, `gnosis`, `sonic`) |  | EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hyperevm, monad. One of "ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanche", "linea", "blast", "scroll", "gnosis", "sonic", "unichain", "mantle", "berachain", "hyperevm", "monad". Default "ethereum". (default `"ethereum"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/crypto_price \
  -H 'Content-Type: application/json' \
  -d '{"assets": ["BTC", "ETH", "SOL", "base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"]}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.cryptoPrice({"assets": ["BTC", "ETH", "SOL", "base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"]});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.crypto_price(assets=['BTC', 'ETH', 'SOL', 'base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'])['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "crypto_price", "arguments": {"assets": ["BTC", "ETH", "SOL", "base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"]}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "crypto_price",
 "ms": 238,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "as_of": "2026-10-17T04:20:52.792Z",
  "source": "DefiLlama coins (aggregated DEX/CEX oracle)",
  "prices": [
   {
    "query": "BTC",
    "id": "coingecko:bitcoin",
    "symbol": "BTC",
    "name": null,
    "usd": 81443.51884332509,
    "change_24h_pct": -0.663,
    "confidence": 0.99,
    "updated": "2026-10-17T04:19:50.000Z"
   },
   {
    "query": "ETH",
    "id": "coingecko:ethereum",
    "symbol": "ETH",
    "name": null,
    "usd": 2423.71838794409,
    "change_24h_pct": -0.641,
    "confidence": 0.99,
    "updated": "2026-10-17T04:19:50.000Z"
   },
   {
    "query": "SOL",
    "id": "coingecko:solana",
    "symbol": "SOL",
    "name": null,
    "usd": 104.60447565894566,
    "change_24h_pct": -0.625,
    "confidence": 0.99,
    "updated": "2026-10-17T04:19:50.000Z"
   },
   "… 1 more"
  ]
 }
}
```

</details>

---

### `price_history`

**Price history + volatility** · $0.002 · 10 free calls/day

Historical USD prices for any crypto asset (hourly or daily, up to 365 days) with return, high/low, max drawdown and annualized volatility.

Same asset resolution as crypto_price. Returns the series plus stats computed from it: total return, high/low with dates, max drawdown, and annualized volatility from log returns.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/price_history` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `price_history` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `asset` | string | yes | symbol, CoinGecko id, chain:address or address |
| `days` | integer |  | How many days back; hourly points up to 90 days, daily beyond. Range 1-365. Default 30. (default `30`, range 1–365) |
| `interval` | string (`hour`, `day`) |  | hourly allowed up to 30 days. One of "hour", "day". Default "day". (default `"day"`) |
| `chain` | string (`ethereum`, `base`, `arbitrum`, `optimism`, `polygon`, `bsc`, `avalanche`, `linea`, `blast`, `scroll`, `gnosis`, `sonic`) |  | EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hyperevm, monad. One of "ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanche", "linea", "blast", "scroll", "gnosis", "sonic", "unichain", "mantle", "berachain", "hyperevm", "monad". Default "ethereum". (default `"ethereum"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/price_history \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"asset": "ETH", "days": 30, "interval": "day"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.priceHistory({"asset": "ETH", "days": 30, "interval": "day"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.price_history(asset='ETH', days=30, interval='day')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "price_history", "arguments": {"asset": "ETH", "days": 30, "interval": "day"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "price_history",
 "ms": 174,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "asset": "ETH",
  "id": "coingecko:ethereum",
  "symbol": "ETH",
  "interval": "day",
  "points": 31,
  "stats": {
   "first_usd": 2428.1058244120964,
   "last_usd": 2423.71838794409,
   "return_pct": -0.181,
   "high": {
    "t": "2026-09-23T04:20:40.000Z",
    "usd": 2777.637065218841
   },
   "low": {
    "t": "2026-10-15T04:20:54.000Z",
    "usd": 2367.339357895017
   },
   "max_drawdown_pct": 14.77,
   "volatility_annualized_pct": 43.99
  },
  "series": [
   {
    "t": "2026-09-17T04:20:40.000Z",
    "usd": 2428.1058244120964
   },
   {
    "t": "2026-09-18T04:20:40.000Z",
    "usd": 2475.1645920108936
   },
   {
    "t": "2026-09-19T04:20:40.000Z",
    "usd": 2621.65583480992
   },
   "… 28 more"
  ]
 }
}
```

</details>

---

### `defi_rankings`

**DeFi protocol rankings** · free

Top DeFi protocols by TVL (or 1 d / 7 d TVL change), filterable by chain and category — lending, DEX, liquid staking, bridges, perps…

From DefiLlama's full protocol list (~6,000 protocols). Each row: TVL, TVL on the requested chain, 1 h/1 d/7 d change, market cap, category, chains, site. Use for "biggest lending protocols on Base" or "fastest growing DEXes this week".

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/defi_rankings` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `defi_rankings` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `chain` | string |  | DefiLlama chain name, e.g. Ethereum, Solana, Base, Arbitrum (optional) |
| `category` | string |  | e.g. Lending, Dexs, Liquid Staking, Bridge, Derivatives, Yield, CDP, RWA (optional) |
| `sort` | string (`tvl`, `change_1d`, `change_7d`) |  | Rank by current TVL or by 1-day / 7-day TVL change. One of "tvl", "change_1d", "change_7d". Default "tvl". (default `"tvl"`) |
| `min_tvl_usd` | number |  | Skip protocols with less TVL than this (USD). Default 1000000. (default `1000000`, range 0–…) |
| `limit` | integer |  | How many protocols to return. Range 1-100. Default 25. (default `25`, range 1–100) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/defi_rankings \
  -H 'Content-Type: application/json' \
  -d '{"chain": "Base", "category": "Lending", "limit": 10}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.defiRankings({"chain": "Base", "category": "Lending", "limit": 10});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.defi_rankings(chain='Base', category='Lending', limit=10)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "defi_rankings", "arguments": {"chain": "Base", "category": "Lending", "limit": 10}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "defi_rankings",
 "ms": 1866,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "source": "DefiLlama",
  "filters": {
   "chain": "Base",
   "category": "Lending",
   "min_tvl_usd": 1000000
  },
  "matched": 11,
  "protocols": [
   {
    "name": "Morpho Blue",
    "slug": "morpho-blue",
    "category": "Lending",
    "tvl_usd": 4404585328,
    "tvl_total_usd": 11015514961,
    "change_1h_pct": -0.03,
    "change_1d_pct": -0.34,
    "change_7d_pct": -1.61,
    "mcap_usd": null,
    "chains": [
     "Ethereum",
     "Base",
     "Robinhood Chain",
     "… 9 more"
    ],
    "url": "https://app.morpho.org",
    "twitter": "Morpho"
   },
   {
    "name": "Aave V3",
    "slug": "aave-v3",
    "category": "Lending",
    "tvl_usd": 550323352,
    "tvl_total_usd": 16917128614,
    "change_1h_pct": -0.03,
    "change_1d_pct": -1.05,
    "change_7d_pct": -2.31,
    "mcap_usd": null,
    "chains": [
     "Ethereum",
     "Base",
     "Arbitrum",
     "… 9 more"
    ],
    "url": "https://aave.com",
    "twitter": "aave"
   },
   {
    "name": "40 Acres",
    "slug": "40-acres",
    "category": "Lending",
    "tvl_usd": 42560466,
    "tvl_total_usd": 49955492,
    "change_1h_pct": 0.94,
    "change_1d_pct": -4.89,
    "change_7d_pct": -0.93,
    "mcap_usd": null,
    "chains": [
     "Base",
     "Optimism",
     "Avalanche"
    ],
    "url": "https://www.40acres.finance/",
    "twitter": "40acres_Finance"
   },
   "… 7 more"
  ]
 }
}
```

</details>

---

### `defi_protocol`

**DeFi protocol profile** · $0.002 · 10 free calls/day

One DeFi protocol in depth: TVL by chain, TVL trend, fees and revenue (24 h/7 d/30 d), market cap, audits, links.

Look up by name or DefiLlama slug ("aave", "Uniswap", "jupiter"). Combines DefiLlama's protocol list with its fees/revenue summaries. Fuzzy name matches return the best match plus close alternatives.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/defi_protocol` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `defi_protocol` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `protocol` | string | yes | name or slug |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/defi_protocol \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"protocol": "aave"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.defiProtocol({"protocol": "aave"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.defi_protocol(protocol='aave')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "defi_protocol", "arguments": {"protocol": "aave"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "defi_protocol",
 "ms": 633,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "found": true,
  "name": "Aave V3",
  "slug": "aave-v3",
  "category": "Lending",
  "description": "Earn interest, borrow assets, and build applications",
  "url": "https://aave.com",
  "twitter": "aave",
  "tvl_usd": 16917128614,
  "change_1h_pct": -0.03,
  "change_1d_pct": -1.05,
  "change_7d_pct": -2.31,
  "mcap_usd": null,
  "token": "AAVE",
  "gecko_id": null,
  "tvl_by_chain": [
   {
    "chain": "Ethereum",
    "tvl_usd": 14032534379
   },
   {
    "chain": "Base",
    "tvl_usd": 550323352
   },
   {
    "chain": "Arbitrum",
    "tvl_usd": 537340113
   },
   "… 18 more"
  ],
  "fees_usd": {
   "24h": 1122548,
   "7d": 8442675,
   "30d": 37321916,
   "all_time": 1870829249
  },
  "revenue_usd": {
   "24h": 136125,
   "7d": 1147466,
   "30d": 4759906,
   "all_time": 249513665
  },
  "audits": 2,
  "audit_links": [
   "https://aave.com/security"
  ],
  "listed_at": "2022-04-01",
  "forked_from": [],
  "alternatives": [
   {
    "name": "Aave V4",
    "slug": "aave-v4",
    "tvl_usd": 653426241
   },
   {
    "name": "Aave Horizon RWA",
    "slug": "aave-horizon-rwa",
    "tvl_usd": 254132159
   },
   {
    "name": "Aave V2",
    "slug": "aave-v2",
    "tvl_usd": 106727954
   },
   "… 2 more"
  ]
 }
}
```

</details>

---

### `chain_tvl`

**Chain TVL** · free

Total value locked on every blockchain right now, ranked — or one chain's daily TVL history.

DefiLlama chain TVL. Without "chain": ranking of all chains with token symbol. With "chain": daily TVL history for up to 365 days plus 7 d / 30 d / 90 d change.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/chain_tvl` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `chain_tvl` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `chain` | string |  | e.g. Solana, Ethereum, Base (optional) |
| `days` | integer |  | Days of daily TVL history (only when a single chain is requested). Range 7-365. Default 90. (default `90`, range 7–365) |
| `limit` | integer |  | How many chains to return in the ranking. Range 1-200. Default 30. (default `30`, range 1–200) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/chain_tvl \
  -H 'Content-Type: application/json' \
  -d '{"chain": "Solana", "days": 30}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.chainTvl({"chain": "Solana", "days": 30});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.chain_tvl(chain='Solana', days=30)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "chain_tvl", "arguments": {"chain": "Solana", "days": 30}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "chain_tvl",
 "ms": 72,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "chain": "Solana",
  "tvl_usd": 5953724396,
  "rank": 3,
  "change_7d_pct": -3.783,
  "change_30d_pct": 2.947,
  "change_90d_pct": 22.169,
  "history": [
   {
    "date": "2026-09-18",
    "tvl_usd": 5871750319
   },
   {
    "date": "2026-09-19",
    "tvl_usd": 6280272394
   },
   {
    "date": "2026-09-20",
    "tvl_usd": 6150861762
   },
   "… 27 more"
  ]
 }
}
```

</details>

---

### `yield_pools`

**DeFi yield finder** · $0.003 · 10 free calls/day

Search ~19,000 DeFi yield pools across all chains: filter by chain, protocol, token, stablecoin-only, min TVL; sort by APY or TVL. Base vs reward APY, 30 d mean, IL risk.

DefiLlama yields data, refreshed every 15 minutes. Shows APY split into base (organic fees/interest) and reward (token emissions), the 30-day mean APY so an agent can spot unsustainable spikes, impermanent-loss risk, exposure (single/multi) and DefiLlama's up/down prediction.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/yield_pools` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `yield_pools` |
| Price | $0.003 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `chain` | string |  | e.g. Ethereum, Solana, Base, Arbitrum |
| `project` | string |  | protocol slug, e.g. aave-v3, kamino-lend, uniswap-v3 |
| `token` | string |  | token symbol that must appear in the pool, e.g. USDC, SOL |
| `stablecoin_only` | boolean |  | true = only pools whose assets are all stablecoins. Default false. (default `false`) |
| `single_exposure_only` | boolean |  | no LP pairs (no impermanent loss) Default false. (default `false`) |
| `min_tvl_usd` | number |  | Skip pools with less TVL than this (USD); raises quality. Default 1000000. (default `1000000`, range 0–…) |
| `max_apy` | number |  | drop absurd APYs above this. Default 1000. (default `1000`, range 1–…) |
| `sort` | string (`apy`, `tvl`, `apy_base`, `apy_30d_mean`) |  | Rank by total APY, TVL, base (non-reward) APY or 30-day mean APY. One of "apy", "tvl", "apy_base", "apy_30d_mean". Default "apy". (default `"apy"`) |
| `limit` | integer |  | How many pools to return. Range 1-50. Default 20. (default `20`, range 1–50) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/yield_pools \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"chain": "Solana", "token": "USDC", "stablecoin_only": true, "min_tvl_usd": 5000000, "sort": "apy", "limit": 10}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.yieldPools({"chain": "Solana", "token": "USDC", "stablecoin_only": true, "min_tvl_usd": 5000000, "sort": "apy", "limit": 10});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.yield_pools(chain='Solana', token='USDC', stablecoin_only=True, min_tvl_usd=5000000, sort='apy', limit=10)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "yield_pools", "arguments": {"chain": "Solana", "token": "USDC", "stablecoin_only": true, "min_tvl_usd": 5000000, "sort": "apy", "limit": 10}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "yield_pools",
 "ms": 831,
 "billing": {
  "mode": "credits",
  "usd": 0.003
 },
 "data": {
  "source": "DefiLlama yields",
  "matched": 21,
  "pools": [
   {
    "pool_id": "0ba9f678-063d-57ec-8afd-bb9a36e55657",
    "project": "kamino-lend",
    "chain": "Solana",
    "symbol": "USDC",
    "pool_meta": "Plume x Re7 USDC",
    "tvl_usd": 6307332,
    "apy_pct": 8.61,
    "apy_base_pct": 3.16,
    "apy_reward_pct": 5.45,
    "apy_30d_mean_pct": 8.61,
    "apy_change_7d": null,
    "stablecoin": true,
    "exposure": "single",
    "il_risk": "no",
    "reward_tokens": [
     "GArhnnDj3GYhmQeApKVXaRv4TQFwhPcs3SNF6FXsTeXq"
    ],
    "outlook": {
     "class": null,
     "probability_pct": null
    },
    "url": "https://defillama.com/yields/pool/0ba9f678-063d-57ec-8afd-bb9a36e55657"
   },
   {
    "pool_id": "6d681636-0c6d-5ad3-b05f-46117f1f02ae",
    "project": "kamino-lend",
    "chain": "Solana",
    "symbol": "USDC",
    "pool_meta": "Kamino Institutional Commodity Yield",
    "tvl_usd": 52612080,
    "apy_pct": 8.29,
    "apy_base_pct": 8.29,
    "apy_reward_pct": null,
    "apy_30d_mean_pct": 8.17,
    "apy_change_7d": null,
    "stablecoin": true,
    "exposure": "single",
    "il_risk": "no",
    "reward_tokens": [],
    "outlook": {
     "class": null,
     "probability_pct": null
    },
    "url": "https://defillama.com/yields/pool/6d681636-0c6d-5ad3-b05f-46117f1f02ae"
   },
   {
    "pool_id": "d783c8df-e2ed-44b4-8317-161ccc1b5f06",
    "project": "jupiter-lend",
    "chain": "Solana",
    "symbol": "USDC",
    "pool_meta": "Earn",
    "tvl_usd": 474883654,
    "apy_pct": 8.21,
    "apy_base_pct": 8.21,
    "apy_reward_pct": null,
    "apy_30d_mean_pct": 5.65,
    "apy_change_7d": 2.69,
    "stablecoin": true,
    "exposure": "single",
    "il_risk": "no",
    "reward_tokens": [],
    "outlook": {
     "class": "Down",
     "probability_pct": 77
    },
    "url": "https://defillama.com/yields/pool/d783c8df-e2ed-44b4-8317-161ccc1b5f06"
   },
   "… 7 more"
  ],
  "note": "APY is annualized from recent data and moves daily; apy_reward depends on emission token prices. Compare apy to apy_30d_mean to spot spikes."
 }
}
```

</details>

---

### `stablecoins`

**Stablecoin supply + peg** · free

Every stablecoin's circulating supply, 1 d/7 d/30 d supply change, current price and peg deviation — spot depegs and mint/burn flows.

DefiLlama stablecoin data across all chains. Filter by symbol or peg type. peg_deviation_pct is measured against the peg (USD, EUR…) using DefiLlama's price.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/stablecoins` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `stablecoins` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `symbol` | string |  | e.g. USDC, USDe, PYUSD (optional) |
| `peg` | string (`any`, `peggedUSD`, `peggedEUR`, `peggedVAR`) |  | Filter by peg currency type. One of "any", "peggedUSD", "peggedEUR", "peggedVAR". Default "any". (default `"any"`) |
| `limit` | integer |  | How many stablecoins to return. Range 1-100. Default 25. (default `25`, range 1–100) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/stablecoins \
  -H 'Content-Type: application/json' \
  -d '{"limit": 10}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.stablecoins({"limit": 10});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.stablecoins(limit=10)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "stablecoins", "arguments": {"limit": 10}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "stablecoins",
 "ms": 126,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "source": "DefiLlama stablecoins",
  "total_usd_pegged": 306041317913,
  "stablecoins": [
   {
    "name": "Tether",
    "symbol": "USDT",
    "peg": "peggedUSD",
    "mechanism": "fiat-backed",
    "circulating": 183376487095,
    "change_1d_pct": -0.047,
    "change_7d_pct": -0.367,
    "change_30d_pct": 0.086,
    "price_usd": 0.9990711773750562,
    "peg_deviation_pct": -0.093,
    "chains": 130,
    "top_chains": [
     "Tron",
     "Ethereum",
     "BSC",
     "… 3 more"
    ]
   },
   {
    "name": "USD Coin",
    "symbol": "USDC",
    "peg": "peggedUSD",
    "mechanism": "fiat-backed",
    "circulating": 72721344987,
    "change_1d_pct": -0.149,
    "change_7d_pct": -0.369,
    "change_30d_pct": -1.45,
    "price_usd": 0.9998035690033927,
    "peg_deviation_pct": -0.02,
    "chains": 157,
    "top_chains": [
     "Ethereum",
     "Solana",
     "Hyperliquid L1",
     "… 3 more"
    ]
   },
   {
    "name": "Sky Dollar",
    "symbol": "USDS",
    "peg": "peggedUSD",
    "mechanism": "crypto-backed",
    "circulating": 7050755350,
    "change_1d_pct": -0.272,
    "change_7d_pct": 3.363,
    "change_30d_pct": 8.771,
    "price_usd": 0.9997679275301404,
    "peg_deviation_pct": -0.023,
    "chains": 7,
    "top_chains": [
     "Ethereum",
     "Solana",
     "Base",
     "… 3 more"
    ]
   },
   "… 7 more"
  ],
  "depegged_over_1pct": [
   {
    "symbol": "apxUSD",
    "price_usd": 0.9840731310056007,
    "circulating": 287077273
   },
   {
    "symbol": "BUSD",
    "price_usd": 1.0128937909962346,
    "circulating": 235969711
   },
   {
    "symbol": "pmUSD",
    "price_usd": 0.6914331608023773,
    "circulating": 64995549
   },
   "… 12 more"
  ]
 }
}
```

</details>

---

### `dex_volumes`

**DEX volume rankings** · free

DEX trading volume in the last 24 h / 7 d / 30 d — all chains or one — with the top DEXes and their share and change.

DefiLlama DEX overview. Optionally scoped to one chain. Includes perps with type=perps (derivatives volume) or aggregators.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/dex_volumes` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `dex_volumes` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `chain` | string |  | e.g. Solana, Base (optional) |
| `type` | string (`dexs`, `derivatives`, `aggregators`) |  | Spot DEXes, perp/derivatives DEXes, or DEX aggregators. One of "dexs", "derivatives", "aggregators". Default "dexs". (default `"dexs"`) |
| `limit` | integer |  | How many venues to return. Range 1-50. Default 15. (default `15`, range 1–50) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/dex_volumes \
  -H 'Content-Type: application/json' \
  -d '{"chain": "Solana", "limit": 10}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.dexVolumes({"chain": "Solana", "limit": 10});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.dex_volumes(chain='Solana', limit=10)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "dex_volumes", "arguments": {"chain": "Solana", "limit": 10}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "dex_volumes",
 "ms": 20,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "source": "DefiLlama",
  "scope": "Solana",
  "type": "dexs",
  "volume_usd": {
   "24h": 1921414212,
   "7d": 12424204522,
   "30d": 69765893910
  },
  "change_1d_pct": -15.98,
  "change_7d_pct": -2.87,
  "top": [
   {
    "name": "BisonFi",
    "volume_24h_usd": 410359410,
    "share_pct": 21.36,
    "change_1d_pct": 0,
    "volume_7d_usd": 1796918151,
    "chains": [
     "Solana"
    ]
   },
   {
    "name": "Orca DEX",
    "volume_24h_usd": 268566994,
    "share_pct": 13.98,
    "change_1d_pct": -29.49,
    "volume_7d_usd": 1749507359,
    "chains": [
     "Solana",
     "Eclipse"
    ]
   },
   {
    "name": "Raydium AMM",
    "volume_24h_usd": 175098940,
    "share_pct": 9.11,
    "change_1d_pct": -27.55,
    "volume_7d_usd": 1187663195,
    "chains": [
     "Solana"
    ]
   },
   "… 7 more"
  ]
 }
}
```

</details>

---

### `fees_revenue`

**Protocol fees + revenue** · $0.002 · 10 free calls/day

Which protocols and chains earn the most: fees or revenue over 24 h / 7 d / 30 d, filterable by chain — the cash-flow view of crypto.

DefiLlama fees/revenue overview. "fees" = what users paid; "revenue" = what the protocol kept. Ranked, with day-over-day change.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/fees_revenue` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `fees_revenue` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `metric` | string (`fees`, `revenue`) |  | Gross fees paid by users, or revenue kept by the protocol. One of "fees", "revenue". Default "fees". (default `"fees"`) |
| `chain` | string |  | optional |
| `limit` | integer |  | How many protocols to return. Range 1-50. Default 20. (default `20`, range 1–50) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/fees_revenue \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"metric": "revenue", "limit": 10}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.feesRevenue({"metric": "revenue", "limit": 10});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.fees_revenue(metric='revenue', limit=10)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "fees_revenue", "arguments": {"metric": "revenue", "limit": 10}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "fees_revenue",
 "ms": 204,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "source": "DefiLlama",
  "metric": "revenue",
  "scope": "all chains",
  "total_usd": {
   "24h": 44434402,
   "7d": 326225422,
   "30d": 1281399043
  },
  "top": [
   {
    "name": "Tether",
    "category": "Stablecoin Issuer",
    "24h_usd": 17625945,
    "7d_usd": 122823819,
    "30d_usd": 521613854,
    "change_1d_pct": -0.21,
    "chains": [
     "Off Chain"
    ]
   },
   {
    "name": "Circle USDC",
    "category": "Stablecoin Issuer",
    "24h_usd": 7034833,
    "7d_usd": 48995998,
    "30d_usd": 211939496,
    "change_1d_pct": 0.07,
    "chains": [
     "Ethereum",
     "Off Chain"
    ]
   },
   {
    "name": "Papertrade",
    "category": "Derivatives",
    "24h_usd": 5242780,
    "7d_usd": 55179076,
    "30d_usd": 55179076,
    "change_1d_pct": -30,
    "chains": [
     "Off Chain"
    ]
   },
   "… 7 more"
  ]
 }
}
```

</details>

---

### `gas_now`

**Gas + fees across chains** · free

What a transaction costs right now on 17 EVM chains, Solana and Bitcoin — gwei/priority fee and the USD cost of a transfer and a swap on each.

EVM: base fee + priority fee from the latest block (eth_feeHistory), USD cost of a 21,000-gas transfer and a ~150,000-gas swap (L2s shown before their L1 data fee). Solana: recent prioritization-fee percentiles. Bitcoin: mempool.space recommended sat/vB with USD for a typical 140 vB transaction.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/gas_now` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `gas_now` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `chains` | array of string |  | subset, e.g. ["ethereum","base","solana","bitcoin"] (default: all) 0-20 items. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/gas_now \
  -H 'Content-Type: application/json' \
  -d '{"chains": ["ethereum", "base", "arbitrum", "solana", "bitcoin"]}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.gasNow({"chains": ["ethereum", "base", "arbitrum", "solana", "bitcoin"]});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.gas_now(chains=['ethereum', 'base', 'arbitrum', 'solana', 'bitcoin'])['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "gas_now", "arguments": {"chains": ["ethereum", "base", "arbitrum", "solana", "bitcoin"]}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "gas_now",
 "ms": 660,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "as_of": "2026-10-17T04:20:59.252Z",
  "note": "L2 costs exclude the L1 data fee, which adds a little on rollups.",
  "chains": [
   {
    "chain": "ethereum",
    "base_fee_gwei": 0.066994,
    "priority_fee_gwei": 0.008828,
    "priority_basis": "median tip actually paid in the last 5 blocks",
    "total_gwei": 0.075822,
    "native": "ETH",
    "usd_transfer_21k": 0.00386,
    "usd_swap_150k": 0.02757
   },
   {
    "chain": "base",
    "base_fee_gwei": 0.005,
    "priority_fee_gwei": 0.001,
    "priority_basis": "median tip actually paid in the last 5 blocks",
    "total_gwei": 0.006,
    "native": "ETH",
    "usd_transfer_21k": 0.00031,
    "usd_swap_150k": 0.00218
   },
   {
    "chain": "arbitrum",
    "base_fee_gwei": 0.02,
    "priority_fee_gwei": 0,
    "priority_basis": "median tip actually paid in the last 5 blocks",
    "total_gwei": 0.02,
    "native": "ETH",
    "usd_transfer_21k": 0.00102,
    "usd_swap_150k": 0.00727
   },
   "… 2 more"
  ]
 }
}
```

</details>

---

### `ens_resolve`

**ENS resolve** · free

ENS name → address and address → primary name, with avatar, twitter, github, url and email text records.

Reads ENS on Ethereum mainnet (forward resolution verified; reverse lookup confirmed by forward-resolving the name).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/ens_resolve` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `ens_resolve` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | vitalik.eth or 0x address |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/ens_resolve \
  -H 'Content-Type: application/json' \
  -d '{"query": "vitalik.eth"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.ensResolve({"query": "vitalik.eth"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.ens_resolve(query='vitalik.eth')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "ens_resolve", "arguments": {"query": "vitalik.eth"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "ens_resolve",
 "ms": 272,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "found": true,
  "name": "vitalik.eth",
  "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "records": {
   "avatar": "https://euc.li/vitalik.eth",
   "url": "https://vitalik.ca",
   "com.twitter": "VitalikButerin",
   "com.github": "vbuterin",
   "description": "mi pinxe lo crino tcati"
  },
  "app": "https://app.ens.domains/vitalik.eth"
 }
}
```

</details>

---

### `cex_ticker`

**Exchange prices (Kraken/Coinbase/OKX)** · $0.001 · 10 free calls/day

Live bid/ask/last, 24 h change, volume and range for a pair on Kraken, Coinbase and OKX side by side — with the cross-venue spread.

Queries each venue's public ticker in parallel. OKX quotes in USDT when USD is asked for. The cross-venue spread shows arbitrage gaps and which venue is off.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/cex_ticker` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `cex_ticker` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `pair` | string | yes | BTC/USD, ETH-USDT, SOL |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/cex_ticker \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"pair": "SOL/USD"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.cexTicker({"pair": "SOL/USD"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.cex_ticker(pair='SOL/USD')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "cex_ticker", "arguments": {"pair": "SOL/USD"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "cex_ticker",
 "ms": 179,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "pair": "SOL/USD",
  "venues": [
   {
    "venue": "kraken",
    "pair": "SOL/USD",
    "last": 104.57,
    "bid": 104.56,
    "ask": 104.57,
    "volume_24h_base": 248555.6819,
    "vwap_24h": 104.68902,
    "open_24h": 104.31,
    "change_24h_pct": 0.249,
    "high_24h": 107.31,
    "low_24h": 102.37
   },
   {
    "venue": "coinbase",
    "pair": "SOL/USD",
    "last": 104.56,
    "bid": 104.56,
    "ask": 104.57,
    "volume_24h_base": 673930.9772,
    "open_24h": 105.6,
    "change_24h_pct": -0.985,
    "high_24h": 107.3,
    "low_24h": 102.34
   },
   {
    "venue": "okx",
    "pair": "SOL/USDT",
    "last": 104.71,
    "bid": 104.7,
    "ask": 104.71,
    "volume_24h_base": 673217.4691,
    "open_24h": 105.38,
    "change_24h_pct": -0.636,
    "high_24h": 107.45,
    "low_24h": 102.5
   }
  ],
  "best_bid": "okx",
  "best_ask": "kraken",
  "cross_venue_spread_bps": 14.35
 }
}
```

</details>

---

### `orderbook_depth`

**Order book depth + slippage** · $0.003 · 10 free calls/day

How much size a market can take: bid/ask depth within ±0.1/0.5/1/2/5%, spread, and the slippage of a $10k/$100k/$1M market order on Kraken, Coinbase or OKX.

Pulls the full public L2 book and walks it. Use before sizing an order or comparing venue liquidity. slippage is vs. mid price, in basis points; null means the fetched book was too thin for that size.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/orderbook_depth` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `orderbook_depth` |
| Price | $0.003 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `pair` | string | yes | Market pair as BASE/QUOTE, e.g. "BTC/USD" or "ETH/USDT". |
| `venue` | string (`coinbase`, `kraken`, `okx`) |  | Exchange whose order book to read. One of "coinbase", "kraken", "okx". Default "coinbase". (default `"coinbase"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/orderbook_depth \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"pair": "ETH/USD", "venue": "coinbase"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.orderbookDepth({"pair": "ETH/USD", "venue": "coinbase"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.orderbook_depth(pair='ETH/USD', venue='coinbase')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "orderbook_depth", "arguments": {"pair": "ETH/USD", "venue": "coinbase"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "orderbook_depth",
 "ms": 121,
 "billing": {
  "mode": "credits",
  "usd": 0.003
 },
 "data": {
  "venue": "coinbase",
  "pair": "ETH/USD",
  "levels": {
   "bids": 6642,
   "asks": 12832
  },
  "best_bid": 2422.57,
  "best_ask": 2422.65,
  "mid": 2422.61,
  "spread_bps": 0.33,
  "depth_usd": {
   "pm_0.1pct": {
    "bids": 975724,
    "asks": 1298696
   },
   "pm_0.5pct": {
    "bids": 5040336,
    "asks": 4927632
   },
   "pm_1pct": {
    "bids": 6651570,
    "asks": 8647384
   },
   "pm_2pct": {
    "bids": 8632013,
    "asks": 9930820
   },
   "pm_5pct": {
    "bids": 9722998,
    "asks": 10963007
   }
  },
  "slippage_bps_market_buy": {
   "usd_10k": 0.17,
   "usd_100k": 0.53,
   "usd_1m": 4.06
  },
  "slippage_bps_market_sell": {
   "usd_10k": 0.8,
   "usd_100k": 1.8,
   "usd_1m": 5.26
  }
 }
}
```

</details>

---

### `funding_rates`

**Perp funding rates** · $0.003 · 10 free calls/day

Perpetual funding for a coin on Hyperliquid, OKX and Kraken Futures side by side — per-interval rate and annualized APR — plus open interest and mark price.

Positive = longs pay shorts. Each venue's rate is normalized to an hourly figure and annualized so they compare directly (OKX settles every 1–8 h, Hyperliquid hourly, Kraken hourly). Use for basis/carry trades or crowding signals.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/funding_rates` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `funding_rates` |
| Price | $0.003 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `coin` | string | yes | BTC, ETH, SOL… |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/funding_rates \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"coin": "SOL"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.fundingRates({"coin": "SOL"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.funding_rates(coin='SOL')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "funding_rates", "arguments": {"coin": "SOL"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "funding_rates",
 "ms": 339,
 "billing": {
  "mode": "credits",
  "usd": 0.003
 },
 "data": {
  "coin": "SOL",
  "as_of": "2026-10-17T04:21:00.164Z",
  "venues": [
   {
    "venue": "hyperliquid",
    "rate_per_interval_pct": 0.00035,
    "interval_hours": 1,
    "hourly_pct": 0.000349,
    "apr_pct": 3.06,
    "mark": 104.66,
    "open_interest_usd": 568288260
   },
   {
    "venue": "okx",
    "rate_per_interval_pct": -0.00036,
    "interval_hours": 8,
    "hourly_pct": -4.5e-05,
    "apr_pct": -0.4,
    "next_funding": "2026-10-17T08:00:00.000Z",
    "open_interest_usd": 312935820
   },
   {
    "venue": "kraken_futures",
    "rate_per_interval_pct": 0.00012,
    "interval_hours": 1,
    "hourly_pct": 0.000119,
    "apr_pct": 1.04,
    "mark": 104.56368658596,
    "open_interest_usd": 24411620,
    "note": "Kraken publishes an absolute hourly rate; shown here relative to mark"
   }
  ],
  "spread_apr_pct": 3.46,
  "meaning": "positive = longs pay shorts"
 }
}
```

</details>

---

### `hyperliquid_markets`

**Hyperliquid perps** · $0.002 · 10 free calls/day

Every Hyperliquid perpetual: mark/oracle price, 24 h change and volume, open interest, funding APR, premium — ranked by volume, OI, funding or movers.

Live from Hyperliquid's public info API. Filter to one coin or rank the whole board. Funding is hourly on Hyperliquid; apr = hourly × 8,760.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/hyperliquid_markets` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `hyperliquid_markets` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `coin` | string |  | optional, e.g. BTC |
| `sort` | string (`volume`, `open_interest`, `funding`, `funding_negative`, `change`) |  | Rank by 24 h volume, open interest, highest or most negative funding, or 24 h change. One of "volume", "open_interest", "funding", "funding_negative", "change". Default "volume". (default `"volume"`) |
| `limit` | integer |  | How many markets to return. Range 1-100. Default 20. (default `20`, range 1–100) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/hyperliquid_markets \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"sort": "funding", "limit": 10}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.hyperliquidMarkets({"sort": "funding", "limit": 10});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.hyperliquid_markets(sort='funding', limit=10)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "hyperliquid_markets", "arguments": {"sort": "funding", "limit": 10}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "hyperliquid_markets",
 "ms": 1,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "markets": 178,
  "total_volume_24h_usd": 5516695481,
  "total_open_interest_usd": 11311377953,
  "ranked_by": "funding",
  "top": [
   {
    "coin": "ATOM",
    "mark": 1.755,
    "oracle": 1.7565,
    "change_24h_pct": 1.159,
    "volume_24h_usd": 620630,
    "open_interest_usd": 3811565,
    "funding_hourly_pct": 0.00125,
    "funding_apr_pct": 10.95,
    "premium_pct": -0.0057,
    "max_leverage": 5
   },
   {
    "coin": "DYDX",
    "mark": 0.12336,
    "oracle": 0.12335,
    "change_24h_pct": -0.404,
    "volume_24h_usd": 152273,
    "open_interest_usd": 1943551,
    "funding_hourly_pct": 0.00125,
    "funding_apr_pct": 10.95,
    "premium_pct": 0,
    "max_leverage": 5
   },
   {
    "coin": "APE",
    "mark": 0.14818,
    "oracle": 0.14825,
    "change_24h_pct": 3.369,
    "volume_24h_usd": 419895,
    "open_interest_usd": 1269136,
    "funding_hourly_pct": 0.00125,
    "funding_apr_pct": 10.95,
    "premium_pct": 0,
    "max_leverage": 5
   },
   "… 7 more"
  ]
 }
}
```

</details>

---

### `fear_greed`

**Crypto Fear & Greed** · free

The Crypto Fear & Greed Index (0–100) now and its history, with the 7 d / 30 d average and how extreme today is.

alternative.me index, daily. Up to 365 days of history.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/fear_greed` |
| MCP | `https://augur-trade.com/hub/mcp/chain` → tool `fear_greed` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `days` | integer |  | Days of index history to include. Range 1-365. Default 30. (default `30`, range 1–365) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/fear_greed \
  -H 'Content-Type: application/json' \
  -d '{"days": 30}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.fearGreed({"days": 30});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.fear_greed(days=30)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "fear_greed", "arguments": {"days": 30}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "fear_greed",
 "ms": 62,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "now": {
   "date": "2026-10-17",
   "value": 55,
   "label": "Greed"
  },
  "avg_7d": 60,
  "avg_30d": 67.3,
  "history": [
   {
    "date": "2026-10-17",
    "value": 55,
    "label": "Greed"
   },
   {
    "date": "2026-10-16",
    "value": 63,
    "label": "Greed"
   },
   {
    "date": "2026-10-15",
    "value": 53,
    "label": "Neutral"
   },
   "… 27 more"
  ],
  "source": "alternative.me"
 }
}
```

</details>

---

### `bitcoin_network`

**Bitcoin network status** · free

Bitcoin right now: fee rates, mempool size, block height, next difficulty adjustment (% and ETA), hashrate.

From mempool.space public API.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/bitcoin_network` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `bitcoin_network` |
| Price | free |

**Arguments**

_No arguments: send `{}`._

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/bitcoin_network \
  -H 'Content-Type: application/json' \
  -d '{}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.bitcoinNetwork();
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.bitcoin_network()['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "bitcoin_network", "arguments": {}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "bitcoin_network",
 "ms": 182,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "block_height": 971806,
  "fees_sat_per_vb": {
   "fastestFee": 1,
   "halfHourFee": 1,
   "hourFee": 1,
   "economyFee": 1,
   "minimumFee": 1
  },
  "mempool": {
   "tx_count": 77222,
   "vsize_mb": 38.96,
   "total_fee_btc": 0.0609
  },
  "difficulty_adjustment": {
   "progress_pct": 4.66,
   "estimated_change_pct": 1.26,
   "remaining_blocks": 1922,
   "eta": "2026-10-30T09:19:30.620Z"
  },
  "hashrate_eh_s": 1036.8,
  "difficulty": 140577680051919.6,
  "source": "mempool.space"
 }
}
```

</details>

---

[← All endpoints](README.md)
