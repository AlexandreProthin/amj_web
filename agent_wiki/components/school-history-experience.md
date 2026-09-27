---
type: Component
title: School history experience
description: « L'histoire de l'école Anne-Marie Javouhey » — story chapters, ordering game, full timeline, people and quiz.
tags: [experience, school-history, timeline, quiz]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-27T12:00:00Z }
verified:
  - by: human:alex
    at: 2026-09-26T21:38:06Z
resource: /pages/histoire_ecole_amj/
---

# Content contract

| CSV (in `data/histoire_ecole_amj/`) | Use |
|---|---|
| `01_chronologie_….csv` | Every row in the timeline: date, evenement, notes (« Une précision »). lien_source, type_source, niveau_confiance only in « Informations ». |
| `02_informations_….csv` | categorie `personnes` → people cards; `methodologie`, `piste_recherche` and all other categories → « Informations »; `transcription_integrale` never shown. |
| `03_quiz_….csv` | question, proposition_1–3, reponse_correcte, explication. |
| `04_recit_ecole.csv` | Story chapters for children: periode, titre, texte, icone. |

`04_recit_ecole.csv` was written by the agent on 2026-09-26 from facts in 01 and
02 only, in simple language, because the research notes are not written for a
young audience (some rows are editing instructions). The owner may edit it
like any other CSV.

On 2026-09-27 the owner supplied a handwritten list of directors (1967 to
today), transcribed and checked by the owner. It is cited as « Liste manuscrite
des directions de l'école » in 01 and 02, and summarised in the chapter
« Les directrices de l'école ». Its dates win over earlier press estimates;
the press figure of 26 years for Marie-Chanel Ukajo is kept as a note.
The owner asked to remove the « Un mystère à résoudre » boxes and the
`mystere` column.

# Sections

| Section | Behaviour |
|---|---|
| Récit | Chapters on a path with pictograms (`icons.js`, keys from the `icone` column). |
| Jeu | `order-game.js`: tap five key events from oldest to newest; dates and labels set in `content.js`. |
| Frise | Events grouped in three periods (`periods` in `content.js`), filter chips, key dates highlighted; dates made readable by `dates.js`. |
| Personnes | One card per `personnes` row, key people first (`PEOPLE_ORDER`). |
| Quiz | Shared quiz component. |

# Layout

Phone: single column, path on the left. Tablet: wider cards, people in two
columns. Computer: story path down the middle with chapters alternating, the
three timeline periods side by side, people in three columns.

# Known gaps

No photographs at all; see [school history images](/issues/school-history-images-missing.md).
