---
type: Plan
title: Foundation and GitHub Pages publishing
description: Create the lightweight static project, organize assets and automate publication.
tags: [foundation, github-pages, vite, deployment]
status: draft
generated: { by: codex/gpt-5, at: 2026-09-15T17:05:00Z }
verified:
  - by: human:alex
    at: 2026-09-15T20:46:07Z
---

# Outcome

A public GitHub repository builds and deploys a static site to GitHub Pages on
each approved update.

# Work

1. Obtain the GitHub account and repository name.
2. Initialize Vite with modular JavaScript and native CSS; do not add React.
3. Create separate directories for pages, UI modules, data, images, geographic
   assets and tests; leave `draft_data/` unchanged as reference material.
4. Configure GitHub Pages-safe asset paths and a GitHub Actions build/deploy
   workflow.
5. Add a concise guide for owner-requested and agent-prepared maintenance.

# Checks

* A clean checkout installs, builds and previews.
* Deployment produces the expected public site.
* No published asset relies on a local path.

# Enables

[Independent experiences](/plans/independent-experiences.md) and [interactive
church map](/plans/interactive-church-map.md).
