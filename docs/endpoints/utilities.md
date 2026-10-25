# Utility Cerebellum

Exact local tools with no upstream and no limits: QR codes, hashing and encoding, JSON Schema, cron, markdown, diffs, units, JWTs, secure random and text stats.

10 tools · MCP server `https://augur-trade.com/hub/mcp/util`

| Tool | What it does | Price |
|---|---|---|
| [`qr_code`](#qr_code) | Make a QR code for any text, URL, Solana Pay / wallet address or Wi-Fi login — as a PNG (base64 data URL) or SVG, with size, margin, colours and error correction. | free |
| [`hash_encode`](#hash_encode) | Hash data (SHA-256/512, SHA3, Keccak-256, BLAKE2, MD5, SHA-1, RIPEMD-160, HMAC) and convert between utf8, hex, base64, base64url and base58 — exact, in one call. | free |
| [`json_schema_validate`](#json_schema_validate) | Validate JSON data against a JSON Schema (draft-07/2019-09/2020-12, formats like email/uri/date-time) and get every error with its exact path — check tool I/O before acting on it. | free |
| [`cron_explain`](#cron_explain) | Explain a cron expression in plain English and list its next N run times in any time zone — catch a schedule mistake before it fires at 3 am. | free |
| [`markdown_convert`](#markdown_convert) | Convert Markdown to clean HTML (GitHub-flavoured: tables, task lists, fenced code) or HTML back to Markdown. | free |
| [`text_diff`](#text_diff) | Diff two texts: unified diff (patch format), a line/word-level change list, and similarity % — compare versions of a doc, config or code. | free |
| [`unit_convert`](#unit_convert) | Convert between units of length, mass, volume, temperature, speed, area, time, data size, energy, power, pressure, frequency and more — or list every unit a value converts to. | free |
| [`jwt_decode`](#jwt_decode) | Decode a JSON Web Token's header and claims, show issued/expiry times in plain dates and whether it has expired — optionally verify an HS256/384/512 signature with a secret. | free |
| [`random_gen`](#random_gen) | Cryptographically secure randomness: UUID v4/v7, passwords, API-key-style tokens, integers in a range, dice, coin flips, or a fair shuffle / pick from a list. | free |
| [`text_stats`](#text_stats) | Count characters, words, sentences, lines and paragraphs, estimate LLM tokens, reading time and readability (Flesch), and pull out every URL, email, @handle, #tag, number and crypto address. | free |

---

### `qr_code`

**QR code generator** · free

Make a QR code for any text, URL, Solana Pay / wallet address or Wi-Fi login — as a PNG (base64 data URL) or SVG, with size, margin, colours and error correction.

Rendered on our server. For Wi-Fi pass wifi_ssid + wifi_password; for Solana Pay pass a solana: URI as text.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/qr_code` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `qr_code` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `text` | string |  | Text or URL to encode (ignored when wifi_ssid is set). |
| `format` | string (`png`, `svg`) |  | PNG (base64 data URL) or SVG markup. One of "png", "svg". Default "png". (default `"png"`) |
| `size` | integer |  | Image width/height in pixels. Range 64-2048. Default 512. (default `512`, range 64–2048) |
| `margin` | integer |  | Quiet-zone width in modules. Range 0-16. Default 2. (default `2`, range 0–16) |
| `error_correction` | string (`L`, `M`, `Q`, `H`) |  | Error-correction level: L 7%, M 15%, Q 25%, H 30%. One of "L", "M", "Q", "H". Default "M". (default `"M"`) |
| `dark` | string |  | Foreground colour as #rrggbb. Default "#000000". (default `"#000000"`) |
| `light` | string |  | Background colour as #rrggbb. Default "#ffffff". (default `"#ffffff"`) |
| `wifi_ssid` | string |  | Wi-Fi network name; makes a join-network QR instead of text. |
| `wifi_password` | string |  | Wi-Fi password (with wifi_ssid; omit for open networks). |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/qr_code \
  -H 'Content-Type: application/json' \
  -d '{"text": "https://example.com", "format": "svg", "size": 256}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.qrCode({"text": "https://example.com", "format": "svg", "size": 256});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.qr_code(text='https://example.com', format='svg', size=256)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "qr_code", "arguments": {"text": "https://example.com", "format": "svg", "size": 256}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "qr_code",
 "ms": 12,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "format": "svg",
  "encoded": "https://example.com",
  "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"256\" height=\"256\" viewBox=\"0 0 29 29\" shape-rendering=\"crispEdges\"><path fill=\"#ffffff\" d=\"M0 0h29v29H0z\"/><path stroke=\"#000000\" d=\"M2 2.5h7m4 0h3m2 0h1m1 0h7M2 3.5h1m5 0h1m3 0h1m2 0h4m1 0h1m5 0h1M2 4.5h1m1 0h3m1 0h1m1 0h2m1 0h1m2 0…"
 }
}
```

</details>

---

### `hash_encode`

**Hash + encode/decode** · free

Hash data (SHA-256/512, SHA3, Keccak-256, BLAKE2, MD5, SHA-1, RIPEMD-160, HMAC) and convert between utf8, hex, base64, base64url and base58 — exact, in one call.

Useful for signatures, content addressing, EVM selectors (keccak of a function signature), and decoding blobs agents are handed. Input can itself be hex/base64/base58.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/hash_encode` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `hash_encode` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `input` | string | yes | Data to hash or re-encode. |
| `input_encoding` | string (`utf8`, `hex`, `base64`, `base58`) |  | How the input string is encoded. One of "utf8", "hex", "base64", "base58". Default "utf8". (default `"utf8"`) |
| `hashes` | array of string |  | sha256, sha512, sha3-256, sha3-512, keccak256, blake2b512, blake2s256, md5, sha1, ripemd160. 0-12 items. Default ["sha256","keccak256"]. (default `["sha256", "keccak256"]`) |
| `hmac_key` | string |  | if set, HMAC instead of plain hash (utf8 key) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/hash_encode \
  -H 'Content-Type: application/json' \
  -d '{"input": "transfer(address,uint256)", "hashes": ["keccak256", "sha256"]}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.hashEncode({"input": "transfer(address,uint256)", "hashes": ["keccak256", "sha256"]});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.hash_encode(input='transfer(address,uint256)', hashes=['keccak256', 'sha256'])['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "hash_encode", "arguments": {"input": "transfer(address,uint256)", "hashes": ["keccak256", "sha256"]}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "hash_encode",
 "ms": 1,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "bytes": 25,
  "hashes": {
   "keccak256": "0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b",
   "sha256": "3b88ef57741163446a56d5b602d54622bc234e5511bc6ce011ceec1cfb8e0578",
   "evm_selector": "0xa9059cbb"
  },
  "encodings": {
   "utf8": "transfer(address,uint256)",
   "hex": "7472616e7366657228616464726573732c75696e7432353629",
   "base64": "dHJhbnNmZXIoYWRkcmVzcyx1aW50MjU2KQ==",
   "base64url": "dHJhbnNmZXIoYWRkcmVzcyx1aW50MjU2KQ",
   "base58": "ordky7zSETcJTRFKJUoGLkUVcDh1eitC9e"
  }
 }
}
```

</details>

---

### `json_schema_validate`

**JSON Schema validator** · free

Validate JSON data against a JSON Schema (draft-07/2019-09/2020-12, formats like email/uri/date-time) and get every error with its exact path — check tool I/O before acting on it.

Ajv, strict about types, all errors reported. Pass data and schema as JSON values (or JSON strings).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/json_schema_validate` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `json_schema_validate` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `data` | any | yes | any JSON value (or a JSON string with parse_strings=true) |
| `schema` | object | yes | The JSON Schema to validate against. |
| `parse_strings` | boolean |  | true = if data is a string, parse it as JSON first. Default false. (default `false`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/json_schema_validate \
  -H 'Content-Type: application/json' \
  -d '{"data": {"name": "Ada", "age": -1, "email": "nope"}, "schema": {"type": "object", "required": ["name", "age"], "properties": {"name": {"type": "string"}, "age": {"type": "integer", "minimum": 0}, "email": {"type": "string", "format": "email"}}}}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.jsonSchemaValidate({"data": {"name": "Ada", "age": -1, "email": "nope"}, "schema": {"type": "object", "required": ["name", "age"], "properties": {"name": {"type": "string"}, "age": {"type": "integer", "minimum": 0}, "email": {"type": "string", "format": "email"}}}});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.json_schema_validate(data={'name': 'Ada', 'age': -1, 'email': 'nope'}, schema={'type': 'object', 'required': ['name', 'age'], 'properties': {'name': {'type': 'string'}, 'age': {'type': 'integer', 'minimum': 0}, 'email': {'type': 'string', 'format': 'email'}}})['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "json_schema_validate", "arguments": {"data": {"name": "Ada", "age": -1, "email": "nope"}, "schema": {"type": "object", "required": ["name", "age"], "properties": {"name": {"type": "string"}, "age": {"type": "integer", "minimum": 0}, "email": {"type": "string", "format": "email"}}}}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "json_schema_validate",
 "ms": 49,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "valid": false,
  "error_count": 2,
  "errors": [
   {
    "path": "/age",
    "message": "must be >= 0",
    "keyword": "minimum",
    "params": {
     "comparison": ">=",
     "limit": 0
    }
   },
   {
    "path": "/email",
    "message": "must match format \"email\"",
    "keyword": "format",
    "params": {
     "format": "email"
    }
   }
  ]
 }
}
```

</details>

---

### `cron_explain`

**Cron expression explain + next runs** · free

Explain a cron expression in plain English and list its next N run times in any time zone — catch a schedule mistake before it fires at 3 am.

Supports 5-field and 6-field (seconds) cron, ranges, steps, L/W/#, and nicknames (@daily, @hourly…).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/cron_explain` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `cron_explain` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `expression` | string | yes | Cron expression, 5 fields (or 6 with seconds), e.g. "*/15 9-17 * * 1-5". |
| `tz` | string |  | IANA time zone for the next-run times. Default "UTC". (default `"UTC"`) |
| `count` | integer |  | How many upcoming run times to list. Range 1-50. Default 5. (default `5`, range 1–50) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/cron_explain \
  -H 'Content-Type: application/json' \
  -d '{"expression": "*/15 9-17 * * 1-5", "tz": "America/New_York", "count": 4}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.cronExplain({"expression": "*/15 9-17 * * 1-5", "tz": "America/New_York", "count": 4});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.cron_explain(expression='*/15 9-17 * * 1-5', tz='America/New_York', count=4)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "cron_explain", "arguments": {"expression": "*/15 9-17 * * 1-5", "tz": "America/New_York", "count": 4}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "cron_explain",
 "ms": 14,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "valid": true,
  "expression": "*/15 9-17 * * 1-5",
  "meaning": "Every 15 minutes, between 09:00 and 17:59, Monday through Friday",
  "tz": "America/New_York",
  "next_runs": [
   {
    "utc": "2026-10-19T13:00:00.000Z",
    "local": "2026-10-19T09:00:00"
   },
   {
    "utc": "2026-10-19T13:15:00.000Z",
    "local": "2026-10-19T09:15:00"
   },
   {
    "utc": "2026-10-19T13:30:00.000Z",
    "local": "2026-10-19T09:30:00"
   },
   "… 1 more"
  ]
 }
}
```

</details>

---

### `markdown_convert`

**Markdown ⇄ HTML** · free

Convert Markdown to clean HTML (GitHub-flavoured: tables, task lists, fenced code) or HTML back to Markdown.

marked for md→html, Turndown for html→md. Scripts/styles are dropped on html→md.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/markdown_convert` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `markdown_convert` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `input` | string | yes | Markdown or HTML to convert. |
| `to` | string (`html`, `markdown`) |  | Target format. One of "html", "markdown". Default "html". (default `"html"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/markdown_convert \
  -H 'Content-Type: application/json' \
  -d '{"input": "# Hello\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n- [x] done", "to": "html"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.markdownConvert({"input": "# Hello\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n- [x] done", "to": "html"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.markdown_convert(input='# Hello\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n- [x] done', to='html')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "markdown_convert", "arguments": {"input": "# Hello\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n- [x] done", "to": "html"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "markdown_convert",
 "ms": 13,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "to": "html",
  "output": "<h1>Hello</h1>\n<table>\n<thead>\n<tr>\n<th>a</th>\n<th>b</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>2</td>\n</tr>\n</tbody></table>\n<ul>\n<li><input checked=\"\" disabled=\"\" type=\"checkbox\"> done</li>\n</ul>\n"
 }
}
```

</details>

---

### `text_diff`

**Text diff** · free

Diff two texts: unified diff (patch format), a line/word-level change list, and similarity % — compare versions of a doc, config or code.

jsdiff. mode=lines gives a unified patch; mode=words gives word-level changes for prose.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/text_diff` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `text_diff` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `a` | string | yes | Original text. |
| `b` | string | yes | Changed text. |
| `mode` | string (`lines`, `words`) |  | Diff granularity. One of "lines", "words". Default "lines". (default `"lines"`) |
| `context` | integer |  | Unchanged lines of context around each change in the patch. Range 0-20. Default 3. (default `3`, range 0–20) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/text_diff \
  -H 'Content-Type: application/json' \
  -d '{"a": "rate limit: 10/min\nretries: 2\n", "b": "rate limit: 120/min\nretries: 2\ntimeout: 30s\n"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.textDiff({"a": "rate limit: 10/min\nretries: 2\n", "b": "rate limit: 120/min\nretries: 2\ntimeout: 30s\n"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.text_diff(a='rate limit: 10/min\nretries: 2\n', b='rate limit: 120/min\nretries: 2\ntimeout: 30s\n')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "text_diff", "arguments": {"a": "rate limit: 10/min\nretries: 2\n", "b": "rate limit: 120/min\nretries: 2\ntimeout: 30s\n"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "text_diff",
 "ms": 2,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "identical": false,
  "similarity_pct": 29.73,
  "chars_added": 33,
  "chars_removed": 19,
  "unified": "===================================================================\n--- a\n+++ b\n@@ -1,2 +1,3 @@\n-rate limit: 10/min\n+rate limit: 120/min\n retries: 2\n+timeout: 30s\n",
  "changes": [
   {
    "op": "remove",
    "text": "rate limit: 10/min\n"
   },
   {
    "op": "add",
    "text": "rate limit: 120/min\n"
   },
   {
    "op": "add",
    "text": "timeout: 30s\n"
   }
  ]
 }
}
```

</details>

---

### `unit_convert`

**Unit converter** · free

Convert between units of length, mass, volume, temperature, speed, area, time, data size, energy, power, pressure, frequency and more — or list every unit a value converts to.

Exact conversion tables (convert-units). Use abbreviations: m, km, mi, ft, kg, lb, oz, l, gal, C, F, K, km/h, mph, knot, B, KB, MB, GB (binary, 1 GB = 1024 MB), J, kWh, W, Pa, bar, psi, Hz…

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/unit_convert` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `unit_convert` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `value` | number | yes | Number to convert. |
| `from` | string | yes | Source unit, e.g. "mi", "kg", "degF", "GB". |
| `to` | string |  | omit to get every compatible unit |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/unit_convert \
  -H 'Content-Type: application/json' \
  -d '{"value": 100, "from": "km/h", "to": "mph"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.unitConvert({"value": 100, "from": "km/h", "to": "mph"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.unit_convert(value=100, from_='km/h', to='mph')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "unit_convert", "arguments": {"value": 100, "from": "km/h", "to": "mph"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "unit_convert",
 "ms": 1,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "value": 100,
  "from": "km/h",
  "to": "mph",
  "result": 62.1371192237
 }
}
```

</details>

---

### `jwt_decode`

**JWT decoder** · free

Decode a JSON Web Token's header and claims, show issued/expiry times in plain dates and whether it has expired — optionally verify an HS256/384/512 signature with a secret.

Decoding does not need the key. Never paste production secrets into third-party tools you do not trust; verification here is local and nothing is stored or logged.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/jwt_decode` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `jwt_decode` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `token` | string | yes | The JWT (three base64url parts). The signature is not verified. |
| `secret` | string |  | optional HMAC secret to verify HS* signatures |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/jwt_decode \
  -H 'Content-Type: application/json' \
  -d '{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGYiLCJpYXQiOjE3OTAwMDAwMDAsImV4cCI6MTc5MDAwMzYwMH0.kS2XSeH9sgBX7w0Zm6D7g8Eo3HjQyGAJk1S1vXbFpXE"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.jwtDecode({"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGYiLCJpYXQiOjE3OTAwMDAwMDAsImV4cCI6MTc5MDAwMzYwMH0.kS2XSeH9sgBX7w0Zm6D7g8Eo3HjQyGAJk1S1vXbFpXE"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.jwt_decode(token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGYiLCJpYXQiOjE3OTAwMDAwMDAsImV4cCI6MTc5MDAwMzYwMH0.kS2XSeH9sgBX7w0Zm6D7g8Eo3HjQyGAJk1S1vXbFpXE')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "jwt_decode", "arguments": {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGYiLCJpYXQiOjE3OTAwMDAwMDAsImV4cCI6MTc5MDAwMzYwMH0.kS2XSeH9sgBX7w0Zm6D7g8Eo3HjQyGAJk1S1vXbFpXE"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "jwt_decode",
 "ms": 0,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "header": {
   "alg": "HS256",
   "typ": "JWT"
  },
  "payload": {
   "sub": "alf",
   "iat": 1790000000,
   "exp": 1790003600
  },
  "issued_at": "2026-09-21T14:13:20.000Z",
  "not_before": null,
  "expires_at": "2026-09-21T15:13:20.000Z",
  "expired": true,
  "seconds_left": -2207298,
  "signature": "not checked"
 }
}
```

</details>

---

### `random_gen`

**Secure random + IDs** · free

Cryptographically secure randomness: UUID v4/v7, passwords, API-key-style tokens, integers in a range, dice, coin flips, or a fair shuffle / pick from a list.

Node's CSPRNG. Output is generated fresh per call and never stored or logged.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/random_gen` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `random_gen` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `kind` | string (`uuid4`, `uuid7`, `password`, `token`, `int`, `shuffle`, `pick`, `coin`, `dice`) |  | What to generate. One of "uuid4", "uuid7", "password", "token", "int", "shuffle", "pick", "coin", "dice". Default "uuid4". (default `"uuid4"`) |
| `count` | integer |  | How many values to generate. Range 1-100. Default 1. (default `1`, range 1–100) |
| `length` | integer |  | Length for passwords and tokens. Range 4-256. Default 20. (default `20`, range 4–256) |
| `min` | integer |  | Lowest integer (kind=int or dice sides). Default 1. (default `1`) |
| `max` | integer |  | Highest integer (kind=int). Default 100. (default `100`) |
| `items` | array of string |  | List to shuffle or pick from (kind=shuffle or pick). 0-1000 items. |
| `symbols` | boolean |  | Include symbols in passwords. Default true. (default `true`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/random_gen \
  -H 'Content-Type: application/json' \
  -d '{"kind": "password", "count": 2, "length": 24}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.randomGen({"kind": "password", "count": 2, "length": 24});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.random_gen(kind='password', count=2, length=24)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "random_gen", "arguments": {"kind": "password", "count": 2, "length": 24}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "random_gen",
 "ms": 1,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "kind": "password",
  "result": [
   "_qpR2PHF4H#KpgqCSdU=8cLx",
   "=+ycKx7W?Kqo=GMj?#EJU*eU"
  ]
 }
}
```

</details>

---

### `text_stats`

**Text stats + token estimate** · free

Count characters, words, sentences, lines and paragraphs, estimate LLM tokens, reading time and readability (Flesch), and pull out every URL, email, @handle, #tag, number and crypto address.

Token count is an estimate (~4 characters per token for English; code and non-Latin scripts differ). Extraction uses strict patterns; EVM addresses are checksum-validated.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/text_stats` |
| MCP | `https://augur-trade.com/hub/mcp/util` → tool `text_stats` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `text` | string | yes | Text (or a URL when extract=true) to analyse. |
| `extract` | boolean |  | true = if text is a URL, fetch the page and analyse its readable text. Default true. (default `true`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/text_stats \
  -H 'Content-Type: application/json' \
  -d '{"text": "Solana processed 3,000 transactions a second today. Read more at https://example.com — or ask @someone. #solana"}'
```

```js
import { Foresight } from './sdk/js/augur-synapse.mjs';
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.textStats({"text": "Solana processed 3,000 transactions a second today. Read more at https://example.com — or ask @someone. #solana"});
```

```python
import os
from augur_synapse import Foresight
synapse = Foresight(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.text_stats(text='Solana processed 3,000 transactions a second today. Read more at https://example.com — or ask @someone. #solana')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "text_stats", "arguments": {"text": "Solana processed 3,000 transactions a second today. Read more at https://example.com — or ask @someone. #solana"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "text_stats",
 "ms": 4,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "characters": 111,
  "characters_no_spaces": 96,
  "words": 18,
  "sentences": 3,
  "lines": 1,
  "paragraphs": 1,
  "estimated_tokens": 28,
  "reading_minutes": 0.1,
  "flesch_reading_ease": 59.7,
  "readability": "fairly difficult",
  "extracted": {
   "urls": [
    "https://example.com"
   ],
   "emails": [],
   "handles": [
    "@someone"
   ],
   "hashtags": [
    "#solana"
   ],
   "numbers": [
    "3,000"
   ],
   "evm_addresses": [],
   "solana_addresses": []
  }
 }
}
```

</details>

---

[← All endpoints](README.md)
