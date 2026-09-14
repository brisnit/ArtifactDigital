// The kinds of software Artifact builds, grouped by what they do for a
// business rather than by technology. Single source for the nav panel, the
// footer, the What We Build hub and the homepage, so the five groups can
// never drift apart between them.

export interface BuildCluster {
  /** In-page anchor on the What We Build hub. */
  id: string;
  label: string;
  /** One line of what becomes possible — not a list of deliverables. */
  summary: string;
  /** Concrete kinds of software in this group. */
  examples: string[];
}

export const BUILD_CLUSTERS: readonly BuildCluster[] = [
  {
    id: 'run-the-business',
    label: 'Run the business',
    summary:
      'Internal platforms, workflow software and specialized CRMs that match how your operation actually runs.',
    examples: ['Internal business platforms', 'Operational software', 'Workflow software', 'Specialized CRMs', 'Automation systems'],
  },
  {
    id: 'serve-your-customers',
    label: 'Serve your customers',
    summary: "Portals and products that feel like your company, not a vendor's template.",
    examples: ['Customer portals', 'Customer-facing digital products', 'Commerce and ordering experiences'],
  },
  {
    id: 'grow-your-people',
    label: 'Grow your people',
    summary: 'Employee and learning platforms built around the way your teams actually learn and work.',
    examples: ['Employee platforms', 'Training and learning platforms', 'Knowledge and onboarding systems'],
  },
  {
    id: 'see-whats-coming',
    label: "See what's coming",
    summary: 'Predictive systems and intelligence products that turn your own data into earlier decisions.',
    examples: ['Predictive systems', 'Data and intelligence products', 'AI-powered applications'],
  },
  {
    id: 'build-a-product-to-sell',
    label: 'Build a product to sell',
    summary: 'Vertical SaaS and new revenue lines built on what your business already knows.',
    examples: ['Vertical SaaS', 'New customer-facing products', 'Productized internal tools'],
  },
];

export const buildPath = (id: string) => `/services#${id}`;

/** Evidence for each kind of software. Entries with a `caseId` take their tier
 *  (Built by Artifact, or founder/team prior work) from the case itself, so an
 *  edit here can never relabel prior-agency work as Artifact's. Entries without
 *  a case are concepts and render as such. `label` may only rename Artifact's
 *  own work (e.g. BenchBot, which Artifact owns). */
export interface BuildProof {
  caseId?: string;
  href?: string;
  name: string;
  detail?: string;
  status?: string;
  label?: string;
}

export const BUILD_PROOF: Record<string, BuildProof[]> = {
  'run-the-business': [
    { caseId: 'case-senior-living-ministry', name: 'Senior-Living Ministry · admin portal', detail: 'Lets ministry staff run the app without a developer.', status: 'Prototype' },
    { caseId: 'case-major-clothing', name: 'Major Clothing Brand', detail: 'An in-store tool built around a tailoring team’s real workflow, now in seven flagship stores worldwide.' },
  ],
  'serve-your-customers': [
    { caseId: 'case-dropq', name: 'DropQ', detail: 'Timed product drops, payments and pickup for independent sellers.', status: 'Live' },
    { caseId: 'case-senior-living-ministry', name: 'Senior-Living Ministry · resident app', detail: 'A Scripture-first daily formation app designed for senior-living residents.', status: 'Prototype' },
    { caseId: 'case-major-electronics', name: 'Major Electronics Company', detail: 'An in-store AR experience showcasing the company’s connected-home products.' },
  ],
  'grow-your-people': [
    { caseId: 'case-it-training', name: 'IT Training & Certification School', detail: 'A learning platform helping people build technology careers through certifications and guided pathways.' },
    { href: '/insights/if-we-cant-see-whats-happening', name: 'Predictive Learning Platform', detail: 'A platform for seeing learner risk earlier, explored in our writing. Not a client product.', status: 'In development' },
  ],
  'see-whats-coming': [
    { caseId: 'case-benchbot', name: 'BenchBot', label: 'Artifact’s own product', detail: 'Audits a website against real competitors and turns the findings into prioritized, trackable work.', status: 'Pre-launch' },
    { caseId: 'case-weather-intelligence', name: 'Weather intelligence platform', detail: 'Helping a major electric utility see wildfire risk sooner and act with confidence.' },
  ],
  'build-a-product-to-sell': [
    { caseId: 'case-dropq', name: 'DropQ', detail: 'Vertical SaaS for independent sellers, built from zero to a live Stripe Connect marketplace.', status: 'Live' },
    { caseId: 'case-benchbot', name: 'BenchBot', label: 'Artifact’s own product', detail: 'An AI website-improvement platform, built and owned by Artifact as a SaaS product.', status: 'Pre-launch' },
  ],
};

