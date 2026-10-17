// A.U.G.U.R Synapse client: one method per endpoint (79 tools). Generated from the live catalog.
// Zero dependencies (Node 18+ / browsers / Deno / Bun). MIT.
//
//   import { Synapse } from './augur-synapse.mjs';
//   const synapse = new Synapse({ key: 'hk_…' });          // credit key, optional
//   const { data } = await synapse.price({ mints: ['So11111111111111111111111111111111111111112'] });

export class SynapseError extends Error {
  constructor(status, body) { super((body && body.error) || `HTTP ${status}`); this.status = status; this.body = body; }
}

export class Synapse {
  /**
   * @param {object} [o]
   * @param {string} [o.key]       prepaid credit key (Authorization: Bearer hk_…)
   * @param {boolean} [o.freeTier] send X-Synapse-Free: 1 (10 paid calls/day at no cost)
   * @param {(req: object, tool: string, args: object) => Promise<string|null>} [o.pay]
   *        x402 hook: gets the 402 body, returns a base64 X-PAYMENT payload (or null to give up)
   * @param {string} [o.base]      API base, default https://augur-trade.com/hub/api/v1
   */
  constructor(o = {}) { this.key = o.key; this.freeTier = !!o.freeTier; this.pay = o.pay; this.base = o.base || 'https://augur-trade.com/hub/api/v1'; }

  /** Call any tool by id. Resolves to { ok, tool, ms, billing, data }. */
  async call(tool, args = {}) {
    const headers = { 'content-type': 'application/json' };
    if (this.key) headers.authorization = `Bearer ${this.key}`;
    if (this.freeTier) headers['x-synapse-free'] = '1';
    const send = (h) => fetch(`${this.base}/tools/${tool}`, { method: 'POST', headers: h, body: JSON.stringify(args) });
    let res = await send(headers);
    if (res.status === 402 && this.pay) {
      const payment = await this.pay(await res.json(), tool, args);
      if (payment) res = await send({ ...headers, 'x-payment': payment });
    }
    const body = await res.json().catch(() => null);
    if (!res.ok || !body || body.ok === false) throw new SynapseError(res.status, body);
    const receipt = res.headers.get('x-payment-response');
    if (receipt) body.receipt = JSON.parse(atob(receipt));
    return body;
  }

  /** The live catalog: every tool with price and input schema. */
  async catalog() { return (await fetch(`${this.base}/tools`)).json(); }

  // ── Pump Cortex ──
  /** Live pump.fun heartbeat: trades/min, launches, graduations, graduation rate, hottest tokens in the last 15 min. (free)
   */
  pumpPulse(args = {}) { return this.call('pump_pulse', args); }

  /** pump.fun over time: launches, graduations, graduation rate, trades, SOL volume and unique wallets per day or hour since 2026-09-11 — with a compare window. (free)
   * @param {string} [args.granularity] Bucket size: "day" or "hour". Default "day".
   * @param {string} [args.from] UTC start, e.g. 2026-09-18 or 2026-09-18T06 (default: 14 days / 48 hours back)
   * @param {string} [args.to] UTC end, inclusive (default: now)
   * @param {string} [args.compare_from] start of a second window to compare against
   * @param {string} [args.compare_to] end of the comparison window, inclusive
   */
  pumpHistory(args = {}) { return this.call('pump_history', args); }

  /** The newest pump.fun tokens with dev buy, early buyers/volume, curve progress, market cap and creator launch count. ($0.002)
   * @param {integer} [args.limit] How many of the newest launches to return. Range 1-50. Default 20.
   * @param {integer} [args.window_s] early-flow window after creation. Range 30-3600. Default 300.
   */
  pumpLaunches(args = {}) { return this.call('pump_launches', args); }

  /** Full bonding-curve forensics for one pump.fun mint: flow, dev buys/sells, launch snipers, top curve holders, peak, graduation, red flags. ($0.01)
   * @param {string} [args.mint] pump.fun token mint. Base58 Solana address, 32-44 chars.
   */
  pumpToken(args = {}) { return this.call('pump_token', args); }

  /** Any wallet's pump.fun trading record: realized PnL, win rate, hold time, frequency (bot or human), tokens it launched. ($0.01)
   * @param {string} [args.wallet] wallet address. Base58 Solana address, 32-44 chars.
   * @param {integer} [args.limit] How many of the wallet's most recent recorded trades to analyse. Range 100-20000. Default 20000.
   */
  pumpWallet(args = {}) { return this.call('pump_wallet', args); }

  /** A creator wallet's launch history: launches, graduation rate, launch cadence, how fast the dev sells, verdict. ($0.01)
   * @param {string} [args.creator] creator (dev) wallet. Base58 Solana address, 32-44 chars.
   */
  pumpDev(args = {}) { return this.call('pump_dev', args); }

  /** Probability a pump.fun launch graduates, from how comparable launches in our tape actually ended — with the lift over the ~3% base rate. ($0.01)
   * @param {string} [args.mint] pump.fun token mint. Base58 Solana address, 32-44 chars.
   */
  pumpOdds(args = {}) { return this.call('pump_odds', args); }

  /** The pump.fun wallets with the best realized PnL in the last 24 h — and the tokens those wallets are buying right now. ($0.02)
   * @param {integer} [args.limit] How many top wallets to return. Range 1-50. Default 20.
   * @param {integer} [args.window_min] look-back for buying_now. Range 1-120. Default 15.
   * @param {string} [args.sort] Rank by realized PnL in SOL ("pnl"), win rate ("win_rate") or return on SOL spent ("roi"). Default "pnl".
   * @param {boolean} [args.exclude_bots] drop sub-20-second and high-frequency wallets. Default false.
   */
  smartMoney(args = {}) { return this.call('smart_money', args); }

  /** Would copying this wallet have made money? Replays its pump.fun entries and exits 0–25 slots late on the recorded curve and shows where the edge dies. ($0.03)
   * @param {string} [args.wallet] leader wallet to copy. Base58 Solana address, 32-44 chars.
   * @param {integer} [args.days] How many days of the wallet's history to replay. Range 1-14. Default 3.
   * @param {number} [args.size_sol] SOL per copied entry. Range 0.01-10. Default 0.1.
   * @param {string} [args.exit] sell on the leader's first sell, or once it has sold 90%. Default "first_sell".
   * @param {integer} [args.max_positions] most recent positions to replay. Range 10-300. Default 150.
   */
  copyBacktest(args = {}) { return this.call('copy_backtest', args); }

  // ── Risk Amygdala ──
  /** 0-100 rug-risk score for any Solana token: mint/freeze authority, Token-2022 traps, holder concentration, liquidity depth — plus pump.fun curve flags. ($0.005)
   * @param {string} [args.mint] token mint. Base58 Solana address, 32-44 chars.
   */
  tokenRisk(args = {}) { return this.call('token_risk', args); }

  /** One call, one verdict on a pump.fun launch: 0-100 score with positives and risks, graduation odds, dev record, snipers, holders, flow. ($0.025)
   * @param {string} [args.mint] pump.fun token mint. Base58 Solana address, 32-44 chars.
   */
  launchScan(args = {}) { return this.call('launch_scan', args); }

  /** One-call verdict on a Solana wallet before you deal with it: serial token launcher, fast dumper, trading bot, or clean. ($0.005)
   * @param {string} [args.wallet] wallet address. Base58 Solana address, 32-44 chars.
   */
  counterpartyCheck(args = {}) { return this.call('counterparty_check', args); }

  /** Honeypot and scam check for any ERC-20 on 15+ EVM chains: buy/sell tax, can the owner mint, pause, blacklist or change taxes, proxy, holder concentration, LP lock. ($0.005)
   * @param {string} [args.token] ERC-20 contract address (0x + 40 hex).
   * @param {string} [args.chain] EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hy
   */
  evmTokenSecurity(args = {}) { return this.call('evm_token_security', args); }

  /** Is this a valid address, and for which chain? EVM (with checksum fix), Solana (on-curve wallet vs PDA), Bitcoin (legacy/P2SH/SegWit/Taproot), Tron, Cosmos-style bech32. (free)
   * @param {string} [args.address] Any string that might be a crypto address (EVM, Solana, Bitcoin, Tron, etc.).
   */
  addressCheck(args = {}) { return this.call('address_check', args); }

  /** Known security vulnerabilities for a package version (npm, PyPI, crates, Go, Maven, NuGet, RubyGems, Packagist) with severity, CVE/GHSA ids, and the version that fixes each. ($0.002)
   * @param {array} [args.packages] e.g. ["npm:lodash@4.17.15","pypi:requests@2.19.0"]. 0-50 items.
   * @param {string} [args.name] Exact package name as published.
   * @param {string} [args.version] Exact version to check, e.g. "4.17.1".
   * @param {string} [args.ecosystem] Package ecosystem: npm, PyPI, crates.io, Go, Maven, NuGet, RubyGems or Packagist. Default "npm".
   */
  vulnCheck(args = {}) { return this.call('vuln_check', args); }

  // ── Forensics Lobe ──
  /** Who bundled a Solana pump.fun launch: every block-0 wallet labelled sniper bot / bundle / dev-linked, supply bought and still held, holders who got tokens by transfer, serial-dev check, top-10 concentration, RugCheck — plus a back-tested skip/pass verdict. ($0.003)
   * @param {string} [args.mint] Solana token mint (pump.fun launches get the full bundle view) Base58 Solana address, 32-44 chars.
   */
  bundleForensics(args = {}) { return this.call('bundle_forensics', args); }

  /** Is this Solana wallet a bundler? Every pump.fun launch it bought in the first 2 slots over the last 10 days, which creators it keeps bundling for, and whether it is a mass sniper bot or a dev's private bundle wallet. ($0.002)
   * @param {string} [args.wallet] Solana wallet. Base58 Solana address, 32-44 chars.
   * @param {integer} [args.limit] Range 1-100. Default 25.
   */
  bundlerProfile(args = {}) { return this.call('bundler_profile', args); }

  /** Every pump.fun coin a Solana wallet created in the last 10 days, how many graduated, and the wallets that bundle its launches again and again (its private bundle crew). ($0.002)
   * @param {string} [args.creator] creator (dev) wallet. Base58 Solana address, 32-44 chars.
   * @param {integer} [args.limit] Range 1-100. Default 25.
   */
  creatorLaunches(args = {}) { return this.call('creator_launches', args); }

  /** Who bundled an EVM token launch (Base, BSC, Ethereum, Arbitrum, Robinhood and 13 more): creation-tx airdrops to fake holders, first-seconds buys, scripted fixed-cadence buying, fresh-wallet and transfer-only holders, dev holdings, exchange-labelled holders, GoPlus contract flags — plus a skip/pass verdict. ($0.005)
   * @param {string} [args.chain] EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hy
   * @param {string} [args.token] ERC-20 token contract address. 0x + 40 hex chars.
   */
  evmBundleForensics(args = {}) { return this.call('evm_bundle_forensics', args); }

  // ── Market Stem ──
  /** USD price, 24h change and liquidity for up to 100 Solana mints; flags illiquid (dead) tokens. (free)
   * @param {array} [args.mints] Solana token mint addresses (base58) to price. 1-100 items.
   */
  price(args = {}) { return this.call('price', args); }

  /** Everything a Solana wallet holds — SOL, SPL and Token-2022 tokens — valued in USD and sorted by value. ($0.003)
   * @param {string} [args.wallet] wallet address. Base58 Solana address, 32-44 chars.
   */
  walletHoldings(args = {}) { return this.call('wallet_holdings', args); }

  /** Turns any Solana transaction signature into plain facts: status, fee, programs by name, SOL and token balance changes per owner, a one-line summary. ($0.003)
   * @param {string} [args.signature] Solana transaction signature (base58, 64-90 chars).
   */
  txExplain(args = {}) { return this.call('tx_explain', args); }

  /** Native balance (with USD), transaction count, contract or wallet, ENS name — for any address on 17 EVM chains at once or one chain. ($0.002)
   * @param {string} [args.address] EVM wallet or contract address (0x + 40 hex).
   * @param {string} [args.chain] Chain to read, or "all" to check every supported chain. One of "all", "ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanc
   */
  evmAddress(args = {}) { return this.call('evm_address', args); }

  /** Name, symbol, decimals, total supply and USD price of any ERC-20 — plus a wallet's balance of it — read on chain. ($0.002)
   * @param {string} [args.token] ERC-20 contract address (0x + 40 hex).
   * @param {string} [args.wallet] optional holder. 0x + 40 hex chars.
   * @param {string} [args.chain] EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hy
   */
  erc20Info(args = {}) { return this.call('erc20_info', args); }

  /** Any EVM transaction in plain terms: status, from/to, value, fee in native and USD, method called, every ERC-20 transfer decoded with symbols and amounts. ($0.003)
   * @param {string} [args.hash] EVM transaction hash (0x + 64 hex).
   * @param {string} [args.chain] EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hy
   */
  evmTx(args = {}) { return this.call('evm_tx', args); }

  /** Solana right now: TPS (total and non-vote), slot and block height, epoch progress and ETA, priority-fee percentiles, cluster version. (free)
   */
  solanaNetwork(args = {}) { return this.call('solana_network', args); }

  // ── Liquidity Lobe ──
  /** State of a Meteora DLMM pool: price, bin step, fees, TVL, volume and fees by window (30 m–24 h), 24 h fee yield and its annualized APR/APY. ($0.002)
   * @param {string} [args.pool] DLMM pool (pair) address. Base58 Solana address, 32-44 chars.
   */
  dlmmPool(args = {}) { return this.call('dlmm_pool', args); }

  /** Open Meteora DLMM positions of any wallet: value, unclaimed fees, PnL, in/out of range — or its closed-position history. ($0.005)
   * @param {string} [args.wallet] wallet address. Base58 Solana address, 32-44 chars.
   * @param {boolean} [args.history] true = closed-position history instead of open positions. Default false.
   * @param {integer} [args.page] Page of closed-position history (only with history=true). Range 1-50. Default 1.
   */
  dlmmPositions(args = {}) { return this.call('dlmm_positions', args); }

  /** Meteora DLMM liquidity providers ranked by measured on-chain edge: net USD, median multiple, win rate, hold time, size, recency. ($0.02)
   * @param {integer} [args.limit] How many ranked LP wallets to return. Range 1-25. Default 10.
   */
  dlmmWhales(args = {}) { return this.call('dlmm_whales', args); }

  // ── Chain Cortex ──
  /** Live USD price and 24 h change for up to 30 crypto assets on any chain — by symbol, CoinGecko id, contract or mint address. (free)
   * @param {array} [args.assets] e.g. ["BTC","ETH","coingecko:solana","base:0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"]. 0-30 items.
   * @param {string} [args.chain] EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hy
   */
  cryptoPrice(args = {}) { return this.call('crypto_price', args); }

  /** Historical USD prices for any crypto asset (hourly or daily, up to 365 days) with return, high/low, max drawdown and annualized volatility. ($0.002)
   * @param {string} [args.asset] symbol, CoinGecko id, chain:address or address
   * @param {integer} [args.days] How many days back; hourly points up to 90 days, daily beyond. Range 1-365. Default 30.
   * @param {string} [args.interval] hourly allowed up to 30 days. One of "hour", "day". Default "day".
   * @param {string} [args.chain] EVM chain: ethereum, base, arbitrum, optimism, polygon, bsc, avalanche, linea, blast, scroll, gnosis, sonic, unichain, mantle, berachain, hy
   */
  priceHistory(args = {}) { return this.call('price_history', args); }

  /** Top DeFi protocols by TVL (or 1 d / 7 d TVL change), filterable by chain and category — lending, DEX, liquid staking, bridges, perps… (free)
   * @param {string} [args.chain] DefiLlama chain name, e.g. Ethereum, Solana, Base, Arbitrum (optional)
   * @param {string} [args.category] e.g. Lending, Dexs, Liquid Staking, Bridge, Derivatives, Yield, CDP, RWA (optional)
   * @param {string} [args.sort] Rank by current TVL or by 1-day / 7-day TVL change. One of "tvl", "change_1d", "change_7d". Default "tvl".
   * @param {number} [args.min_tvl_usd] Skip protocols with less TVL than this (USD). Default 1000000.
   * @param {integer} [args.limit] How many protocols to return. Range 1-100. Default 25.
   */
  defiRankings(args = {}) { return this.call('defi_rankings', args); }

  /** One DeFi protocol in depth: TVL by chain, TVL trend, fees and revenue (24 h/7 d/30 d), market cap, audits, links. ($0.002)
   * @param {string} [args.protocol] name or slug
   */
  defiProtocol(args = {}) { return this.call('defi_protocol', args); }

  /** Total value locked on every blockchain right now, ranked — or one chain's daily TVL history. (free)
   * @param {string} [args.chain] e.g. Solana, Ethereum, Base (optional)
   * @param {integer} [args.days] Days of daily TVL history (only when a single chain is requested). Range 7-365. Default 90.
   * @param {integer} [args.limit] How many chains to return in the ranking. Range 1-200. Default 30.
   */
  chainTvl(args = {}) { return this.call('chain_tvl', args); }

  /** Search ~19,000 DeFi yield pools across all chains: filter by chain, protocol, token, stablecoin-only, min TVL; sort by APY or TVL. Base vs reward APY, 30 d mean, IL risk. ($0.003)
   * @param {string} [args.chain] e.g. Ethereum, Solana, Base, Arbitrum
   * @param {string} [args.project] protocol slug, e.g. aave-v3, kamino-lend, uniswap-v3
   * @param {string} [args.token] token symbol that must appear in the pool, e.g. USDC, SOL
   * @param {boolean} [args.stablecoin_only] true = only pools whose assets are all stablecoins. Default false.
   * @param {boolean} [args.single_exposure_only] no LP pairs (no impermanent loss) Default false.
   * @param {number} [args.min_tvl_usd] Skip pools with less TVL than this (USD); raises quality. Default 1000000.
   * @param {number} [args.max_apy] drop absurd APYs above this. Default 1000.
   * @param {string} [args.sort] Rank by total APY, TVL, base (non-reward) APY or 30-day mean APY. One of "apy", "tvl", "apy_base", "apy_30d_mean". Default "apy".
   * @param {integer} [args.limit] How many pools to return. Range 1-50. Default 20.
   */
  yieldPools(args = {}) { return this.call('yield_pools', args); }

  /** Every stablecoin's circulating supply, 1 d/7 d/30 d supply change, current price and peg deviation — spot depegs and mint/burn flows. (free)
   * @param {string} [args.symbol] e.g. USDC, USDe, PYUSD (optional)
   * @param {string} [args.peg] Filter by peg currency type. One of "any", "peggedUSD", "peggedEUR", "peggedVAR". Default "any".
   * @param {integer} [args.limit] How many stablecoins to return. Range 1-100. Default 25.
   */
  stablecoins(args = {}) { return this.call('stablecoins', args); }

  /** DEX trading volume in the last 24 h / 7 d / 30 d — all chains or one — with the top DEXes and their share and change. (free)
   * @param {string} [args.chain] e.g. Solana, Base (optional)
   * @param {string} [args.type] Spot DEXes, perp/derivatives DEXes, or DEX aggregators. One of "dexs", "derivatives", "aggregators". Default "dexs".
   * @param {integer} [args.limit] How many venues to return. Range 1-50. Default 15.
   */
  dexVolumes(args = {}) { return this.call('dex_volumes', args); }

  /** Which protocols and chains earn the most: fees or revenue over 24 h / 7 d / 30 d, filterable by chain — the cash-flow view of crypto. ($0.002)
   * @param {string} [args.metric] Gross fees paid by users, or revenue kept by the protocol. One of "fees", "revenue". Default "fees".
   * @param {string} [args.chain] optional
   * @param {integer} [args.limit] How many protocols to return. Range 1-50. Default 20.
   */
  feesRevenue(args = {}) { return this.call('fees_revenue', args); }

  /** What a transaction costs right now on 17 EVM chains, Solana and Bitcoin — gwei/priority fee and the USD cost of a transfer and a swap on each. (free)
   * @param {array} [args.chains] subset, e.g. ["ethereum","base","solana","bitcoin"] (default: all) 0-20 items.
   */
  gasNow(args = {}) { return this.call('gas_now', args); }

  /** ENS name → address and address → primary name, with avatar, twitter, github, url and email text records. (free)
   * @param {string} [args.query] vitalik.eth or 0x address
   */
  ensResolve(args = {}) { return this.call('ens_resolve', args); }

  /** Live bid/ask/last, 24 h change, volume and range for a pair on Kraken, Coinbase and OKX side by side — with the cross-venue spread. ($0.001)
   * @param {string} [args.pair] BTC/USD, ETH-USDT, SOL
   */
  cexTicker(args = {}) { return this.call('cex_ticker', args); }

  /** How much size a market can take: bid/ask depth within ±0.1/0.5/1/2/5%, spread, and the slippage of a $10k/$100k/$1M market order on Kraken, Coinbase or OKX. ($0.003)
   * @param {string} [args.pair] Market pair as BASE/QUOTE, e.g. "BTC/USD" or "ETH/USDT".
   * @param {string} [args.venue] Exchange whose order book to read. One of "coinbase", "kraken", "okx". Default "coinbase".
   */
  orderbookDepth(args = {}) { return this.call('orderbook_depth', args); }

  /** Perpetual funding for a coin on Hyperliquid, OKX and Kraken Futures side by side — per-interval rate and annualized APR — plus open interest and mark price. ($0.003)
   * @param {string} [args.coin] BTC, ETH, SOL…
   */
  fundingRates(args = {}) { return this.call('funding_rates', args); }

  /** Every Hyperliquid perpetual: mark/oracle price, 24 h change and volume, open interest, funding APR, premium — ranked by volume, OI, funding or movers. ($0.002)
   * @param {string} [args.coin] optional, e.g. BTC
   * @param {string} [args.sort] Rank by 24 h volume, open interest, highest or most negative funding, or 24 h change. One of "volume", "open_interest", "funding", "funding_
   * @param {integer} [args.limit] How many markets to return. Range 1-100. Default 20.
   */
  hyperliquidMarkets(args = {}) { return this.call('hyperliquid_markets', args); }

  /** The Crypto Fear & Greed Index (0–100) now and its history, with the 7 d / 30 d average and how extreme today is. (free)
   * @param {integer} [args.days] Days of index history to include. Range 1-365. Default 30.
   */
  fearGreed(args = {}) { return this.call('fear_greed', args); }

  /** Bitcoin right now: fee rates, mempool size, block height, next difficulty adjustment (% and ETA), hashrate. (free)
   */
  bitcoinNetwork(args = {}) { return this.call('bitcoin_network', args); }

  // ── Web Senses ──
  /** Any public URL → clean readable markdown: the article/main content without nav, ads or boilerplate, plus title, author, date, word count and links. PDFs too. ($0.002)
   * @param {string} [args.url] http(s) URL
   * @param {integer} [args.max_chars] Truncate the returned markdown to this many characters. Range 500-100000. Default 20000.
   * @param {boolean} [args.include_links] keep hyperlinks (absolute) in the markdown and return a link list. Default false.
   */
  webRead(args = {}) { return this.call('web_read', args); }

  /** Everything a page says about itself: title, description, OpenGraph/Twitter card, canonical, favicon, language, RSS/Atom feeds, JSON-LD schema types, headings — and link-preview problems. ($0.001)
   * @param {string} [args.url] Absolute http(s) URL of the page.
   */
  webMeta(args = {}) { return this.call('web_meta', args); }

  /** All DNS for a domain — A, AAAA, CNAME, MX, NS, TXT, CAA, SOA — plus SPF and DMARC parsed and graded, so an agent knows where a domain points and whether its email can be spoofed. (free)
   * @param {string} [args.domain] Domain name without scheme, e.g. "example.com".
   */
  dnsLookup(args = {}) { return this.call('dns_lookup', args); }

  /** Who registered a domain and when: registrar, creation/expiry dates, age, days to expiry, status locks, nameservers — or that it looks available to register. ($0.002)
   * @param {string} [args.domain] Registrable domain without scheme, e.g. "example.com".
   */
  domainWhois(args = {}) { return this.call('domain_whois', args); }

  /** A site's TLS certificate: issuer, validity, days until expiry, SANs, protocol, cipher, chain and whether browsers trust it. ($0.001)
   * @param {string} [args.host] Hostname without scheme or path, e.g. "example.com".
   * @param {integer} [args.port] TCP port serving TLS. Range 1-65535. Default 443.
   */
  tlsCheck(args = {}) { return this.call('tls_check', args); }

  /** Is a site up and how is it served: status, full redirect chain, timings (DNS/TLS/first byte/total), server, CDN, caching, compression, and a graded security-header check (HSTS, CSP, frame, sniffing…). ($0.001)
   * @param {string} [args.url] Absolute http(s) URL to probe.
   */
  httpProbe(args = {}) { return this.call('http_probe', args); }

  /** May I crawl this? Checks a URL against the site's robots.txt for any user-agent, lists sitemaps and crawl-delay, and reports which AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) the site blocks. ($0.001)
   * @param {string} [args.url] Absolute URL you intend to crawl.
   * @param {string} [args.user_agent] User-agent token to evaluate the rules for. Defaults to the exchange's own user agent.
   */
  robotsCheck(args = {}) { return this.call('robots_check', args); }

  /** Will this email address work? Syntax, domain MX records, disposable/throwaway provider detection, role address (info@, admin@) and free-mail provider — without sending anything. ($0.001)
   * @param {string} [args.email] Email address to check. No mail is sent.
   */
  emailCheck(args = {}) { return this.call('email_check', args); }

  // ── Knowledge Cortex ──
  /** Wikipedia in any language: search a topic and get the best article's summary, description, thumbnail and link — or the full article text. (free)
   * @param {string} [args.query] Topic or article title to look up.
   * @param {string} [args.lang] Wikipedia language code, e.g. "en", "de", "pt-br". Default "en".
   * @param {boolean} [args.full] true = return the full article text, not just the summary. Default false.
   * @param {integer} [args.max_chars] Truncate full article text to this many characters (with full=true). Range 500-60000. Default 8000.
   */
  wiki(args = {}) { return this.call('wiki', args); }

  /** Search arXiv research papers by keywords, author or category — newest or most relevant — with abstracts, authors, dates and PDF links. ($0.001)
   * @param {string} [args.query] e.g. "tool use agents" or au:hinton or cat:cs.CL AND ti:reasoning
   * @param {string} [args.sort] Order by relevance to the query or by submission date. One of "relevance", "newest". Default "relevance".
   * @param {integer} [args.limit] How many papers to return. Range 1-30. Default 10.
   */
  arxivSearch(args = {}) { return this.call('arxiv_search', args); }

  /** Any npm, PyPI or crates.io package: latest version and release date, license, downloads, maintainers, repo, dependency count, deprecation — to pick or vet a dependency. ($0.001)
   * @param {string} [args.name] Exact package name as published, e.g. "express" or "requests".
   * @param {string} [args.ecosystem] Registry to look in. One of "npm", "pypi", "crates". Default "npm".
   */
  packageInfo(args = {}) { return this.call('package_info', args); }

  /** A GitHub repository at a glance: stars, forks, open issues, last commit, latest release, license, languages, contributors, archived — is it alive and trustworthy? ($0.002)
   * @param {string} [args.repo] owner/name or a github.com URL
   */
  githubRepo(args = {}) { return this.call('github_repo', args); }

  /** Search Hacker News stories and comments by keyword, sorted by relevance or date, filtered by time window and minimum points — what developers are saying about anything. ($0.001)
   * @param {string} [args.query] Keywords to search for.
   * @param {string} [args.type] Stories, comments, Show HN or Ask HN posts. One of "story", "comment", "show_hn", "ask_hn". Default "story".
   * @param {string} [args.sort] Order by relevance or newest first. One of "relevance", "date". Default "relevance".
   * @param {integer} [args.days] Only items from the last N days. Range 1-3650. Default 365.
   * @param {integer} [args.min_points] Only items with at least this many points. Default 0.
   * @param {integer} [args.limit] How many results to return. Range 1-50. Default 15.
   */
  hnSearch(args = {}) { return this.call('hn_search', args); }

  /** Resolve a DOI — or search a paper title — to full citation metadata: title, authors, journal, year, citations count, publisher, license, and a ready-made APA/BibTeX citation. ($0.001)
   * @param {string} [args.doi] e.g. 10.1038/nature14539
   * @param {string} [args.query] title/author search instead of a DOI
   * @param {integer} [args.limit] How many matches to return when searching by title. Range 1-20. Default 5.
   */
  doiLookup(args = {}) { return this.call('doi_lookup', args); }

  /** Find books by title, author, subject or ISBN: first published year, editions, ISBNs, page count, ratings, subjects and cover image. ($0.001)
   * @param {string} [args.query] title, author or ISBN
   * @param {integer} [args.limit] How many books to return. Range 1-20. Default 5.
   */
  bookSearch(args = {}) { return this.call('book_search', args); }

  // ── World Map ──
  /** Current weather and hourly/daily forecast for any place name or lat,lon: temperature, feels-like, wind, gusts, rain, cloud, humidity, UV — up to 9 days. ($0.001)
   * @param {string} [args.place] city/address or "lat,lon"
   * @param {integer} [args.days] Days of daily forecast to include. Range 1-9. Default 3.
   * @param {string} [args.tz] IANA time zone for local times (optional)
   */
  weather(args = {}) { return this.call('weather', args); }

  /** Place name or address → coordinates (with city, state, country, postcode), or lat,lon → the nearest address. Up to 10 candidates. ($0.001)
   * @param {string} [args.query] address/place, or "lat,lon" for reverse
   * @param {integer} [args.limit] How many candidate matches to return. Range 1-10. Default 3.
   */
  geocode(args = {}) { return this.call('geocode', args); }

  /** Official exchange rates for 30 major currencies (European Central Bank reference rates): latest or any date since 1999, convert an amount, or a time series. (free)
   * @param {string} [args.from] Base currency ISO 4217 code, e.g. "USD". Default "USD".
   * @param {array} [args.to] targets (default: all) 0-30 items.
   * @param {number} [args.amount] Amount of the base currency to convert. Default 1.
   * @param {string} [args.date] historical date (optional)
   * @param {string} [args.end_date] with date: returns a daily series
   */
  fxRates(args = {}) { return this.call('fx_rates', args); }

  /** Public holidays for 100+ countries for any year, whether today is a holiday there, and the next upcoming ones — including regional (state) holidays. (free)
   * @param {string} [args.country] ISO code or name, e.g. AU, United States
   * @param {integer} [args.year] Calendar year; defaults to the current year. Range 1975-2075.
   */
  holidays(args = {}) { return this.call('holidays', args); }

  /** Current time in any time zones, convert a time between zones (DST-correct), and date arithmetic: add/subtract durations, days between dates, weekday, ISO week, Unix time. (free)
   * @param {string} [args.time] ISO time, "now", or a Unix timestamp; naive times are read in from_tz
   * @param {string} [args.from_tz] IANA time zone the input time is in, e.g. "America/New_York". Default "UTC".
   * @param {array} [args.to_tz] IANA time zones to convert into. 0-20 items. Default ["UTC"].
   * @param {string} [args.add] e.g. "+3d 4h", "-90m", "+2w"
   * @param {string} [args.until] second ISO date: returns the difference
   */
  timeConvert(args = {}) { return this.call('time_convert', args); }

  /** Any country's essentials: capital, population, GDP and GDP per capita (World Bank), currencies, languages, calling code, internet TLD, time zones, driving side, borders, flag. (free)
   * @param {string} [args.country] name or ISO code
   */
  countryInfo(args = {}) { return this.call('country_info', args); }

  /** Earthquakes worldwide from the last hour to 30 days, filtered by minimum magnitude and optionally within a radius of a place — with depth, tsunami flag and USGS alert level. (free)
   * @param {number} [args.min_magnitude] Only quakes at or above this magnitude. Range 0-9. Default 4.5.
   * @param {string} [args.period] Look-back window. One of "hour", "day", "week", "month". Default "day".
   * @param {string} [args.near] place or lat,lon (optional)
   * @param {number} [args.radius_km] Search radius around the given place (only when a place is given). Range 10-5000. Default 1000.
   * @param {integer} [args.limit] How many quakes to return, largest first. Range 1-100. Default 20.
   */
  earthquakes(args = {}) { return this.call('earthquakes', args); }

  /** Sunrise, sunset, golden hour, twilight, day length and solar noon for any place and date — plus moon phase, illumination, moonrise and moonset. (free)
   * @param {string} [args.place] Place name or "lat,lon".
   * @param {string} [args.date] default today (UTC)
   * @param {string} [args.tz] IANA zone for local times
   */
  sunMoon(args = {}) { return this.call('sun_moon', args); }

  // ── Utility Cerebellum ──
  /** Make a QR code for any text, URL, Solana Pay / wallet address or Wi-Fi login — as a PNG (base64 data URL) or SVG, with size, margin, colours and error correction. (free)
   * @param {string} [args.text] Text or URL to encode (ignored when wifi_ssid is set).
   * @param {string} [args.format] PNG (base64 data URL) or SVG markup. One of "png", "svg". Default "png".
   * @param {integer} [args.size] Image width/height in pixels. Range 64-2048. Default 512.
   * @param {integer} [args.margin] Quiet-zone width in modules. Range 0-16. Default 2.
   * @param {string} [args.error_correction] Error-correction level: L 7%, M 15%, Q 25%, H 30%. One of "L", "M", "Q", "H". Default "M".
   * @param {string} [args.dark] Foreground colour as #rrggbb. Default "#000000".
   * @param {string} [args.light] Background colour as #rrggbb. Default "#ffffff".
   * @param {string} [args.wifi_ssid] Wi-Fi network name; makes a join-network QR instead of text.
   * @param {string} [args.wifi_password] Wi-Fi password (with wifi_ssid; omit for open networks).
   */
  qrCode(args = {}) { return this.call('qr_code', args); }

  /** Hash data (SHA-256/512, SHA3, Keccak-256, BLAKE2, MD5, SHA-1, RIPEMD-160, HMAC) and convert between utf8, hex, base64, base64url and base58 — exact, in one call. (free)
   * @param {string} [args.input] Data to hash or re-encode.
   * @param {string} [args.input_encoding] How the input string is encoded. One of "utf8", "hex", "base64", "base58". Default "utf8".
   * @param {array} [args.hashes] sha256, sha512, sha3-256, sha3-512, keccak256, blake2b512, blake2s256, md5, sha1, ripemd160. 0-12 items. Default ["sha256","keccak256"].
   * @param {string} [args.hmac_key] if set, HMAC instead of plain hash (utf8 key)
   */
  hashEncode(args = {}) { return this.call('hash_encode', args); }

  /** Validate JSON data against a JSON Schema (draft-07/2019-09/2020-12, formats like email/uri/date-time) and get every error with its exact path — check tool I/O before acting on it. (free)
   * @param {any} [args.data] any JSON value (or a JSON string with parse_strings=true)
   * @param {object} [args.schema] The JSON Schema to validate against.
   * @param {boolean} [args.parse_strings] true = if data is a string, parse it as JSON first. Default false.
   */
  jsonSchemaValidate(args = {}) { return this.call('json_schema_validate', args); }

  /** Explain a cron expression in plain English and list its next N run times in any time zone — catch a schedule mistake before it fires at 3 am. (free)
   * @param {string} [args.expression] Cron expression, 5 fields (or 6 with seconds), e.g. "15 9-17 * * 1-5".
   * @param {string} [args.tz] IANA time zone for the next-run times. Default "UTC".
   * @param {integer} [args.count] How many upcoming run times to list. Range 1-50. Default 5.
   */
  cronExplain(args = {}) { return this.call('cron_explain', args); }

  /** Convert Markdown to clean HTML (GitHub-flavoured: tables, task lists, fenced code) or HTML back to Markdown. (free)
   * @param {string} [args.input] Markdown or HTML to convert.
   * @param {string} [args.to] Target format. One of "html", "markdown". Default "html".
   */
  markdownConvert(args = {}) { return this.call('markdown_convert', args); }

  /** Diff two texts: unified diff (patch format), a line/word-level change list, and similarity % — compare versions of a doc, config or code. (free)
   * @param {string} [args.a] Original text.
   * @param {string} [args.b] Changed text.
   * @param {string} [args.mode] Diff granularity. One of "lines", "words". Default "lines".
   * @param {integer} [args.context] Unchanged lines of context around each change in the patch. Range 0-20. Default 3.
   */
  textDiff(args = {}) { return this.call('text_diff', args); }

  /** Convert between units of length, mass, volume, temperature, speed, area, time, data size, energy, power, pressure, frequency and more — or list every unit a value converts to. (free)
   * @param {number} [args.value] Number to convert.
   * @param {string} [args.from] Source unit, e.g. "mi", "kg", "degF", "GB".
   * @param {string} [args.to] omit to get every compatible unit
   */
  unitConvert(args = {}) { return this.call('unit_convert', args); }

  /** Decode a JSON Web Token's header and claims, show issued/expiry times in plain dates and whether it has expired — optionally verify an HS256/384/512 signature with a secret. (free)
   * @param {string} [args.token] The JWT (three base64url parts). The signature is not verified.
   * @param {string} [args.secret] optional HMAC secret to verify HS* signatures
   */
  jwtDecode(args = {}) { return this.call('jwt_decode', args); }

  /** Cryptographically secure randomness: UUID v4/v7, passwords, API-key-style tokens, integers in a range, dice, coin flips, or a fair shuffle / pick from a list. (free)
   * @param {string} [args.kind] What to generate. One of "uuid4", "uuid7", "password", "token", "int", "shuffle", "pick", "coin", "dice". Default "uuid4".
   * @param {integer} [args.count] How many values to generate. Range 1-100. Default 1.
   * @param {integer} [args.length] Length for passwords and tokens. Range 4-256. Default 20.
   * @param {integer} [args.min] Lowest integer (kind=int or dice sides). Default 1.
   * @param {integer} [args.max] Highest integer (kind=int). Default 100.
   * @param {array} [args.items] List to shuffle or pick from (kind=shuffle or pick). 0-1000 items.
   * @param {boolean} [args.symbols] Include symbols in passwords. Default true.
   */
  randomGen(args = {}) { return this.call('random_gen', args); }

  /** Count characters, words, sentences, lines and paragraphs, estimate LLM tokens, reading time and readability (Flesch), and pull out every URL, email, @handle, #tag, number and crypto address. (free)
   * @param {string} [args.text] Text (or a URL when extract=true) to analyse.
   * @param {boolean} [args.extract] true = if text is a URL, fetch the page and analyse its readable text. Default true.
   */
  textStats(args = {}) { return this.call('text_stats', args); }

}
