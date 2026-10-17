# Push alerts (webhooks)

Watch a pump.fun mint or any Solana wallet and get a signed webhook when something happens. Each delivered alert costs
a fraction of a cent from your credit key, and failed deliveries are refunded.

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/watches -H 'Authorization: Bearer hk_…' -H 'Content-Type: application/json' -d '{
  "mint": "<pump.fun mint>", "events": ["dev_sell", "graduated", "big_buy", "big_sell", "smart_buy"],
  "min_sol": 2, "url": "https://your-agent.example/webhook", "ttl_hours": 24 }'
# or a wallet: {"wallet": "<address>", "events": ["wallet_trade", "wallet_launch"], "url": "…"}
```

The reply holds a `secret` (`whsec_…`). Every delivery is a JSON POST with the header
`X-Synapse-Signature: sha256=<hex>`, the HMAC-SHA256 of the **raw body** with that secret.
Verify it before you trust the payload: [`examples/webhooks/verify.mjs`](../examples/webhooks/verify.mjs) · [`verify.py`](../examples/webhooks/verify.py)

| Endpoint | |
|---|---|
| `POST https://augur-trade.com/hub/api/v1/watches` | create a watch (`url` required; `mint` or `wallet`; `events`, `min_sol`, `ttl_hours` ≤ 72) |
| `GET https://augur-trade.com/hub/api/v1/watches` | your watches |
| `DELETE https://augur-trade.com/hub/api/v1/watches/{id}` | stop one |

Events: `dev_sell`, `graduated`, `big_buy`, `big_sell`, `smart_buy` (mints) · `wallet_trade`, `wallet_launch` (wallets).
