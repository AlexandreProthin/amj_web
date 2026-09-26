---
type: Plan
title: Independent mobile experiences
description: Convert the three drafts into direct-link, accessible destinations.
tags: [content, mobile, accessibility, migration]
status: draft
generated: { by: codex/gpt-5, at: 2026-09-15T17:05:00Z }
verified:
  - by: human:alex
    at: 2026-09-26T21:23:04Z
---

# Outcome

The school history, church map and cathedral discovery each have a stable direct
URL and work without a shared home page.

# Work

1. Inventory HTML, data, images, interactions and links in each draft.
2. Create one entry page per experience with French titles and descriptions.
3. Extract only genuinely shared navigation and accessibility helpers.
4. Move oversized embedded content to named local data files when beneficial.
5. Preserve timelines, quizzes, printable content and cathedral interactions,
   or request approval for any intentional reduction.
6. Add useful in-page navigation and a visible « Informations » entry point.

# Progress

Suggested order, simplest first: cathedral, school history, church map.

* 2026-09-26 — [Cathedral experience](/components/cathedral-experience.md)
  first version, checked at 375, 768 and 1600 px wide. The draft's raw data
  tables are intentionally dropped ([content decision](/decisions/owner-csv-as-content-source.md));
  the printable A4 view is not yet ported. Open: [image gaps](/issues/cathedral-image-gaps.md).
* 2026-09-26 — [School history experience](/components/school-history-experience.md)
  first version; automated checks at three sizes pass. Open:
  [no photographs](/issues/school-history-images-missing.md); director list to be completed by the owner.
* 2026-09-27 — [Church map experience](/components/church-map-experience.md) first version.
  All three experiences now exist; printable views not ported.

# Checks

* Every experience opens from a fresh direct link.
* Phone, tablet and desktop layouts have no horizontal overflow.
* Essential interactions have keyboard labels and usable focus states.

# Depends on

[Foundation and publishing](/plans/github-pages-foundation.md).
