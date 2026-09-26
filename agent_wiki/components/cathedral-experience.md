---
type: Component
title: Cathedral experience
description: « La cathédrale Saint-Joseph de Nouméa » — eight illustrated steps, one activity each, and a final quiz.
tags: [experience, cathedral, quiz]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T21:30:00Z }
resource: /pages/cathedrale_de_noumea/
---

# Content contract

| CSV (in `data/cathedrale_de_noumea/`) | Columns used |
|---|---|
| `presentation_…_8_diapos.csv` | Diapositive, Titre, Contenu principal, Repère pédagogique / activité (steps 1, 2, 6, 8 only), Liens / sites web sources (→ Informations) |
| `interactions_cours_….csv` | Diapositive, Accroche (activity question), Réponse ou révélation, Durée indicative (sum → announced duration) |
| `quiz_….csv` | Sujet de la question, Proposition 1–3, Proposition correcte, Explication |

A Repère value written as `Label : text` becomes a box titled « Label ».
Repère values of steps 3, 4, 5 and 7 are teacher instructions and stay hidden.

# Activities

`activities.js`, configured per step in `content.js`:

| Step | Type | Behaviour |
|---|---|---|
| 1 | mystery | Tower silhouette (zoom + negative filter), reveal the façade. |
| 2 | choice | Three answers, immediate feedback. |
| 3 | plan | Light up nave, transept and choir on an SVG plan to find the Latin cross. |
| 4 | match | Name each saint from a symbol clue on its stained glass. |
| 5 | reveal | Think, then reveal the story (façade niche zoom). |
| 6 | explore | Touch pulpit, stalls, confessional to learn their wood. |
| 7 | organ | Synthesised organ chord (`organ-sound.js`, Web Audio) and pipe estimate. |
| 8 | mission | Pick three elements to protect. |

# Layout

Phone: title, image, text, activity stacked. Tablet: paired images side by
side. Computer: sticky image on one side, text and activity on the other,
alternating sides. A numbered step bar under the header tracks the step on
screen.

# Known gaps

[Cathedral image gaps](/issues/cathedral-image-gaps.md) and
[image rights](/issues/image-rights-unconfirmed.md).
