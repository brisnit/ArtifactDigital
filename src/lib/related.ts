import { getCollection } from 'astro:content';

// Match case studies to a service by shared tags/category (case-insensitive,
// substring-tolerant so "UX/UI" matches "UX"). Returns up to `limit` cases.
export async function relatedCases(relatedTags: string[], limit = 3) {
  if (!relatedTags.length) return [];
  const wanted = relatedTags.map((t) => t.toLowerCase());
  const cases = await getCollection('work');
  const scored = cases
    .map((c) => {
      const haystack = [
        c.data.category,
        ...c.data.card.tags,
        ...c.data.meta.map((m) => m.value),
      ]
        .join(' ')
        .toLowerCase();
      const score = wanted.reduce((n, w) => (haystack.includes(w) ? n + 1 : n), 0);
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.c.data.order - b.c.data.order);

  // If nothing matched, fall back to the most recent cases so the section
  // never renders empty.
  const chosen = scored.length ? scored.map((x) => x.c) : cases.sort((a, b) => a.data.order - b.data.order);
  return chosen.slice(0, limit);
}
