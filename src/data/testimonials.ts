// Testimonials render only when `approved: true`, so nothing unverified ever
// ships. Attribute by role + industry (never client name) per the anonymized
// positioning. Replace the bracketed placeholders with real, approved quotes
// and flip `approved` to true.
export interface Testimonial {
  quote: string;
  role: string;
  sector: string;
  approved: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      '[Placeholder — add an approved 1–2 sentence, outcome-focused quote from this engagement.]',
    role: 'VP, Digital Experience',
    sector: 'Global consumer electronics brand',
    approved: false,
  },
  {
    quote:
      '[Placeholder — add an approved quote emphasising strategy, clarity, or measurable results.]',
    role: 'Head of Marketing Technology',
    sector: 'Fortune 500 food & nutrition company',
    approved: false,
  },
  {
    quote:
      '[Placeholder — add an approved quote about partnership, senior-led delivery, or craft.]',
    role: 'Chief Executive Officer',
    sector: 'IT training & certification platform',
    approved: false,
  },
];

// Sectors we've delivered across (from the wider client roster) — used for the
// aggregate credibility line. Truthful and safe without naming any client.
export const sectors = [
  'Healthcare',
  'Financial services',
  'Retail & commerce',
  'Consumer electronics',
  'Education',
  'Global food & nutrition',
] as const;
