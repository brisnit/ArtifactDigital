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
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Artifact Digital built us a Shopify experience that completely transformed our business. Since launch, we’ve seen our sales multiply and our brand finally feels as premium online as it does in person.',
    name: 'Rob Chapman',
    role: 'Rob’s Brew Spot',
    approved: true,
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
