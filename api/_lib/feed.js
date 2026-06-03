// Shared Medium-feed logic. Files under api/_lib are NOT routes (Vercel
// ignores underscore-prefixed paths) — they're imported by the functions.

const FEED_URL = 'https://medium.com/feed/@brittmidgette_72905';
export const MEDIUM_PROFILE = 'https://medium.com/@brittmidgette_72905';

// --- XML parsing helpers --------------------------------------------------

function pick(block, tag) {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
  if (!m) return '';
  return m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

function pickAll(block, tag) {
  const out = [];
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'gi');
  let m;
  while ((m = re.exec(block)) !== null) {
    out.push(m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim());
  }
  return out;
}

export function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function rawId(guid, link) {
  const source = guid || link || '';
  return source.split(/[/?#]/).filter(Boolean).pop() || '';
}

function firstImage(html) {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

// Title → URL-safe slug; the post id is appended for uniqueness/lookup.
export function slugify(title) {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'post';
}

export function postSlug(post) {
  return `${slugify(post.title)}-${post.id}`;
}

// Pull the post id back out of a /insights/<slug>-<id> path segment.
export function idFromSlug(slug) {
  if (!slug) return '';
  return String(slug).split('-').filter(Boolean).pop();
}

// --- HTML escaping (for values we place into our own markup) --------------

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// --- Feed fetch + parse ---------------------------------------------------

export function parseFeed(xml) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const link = pick(block, 'link');
    const guid = pick(block, 'guid');
    const content = pick(block, 'content:encoded');
    const title = decodeEntities(pick(block, 'title'));
    const text = stripTags(content);
    const id = rawId(guid, link);
    items.push({
      id,
      title,
      link,
      guid,
      pubDate: pick(block, 'pubDate'),
      author: decodeEntities(pick(block, 'dc:creator')) || 'Artifact Digital',
      categories: pickAll(block, 'category'),
      thumbnail: firstImage(content),
      excerpt: text.slice(0, 200) + (text.length > 200 ? '…' : ''),
      content,
    });
  }
  return items;
}

export async function fetchPosts() {
  const upstream = await fetch(FEED_URL, {
    headers: { 'User-Agent': 'ArtifactDigital/1.0 (+https://artifactdigital.co)' },
  });
  if (!upstream.ok) {
    const err = new Error(`Medium feed responded ${upstream.status}`);
    err.status = 502;
    throw err;
  }
  const xml = await upstream.text();
  return parseFeed(xml);
}
