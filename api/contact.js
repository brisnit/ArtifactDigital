// Vercel serverless function — handles Contact form submissions.
// Sends an email via Resend when RESEND_API_KEY is configured; otherwise it
// validates and accepts the payload so the UI works end-to-end in preview.
//
// Required env (add in Vercel project settings before go-live):
//   RESEND_API_KEY   — Resend API key
//   CONTACT_TO       — where to deliver (defaults to hello@artifactdigital.co)
//   CONTACT_FROM     — verified sender (defaults to hello@artifactdigital.co)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

async function readBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') {
      try { return JSON.parse(req.body); } catch { return {}; }
    }
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
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const company = String(data.company || '').trim();
  const intent = String(data.intent || 'general').trim();
  const message = String(data.message || '').trim();
  const honeypot = String(data.website || '').trim(); // bots fill hidden field

  if (honeypot) return res.status(200).json({ ok: true }); // silently drop spam

  const errors = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (message.length < 10) errors.message = 'Please add a little more detail (10+ characters).';
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, error: 'Please check the form.', errors });
  }

  const to = process.env.CONTACT_TO || 'hello@artifactdigital.co';
  const from = process.env.CONTACT_FROM || 'Artifact Digital <hello@artifactdigital.co>';
  const subject = `New enquiry — ${intent} — ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nIntent: ${intent}\n\n${message}`;
  const html = `
    <h2>New enquiry from artifactdigital.co</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company) || '—'}</p>
    <p><strong>Intent:</strong> ${escapeHtml(intent)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

  if (!process.env.RESEND_API_KEY) {
    // No provider configured yet — accept so the flow is testable, but log.
    console.warn('[contact] RESEND_API_KEY not set — submission accepted but not emailed:', {
      name, email, intent,
    });
    return res.status(200).json({ ok: true, delivered: false });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, reply_to: email, subject, text, html }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error('[contact] Resend error', r.status, detail);
      return res.status(502).json({ ok: false, error: 'We couldn’t send that right now. Please email hello@artifactdigital.co.' });
    }
    return res.status(200).json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] send failed', err);
    return res.status(502).json({ ok: false, error: 'We couldn’t send that right now. Please email hello@artifactdigital.co.' });
  }
}
