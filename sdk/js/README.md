# augur-synapse (JavaScript)

Zero-dependency client, one method per endpoint, generated from the live catalog. Node 18+, browsers, Deno and Bun.

```js
import { Synapse } from './augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });   // or { freeTier: true }, or { pay }
const { data } = await synapse.launchScan({ mint: '<pump.fun mint>' });
```

- `synapse.call(toolId, args)` calls any tool by id; every tool also has a camelCase method (`token_risk` → `tokenRisk`).
- `pay` hook for x402: receives the 402 body and returns a base64 `X-PAYMENT` payload. See [`examples/node/x402-pay-solana.mjs`](../../examples/node/x402-pay-solana.mjs).
- Errors throw `SynapseError` with `.status` and `.body`.
