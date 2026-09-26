import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { qrcode } from 'vite-plugin-qrcode';
import { csvPlugin } from './src/build/csv-plugin.js';

const root = resolve(import.meta.dirname, 'pages');

// Every folder of pages/ holding an index.html is one public experience.
const experiences = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(resolve(root, entry.name, 'index.html')))
  .map((entry) => entry.name);

const input = Object.fromEntries([
  ['index', resolve(root, 'index.html')],
  ...experiences.map((name) => [name, resolve(root, name, 'index.html')]),
]);

export default defineConfig({
  root,
  // Relative URLs: the site works under any GitHub Pages path (/<repo>/...).
  base: './',
  publicDir: false,
  resolve: {
    alias: {
      '@data': resolve(import.meta.dirname, 'data'),
      '@shared': resolve(import.meta.dirname, 'src/shared'),
    },
  },
  server: {
    fs: { allow: [import.meta.dirname] },
  },
  plugins: [
    csvPlugin(),
    imagetools({
      defaultDirectives: new URLSearchParams({ withoutEnlargement: 'true' }),
    }),
    qrcode(),
  ],
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: { input },
  },
});
