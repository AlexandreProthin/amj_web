---
type: Decision
title: The site's root page is the printable QR-code sheet
description: https://alexandreprothin.github.io/amj_web/ shows the A4 welcome sheet, generated from the same template as the print file.
tags: [github-pages, print, qr-code]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-27T14:00:00Z }
resource: /src/build/qr-sheet-plugin.js
---

# Context

The root address used to show a plain list of the experiences
([pages/dist decision](/decisions/pages-source-dist-output.md)). The owner asked
for the A4 welcome sheet with the three QR codes (`print/qr_codes.html`) to be
the content of the root address.

# Decision

`src/build/qr-sheet-plugin.js` replaces `pages/index.html` at dev and build
time with the sheet rendered by `print/build.mjs` from
`print/qr_codes.template.html`, the same code that writes the print file.
On the site the codes link to `./<experience>/` (local previews stay local);
the print file links to the public URLs. `pages/_home/` was removed.

# Consequences

* One template for web and paper; they cannot drift apart.
* The sheet shrinks to fit narrow screens (`--mm`), and still prints on one
  page from the website.
* The root page is not a QR destination; the three experiences still are
  ([spec](/specs/public-heritage-portal.md)).
