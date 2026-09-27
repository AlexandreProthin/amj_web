---
type: Plan
title: QR codes and printed supports
description: Create validated QR assets, then A4 and compact-cartel designs for each experience.
tags: [qr-code, print, a4, cartel]
status: draft
generated: { by: codex/gpt-5, at: 2026-09-15T17:05:00Z }
verified:
  - by: human:alex
    at: 2026-09-15T20:46:38Z
---

# Work

1. Freeze the three public URLs after production testing.
2. ~~Generate one high-contrast QR code with a quiet margin for each URL.~~
   Done 2026-09-27 (error correction Q), in a first A4 welcome sheet with all
   three codes: `print/qr_codes.html`, built from `print/qr_codes.template.html`
   by `npm run print` (QR codes and fonts inlined; decodes checked with OpenCV).
3. Test printed samples with multiple phones.
4. Deliver the three raw QR assets.
5. Following identity and design approval, create A4 and compact cartel layouts
   for each experience.
6. Include title, French scan invitation, QR code and required credits.
7. Render and inspect print previews before delivery.

# Checks

* Each QR code scans to its intended live URL.
* A4 and cartel supports reuse the same code for the same experience.
* QR codes still scan after final layout and printing tests.

# Depends on

[Public release](/plans/quality-and-public-release.md) and owner-approved
print design inputs.
