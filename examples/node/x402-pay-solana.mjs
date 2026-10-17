// Pay for one A.U.G.U.R Synapse tool call with x402 in native SOL.
//
//   npm install
//   SOLANA_KEYPAIR=~/.config/solana/id.json node x402-pay-solana.mjs token_risk '{"mint":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"}'
//
// Flow: call -> 402 with requirements -> sign one SystemProgram.transfer (the hub is the
// fee payer, so you only need the price) -> retry with X-PAYMENT -> result + settlement receipt.
// The hub runs the tool BEFORE it broadcasts your transfer; if the tool fails, nothing is sent.
import fs from 'node:fs';
import os from 'node:os';
import { Connection, Keypair, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from '@solana/web3.js';

const HUB = 'https://augur-trade.com/hub/api/v1/tools';
const NATIVE_SOL = '11111111111111111111111111111111';
const [tool = 'token_risk', argsJson = '{"mint":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"}'] = process.argv.slice(2);
const keyPath = (process.env.SOLANA_KEYPAIR || '~/.config/solana/id.json').replace(/^~/, os.homedir());
const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(keyPath, 'utf8'))));
const rpc = new Connection(process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com', 'confirmed');

const post = (headers = {}) =>
  fetch(`${HUB}/${tool}`, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: argsJson });

// 1. Unpaid call: a paid tool answers 402 with its payment requirements
const first = await post();
if (first.status !== 402) { console.log(first.status, await first.text()); process.exit(0); }
const reqs = await first.json();
const sol = reqs.accepts.find((a) => a.asset === NATIVE_SOL);
console.log(`price: $${reqs.price.usd} = ${sol.maxAmountRequired} lamports -> ${sol.payTo}`);

// 2. Build and sign (do NOT send) one transfer; the hub co-signs as fee payer if it offers to
const feePayer = new PublicKey(sol.extra.feePayer || payer.publicKey);
const { blockhash } = await rpc.getLatestBlockhash('confirmed');
const msg = new TransactionMessage({
  payerKey: feePayer,
  recentBlockhash: blockhash,
  instructions: [SystemProgram.transfer({ fromPubkey: payer.publicKey, toPubkey: new PublicKey(sol.payTo), lamports: BigInt(sol.maxAmountRequired) })],
}).compileToV0Message();
const tx = new VersionedTransaction(msg);
tx.sign([payer]);

// 3. Retry with the x402 payment header
const payment = { x402Version: 1, scheme: 'exact', network: sol.network, payload: { transaction: Buffer.from(tx.serialize()).toString('base64') } };
const paid = await post({ 'X-PAYMENT': Buffer.from(JSON.stringify(payment)).toString('base64') });
const text = await paid.text();
let body; try { body = JSON.parse(text); } catch { body = text; }
console.log(paid.status, typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body.data ?? body, null, 1).slice(0, 1500));
if (paid.status === 402) console.log('payment rejected:', body.error);
const receipt = paid.headers.get('x-payment-response');
if (receipt) console.log('settled:', JSON.parse(Buffer.from(receipt, 'base64').toString()));
