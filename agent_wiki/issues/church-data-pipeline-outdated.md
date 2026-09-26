---
type: Issue
title: Church data preparation tool points to the old folder
description: Editing the churches CSV does not update the map, because the tool that builds eglises_data.json still reads and writes html/eglises_nc/.
tags: [data, map, tooling]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-27T01:30:00Z }
resource: /../tools/prepare_eglises_data.py
---

# What is wrong

The map reads `data/eglises_nc/eglises_data.json`. That file was produced from
`eglises_catholiques_nouvelle_caledonie.csv` by `../tools/prepare_eglises_data.py`,
which:

* still uses `html/eglises_nc/` as its folder;
* geocodes every place again through online services and downloads photos;
* does not include the two Maré coordinate fixes that
  `../tools/build_eglises_html.py` applied (ids 53 and 54; already present in
  the current JSON).

So a correction made only in the CSV does not reach the map, and re-running the
tool as it is could overwrite good coordinates.

# Fix

Until the tool is updated, apply text corrections to both the CSV and
`eglises_data.json` (the agent can do this on request). Longer term: point the
tool at `data/eglises_nc/`, keep existing coordinates unless asked, and carry
the manual fixes as data.
