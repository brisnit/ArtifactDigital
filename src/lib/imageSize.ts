import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

// Build-time only. Reads the real pixel dimensions of an image in public/ so
// templates can emit width/height on every <img>. The browser then reserves the
// correct box before the file arrives, which is what keeps CLS at zero — and it
// works even where no CSS aspect-ratio is set.
//
// Static build, so this never runs in the browser and never costs a request.
const cache = new Map<string, { width: number; height: number } | null>();

export async function imageSize(src: string): Promise<{ width: number; height: number } | null> {
  if (!src || src.startsWith('http')) return null;
  if (cache.has(src)) return cache.get(src)!;

  const file = path.join(process.cwd(), 'public', src.replace(/^\//, ''));
  let out: { width: number; height: number } | null = null;
  try {
    if (fs.existsSync(file)) {
      const m = await sharp(file).metadata();
      if (m.width && m.height) out = { width: m.width, height: m.height };
    }
  } catch {
    out = null; // never fail a build over a missing image
  }
  if (out === null) {
    console.warn(`[imageSize] could not read dimensions for ${src}`);
  }
  cache.set(src, out);
  return out;
}
