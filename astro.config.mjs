// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Required for SSR
  adapter: cloudflare({
    mode: 'directory', // Recommended for Cloudflare Pages
    runtime: {
      mode: 'local' // Enable for local testing with Wrangler
    }
  }),
  integrations: [
    preact({
      compat: true // Adds React compatibility if needed
    }),
    tailwind({
      config: {
        path: './tailwind.config.cjs' // Specify your Tailwind config path
      }
    })
  ],
  vite: {
    ssr: {
      noExternal: ['react', 'preact', 'react-dom'] // Improves SSR compatibility
    },
    define: {
      global: 'globalThis' // Cloudflare workers polyfill
    },
    optimizeDeps: {
      include: ['@astrojs/preact/client.js'] // Preact optimization
    }
  }
});