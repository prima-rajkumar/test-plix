import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  integrations: [
    preact(),
    tailwind()
  ]
});