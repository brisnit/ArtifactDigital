import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production canonical host. Note: the live site uses the .co TLD
// (all prior canonicals/robots referenced artifactdigital.co).
export default defineConfig({
  site: 'https://artifactdigital.co',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
