import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production canonical host. Vercel serves the site on the www subdomain
// (apex artifactdigital.co 307-redirects to www), so canonicals point at www.
export default defineConfig({
  site: 'https://www.artifactdigital.co',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
