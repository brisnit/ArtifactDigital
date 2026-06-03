// SSR: /insights — the Insights listing, with post touts rendered into the
// initial HTML so crawlers and AI engines see the full list.

import { fetchPosts, postSlug, escapeHtml, MEDIUM_PROFILE } from './_lib/feed.js';
import { renderPage, SITE } from './_lib/page.js';

function fmtDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function tout(post) {
  const url = `${SITE}/insights/${postSlug(post)}`;
  const tags = (post.categories || []).slice(0, 3)
    .map((t) => `<li>${escapeHtml(t)}</li>`).join('');

  const media = post.thumbnail
    ? `<div class="project-card__media" style="--media-bg:#0e0e0e;">
                 <img src="${escapeHtml(post.thumbnail)}" alt="" loading="lazy" class="is-loaded" />
                 <span class="project-card__hover">Read post →</span>
               </div>`
    : `<div class="project-card__media post-card__media--blank" style="--media-bg:#111;">
                 <span class="post-card__mark">Aa</span>
                 <span class="project-card__hover">Read post →</span>
               </div>`;

  return `
            <a class="project-card-link" href="${url}" aria-label="Read: ${escapeHtml(post.title)}">
              <article class="project-card reveal-card">
                ${media}
                <div class="project-card__meta">
                  <span>Insight</span>
                  <span>${fmtDate(post.pubDate)}</span>
                </div>
                <h3 class="project-card__title">${escapeHtml(post.title)}</h3>
                <p class="project-card__copy">${escapeHtml(post.excerpt || '')}</p>
                ${tags ? `<ul class="project-card__tags">${tags}</ul>` : ''}
              </article>
            </a>`;
}

export default async function handler(req, res) {
  let posts = [];
  let failed = false;
  try {
    posts = await fetchPosts();
  } catch (err) {
    failed = true;
  }

  const cards = posts.length
    ? posts.map(tout).join('\n')
    : failed
      ? `<p class="insights-state">Couldn’t load posts right now. Read them on <a href="${MEDIUM_PROFILE}" target="_blank" rel="noopener">Medium</a>.</p>`
      : '<p class="insights-state">No posts yet — check back soon.</p>';

  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE}/insights#blog`,
    name: 'Artifact Digital Insights',
    description: 'Essays on design, AI, and building bold digital experiences for the web.',
    url: `${SITE}/insights`,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Artifact Digital',
      url: `${SITE}/`,
      logo: `${SITE}/brand_assets/A_Logo_DT3.png`,
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE}/insights/${postSlug(p)}`,
      datePublished: isNaN(new Date(p.pubDate)) ? undefined : new Date(p.pubDate).toISOString(),
      image: p.thumbnail || undefined,
      author: { '@type': 'Person', name: p.author },
    })),
  };

  const main = `
      <!-- INSIGHTS HERO -->
      <section class="insights-hero">
        <div class="container">
          <span class="eyebrow reveal"><span class="eyebrow-dot"></span>Insights · From our Medium</span>
          <h1 class="insights-title">
            <span class="reveal-line"><span>Ideas on design,</span></span>
            <span class="reveal-line italic"><span>AI &amp; building</span></span>
            <span class="reveal-line"><span>for the web.</span></span>
          </h1>
          <p class="insights-lede reveal">
            Field notes, essays, and experiments from the studio — published on
            Medium, read here.
          </p>
        </div>
      </section>

      <!-- POSTS -->
      <section class="section insights-list">
        <div class="container">
          <div class="project-grid">
${cards}
          </div>
        </div>
      </section>`;

  const html = renderPage({
    title: 'Insights — Essays on Design & AI · Artifact Digital',
    description: 'Insights from Artifact Digital — essays on design, AI, and building bold digital experiences for the web.',
    canonical: `${SITE}/insights`,
    ogType: 'website',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    jsonLd: [blogLd],
    bodyClass: 'case-page',
    main,
  });

  // Crawlers get fresh HTML; edge-cached 1h with stale-while-revalidate.
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(failed ? 200 : 200).send(html);
}
