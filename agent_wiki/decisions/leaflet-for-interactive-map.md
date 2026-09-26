---
type: Decision
title: Use Leaflet for the interactive church map
description: The static site stays lightweight while the map uses a purpose-built library for reliable mobile interaction.
tags: [map, leaflet, mobile, github-pages]
status: stable
generated: { by: codex/gpt-5, at: 2026-09-15T16:48:00Z }
verified:
  - by: human:alex
    at: 2026-09-15T20:47:00Z
sources:
  - id: leaflet-evaluation
    resource: /draft/eglises_nc/eglises_nc.html
    title: Existing custom SVG map prototype
---

# Context

The church map is a priority mobile experience. The draft implements its own
SVG rendering, search, zoom, pan, markers and popups in a single large HTML
file. The public site must remain compatible with GitHub Pages and avoid
unnecessary framework complexity.

# Options

| Option | Assessment |
|---|---|
| Keep the custom SVG implementation | Self-contained, but interaction code remains bespoke and costly to test and maintain. |
| Adopt React for the whole site | Does not directly solve map interaction and adds a broad framework where the other pages are static. |
| Adopt MapLibre | Powerful for vector tiles, 3D and very large datasets, but needs more infrastructure and configuration than this map requires. |
| Use Leaflet for the map only | Provides mature touch interactions, map controls, markers and popups while retaining a lightweight static site. |

# Decision

Use Leaflet as the map-specific library. The rest of the site uses a lightweight
static stack with modular HTML, CSS and JavaScript, built and deployed to
GitHub Pages.

The map must retain a searchable list of locations so the primary discovery
flow remains useful if a background map service is unavailable.

# Consequences

* Use the approved [embedded patrimonial
  basemap](/decisions/embedded-patrimonial-basemap.md) rather than an external
  map-tile provider for the core map experience.
* Store the church dataset and photographs as versioned project assets.
* Add mobile browser tests for map search, marker selection, pan and zoom.
* Do not introduce React or MapLibre unless a later requirement warrants their
  additional capabilities.
