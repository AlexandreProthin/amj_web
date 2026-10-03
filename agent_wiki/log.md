# Wiki Update Log

## 2026-10-03

* Recorded [information panel presentation](/decisions/information-panel-presentation.md) after public review: simplify research wording, author/contact presentation and image credits; republish.

* Recorded [public release approval](/decisions/public-release-approval.md): owner confirms image permissions and requests only attribution/source corrections before publication at the existing QR destinations.


## 2026-09-27

* **School history**: directors 1967 → today added from the owner's handwritten
  list, and the « Un mystère à résoudre » boxes removed — see the
  [school history experience](/components/school-history-experience.md).

* **Root page**: the site root now shows the QR-code welcome sheet
  ([decision](/decisions/root-page-is-qr-sheet.md)); deployed by merging `develop` into `master`.

* **Workflow**: development moves to `develop`; merge into `master` to deploy
  ([publishing](/references/publishing.md)).
* **Print**: first A4 welcome sheet with the three QR codes — progress in the
  [QR and print plan](/plans/qr-and-print-supports.md). Then: phone icons on
  the three steps, and the sheet now scales to any paper so Ctrl+P gives one page.

* **Publishing**: the site now deploys to GitHub Pages on every push to `master`,
  with a `SITE_ONLINE` offline switch — [publishing reference](/references/publishing.md),
  [decision](/decisions/offline-switch-repo-variable.md); steps 1 and 4 of the
  [foundation plan](/plans/github-pages-foundation.md) done.

* **Church map**: added the [church map experience](/components/church-map-experience.md)
  (Leaflet, local basemap, clustered pins, search, list fallback, deep links) and the
  [GeoJSON build plugin](/components/geo-build-plugin.md).
* **Issues**: [church data pipeline outdated](/issues/church-data-pipeline-outdated.md);
  map photo licences added to [image rights](/issues/image-rights-unconfirmed.md).
* **Plans**: progress on the [map](/plans/interactive-church-map.md),
  [experiences](/plans/independent-experiences.md) and [quality](/plans/quality-and-public-release.md) plans.
* **Tests**: map checks added to the [automated tests](/references/automated-tests.md).

## 2026-09-26

* **School history**: added the [school history experience](/components/school-history-experience.md),
  a new agent-written `04_recit_ecole.csv` for the story chapters, and the issue
  [no photographs](/issues/school-history-images-missing.md).
* **Testing**: added [automated browser tests](/references/automated-tests.md)
  (Playwright, phone/tablet/desktop); progress noted in the [quality plan](/plans/quality-and-public-release.md).
* **Shared UI**: scroll-spy, in-page nav, chips and sections moved into the
  [shared interface](/components/shared-ui.md).

* **Owner answers**: labels and sources only under « Informations »; publish
  everything; agent chooses a documented folder layout; always version
  control, owner decides when to go live; `html/frise_nc_eu_amj` out of scope;
  layouts must apply automatically per device. Recorded in the
  [spec](/specs/public-heritage-portal.md) and the
  [content decision](/decisions/owner-csv-as-content-source.md).
* **Maintenance**: replaced `draft_data/` references with `data/` and `draft/`
  after the owner's reorganization.
* **Architecture**: added [static site structure](/architecture/static-site-structure.md).
* **Decisions**: [owner CSV as content source](/decisions/owner-csv-as-content-source.md),
  [pages/ source and dist/ output](/decisions/pages-source-dist-output.md),
  [CSS breakpoints for device layouts](/decisions/css-breakpoints-for-device-layouts.md).
* **Components**: [shared interface](/components/shared-ui.md),
  [CSV plugin](/components/csv-build-plugin.md),
  [cathedral experience](/components/cathedral-experience.md).
* **Issues**: [cathedral image gaps](/issues/cathedral-image-gaps.md),
  [image rights not confirmed](/issues/image-rights-unconfirmed.md).
* **Plans**: progress on [foundation](/plans/github-pages-foundation.md) and
  [independent experiences](/plans/independent-experiences.md).
* **Reference**: [local development server](/references/local-dev-server.md).

## 2026-09-15

* **Implementation plan**: Expanded the approved [public heritage publishing
  roadmap](/plans/github-pages-static-site.md) into six linked, reviewable
  branches: foundation, content, map, identity, release and printed QR supports.
* **Maintenance**: Added the owner-and-agent maintenance model to the [public heritage portal requirements](/specs/public-heritage-portal.md), with owner-requested and agent-prepared updates plus readable separation of content, data, images and interface code.
* **Print requirement**: Recorded A4 and compact cartel versions for each QR-code support in the [public heritage portal requirements](/specs/public-heritage-portal.md).
* **Decision**: Chose an [embedded patrimonial
  basemap](/decisions/embedded-patrimonial-basemap.md), avoiding external road-map dependencies for the core experience.
* **Decision**: Selected [Leaflet for the interactive map](/decisions/leaflet-for-interactive-map.md), retaining a lightweight static site and a search/list fallback.
* **Scope change**: Replaced the shared home page and one QR code with three
  independent QR-code destinations in the [public heritage portal
  requirements](/specs/public-heritage-portal.md).
* **Specification**: Added the [public heritage portal
  requirements](/specs/public-heritage-portal.md) and updated the
  [GitHub Pages delivery target](/plans/github-pages-static-site.md) with the
  confirmed scope and remaining dependencies.
* **Initialization**: Created the bundle as an Open Knowledge Format v0.2 tree —
  `architecture/`, `components/`, `specs/`, `decisions/`, `plans/`, `issues/`,
  `computations/`, `references/` — each with an `index.md`, plus this log.
* **Creation**: Wrote the [maintenance protocol](/references/wiki-protocol.md),
  which defines roles, where concepts go, naming, linking, and lifecycle.
* **Creation**: Wrote [the OKF reference](/references/okf-spec.md) recording
  which parts of the spec this wiki leans on, and noting that the canonical
  spec has moved to its own repository.
* **Creation**: Added [okf.py](/references/tools/okf-tool.md), the validator and
  offline visualizer, adapted from Google's Apache-2.0 reference agent.
* **Creation**: Added the [wiki conformance
  computation](/computations/wiki-conformance.md) with its
  [executor](/references/skills/run-command.md) and
  [attester](/references/attesters/index.md), so "the wiki is valid" is a
  checkable claim rather than an assertion.
* **Planning**: Added the [GitHub-hosted static web
  page](/plans/github-pages-static-site.md) plan, recording the confirmed
  hosting and QR-code constraints and the decisions still needed.
