---
type: Reference
title: Publishing to GitHub Pages
description: How the site is deployed on each push to master, and how to take it offline and back.
tags: [github-pages, deployment, runbook]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-27T12:00:00Z }
resource: /.github/workflows/deploy.yml
---

# Where

* Repository: https://github.com/AlexandreProthin/amj_web (public)
* Site: https://alexandreprothin.github.io/amj_web/
* Pages source: **GitHub Actions** (enabled 2026-09-27).

# Branches

Work happens on `develop`; merging into `master` is what publishes. Pushing
`develop` never deploys.

# How it deploys

`.github/workflows/deploy.yml` runs on every push to `master` and on manual
dispatch: `npm ci`, `npm run build`, then uploads `dist/` and deploys it with
`actions/deploy-pages`. Runs share one concurrency group; a newer run cancels
an older one. Node 22.

# Take it offline / back online

The switch is the repository variable `SITE_ONLINE` ([why](/decisions/offline-switch-repo-variable.md)):

```bash
gh variable set SITE_ONLINE --body false   # or true
gh workflow run deploy.yml
```

Same from the web: Settings → Secrets and variables → Actions → Variables,
then Actions → "Deploy to GitHub Pages" → Run workflow. When `false`, the
workflow publishes `maintenance/` instead of the build.

# Verified

2026-09-27: first deploy succeeded (HTTP 200); switching off served the
maintenance page and switching back restored the site.
