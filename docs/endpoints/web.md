# Web Senses

Read and inspect the open web: clean page text and PDFs, metadata, DNS and email security, WHOIS, TLS, uptime and robots rules.

8 tools · MCP server `https://augur-trade.com/hub/mcp/web`

| Tool | What it does | Price |
|---|---|---|
| [`web_read`](#web_read) | Any public URL → clean readable markdown: the article/main content without nav, ads or boilerplate, plus title, author, date, word count and links. PDFs too. | $0.002 |
| [`web_meta`](#web_meta) | Everything a page says about itself: title, description, OpenGraph/Twitter card, canonical, favicon, language, RSS/Atom feeds, JSON-LD schema types, headings — and link-preview problems. | $0.001 |
| [`dns_lookup`](#dns_lookup) | All DNS for a domain — A, AAAA, CNAME, MX, NS, TXT, CAA, SOA — plus SPF and DMARC parsed and graded, so an agent knows where a domain points and whether its email can be spoofed. | free |
| [`domain_whois`](#domain_whois) | Who registered a domain and when: registrar, creation/expiry dates, age, days to expiry, status locks, nameservers — or that it looks available to register. | $0.002 |
| [`tls_check`](#tls_check) | A site's TLS certificate: issuer, validity, days until expiry, SANs, protocol, cipher, chain and whether browsers trust it. | $0.001 |
| [`http_probe`](#http_probe) | Is a site up and how is it served: status, full redirect chain, timings (DNS/TLS/first byte/total), server, CDN, caching, compression, and a graded security-header check (HSTS, CSP, frame, sniffing…). | $0.001 |
| [`robots_check`](#robots_check) | May I crawl this? Checks a URL against the site's robots.txt for any user-agent, lists sitemaps and crawl-delay, and reports which AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) the site blocks. | $0.001 |
| [`email_check`](#email_check) | Will this email address work? Syntax, domain MX records, disposable/throwaway provider detection, role address (info@, admin@) and free-mail provider — without sending anything. | $0.001 |

---

### `web_read`

**Read a web page (clean markdown)** · $0.002 · 10 free calls/day

Any public URL → clean readable markdown: the article/main content without nav, ads or boilerplate, plus title, author, date, word count and links. PDFs too.

Fetches the page (redirects followed, public internet only), extracts the main content with Mozilla Readability and converts it to markdown. PDFs are converted to text. Use max_chars to bound the output. JavaScript-only pages return whatever the server sends (no headless browser).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/web_read` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `web_read` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `url` | string | yes | http(s) URL |
| `max_chars` | integer |  | Truncate the returned markdown to this many characters. Range 500-100000. Default 20000. (default `20000`, range 500–100000) |
| `include_links` | boolean |  | keep hyperlinks (absolute) in the markdown and return a link list. Default false. (default `false`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/web_read \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"url": "https://en.wikipedia.org/wiki/Large_language_model", "max_chars": 3000}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.webRead({"url": "https://en.wikipedia.org/wiki/Large_language_model", "max_chars": 3000});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.web_read(url='https://en.wikipedia.org/wiki/Large_language_model', max_chars=3000)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "web_read", "arguments": {"url": "https://en.wikipedia.org/wiki/Large_language_model", "max_chars": 3000}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "web_read",
 "ms": 1140,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "url": "https://en.wikipedia.org/wiki/Large_language_model",
  "status": 200,
  "type": "html",
  "title": "Large language model",
  "byline": "Contributors to Wikimedia projects",
  "site": "Wikimedia Foundation, Inc.",
  "published": "2023-03-09T15:43:17Z",
  "lang": "en",
  "excerpt": "A large language model (LLM) is an AI model (typically a neural network) trained on a vast amount of text for natural language processing tasks, especially language generation. LLMs can typically generate, summarize, translate, and analyze text in many contexts.[1] They are the b…",
  "words": 12993,
  "truncated": true,
  "markdown": "The number of publications about large language models by year grouped by publication types\n\nA **large language model** (**LLM**) is an AI model (typically a neural network) trained on a vast amount of text for natural language processing tasks, especially language generation. LL…",
  "extracted_with": "readability"
 }
}
```

</details>

---

### `web_meta`

**Page metadata + link preview** · $0.001 · 10 free calls/day

Everything a page says about itself: title, description, OpenGraph/Twitter card, canonical, favicon, language, RSS/Atom feeds, JSON-LD schema types, headings — and link-preview problems.

Use to build link previews, check SEO/social cards, find a site's feeds or structured data. Flags missing og:image, missing description and non-absolute image URLs (common reasons a link shows up bare on X/Telegram).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/web_meta` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `web_meta` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `url` | string | yes | Absolute http(s) URL of the page. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/web_meta \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"url": "https://augur-trade.com/hub"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.webMeta({"url": "https://augur-trade.com/hub"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.web_meta(url='https://augur-trade.com/hub')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "web_meta", "arguments": {"url": "https://augur-trade.com/hub"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "web_meta",
 "ms": 57,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "url": "https://augur-trade.com/hub/",
  "status": 200,
  "title": "A.U.G.U.R Synapse — the tool exchange for AI agents",
  "description": "A tool exchange run by an AI, for AI agents. 79 tools over MCP or HTTP — crypto and DeFi on every chain, pump.fun live tape and smart money, token and…",
  "canonical": "https://augur-trade.com/hub/",
  "lang": "en",
  "favicon": "https://augur-trade.com/favicon.ico",
  "apple_touch_icon": "https://augur-trade.com/apple-touch-icon.png",
  "manifest": "https://augur-trade.com/site.webmanifest",
  "robots": "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  "opengraph": {
   "og:type": "website",
   "og:site_name": "A.U.G.U.R",
   "og:locale": "en_US",
   "og:url": "https://augur-trade.com/hub/",
   "og:title": "A.U.G.U.R Synapse — the tool exchange for AI agents",
   "og:description": "A tool exchange run by an AI, for AI agents. 79 tools over MCP or HTTP — crypto and DeFi on every chain, pump.fun live tape and smart money, token and…",
   "og:image:alt": "A.U.G.U.R Synapse — the tool exchange for AI agents",
   "og:image": "https://augur-trade.com/og/hub.jpg?v=91368125de",
   "og:image:width": "1200",
   "og:image:height": "630"
  },
  "twitter": {
   "twitter:title": "A.U.G.U.R Synapse — the tool exchange for AI agents",
   "twitter:description": "A tool exchange run by an AI, for AI agents. 79 tools over MCP or HTTP — crypto and DeFi on every chain, pump.fun live tape and smart money, token and…",
   "twitter:image": "https://augur-trade.com/og/hub.jpg?v=91368125de",
   "twitter:card": "summary_large_image"
  },
  "feeds": [],
  "json_ld_types": [
   "WebPage",
   "WebAPI",
   "BreadcrumbList",
   "… 2 more"
  ],
  "h1": [
   "The nervous systemfor autonomous agents."
  ],
  "h2": [
   "Nine lobes. Sixteen tools.",
   "Plug in with one line.",
   "Money that moves at machine speed.",
   "… 3 more"
  ],
  "link_preview_problems": []
 }
}
```

</details>

---

### `dns_lookup`

**DNS records + email security** · free

All DNS for a domain — A, AAAA, CNAME, MX, NS, TXT, CAA, SOA — plus SPF and DMARC parsed and graded, so an agent knows where a domain points and whether its email can be spoofed.

Queried live against public resolvers (Cloudflare, Google, Quad9). Email grade: SPF present and ending in -all/~all, DMARC present with p=quarantine/reject.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/dns_lookup` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `dns_lookup` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `domain` | string | yes | Domain name without scheme, e.g. "example.com". |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/dns_lookup \
  -H 'Content-Type: application/json' \
  -d '{"domain": "github.com"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.dnsLookup({"domain": "github.com"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.dns_lookup(domain='github.com')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "dns_lookup", "arguments": {"domain": "github.com"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "dns_lookup",
 "ms": 17,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "domain": "github.com",
  "resolves": true,
  "a": [
   "140.82.113.4"
  ],
  "aaaa": [],
  "cname": [],
  "mx": [
   {
    "exchange": "github-com.mail.protection.outlook.com",
    "priority": 0
   }
  ],
  "ns": [
   "dns1.p08.nsone.net",
   "dns2.p08.nsone.net",
   "dns3.p08.nsone.net",
   "… 5 more"
  ],
  "txt": [
   "00Dd0000000hHE0=1TBKg000000TN2r",
   "MS=6BF03E6AF5CB689E315FB6199603BABF2C88D805",
   "MS=ms44452932",
   "… 21 more"
  ],
  "caa": [
   {
    "critical": 0,
    "issue": "digicert.com"
   },
   {
    "critical": 0,
    "issue": "globalsign.com"
   },
   {
    "critical": 0,
    "issue": "letsencrypt.org"
   },
   "… 4 more"
  ],
  "soa": {
   "nsname": "ns-1707.awsdns-21.co.uk",
   "hostmaster": "awsdns-hostmaster.amazon.com",
   "serial": 1,
   "refresh": 7200,
   "retry": 900,
   "expire": 1209600,
   "minttl": 86400
  },
  "email_security": {
   "grade": "A",
   "spf": "v=spf1 ip4:192.30.252.0/22 include:spf.protection.outlook.com include:_netblocks.google.com include:_netblocks2.google.com include:mail.zendesk.com include:_spf.salesforce.com include:servers.mcsv.net include:mktomail.com include:sendgrid.net ip4:62.253.227.114 ip4:166.78.69.169 …",
   "dmarc": "v=DMARC1; p=quarantine; sp=reject; pct=100; rua=mailto:dmarc@github.com; ruf=mailto:dmarc@github.com; fo=1",
   "dmarc_policy": "quarantine",
   "issues": []
  }
 }
}
```

</details>

---

### `domain_whois`

**Domain WHOIS / RDAP + availability** · $0.002 · 10 free calls/day

Who registered a domain and when: registrar, creation/expiry dates, age, days to expiry, status locks, nameservers — or that it looks available to register.

Uses RDAP, the registries' official successor to WHOIS (rdap.org bootstrap). A domain with no RDAP record and no DNS is reported as likely available. Young domains (< 30 days) are flagged: most phishing/scam sites are days old.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/domain_whois` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `domain_whois` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `domain` | string | yes | Registrable domain without scheme, e.g. "example.com". |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/domain_whois \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"domain": "augur-trade.com"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.domainWhois({"domain": "augur-trade.com"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.domain_whois(domain='augur-trade.com')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "domain_whois", "arguments": {"domain": "augur-trade.com"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "domain_whois",
 "ms": 402,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "domain": "augur-trade.com",
  "registered": true,
  "registrar": {
   "name": "Global Domain Group LLC",
   "iana_id": "3956"
  },
  "created": "2026-10-16T09:59:40Z",
  "updated": "2026-10-16T10:00:01Z",
  "expires": "2027-10-16T09:59:40Z",
  "age_days": 0,
  "days_to_expiry": 364,
  "young_domain_warning": true,
  "status": [
   "client transfer prohibited"
  ],
  "nameservers": [
   "ns3.namefi.io",
   "ns4.namefi.io"
  ],
  "dnssec": false,
  "registrant": null,
  "source": "RDAP"
 }
}
```

</details>

---

### `tls_check`

**TLS certificate check** · $0.001 · 10 free calls/day

A site's TLS certificate: issuer, validity, days until expiry, SANs, protocol, cipher, chain and whether browsers trust it.

Live TLS handshake to the host. Flags expired, expiring (< 14 days), untrusted or name-mismatched certificates.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/tls_check` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `tls_check` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `host` | string | yes | Hostname without scheme or path, e.g. "example.com". |
| `port` | integer |  | TCP port serving TLS. Range 1-65535. Default 443. (default `443`, range 1–65535) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/tls_check \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"host": "github.com"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.tlsCheck({"host": "github.com"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.tls_check(host='github.com')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "tls_check", "arguments": {"host": "github.com"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "tls_check",
 "ms": 34,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "host": "github.com",
  "port": 443,
  "handshake_ms": 33,
  "protocol": "TLSv1.3",
  "cipher": "TLS_AES_128_GCM_SHA256",
  "alpn": "h2",
  "trusted": true,
  "trust_error": null,
  "subject": "github.com",
  "issuer": "Sectigo Limited",
  "issuer_cn": "Sectigo Public Server Authentication CA DV E36",
  "valid_from": "2026-09-01T00:00:00.000Z",
  "valid_to": "2026-11-29T23:59:59.000Z",
  "days_left": 43,
  "san": [
   "github.com",
   "www.github.com"
  ],
  "serial": "A59EBDB596751DB7F5C095079613953C",
  "fingerprint_sha256": "46:B6:01:EE:08:B4:18:CF:8A:3A:1E:BF:E6:70:BA:5C:E4:3B:B0:5A:91:7F:A8:B2:DD:08:7A:30:47:1C:FC:63",
  "key_bits": 256,
  "chain": [
   {
    "subject": "github.com",
    "issuer": "Sectigo Public Server Authentication CA DV E36",
    "valid_to": "2026-11-29T23:59:59.000Z"
   },
   {
    "subject": "Sectigo Public Server Authentication CA DV E36",
    "issuer": "Sectigo Public Server Authentication Root E46",
    "valid_to": "2036-03-21T23:59:59.000Z"
   },
   {
    "subject": "Sectigo Public Server Authentication Root E46",
    "issuer": "USERTrust ECC Certification Authority",
    "valid_to": "2038-01-18T23:59:59.000Z"
   },
   "… 1 more"
  ],
  "warnings": [],
  "ok": true
 }
}
```

</details>

---

### `http_probe`

**HTTP probe + security headers** · $0.001 · 10 free calls/day

Is a site up and how is it served: status, full redirect chain, timings (DNS/TLS/first byte/total), server, CDN, caching, compression, and a graded security-header check (HSTS, CSP, frame, sniffing…).

One real GET from our server. The security grade counts HSTS, Content-Security-Policy, X-Frame-Options/frame-ancestors, X-Content-Type-Options, Referrer-Policy and Permissions-Policy.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/http_probe` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `http_probe` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `url` | string | yes | Absolute http(s) URL to probe. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/http_probe \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"url": "https://example.com"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.httpProbe({"url": "https://example.com"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.http_probe(url='https://example.com')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "http_probe", "arguments": {"url": "https://example.com"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "http_probe",
 "ms": 17,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "url": "https://example.com",
  "final_url": "https://example.com/",
  "up": true,
  "status": 200,
  "redirects": [
   {
    "url": "https://example.com/",
    "status": 200,
    "ms": 17
   }
  ],
  "timing_ms": {
   "dns_connect": 4,
   "tls": 6,
   "first_byte": 16,
   "total": 17
  },
  "server": "cloudflare",
  "powered_by": null,
  "cdn": "Cloudflare",
  "remote_ip": "172.66.147.243",
  "content_type": "text/html; charset=utf-8",
  "bytes": 577,
  "compressed": true,
  "cache_control": null,
  "http_tls": {
   "protocol": "TLSv1.3",
   "cipher": "TLS_AES_256_GCM_SHA384",
   "authorized": true,
   "subject": "example.com",
   "issuer": "SSL Corporation",
   "valid_to": "2026-12-25T22:56:35.000Z"
  },
  "security_headers": {
   "hsts": false,
   "csp": false,
   "frame_protection": false,
   "nosniff": false,
   "referrer_policy": false,
   "permissions_policy": false,
   "grade": "F"
  }
 }
}
```

</details>

---

### `robots_check`

**robots.txt + AI crawler policy** · $0.001 · 10 free calls/day

May I crawl this? Checks a URL against the site's robots.txt for any user-agent, lists sitemaps and crawl-delay, and reports which AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) the site blocks.

Standard robots.txt matching (longest match wins, Allow beats Disallow on ties, * and $ wildcards). Missing robots.txt = everything allowed.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/robots_check` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `robots_check` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `url` | string | yes | Absolute URL you intend to crawl. |
| `user_agent` | string |  | User-agent token to evaluate the rules for. Defaults to the exchange's own user agent. (default `"augur-synapse"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/robots_check \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"url": "https://www.nytimes.com/section/technology", "user_agent": "GPTBot"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.robotsCheck({"url": "https://www.nytimes.com/section/technology", "user_agent": "GPTBot"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.robots_check(url='https://www.nytimes.com/section/technology', user_agent='GPTBot')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "robots_check", "arguments": {"url": "https://www.nytimes.com/section/technology", "user_agent": "GPTBot"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "robots_check",
 "ms": 42,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "url": "https://www.nytimes.com/section/technology",
  "robots_txt": "found",
  "user_agent": "GPTBot",
  "path": "/section/technology",
  "allowed": false,
  "matched_group": "gptbot",
  "rule": "Disallow: /",
  "crawl_delay": null,
  "sitemaps": [
   "https://www.nytimes.com/sitemaps/new/news.xml.gz",
   "https://www.nytimes.com/sitemaps/new/sitemap.xml.gz",
   "https://www.nytimes.com/sitemaps/new/collections.xml.gz",
   "… 22 more"
  ],
  "ai_crawlers_site_root": {
   "GPTBot": "blocked",
   "ChatGPT-User": "blocked",
   "OAI-SearchBot": "blocked",
   "ClaudeBot": "blocked",
   "Claude-User": "blocked",
   "Claude-SearchBot": "blocked",
   "anthropic-ai": "blocked",
   "Google-Extended": "blocked",
   "PerplexityBot": "blocked",
   "Perplexity-User": "blocked",
   "CCBot": "blocked",
   "Bytespider": "blocked",
   "Applebot-Extended": "blocked",
   "Meta-ExternalAgent": "blocked",
   "Amazonbot": "allowed",
   "cohere-ai": "blocked",
   "Diffbot": "blocked",
   "DuckAssistBot": "blocked",
   "MistralAI-User": "allowed (default rules)"
  },
  "groups": 63
 }
}
```

</details>

---

### `email_check`

**Email address check** · $0.001 · 10 free calls/day

Will this email address work? Syntax, domain MX records, disposable/throwaway provider detection, role address (info@, admin@) and free-mail provider — without sending anything.

No SMTP probing (that gets servers blacklisted); the verdict is from syntax, live MX lookup and a maintained list of ~100k disposable domains.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/email_check` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `email_check` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `email` | string | yes | Email address to check. No mail is sent. |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/email_check \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"email": "someone@mailinator.com"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.emailCheck({"email": "someone@mailinator.com"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.email_check(email='someone@mailinator.com')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "email_check", "arguments": {"email": "someone@mailinator.com"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "email_check",
 "ms": 58,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "email": "someone@mailinator.com",
  "valid_syntax": true,
  "domain": "mailinator.com",
  "mx": [
   {
    "exchange": "mail.mailinator.com",
    "priority": 1
   },
   {
    "exchange": "mail2.mailinator.com",
    "priority": 1
   }
  ],
  "accepts_mail": true,
  "disposable": true,
  "role_address": false,
  "free_provider": false,
  "verdict": "disposable / throwaway address"
 }
}
```

</details>

---

[← All endpoints](README.md)
