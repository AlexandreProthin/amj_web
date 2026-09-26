import '@shared/styles/base.css';
import '@shared/styles/components.css';
import './eglises.css';

// Named import: only the small `sources` object is bundled here.
import { sources as terrainSources } from '@data/eglises_nc/terrain_nc.json';
import { h } from '@shared/js/dom.js';
import { setupInfoDialog } from '@shared/js/info-dialog.js';
import { picture } from '@shared/js/picture.js';
import { churches, credits, LINKS, TERRAIN_LEGEND, TYPES } from './content.js';
import { search } from './search.js';

const TITLE = 'Les églises de Nouvelle-Calédonie';
const explorer = document.querySelector('#explorer');
const input = document.querySelector('#recherche');
const clearButton = document.querySelector('#clear-search');
const results = document.querySelector('#results');
const count = document.querySelector('#count');
const detail = document.querySelector('#detail');
const legend = document.querySelector('#legend');
const legendToggle = document.querySelector('#legend-toggle');
const wide = window.matchMedia('(min-width: 48rem)');
const byId = new Map(churches.map((church) => [church.id, church]));

const state = { query: '', types: new Set(Object.keys(TYPES)), selected: null };
let mapApi = null;

/* ---------- Results list ---------- */

function visibleChurches() {
  return churches.filter((church) => state.types.has(church.type));
}

function resultButton(church) {
  return h(
    'button',
    {
      type: 'button',
      class: `result${church.id === state.selected ? ' is-current' : ''}`,
      dataset: { id: church.id },
      onClick: () => openDetail(church.id, { from: 'list' }),
    },
    h('span', { class: `dot dot--${slug(church.type)}${church.approximate ? ' dot--approx' : ''}`, 'aria-hidden': 'true' }),
    h('span', { class: 'result__text' }, h('span', { class: 'result__name' }, church.name), h('span', { class: 'result__meta' }, [church.commune, church.place].filter(Boolean).join(' · '))),
  );
}

function renderResults() {
  const found = search(visibleChurches(), state.query);
  explorer.dataset.hasQuery = String(Boolean(state.query.trim()));
  count.textContent = found.length
    ? `${found.length} lieu${found.length > 1 ? 'x' : ''}${state.query.trim() ? ' trouvé' + (found.length > 1 ? 's' : '') : ''}`
    : 'Aucun lieu ne correspond. Essaie un autre nom ou une commune.';

  if (state.query.trim()) {
    results.replaceChildren(h('ul', { class: 'result-list', id: 'result-list' }, found.map((church) => h('li', {}, resultButton(church)))));
  } else {
    // Without a query, the list is grouped by commune for browsing.
    const groups = new Map();
    for (const church of found) groups.set(church.commune, [...(groups.get(church.commune) ?? []), church]);
    results.replaceChildren(
      ...[...groups].map(([commune, items]) =>
        h('section', { class: 'commune' }, h('h2', { class: 'commune__name' }, commune), h('ul', { class: 'result-list' }, items.map((church) => h('li', {}, resultButton(church))))),
      ),
    );
  }
  mapApi?.setVisible(new Set(visibleChurches().map((church) => church.id)));
}

/* ---------- Detail ---------- */

function openDetail(id, { from } = {}) {
  const church = byId.get(id);
  if (!church) return;
  state.selected = id;
  history.replaceState(null, '', `#eglise-${id}`);
  for (const button of results.querySelectorAll('.result')) button.classList.toggle('is-current', Number(button.dataset.id) === id);

  const photoSlot = h('div', { class: 'detail__photo' });
  const link = LINKS[id];
  const showOnMap =
    explorer.dataset.view === 'list' && mapApi
      ? h('button', { type: 'button', class: 'button', onClick: () => { setView('map'); mapApi.select(id); } }, 'Voir sur la carte')
      : null;

  // A detached wrapper lets h() drop the empty (null) parts.
  const content = h(
    'div',
    {},
    h(
      'div',
      { class: 'detail__head' },
      h('span', { class: `badge badge--${slug(church.type)}` }, TYPES[church.type].label),
      h('button', { type: 'button', class: 'detail__close', onClick: closeDetail, 'aria-label': wide.matches ? 'Retour à la liste' : 'Fermer' }, wide.matches ? '← Liste' : '✕'),
    ),
    h('h2', { id: 'detail-title', class: 'detail__title' }, church.name),
    h('p', { class: 'detail__where' }, [church.commune, church.place].filter(Boolean).join(' · ')),
    photoSlot,
    church.date ? h('p', { class: 'detail__date' }, h('strong', {}, 'Construction ou date connue : '), church.date) : null,
    church.fact ? h('p', {}, church.fact) : null,
    church.approximate
      ? h('p', { class: 'detail__approx' }, 'Position approximative : ce lieu est placé au centre de sa commune.')
      : null,
    h(
      'div',
      { class: 'detail__actions' },
      showOnMap,
      link ? h('a', { class: 'button', href: link.href }, `${link.label} →`) : null,
      h(
        'a',
        {
          class: 'button button--ghost',
          href: `https://www.openstreetmap.org/?mlat=${church.lat}&mlon=${church.lon}#map=16/${church.lat}/${church.lon}`,
          target: '_blank',
          rel: 'noopener',
        },
        'Ouvrir dans OpenStreetMap ↗',
      ),
    ),
  );
  detail.replaceChildren(...content.childNodes);
  detail.hidden = false;
  explorer.dataset.detail = 'open';
  loadPhoto(church, photoSlot);

  if (mapApi) {
    if (from === 'map') mapApi.reveal(id);
    else if (explorer.dataset.view === 'map') mapApi.select(id);
    else mapApi.select(id, { fly: false });
  }
  if (from !== 'map') detail.focus({ preventScroll: true });
  detail.scrollTop = 0;
}

async function loadPhoto(church, slot) {
  if (!church.photo?.load) return;
  slot.classList.add('is-loading');
  try {
    const meta = await church.photo.load();
    if (state.selected !== church.id) return;
    const credit = [church.photo.author && `Photo : ${church.photo.author}`, church.photo.licence].filter(Boolean).join(', ');
    slot.classList.remove('is-loading');
    slot.replaceChildren(
      h('figure', { class: 'figure' }, picture(meta, { alt: church.name, sizes: '(min-width: 48rem) 24rem, 100vw' }), credit ? h('figcaption', {}, credit) : null),
    );
  } catch {
    slot.remove();
  }
}

function closeDetail() {
  const id = state.selected;
  state.selected = null;
  detail.hidden = true;
  explorer.dataset.detail = 'closed';
  history.replaceState(null, '', location.pathname + location.search);
  mapApi?.clearSelection();
  for (const button of results.querySelectorAll('.result.is-current')) button.classList.remove('is-current');
  const item = results.querySelector(`.result[data-id="${id}"]`);
  if (item && item.offsetParent) item.focus({ preventScroll: false });
}

/* ---------- Views, legend, search ---------- */

function setView(view) {
  explorer.dataset.view = view;
  for (const button of document.querySelectorAll('.view-switch button')) button.setAttribute('aria-pressed', String(button.dataset.view === view));
  if (view === 'map') requestAnimationFrame(() => mapApi?.refresh());
}

function renderLegend() {
  const typeToggles = Object.entries(TYPES).map(([type, { plural }]) =>
    h(
      'label',
      { class: 'legend__row' },
      h('input', {
        type: 'checkbox',
        checked: state.types.has(type),
        onChange: (event) => {
          if (event.target.checked) state.types.add(type);
          else state.types.delete(type);
          renderResults();
        },
      }),
      h('span', { class: `dot dot--${slug(type)}`, 'aria-hidden': 'true' }),
      `${plural} (${churches.filter((church) => church.type === type).length})`,
    ),
  );
  legend.replaceChildren(
    h('p', { class: 'legend__title' }, 'Afficher'),
    ...typeToggles,
    h('p', { class: 'legend__row legend__note' }, h('span', { class: 'dot dot--approx', 'aria-hidden': 'true' }), 'Position approximative'),
    h('p', { class: 'legend__title' }, 'Le fond de carte'),
    ...TERRAIN_LEGEND.map(({ label, color }) => h('p', { class: 'legend__row' }, h('span', { class: 'swatch', style: `background:${color}`, 'aria-hidden': 'true' }), label)),
  );
}

function slug(type) {
  return type === 'cathédrale' ? 'cathedrale' : type === 'chapelle' ? 'chapelle' : 'eglise';
}

input.addEventListener('input', () => {
  state.query = input.value;
  clearButton.hidden = !input.value;
  renderResults();
});
input.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  const first = results.querySelector('.result');
  if (first) {
    input.blur();
    openDetail(Number(first.dataset.id), { from: 'search' });
  }
});
clearButton.addEventListener('click', () => {
  input.value = '';
  state.query = '';
  clearButton.hidden = true;
  renderResults();
  input.focus();
});
for (const button of document.querySelectorAll('.view-switch button')) {
  button.addEventListener('click', () => setView(button.dataset.view));
}
legendToggle.addEventListener('click', () => {
  legend.hidden = !legend.hidden;
  legendToggle.setAttribute('aria-expanded', String(!legend.hidden));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !detail.hidden && !document.querySelector('dialog[open]')) closeDetail();
});

/* ---------- Start ---------- */

renderLegend();
renderResults();
setupInfoDialog({
  title: TITLE,
  sources: [...churches.flatMap((church) => church.sources), ...Object.values(terrainSources ?? {}), 'Natural Earth — contour de la Nouvelle-Calédonie (domaine public)'],
  credits,
  extra: [
    h('h3', {}, 'Positions des lieux'),
    h(
      'p',
      {},
      'Les positions ont été retrouvées automatiquement à partir des noms des lieux. ',
      `${churches.filter((church) => church.approximate).length} lieux, marqués par un rond creux, sont placés au centre de leur commune.`,
    ),
    h('p', {}, 'Le fond de carte est fourni avec le site : il ne dépend d’aucun service de cartographie en ligne. Carte réalisée avec Leaflet (licence BSD).'),
  ],
});

async function start() {
  try {
    const { createChurchMap } = await import('./map.js');
    mapApi = createChurchMap(document.querySelector('#map'), {
      churches,
      onSelect: (id, options) => openDetail(id, options),
    });
    renderResults();
  } catch (error) {
    // Without the map, the searchable list remains fully usable.
    console.error('Carte indisponible', error);
    explorer.classList.add('no-map');
    setView('list');
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
}

/** « #eglise-57 » in the address opens that church (shared links, back button). */
function openFromHash() {
  const match = location.hash.match(/^#eglise-(\d+)$/);
  if (match && Number(match[1]) !== state.selected) openDetail(Number(match[1]), { from: 'link' });
}

start();
