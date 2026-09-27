---
type: Decision
title: Take the site offline with a repository variable
description: SITE_ONLINE=false makes the deploy workflow publish a maintenance page instead of the site, leaving master untouched.
tags: [github-pages, deployment, maintenance]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-27T12:00:00Z }
resource: /.github/workflows/deploy.yml
---

# Context

The owner wants the site to update on every push to `master`, and a quick way
to take it down and bring it back. Their first idea was an `offline` branch,
then re-setting `master` to restore the site.

# Options

| Option | Assessment |
|---|---|
| Switch to an `offline` branch, re-set `master` to restore | The site must be built (`dist/` is not versioned, see [pages/dist decision](/decisions/pages-source-dist-output.md)), so a branch cannot be served directly; rewriting `master` risks losing history. |
| "Unpublish site" in Settings → Pages | Visitors get a GitHub 404; re-enabling needs Pages to be configured again, and pushes fail meanwhile. |
| Repository variable `SITE_ONLINE` read by the deploy workflow | One setting; `master` untouched; QR-code visitors see an explanation instead of a 404. |

# Decision

The workflow builds and deploys `dist/` unless `SITE_ONLINE` is `false`; then
it publishes `maintenance/` (a French "site temporairement indisponible" page,
also served as `404.html`). Changing the variable takes effect on the next run,
started by hand or by a push. Commands are in the [publishing
reference](/references/publishing.md).

# Consequences

* While offline, pushes to `master` keep publishing the maintenance page.
* Switching takes about a minute (one workflow run), plus CDN caching.
* An unset variable counts as online.
