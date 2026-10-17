// Verify a Synapse alert before trusting it. Express-style handler; needs the RAW body.
import crypto from 'node:crypto';

export function verifySynapse(rawBody, signatureHeader, secret) {
  const want = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const got = String(signatureHeader || '');
  return got.length === want.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(want));
}

// app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
//   if (!verifySynapse(req.body, req.get('X-Synapse-Signature'), process.env.SYNAPSE_WHSEC)) return res.sendStatus(401);
//   const alert = JSON.parse(req.body); /* … */ res.sendStatus(200);
// });
