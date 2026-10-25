# Forensics Lobe

Who is behind a launch: bundle wallets labelled bot / bundle / dev-linked, creation airdrops, scripted buying, transfer-only holders and serial devs — Solana pump.fun plus 18 EVM chains, with a back-tested skip/pass rug guard.

4 tools · MCP server `https://augur-trade.com/hub/mcp/forensics`

| Tool | What it does | Price |
|---|---|---|
| [`bundle_forensics`](#bundle_forensics) | Who bundled a Solana pump.fun launch: every block-0 wallet labelled sniper bot / bundle / dev-linked, supply bought and still held, holders who got tokens by transfer, serial-dev check, top-10 concentration, RugCheck — plus a back-tested skip/pass verdict. | $0.003 |
| [`bundler_profile`](#bundler_profile) | Is this Solana wallet a bundler? Every pump.fun launch it bought in the first 2 slots over the last 10 days, which creators it keeps bundling for, and whether it is a mass sniper bot or a dev's private bundle wallet. | $0.002 |
| [`creator_launches`](#creator_launches) | Every pump.fun coin a Solana wallet created in the last 10 days, how many graduated, and the wallets that bundle its launches again and again (its private bundle crew). | $0.002 |
| [`evm_bundle_forensics`](#evm_bundle_forensics) | Who bundled an EVM token launch (Base, BSC, Ethereum, Arbitrum, Robinhood and 13 more): creation-tx airdrops to fake holders, first-seconds buys, scripted fixed-cadence buying, fresh-wallet and transfer-only holders, dev holdings, exchange-labelled holders, GoPlus contract flags — plus a skip/pass verdict. | $0.005 |

---

### `bundle_forensics`

**Bundle forensics + rug guard** · $0.003 · 10 free calls/day

Who bundled a Solana pump.fun launch: every block-0 wallet labelled sniper bot / bundle / dev-linked, supply bought and still held, holders who got tokens by transfer, serial-dev check, top-10 concentration, RugCheck — plus a back-tested skip/pass verdict.

The rug guard A.U.G.U.R snipers use before every buy. Skip rules were tested on 2,221 real caller calls (held-out: stop-outs 10%→5%, rugs 16%→11%): creator launched another coin in the prior 24 h; top-10 wallets >35%; block-0 wallets that also bundled this creator's earlier launches; block-0 buys >20% of supply. Extra flags: RugCheck danger risks, insider wallets >15%, and >10% held by wallets that never bought on the curve (tokens moved in by transfer, the layered-bundle pattern of launch tools like Proxima). "ok:true" means no red flags were found, not that the coin is safe.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/bundle_forensics` |
| MCP | `https://augur-trade.com/hub/mcp/forensics` → tool `bundle_forensics` |
| Price | $0.003 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `mint` | string | yes | Solana token mint (pump.fun launches get the full bundle view) Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/bundle_forensics \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"mint": "J8yXtgS6woDh5x2pyaSYdKCpdgt7uVqRtwcZk6eUpump"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.bundleForensics({"mint": "J8yXtgS6woDh5x2pyaSYdKCpdgt7uVqRtwcZk6eUpump"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.bundle_forensics(mint='J8yXtgS6woDh5x2pyaSYdKCpdgt7uVqRtwcZk6eUpump')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "bundle_forensics", "arguments": {"mint": "J8yXtgS6woDh5x2pyaSYdKCpdgt7uVqRtwcZk6eUpump"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "bundle_forensics",
 "ms": 1072,
 "billing": {
  "mode": "credits",
  "usd": 0.003
 },
 "data": {
  "verdict": "skip",
  "mint": "J8yXtgS6woDh5x2pyaSYdKCpdgt7uVqRtwcZk6eUpump",
  "ok": false,
  "reasons": [
   "serial dev: 4 other launches in the 24 h before this one"
  ],
  "warn": [],
  "dev": {
   "wallet": "6jnpTs6TYkd8w1PYqRVkQaYpPfzyGN9Vxz63AZr7wtoy",
   "launches24h": 4,
   "launches7d": 4,
   "sold": true,
   "boughtPct": 57.2,
   "heldPct": 0,
   "graduated": false,
   "age": 674752
  },
  "bundle": {
   "known": true,
   "wallets": 0,
   "pct": 0,
   "heldPct": 0,
   "bundlePct": 0,
   "bundleHeldPct": 0,
   "devLinked": 0,
   "bots": 0,
   "list": []
  },
  "holders": {
   "top10": 1,
   "top": [
    {
     "wallet": "3VW5qAB8zASzMizyrauToRxuxMnS659K6CGqDgYiroFe",
     "pct": 0.55,
     "dev": false
    },
    {
     "wallet": "7JCe3GHwkEr3feHgtLXnmuJ1yB3A7coSeyynxTBgdG8k",
     "pct": 0.21,
     "dev": false
    },
    {
     "wallet": "ARu4n5mFdZogZAravu7CcizaojWnS6oqka37gdLT5SZn",
     "pct": 0.15,
     "dev": false
    },
    "… 2 more"
   ],
   "source": "curve trades"
  },
  "rugcheck": {
   "score": 1,
   "risks": [],
   "insiderNetworks": 0,
   "insiderPct": 0,
   "transferHolderPct": 0.1,
   "transferHolders": [
    {
     "wallet": "HBYD3QxbW6kjpiRc1MxrywspRWVGuKKJJc82Rg7HQShy",
     "pct": 0.15
    }
   ],
   "creatorTokens": 0,
   "top10": 0.1
  },
  "ms": 1065
 }
}
```

</details>

---

### `bundler_profile`

**Bundler wallet profile** · $0.002 · 10 free calls/day

Is this Solana wallet a bundler? Every pump.fun launch it bought in the first 2 slots over the last 10 days, which creators it keeps bundling for, and whether it is a mass sniper bot or a dev's private bundle wallet.

From our block-0 registry of every pump.fun launch (non-creator buys in slots 0–1 after creation). kind: "sniper bot" (≥50 launches in 7 days, buys everything), "dev wallet" (most of its block-0 buys are on one or two creators' coins — a private bundle wallet), "bundler", or "not seen". Use it on wallets bundle_forensics lists, or on any wallet you are about to copy.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/bundler_profile` |
| MCP | `https://augur-trade.com/hub/mcp/forensics` → tool `bundler_profile` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `wallet` | string | yes | Solana wallet. Base58 Solana address, 32-44 chars. |
| `limit` | integer |  | Range 1-100. Default 25. (default `25`, range 1–100) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/bundler_profile \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"wallet": "6dnHfCbAyDg1U3cuY6ZNNEt3FufdLnCkLEqLShy1VmoR"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.bundlerProfile({"wallet": "6dnHfCbAyDg1U3cuY6ZNNEt3FufdLnCkLEqLShy1VmoR"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.bundler_profile(wallet='6dnHfCbAyDg1U3cuY6ZNNEt3FufdLnCkLEqLShy1VmoR')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "bundler_profile", "arguments": {"wallet": "6dnHfCbAyDg1U3cuY6ZNNEt3FufdLnCkLEqLShy1VmoR"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "bundler_profile",
 "ms": 8,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "wallet": "6dnHfCbAyDg1U3cuY6ZNNEt3FufdLnCkLEqLShy1VmoR",
  "kind": "not seen",
  "block0_launches_10d": 0,
  "block0_launches_7d": 0,
  "distinct_creators": 0,
  "own_launches_10d": 0,
  "top_creators": [],
  "sol_spent_10d": 0,
  "recent": [],
  "window": "last 10 days of pump.fun launches"
 }
}
```

</details>

---

### `creator_launches`

**Creator launch history + bundles** · $0.002 · 10 free calls/day

Every pump.fun coin a Solana wallet created in the last 10 days, how many graduated, and the wallets that bundle its launches again and again (its private bundle crew).

Serial launchers (more than one coin a day) are the strongest rug signal in our tests: calls on coins whose creator launched another coin in the prior 24 h averaged −11% vs −5% after costs. Repeat block-0 wallets across a creator's launches are its own bundle wallets.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/creator_launches` |
| MCP | `https://augur-trade.com/hub/mcp/forensics` → tool `creator_launches` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `creator` | string | yes | creator (dev) wallet. Base58 Solana address, 32-44 chars. |
| `limit` | integer |  | Range 1-100. Default 25. (default `25`, range 1–100) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/creator_launches \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"creator": "6jnpTs6TYkd8w1PYqRVkQaYpPfzyGN9Vxz63AZr7wtoy"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.creatorLaunches({"creator": "6jnpTs6TYkd8w1PYqRVkQaYpPfzyGN9Vxz63AZr7wtoy"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.creator_launches(creator='6jnpTs6TYkd8w1PYqRVkQaYpPfzyGN9Vxz63AZr7wtoy')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "creator_launches", "arguments": {"creator": "6jnpTs6TYkd8w1PYqRVkQaYpPfzyGN9Vxz63AZr7wtoy"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "creator_launches",
 "ms": 10,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "creator": "6jnpTs6TYkd8w1PYqRVkQaYpPfzyGN9Vxz63AZr7wtoy",
  "launches_10d": 10,
  "launches_24h": 0,
  "graduated": 0,
  "serial": true,
  "verdict": "serial launcher — treat new coins as likely rugs",
  "bundle_crew": [
   {
    "wallet": "3cZRKMvDHnRwbXGkfwkgLjfzbYgNeCdnpMUHauqdnTWm",
    "launches_bundled": 2,
    "kind": "crew"
   }
  ],
  "launches": [
   {
    "mint": "BuoVkrjUzNcisEVbsEENVBemRLZGwwADDHvNABCGpump",
    "launched": "2026-10-13T15:56:49.000Z",
    "graduated": false
   },
   {
    "mint": "J5YR9MjAbrPuxnw63DwjH1Lf29tNfRMn8WQADEq6pump",
    "launched": "2026-10-09T08:59:50.000Z",
    "graduated": false
   },
   {
    "mint": "VGhKos7M7PdiMoX8odgW7wEPHAi7WxsVHnrixSnpump",
    "launched": "2026-10-09T08:59:15.000Z",
    "graduated": false
   },
   "… 7 more"
  ]
 }
}
```

</details>

---

### `evm_bundle_forensics`

**EVM launch + bundle forensics** · $0.005 · 10 free calls/day

Who bundled an EVM token launch (Base, BSC, Ethereum, Arbitrum, Robinhood and 13 more): creation-tx airdrops to fake holders, first-seconds buys, scripted fixed-cadence buying, fresh-wallet and transfer-only holders, dev holdings, exchange-labelled holders, GoPlus contract flags — plus a skip/pass verdict.

Replays every ERC-20 Transfer of the token from its first mint on the public RPC, so for young tokens (Base ~4 days, BSC ~6 h of history in budget) holder balances, buys and wallet-to-wallet hand-offs are exact. Launchpads (Four.meme, Uniswap v4 PoolManager, v2/v3 pairs from Dexscreener) are detected; vault/locker contracts that never bought are kept out of the wallet rules, while contracts that DID buy (smart wallets, bundler contracts) count as wallets. Older tokens fall back to GoPlus holders with 527 exchange wallets named. Skip rules: GoPlus honeypot/tax>10%/owner powers; top-10 wallets >35%; first ~2 s of buys >20%; >10% held by wallets that never bought; creation tx airdropping ≥10 wallets or >10%; scripted buying (≥5 buys ≥1% at a regular cadence taking ≥15%); fresh wallets / buyer contracts >15%. Heuristic on EVM (mirrors the back-tested Solana guard); "pass" is not a safety promise.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/evm_bundle_forensics` |
| MCP | `https://augur-trade.com/hub/mcp/forensics` → tool `evm_bundle_forensics` |
| Price | $0.005 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `chain` | string (`ethereum`, `base`, `arbitrum`, `optimism`, `polygon`, `bsc`, `avalanche`, `linea`, `blast`, `scroll`, `gnosis`, `sonic`) | yes | EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hyperevm, monad, robinhood. One of "ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanche", "linea", "blast", "scroll", "gnosis", "sonic", "unichain", "mantle", "berachain", "hyperevm", "monad", "robinhood". Default "base". (default `"base"`) |
| `token` | string | yes | ERC-20 token contract address. 0x + 40 hex chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/evm_bundle_forensics \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"chain": "bsc", "token": "0xfe6b7c083fed0e69974dd7840f018acf5c107777"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.evmBundleForensics({"chain": "bsc", "token": "0xfe6b7c083fed0e69974dd7840f018acf5c107777"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.evm_bundle_forensics(chain='bsc', token='0xfe6b7c083fed0e69974dd7840f018acf5c107777')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "evm_bundle_forensics", "arguments": {"chain": "bsc", "token": "0xfe6b7c083fed0e69974dd7840f018acf5c107777"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "evm_bundle_forensics",
 "ms": 2007,
 "billing": {
  "mode": "credits",
  "usd": 0.005
 },
 "data": {
  "chain": "bsc",
  "token": "0xfe6b7c083fed0e69974dd7840f018acf5c107777",
  "symbol": "破茧成",
  "ok": true,
  "verdict": "pass",
  "reasons": [],
  "warn": [
   "mint not found near the first pool (old or pre-minted token): holders from GoPlus, launch window from the first pool",
   "launch history not available on the public RPC (RPC HTTP 403): contract flags and holders from GoPlus only"
  ],
  "launch": {
   "mint_block": null,
   "open_block": 127529825,
   "block_time_s": 0.45,
   "age_min": null,
   "dev": null,
   "minter": null,
   "launchpad": null
  },
  "supply": {
   "total": "1000000000000000000000000000",
   "decimals": 18,
   "dev_held_pct": null
  },
  "holders": {
   "exact": false,
   "contract_held_pct": null,
   "count": 174,
   "top10_pct": 1.9,
   "transfer_held_pct": null,
   "fresh_wallet_held_pct": null,
   "top": [
    {
     "wallet": "0x237781be8f3db7374af14a5a0f12275965fd55d5",
     "pct": 7.05,
     "kind": "labelled: PancakeV2",
     "source": "GoPlus"
    },
    {
     "wallet": "0x8737a10d9c19af8bb2eae0b5e9cfe7b7276e0638",
     "pct": 3.11,
     "kind": "contract",
     "source": "GoPlus"
    },
    {
     "wallet": "0x426603bac5e0ea73fd13aecad7a80c9f963f6eac",
     "pct": 0.78,
     "kind": "contract",
     "source": "GoPlus"
    },
    "… 6 more"
   ]
  },
  "bundle": {
   "first_seconds": 2,
   "wallets": 0,
   "bought_pct": 0,
   "still_held_pct": null,
   "list": [],
   "creation_airdrop": {
    "wallets": 0,
    "contracts": 0,
    "pct": 0
   },
   "scripted": null
  },
  "contract": {
   "flags": [],
   "owner": null,
   "creator": "0x598b32265b06edb2ffbb7686f271835a601534f4",
   "buy_tax": "0",
   "sell_tax": "0",
   "open_source": true
  },
  "pools": [],
  "transfers_replayed": 0,
  "ms": 2006,
  "note": "Heuristic verdict (EVM rules mirror the back-tested Solana guard; not yet back-tested on EVM). \"pass\" means no red flags were found, not that the token is safe."
 }
}
```

</details>

---

[← All endpoints](README.md)
