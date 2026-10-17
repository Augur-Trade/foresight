# Knowledge Cortex

Encyclopedia, research papers, software packages and their vulnerabilities, GitHub repos, Hacker News, citations and books.

7 tools · MCP server `https://augur-trade.com/hub/mcp/web`

| Tool | What it does | Price |
|---|---|---|
| [`wiki`](#wiki) | Wikipedia in any language: search a topic and get the best article's summary, description, thumbnail and link — or the full article text. | free |
| [`arxiv_search`](#arxiv_search) | Search arXiv research papers by keywords, author or category — newest or most relevant — with abstracts, authors, dates and PDF links. | $0.001 |
| [`package_info`](#package_info) | Any npm, PyPI or crates.io package: latest version and release date, license, downloads, maintainers, repo, dependency count, deprecation — to pick or vet a dependency. | $0.001 |
| [`github_repo`](#github_repo) | A GitHub repository at a glance: stars, forks, open issues, last commit, latest release, license, languages, contributors, archived — is it alive and trustworthy? | $0.002 |
| [`hn_search`](#hn_search) | Search Hacker News stories and comments by keyword, sorted by relevance or date, filtered by time window and minimum points — what developers are saying about anything. | $0.001 |
| [`doi_lookup`](#doi_lookup) | Resolve a DOI — or search a paper title — to full citation metadata: title, authors, journal, year, citations count, publisher, license, and a ready-made APA/BibTeX citation. | $0.001 |
| [`book_search`](#book_search) | Find books by title, author, subject or ISBN: first published year, editions, ISBNs, page count, ratings, subjects and cover image. | $0.001 |

---

### `wiki`

**Wikipedia lookup** · free

Wikipedia in any language: search a topic and get the best article's summary, description, thumbnail and link — or the full article text.

Search + REST summary from Wikipedia. full=true returns the article as plain text (sections kept), capped by max_chars. Disambiguation pages are flagged with alternatives.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/wiki` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `wiki` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | Topic or article title to look up. |
| `lang` | string |  | Wikipedia language code, e.g. "en", "de", "pt-br". Default "en". (default `"en"`) |
| `full` | boolean |  | true = return the full article text, not just the summary. Default false. (default `false`) |
| `max_chars` | integer |  | Truncate full article text to this many characters (with full=true). Range 500-60000. Default 8000. (default `8000`, range 500–60000) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/wiki \
  -H 'Content-Type: application/json' \
  -d '{"query": "Solana blockchain"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.wiki({"query": "Solana blockchain"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.wiki(query='Solana blockchain')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "wiki", "arguments": {"query": "Solana blockchain"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "wiki",
 "ms": 209,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "found": true,
  "title": "Solana (blockchain platform)",
  "description": null,
  "summary": "Solana is a public blockchain platform that uses a proof-of-stake consensus mechanism and provides smart contract functionality. The platform's native cryptocurrency is SOL. Solana was founded in 2018 by Toly Yakovenko and Raj Gokal, and the network was launched in March 2020 by …",
  "type": "standard",
  "url": "https://en.wikipedia.org/wiki/Solana_(blockchain_platform)",
  "thumbnail": "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
  "last_edited": "2026-08-20T13:48:00Z",
  "other_matches": [
   {
    "title": "Anatoly Yakovenko",
    "snippet": "Ukrainian-born software engineer and entrepreneur who co-founded the Solana blockchain platform. In the early 1990s, Yakovenko moved to the United States"
   },
   {
    "title": "Pump.fun",
    "snippet": "(commonly referred to as Pump) is a cryptocurrency launchpad for the Solana blockchain that enables users to create tokens and trade them immediately on"
   },
   {
    "title": "Layer-1 blockchain",
    "snippet": "transactions without relying on another blockchain. Bitcoin was the first Layer-1 blockchain. Others, such as Ethereum, Solana, and Sui, emerged to support more"
   },
   "… 2 more"
  ]
 }
}
```

</details>

---

### `arxiv_search`

**arXiv paper search** · $0.001 · 10 free calls/day

Search arXiv research papers by keywords, author or category — newest or most relevant — with abstracts, authors, dates and PDF links.

arXiv's official API. query supports arXiv syntax (ti:, au:, abs:, cat:cs.AI, AND/OR). Paced to arXiv's one-request-per-3-seconds policy and cached, so repeated queries are instant.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/arxiv_search` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `arxiv_search` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | e.g. "tool use agents" or au:hinton or cat:cs.CL AND ti:reasoning |
| `sort` | string (`relevance`, `newest`) |  | Order by relevance to the query or by submission date. One of "relevance", "newest". Default "relevance". (default `"relevance"`) |
| `limit` | integer |  | How many papers to return. Range 1-30. Default 10. (default `10`, range 1–30) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/arxiv_search \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"query": "LLM agents tool use", "sort": "newest", "limit": 5}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.arxivSearch({"query": "LLM agents tool use", "sort": "newest", "limit": 5});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.arxiv_search(query='LLM agents tool use', sort='newest', limit=5)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "arxiv_search", "arguments": {"query": "LLM agents tool use", "sort": "newest", "limit": 5}}}
```

</details>

---

### `package_info`

**Software package info** · $0.001 · 10 free calls/day

Any npm, PyPI or crates.io package: latest version and release date, license, downloads, maintainers, repo, dependency count, deprecation — to pick or vet a dependency.

Straight from each registry (plus npm and pypistats download counts). Flags deprecated packages and ones with no release in 2+ years.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/package_info` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `package_info` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Exact package name as published, e.g. "express" or "requests". |
| `ecosystem` | string (`npm`, `pypi`, `crates`) |  | Registry to look in. One of "npm", "pypi", "crates". Default "npm". (default `"npm"`) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/package_info \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"name": "@solana/web3.js", "ecosystem": "npm"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.packageInfo({"name": "@solana/web3.js", "ecosystem": "npm"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.package_info(name='@solana/web3.js', ecosystem='npm')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "package_info", "arguments": {"name": "@solana/web3.js", "ecosystem": "npm"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "package_info",
 "ms": 443,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "ecosystem": "npm",
  "name": "@solana/web3.js",
  "latest": "1.99.0",
  "released": "2026-10-15",
  "description": "Solana Javascript API",
  "license": "MIT",
  "deprecated": null,
  "weekly_downloads": 2747420,
  "versions": 1977,
  "dependencies": 15,
  "repository": "git+https://github.com/solana-foundation/solana-web3.js.git",
  "homepage": "https://solana.com/",
  "maintainers": [
   "solana-devs"
  ],
  "stale": null,
  "url": "https://www.npmjs.com/package/@solana/web3.js"
 }
}
```

</details>

---

### `github_repo`

**GitHub repo health** · $0.002 · 10 free calls/day

A GitHub repository at a glance: stars, forks, open issues, last commit, latest release, license, languages, contributors, archived — is it alive and trustworthy?

From the GitHub REST API. "activity" summarizes days since last push and last release so an agent can judge whether a project is maintained.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/github_repo` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `github_repo` |
| Price | $0.002 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `repo` | string | yes | owner/name or a github.com URL |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/github_repo \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"repo": "solana-labs/solana-web3.js"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.githubRepo({"repo": "solana-labs/solana-web3.js"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.github_repo(repo='solana-labs/solana-web3.js')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "github_repo", "arguments": {"repo": "solana-labs/solana-web3.js"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "github_repo",
 "ms": 956,
 "billing": {
  "mode": "credits",
  "usd": 0.002
 },
 "data": {
  "repo": "solana-foundation/solana-web3.js",
  "description": "Solana JavaScript SDK",
  "url": "https://github.com/solana-foundation/solana-web3.js",
  "homepage": "https://solana-foundation.github.io/solana-web3.js/",
  "stars": 2774,
  "forks": 1092,
  "watchers": 54,
  "open_issues_and_prs": 4,
  "default_branch": "main",
  "license": "MIT",
  "topics": [
   "blockchain",
   "javascript",
   "js",
   "… 4 more"
  ],
  "archived": false,
  "is_fork": false,
  "parent": null,
  "created": "2018-08-22",
  "last_push": "2026-10-16",
  "latest_release": {
   "tag": "v1.99.0",
   "name": "@solana/web3.js v1.99.0",
   "date": "2026-09-08",
   "prerelease": false
  },
  "languages_pct": {
   "TypeScript": 98.7,
   "JavaScript": 0.4,
   "Just": 0.4,
   "Shell": 0.3,
   "CSS": 0.3
  },
  "top_contributors": [
   {
    "login": "dependabot[bot]",
    "commits": 1173
   },
   {
    "login": "steveluscher",
    "commits": 699
   },
   {
    "login": "mvines",
    "commits": 367
   },
   "… 7 more"
  ],
  "activity": {
   "days_since_push": 0,
   "days_since_release": 38,
   "verdict": "active"
  }
 }
}
```

</details>

---

### `hn_search`

**Hacker News search** · $0.001 · 10 free calls/day

Search Hacker News stories and comments by keyword, sorted by relevance or date, filtered by time window and minimum points — what developers are saying about anything.

Algolia's official HN search. Returns title, url, points, comment count, author, date and the HN discussion link.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/hn_search` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `hn_search` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | Keywords to search for. |
| `type` | string (`story`, `comment`, `show_hn`, `ask_hn`) |  | Stories, comments, Show HN or Ask HN posts. One of "story", "comment", "show_hn", "ask_hn". Default "story". (default `"story"`) |
| `sort` | string (`relevance`, `date`) |  | Order by relevance or newest first. One of "relevance", "date". Default "relevance". (default `"relevance"`) |
| `days` | integer |  | Only items from the last N days. Range 1-3650. Default 365. (default `365`, range 1–3650) |
| `min_points` | integer |  | Only items with at least this many points. Default 0. (default `0`, range 0–…) |
| `limit` | integer |  | How many results to return. Range 1-50. Default 15. (default `15`, range 1–50) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/hn_search \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"query": "MCP server", "days": 30, "min_points": 50, "limit": 5}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.hnSearch({"query": "MCP server", "days": 30, "min_points": 50, "limit": 5});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.hn_search(query='MCP server', days=30, min_points=50, limit=5)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "hn_search", "arguments": {"query": "MCP server", "days": 30, "min_points": 50, "limit": 5}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "hn_search",
 "ms": 279,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "query": "MCP server",
  "total": 4,
  "results": [
   {
    "title": "Show HN: Petal, open-source CoScreen/ScreenHero finally free",
    "url": "https://petal.live/",
    "text": "Hi HN!I’m Jason Thomas, one of the founders of CoScreen.As some of you may know, Datadog sunset the CoScreen service on July 31st.Four of us from the original CoScreen team have spent the last couple months building a free and open source pair programming tool inspired by those t…",
    "points": 220,
    "comments": 41,
    "author": "thedracle",
    "date": "2026-10-14",
    "hn": "https://news.ycombinator.com/item?id=50092470"
   },
   {
    "title": "Show HN: I wrote an email app that accepts only one sender per inbox",
    "url": "https://clova.email/",
    "text": "Infinite inboxes, including prefixes where you don&#x27;t have to create inboxes before you use them -- they self create when you add a suffix.Three types of inboxes:\n- One sender. Locks to the first domain to send email (except gmail, outlook, etc where it locks to an email acco…",
    "points": 114,
    "comments": 96,
    "author": "edpin2000",
    "date": "2026-10-14",
    "hn": "https://news.ycombinator.com/item?id=50090932"
   },
   {
    "title": "Show HN: Spotatui, a Spotify TUI/GUI without web API rate limits",
    "url": "https://github.com/LargeModGames/spotatui",
    "text": "About 11 months ago i revived the amazing but unfortunately unmaintained spotify-tui. Since then I have been working on it almost non stop, finding a lot of problems on the way.One of the main issues I ran into were the Spotify web API rate limits. Third party clients like spotat…",
    "points": 91,
    "comments": 19,
    "author": "LargeModGames",
    "date": "2026-10-13",
    "hn": "https://news.ycombinator.com/item?id=50070010"
   },
   "… 1 more"
  ]
 }
}
```

</details>

---

### `doi_lookup`

**Citation / DOI lookup** · $0.001 · 10 free calls/day

Resolve a DOI — or search a paper title — to full citation metadata: title, authors, journal, year, citations count, publisher, license, and a ready-made APA/BibTeX citation.

Crossref's open metadata (150M+ works). Search mode returns the top matches for a title/author query.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/doi_lookup` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `doi_lookup` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `doi` | string |  | e.g. 10.1038/nature14539 |
| `query` | string |  | title/author search instead of a DOI |
| `limit` | integer |  | How many matches to return when searching by title. Range 1-20. Default 5. (default `5`, range 1–20) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/doi_lookup \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"doi": "10.1038/nature14539"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.doiLookup({"doi": "10.1038/nature14539"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.doi_lookup(doi='10.1038/nature14539')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "doi_lookup", "arguments": {"doi": "10.1038/nature14539"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "doi_lookup",
 "ms": 56,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "found": true,
  "doi": "10.1038/nature14539",
  "title": "Deep learning",
  "authors": [
   "Yann LeCun",
   "Yoshua Bengio",
   "Geoffrey Hinton"
  ],
  "year": 2015,
  "journal": "Nature",
  "publisher": "Springer Science and Business Media LLC",
  "type": "journal-article",
  "volume": "521",
  "issue": "7553",
  "pages": "436-444",
  "cited_by": 78422,
  "references": 103,
  "license": "https://www.springer.com/tdm",
  "url": "https://doi.org/10.1038/nature14539",
  "apa": "LeCun, Y., Bengio, Y., Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539",
  "bibtex": "@article{LeCun2015,\n  title={Deep learning},\n  author={Yann LeCun and Yoshua Bengio and Geoffrey Hinton},\n  journal={Nature},\n  year={2015},\n  doi={10.1038/nature14539}\n}"
 }
}
```

</details>

---

### `book_search`

**Book search** · $0.001 · 10 free calls/day

Find books by title, author, subject or ISBN: first published year, editions, ISBNs, page count, ratings, subjects and cover image.

Open Library (Internet Archive) catalogue of 30M+ titles.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/book_search` |
| MCP | `https://augur-trade.com/hub/mcp/web` → tool `book_search` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | title, author or ISBN |
| `limit` | integer |  | How many books to return. Range 1-20. Default 5. (default `5`, range 1–20) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/book_search \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"query": "Dune Frank Herbert", "limit": 3}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.bookSearch({"query": "Dune Frank Herbert", "limit": 3});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.book_search(query='Dune Frank Herbert', limit=3)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "book_search", "arguments": {"query": "Dune Frank Herbert", "limit": 3}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "book_search",
 "ms": 306,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "total": 120,
  "books": [
   {
    "title": "Dune",
    "authors": [
     "Frank Herbert"
    ],
    "first_published": 1965,
    "editions": 155,
    "pages_median": 608,
    "rating": 4.3,
    "ratings": 448,
    "isbn": [
     "9780340839935",
     "9782266320481",
     "9788497596824",
     "… 1 more"
    ],
    "publishers": [
     "Berkley",
     "Berkley Books",
     "Berkley T2706"
    ],
    "languages": [
     "heb",
     "dut",
     "rum",
     "… 2 more"
    ],
    "subjects": [
     "Dune (Imaginary place)",
     "Fiction",
     "Fiction, science fiction, general",
     "… 5 more"
    ],
    "cover": "https://covers.openlibrary.org/b/id/11481354-L.jpg",
    "url": "https://openlibrary.org/works/OL893414W"
   },
   {
    "title": "Dune Messiah",
    "authors": [
     "Frank Herbert"
    ],
    "first_published": 1969,
    "editions": 101,
    "pages_median": 279,
    "rating": 3.94,
    "ratings": 143,
    "isbn": [
     "8418037679",
     "9788466372015",
     "8373017259",
     "… 1 more"
    ],
    "publishers": [
     "Orion Publishing Group, Limited",
     "Putnam",
     "Putnam Adult"
    ],
    "languages": [
     "spa",
     "pol",
     "dut",
     "… 2 more"
    ],
    "subjects": [
     "American Science fiction",
     "Dune (Imaginary place)",
     "Fiction",
     "… 5 more"
    ],
    "cover": "https://covers.openlibrary.org/b/id/980253-L.jpg",
    "url": "https://openlibrary.org/works/OL893461W"
   },
   {
    "title": "Children of Dune",
    "authors": [
     "Frank Herbert"
    ],
    "first_published": 1976,
    "editions": 77,
    "pages_median": 504,
    "rating": 4,
    "ratings": 51,
    "isbn": [
     "1427202915",
     "9789759971342",
     "9780425071793",
     "… 1 more"
    ],
    "publishers": [
     "Berkley",
     "Acervo",
     "Ithaki Yayinlari"
    ],
    "languages": [
     "dut",
     "chi",
     "por",
     "… 2 more"
    ],
    "subjects": [
     "Dune (Imaginary place)",
     "Fiction",
     "Fiction in English",
     "… 5 more"
    ],
    "cover": "https://covers.openlibrary.org/b/id/6976407-L.jpg",
    "url": "https://openlibrary.org/works/OL893516W"
   }
  ]
 }
}
```

</details>

---

[← All endpoints](README.md)
