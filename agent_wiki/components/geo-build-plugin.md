---
type: Component
title: GeoJSON build plugin
description: Vite plugin that lightens GeoJSON imported with `?geo` by rounding and simplifying coordinates at build time.
tags: [build, geojson, map, performance]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-27T01:30:00Z }
resource: /src/build/geo-plugin.js
---

# Contract

`import('@data/<folder>/<file>.json?geo')` or `.geojson?geo` yields the same
structure with:

* coordinates rounded to 4 decimals (≈ 11 m);
* lines and rings simplified with Douglas–Peucker, tolerance 0.0004° (≈ 40 m);
* rings collapsing below 4 points and lines below 2 points removed;
* feature properties dropped except `name`.

Accepts a FeatureCollection, or an object whose values are
FeatureCollections (other values kept as they are). Source files are never
modified. On `terrain_nc.json` the gain is modest (1.8 MB → 1.25 MB) because
the forest and river layers are already coarse.
