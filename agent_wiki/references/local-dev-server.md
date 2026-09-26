---
type: Reference
title: Local development server
description: How to serve the site locally and test it on real phones and tablets over Wi-Fi.
tags: [tooling, dev, testing]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
resource: /../tools/serve_amj_web.py
---

# Commands

| Command (from `amj_web/`) | Effect |
|---|---|
| `python ../tools/serve_amj_web.py` | Installs dependencies if needed, serves with live reload on the local network. |
| `python ../tools/serve_amj_web.py --preview` | Builds, then serves the production output. |
| `--local-only` | Serves on this computer only. |
| `npm run build` | Writes the site to `dist/`. |

The terminal prints a network URL and a QR code (`vite-plugin-qrcode`) to
open the site on a device on the same Wi-Fi. If the device cannot connect,
allow Node.js through the Windows firewall on private networks.

Part of the [site structure](/architecture/static-site-structure.md).
