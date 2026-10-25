// node quickstart.mjs: free tools, then a paid tool on the free tier
import { Foresight } from '../../sdk/js/augur-synapse.mjs';

const synapse = new Foresight({ freeTier: true });
const pulse = (await synapse.pumpPulse()).data;
console.log('pump.fun right now:', pulse.trades_per_min, 'trades/min');

const sol = (await synapse.price({ mints: ['So11111111111111111111111111111111111111112'] })).data;
console.log('SOL:', JSON.stringify(sol).slice(0, 200));

const risk = await synapse.tokenRisk({ mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' });
console.log('token_risk', risk.billing, JSON.stringify(risk.data).slice(0, 300));
