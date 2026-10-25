# Market Stem

Prices, balances and plain-language transactions — Solana plus 17 EVM chains.

7 tools · MCP server `https://augur-trade.com/hub/mcp/risk`

| Tool | What it does | Price |
|---|---|---|
| [`price`](#price) | USD price, 24h change and liquidity for up to 100 Solana mints; flags illiquid (dead) tokens. | free |
| [`wallet_holdings`](#wallet_holdings) | Everything a Solana wallet holds — SOL, SPL and Token-2022 tokens — valued in USD and sorted by value. | $0.003 |
| [`tx_explain`](#tx_explain) | Turns any Solana transaction signature into plain facts: status, fee, programs by name, SOL and token balance changes per owner, a one-line summary. | $0.003 |
| [`evm_address`](#evm_address) | Native balance (with USD), transaction count, contract or wallet, ENS name — for any address on 17 EVM chains at once or one chain. | $0.002 |
| [`erc20_info`](#erc20_info) | Name, symbol, decimals, total supply and USD price of any ERC-20 — plus a wallet's balance of it — read on chain. | $0.002 |
| [`evm_tx`](#evm_tx) | Any EVM transaction in plain terms: status, from/to, value, fee in native and USD, method called, every ERC-20 transfer decoded with symbols and amounts. | $0.003 |
| [`solana_network`](#solana_network) | Solana right now: TPS (total and non-vote), slot and block height, epoch progress and ETA, priority-fee percentiles, cluster version. | free |

---

### `price`

**Token prices** · free

USD price, 24h change and liquidity for up to 100 Solana mints; flags illiquid (dead) tokens.

Jupiter price data with a liquidity floor: anything under $1,000 of liquidity is flagged dead, because round-trip quotes on dead curves look fine and are not.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/price` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `price` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `mints` | array of string | yes | Solana token mint addresses (base58) to price. 1-100 items. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/price \
  -H 'Content-Type: application/json' \
  -d '{"mints": ["So11111111111111111111111111111111111111112", "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"]}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.price({"mints": ["So11111111111111111111111111111111111111112", "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"]});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.price(mints=['So11111111111111111111111111111111111111112', 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'])['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "price", "arguments": {"mints": ["So11111111111111111111111111111111111111112", "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"]}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "price",
 "ms": 33,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "prices": [
   {
    "mint": "So11111111111111111111111111111111111111112",
    "usd": 104.55151813079974,
    "change_24h_pct": -0.76,
    "liquidity_usd": 932758371,
    "dead": false
   },
   {
    "mint": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    "usd": 0.30352596930834874,
    "change_24h_pct": -2.65,
    "liquidity_usd": 5411691,
    "dead": false
   }
  ],
  "source": "Jupiter price v3"
 }
}
```

</details>

---

### `wallet_holdings`

**Wallet holdings** · $0.003 · 10 free calls/day

Everything a Solana wallet holds — SOL, SPL and Token-2022 tokens — valued in USD and sorted by value.

Reads token accounts from both token programs and prices them in one pass. Empty accounts are counted as reclaimable rent.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/wallet_holdings` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `wallet_holdings` |
| Price | $0.003 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `wallet` | string | yes | wallet address. Base58 Solana address, 32-44 chars. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/wallet_holdings \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"wallet": "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.walletHoldings({"wallet": "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.wallet_holdings(wallet='86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "wallet_holdings", "arguments": {"wallet": "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "wallet_holdings",
 "ms": 372,
 "billing": {
  "mode": "credits",
  "usd": 0.003
 },
 "data": {
  "wallet": "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY",
  "sol": 1328.549876,
  "sol_usd": 138899.13,
  "tokens_usd": 1161435.87,
  "total_usd": 1300335,
  "tokens": [
   {
    "mint": "AT79ReYU9XtHUTF5vM6Q4oa9K8w7918Fp5SU7G1MDMQY",
    "amount": 500000000,
    "decimals": 9,
    "program": "spl-token",
    "usd_price": 0.0023123216556688616,
    "usd_value": 1156160.83,
    "dead": false
   },
   {
    "mint": "Du5jeHGyytXijZ5JCnahMscVMYDghFazx7fb8P1sdXkC",
    "amount": 10500000000,
    "decimals": 6,
    "program": "spl-token",
    "usd_price": 2.532948677551325e-07,
    "usd_value": 2659.6,
    "dead": false
   },
   {
    "mint": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    "amount": 397586970.55337,
    "decimals": 5,
    "program": "spl-token",
    "usd_price": 3.059212180016623e-06,
    "usd_value": 1216.3,
    "dead": false
   },
   "… 97 more"
  ],
  "token_accounts": 1099,
  "empty_accounts": {
   "count": 9,
   "reclaimable_sol": 0.018806
  },
  "source": "rpc"
 }
}
```

</details>

---

### `tx_explain`

**Explain a transaction** · $0.003 · 10 free calls/day

Turns any Solana transaction signature into plain facts: status, fee, programs by name, SOL and token balance changes per owner, a one-line summary.

Works for swaps, pump.fun trades, LP moves, transfers and failures (includes the error log lines).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/tx_explain` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `tx_explain` |
| Price | $0.003 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `signature` | string | yes | Solana transaction signature (base58, 64-90 chars). |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/tx_explain \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"signature": "4e1vcgjBw2yfNTzGSneQdmY87G1ubgTQNvzsbyN9oPMdFmFKvaAx9UnXM1VaKnY7MFRfV5Mx2xtcNaEkrifmA5u8"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.txExplain({"signature": "4e1vcgjBw2yfNTzGSneQdmY87G1ubgTQNvzsbyN9oPMdFmFKvaAx9UnXM1VaKnY7MFRfV5Mx2xtcNaEkrifmA5u8"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.tx_explain(signature='4e1vcgjBw2yfNTzGSneQdmY87G1ubgTQNvzsbyN9oPMdFmFKvaAx9UnXM1VaKnY7MFRfV5Mx2xtcNaEkrifmA5u8')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "tx_explain", "arguments": {"signature": "4e1vcgjBw2yfNTzGSneQdmY87G1ubgTQNvzsbyN9oPMdFmFKvaAx9UnXM1VaKnY7MFRfV5Mx2xtcNaEkrifmA5u8"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "tx_explain",
 "ms": 65,
 "billing": {
  "mode": "credits",
  "usd": 0.003
 },
 "data": {
  "found": false,
  "signature": "4e1vcgjBw2yfNTzGSneQdmY87G1ubgTQNvzsbyN9oPMdFmFKvaAx9UnXM1VaKnY7MFRfV5Mx2xtcNaEkrifmA5u8"
 }
}
```

</details>

---

### `evm_address`

**EVM address lookup** · $0.002 · 10 free calls/day

Native balance (with USD), transaction count, contract or wallet, ENS name — for any address on 17 EVM chains at once or one chain.

Reads straight from each chain's RPC. chain="all" checks every supported chain in parallel and returns only where the address has balance, transactions or code — the quick "where is this wallet active" answer.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/evm_address` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `evm_address` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `address` | string | yes | EVM wallet or contract address (0x + 40 hex). |
| `chain` | string (`all`, `ethereum`, `base`, `arbitrum`, `optimism`, `polygon`, `bsc`, `avalanche`, `linea`, `blast`, `scroll`, `gnosis`) |  | Chain to read, or "all" to check every supported chain. One of "all", "ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanche", "linea", "blast", "scroll", "gnosis", "sonic", "unichain", "mantle", "berachain", "hyperevm", "monad". Default "all". (default `"all"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/evm_address \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "chain": "all"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.evmAddress({"address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "chain": "all"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.evm_address(address='0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chain='all')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "evm_address", "arguments": {"address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "chain": "all"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "evm_address",
 "ms": 813,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "ens_name": "vitalik.eth",
  "total_native_usd": 22775.92,
  "chains_checked": 17,
  "chains": [
   {
    "chain": "ethereum",
    "native_symbol": "ETH",
    "native_balance": 5.76972533,
    "usd": 13984.19,
    "tx_count": 5969,
    "kind": "wallet (EOA) with EIP-7702 delegation",
    "delegated_to": "0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d",
    "explorer": "https://etherscan.io/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   },
   {
    "chain": "base",
    "native_symbol": "ETH",
    "native_balance": 3.1288218,
    "usd": 7583.38,
    "tx_count": 70,
    "kind": "wallet (EOA) with EIP-7702 delegation",
    "delegated_to": "0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d",
    "explorer": "https://basescan.org/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   },
   {
    "chain": "arbitrum",
    "native_symbol": "ETH",
    "native_balance": 0.15941176,
    "usd": 386.37,
    "tx_count": 14,
    "kind": "wallet (EOA)",
    "explorer": "https://arbiscan.io/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
   },
   "… 14 more"
  ]
 }
}
```

</details>

---

### `erc20_info`

**ERC-20 token + balance** · $0.002 · 10 free calls/day

Name, symbol, decimals, total supply and USD price of any ERC-20 — plus a wallet's balance of it — read on chain.

Direct contract calls (name/symbol/decimals/totalSupply/balanceOf) on the chosen EVM chain, priced via DefiLlama. Works for any token, listed or not.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/erc20_info` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `erc20_info` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `token` | string | yes | ERC-20 contract address (0x + 40 hex). |
| `wallet` | string |  | optional holder. 0x + 40 hex chars. |
| `chain` | string (`ethereum`, `base`, `arbitrum`, `optimism`, `polygon`, `bsc`, `avalanche`, `linea`, `blast`, `scroll`, `gnosis`, `sonic`) |  | EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hyperevm, monad. One of "ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanche", "linea", "blast", "scroll", "gnosis", "sonic", "unichain", "mantle", "berachain", "hyperevm", "monad". Default "ethereum". (default `"ethereum"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/erc20_info \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"token": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "wallet": "0x3304E22DDaa22bCdC5fCa2269b418046aE7b566A", "chain": "base"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.erc20Info({"token": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "wallet": "0x3304E22DDaa22bCdC5fCa2269b418046aE7b566A", "chain": "base"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.erc20_info(token='0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', wallet='0x3304E22DDaa22bCdC5fCa2269b418046aE7b566A', chain='base')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "erc20_info", "arguments": {"token": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "wallet": "0x3304E22DDaa22bCdC5fCa2269b418046aE7b566A", "chain": "base"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "erc20_info",
 "ms": 439,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "found": true,
  "chain": "base",
  "token": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "name": "USD Coin",
  "symbol": "USDC",
  "decimals": 6,
  "total_supply": 4401517231.080066,
  "price_usd": 0.9997562166782159,
  "fdv_usd": 4400444215,
  "wallet": "0x3304E22DDaa22bCdC5fCa2269b418046aE7b566A",
  "balance": 79709.10502,
  "balance_usd": 79689.67,
  "explorer": "https://basescan.org/token/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
 }
}
```

</details>

---

### `evm_tx`

**Explain an EVM transaction** · $0.003 · 10 free calls/day

Any EVM transaction in plain terms: status, from/to, value, fee in native and USD, method called, every ERC-20 transfer decoded with symbols and amounts.

Fetches the transaction and receipt from the chain, decodes ERC-20 Transfer events (token symbols/decimals read on chain), and prices the fee.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/evm_tx` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `evm_tx` |
| Price | $0.003 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `hash` | string | yes | EVM transaction hash (0x + 64 hex). |
| `chain` | string (`ethereum`, `base`, `arbitrum`, `optimism`, `polygon`, `bsc`, `avalanche`, `linea`, `blast`, `scroll`, `gnosis`, `sonic`) |  | EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hyperevm, monad. One of "ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanche", "linea", "blast", "scroll", "gnosis", "sonic", "unichain", "mantle", "berachain", "hyperevm", "monad". Default "ethereum". (default `"ethereum"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/evm_tx \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"hash": "0xedc1ff7d3ac9efa7f6cb95814ea54b8a49c4118807769d84fa17260f21bb80ad", "chain": "ethereum"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.evmTx({"hash": "0xedc1ff7d3ac9efa7f6cb95814ea54b8a49c4118807769d84fa17260f21bb80ad", "chain": "ethereum"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.evm_tx(hash='0xedc1ff7d3ac9efa7f6cb95814ea54b8a49c4118807769d84fa17260f21bb80ad', chain='ethereum')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "evm_tx", "arguments": {"hash": "0xedc1ff7d3ac9efa7f6cb95814ea54b8a49c4118807769d84fa17260f21bb80ad", "chain": "ethereum"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "evm_tx",
 "ms": 350,
 "billing": {
  "mode": "credits",
  "usd": 0.003
 },
 "data": {
  "found": true,
  "chain": "ethereum",
  "hash": "0xedc1ff7d3ac9efa7f6cb95814ea54b8a49c4118807769d84fa17260f21bb80ad",
  "status": "pending",
  "block": 26061969,
  "time": "2026-09-26T13:37:11.000Z",
  "from": "0x6aB0E960911b50f6d14f249782ac12EC3E7584A0",
  "to": "0x759894Ced0e6af42c26668076Ffa84d02E3CeF60",
  "contract_created": null,
  "value": 0,
  "value_symbol": "ETH",
  "value_usd": 0,
  "method_selector": "0x41f756da",
  "plain_transfer": false,
  "gas_used": null,
  "gas_price_gwei": 0.0621,
  "fee_native": null,
  "fee_usd": null,
  "token_transfers": [],
  "logs": null,
  "explorer": "https://etherscan.io/tx/0xedc1ff7d3ac9efa7f6cb95814ea54b8a49c4118807769d84fa17260f21bb80ad"
 }
}
```

</details>

---

### `solana_network`

**Solana network status** · free

Solana right now: TPS (total and non-vote), slot and block height, epoch progress and ETA, priority-fee percentiles, cluster version.

Read from mainnet RPC: recent performance samples, epoch info, prioritization fees.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/solana_network` |
| MCP | `https://augur-trade.com/hub/mcp/risk` → tool `solana_network` |
| Price | free |

**Arguments**

_No arguments: send `{}`._

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/solana_network \
  -H 'Content-Type: application/json' \
  -d '{}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.solanaNetwork();
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.solana_network()['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "solana_network", "arguments": {}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "solana_network",
 "ms": 341,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "tps_total": 4639,
  "tps_non_vote": 1550,
  "avg_slot_ms": 216.5,
  "slot": 457901615,
  "block_height": 435937014,
  "epoch": 1059,
  "epoch_progress_pct": 95.74,
  "epoch_ends_in_hours": 1.11,
  "priority_fee_micro_lamports_per_cu": {
   "p25": 0,
   "p50": 0,
   "p75": 3373,
   "p90": 50000,
   "slot_sampled": 457901637,
   "non_vote_txs_sampled": 258,
   "share_paying_no_priority_pct": 70.9
  },
  "version": "4.3.0",
  "window_minutes": 30
 }
}
```

</details>

---

[← All endpoints](README.md)
