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
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const AUTHORS: Record<string, Author> = {
  'Britt Midgette': {
    name: 'Britt Midgette',
    jobTitle: 'Founder & Experience Design Director',
    // Left empty for now — his posts render as before. Add a bio here to give
    // every Britt post the same author block, matching his /about identity.
    bio: '',
    url: `${SITE.url}/about`,
    // Matches the Person @id on the About page, unifying the two identities.
    personId: `${SITE.url}/about#britt-midgette`,
  },
  'Jonathan Smith': {
    name: 'Jonathan Smith',
    jobTitle: 'VP of Visual Design',
    bio: "Jonathan Smith is VP of Visual Design at Artifact Digital, where he leads visual design, product thinking, and AI-enabled creative workflows. Over the past decade, he's led product and brand design for organizations including ServiceNow, Intuit, Qualcomm, Disney, and Under Armour, helping teams create experiences that feel simple, human, and genuinely useful.",
    personId: `${SITE.url}/#person-jonathan-smith`,
    linkedin: 'https://www.linkedin.com/in/jonathansmith16/',
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
