---
type: Issue
title: Cathedral images mislabelled or missing
description: Several cathedral image files show something other than their name, and some subjects have no usable photo.
tags: [cathedral, images, content]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
verified:
  - by: human:alex
    at: 2026-09-26T21:24:46Z
resource: /data/cathedrale_de_noumea/assets/images/
---

# What is wrong

| File | Actually shows | Used for |
|---|---|---|
| `02_construction/construction.jpg` | Golden monogram shield | Step 8 decorative detail |
| `03_architecture/interieur.jpg` | Old postcard of the interior (ed. J. Raché) | Step 2 "vue ancienne" |
| `05_statues/notre-dame-des-flots.jpg` | Modern view of nave and choir | Step 3 pointed arches |
| `05_statues/saint-joseph.jpg` | Bishop's seat and stalls | Step 6 woodwork |
| `04_vitraux/*.jpg` | Stained glass, only about 60×150 px | Step 4, shown small |

The draft captioned these by filename, so it showed wrong captions.

# Missing

* Photos of the statues of Notre-Dame des Flots and of saint Joseph with the
  Child (step 5 currently zooms on the façade niche instead).
* Larger stained-glass photos of saint Pierre, sainte Cécile and saint Michel.
* A photo of the pulpit (chaire) for step 6.
* A historical photo of the construction site for step 2.
* Optionally a short organ recording (step 7 synthesises a chord).

# Fix

Owner supplies images; rename files to match their subject and update
`pages/cathedrale_de_noumea/content.js`.
