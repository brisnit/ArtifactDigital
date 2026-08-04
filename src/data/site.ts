// Central site configuration + shared structured-data nodes.
// Single source of truth so every page emits consistent metadata/schema.

import { PLAYBOOKS, playbookPath } from './playbooks';

export const SITE = {
  name: 'Artifact Digital',
  url: 'https://www.artifactdigital.co',
  domain: 'artifactdigital.co',
  email: 'hello@artifactdigital.co',
  tagline: 'Digital Innovation Agency',
  description:
    'Artifact Digital is a senior-led digital innovation agency designing bold, premium experiences for ambitious brands — strategy, UX/UI design, AI, and engineering.',
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

// Primary navigation — page-based IA.
// `children` renders as a dropdown on desktop and a nested group on mobile.
// The Services submenu is generated from the playbooks list, so publishing a
// new playbook puts it in the nav without a second edit.
export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV: readonly NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All services', href: '/services' },
      ...PLAYBOOKS.map((p) => ({ label: p.navLabel, href: playbookPath(p.slug) })),
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Standardized CTA language. One vocabulary across the whole site so the
// primary ask is always consistent and intentional.
export const CTA = {
  primary: { label: 'Book a Strategy Session', href: '/contact' },
  audit: { label: 'Request an Experience Audit', href: '/contact?intent=audit' },
  talk: { label: 'Talk With Artifact', href: '/contact' },
  build: { label: "Let's Build Something Better", href: '/contact' },
  work: { label: 'See our work', href: '/#work' },
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
