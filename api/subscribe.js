// Vercel serverless function — Field Notes signups.
// On success it (1) notifies the Artifact team and (2) sends the subscriber a
// welcome email. Both go through Resend; requires RESEND_API_KEY to be set and
// the sending domain (artifactdigital.co) verified in Resend, or nothing sends.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Minimal branded HTML wrapper for transactional emails — leads with the logo.
const LOGO_URL = 'https://www.artifactdigital.co/brand_assets/A_Logo_DT.png';
function wrapEmail(paragraphs) {
  const body = paragraphs.map((p) => `<p style="margin:0 0 16px">${p}</p>`).join('');
  return (
    `<div style="background:#ffffff;max-width:560px;padding:8px 4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#111">` +
    `<div style="padding:0 0 20px;margin:0 0 20px;border-bottom:1px solid #ececec">` +
    `<img src="${LOGO_URL}" alt="Artifact Digital" width="150" height="52" style="display:block;width:150px;height:auto;border:0;outline:none;text-decoration:none" />` +
    `</div>${body}</div>`
  );
}

const WELCOME_SUBJECT = 'Welcome to Field Notes';
const WELCOME_TEXT = [
  'Hi there,',
  '',
  'Thanks for signing up for Field Notes, Artifact’s collection of ideas on digital strategy, product design, enterprise technology, AI, and the craft behind exceptional digital experiences.',
  '',
  'We’ll send you thoughtful, practical perspectives designed to help you make better decisions about the products, platforms, and experiences your organization creates.',
  '',
  'Welcome aboard.',
  '',
  'Best,',
  'Artifact Digital',
].join('\n');
const WELCOME_HTML = wrapEmail([
  'Hi there,',
  'Thanks for signing up for Field Notes, Artifact’s collection of ideas on digital strategy, product design, enterprise technology, AI, and the craft behind exceptional digital experiences.',
  'We’ll send you thoughtful, practical perspectives designed to help you make better decisions about the products, platforms, and experiences your organization creates.',
  'Welcome aboard.',
  'Best,<br>Artifact Digital',
]);

async function sendResend(payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
}

// Subscriber list lives in a Resend Audience. Set RESEND_AUDIENCE_ID to enable
// duplicate detection; without it, dedup is skipped and every signup is welcomed.
const AUDIENCE = process.env.RESEND_AUDIENCE_ID;

async function contactExists(email) {
  if (!AUDIENCE) return false;
  const r = await fetch(
    `https://api.resend.com/audiences/${AUDIENCE}/contacts/${encodeURIComponent(email.toLowerCase())}`,
    { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } },
  );
  if (r.status === 404) return false;
  if (!r.ok) throw new Error(`Resend contacts GET ${r.status}: ${await r.text()}`);
  const j = await r.json().catch(() => null);
  return !!(j && j.data && j.data.id);
}

async function addContact(email) {
  if (!AUDIENCE) return;
  const r = await fetch(`https://api.resend.com/audiences/${AUDIENCE}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.toLowerCase(), unsubscribed: false }),
  });
  if (!r.ok) throw new Error(`Resend contacts POST ${r.status}: ${await r.text()}`);
}

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
  const team = process.env.CONTACT_TO || 'hello@artifactdigital.co';
  const from = process.env.CONTACT_FROM || 'Artifact Digital <hello@artifactdigital.co>';

  // 0) Already on the list? Fail open — if the check errors, treat as new.
  try {
    if (await contactExists(email)) {
      return res.status(200).json({
        ok: true,
        duplicate: true,
        message: 'Thank you for your enthusiasm — but you’re already signed up.',
      });
    }
  } catch (err) {
    console.error('[subscribe] duplicate check failed (continuing as new)', err);
  }

  // 1) Notify the team — this is what records the signup; failure fails the call.
  try {
    await sendResend({ from, to: team, subject: 'New Field Notes subscriber', text: `New subscriber: ${email}` });
  } catch (err) {
    console.error('[subscribe] team notify failed', err);
    return res.status(502).json({ ok: false, error: 'Couldn’t subscribe right now. Please try again later.' });
  }

  // 2) Add to the audience so future signups are recognized — best-effort.
  try {
    await addContact(email);
  } catch (err) {
    console.error('[subscribe] add contact failed', err);
  }

  // 3) Welcome the subscriber — best-effort; a failure here never blocks signup.
  try {
    await sendResend({ from, to: email, reply_to: team, subject: WELCOME_SUBJECT, text: WELCOME_TEXT, html: WELCOME_HTML });
  } catch (err) {
    console.error('[subscribe] welcome email failed', err);
  }

  return res.status(200).json({ ok: true, stored: true });
}
