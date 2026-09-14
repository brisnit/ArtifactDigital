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
