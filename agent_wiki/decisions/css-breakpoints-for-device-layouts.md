---
type: Decision
title: Device layouts through CSS breakpoints
description: Phone, tablet and computer layouts are selected automatically by viewport width, not by detecting the device.
tags: [responsive, mobile, css]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
---

# Context

The owner requires the phone, tablet and computer layouts to apply
automatically according to the device, with priority phone, tablet, then 16:9
computer screens.

# Options

| Option | Assessment |
|---|---|
| Detect the device (user agent) and serve a layout | Fragile, wrong for tablets in landscape or split screen, needs a server. |
| Mobile-first CSS with width breakpoints | Standard, works on static hosting, re-applies instantly on rotation or resize. |

# Decision

Styles are mobile-first. Min-width media queries switch to the tablet layout
at 48rem (768 px) and the computer layout at 64rem (1024 px). Hover effects
are secondary; every control has a touch target of at least 44 px.

# Consequences

* A tablet in landscape may receive the computer layout; this is intended,
  since it then has the space for it.
* Automated checks must cover the three widths
  ([quality plan](/plans/quality-and-public-release.md)).
