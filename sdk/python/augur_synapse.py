"""A.U.G.U.R Foresight client: one method per endpoint (79 tools). Generated from the live catalog.

Standard library only (Python 3.8+). MIT.

    from augur_synapse import Foresight
    synapse = Foresight(key="hk_...")            # credit key, optional; or Foresight(free_tier=True)
    data = synapse.price(mints=["So11111111111111111111111111111111111111112"])["data"]
"""
import json
import urllib.error
import urllib.request

BASE = "https://augur-trade.com/hub/api/v1"


class SynapseError(Exception):
    def __init__(self, status, body):
        super().__init__((body or {}).get("error") or f"HTTP {status}")
        self.status, self.body = status, body


class Foresight:
    def __init__(self, key=None, free_tier=False, pay=None, base=BASE, timeout=90):
        """key: prepaid credit key (hk_...). free_tier: send X-Synapse-Free: 1.
        pay: optional callable(requirements_402, tool, args) -> base64 X-PAYMENT payload or None."""
        self.key, self.free_tier, self.pay, self.base, self.timeout = key, free_tier, pay, base, timeout

    def _post(self, tool, args, extra=None):
        headers = {"content-type": "application/json", "user-agent": "augur-synapse-py"}
        if self.key:
            headers["authorization"] = "Bearer " + self.key
        if self.free_tier:
            headers["x-synapse-free"] = "1"
        headers.update(extra or {})
        req = urllib.request.Request(f"{self.base}/tools/{tool}", json.dumps(args).encode(), headers, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as r:
                return r.status, json.load(r)
        except urllib.error.HTTPError as e:
            try:
                return e.code, json.load(e)
            except Exception:
                return e.code, None

    def call(self, tool, args=None):
        """Call any tool by id. Returns {ok, tool, ms, billing, data}."""
        args = {k: v for k, v in (args or {}).items() if v is not None}
        status, body = self._post(tool, args)
        if status == 402 and self.pay:
            payment = self.pay(body, tool, args)
            if payment:
                status, body = self._post(tool, args, {"x-payment": payment})
        if status != 200 or not body or body.get("ok") is False:
            raise SynapseError(status, body)
        return body

    def catalog(self):
        """The live catalog: every tool with price and input schema."""
        with urllib.request.urlopen(f"{self.base}/tools", timeout=self.timeout) as r:
            return json.load(r)

    # ── Pump Cortex ──
    def pump_pulse(self):
        """Live pump.fun heartbeat: trades/min, launches, graduations, graduation rate, hottest tokens in the last 15 min. (free)"""
        return self.call("pump_pulse", {})

    def pump_history(self, granularity=None, from_=None, to=None, compare_from=None, compare_to=None):
        """pump.fun over time: launches, graduations, graduation rate, trades, SOL volume and unique wallets per day or hour since 2026-09-11 — with a compare window. (free)"""
        return self.call("pump_history", {"granularity": granularity, "from": from_, "to": to, "compare_from": compare_from, "compare_to": compare_to})

    def pump_launches(self, limit=None, window_s=None):
        """The newest pump.fun tokens with dev buy, early buyers/volume, curve progress, market cap and creator launch count. ($0.002)"""
        return self.call("pump_launches", {"limit": limit, "window_s": window_s})

    def pump_token(self, mint):
        """Full bonding-curve forensics for one pump.fun mint: flow, dev buys/sells, launch snipers, top curve holders, peak, graduation, red flags. ($0.01)"""
        return self.call("pump_token", {"mint": mint})

    def pump_wallet(self, wallet, limit=None):
        """Any wallet's pump.fun trading record: realized PnL, win rate, hold time, frequency (bot or human), tokens it launched. ($0.01)"""
        return self.call("pump_wallet", {"wallet": wallet, "limit": limit})

    def pump_dev(self, creator):
        """A creator wallet's launch history: launches, graduation rate, launch cadence, how fast the dev sells, verdict. ($0.01)"""
        return self.call("pump_dev", {"creator": creator})

    def pump_odds(self, mint):
        """Probability a pump.fun launch graduates, from how comparable launches in our tape actually ended — with the lift over the ~3% base rate. ($0.01)"""
        return self.call("pump_odds", {"mint": mint})

    def smart_money(self, limit=None, window_min=None, sort=None, exclude_bots=None):
        """The pump.fun wallets with the best realized PnL in the last 24 h — and the tokens those wallets are buying right now. ($0.02)"""
        return self.call("smart_money", {"limit": limit, "window_min": window_min, "sort": sort, "exclude_bots": exclude_bots})

    def copy_backtest(self, wallet, days=None, size_sol=None, exit=None, max_positions=None):
        """Would copying this wallet have made money? Replays its pump.fun entries and exits 0–25 slots late on the recorded curve and shows where the edge dies. ($0.03)"""
        return self.call("copy_backtest", {"wallet": wallet, "days": days, "size_sol": size_sol, "exit": exit, "max_positions": max_positions})

    # ── Risk Amygdala ──
    def token_risk(self, mint):
        """0-100 rug-risk score for any Solana token: mint/freeze authority, Token-2022 traps, holder concentration, liquidity depth — plus pump.fun curve flags. ($0.005)"""
        return self.call("token_risk", {"mint": mint})

    def launch_scan(self, mint):
        """One call, one verdict on a pump.fun launch: 0-100 score with positives and risks, graduation odds, dev record, snipers, holders, flow. ($0.025)"""
        return self.call("launch_scan", {"mint": mint})

    def counterparty_check(self, wallet):
        """One-call verdict on a Solana wallet before you deal with it: serial token launcher, fast dumper, trading bot, or clean. ($0.005)"""
        return self.call("counterparty_check", {"wallet": wallet})

    def evm_token_security(self, token, chain=None):
        """Honeypot and scam check for any ERC-20 on 15+ EVM chains: buy/sell tax, can the owner mint, pause, blacklist or change taxes, proxy, holder concentration, LP lock. ($0.005)"""
        return self.call("evm_token_security", {"token": token, "chain": chain})

    def address_check(self, address):
        """Is this a valid address, and for which chain? EVM (with checksum fix), Solana (on-curve wallet vs PDA), Bitcoin (legacy/P2SH/SegWit/Taproot), Tron, Cosmos-style bech32. (free)"""
        return self.call("address_check", {"address": address})

    def vuln_check(self, packages=None, name=None, version=None, ecosystem=None):
        """Known security vulnerabilities for a package version (npm, PyPI, crates, Go, Maven, NuGet, RubyGems, Packagist) with severity, CVE/GHSA ids, and the version that fixes each. ($0.002)"""
        return self.call("vuln_check", {"packages": packages, "name": name, "version": version, "ecosystem": ecosystem})

    # ── Forensics Lobe ──
    def bundle_forensics(self, mint):
        """Who bundled a Solana pump.fun launch: every block-0 wallet labelled sniper bot / bundle / dev-linked, supply bought and still held, holders who got tokens by transfer, serial-dev check, top-10 concentration, RugCheck — plus a back-tested skip/pass verdict. ($0.003)"""
        return self.call("bundle_forensics", {"mint": mint})

    def bundler_profile(self, wallet, limit=None):
        """Is this Solana wallet a bundler? Every pump.fun launch it bought in the first 2 slots over the last 10 days, which creators it keeps bundling for, and whether it is a mass sniper bot or a dev's private bundle wallet. ($0.002)"""
        return self.call("bundler_profile", {"wallet": wallet, "limit": limit})

    def creator_launches(self, creator, limit=None):
        """Every pump.fun coin a Solana wallet created in the last 10 days, how many graduated, and the wallets that bundle its launches again and again (its private bundle crew). ($0.002)"""
        return self.call("creator_launches", {"creator": creator, "limit": limit})

    def evm_bundle_forensics(self, chain, token):
        """Who bundled an EVM token launch (Base, BSC, Ethereum, Arbitrum, Robinhood and 13 more): creation-tx airdrops to fake holders, first-seconds buys, scripted fixed-cadence buying, fresh-wallet and transfer-only holders, dev holdings, exchange-labelled holders, GoPlus contract flags — plus a skip/pass verdict. ($0.005)"""
        return self.call("evm_bundle_forensics", {"chain": chain, "token": token})

    # ── Market Stem ──
    def price(self, mints):
        """USD price, 24h change and liquidity for up to 100 Solana mints; flags illiquid (dead) tokens. (free)"""
        return self.call("price", {"mints": mints})

    def wallet_holdings(self, wallet):
        """Everything a Solana wallet holds — SOL, SPL and Token-2022 tokens — valued in USD and sorted by value. ($0.003)"""
        return self.call("wallet_holdings", {"wallet": wallet})

    def tx_explain(self, signature):
        """Turns any Solana transaction signature into plain facts: status, fee, programs by name, SOL and token balance changes per owner, a one-line summary. ($0.003)"""
        return self.call("tx_explain", {"signature": signature})

    def evm_address(self, address, chain=None):
        """Native balance (with USD), transaction count, contract or wallet, ENS name — for any address on 17 EVM chains at once or one chain. ($0.002)"""
        return self.call("evm_address", {"address": address, "chain": chain})

    def erc20_info(self, token, wallet=None, chain=None):
        """Name, symbol, decimals, total supply and USD price of any ERC-20 — plus a wallet's balance of it — read on chain. ($0.002)"""
        return self.call("erc20_info", {"token": token, "wallet": wallet, "chain": chain})

    def evm_tx(self, hash, chain=None):
        """Any EVM transaction in plain terms: status, from/to, value, fee in native and USD, method called, every ERC-20 transfer decoded with symbols and amounts. ($0.003)"""
        return self.call("evm_tx", {"hash": hash, "chain": chain})

    def solana_network(self):
        """Solana right now: TPS (total and non-vote), slot and block height, epoch progress and ETA, priority-fee percentiles, cluster version. (free)"""
        return self.call("solana_network", {})

    # ── Liquidity Lobe ──
    def dlmm_pool(self, pool):
        """State of a Meteora DLMM pool: price, bin step, fees, TVL, volume and fees by window (30 m–24 h), 24 h fee yield and its annualized APR/APY. ($0.002)"""
        return self.call("dlmm_pool", {"pool": pool})

    def dlmm_positions(self, wallet, history=None, page=None):
        """Open Meteora DLMM positions of any wallet: value, unclaimed fees, PnL, in/out of range — or its closed-position history. ($0.005)"""
        return self.call("dlmm_positions", {"wallet": wallet, "history": history, "page": page})

    def dlmm_whales(self, limit=None):
        """Meteora DLMM liquidity providers ranked by measured on-chain edge: net USD, median multiple, win rate, hold time, size, recency. ($0.02)"""
        return self.call("dlmm_whales", {"limit": limit})

    # ── Chain Cortex ──
    def crypto_price(self, assets, chain=None):
        """Live USD price and 24 h change for up to 30 crypto assets on any chain — by symbol, CoinGecko id, contract or mint address. (free)"""
        return self.call("crypto_price", {"assets": assets, "chain": chain})

    def price_history(self, asset, days=None, interval=None, chain=None):
        """Historical USD prices for any crypto asset (hourly or daily, up to 365 days) with return, high/low, max drawdown and annualized volatility. ($0.002)"""
        return self.call("price_history", {"asset": asset, "days": days, "interval": interval, "chain": chain})

    def defi_rankings(self, chain=None, category=None, sort=None, min_tvl_usd=None, limit=None):
        """Top DeFi protocols by TVL (or 1 d / 7 d TVL change), filterable by chain and category — lending, DEX, liquid staking, bridges, perps… (free)"""
        return self.call("defi_rankings", {"chain": chain, "category": category, "sort": sort, "min_tvl_usd": min_tvl_usd, "limit": limit})

    def defi_protocol(self, protocol):
        """One DeFi protocol in depth: TVL by chain, TVL trend, fees and revenue (24 h/7 d/30 d), market cap, audits, links. ($0.002)"""
        return self.call("defi_protocol", {"protocol": protocol})

    def chain_tvl(self, chain=None, days=None, limit=None):
        """Total value locked on every blockchain right now, ranked — or one chain's daily TVL history. (free)"""
        return self.call("chain_tvl", {"chain": chain, "days": days, "limit": limit})

    def yield_pools(self, chain=None, project=None, token=None, stablecoin_only=None, single_exposure_only=None, min_tvl_usd=None, max_apy=None, sort=None, limit=None):
        """Search ~19,000 DeFi yield pools across all chains: filter by chain, protocol, token, stablecoin-only, min TVL; sort by APY or TVL. Base vs reward APY, 30 d mean, IL risk. ($0.003)"""
        return self.call("yield_pools", {"chain": chain, "project": project, "token": token, "stablecoin_only": stablecoin_only, "single_exposure_only": single_exposure_only, "min_tvl_usd": min_tvl_usd, "max_apy": max_apy, "sort": sort, "limit": limit})

    def stablecoins(self, symbol=None, peg=None, limit=None):
        """Every stablecoin's circulating supply, 1 d/7 d/30 d supply change, current price and peg deviation — spot depegs and mint/burn flows. (free)"""
        return self.call("stablecoins", {"symbol": symbol, "peg": peg, "limit": limit})

    def dex_volumes(self, chain=None, type=None, limit=None):
        """DEX trading volume in the last 24 h / 7 d / 30 d — all chains or one — with the top DEXes and their share and change. (free)"""
        return self.call("dex_volumes", {"chain": chain, "type": type, "limit": limit})

    def fees_revenue(self, metric=None, chain=None, limit=None):
        """Which protocols and chains earn the most: fees or revenue over 24 h / 7 d / 30 d, filterable by chain — the cash-flow view of crypto. ($0.002)"""
        return self.call("fees_revenue", {"metric": metric, "chain": chain, "limit": limit})

    def gas_now(self, chains=None):
        """What a transaction costs right now on 17 EVM chains, Solana and Bitcoin — gwei/priority fee and the USD cost of a transfer and a swap on each. (free)"""
        return self.call("gas_now", {"chains": chains})

    def ens_resolve(self, query):
        """ENS name → address and address → primary name, with avatar, twitter, github, url and email text records. (free)"""
        return self.call("ens_resolve", {"query": query})

    def cex_ticker(self, pair):
        """Live bid/ask/last, 24 h change, volume and range for a pair on Kraken, Coinbase and OKX side by side — with the cross-venue spread. ($0.001)"""
        return self.call("cex_ticker", {"pair": pair})

    def orderbook_depth(self, pair, venue=None):
        """How much size a market can take: bid/ask depth within ±0.1/0.5/1/2/5%, spread, and the slippage of a $10k/$100k/$1M market order on Kraken, Coinbase or OKX. ($0.003)"""
        return self.call("orderbook_depth", {"pair": pair, "venue": venue})

    def funding_rates(self, coin):
        """Perpetual funding for a coin on Hyperliquid, OKX and Kraken Futures side by side — per-interval rate and annualized APR — plus open interest and mark price. ($0.003)"""
        return self.call("funding_rates", {"coin": coin})

    def hyperliquid_markets(self, coin=None, sort=None, limit=None):
        """Every Hyperliquid perpetual: mark/oracle price, 24 h change and volume, open interest, funding APR, premium — ranked by volume, OI, funding or movers. ($0.002)"""
        return self.call("hyperliquid_markets", {"coin": coin, "sort": sort, "limit": limit})

    def fear_greed(self, days=None):
        """The Crypto Fear & Greed Index (0–100) now and its history, with the 7 d / 30 d average and how extreme today is. (free)"""
        return self.call("fear_greed", {"days": days})

    def bitcoin_network(self):
        """Bitcoin right now: fee rates, mempool size, block height, next difficulty adjustment (% and ETA), hashrate. (free)"""
        return self.call("bitcoin_network", {})

    # ── Web Senses ──
    def web_read(self, url, max_chars=None, include_links=None):
        """Any public URL → clean readable markdown: the article/main content without nav, ads or boilerplate, plus title, author, date, word count and links. PDFs too. ($0.002)"""
        return self.call("web_read", {"url": url, "max_chars": max_chars, "include_links": include_links})

    def web_meta(self, url):
        """Everything a page says about itself: title, description, OpenGraph/Twitter card, canonical, favicon, language, RSS/Atom feeds, JSON-LD schema types, headings — and link-preview problems. ($0.001)"""
        return self.call("web_meta", {"url": url})

    def dns_lookup(self, domain):
        """All DNS for a domain — A, AAAA, CNAME, MX, NS, TXT, CAA, SOA — plus SPF and DMARC parsed and graded, so an agent knows where a domain points and whether its email can be spoofed. (free)"""
        return self.call("dns_lookup", {"domain": domain})

    def domain_whois(self, domain):
        """Who registered a domain and when: registrar, creation/expiry dates, age, days to expiry, status locks, nameservers — or that it looks available to register. ($0.002)"""
        return self.call("domain_whois", {"domain": domain})

    def tls_check(self, host, port=None):
        """A site's TLS certificate: issuer, validity, days until expiry, SANs, protocol, cipher, chain and whether browsers trust it. ($0.001)"""
        return self.call("tls_check", {"host": host, "port": port})

    def http_probe(self, url):
        """Is a site up and how is it served: status, full redirect chain, timings (DNS/TLS/first byte/total), server, CDN, caching, compression, and a graded security-header check (HSTS, CSP, frame, sniffing…). ($0.001)"""
        return self.call("http_probe", {"url": url})

    def robots_check(self, url, user_agent=None):
        """May I crawl this? Checks a URL against the site's robots.txt for any user-agent, lists sitemaps and crawl-delay, and reports which AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) the site blocks. ($0.001)"""
        return self.call("robots_check", {"url": url, "user_agent": user_agent})

    def email_check(self, email):
        """Will this email address work? Syntax, domain MX records, disposable/throwaway provider detection, role address (info@, admin@) and free-mail provider — without sending anything. ($0.001)"""
        return self.call("email_check", {"email": email})

    # ── Knowledge Cortex ──
    def wiki(self, query, lang=None, full=None, max_chars=None):
        """Wikipedia in any language: search a topic and get the best article's summary, description, thumbnail and link — or the full article text. (free)"""
        return self.call("wiki", {"query": query, "lang": lang, "full": full, "max_chars": max_chars})

    def arxiv_search(self, query, sort=None, limit=None):
        """Search arXiv research papers by keywords, author or category — newest or most relevant — with abstracts, authors, dates and PDF links. ($0.001)"""
        return self.call("arxiv_search", {"query": query, "sort": sort, "limit": limit})

    def package_info(self, name, ecosystem=None):
        """Any npm, PyPI or crates.io package: latest version and release date, license, downloads, maintainers, repo, dependency count, deprecation — to pick or vet a dependency. ($0.001)"""
        return self.call("package_info", {"name": name, "ecosystem": ecosystem})

    def github_repo(self, repo):
        """A GitHub repository at a glance: stars, forks, open issues, last commit, latest release, license, languages, contributors, archived — is it alive and trustworthy? ($0.002)"""
        return self.call("github_repo", {"repo": repo})

    def hn_search(self, query, type=None, sort=None, days=None, min_points=None, limit=None):
        """Search Hacker News stories and comments by keyword, sorted by relevance or date, filtered by time window and minimum points — what developers are saying about anything. ($0.001)"""
        return self.call("hn_search", {"query": query, "type": type, "sort": sort, "days": days, "min_points": min_points, "limit": limit})

    def doi_lookup(self, doi=None, query=None, limit=None):
        """Resolve a DOI — or search a paper title — to full citation metadata: title, authors, journal, year, citations count, publisher, license, and a ready-made APA/BibTeX citation. ($0.001)"""
        return self.call("doi_lookup", {"doi": doi, "query": query, "limit": limit})

    def book_search(self, query, limit=None):
        """Find books by title, author, subject or ISBN: first published year, editions, ISBNs, page count, ratings, subjects and cover image. ($0.001)"""
        return self.call("book_search", {"query": query, "limit": limit})

    # ── World Map ──
    def weather(self, place, days=None, tz=None):
        """Current weather and hourly/daily forecast for any place name or lat,lon: temperature, feels-like, wind, gusts, rain, cloud, humidity, UV — up to 9 days. ($0.001)"""
        return self.call("weather", {"place": place, "days": days, "tz": tz})

    def geocode(self, query, limit=None):
        """Place name or address → coordinates (with city, state, country, postcode), or lat,lon → the nearest address. Up to 10 candidates. ($0.001)"""
        return self.call("geocode", {"query": query, "limit": limit})

    def fx_rates(self, from_=None, to=None, amount=None, date=None, end_date=None):
        """Official exchange rates for 30 major currencies (European Central Bank reference rates): latest or any date since 1999, convert an amount, or a time series. (free)"""
        return self.call("fx_rates", {"from": from_, "to": to, "amount": amount, "date": date, "end_date": end_date})

    def holidays(self, country, year=None):
        """Public holidays for 100+ countries for any year, whether today is a holiday there, and the next upcoming ones — including regional (state) holidays. (free)"""
        return self.call("holidays", {"country": country, "year": year})

    def time_convert(self, time=None, from_tz=None, to_tz=None, add=None, until=None):
        """Current time in any time zones, convert a time between zones (DST-correct), and date arithmetic: add/subtract durations, days between dates, weekday, ISO week, Unix time. (free)"""
        return self.call("time_convert", {"time": time, "from_tz": from_tz, "to_tz": to_tz, "add": add, "until": until})

    def country_info(self, country):
        """Any country's essentials: capital, population, GDP and GDP per capita (World Bank), currencies, languages, calling code, internet TLD, time zones, driving side, borders, flag. (free)"""
        return self.call("country_info", {"country": country})

    def earthquakes(self, min_magnitude=None, period=None, near=None, radius_km=None, limit=None):
        """Earthquakes worldwide from the last hour to 30 days, filtered by minimum magnitude and optionally within a radius of a place — with depth, tsunami flag and USGS alert level. (free)"""
        return self.call("earthquakes", {"min_magnitude": min_magnitude, "period": period, "near": near, "radius_km": radius_km, "limit": limit})

    def sun_moon(self, place, date=None, tz=None):
        """Sunrise, sunset, golden hour, twilight, day length and solar noon for any place and date — plus moon phase, illumination, moonrise and moonset. (free)"""
        return self.call("sun_moon", {"place": place, "date": date, "tz": tz})

    # ── Utility Cerebellum ──
    def qr_code(self, text=None, format=None, size=None, margin=None, error_correction=None, dark=None, light=None, wifi_ssid=None, wifi_password=None):
        """Make a QR code for any text, URL, Solana Pay / wallet address or Wi-Fi login — as a PNG (base64 data URL) or SVG, with size, margin, colours and error correction. (free)"""
        return self.call("qr_code", {"text": text, "format": format, "size": size, "margin": margin, "error_correction": error_correction, "dark": dark, "light": light, "wifi_ssid": wifi_ssid, "wifi_password": wifi_password})

    def hash_encode(self, input, input_encoding=None, hashes=None, hmac_key=None):
        """Hash data (SHA-256/512, SHA3, Keccak-256, BLAKE2, MD5, SHA-1, RIPEMD-160, HMAC) and convert between utf8, hex, base64, base64url and base58 — exact, in one call. (free)"""
        return self.call("hash_encode", {"input": input, "input_encoding": input_encoding, "hashes": hashes, "hmac_key": hmac_key})

    def json_schema_validate(self, data, schema, parse_strings=None):
        """Validate JSON data against a JSON Schema (draft-07/2019-09/2020-12, formats like email/uri/date-time) and get every error with its exact path — check tool I/O before acting on it. (free)"""
        return self.call("json_schema_validate", {"data": data, "schema": schema, "parse_strings": parse_strings})

    def cron_explain(self, expression, tz=None, count=None):
        """Explain a cron expression in plain English and list its next N run times in any time zone — catch a schedule mistake before it fires at 3 am. (free)"""
        return self.call("cron_explain", {"expression": expression, "tz": tz, "count": count})

    def markdown_convert(self, input, to=None):
        """Convert Markdown to clean HTML (GitHub-flavoured: tables, task lists, fenced code) or HTML back to Markdown. (free)"""
        return self.call("markdown_convert", {"input": input, "to": to})

    def text_diff(self, a, b, mode=None, context=None):
        """Diff two texts: unified diff (patch format), a line/word-level change list, and similarity % — compare versions of a doc, config or code. (free)"""
        return self.call("text_diff", {"a": a, "b": b, "mode": mode, "context": context})

    def unit_convert(self, value, from_, to=None):
        """Convert between units of length, mass, volume, temperature, speed, area, time, data size, energy, power, pressure, frequency and more — or list every unit a value converts to. (free)"""
        return self.call("unit_convert", {"value": value, "from": from_, "to": to})

    def jwt_decode(self, token, secret=None):
        """Decode a JSON Web Token's header and claims, show issued/expiry times in plain dates and whether it has expired — optionally verify an HS256/384/512 signature with a secret. (free)"""
        return self.call("jwt_decode", {"token": token, "secret": secret})

    def random_gen(self, kind=None, count=None, length=None, min=None, max=None, items=None, symbols=None):
        """Cryptographically secure randomness: UUID v4/v7, passwords, API-key-style tokens, integers in a range, dice, coin flips, or a fair shuffle / pick from a list. (free)"""
        return self.call("random_gen", {"kind": kind, "count": count, "length": length, "min": min, "max": max, "items": items, "symbols": symbols})

    def text_stats(self, text, extract=None):
        """Count characters, words, sentences, lines and paragraphs, estimate LLM tokens, reading time and readability (Flesch), and pull out every URL, email, @handle, #tag, number and crypto address. (free)"""
        return self.call("text_stats", {"text": text, "extract": extract})
