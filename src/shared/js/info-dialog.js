import site from '@data/site/site.json';
import { h } from './dom.js';

const TODO = 'à compléter';

/**
 * The « Informations » panel: authors, sources, image credits and privacy.
 * Every element carrying `data-open-info` opens it.
 *
 * @param {object} page
 * @param {string} page.title                 Experience title.
 * @param {(string|{url?: string, text?: string})[]} page.sources
 *   URLs or free-text references; duplicates are removed.
 * @param {{ subject: string, author?: string, licence?: string, url?: string }[]} [page.credits]
 *   One entry per image; a missing author or licence shows « à compléter ».
 *   An empty list states that the page has no photograph.
 * @param {Node[]} [page.extra]               Extra sections appended at the end.
 */
export function setupInfoDialog({ title, sources = [], credits = [], extra = [] }) {
  const close = h('button', { type: 'button', class: 'button button--quiet', onClick: () => dialog.close() }, 'Fermer');
  const dialog = h(
    'dialog',
    { class: 'info-dialog', 'aria-labelledby': 'info-title' },
    h('div', { class: 'info-dialog__head' }, h('h2', { id: 'info-title' }, 'Informations'), close),
    h(
      'div',
      { class: 'info-dialog__body' },
      h('h3', {}, 'À propos'),
      h('p', {}, `« ${title} » fait partie du site ${site.nom}.`),
      h('p', {}, 'Auteurs : ', site.auteurs.length ? site.auteurs.join(', ') : todo()),
      h('h3', {}, 'Sources'),
      sourceList(sources),
      h('h3', {}, 'Crédits des images'),
      creditList(credits),
      extra,
      h('h3', {}, 'Vie privée'),
      h('p', {}, site.vie_privee),
      h('p', {}, h('small', {}, site.technique)),
    ),
  );

  // Close when tapping the dimmed backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.body.append(dialog);
  for (const button of document.querySelectorAll('[data-open-info]')) {
    button.addEventListener('click', () => dialog.showModal());
  }
  return dialog;
}

function todo() {
  return h('span', { class: 'todo' }, TODO);
}

function sourceList(sources) {
  const seen = new Set();
  const items = [];
  for (const source of sources.flatMap(splitSources)) {
    const key = source.url ?? source.text;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    items.push(source);
  }
  if (!items.length) return h('p', {}, todo());
  return h(
    'ul',
    {},
    items.map((source) =>
      h(
        'li',
        {},
        source.url
          ? h('a', { href: source.url, target: '_blank', rel: 'noopener' }, readableUrl(source.url))
          : source.text,
      ),
    ),
  );
}

/** Accepts a URL, free text, or a CSV cell holding several URLs. */
function splitSources(source) {
  if (typeof source !== 'string') return [source];
  const urls = source.match(/https?:\/\/[^\s|;,]+/g);
  if (urls) return urls.map((url) => ({ url }));
  return source.trim() ? [{ text: source.trim() }] : [];
}

function readableUrl(url) {
  try {
    const { hostname, pathname } = new URL(url);
    const path = decodeURIComponent(pathname).replace(/\/$/, '');
    return hostname.replace(/^www\./, '') + (path ? ` — ${path.split('/').pop().replace(/[_-]/g, ' ')}` : '');
  } catch {
    return url;
  }
}

function creditList(credits) {
  if (!credits.length) return h('p', {}, 'Cette page ne contient pas de photographie. Les dessins sont réalisés pour le site.');
  return h(
    'ul',
    {},
    credits.map(({ subject, author, licence, url }) =>
      h(
        'li',
        {},
        h('strong', {}, subject),
        ' — ',
        author ?? todo(),
        ', ',
        licence ?? todo(),
        url ? [' (', h('a', { href: url, target: '_blank', rel: 'noopener' }, 'source'), ')'] : null,
      ),
    ),
  );
}
