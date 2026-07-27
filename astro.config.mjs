// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Domaine de production réel — sert de base à Astro.site,
  // aux canonical et au sitemap.
  site: 'https://www.trouve-tout-conseil.fr',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind()],
});
