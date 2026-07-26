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

// Minimal branded HTML wrapper for transactional emails.
function wrapEmail(paragraphs) {
  const body = paragraphs.map((p) => `<p style="margin:0 0 16px">${p}</p>`).join('');
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#111">${body}</div>`;
}

// Confirmation sent to the person who submitted the contact form.
function confirmationEmail(firstName) {
  const safe = escapeHtml(firstName);
  return {
    subject: 'We received your message',
    text: [
      `Hi ${firstName},`, '',
      'Thanks for reaching out to Artifact. We received your message and will review the details shortly.', '',
      'Someone from our team will be in touch soon to learn more about what you’re working on and how we may be able to help.', '',
      'Best,', 'Artifact Digital',
    ].join('\n'),
    html: wrapEmail([
      `Hi ${safe},`,
      'Thanks for reaching out to Artifact. We received your message and will review the details shortly.',
      'Someone from our team will be in touch soon to learn more about what you’re working on and how we may be able to help.',
      'Best,<br>Artifact Digital',
    ]),
  };
}

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

    // Confirmation to the person who submitted — best-effort; never blocks the enquiry.
    try {
      const ack = confirmationEmail(name.split(/\s+/)[0] || 'there');
      const r2 = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: email, reply_to: to, subject: ack.subject, text: ack.text, html: ack.html }),
      });
      if (!r2.ok) console.error('[contact] confirmation email failed', r2.status, await r2.text());
    } catch (ackErr) {
      console.error('[contact] confirmation email failed', ackErr);
    }

    return res.status(200).json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] send failed', err);
    return res.status(502).json({ ok: false, error: 'We couldn’t send that right now. Please email hello@artifactdigital.co.' });
  }
}
