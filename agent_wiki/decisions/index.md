# Decisions

* [Information panel presentation](information-panel-presentation.md) — plain author, separate email contact and simplified image credits.

* [Public release approval](public-release-approval.md) — current content and images approved; attribution cleanup only, stable URLs and QR codes.

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
* [Owner CSV files are the content source](owner-csv-as-content-source.md) —
  text read at build time; labels and sources only in « Informations ».
* [Page source in pages/, generated site in dist/](pages-source-dist-output.md)
* [Device layouts through CSS breakpoints](css-breakpoints-for-device-layouts.md)
* [Take the site offline with a repository variable](offline-switch-repo-variable.md) —
  `SITE_ONLINE=false` publishes a maintenance page; `master` stays untouched.
* [The root page is the printable QR-code sheet](root-page-is-qr-sheet.md)
