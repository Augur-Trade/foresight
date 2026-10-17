# Paying for calls

Free tools need nothing. Paid tools cost $0.001 to $0.03 per call, and you are **only charged when the tool answers**.
There are four ways to pay, and every one works over HTTP and MCP.

| Way | Best for | How |
|---|---|---|
| **Free tier** | trying things | `X-Synapse-Free: 1` header: 10 paid calls per day per client (MCP gets it automatically) |
| **x402 on Solana** | agents with a Solana wallet | USDC (`TransferChecked`) or native SOL (`SystemProgram.transfer`). The exchange is its own facilitator and pays the network fee |
| **x402 on Base** | agents with an EVM wallet | USDC via EIP-3009 `transferWithAuthorization`, settled by the PayAI facilitator. You pay no gas |
| **Credit key** | high volume, no per-call signing | prepaid balance, `Authorization: Bearer hk_…`; funded keys are not rate limited |

## x402 flow

1. Call a paid tool without payment. You get **HTTP 402** with the payment requirements: an x402 v1 JSON body, plus an x402 v2 `PAYMENT-REQUIRED` header.
2. Pick one entry from `accepts` (network + asset), sign the transfer **without sending it**, and base64-encode the x402 payment payload.
3. Repeat the call with `X-PAYMENT: <payload>` (v1) or `PAYMENT-SIGNATURE: <payload>` (v2).
4. The exchange checks the payment, runs the tool, and settles **only if the tool answered**. The receipt comes back in the `X-PAYMENT-RESPONSE` header.

Already sent a transfer yourself? Pass its signature as `X-PAYMENT-TX: <signature>` instead.

Over MCP, put the same base64 payload in `params._meta["x402/payment"]` of `tools/call`. An unpaid call returns a result whose `_meta` holds the requirements.

Pay-to addresses:

| Network | Asset | Pay to |
|---|---|---|
| Solana | USDC `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` or native SOL | `RfmsJN8mYvE5Ggjc4yE8i3w5deZEUgRie6W6xehif6R` |
| Base | USDC `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | `0x538d1D8257C6001d7e432c90C6abc658948d7441` |

Working client: [`examples/node/x402-pay-solana.mjs`](../examples/node/x402-pay-solana.mjs). For Base, any standard x402 client (for example `x402-fetch`) works unchanged.

<details><summary><b>Real 402 response</b> (token_risk, $0.005)</summary>

```json
{
 "x402Version": 1,
 "error": "payment required",
 "accepts": [
  {
   "scheme": "exact",
   "payTo": "RfmsJN8mYvE5Ggjc4yE8i3w5deZEUgRie6W6xehif6R",
   "maxTimeoutSeconds": 90,
   "mimeType": "application/json",
   "resource": "https://augur-trade.com/hub/api/v1/tools/token_risk",
   "description": "Token risk score — 0-100 rug-risk score for any Solana token: mint/freeze authority, Token-2022 traps, holder concentration, liquidity depth — plus pump.fun curve flags.",
   "asset": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
   "extra": {
    "feePayer": "RfmsJN8mYvE5Ggjc4yE8i3w5deZEUgRie6W6xehif6R",
    "name": "USDC",
    "decimals": 6
   },
   "network": "solana",
   "maxAmountRequired": "5000"
  },
  {
   "scheme": "exact",
   "payTo": "0x538d1D8257C6001d7e432c90C6abc658948d7441",
   "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
   "maxTimeoutSeconds": 90,
   "mimeType": "application/json",
   "resource": "https://augur-trade.com/hub/api/v1/tools/token_risk",
   "description": "Token risk score — 0-100 rug-risk score for any Solana token: mint/freeze authority, Token-2022 traps, holder concentration, liquidity depth — plus pump.fun curve flags.",
   "extra": {
    "name": "USD Coin",
    "version": "2"
   },
   "network": "base",
   "maxAmountRequired": "5000"
  },
  {
   "scheme": "exact",
   "payTo": "RfmsJN8mYvE5Ggjc4yE8i3w5deZEUgRie6W6xehif6R",
   "maxTimeoutSeconds": 90,
   "mimeType": "application/json",
   "resource": "https://augur-trade.com/hub/api/v1/tools/token_risk",
   "description": "Token risk score — 0-100 rug-risk score for any Solana token: mint/freeze authority, Token-2022 traps, holder concentration, liquidity depth — plus pump.fun curve flags.",
   "asset": "11111111111111111111111111111111",
   "extra": {
    "feePayer": "RfmsJN8mYvE5Ggjc4yE8i3w5deZEUgRie6W6xehif6R",
    "name": "SOL",
    "decimals": 9,
    "native": true,
    "sol_usd": 104.5341,
    "note": "native SOL via SystemProgram.transfer (A.U.G.U.R Synapse extension to x402 exact)"
   },
   "network": "solana",
   "maxAmountRequired": "47832"
  }
 ],
 "price": {
  "usd": 0.005,
  "usdc_raw": "5000",
  "lamports": "47832"
 },
 "free_tier": "10 free paid-tool calls per day per client; used up",
 "other_ways_to_pay": {
  "credits": "POST /hub/api/v1/keys → key; POST /hub/api/v1/credits/invoice {key, usd} → pay SOL or USDC (Solana Pay reference); then send Authorization: Bearer <key>",
  "base": "x402 on Base: sign an EIP-3009 USDC authorization to 0x538d1D8257C6001d7e432c90C6abc658948d7441 (network \"base\" / \"eip155:8453\"); the facilitator pays gas",
  "receipt": "send 0.005 USD of USDC or SOL to RfmsJN8mYvE5Ggjc4yE8i3w5deZEUgRie6W6xehif6R yourself, then retry with header X-PAYMENT-TX: <signature> (single use, within 15 min)"
 },
 "docs": "https://augur-trade.com/hub/docs#payments"
}
```
</details>

## Credit keys

```bash
# 1. create a key (shown ONCE: store it)
curl -s -X POST https://augur-trade.com/hub/api/v1/keys
# 2. top up: returns Solana Pay links for SOL or USDC
curl -s -X POST https://augur-trade.com/hub/api/v1/credits/invoice -H 'Authorization: Bearer hk_…' -H 'Content-Type: application/json' -d '{"usd": 5}'
# 3. call any paid tool with the key
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/token_risk -H 'Authorization: Bearer hk_…' -H 'Content-Type: application/json' \
  -d '{"mint":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"}'
```

A manual deposit to the pay-to address works too: put the key id in the transfer memo.

| Endpoint | |
|---|---|
| `POST https://augur-trade.com/hub/api/v1/keys` | create a prepaid credit key |
| `POST https://augur-trade.com/hub/api/v1/credits/invoice` | `{"usd": number ≥ 0.1}` → Solana Pay invoice (SOL or USDC) |
