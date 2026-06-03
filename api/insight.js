// SSR: /insights/<slug> — a single post with full article HTML rendered into
// the initial response, plus per-post metadata and BlogPosting structured data.

import { fetchPosts, postSlug, idFromSlug, escapeHtml, MEDIUM_PROFILE } from './_lib/feed.js';
import { renderPage, SITE } from './_lib/page.js';

function fmtDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function notFound(res) {
  const main = `
      <article class="post">
        <header class="post-hero">
          <div class="container post-hero__inner">
            <a class="case-back" href="/insights">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M13 7H1M6 12 1 7l5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Back to insights
            </a>
            <h1 class="post-title">Post not found</h1>
          </div>
        </header>
        <div class="container">
          <div class="post-article"><p>We couldn’t find that post. <a href="/insights">Browse all insights</a> or read them on <a href="${MEDIUM_PROFILE}" target="_blank" rel="noopener">Medium</a>.</p></div>
        </div>
      </article>`;
  const html = renderPage({
    title: 'Post not found · Artifact Digital',
    description: 'The requested insight could not be found.',
    canonical: `${SITE}/insights`,
    extraMeta: '<meta name="robots" content="noindex, follow" />',
    bodyClass: 'case-page',
    main,
  });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(404).send(html);
}

export default async function handler(req, res) {
  const q = req.query || {};
  const id = q.id || idFromSlug(q.slug);

  let posts;
  try {
    posts = await fetchPosts();
  } catch (err) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(502).send(renderPage({
      title: 'Insights · Artifact Digital',
      description: 'Essays on design, AI, and building for the web.',
      canonical: `${SITE}/insights`,
      extraMeta: '<meta name="robots" content="noindex, follow" />',
      bodyClass: 'case-page',
      main: `<div class="container" style="padding:9rem 0 5rem;"><p class="insights-state">Couldn’t load this post right now. Read it on <a href="${MEDIUM_PROFILE}" target="_blank" rel="noopener">Medium</a>.</p></div>`,
    }));
    return;
  }

  const post = posts.find((p) => p.id === id);
  if (!post) { notFound(res); return; }

  const slug = postSlug(post);
  const url = `${SITE}/insights/${slug}`;
  const desc = post.excerpt || `An essay from Artifact Digital — ${post.title}.`;
  const img = post.thumbnail || `${SITE}/brand_assets/og-default.png`;
  const dateIso = isNaN(new Date(post.pubDate)) ? undefined : new Date(post.pubDate).toISOString();

  const tags = (post.categories || []).slice(0, 5)
    .map((t) => `<li>${escapeHtml(t)}</li>`).join('');
  const metaLine = [escapeHtml(post.author), fmtDate(post.pubDate)].filter(Boolean).join(' · ');

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: desc,
    image: img,
    datePublished: dateIso,
    dateModified: dateIso,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Person', name: post.author },
    keywords: (post.categories || []).join(', ') || undefined,
    articleSection: post.categories && post.categories[0] ? post.categories[0] : undefined,
    isPartOf: { '@id': `${SITE}/insights#blog` },
    isBasedOn: post.link || undefined,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Artifact Digital',
      url: `${SITE}/`,
      logo: { '@type': 'ImageObject', url: `${SITE}/brand_assets/A_Logo_DT3.png` },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE}/insights` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const sourceBlock = post.link
    ? `<div class="post-source"><a href="${escapeHtml(post.link)}" target="_blank" rel="noopener">Read the original on Medium →</a></div>`
    : '';

  const main = `
      <article class="post">
        <header class="post-hero">
          <div class="container post-hero__inner">
            <a class="case-back" href="/insights">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M13 7H1M6 12 1 7l5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Back to insights
            </a>
            <p class="post-meta">${metaLine}</p>
            <h1 class="post-title">${escapeHtml(post.title)}</h1>
            ${tags ? `<ul class="project-card__tags post-tags">${tags}</ul>` : ''}
          </div>
        </header>

        <div class="container">
          <div class="post-article">
${post.content || '<p>This post has no inline content.</p>'}
          </div>
          ${sourceBlock}
          <div class="post-cta">
            <a class="btn btn-secondary" href="/insights">
              More insights
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </article>

      <script>
        // Fade article images in to match the site's image treatment.
        document.querySelectorAll('.post-article img').forEach(function (img) {
          if (img.complete) { img.classList.add('is-loaded'); }
          else { img.addEventListener('load', function () { img.classList.add('is-loaded'); }, { once: true }); }
        });
      </script>`;

  const html = renderPage({
    title: `${post.title} · Artifact Digital`,
    description: desc,
    canonical: url,
    ogType: 'article',
    ogImage: img,
    jsonLd: [blogPostingLd, breadcrumbLd],
    bodyClass: 'case-page',
    main,
  });

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(html);
}
