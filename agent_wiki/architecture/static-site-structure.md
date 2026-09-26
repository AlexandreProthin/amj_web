---
type: Architecture
title: Static site structure and build
description: How owner data, page source and shared code combine into the static site served by GitHub Pages.
tags: [architecture, vite, github-pages, build]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
resource: /README.md
---

# Shape

A multi-page static site built with Vite 6 (plain JavaScript and CSS, no
framework). Each experience is an independent HTML entry reached directly by its
QR code; there is no router and no shared runtime state.

| Layer | Path | Role |
|---|---|---|
| Owner data | `data/` | CSV, JSON and images — the only place content is edited. |
| Page source | `pages/<experience>/` | Page shell, rendering script, page configuration and styles. |
| Shared code | `src/shared/` | Design tokens, base styles, reusable components. See [shared UI](/components/shared-ui.md). |
| Build plugins | `src/build/` | [CSV import plugin](/components/csv-build-plugin.md). |
| Output | `dist/` | Generated, not versioned; this is what GitHub Pages will serve. |
| Reference | `draft/` | Original standalone drafts, never served. |
| Tests | `tests/` | [Automated browser tests](/references/automated-tests.md). |

# Data flow

1. A page's `content.js` imports CSV files; the [CSV plugin](/components/csv-build-plugin.md)
   turns them into arrays of objects at build time.
2. Images are imported with `vite-imagetools` directives; the build emits
   resized WebP and JPEG variants used through `<picture>`.
3. `main.js` renders the page from that data in the browser. All data text is
   inserted as text nodes, never as HTML.

The reasoning is in [owner CSV files as the content source](/decisions/owner-csv-as-content-source.md)
and [page source in pages/, output in dist/](/decisions/pages-source-dist-output.md).

# Runtime constraints

* URLs are relative (`base: './'`), so the site works under any
  `<account>.github.io/<repo>/` path.
* No external requests: fonts are bundled from Fontsource, the map will use
  local layers ([basemap decision](/decisions/embedded-patrimonial-basemap.md)).
* Layout adapts by [CSS breakpoints](/decisions/css-breakpoints-for-device-layouts.md).
* Node 20.14 is installed locally, which is why Vite is pinned to 6.x and
  `vite-imagetools` to 9.x; `sharp` is overridden to a patched 0.35.x.

# Running

See [local development server](/references/local-dev-server.md).
