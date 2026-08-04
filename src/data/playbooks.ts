// Playbooks — evergreen, teaching-first landing pages that live under Services.
// They aren't services (nothing here is a line item you buy); they're the
// method written down, published so a prospect can judge how we think before
// they ever talk to us.
//
// Single source of truth so the nav dropdown, the Services hub, and the
// cross-links at the foot of every playbook can never drift apart.

export interface Playbook {
  /** Path segment under /services/ — matches the .astro filename. */
  slug: string;
  /** Short form for the nav dropdown. */
  navLabel: string;
  /** One-liner for the hub cards and the related-playbook grid. */
  summary: string;
}

export const PLAYBOOKS: readonly Playbook[] = [
  {
    slug: 'how-we-run-discovery',
    navLabel: 'How we run discovery',
    summary:
      'The weeks before the build — what we ask, what we refuse to do, and what you walk away holding.',
  },
  {
    slug: 'how-we-evaluate-ai-projects',
    navLabel: 'How we evaluate AI projects',
    summary:
      'Seven questions we answer before a line of code. Three of them have killed projects, on purpose.',
  },
  {
    slug: 'enterprise-website-checklist',
    navLabel: 'Enterprise website checklist',
    summary:
      'Forty checks that decide whether an enterprise site still works two years after launch.',
  },
  {
    slug: 'design-system-maturity-model',
    navLabel: 'Design system maturity model',
    summary:
      'Five levels, described honestly. Most teams sit a level lower than they think.',
  },
];

export const playbookPath = (slug: string) => `/services/${slug}`;

/** The other three, for the cross-link grid at the foot of each playbook. */
export const otherPlaybooks = (slug: string) => PLAYBOOKS.filter((p) => p.slug !== slug);
