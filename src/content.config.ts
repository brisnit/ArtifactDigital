import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- Case studies -----------------------------------------------------------
// Data-driven so the full roster (Phase 4) is cheap to add: one JSON file each,
// rendered by src/pages/[case].astro. Slugs preserve the original live URLs.
const work = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      metaTitle: z.string(),
      description: z.string(),
      order: z.number().default(99),
      year: z.string(),
      category: z.string(),
      // Home Work grid
      card: z.object({
        eyebrow: z.string(),
        blurb: z.string(),
        image: z.string(),
        imageAlt: z.string(),
        tags: z.array(z.string()),
        wide: z.boolean().default(false),
      }),
      ogImage: z.string(),
      // Hero
      heroEyebrow: z.string(),
      titleLines: z.array(z.object({ text: z.string(), italic: z.boolean().default(false) })),
      lede: z.string(),
      meta: z.array(z.object({ label: z.string(), value: z.string() })),
      // Featured media
      feature: z.object({
        video: z.string().optional(),
        poster: z.string().optional(),
        image: z.string().optional(),
        alt: z.string(),
        caption: z.string(),
      }),
      // Pillars
      pillarsTag: z.string(),
      pillarsHeading: z.string(),
      pillars: z.array(z.object({ title: z.string(), body: z.string() })),
      // Story
      storyTag: z.string(),
      storyHeadingLines: z.array(z.object({ text: z.string(), italic: z.boolean().default(false) })),
      storyParagraphs: z.array(z.string()),
      storyImage: z.string(),
      storyImageAlt: z.string(),
      storyCaption: z.string(),
      // Highlights
      highlights: z.array(z.object({ title: z.string(), body: z.string() })),
      // CTA
      ctaHeading: z.string(),
    }),
});

// --- Insights (blog, on-site — no more Medium) ------------------------------
const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaTitle: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Britt Midgette'),
    cluster: z.string(),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, insights };
