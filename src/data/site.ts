// Central site configuration + shared structured-data nodes.
// Single source of truth so every page emits consistent metadata/schema.

import { BUILD_CLUSTERS, buildPath } from './build';

export const SITE = {
  name: 'Artifact Digital',
  url: 'https://www.artifactdigital.co',
  domain: 'artifactdigital.co',
  email: 'hello@artifactdigital.co',
  tagline: 'We design, build and grow websites & apps',
  description:
    'Artifact Digital designs, builds and grows websites, web apps and mobile apps for founders and growing businesses — from strategy and UX to development, hosting, SEO and AI search.',
  foundingDate: '2021',
  location: 'San Diego, CA',
  linkedin: 'https://www.linkedin.com/company/artifact-digital-co/',
  ogImage: '/brand_assets/og-default.png',
  logo: '/brand_assets/A_Logo_DT3.png',
} as const;

// --- Verification + analytics -----------------------------------------------
// Paste the tokens below and they render automatically. Left empty, nothing is
// emitted — no broken tags, no noise.
export const VERIFY = {
  // Google Search Console -> Add property -> URL prefix -> "HTML tag" method.
  // Copy ONLY the content="..." value, e.g. 'AbC123_xyz...'
  google: '',
  // Bing Webmaster Tools -> Add site -> "Meta tag" method. Content value only.
  bing: '',
} as const;

export const ANALYTICS = {
  // Vercel Web Analytics + Speed Insights. Privacy-friendly, no cookie banner,
  // and native since we already deploy on Vercel. Enabled in the dashboard
  // 2026-07-15.
  vercel: true,
  // Optional: a GA4 measurement ID (e.g. 'G-XXXXXXXXXX') if you'd rather have
  // Google's depth. Note: GA4 uses cookies — you'd need a consent banner in
  // the EU/UK. Leave empty to skip.
  ga4: '',
} as const;

// Primary navigation — five plain entries. A visitor should find their own
// situation in the first one they read.
export interface NavItem {
  label: string;
  href: string;
  /** Desktop: opens the full-width What We Do panel, built in Header.astro. */
  mega?: boolean;
  /** Mobile, and the desktop panel columns: nested links under the parent. */
  children?: { label: string; href: string }[];
}

export const WHO_WE_HELP = [
  { label: 'Founders', href: '/who-we-help#founders' },
  { label: 'Small businesses', href: '/who-we-help#small-businesses' },
  { label: 'Growing companies', href: '/who-we-help#growing-companies' },
  { label: 'Nonprofits', href: '/who-we-help#nonprofits' },
];

export const WHY_ARTIFACT = [
  { label: 'Strategy first', href: '/why-artifact#strategy-first' },
  { label: 'Accessible by default', href: '/why-artifact#accessible-by-default' },
  { label: 'AI without the slop', href: '/why-artifact#ai-without-the-slop' },
  { label: 'Senior team', href: '/why-artifact#senior-team' },
];

export const NAV: readonly NavItem[] = [
  {
    label: 'What We Do',
    href: '/services',
    mega: true,
    children: [
      ...BUILD_CLUSTERS.map((c) => ({ label: c.label, href: buildPath(c.id) })),
      { label: 'Everything we do', href: '/services' },
    ],
  },
  { label: 'Who We Help', href: '/who-we-help', children: WHO_WE_HELP },
  { label: 'Work', href: '/work' },
  { label: 'Why Artifact', href: '/why-artifact', children: WHY_ARTIFACT },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
];

// Standardized CTA language. Plain, human, and the same everywhere: a visitor
// should never be asked to book a "strategic digital transformation session".
export const CTA = {
  primary: { label: 'Start a Project', href: '/contact' },
  audit: { label: 'Request a Website Audit', href: '/contact?intent=audit' },
  talk: { label: 'Tell Us About Your Project', href: '/contact' },
  build: { label: 'Start a Project', href: '/contact' },
  work: { label: 'See Our Work', href: '/work' },
} as const;

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path}`);

// Reusable @id-referenced graph nodes.
export const orgNode = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: 'Artifact Interactive',
  url: `${SITE.url}/`,
  logo: {
    '@type': 'ImageObject',
    url: abs(SITE.logo),
    width: 171,
    height: 57,
  },
  image: abs(SITE.ogImage),
  foundingDate: SITE.foundingDate,
  email: SITE.email,
  description: SITE.description,
  sameAs: [SITE.linkedin],
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.name,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-US',
};

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
