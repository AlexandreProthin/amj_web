---
type: Issue
title: Image rights not confirmed
description: Most published photographs carry a third-party signature and have no recorded licence.
tags: [credits, licensing, release-blocker]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
verified:
  - by: human:alex
    at: 2026-09-26T21:25:18Z
---

# What is wrong

Most cathedral photographs bear the watermark « Jeff VERGNE ». No licence or
permission is recorded. The church map images come from various sources
(some from Wikimedia Commons) whose licences are not yet recorded either.
On the map, 3 of the 27 photos have a recorded author and licence (Wikimedia
Commons); the others come from the diocese website and a tourism image
service, with no licence recorded.

# Impact

Blocks public release: the [identity and attribution plan](/plans/identity-and-attribution.md)
requires every public image to have its agreed credit. The « Informations »
panel shows « à compléter » for each missing author or licence.

# Fix

For each image: confirm permission or licence, then fill `author`,
`licence` and `url` in the page's credits list, or replace the image.
