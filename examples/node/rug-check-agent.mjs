// A tiny pre-trade guard: two calls, one decision.
//   SYNAPSE_KEY=hk_… node rug-check-agent.mjs <pump.fun mint>      (no key: uses the free tier)
import { Foresight } from '../../sdk/js/augur-synapse.mjs';

const mint = process.argv[2];
if (!mint) { console.error('usage: node rug-check-agent.mjs <mint>'); process.exit(1); }
const synapse = new Foresight({ key: process.env.SYNAPSE_KEY, freeTier: !process.env.SYNAPSE_KEY });

const [scan, risk] = await Promise.all([synapse.launchScan({ mint }), synapse.tokenRisk({ mint })]);
const s = scan.data, r = risk.data;                     // launch_scan.score: 0-100, higher is better
const danger = (r.flags || []).filter((f) => !['ok', 'info'].includes(f.severity));   // token_risk.score: 100 = safest
const ok = s.score >= 60 && r.score >= 60 && danger.length === 0;

console.log({ mint, decision: ok ? 'OK TO BUY' : 'SKIP', launch_score: s.score, launch_verdict: s.verdict,
  safety_score: r.score, grade: r.grade, red_flags: danger.map((f) => f.msg), dev: s.dev && s.dev.verdict });
