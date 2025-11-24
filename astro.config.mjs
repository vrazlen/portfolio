import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // The domain where the site will be hosted (for sitemap generation)
  site: 'https://vrazlen.github.io',

  // The sub-path. If your repo is "my-portfolio", this MUST be set.
  // If your repo is "username.github.io", you can omit this or set to '/'.
  base: '/portfolio',

  integrations: [react(), tailwind()],

  // Explicitly defining static output ensures no SSR surprises
  output: 'static',

  // Enabling the prefetch strategy for instant navigation
  prefetch: true,
});
