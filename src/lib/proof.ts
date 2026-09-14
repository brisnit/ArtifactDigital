import type { CollectionEntry } from 'astro:content';

// The one place proof tiers are decided. Every page that labels evidence reads
// from here, so marketing copy can never relabel prior-agency work as Artifact's.
export type Tier = 'artifact' | 'own' | 'founder' | 'team' | 'concept';

export const TIER_LABEL: Record<Tier, string> = {
  artifact: 'Built by Artifact',
  own: 'Artifact’s own product',
  founder: 'Our founder’s work',
  team: 'Our team’s prior work',
  concept: 'Artifact concept',
};

// Products Artifact owns outright, rather than built for a client.
const OWN_PRODUCTS = new Set(['case-benchbot']);

export function caseTier(entry: CollectionEntry<'work'>): Exclude<Tier, 'concept'> {
  if (entry.data.priorRole) return entry.data.teamWork ? 'team' : 'founder';
  return OWN_PRODUCTS.has(entry.id) ? 'own' : 'artifact';
}

/** Chip text for a case: its tier, plus its status where it has one. */
export function tierText(entry: CollectionEntry<'work'>): string {
  const label = TIER_LABEL[caseTier(entry)];
  return entry.data.status ? `${label} · ${entry.data.status}` : label;
}

// The order proof appears in, everywhere work is listed. Strategic rather than
// chronological: software Artifact built leads, strongest evidence first, then
// the team's prior work, then the founder's. A case missing from this list
// still renders, after these, in its own `order`.
export const WORK_ORDER = [
  'case-dropq',
  'case-benchbot',
  'case-senior-living-ministry',
  'case-major-electronics',
  'case-global-nutrition',
  'case-weather-intelligence',
  'case-it-training',
  'case-major-clothing',
];

export function sortWork<T extends CollectionEntry<'work'>>(entries: T[]): T[] {
  const rank = (e: T) => {
    const i = WORK_ORDER.indexOf(e.id);
    return i === -1 ? WORK_ORDER.length + e.data.order : i;
  };
  return [...entries].sort((a, b) => rank(a) - rank(b));
}

// Concepts have no case study, so they live here instead of the work
// collection, and can only ever render as a concept.
export interface Concept {
  name: string;
  href: string;
  status: string;
  eyebrow: string;
  year: string;
  blurb: string;
  image: string;
  imageAlt: string;
  tags: string[];
}

export const CONCEPTS: readonly Concept[] = [
  {
    name: 'Predictive Learning Platform',
    href: '/insights/if-we-cant-see-whats-happening',
    status: 'In development',
    eyebrow: 'Learning intelligence',
    year: '2026',
    blurb:
      'A platform for seeing learner risk earlier, so educators can step in before a student falls behind. Explored in our writing; not a client product.',
    image: '/brand_assets/insights/if-we-cant-see-whats-happening.webp',
    imageAlt: 'A concept dashboard flagging at-risk students, shown with sample data.',
    tags: ['AI', 'Education', 'Concept'],
  },
];
