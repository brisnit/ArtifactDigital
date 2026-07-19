import { SITE } from './site';

// One identity per author, referenced by every post they write. Keeps the
// author Person node in schema correct across bylines — a real E-E-A-T /
// AI-citation signal — instead of pointing every author at Britt's /about page.
export interface Author {
  name: string;
  jobTitle: string;
  /** Foot-of-post "About the author" block. Empty string = no block rendered. */
  bio: string;
  /** Canonical on-site page for this person, if one exists. */
  url?: string;
  /** Stable schema @id, so all of an author's posts map to one identity. */
  personId: string;
  /** Verified external profile → schema sameAs + the bio's LinkedIn link. */
  linkedin?: string;
  /** Square author portrait (webp) → the block avatar + schema Person image. */
  avatar?: string;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const AUTHORS: Record<string, Author> = {
  'Britt Midgette': {
    name: 'Britt Midgette',
    jobTitle: 'Founder & Experience Design Director',
    bio: "Britt Midgette is the founder of Artifact Digital. Over his career he's led digital strategy and experience design in director roles at agencies — for Samsung, Levi's, Under Armour, Philips, L'Oréal, LEGOLAND, CompTIA, ADM and SAG-AFTRA, among others — before starting Artifact to do the work the way he always believed it should be done: senior-led, honest, and close to the craft.",
    url: `${SITE.url}/about`,
    // Matches the Person @id on the About page, unifying the two identities.
    personId: `${SITE.url}/about#britt-midgette`,
    avatar: '/brand_assets/authors/britt-midgette.webp',
  },
  'Jonathan Smith': {
    name: 'Jonathan Smith',
    jobTitle: 'VP of Visual Design',
    bio: "Jonathan Smith is VP of Visual Design at Artifact Digital, where he leads visual design, product thinking, and AI-enabled creative workflows. Over the past decade, he's led product and brand design for organizations including ServiceNow, Intuit, Qualcomm, Disney, and Under Armour, helping teams create experiences that feel simple, human, and genuinely useful.",
    personId: `${SITE.url}/#person-jonathan-smith`,
    linkedin: 'https://www.linkedin.com/in/jonathansmith16/',
    avatar: '/brand_assets/authors/jonathan-smith.webp',
  },
};

export function authorFor(name: string): Author {
  return (
    AUTHORS[name] ?? {
      name,
      jobTitle: '',
      bio: '',
      personId: `${SITE.url}/#person-${slugify(name)}`,
    }
  );
}
