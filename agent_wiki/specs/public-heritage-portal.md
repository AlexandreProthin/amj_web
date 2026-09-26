---
type: Spec
title: Portail public du patrimoine catholique calédonien
description: Exigences de la première publication publique des trois expériences patrimoniales existantes.
tags: [public-site, heritage, mobile, github-pages, qr-code]
status: draft
generated: { by: codex/gpt-5, at: 2026-09-15T16:35:00Z }
verified:
  - by: human:alex
    at: 2026-09-26T21:23:15Z
---

# Objet

Publier trois expériences françaises sous l'identité « Patrimoine catholique de
la Nouvelle-Calédonie ». Chaque expérience est atteinte directement par son
propre QR code.

# Audience et périmètre

Le public principal est le grand public. Le langage et les interactions doivent
rester accessibles aux élèves.

La première version publie exactement les trois contenus préparés dans
`data/` (sources) et `draft/` (maquettes de référence), chacun comme
destination autonome :

1. l'histoire de l'école Anne-Marie Javouhey ;
2. la carte des églises catholiques de Nouvelle-Calédonie ;
3. la découverte de la cathédrale Saint-Joseph de Nouméa.

Une page d'accueil commune n'est pas requise. La frise
`html/frise_nc_eu_amj` reste hors périmètre.

# Expérience visiteur

Le parcours cible est : scanner le QR code et atteindre directement le contenu
associé.

Le site est optimisé en priorité pour les téléphones : interface tactile,
contenu lisible et aucune navigation horizontale. Il reste utilisable sur
tablette et ordinateur. L'ordre de priorité est : téléphone, tablette,
ordinateur (écran 16:9). La mise en page adaptée à l'appareil s'applique
automatiquement ([choix technique](/decisions/css-breakpoints-for-device-layouts.md)).

## Présentation du contenu

* Le texte reste compréhensible par un enfant d'environ 10 ans.
* Les consignes destinées aux enseignants ne sont pas affichées.
* Les niveaux de fiabilité et les sources apparaissent uniquement dans
  « Informations », jamais dans le récit principal.
* Toutes les informations disponibles sont publiées, y compris celles qui ne
  sont pas encore revérifiées.
* Les contenus restent modifiables dans les fichiers de `data/`
  ([choix technique](/decisions/owner-csv-as-content-source.md)).

## Carte des églises

La carte doit permettre deux usages de premier rang sur téléphone :

* rechercher une église par son nom ;
* explorer librement les points sur la carte.

Les filtres ou contrôles additionnels ne doivent pas nuire à ces usages.
La carte fait l'objet d'une phase dédiée de conception, de stabilisation et de
tests afin d'éviter les régressions et les problèmes d'interaction mobile.

# Information, attribution et identité

Le site ne contient ni compte, ni formulaire, ni collecte de données, ni
statistiques de visite. Un bouton « Informations » donne accès aux auteurs du
site, aux fournisseurs de données, aux sources et aux crédits.

Les crédits sont une exigence de fin de projet avant la diffusion publique. Une
identité visuelle sera fournie ultérieurement ; la structure doit donc pouvoir
l'accueillir sans refonte.

# Maintenance

Après la publication, le propriétaire du projet et l'agent maintiennent le
site depuis le dépôt GitHub. Le propriétaire transmet les changements demandés
à l'agent, qui prépare les mises à jour. Les contenus, données et images
doivent donc être séparés du code d'interface et organisés de manière lisible,
afin de rendre les corrections et mises à jour sûres.

# Publication et QR code

Le site est hébergé publiquement avec GitHub Pages depuis un dépôt GitHub
public, à son adresse standard `github.io`. Le propriétaire décide seul de la
mise en ligne, après implémentation et tests complets ; d'ici là, le site est
testé localement. Le nom du compte et le nom du dépôt
restent à fournir avant le déploiement.

Après validation du site à son adresse définitive, les livrables QR sont, dans
cet ordre :

1. trois QR codes bruts prêts à imprimer, un par expérience ;
2. des supports mis en page proprement, fondés sur les QR codes validés : une
   affiche A4 et un format compact pour cartel pour chaque expérience.

# Dépendances à fournir

* compte GitHub et nom du dépôt ;
* identité visuelle ;
* informations d'attribution et crédits définitifs.

# Critères d'acceptation

* Chaque QR code résout vers son contenu publié sur un téléphone.
* Les trois contenus et la carte fonctionnent sans défilement horizontal sur
  un téléphone.
* La recherche par nom et l'exploration tactile de la carte fonctionnent sur
  téléphone.
* Le bouton « Informations » expose les attributions et crédits validés avant
  la diffusion.
