// Vercel serverless function — newsletter signups.
// Emails a notification via Resend when configured; otherwise accepts + logs.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
    return req.body;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return {}; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }
  const data = await readBody(req);
  const email = String(data.email || '').trim();
  const honeypot = String(data.website || '').trim();
  if (honeypot) return res.status(200).json({ ok: true });
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('[subscribe] RESEND_API_KEY not set — accepted but not stored:', email);
    return res.status(200).json({ ok: true, stored: false });
  }
  try {
    const to = process.env.CONTACT_TO || 'hello@artifactdigital.co';
    const from = process.env.CONTACT_FROM || 'Artifact Digital <hello@artifactdigital.co>';
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject: 'New Insights subscriber', text: `New subscriber: ${email}` }),
    });
    if (!r.ok) {
      console.error('[subscribe] Resend error', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'Couldn’t subscribe right now. Please try again later.' });
    }
    return res.status(200).json({ ok: true, stored: true });
  } catch (err) {
    console.error('[subscribe] failed', err);
    return res.status(502).json({ ok: false, error: 'Couldn’t subscribe right now. Please try again later.' });
  }
}
