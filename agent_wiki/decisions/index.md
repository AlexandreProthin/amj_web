# Decisions

Choices that were made and the reasoning that produced them, ADR-style: the
context, the options considered, what was chosen, and what it costs. This is
the directory that pays for the whole wiki — code shows what was decided, never
why, and the why is what gets re-litigated six months later.

Use `type: Decision`. A decision is **never rewritten**: when it stops holding,
mark it `status: deprecated` and have the replacement link back to it.

* [Use Leaflet for the interactive map](leaflet-for-interactive-map.md) — keeps
  the site static while replacing bespoke map interaction code with a focused
  mobile-ready library.
* [Embed a simple patrimonial basemap](embedded-patrimonial-basemap.md) — keeps
  the map independent from external road-tile services.
