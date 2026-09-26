---
type: Component
title: CSV import plugin
description: Vite plugin that turns an imported CSV file into an array of row objects at build time.
tags: [build, csv, data]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
resource: /src/build/csv-plugin.js
---

# Contract

`import rows from '@data/<folder>/<file>.csv'` yields an array of objects keyed
by the trimmed header row, cell values trimmed.

* Strips the UTF-8 BOM; detects `,` or `;` separators.
* Skips empty lines.
* A malformed file fails the build with the line number.

Implements the [owner CSV content decision](/decisions/owner-csv-as-content-source.md).
