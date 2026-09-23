// Two proofs, deliberately kept apart:
//
//  1. `testimonials` — real, named clients of ARTIFACT DIGITAL. Small and
//     growing. Only `approved: true` entries render, so nothing unverified
//     ever ships. This is the proof that compounds — add to it relentlessly.
//
//  2. `sectors` — industries Britt has worked in over his CAREER, in senior
//     roles at previous agencies. Always attributed as career experience,
//     never presented as Artifact's client list.
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  approved: boolean;
  /** 'software' quotes lead the homepage proof. Anything else (design and
   *  build work) renders beneath it. Adding a software quote needs no layout
   *  change — just an entry here. */
  kind: 'software' | 'design';
  /** What the work was, shown under the name so a quote is never mistaken
   *  for evidence of a different kind of engagement. */
  context?: string;
  /** A photograph of the person who said it. Optional: without one the pull
   *  quote renders as a single panel rather than a split, so a client who
   *  won't be photographed still gets the same treatment. Never use a stock
   *  portrait here - it has to be the actual person. */
  image?: string;
  imageAlt?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Artifact Digital built us a Shopify experience that completely transformed our business. Since launch, we’ve seen our sales multiply and our brand finally feels as premium online as it does in person.',
    name: 'Rob Chapman',
    role: 'Rob’s Brew Spot',
    approved: true,
    kind: 'design',
    context: 'Commerce design & build',
    image: '/brand_assets/clients/rob-chapman.webp',
    imageAlt: 'Rob Chapman at a table in his coffee shop, holding a latte.',
  },
  // Add every Artifact client here as you finish. Ask for the quote at the
  // moment they're happiest — right after launch. Real and small beats
  // anonymous and large.
];

// Career experience only — see note above. Do not relabel as clients.
export const sectors = [
  'Healthcare',
  'Financial services',
  'Retail & commerce',
  'Consumer electronics',
  'Education',
  'Global food & nutrition',
] as const;
