---
type: Plan
title: Quality assurance and public release
description: Verify behavior, content integrity and production deployment before public circulation.
tags: [testing, mobile, release, github-pages]
status: draft
generated: { by: codex/gpt-5, at: 2026-09-15T17:05:00Z }
verified:
  - by: human:alex
    at: 2026-09-15T20:45:21Z
---

# Progress

* 2026-09-26 — Playwright set up with phone, tablet and desktop projects; see
  [automated tests](/references/automated-tests.md). Map tests still to add.

# Work

1. Add automated checks for direct URLs on phone, tablet and desktop viewports.
2. Test map search, selection, touch pan, zoom and fallback-list behavior.
3. Check overflow, text legibility, touch targets, links, assets and credits.
4. Deploy a release candidate to GitHub Pages and test all real URLs on phones.
5. Obtain owner approval for public text, credits, identity and behavior.

# Checks

* Automated checks pass.
* Manual phone checks pass for the three production URLs.
* GitHub Pages deploys successfully with HTTPS.
* The owner approves the release candidate.

# Depends on

[Independent experiences](/plans/independent-experiences.md), [interactive
map](/plans/interactive-church-map.md) and [identity](/plans/identity-and-attribution.md).
