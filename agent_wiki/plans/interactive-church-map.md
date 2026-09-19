---
type: Plan
title: Interactive church map
description: Rebuild the church explorer using Leaflet, local map assets, name search and a fallback list.
tags: [map, leaflet, mobile, search, geography]
status: draft
generated: { by: codex/gpt-5, at: 2026-09-15T17:05:00Z }
verified:
  - by: human:alex
    at: 2026-09-15T20:46:11Z
---

# Outcome

Visitors search for a church or explore a simple locally packaged patrimonial
map through reliable touch controls.

# Work

1. Normalize church records into a versioned local dataset, retaining sources,
   precision, photographs and credits.
2. Optimize existing geographic layers for web delivery.
3. Integrate Leaflet for touch pan/zoom, markers, selection and result focus.
4. Render the approved local patrimonial basemap, without road-map tiles.
5. Make name search the primary mobile control and synchronize map, details and
   results list.
6. Keep the searchable list functional when map rendering is unavailable.

# Checks

* A known church can be searched, selected and inspected on a phone.
* Touch pan, zoom and marker detail work reliably.
* The fallback list preserves discovery when the map is unavailable.

# Depends on

[Foundation](/plans/github-pages-foundation.md), the [Leaflet
decision](/decisions/leaflet-for-interactive-map.md) and the [embedded basemap
decision](/decisions/embedded-patrimonial-basemap.md).
