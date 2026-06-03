// Shared server-rendered page shell — mirrors the static site's markup so
// SSR pages are visually identical and pick up script.js animations.

import { escapeHtml } from './feed.js';

export const SITE = 'https://artifactdigital.co';

function header() {
  return `
    <header class="page-header is-stuck" id="pageHeader">
      <div class="container navbar">
        <a class="brand" href="/#home" aria-label="Artifact home">
          <picture>
            <source media="(max-width: 760px)" srcset="/brand_assets/A_Logo_Mobile3.png" />
            <img src="/brand_assets/A_Logo_DT3.png" alt="Artifact" class="brand-logo" />
          </picture>
        </a>
        <nav class="nav-links" aria-label="Primary">
          <a href="/#services"><span>Services</span></a>
          <a href="/#work"><span>Work</span></a>
          <a href="/#approach"><span>Approach</span></a>
          <a href="/insights"><span>Insights</span></a>
          <a href="/#contact"><span>Contact</span></a>
        </nav>
        <a class="nav-cta" href="/#contact">
          Start a project
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 7h12M8 2l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </header>`;
}

function footer() {
  return `
      <footer class="page-footer">
        <div class="container page-footer__inner">
          <span>© <span id="year"></span> Artifact Digital</span>
          <span>Designed &amp; built in-studio</span>
        </div>
      </footer>`;
}

// opts: { title, description, canonical, ogType, ogImage, ogImageWidth,
//         ogImageHeight, jsonLd (array of objects), extraMeta, bodyClass, main }
export function renderPage(opts) {
  const {
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage = `${SITE}/brand_assets/og-default.png`,
    ogImageWidth,
    ogImageHeight,
    jsonLd = [],
    extraMeta = '',
    bodyClass = '',
    main = '',
  } = opts;

  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const ogDims = ogImageWidth && ogImageHeight
    ? `<meta property="og:image:width" content="${ogImageWidth}" />
    <meta property="og:image:height" content="${ogImageHeight}" />`
    : '';

  // Escape "<" so a stray "</script>" inside any string value can't break out.
  const ld = jsonLd
    .map((obj) => `<script type="application/ld+json">\n${JSON.stringify(obj).replace(/</g, '\\u003c')}\n</script>`)
    .join('\n    ');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${t}</title>
    <meta name="description" content="${d}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="author" content="Artifact Digital" />
    <meta name="theme-color" content="#0b0b0b" />

    <!-- Open Graph -->
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="Artifact Digital" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    ${ogDims}
    <meta property="og:locale" content="en_US" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    ${extraMeta}

    <link rel="icon" type="image/png" href="/brand_assets/favicon.png" />
    <link rel="apple-touch-icon" href="/brand_assets/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/style.css" />

    ${ld}
  </head>
  <body class="${bodyClass}">
    <div class="cursor" aria-hidden="true"></div>
    <div class="cursor-dot" aria-hidden="true"></div>

    <div class="page-loader" aria-hidden="true">
      <div class="page-loader__inner">
        <span class="page-loader__mark"></span>
        <span class="page-loader__text">Artifact Digital</span>
      </div>
      <span class="page-loader__bar"><span></span></span>
    </div>
${header()}
    <main>
${main}
${footer()}
    </main>

    <script src="/script.js"></script>
  </body>
</html>`;
}
