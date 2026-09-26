---
type: Decision
title: Embed a simple patrimonial basemap
description: The interactive church map uses locally packaged geographic layers rather than an external road-tile service.
tags: [map, offline-resilience, mobile, github-pages]
status: stable
generated: { by: codex/gpt-5, at: 2026-09-15T16:55:00Z }
verified:
  - by: human:alex
    at: 2026-09-15T20:42:53Z
sources:
  - id: map-draft
    resource: /draft/eglises_nc/eglises_nc.html
    title: Existing locally embedded geographic layers
---

# Context

The map must be intuitive on a phone, but visitors do not require a detailed
road map to navigate to each church. GitHub Pages hosts static files and does
not provide map tiles. External tile providers add availability, attribution
and usage-policy dependencies.

# Options

| Option | Assessment |
|---|---|
| External road-map tiles | Familiar street detail but requires a third-party service and a working network connection beyond the site itself. |
| Locally packaged patrimonial basemap | Sufficient for the intended exploration, predictable on GitHub Pages and based on the geographic layers already present in the drafts. |

# Decision

Use a simple, locally packaged patrimonial basemap with the church locations.
Leaflet provides pan, zoom, search-result selection and marker interaction over
these local assets.

# Consequences

* The site does not depend on a map-tile provider for its core map experience.
* The map is an exploration tool, not turn-by-turn navigation.
* Geographic assets must be optimized and credited before publication.
