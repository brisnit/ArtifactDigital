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
