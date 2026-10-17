# Responses and errors

Every tool call returns the same envelope:

```json
{ "ok": true, "tool": "price", "ms": 84, "billing": { "mode": "free", "usd": 0 }, "data": { … } }
```

| Status | Meaning | What to do |
|---|---|---|
| `200` | the tool answered; `data` holds the result | |
| `402` | payment required (x402 requirements in the body + `PAYMENT-REQUIRED` header) | pay and retry, use a credit key, or add `X-Synapse-Free: 1` |
| `422` | invalid arguments; `error` names the field | fix the input (schemas are in [`spec/tools.json`](../spec/tools.json)) |
| `429` | too many calls from one client | back off; funded credit keys are not rate limited |
| `502` | an upstream source failed; `retryable: true` when a retry can help | retry later. You are not charged |

Limits: 300 calls/min anonymous, 1,200/min with x402 headers, unlimited with a funded credit key.
Upstream rate limits are absorbed on the exchange side (caching and pacing), so you never see a provider's limits.
