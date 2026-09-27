# Patrimoine catholique de la Nouvelle-Calédonie

Three independent, mobile-first web experiences, each reached directly by its
own QR code:

| Experience | Local URL (dev) | Status |
|---|---|---|
| La cathédrale Saint-Joseph de Nouméa | `/cathedrale_de_noumea/` | first version |
| L'histoire de l'école Anne-Marie Javouhey | `/histoire_ecole_amj/` | first version |
| Les églises de Nouvelle-Calédonie (carte) | `/eglises_nc/` | first version |

Project memory (requirements, decisions, plans, known issues) lives in
[`agent_wiki/`](agent_wiki/index.md).

## Run it locally

Requires Node.js 20 or newer.

```bash
python ../tools/serve_amj_web.py
```

This installs dependencies the first time, then serves the site with live
reload. The terminal prints a network URL and a QR code: scan it with a phone
or tablet on the same Wi-Fi to test on a real device. Add `--preview` to test
the optimized production build instead.

Equivalent npm scripts: `npm run dev`, `npm run dev:lan`, `npm run build`,
`npm run preview:lan`.

## Test it

```bash
npm test
```

Builds the site and checks every experience on phone, tablet and desktop
sizes with Playwright (first time on a machine: `npx playwright install chromium`).

## Publish it

Every push to `master` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`): https://alexandreprothin.github.io/amj_web/

To take the site down, publish the maintenance page (`maintenance/`) instead:

```bash
gh variable set SITE_ONLINE --body false
gh workflow run deploy.yml
```

Run the same with `--body true` to bring the site back.

Day-to-day work happens on `develop`; merge into `master` to publish.

## Print

`npm run print` builds `print/qr_codes.html`, an A4 welcome sheet with the
three QR codes (edit `print/qr_codes.template.html`). The same sheet is the
site's root page. Open it in a browser and
print at A4, no margins, 100 % scale.

## Folder layout

```
amj_web/
├── data/                 Source content — edit here (CSV, JSON, images)
│   ├── site/site.json    Site-wide information (name, authors, privacy text)
│   └── <experience>/     One folder per experience
├── pages/                Page source — one folder per experience
│   ├── index.html        Root page: replaced by the QR-code sheet (print/)
│   └── <experience>/
│       ├── index.html    Page shell
│       ├── main.js       Entry point: renders the page from content.js
│       ├── content.js    Which image goes where, activity settings
│       └── *.css / *.js  Page-specific styles and behaviour
├── src/
│   ├── shared/styles/    tokens.css (visual identity), base.css, components.css
│   ├── shared/js/        Shared components: quiz, choices, « Informations », images
│   └── build/            Build plugins (CSV → data, GeoJSON lightening)
├── tests/                Playwright checks and screenshot helper
├── draft/                Original standalone drafts — reference only
├── agent_wiki/           Project knowledge base (OKF)
└── dist/                 Build output (generated, not versioned)
```

## How content flows

- **Texts** are read from the CSV files in `data/` when the site is built.
  Correcting a CSV and rebuilding updates the page; no code change needed.
- **Images** are imported from `data/<experience>/assets/`. The build
  resizes them and produces WebP + JPEG versions automatically.
- **Page configuration** (`pages/<experience>/content.js`) only decides which
  image goes with which part and how each activity behaves.
- **Sources and reliability labels** are shown only in the « Informations »
  panel, never in the main story.

## Screen sizes

Layouts adapt automatically to the screen the page is opened on — phone
first, then tablet (from 768 px wide) and computer (from 1024 px). This relies
on CSS media queries, so rotating a tablet or resizing a window switches
layout instantly, with no device detection.

## Visual identity

The official identity is not supplied yet. All colours, fonts and spacing live
in [`src/shared/styles/tokens.css`](src/shared/styles/tokens.css); replacing
those values re-themes every page.
