// The four things a client actually comes here for, in the words they'd use:
// websites, apps, growth, support. Single source for the nav panel, the footer,
// the What We Do hub and the homepage, so the offer can never drift apart
// between them. Each one maps to a real service page.
//
// Sophistication lives deeper: SaaS products, AI tools, portals, CRMs and
// learning platforms are all reachable from Web Apps, not from the front door.

export interface ServiceCategory {
  /** Slug of the service page under /services/. */
  id: string;
  label: string;
  /** Plain-English line: what you get, not what we call it. */
  summary: string;
  /** Concrete examples, in a client's vocabulary. */
  examples: string[];
}

export const BUILD_CLUSTERS: readonly ServiceCategory[] = [
  {
    id: 'websites',
    label: 'Websites',
    summary: 'From a simple business website to a complex digital platform.',
    examples: ['Business websites', 'Marketing sites', 'Ecommerce', 'Content platforms & CMS'],
  },
  {
    id: 'web-apps',
    label: 'Web apps',
    summary: "Have an idea? We'll help you figure out what to build, then build it.",
    examples: ['Customer portals', 'Internal tools & dashboards', 'Software products', 'AI & data tools'],
  },
  {
    id: 'mobile-apps',
    label: 'Mobile apps',
    summary: 'Apps people actually keep on their phone, designed and built end to end.',
    examples: ['iOS & Android apps', 'Cross-platform apps', 'App design', 'Prototypes to test an idea'],
  },
  {
    id: 'seo-ai-search',
    label: 'SEO + AI search',
    summary: "Getting online isn't enough. We help people find you.",
    examples: ['SEO', 'AI search visibility (GEO)', 'Analytics', 'Content & conversion'],
  },
  {
    id: 'hosting-support',
    label: 'Hosting & support',
    summary: "You don't need an internal digital team. We can be yours.",
    examples: ['Hosting', 'Maintenance & updates', 'Ongoing improvements', 'Digital strategy'],
  },
];

/** Every category is a real page; the hub anchors to the same slugs. */
export const buildPath = (id: string) => `/services/${id}`;

/** Evidence for each category. Entries with a `caseId` take their tier
 *  (Built by Artifact, or founder/team prior work) from the case itself, so an
 *  edit here can never relabel prior-agency work as Artifact's. Entries without
 *  a case are concepts and render as such. */
export interface BuildProof {
  caseId?: string;
  href?: string;
  name: string;
  detail?: string;
  status?: string;
}

export const BUILD_PROOF: Record<string, BuildProof[]> = {
  websites: [
    { caseId: 'case-it-training', name: 'IT Training & Certification School', detail: 'A learning platform and site restructured around how people actually choose a certification.' },
    { caseId: 'case-global-nutrition', name: 'American Big Food', detail: 'One design system and content model across 15+ business units and six continents.' },
  ],
  'web-apps': [
    { caseId: 'case-dropq', name: 'DropQ', detail: 'A storefront, ordering and payments platform for independent sellers.', status: 'Live' },
    { caseId: 'case-benchbot', name: 'BenchBot', detail: 'An AI tool that audits a website against its competitors and turns findings into tasks.', status: 'Pre-launch' },
    { caseId: 'case-senior-living-ministry', name: 'Senior-Living Ministry · admin portal', detail: 'The portal staff use to run content, events and messaging without a developer.', status: 'Prototype' },
  ],
  'mobile-apps': [
    { caseId: 'case-senior-living-ministry', name: 'Senior-Living Ministry app', detail: 'A daily reading app designed for residents aged 70+, accessible from the first screen.', status: 'Prototype' },
    { caseId: 'case-major-clothing', name: 'Major Clothing Brand', detail: 'An in-store tool built around a tailoring team’s real workflow, now in seven flagship stores worldwide.' },
  ],
  'seo-ai-search': [
    { href: '/insights/b2b-in-the-age-of-ai', name: 'Writing on AI search', detail: 'How buyers now find companies through AI assistants, and what that changes.' },
    { caseId: 'case-weather-intelligence', name: 'Weather intelligence platform', detail: 'Turning thousands of data points into something people could read at a glance.' },
  ],
  'hosting-support': [
    { caseId: 'case-dropq', name: 'DropQ', detail: 'Live, taking real payments, and improved in cycles after launch rather than left alone.', status: 'Live' },
    { href: '/how-we-work', name: 'How we work', detail: 'Launch is the start of the work, not the end of it.' },
  ],
};
