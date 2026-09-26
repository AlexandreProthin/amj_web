---
type: Component
title: Church map experience
description: « Les églises de Nouvelle-Calédonie » — Leaflet map on a local basemap with name search, clustered pins, detail sheet and a list fallback.
tags: [experience, map, leaflet, search]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-27T01:30:00Z }
resource: /pages/eglises_nc/
---

# Data contract

| File (in `data/eglises_nc/`) | Use |
|---|---|
| `eglises_data.json` | One record per place: nom, commune, localisation, date (`—` = unknown), fait, type (`église`/`chapelle`/`cathédrale`), lat, lon, precision (`précise` or `commune`), sources (→ « Informations »), photo `{path, source, credit?, licence?}`. |
| `communes_nc.geojson` | Land outline. Despite its name it is one Natural Earth country shape, not communes. |
| `terrain_nc.json` | `forest`, `water`, `rivers`, `mines` layers and their `sources` (→ « Informations »). |
| `assets/images/*.jpg` | Photos, loaded only when a place is opened; resized to 900 px WebP + JPEG. |

The JSON is derived from `eglises_catholiques_nouvelle_caledonie.csv`; see
[church data pipeline](/issues/church-data-pipeline-outdated.md). Geographic
files are lightened at build time by the [geo plugin](/components/geo-build-plugin.md).

# Behaviour

| Need (from the [spec](/specs/public-heritage-portal.md)) | How |
|---|---|
| Search a church by name | Search box always on top; accent-insensitive, every word must match name, commune or place; names starting with the query first; Enter opens the first result. |
| Explore points by touch | Leaflet pan/zoom; pins have a 36 px touch area; overlapping pins cluster (tap to zoom in, no clustering from zoom 13). |
| Details | Phone: bottom sheet over the map, the selected pin kept above it. Tablet/computer: the detail replaces the list in the side panel. |
| List fallback | Phone « Carte / Liste » switch; list grouped by commune. If the map code fails to load, the page switches to the list automatically. |
| Filters | Type checkboxes inside « Légende », so they never get in the way of search. |
| Shared links | `#eglise-<id>` opens a place, on load and on hash change. |
| Approximate positions | Hollow pins and a note in the detail for `precision: commune`. |

`LINKS` in `content.js` adds a link from the cathedral's detail to the
[cathedral experience](/components/cathedral-experience.md).

# Structure

`content.js` (data mapping, colours, bounds, photo loaders), `search.js`,
`map.js` (Leaflet, basemap, clusters; loaded as its own chunk),
`leaflet-global.js` (exposes `L` for `leaflet.markercluster`), `main.js`
(panel, detail, legend, views), `eglises.css`.

Weights (production, gzip): page + data ≈ 17 KB, map code ≈ 54 KB, land
6 KB, terrain ≈ 226 KB loaded last.

# Tests

`tests/map.spec.js` — search, Enter, pin tap, cluster zoom, deep link with
photo, legend filter, phone list round trip, list fallback with the map
blocked. See [automated tests](/references/automated-tests.md).
