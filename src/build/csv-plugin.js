import { readFile } from 'node:fs/promises';
import Papa from 'papaparse';

/**
 * Lets pages `import rows from '@data/…/file.csv'`.
 *
 * The CSV is parsed at build time into an array of objects keyed by the
 * header row, so the owner edits the CSV and the page follows on the next
 * build. Handles the UTF-8 BOM and detects `,` or `;` separators.
 */
export function csvPlugin() {
  return {
    name: 'amj-csv',
    async load(id) {
      if (!id.endsWith('.csv')) return null;
      const text = (await readFile(id, 'utf8')).replace(/^﻿/, '');
      const { data, errors } = Papa.parse(text, {
        header: true,
        skipEmptyLines: 'greedy',
        transformHeader: (header) => header.trim(),
        transform: (value) => value.trim(),
      });
      if (errors.length) {
        const [first] = errors;
        this.error(`${id}: ligne ${first.row + 2} — ${first.message}`);
      }
      return `export default ${JSON.stringify(data)};`;
    },
  };
}
