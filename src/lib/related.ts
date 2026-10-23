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
    // Score first, then editorial order, then id. That last key matters: ties on
    // the first two used to fall through to getCollection order, which varies
    // between cold builds, so the case shown on a service page could change from
    // one deploy to the next with no content change at all.
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.c.data.order - b.c.data.order ||
        a.c.id.localeCompare(b.c.id)
    );

  // If nothing matched, fall back to the most recent cases so the section
  // never renders empty.
  const chosen = scored.length
    ? scored.map((x) => x.c)
    : // Same tiebreak on the fallback path, and a copy so the collection array
      // isn't sorted in place for whatever renders next.
      [...cases].sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
  return chosen.slice(0, limit);
}
