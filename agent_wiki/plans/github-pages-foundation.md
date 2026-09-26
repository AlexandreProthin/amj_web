---
type: Plan
title: Foundation and GitHub Pages publishing
description: Create the lightweight static project, organize assets and automate publication.
tags: [foundation, github-pages, vite, deployment]
status: draft
generated: { by: codex/gpt-5, at: 2026-09-15T17:05:00Z }
verified:
  - by: human:alex
    at: 2026-09-26T21:23:09Z
---

# Outcome

A public GitHub repository builds and deploys a static site to GitHub Pages on
each approved update.

# Work

1. Obtain the GitHub account and repository name. *Pending: the owner will
   create the remote.*
2. ~~Initialize Vite with modular JavaScript and native CSS; do not add React.~~
   Done 2026-09-26 — see [site structure](/architecture/static-site-structure.md).
3. ~~Create separate directories for pages, UI modules, data and images;
   leave `draft/` unchanged as reference material.~~ Done; the tests directory
   comes with the [quality plan](/plans/quality-and-public-release.md).
4. Configure GitHub Pages-safe asset paths (done: relative `base`) and a GitHub
   Actions build/deploy workflow (pending the remote; the owner decides when
   to go live).
5. ~~Add a concise guide for owner-requested and agent-prepared maintenance.~~
   Done: `README.md` and the [local server reference](/references/local-dev-server.md).

# Checks

* A clean checkout installs, builds and previews.
* Deployment produces the expected public site.
* No published asset relies on a local path.

# Enables

[Independent experiences](/plans/independent-experiences.md) and [interactive
church map](/plans/interactive-church-map.md).
