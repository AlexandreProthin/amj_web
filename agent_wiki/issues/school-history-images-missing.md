---
type: Issue
title: School history page has no photographs
description: The school history experience relies on drawn pictograms because no image of the school, people or places is available.
tags: [school-history, images, content]
status: stable
generated: { by: claude-code/claude-opus-5-5, at: 2026-09-26T23:30:00Z }
resource: /data/histoire_ecole_amj/
---

# What is missing

Useful additions, each with a known author and licence:

* the school today (façade, playground) and, if they exist, in the 1960s–1970s;
* the Bon-Pasteur church or chapel (1926 or 1948);
* portraits: père Bichon, Marie-Chanel Ukajo, Thérèse Pham (with consent);
* the « Bichonnette », père Bichon's car;
* a portrait of Anne-Marie Javouhey (public-domain engravings exist).

The research notes point to the Archives de Nouvelle-Calédonie, the archbishopric
and the Musée de la Ville (Vautrin collection) as likely holders.

# Fix

Add images under `data/histoire_ecole_amj/assets/`, then map them in
`pages/histoire_ecole_amj/content.js` and list their credits.
