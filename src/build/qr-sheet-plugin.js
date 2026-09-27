import { resolve } from 'node:path';
import { renderSheet } from '../../print/build.mjs';

// Serves the printable QR-code sheet (print/qr_codes.template.html) as the
// site's root page, so the web and paper versions never drift apart.
export function qrSheetPlugin(rootIndex) {
  return {
    name: 'amj-qr-sheet',
    transformIndexHtml: {
      order: 'pre',
      handler(html, { filename }) {
        return resolve(filename) === rootIndex ? renderSheet({ relativeLinks: true }) : html;
      },
    },
  };
}
