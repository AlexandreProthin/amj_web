---
type: Reference
title: Automated browser tests
description: Playwright checks of every experience on phone, tablet and desktop sizes, plus a screenshot helper.
tags: [testing, playwright, quality]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T23:30:00Z }
verified:
  - by: human:alex
    at: 2026-09-26T21:36:31Z
resource: /tests/
---

# Commands

| Command (from `amj_web/`) | Effect |
|---|---|
| `npm test` | Builds, serves the production output on port 4173, runs `tests/*.spec.js` on three projects: phone (375 × 812, touch), tablet (768 × 1024, touch), desktop (1600 × 900). |
| `node tests/screenshots.mjs <page>/ "#section" …` | With `npm run dev` running: saves screenshots of the given sections at the three sizes in `test-results/screens/`. |

First run on a new machine: `npx playwright install chromium`.

# What is checked

* Each experience opens directly, with no script error and no horizontal scrolling.
* « Informations » opens and closes.
* The quiz gives feedback.
* Cathedral: eight steps, each with an activity. School history: the ordering game completes.
* Church map (`tests/map.spec.js`): search by name, Enter, pin tap, cluster zoom,
  deep link with photo, legend filter, phone list round trip, list fallback when
  the map code is blocked.

Supports the [quality plan](/plans/quality-and-public-release.md).
