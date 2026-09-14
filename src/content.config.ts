import { defineCollection, z } from 'astro:content';
import { METHOD } from './data/method';
import { BUILD_CLUSTERS } from './data/build';
import { glob } from 'astro/loaders';

// --- Case studies -----------------------------------------------------------
// Data-driven so the full roster (Phase 4) is cheap to add: one JSON file each,
// rendered by src/pages/[case].astro. Slugs preserve the original live URLs.
const work = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/work' }),
  schema: () =>
    z.object({
      title: z.string(),
      metaTitle: z.string(),
      description: z.string(),
      order: z.number().default(99),
      year: z.string(),
      category: z.string(),
      // True when the work was led in a senior role at a previous agency,
      // before Artifact existed. Renders an explicit attribution note —
      // never imply Artifact held the engagement.
      priorRole: z.boolean().default(false),
      // True only where people who now work on Artifact projects genuinely
      // worked on this engagement together. Prior work is narrated in the
      // third person: "Britt and the team" here, "Britt" when it was one person.
      teamWork: z.boolean().default(false),
      // Where Artifact-built software actually stands (Live, Pre-launch,
      // Prototype). Shown beside the proof tier so a prototype never reads as
      // a live client product.
      status: z.string().optional(),
      // Public URL, where the work is live and safe to link.
      liveUrl: z.string().optional(),
      // Home Work grid. Image optional — a branded mark renders until art lands.
      card: z.object({
        eyebrow: z.string(),
        blurb: z.string(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        tags: z.array(z.string()),
        wide: z.boolean().default(false),
      }),
      ogImage: z.string().optional(),
      // Hero
      heroEyebrow: z.string(),
      titleLines: z.array(z.object({ text: z.string(), italic: z.boolean().default(false) })),
      lede: z.string(),
      meta: z.array(z.object({ label: z.string(), value: z.string() })),
      // Featured media — whole section optional until art exists.
      feature: z
        .object({
          video: z.string().optional(),
          poster: z.string().optional(),
          image: z.string().optional(),
          alt: z.string(),
          caption: z.string(),
        })
        .optional(),
      // Pillars
      pillarsTag: z.string(),
      pillarsHeading: z.string(),
      pillars: z.array(z.object({ title: z.string(), body: z.string() })),
      // Story
      storyTag: z.string(),
      storyHeadingLines: z.array(z.object({ text: z.string(), italic: z.boolean().default(false) })),
      storyParagraphs: z.array(z.string()),
      // Optional: omit where no media can be shown without exposing a client's
      // branding or an identifiable person.
      storyImage: z.string().optional(),
      storyImageAlt: z.string().optional(),
      storyCaption: z.string().optional(),
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

// --- Services ---------------------------------------------------------------
// The Bespoke SaaS flagship plus the capability pages: full-depth, teaching-
// oriented, in Britt's voice. Data-driven so the What We Build hub, nav and
// schema all stay in sync from one source.
const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    navLabel: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    order: z.number().default(99),
    // The flagship offer renders the shared Artifact method and the five kinds
    // of software in place of a page-specific process.
    flagship: z.boolean().default(false),
    eyebrow: z.string(),
    heroTitleLines: z.array(z.object({ text: z.string(), italic: z.boolean().default(false) })),
    lede: z.string(),
    summary: z.string(), // one-liner for the hub + nav
    // Teaching body
    intro: z.array(z.string()),
    sections: z.array(z.object({ heading: z.string(), body: z.array(z.string()) })),
    // There is one Artifact method (src/data/method.ts). A capability page may say
    // what its discipline contributes at a stage; it can't invent a process.
    inMethod: z
      .array(
        z.object({
          stage: z.string().refine((s) => METHOD.some((m) => m.title === s), {
            message: 'stage must be one of the shared method stages',
          }),
          body: z.string(),
        })
      )
      .default([])
      .refine((a) => new Set(a.map((x) => x.stage)).size === a.length, {
        message: 'each method stage may appear once',
      }),
    // The kinds of software (src/data/build.ts) this capability helps build.
    buildsWith: z
      .array(z.string().refine((id) => BUILD_CLUSTERS.some((c) => c.id === id), { message: 'unknown build cluster' }))
      .default([]),
    // Optional list of what the discipline covers, rendered as its own grid.
    capabilities: z.array(z.string()).optional(),
    deliverables: z.array(z.string()),
    whoFor: z.array(z.string()),
    faq: z.array(z.object({ q: z.string(), a: z.string() })),
    // Cross-linking
    relatedTags: z.array(z.string()).default([]),
    relatedServices: z.array(z.string()).default([]),
    ctaHeading: z.string(),
    ctaSub: z.string().optional(),
    cta: z
      .object({
        primary: z.enum(['build', 'problem', 'audit', 'ai']).default('build'),
        secondary: z.enum(['what-we-build', 'how-we-work', 'work', 'audit']).default('what-we-build'),
      })
      .default({}),
  }),
});

export const collections = { work, insights, services };
