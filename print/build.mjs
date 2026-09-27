// Builds print/qr_codes.html from print/qr_codes.template.html:
// inlines one QR code per experience and embeds the fonts, so the page prints
// identically from any computer (open it in a browser, then Ctrl+P, A4).
//   npm run print
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { encode } from 'uqr';

const here = import.meta.dirname;
const site = 'https://alexandreprothin.github.io/amj_web/';
const experiences = ['cathedrale_de_noumea', 'histoire_ecole_amj', 'eglises_nc'];

// One <path> of unit squares; the quiet zone is drawn by the card around it.
function qrSvg(url) {
  const { size, data } = encode(url, { ecc: 'Q', border: 0 });
  let d = '';
  data.forEach((row, y) => row.forEach((on, x) => { if (on) d += `M${x} ${y}h1v1h-1z`; }));
  return `<svg class="qr__code" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" role="img" aria-label="QR code vers ${url}"><path d="${d}"/></svg>`;
}

const font = (path) =>
  `url(data:font/woff2;base64,${readFileSync(resolve(here, '../node_modules', path)).toString('base64')}) format('woff2')`;

const fonts = `
@font-face { font-family: 'Fraunces'; font-weight: 100 900; font-display: block;
  src: ${font('@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2')}; }
@font-face { font-family: 'Atkinson'; font-weight: 400; font-display: block;
  src: ${font('@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-400-normal.woff2')}; }
@font-face { font-family: 'Atkinson'; font-weight: 700; font-display: block;
  src: ${font('@fontsource/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-700-normal.woff2')}; }`;

let html = readFileSync(resolve(here, 'qr_codes.template.html'), 'utf8').replace('/* {{FONTS}} */', fonts);
for (const name of experiences) {
  html = html
    .replace(`{{QR:${name}}}`, qrSvg(`${site}${name}/`))
    .replaceAll(`{{HREF:${name}}}`, `${site}${name}/`)
    .replaceAll(`{{URL:${name}}}`, `${site.replace('https://', '')}<b>${name}/</b>`);
}
writeFileSync(resolve(here, 'qr_codes.html'), html);
console.log('print/qr_codes.html written');
