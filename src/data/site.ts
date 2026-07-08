// Central site configuration + shared structured-data nodes.
// Single source of truth so every page emits consistent metadata/schema.

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

// Primary navigation — page-based IA.
export const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

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
