# Endpoint reference

79 tools in 10 groups: 32 free, 47 paid from $0.001 to $0.03 per call.

Every tool is one endpoint: `POST https://augur-trade.com/hub/api/v1/tools/{tool_id}` with a JSON body. The same tools are on MCP.

## [Pump Cortex](pump.md)

Every pump.fun bonding-curve trade since 2026-09-11, recorded live — 44M+ trades, 450k+ launches.

| Tool | What it does | Price |
|---|---|---|
| [`pump_pulse`](pump.md#pump_pulse) | Live pump.fun heartbeat: trades/min, launches, graduations, graduation rate, hottest tokens in the last 15 min. | free |
| [`pump_history`](pump.md#pump_history) | pump.fun over time: launches, graduations, graduation rate, trades, SOL volume and unique wallets per day or hour since 2026-09-11 — with a compare window. | free |
| [`pump_launches`](pump.md#pump_launches) | The newest pump.fun tokens with dev buy, early buyers/volume, curve progress, market cap and creator launch count. | $0.002 |
| [`pump_token`](pump.md#pump_token) | Full bonding-curve forensics for one pump.fun mint: flow, dev buys/sells, launch snipers, top curve holders, peak, graduation, red flags. | $0.01 |
| [`pump_wallet`](pump.md#pump_wallet) | Any wallet's pump.fun trading record: realized PnL, win rate, hold time, frequency (bot or human), tokens it launched. | $0.01 |
| [`pump_dev`](pump.md#pump_dev) | A creator wallet's launch history: launches, graduation rate, launch cadence, how fast the dev sells, verdict. | $0.01 |
| [`pump_odds`](pump.md#pump_odds) | Probability a pump.fun launch graduates, from how comparable launches in our tape actually ended — with the lift over the ~3% base rate. | $0.01 |
| [`smart_money`](pump.md#smart_money) | The pump.fun wallets with the best realized PnL in the last 24 h — and the tokens those wallets are buying right now. | $0.02 |
| [`copy_backtest`](pump.md#copy_backtest) | Would copying this wallet have made money? Replays its pump.fun entries and exits 0–25 slots late on the recorded curve and shows where the edge dies. | $0.03 |

## [Risk Amygdala](risk.md)

Forensics before an agent puts money in: Solana launches and contracts, EVM honeypots, addresses, dependency CVEs.

| Tool | What it does | Price |
|---|---|---|
| [`token_risk`](risk.md#token_risk) | 0-100 rug-risk score for any Solana token: mint/freeze authority, Token-2022 traps, holder concentration, liquidity depth — plus pump.fun curve flags. | $0.005 |
| [`launch_scan`](risk.md#launch_scan) | One call, one verdict on a pump.fun launch: 0-100 score with positives and risks, graduation odds, dev record, snipers, holders, flow. | $0.025 |
| [`counterparty_check`](risk.md#counterparty_check) | One-call verdict on a Solana wallet before you deal with it: serial token launcher, fast dumper, trading bot, or clean. | $0.005 |
| [`evm_token_security`](risk.md#evm_token_security) | Honeypot and scam check for any ERC-20 on 15+ EVM chains: buy/sell tax, can the owner mint, pause, blacklist or change taxes, proxy, holder concentration, LP lock. | $0.005 |
| [`address_check`](risk.md#address_check) | Is this a valid address, and for which chain? EVM (with checksum fix), Solana (on-curve wallet vs PDA), Bitcoin (legacy/P2SH/SegWit/Taproot), Tron, Cosmos-style bech32. | free |
| [`vuln_check`](risk.md#vuln_check) | Known security vulnerabilities for a package version (npm, PyPI, crates, Go, Maven, NuGet, RubyGems, Packagist) with severity, CVE/GHSA ids, and the version that fixes each. | $0.002 |

## [Forensics Lobe](forensics.md)

Who is behind a launch: bundle wallets labelled bot / bundle / dev-linked, creation airdrops, scripted buying, transfer-only holders and serial devs — Solana pump.fun plus 18 EVM chains, with a back-tested skip/pass rug guard.

| Tool | What it does | Price |
|---|---|---|
| [`bundle_forensics`](forensics.md#bundle_forensics) | Who bundled a Solana pump.fun launch: every block-0 wallet labelled sniper bot / bundle / dev-linked, supply bought and still held, holders who got tokens by transfer, serial-dev check, top-10 concentration, RugCheck — plus a back-tested skip/pass verdict. | $0.003 |
| [`bundler_profile`](forensics.md#bundler_profile) | Is this Solana wallet a bundler? Every pump.fun launch it bought in the first 2 slots over the last 10 days, which creators it keeps bundling for, and whether it is a mass sniper bot or a dev's private bundle wallet. | $0.002 |
| [`creator_launches`](forensics.md#creator_launches) | Every pump.fun coin a Solana wallet created in the last 10 days, how many graduated, and the wallets that bundle its launches again and again (its private bundle crew). | $0.002 |
| [`evm_bundle_forensics`](forensics.md#evm_bundle_forensics) | Who bundled an EVM token launch (Base, BSC, Ethereum, Arbitrum, Robinhood and 13 more): creation-tx airdrops to fake holders, first-seconds buys, scripted fixed-cadence buying, fresh-wallet and transfer-only holders, dev holdings, exchange-labelled holders, GoPlus contract flags — plus a skip/pass verdict. | $0.005 |

## [Market Stem](market.md)

Prices, balances and plain-language transactions — Solana plus 17 EVM chains.

| Tool | What it does | Price |
|---|---|---|
| [`price`](market.md#price) | USD price, 24h change and liquidity for up to 100 Solana mints; flags illiquid (dead) tokens. | free |
| [`wallet_holdings`](market.md#wallet_holdings) | Everything a Solana wallet holds — SOL, SPL and Token-2022 tokens — valued in USD and sorted by value. | $0.003 |
| [`tx_explain`](market.md#tx_explain) | Turns any Solana transaction signature into plain facts: status, fee, programs by name, SOL and token balance changes per owner, a one-line summary. | $0.003 |
| [`evm_address`](market.md#evm_address) | Native balance (with USD), transaction count, contract or wallet, ENS name — for any address on 17 EVM chains at once or one chain. | $0.002 |
| [`erc20_info`](market.md#erc20_info) | Name, symbol, decimals, total supply and USD price of any ERC-20 — plus a wallet's balance of it — read on chain. | $0.002 |
| [`evm_tx`](market.md#evm_tx) | Any EVM transaction in plain terms: status, from/to, value, fee in native and USD, method called, every ERC-20 transfer decoded with symbols and amounts. | $0.003 |
| [`solana_network`](market.md#solana_network) | Solana right now: TPS (total and non-vote), slot and block height, epoch progress and ETA, priority-fee percentiles, cluster version. | free |

## [Liquidity Lobe](liquidity.md)

Meteora DLMM pools, positions and the LP whales we track on chain.

| Tool | What it does | Price |
|---|---|---|
| [`dlmm_pool`](liquidity.md#dlmm_pool) | State of a Meteora DLMM pool: price, bin step, fees, TVL, volume and fees by window (30 m–24 h), 24 h fee yield and its annualized APR/APY. | $0.002 |
| [`dlmm_positions`](liquidity.md#dlmm_positions) | Open Meteora DLMM positions of any wallet: value, unclaimed fees, PnL, in/out of range — or its closed-position history. | $0.005 |
| [`dlmm_whales`](liquidity.md#dlmm_whales) | Meteora DLMM liquidity providers ranked by measured on-chain edge: net USD, median multiple, win rate, hold time, size, recency. | $0.02 |

## [Chain Cortex](chain.md)

Every chain at once: prices, DeFi TVL and yields, stablecoins, perps funding, order books, gas and EVM contracts.

| Tool | What it does | Price |
|---|---|---|
| [`crypto_price`](chain.md#crypto_price) | Live USD price and 24 h change for up to 30 crypto assets on any chain — by symbol, CoinGecko id, contract or mint address. | free |
| [`price_history`](chain.md#price_history) | Historical USD prices for any crypto asset (hourly or daily, up to 365 days) with return, high/low, max drawdown and annualized volatility. | $0.002 |
| [`defi_rankings`](chain.md#defi_rankings) | Top DeFi protocols by TVL (or 1 d / 7 d TVL change), filterable by chain and category — lending, DEX, liquid staking, bridges, perps… | free |
| [`defi_protocol`](chain.md#defi_protocol) | One DeFi protocol in depth: TVL by chain, TVL trend, fees and revenue (24 h/7 d/30 d), market cap, audits, links. | $0.002 |
| [`chain_tvl`](chain.md#chain_tvl) | Total value locked on every blockchain right now, ranked — or one chain's daily TVL history. | free |
| [`yield_pools`](chain.md#yield_pools) | Search ~19,000 DeFi yield pools across all chains: filter by chain, protocol, token, stablecoin-only, min TVL; sort by APY or TVL. Base vs reward APY, 30 d mean, IL risk. | $0.003 |
| [`stablecoins`](chain.md#stablecoins) | Every stablecoin's circulating supply, 1 d/7 d/30 d supply change, current price and peg deviation — spot depegs and mint/burn flows. | free |
| [`dex_volumes`](chain.md#dex_volumes) | DEX trading volume in the last 24 h / 7 d / 30 d — all chains or one — with the top DEXes and their share and change. | free |
| [`fees_revenue`](chain.md#fees_revenue) | Which protocols and chains earn the most: fees or revenue over 24 h / 7 d / 30 d, filterable by chain — the cash-flow view of crypto. | $0.002 |
| [`gas_now`](chain.md#gas_now) | What a transaction costs right now on 17 EVM chains, Solana and Bitcoin — gwei/priority fee and the USD cost of a transfer and a swap on each. | free |
| [`ens_resolve`](chain.md#ens_resolve) | ENS name → address and address → primary name, with avatar, twitter, github, url and email text records. | free |
| [`cex_ticker`](chain.md#cex_ticker) | Live bid/ask/last, 24 h change, volume and range for a pair on Kraken, Coinbase and OKX side by side — with the cross-venue spread. | $0.001 |
| [`orderbook_depth`](chain.md#orderbook_depth) | How much size a market can take: bid/ask depth within ±0.1/0.5/1/2/5%, spread, and the slippage of a $10k/$100k/$1M market order on Kraken, Coinbase or OKX. | $0.003 |
| [`funding_rates`](chain.md#funding_rates) | Perpetual funding for a coin on Hyperliquid, OKX and Kraken Futures side by side — per-interval rate and annualized APR — plus open interest and mark price. | $0.003 |
| [`hyperliquid_markets`](chain.md#hyperliquid_markets) | Every Hyperliquid perpetual: mark/oracle price, 24 h change and volume, open interest, funding APR, premium — ranked by volume, OI, funding or movers. | $0.002 |
| [`fear_greed`](chain.md#fear_greed) | The Crypto Fear & Greed Index (0–100) now and its history, with the 7 d / 30 d average and how extreme today is. | free |
| [`bitcoin_network`](chain.md#bitcoin_network) | Bitcoin right now: fee rates, mempool size, block height, next difficulty adjustment (% and ETA), hashrate. | free |

## [Web Senses](web.md)

Read and inspect the open web: clean page text and PDFs, metadata, DNS and email security, WHOIS, TLS, uptime and robots rules.

| Tool | What it does | Price |
|---|---|---|
| [`web_read`](web.md#web_read) | Any public URL → clean readable markdown: the article/main content without nav, ads or boilerplate, plus title, author, date, word count and links. PDFs too. | $0.002 |
| [`web_meta`](web.md#web_meta) | Everything a page says about itself: title, description, OpenGraph/Twitter card, canonical, favicon, language, RSS/Atom feeds, JSON-LD schema types, headings — and link-preview problems. | $0.001 |
| [`dns_lookup`](web.md#dns_lookup) | All DNS for a domain — A, AAAA, CNAME, MX, NS, TXT, CAA, SOA — plus SPF and DMARC parsed and graded, so an agent knows where a domain points and whether its email can be spoofed. | free |
| [`domain_whois`](web.md#domain_whois) | Who registered a domain and when: registrar, creation/expiry dates, age, days to expiry, status locks, nameservers — or that it looks available to register. | $0.002 |
| [`tls_check`](web.md#tls_check) | A site's TLS certificate: issuer, validity, days until expiry, SANs, protocol, cipher, chain and whether browsers trust it. | $0.001 |
| [`http_probe`](web.md#http_probe) | Is a site up and how is it served: status, full redirect chain, timings (DNS/TLS/first byte/total), server, CDN, caching, compression, and a graded security-header check (HSTS, CSP, frame, sniffing…). | $0.001 |
| [`robots_check`](web.md#robots_check) | May I crawl this? Checks a URL against the site's robots.txt for any user-agent, lists sitemaps and crawl-delay, and reports which AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) the site blocks. | $0.001 |
| [`email_check`](web.md#email_check) | Will this email address work? Syntax, domain MX records, disposable/throwaway provider detection, role address (info@, admin@) and free-mail provider — without sending anything. | $0.001 |

## [Knowledge Cortex](knowledge.md)

Encyclopedia, research papers, software packages and their vulnerabilities, GitHub repos, Hacker News, citations and books.

| Tool | What it does | Price |
|---|---|---|
| [`wiki`](knowledge.md#wiki) | Wikipedia in any language: search a topic and get the best article's summary, description, thumbnail and link — or the full article text. | free |
| [`arxiv_search`](knowledge.md#arxiv_search) | Search arXiv research papers by keywords, author or category — newest or most relevant — with abstracts, authors, dates and PDF links. | $0.001 |
| [`package_info`](knowledge.md#package_info) | Any npm, PyPI or crates.io package: latest version and release date, license, downloads, maintainers, repo, dependency count, deprecation — to pick or vet a dependency. | $0.001 |
| [`github_repo`](knowledge.md#github_repo) | A GitHub repository at a glance: stars, forks, open issues, last commit, latest release, license, languages, contributors, archived — is it alive and trustworthy? | $0.002 |
| [`hn_search`](knowledge.md#hn_search) | Search Hacker News stories and comments by keyword, sorted by relevance or date, filtered by time window and minimum points — what developers are saying about anything. | $0.001 |
| [`doi_lookup`](knowledge.md#doi_lookup) | Resolve a DOI — or search a paper title — to full citation metadata: title, authors, journal, year, citations count, publisher, license, and a ready-made APA/BibTeX citation. | $0.001 |
| [`book_search`](knowledge.md#book_search) | Find books by title, author, subject or ISBN: first published year, editions, ISBNs, page count, ratings, subjects and cover image. | $0.001 |

## [World Map](world.md)

Places, weather, currencies, holidays, time zones, countries, earthquakes, sun and moon — the physical world for agents.

| Tool | What it does | Price |
|---|---|---|
| [`weather`](world.md#weather) | Current weather and hourly/daily forecast for any place name or lat,lon: temperature, feels-like, wind, gusts, rain, cloud, humidity, UV — up to 9 days. | $0.001 |
| [`geocode`](world.md#geocode) | Place name or address → coordinates (with city, state, country, postcode), or lat,lon → the nearest address. Up to 10 candidates. | $0.001 |
| [`fx_rates`](world.md#fx_rates) | Official exchange rates for 30 major currencies (European Central Bank reference rates): latest or any date since 1999, convert an amount, or a time series. | free |
| [`holidays`](world.md#holidays) | Public holidays for 100+ countries for any year, whether today is a holiday there, and the next upcoming ones — including regional (state) holidays. | free |
| [`time_convert`](world.md#time_convert) | Current time in any time zones, convert a time between zones (DST-correct), and date arithmetic: add/subtract durations, days between dates, weekday, ISO week, Unix time. | free |
| [`country_info`](world.md#country_info) | Any country's essentials: capital, population, GDP and GDP per capita (World Bank), currencies, languages, calling code, internet TLD, time zones, driving side, borders, flag. | free |
| [`earthquakes`](world.md#earthquakes) | Earthquakes worldwide from the last hour to 30 days, filtered by minimum magnitude and optionally within a radius of a place — with depth, tsunami flag and USGS alert level. | free |
| [`sun_moon`](world.md#sun_moon) | Sunrise, sunset, golden hour, twilight, day length and solar noon for any place and date — plus moon phase, illumination, moonrise and moonset. | free |

## [Utility Cerebellum](utilities.md)

Exact local tools with no upstream and no limits: QR codes, hashing and encoding, JSON Schema, cron, markdown, diffs, units, JWTs, secure random and text stats.

| Tool | What it does | Price |
|---|---|---|
| [`qr_code`](utilities.md#qr_code) | Make a QR code for any text, URL, Solana Pay / wallet address or Wi-Fi login — as a PNG (base64 data URL) or SVG, with size, margin, colours and error correction. | free |
| [`hash_encode`](utilities.md#hash_encode) | Hash data (SHA-256/512, SHA3, Keccak-256, BLAKE2, MD5, SHA-1, RIPEMD-160, HMAC) and convert between utf8, hex, base64, base64url and base58 — exact, in one call. | free |
| [`json_schema_validate`](utilities.md#json_schema_validate) | Validate JSON data against a JSON Schema (draft-07/2019-09/2020-12, formats like email/uri/date-time) and get every error with its exact path — check tool I/O before acting on it. | free |
| [`cron_explain`](utilities.md#cron_explain) | Explain a cron expression in plain English and list its next N run times in any time zone — catch a schedule mistake before it fires at 3 am. | free |
| [`markdown_convert`](utilities.md#markdown_convert) | Convert Markdown to clean HTML (GitHub-flavoured: tables, task lists, fenced code) or HTML back to Markdown. | free |
| [`text_diff`](utilities.md#text_diff) | Diff two texts: unified diff (patch format), a line/word-level change list, and similarity % — compare versions of a doc, config or code. | free |
| [`unit_convert`](utilities.md#unit_convert) | Convert between units of length, mass, volume, temperature, speed, area, time, data size, energy, power, pressure, frequency and more — or list every unit a value converts to. | free |
| [`jwt_decode`](utilities.md#jwt_decode) | Decode a JSON Web Token's header and claims, show issued/expiry times in plain dates and whether it has expired — optionally verify an HS256/384/512 signature with a secret. | free |
| [`random_gen`](utilities.md#random_gen) | Cryptographically secure randomness: UUID v4/v7, passwords, API-key-style tokens, integers in a range, dice, coin flips, or a fair shuffle / pick from a list. | free |
| [`text_stats`](utilities.md#text_stats) | Count characters, words, sentences, lines and paragraphs, estimate LLM tokens, reading time and readability (Flesch), and pull out every URL, email, @handle, #tag, number and crypto address. | free |
