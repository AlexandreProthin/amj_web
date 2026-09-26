---
type: Decision
title: Owner CSV files are the content source
description: Pages read visitor-facing text from the owner's CSV files at build time; page configuration only maps images and activity behaviour.
tags: [content, data, maintenance, csv]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
sources:
  - id: owner-2026-09-26
    resource: /log.md
    title: Owner answers of 2026-09-26 (labels and sources only under « Informations »; show everything)
---

# Context

The [maintenance requirement](/specs/public-heritage-portal.md) asks that
content, data and images stay separate from interface code. The owner will keep
completing the CSV files (for example school directors). The drafts had copied
the CSV text into their HTML, so every correction meant editing code.

Some CSV columns are written for teachers (instructions, durations, pedagogical
goals, suggested HTML elements), and the school history data carries
reliability labels and source notes.

# Decision

* Visitor-facing text is read from the CSV files at build time through the
  [CSV plugin](/components/csv-build-plugin.md). Editing a CSV and rebuilding
  updates the page.
* Each page's `content.js` states which columns are shown, which image goes
  with which part, and activity settings (options, crops). Short activity
  helper texts that the CSV does not contain live there too.
* Teacher-only columns are never displayed.
* Reliability labels and sources appear only in the « Informations » panel,
  never in the main story (owner, 2026-09-26).[^owner-2026-09-26]
* All records are shown, including those marked as not re-verified
  (owner, 2026-09-26).[^owner-2026-09-26]

[^owner-2026-09-26]: Owner answers of 2026-09-26

# Consequences

* Renaming a CSV column breaks the page build or empties a field: column
  names are part of the contract and are listed in each component concept.
* The raw data-table views of the drafts are not reproduced; the CSV files
  remain the full record.
