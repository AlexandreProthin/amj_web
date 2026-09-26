---
type: Decision
title: Page source in pages/, generated site in dist/
description: pages/ holds one source folder per experience; the build writes the publishable site to dist/, which is not versioned.
tags: [structure, build, github-pages]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
verified:
  - by: human:alex
    at: 2026-09-26T21:28:18Z
---

# Context

The owner created `pages/` as "the pages hosted on GitHub" and let the agent
choose the layout, provided it is documented and follows good practice.

# Options

| Option | Assessment |
|---|---|
| Commit built files into `pages/` | Mixes generated and hand-written files; every build creates large diffs. |
| `pages/` as page source, build to `dist/` | Readable source per experience; output regenerated on demand and deployed by a GitHub Actions workflow. |

# Decision

`pages/<experience>/` holds each experience's source and is the Vite root.
The build writes `dist/`, ignored by git. Publication will use GitHub Actions
to build and deploy `dist/` once the remote exists and the owner decides to go
live ([foundation plan](/plans/github-pages-foundation.md)).

# Consequences

* Public URLs follow folder names: `/<repo>/cathedrale_de_noumea/`, etc. Renaming a
  folder after the QR codes are printed would break them.
* A plain `pages/index.html` lists the experiences for local testing and for
  visitors who trim the URL; it is not a QR destination.
