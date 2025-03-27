import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';             // ✅ Latest


export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [
    preact(),
    tailwind()
  ]
});