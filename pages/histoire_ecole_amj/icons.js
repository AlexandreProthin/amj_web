import { svg } from '@shared/js/dom.js';

/*
 * Simple line pictograms for the story chapters, keyed by the « icone »
 * column of 04_recit_ecole.csv. Drawn on a 48 × 48 grid.
 */
const PATHS = {
  bateau: ['M6 32h36l-5 8H11z', 'M24 32V8', 'M24 10l12 18H24', 'M22 12L12 28h10', 'M4 44c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2'],
  eglise: ['M24 4v8', 'M20 8h8', 'M12 44V24l12-10 12 10v20', 'M6 44h36', 'M20 44v-9a4 4 0 0 1 8 0v9', 'M24 21v5'],
  ecole: ['M6 44V22l18-10 18 10v22', 'M4 44h40', 'M24 12V4l8 3-8 3', 'M13 26h6v6h-6z', 'M29 26h6v6h-6z', 'M20 44v-8h8v8'],
  croissance: ['M6 42h36', 'M10 42V32h6v10', 'M21 42V24h6v18', 'M32 42V14h6v28', 'M8 24L20 14l6 5 14-12', 'M34 7h6v6'],
  personnes: ['M16 18a6 6 0 1 0 0-.1', 'M32 18a6 6 0 1 0 0-.1', 'M5 40c0-7 5-12 11-12s11 5 11 12', 'M21 40c0-7 5-12 11-12s11 5 11 12'],
  direction: ['M24 16a7 7 0 1 0 0-.1', 'M10 44c0-9 6-15 14-15s14 6 14 15', 'M24 30l-3 5 3 9 3-9z', 'M34 4l2 4 4 .6-3 2.8.8 4.1-3.8-2-3.8 2 .8-4.1-3-2.8 4-.6z'],
  aujourdhui: ['M24 16a8 8 0 1 0 0 16 8 8 0 1 0 0-16', 'M24 4v5', 'M24 39v5', 'M4 24h5', 'M39 24h5', 'M10 10l3.5 3.5', 'M34.5 34.5L38 38', 'M38 10l-3.5 3.5', 'M13.5 34.5L10 38'],
};

export function icon(name, className = 'icon') {
  return svg(
    'svg',
    { class: className, viewBox: '0 0 48 48', 'aria-hidden': 'true', fill: 'none', stroke: 'currentColor', 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
    ...(PATHS[name] ?? PATHS.ecole).map((d) => svg('path', { d })),
  );
}
