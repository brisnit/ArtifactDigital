// SSR: /sitemap.xml — static pages plus every Medium post, generated fresh so
// new posts enter the sitemap automatically.

import { fetchPosts, postSlug } from './_lib/feed.js';
import { SITE } from './_lib/page.js';

const STATIC = [
  { loc: `${SITE}/`, changefreq: 'monthly', priority: '1.0' },
  { loc: `${SITE}/insights`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE}/case-major-electronics`, changefreq: 'yearly', priority: '0.8' },
  { loc: `${SITE}/case-it-training`, changefreq: 'yearly', priority: '0.8' },
  { loc: `${SITE}/case-major-clothing`, changefreq: 'yearly', priority: '0.8' },
  { loc: `${SITE}/case-global-nutrition`, changefreq: 'yearly', priority: '0.8' },
];

function urlEntry({ loc, changefreq, priority, lastmod }) {
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export default async function handler(req, res) {
  let posts = [];
  try {
    posts = await fetchPosts();
  } catch (err) {
    // Fall back to just the static pages if the feed is unavailable.
  }

  const postEntries = posts.map((p) => {
    const d = new Date(p.pubDate);
    return urlEntry({
      loc: `${SITE}/insights/${postSlug(p)}`,
      changefreq: 'yearly',
      priority: '0.7',
      lastmod: isNaN(d) ? undefined : d.toISOString().slice(0, 10),
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...STATIC.map(urlEntry), ...postEntries].join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(xml);
}
