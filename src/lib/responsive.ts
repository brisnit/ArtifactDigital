import fs from 'node:fs';
import path from 'node:path';
import { imageSize } from './imageSize';

const VARIANTS = [480, 960];

export interface Responsive {
  width?: number;
  height?: number;
  srcset?: string;
}

// Build-time only. Card and hero art is stored at 1200–1600px but displayed far
// smaller, so a phone was downloading a desktop-sized file. `_variants` pre-built
// narrow copies next to each original (foo-480w.webp); this pairs them into a
// srcset so the browser picks the right one. Falls back silently to the original
// if no variants exist, so nothing breaks for images we haven't processed.
export async function responsive(src?: string): Promise<Responsive> {
  if (!src) return {};
  const size = await imageSize(src);
  if (!size) return {};

  const parts: string[] = [];
  for (const w of VARIANTS) {
    if (w >= size.width) continue;
    const rel = src.replace(/\.webp$/, `-${w}w.webp`);
    if (fs.existsSync(path.join(process.cwd(), 'public', rel.replace(/^\//, '')))) {
      parts.push(`${rel} ${w}w`);
    }
  }
  if (!parts.length) return { width: size.width, height: size.height };

  parts.push(`${src} ${size.width}w`);
  return { width: size.width, height: size.height, srcset: parts.join(', ') };
}
