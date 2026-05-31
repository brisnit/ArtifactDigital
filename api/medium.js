// Vercel serverless function — fetches the Medium RSS feed and returns JSON.
//
//   GET /api/medium            → list of posts (metadata + excerpt + thumbnail)
//   GET /api/medium?id=<id>    → a single post including full article HTML
//
// Zero dependencies: the feed is parsed with small, forgiving regexes. Medium
// feeds carry the full post body in <content:encoded>, so on-site reading works.

const FEED_URL = 'https://medium.com/feed/@brittmidgette_72905';

// --- tiny helpers ---------------------------------------------------------

// Pull the inner text of the first <tag>…</tag>, unwrapping a CDATA section.
function pick(block, tag) {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
  if (!m) return '';
  return m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

// Pull every match of a repeating tag (e.g. <category>).
function pickAll(block, tag) {
  const out = [];
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'gi');
  let m;
  while ((m = re.exec(block)) !== null) {
    out.push(m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim());
  }
  return out;
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'");
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

// Stable, URL-safe id derived from the guid (Medium guids look like
// https://medium.com/p/<hash>). Falls back to the link.
function postId(guid, link) {
  const source = guid || link || '';
  const seg = source.split(/[/?#]/).filter(Boolean).pop() || '';
  return seg;
}

function firstImage(html) {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

function parseFeed(xml) {
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
    items.push({
      id: postId(guid, link),
      title,
      link,
      guid,
      pubDate: pick(block, 'pubDate'),
      author: decodeEntities(pick(block, 'dc:creator')),
      categories: pickAll(block, 'category'),
      thumbnail: firstImage(content),
      excerpt: text.slice(0, 200) + (text.length > 200 ? '…' : ''),
      content, // full article HTML
    });
  }
  return items;
}

export default async function handler(req, res) {
  try {
    const upstream = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'ArtifactDigital/1.0 (+https://artifactdigital)' },
    });
    if (!upstream.ok) {
      res.status(502).json({ error: `Medium feed responded ${upstream.status}` });
      return;
    }
    const xml = await upstream.text();
    const posts = parseFeed(xml);

    // Cache at the edge for an hour; serve stale while revalidating.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    const { id } = req.query || {};
    if (id) {
      const post = posts.find((p) => p.id === id);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
      res.status(200).json(post);
      return;
    }

    // List mode: omit the heavy full-content field.
    res.status(200).json(posts.map(({ content, ...meta }) => meta));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load Medium feed', detail: String(err) });
  }
}
