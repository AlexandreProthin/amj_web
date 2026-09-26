---
type: Component
title: Shared interface
description: Design tokens, base styles and reusable components used by every experience.
tags: [ui, design-system, accessibility]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
resource: /src/shared/
---

# Styles

| File | Role |
|---|---|
| `styles/tokens.css` | The visual identity: palette, fonts, sizes, spacing. Temporary until the [identity](/plans/identity-and-attribution.md) arrives. |
| `styles/base.css` | Reset, typography, bundled fonts, [breakpoints](/decisions/css-breakpoints-for-device-layouts.md), reduced motion. |
| `styles/components.css` | Header, in-page nav, sections, kicker, buttons, choices, chips, feedback, callout, figures, details, quiz, dialog, footer. |

# Scripts

| Module | Contract |
|---|---|
| `js/dom.js` | `h()` / `svg()` element builders inserting data as text only; `shuffled()`, `uid()`. |
| `js/picture.js` | `picture(meta, {alt, sizes})` builds a responsive `<picture>` from an `as=picture` image import. |
| `js/choice.js` | Single-answer question with immediate feedback and retry; locks on the right answer. |
| `js/quiz.js` | Quiz from `{question, options, answer, explanation}`; `answer` is the right option's text. Counts first-try successes. |
| `js/scroll-spy.js` | `watchSections(links)` marks the in-page link whose section is on screen with `aria-current`. |
| `js/info-dialog.js` | « Informations » dialog opened by any `[data-open-info]`: authors and privacy from `data/site/site.json`, page sources, image credits. Missing values show « à compléter ». |

# Fonts

Atkinson Hyperlegible Next (body, designed for legibility) and Fraunces
(headings), both SIL Open Font License, bundled locally.
