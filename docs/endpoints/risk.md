# Risk Amygdala

Forensics before an agent puts money in: Solana launches and contracts, EVM honeypots, addresses, dependency CVEs.

6 tools · MCP server `https://augur-trade.com/hub/mcp/risk`

| Tool | What it does | Price |
|---|---|---|
| [`token_risk`](#token_risk) | 0-100 rug-risk score for any Solana token: mint/freeze authority, Token-2022 traps, holder concentration, liquidity depth — plus pump.fun curve flags. | $0.005 |
| [`launch_scan`](#launch_scan) | One call, one verdict on a pump.fun launch: 0-100 score with positives and risks, graduation odds, dev record, snipers, holders, flow. | $0.025 |
| [`counterparty_check`](#counterparty_check) | One-call verdict on a Solana wallet before you deal with it: serial token launcher, fast dumper, trading bot, or clean. | $0.005 |
| [`evm_token_security`](#evm_token_security) | Honeypot and scam check for any ERC-20 on 15+ EVM chains: buy/sell tax, can the owner mint, pause, blacklist or change taxes, proxy, holder concentration, LP lock. | $0.005 |
| [`address_check`](#address_check) | Is this a valid address, and for which chain? EVM (with checksum fix), Solana (on-curve wallet vs PDA), Bitcoin (legacy/P2SH/SegWit/Taproot), Tron, Cosmos-style bech32. | free |
| [`vuln_check`](#vuln_check) | Known security vulnerabilities for a package version (npm, PyPI, crates, Go, Maven, NuGet, RubyGems, Packagist) with severity, CVE/GHSA ids, and the version that fixes each. | $0.002 |

---

### `token_risk`

**Token risk score** · $0.005 · 10 free calls/day

0-100 rug-risk score for any Solana token: mint/freeze authority, Token-2022 traps, holder concentration, liquidity depth — plus pump.fun curve flags.

Contract state is read live from Solana (authorities, Token-2022 extensions such as transfer fees, hooks, permanent delegate, pausable), holders from the largest accounts, market from DexScreener; for tokens still on any launchpad bonding curve (pump.fun, Meteora DBC, letsbonk…) liquidity is the SOL/USDC in the curve, read from chain (field `curve`). For pump.fun mints the curve forensics flags are merged in.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/token_risk` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `token_risk` |
| Price | $0.005 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `mint` | string | yes | token mint. Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/token_risk \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"mint": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.tokenRisk({"mint": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.token_risk(mint='JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "token_risk", "arguments": {"mint": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "token_risk",
 "ms": 3,
 "billing": {
  "mode": "credits",
  "usd": 0.005
 },
 "data": {
  "mint": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
  "found": true,
  "name": "Jupiter",
  "symbol": "JUP",
  "price_usd": "1498.66",
  "liquidity_usd": 1092400661.64,
  "fdv_usd": 10490636572911,
  "volume_24h_usd": 211450486.78,
  "pair_age_hours": 8559.7,
  "solana_pairs": 30,
  "dex": "meteora",
  "pair_url": "https://dexscreener.com/solana/3xngdc58axytrj64stqz5trdqwvtwhlr888irbbwznee",
  "txns_24h": {
   "buys": 103,
   "sells": 40
  },
  "score": 100,
  "grade": "A",
  "flags": [
   {
    "severity": "ok",
    "msg": "No red flags in the contract or the market structure."
   },
   {
    "severity": "info",
    "msg": "Recognised major token (JUP), matched by mint address. Its issuer controls are listed as notes, not penalised."
   },
   {
    "severity": "info",
    "msg": "Metadata is mutable (recognised major token, not penalised)."
   }
  ],
  "swap_url": "https://augur-trade.com/swap/?mint=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN&src=synapse",
  "known_asset": {
   "symbol": "JUP",
   "kind": "major token"
  },
  "liquidity_total_usd": 1330681218.56,
  "onchain": {
   "program": "SPL Token",
   "decimals": 6,
   "supply": 6861485939.924338,
   "mint_authority": null,
   "freeze_authority": null,
   "holders": null,
   "token2022_extensions": [],
   "metadata_mutable": true,
   "pump_fun": null
  },
  "onchain_error": null,
  "disclaimer": "Contract checks read live from Solana; market checks from DexScreener. Does not yet check LP locks; holder concentration unavailable for this scan. Not financial advice.",
  "generated_utc": "2026-10-17T04:22:39Z"
 }
}
```

</details>

---

### `launch_scan`

**Launch scan (bundle)** · $0.025 · 10 free calls/day

One call, one verdict on a pump.fun launch: 0-100 score with positives and risks, graduation odds, dev record, snipers, holders, flow.

Runs pump_token + pump_dev + pump_odds together (cheaper than calling them separately) and folds them into a single score and verdict an agent can act on: strong / neutral / weak / avoid.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/launch_scan` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `launch_scan` |
| Price | $0.025 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `mint` | string | yes | pump.fun token mint. Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/launch_scan \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.launchScan({"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.launch_scan(mint='2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "launch_scan", "arguments": {"mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "launch_scan",
 "ms": 6,
 "billing": {
  "mode": "credits",
  "usd": 0.025
 },
 "data": {
  "mint": "2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump",
  "symbol": "genny",
  "score": 55,
  "verdict": "neutral",
  "positives": [
   "graduation odds 3.86% (1.75× the base rate)",
   "336 wallets, net +5.4845 SOL"
  ],
  "risks": [
   "7 wallets sniped the launch slots"
  ],
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
  "dev": {
   "bought_sol": 0,
   "sold_sol": 0,
   "holds_pct": 0,
   "launches": 1,
   "graduated": 0,
   "verdict": [
    "no strong pattern"
   ]
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
   "… 2 more"
  ],
  "flags": [
   "950 of 950 trades use a curve layout we cannot decode: SOL amounts and PnL for this token are unreliable",
   "7 non-dev wallets bought within 2 slots of launch (bundle/sniper pattern)"
  ],
  "note": "a composite of pump_token + pump_dev + graduation odds; a ranking aid, not a prediction of price",
  "swap_url": "https://augur-trade.com/swap/?mint=2L2eDWq1G6YhREhEdnsGLxMLoWKH2AjgwmL3og42pump&src=synapse"
 }
}
```

</details>

---

### `counterparty_check`

**Counterparty check** · $0.005 · 10 free calls/day

One-call verdict on a Solana wallet before you deal with it: serial token launcher, fast dumper, trading bot, or clean.

Combines the wallet's pump.fun launch history (graduation rate, how fast it sells its own launches) with its trading profile into a risk level and reasons.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/counterparty_check` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `counterparty_check` |
| Price | $0.005 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `wallet` | string | yes | wallet address. Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/counterparty_check \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"wallet": "AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.counterpartyCheck({"wallet": "AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.counterparty_check(wallet='AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "counterparty_check", "arguments": {"wallet": "AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "counterparty_check",
 "ms": 2132,
 "billing": {
  "mode": "credits",
  "usd": 0.005
 },
 "data": {
  "wallet": "AbsisGdsxyHA7MueN1kZCTpBcGzMVw1F5qQZgnBWFERo",
  "risk_score": 75,
  "level": "high",
  "reasons": [
   "serial launcher: 518 tokens since 2026-09-11",
   "usually sells its own launches within 5 minutes",
   "pump.fun record: 739 closed, 46.7% wins, 3.5417 SOL realized"
  ],
  "launches": {
   "count": 518,
   "graduated": 11,
   "last": "2026-10-10T22:45:07.000Z"
  },
  "trading": {
   "classification": "active trader",
   "count": 739,
   "win_rate_pct": 46.7,
   "realized_pnl_sol": 3.5417,
   "median_hold_s": 22,
   "best": 0.8369,
   "worst": -0.4617
  },
  "scope": "pump.fun launch and curve-trading behaviour; does not cover CEX links or off-chain reputation"
 }
}
```

</details>

---

### `evm_token_security`

**EVM token security scan** · $0.005 · 10 free calls/day

Honeypot and scam check for any ERC-20 on 15+ EVM chains: buy/sell tax, can the owner mint, pause, blacklist or change taxes, proxy, holder concentration, LP lock.

GoPlus Security token analysis plus a plain verdict. Flags are the ones that actually drain buyers: honeypot (cannot sell), sell tax above 10%, hidden owner, owner can modify balances or taxes, trading cooldown, blacklist, self-destruct. Top holders and LP holders with lock status included.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/evm_token_security` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `evm_token_security` |
| Price | $0.005 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `token` | string | yes | ERC-20 contract address (0x + 40 hex). |
| `chain` | string (`ethereum`, `base`, `arbitrum`, `optimism`, `polygon`, `bsc`, `avalanche`, `linea`, `blast`, `scroll`, `gnosis`, `sonic`) |  | EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hyperevm, monad. One of "ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanche", "linea", "blast", "scroll", "gnosis", "sonic", "unichain", "mantle", "berachain", "hyperevm", "monad". Default "ethereum". (default `"ethereum"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/evm_token_security \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"token": "0xdac17f958d2ee523a2206206994597c13d831ec7", "chain": "ethereum"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.evmTokenSecurity({"token": "0xdac17f958d2ee523a2206206994597c13d831ec7", "chain": "ethereum"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.evm_token_security(token='0xdac17f958d2ee523a2206206994597c13d831ec7', chain='ethereum')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "evm_token_security", "arguments": {"token": "0xdac17f958d2ee523a2206206994597c13d831ec7", "chain": "ethereum"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "evm_token_security",
 "ms": 268,
 "billing": {
  "mode": "credits",
  "usd": 0.005
 },
 "data": {
  "found": true,
  "chain": "ethereum",
  "token": "0xdac17f958d2ee523a2206206994597c13d831ec7",
  "name": "Tether USD",
  "symbol": "USDT",
  "total_supply": "88302633055.702652",
  "holders": 15657092,
  "owner": "0xc6cde7c39eb2f0f0095f41570af89efc2c1ea828",
  "creator": "0x36928500bc1dcd7af6a2b4008875cc336b927d57",
  "verdict": "trusted (on GoPlus trust list)",
  "red_flags": [
   "owner can change balances",
   "owner can change taxes",
   "transfers can be paused",
   "… 2 more"
  ],
  "flags": {
   "honeypot": false,
   "cannot_sell_all": null,
   "cannot_buy": false,
   "buy_tax_pct": 0,
   "sell_tax_pct": 0,
   "transfer_tax_pct": null,
   "open_source": true,
   "proxy": false,
   "mintable": true,
   "owner_can_change_balance": true,
   "hidden_owner": false,
   "can_take_back_ownership": false,
   "self_destruct": false,
   "external_call": true,
   "tax_modifiable": true,
   "personal_tax_modifiable": false,
   "trading_cooldown": false,
   "transfer_pausable": true,
   "blacklist": true,
   "whitelist": false,
   "anti_whale": false,
   "airdrop_scam": null,
   "fake_token": null,
   "trust_list": true
  },
  "top_holders": [
   {
    "address": "0xf977814e90da44bfa03b6295a0616a897441acec",
    "pct": 18.12,
    "is_contract": false,
    "locked": false,
    "tag": null
   },
   {
    "address": "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503",
    "pct": 10.402,
    "is_contract": false,
    "locked": false,
    "tag": null
   },
   {
    "address": "0x835678a611b28684005a5e2233695fb6cbbb0007",
    "pct": 5.748,
    "is_contract": false,
    "locked": false,
    "tag": null
   },
   "… 7 more"
  ],
  "lp": [],
  "lp_holders": [],
  "source": "GoPlus Security",
  "explorer": "https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7"
 }
}
```

</details>

---

### `address_check`

**Address validator (any chain)** · free

Is this a valid address, and for which chain? EVM (with checksum fix), Solana (on-curve wallet vs PDA), Bitcoin (legacy/P2SH/SegWit/Taproot), Tron, Cosmos-style bech32.

Pure checksum and format validation, no network calls. Catches the typo that would send funds to nowhere, and tells a Solana wallet (on curve) from a program-derived address.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/address_check` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `address_check` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `address` | string | yes | Any string that might be a crypto address (EVM, Solana, Bitcoin, Tron, etc.). |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/address_check \
  -H 'Content-Type: application/json' \
  -d '{"address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.addressCheck({"address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.address_check(address='0xd8da6bf26964af9d7eed9e03e53415d37aa96045')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "address_check", "arguments": {"address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "address_check",
 "ms": 1,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  "matches": [
   {
    "chain": "evm",
    "valid": true,
    "checksummed": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "checksum_was_valid": "no checksum (all one case)",
    "note": "valid on every EVM chain"
   }
  ],
  "valid": true
 }
}
```

</details>

---

### `vuln_check`

**Dependency vulnerability check** · $0.002 · 10 free calls/day

Known security vulnerabilities for a package version (npm, PyPI, crates, Go, Maven, NuGet, RubyGems, Packagist) with severity, CVE/GHSA ids, and the version that fixes each.

Queries OSV.dev, the open vulnerability database that aggregates GitHub advisories, PyPA, RustSec, Go and more. Pass up to 50 packages at once as "ecosystem:name@version" to audit a lockfile.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/vuln_check` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `vuln_check` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `packages` | array of string |  | e.g. ["npm:lodash@4.17.15","pypi:requests@2.19.0"]. 0-50 items. |
| `name` | string |  | Exact package name as published. |
| `version` | string |  | Exact version to check, e.g. "4.17.1". |
| `ecosystem` | string |  | Package ecosystem: npm, PyPI, crates.io, Go, Maven, NuGet, RubyGems or Packagist. Default "npm". (default `"npm"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/vuln_check \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"packages": ["npm:lodash@4.17.15", "pypi:jinja2@2.10"]}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.vulnCheck({"packages": ["npm:lodash@4.17.15", "pypi:jinja2@2.10"]});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.vuln_check(packages=['npm:lodash@4.17.15', 'pypi:jinja2@2.10'])['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "vuln_check", "arguments": {"packages": ["npm:lodash@4.17.15", "pypi:jinja2@2.10"]}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "vuln_check",
 "ms": 1141,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "source": "OSV.dev",
  "checked": 2,
  "vulnerable": 2,
  "packages": [
   {
    "package": "npm:lodash",
    "version": "4.17.15",
    "vulnerable": true,
    "count": 6,
    "upgrade_to": "4.18.0",
    "vulns": [
     {
      "id": "GHSA-29mw-wpgm-hmr9",
      "aliases": [
       "CVE-2020-28500"
      ],
      "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
      "severity": "moderate",
      "fixed_in": "4.17.21",
      "published": "2022-01-06",
      "url": "https://osv.dev/vulnerability/GHSA-29mw-wpgm-hmr9"
     },
     {
      "id": "GHSA-35jh-r3h4-6jhm",
      "aliases": [
       "CVE-2021-23337"
      ],
      "summary": "Command Injection in lodash",
      "severity": "high",
      "fixed_in": "4.17.21",
      "published": "2021-05-06",
      "url": "https://osv.dev/vulnerability/GHSA-35jh-r3h4-6jhm"
     },
     {
      "id": "GHSA-f23m-r3pf-42rh",
      "aliases": [
       "CVE-2026-2950"
      ],
      "summary": "lodash vulnerable to Prototype Pollution via array path bypass in `_.unset` and `_.omit`",
      "severity": "moderate",
      "fixed_in": "4.18.0",
      "published": "2026-04-01",
      "url": "https://osv.dev/vulnerability/GHSA-f23m-r3pf-42rh"
     },
     "… 3 more"
    ]
   },
   {
    "package": "PyPI:jinja2",
    "version": "2.10",
    "vulnerable": true,
    "count": 12,
    "upgrade_to": "3.1.6",
    "vulns": [
     {
      "id": "GHSA-462w-v97r-4m45",
      "aliases": [
       "CVE-2019-10906",
       "PYSEC-2019-217"
      ],
      "summary": "Jinja2 sandbox escape via string formatting",
      "severity": "high",
      "fixed_in": "2.10.1",
      "published": "2019-04-10",
      "url": "https://osv.dev/vulnerability/GHSA-462w-v97r-4m45"
     },
     {
      "id": "GHSA-cpwx-vrp4-4pq7",
      "aliases": [
       "CVE-2025-27516",
       "PYSEC-2026-1471"
      ],
      "summary": "Jinja2 vulnerable to sandbox breakout through attr filter selecting format method",
      "severity": "moderate",
      "fixed_in": "3.1.6",
      "published": "2025-03-05",
      "url": "https://osv.dev/vulnerability/GHSA-cpwx-vrp4-4pq7"
     },
     {
      "id": "GHSA-g3rq-g295-4j3m",
      "aliases": [
       "CVE-2020-28493",
       "PYSEC-2021-66",
       "SNYK-PYTHON-JINJA2-1012994"
      ],
      "summary": "Regular Expression Denial of Service (ReDoS) in Jinja2",
      "severity": "moderate",
      "fixed_in": "2.11.3",
      "published": "2021-03-19",
      "url": "https://osv.dev/vulnerability/GHSA-g3rq-g295-4j3m"
     },
     "… 9 more"
    ]
   }
  ]
 }
}
```

</details>

---

[← All endpoints](README.md)
