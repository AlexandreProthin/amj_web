import '@shared/styles/base.css';
import '@shared/styles/components.css';
import './histoire.css';

import { h } from '@shared/js/dom.js';
import { setupInfoDialog } from '@shared/js/info-dialog.js';
import { picture } from '@shared/js/picture.js';
import { createQuiz } from '@shared/js/quiz.js';
import { watchSections } from '@shared/js/scroll-spy.js';
import { chapters, credits, events, orderGame, people, periods, quiz, researchLeads, researchNotes, sources } from './content.js';
import { icon } from './icons.js';
import { createOrderGame } from './order-game.js';

const TITLE = 'L’histoire de l’école Anne-Marie Javouhey';

function figure({ meta, alt, caption }, className, sizes) {
  return h('figure', { class: `figure ${className}` }, picture(meta, { alt, sizes }), h('figcaption', {}, caption));
}

function renderChapter(chapter, index) {
  return h(
    'li',
    { class: `chapter${index % 2 ? ' chapter--flip' : ''}` },
    h('div', { class: 'chapter__marker' }, icon(chapter.icon, 'chapter__icon')),
    h(
      'article',
      { class: 'chapter__card' },
      h('p', { class: 'chapter__period' }, chapter.period),
      h('h3', {}, chapter.title),
      h('p', {}, chapter.text),
      chapter.photos.length
        ? h('div', { class: 'chapter__photos' }, chapter.photos.map((photo) => figure(photo, 'chapter__photo', '(min-width: 64rem) 16rem, (min-width: 48rem) 20rem, 100vw')))
        : null,
    ),
  );
}

const timelinePhoto = (photo) => figure(photo, 'timeline-photo', '(min-width: 64rem) 22rem, (min-width: 48rem) 44rem, 100vw');

function renderTimeline() {
  const groups = periods.map((period) => {
    const items = events.filter((event) => event.period === period.id);
    return h(
      'section',
      { class: `period period--${period.id}`, dataset: { period: period.id }, 'aria-labelledby': `periode-${period.id}` },
      period.photo ? timelinePhoto(period.photo) : null,
      h('h3', { class: 'period__title', id: `periode-${period.id}` }, period.label, h('small', {}, period.range)),
      h(
        'ol',
        { class: 'events' },
        items.map((event) =>
          h(
            'li',
            { class: `event${event.key ? ' event--key' : ''}` },
            h('p', { class: 'event__date' }, event.label),
            h('p', { class: 'event__text' }, event.text),
            event.photo ? timelinePhoto(event.photo) : null,
            event.note ? h('details', { class: 'event__note' }, h('summary', {}, 'Une précision'), h('p', {}, event.note)) : null,
          ),
        ),
      ),
    );
  });

  const filters = [{ id: 'tout', label: 'Tout' }, ...periods].map(({ id, label }) =>
    h('button', { type: 'button', class: 'chip', 'aria-pressed': String(id === 'tout'), dataset: { filter: id }, onClick: () => filter(id) }, label),
  );

  function filter(id) {
    for (const chip of filters) chip.setAttribute('aria-pressed', String(chip.dataset.filter === id));
    for (const group of groups) group.hidden = id !== 'tout' && group.dataset.period !== id;
  }

  return [h('div', { class: 'chips', role: 'group', 'aria-label': 'Choisir une période' }, filters), h('div', { class: 'periods' }, groups)];
}

function initials(name) {
  return name
    .split(/[\s-]+/)
    .filter((word) => /^[A-ZÀ-Ý]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}

function renderPeople() {
  return people.map((person) =>
    h(
      'li',
      { class: 'person' },
      h('span', { class: 'person__avatar', 'aria-hidden': 'true' }, initials(person.name) || '•'),
      h('div', {}, h('h3', {}, person.name), h('p', {}, person.text)),
    ),
  );
}

/** « Informations » extras: reliability, research notes and leads. */
function infoExtras() {
  const noteList = (notes) =>
    h('ul', {}, notes.map((note) => h('li', {}, h('strong', {}, note.title), ' — ', note.text)));
  return [
    h('h3', {}, 'Fiabilité des informations'),
    h(
      'p',
      {},
      'Ces informations ont été rassemblées lors d’une recherche documentaire assistée par une intelligence artificielle.',
    ),
    h('p', {}, 'Estimé / Hypothèse : inférence.'),
    h(
      'details',
      {},
      h('summary', {}, `Fiabilité et source de chaque date de la frise (${events.length})`),
      h(
        'ul',
        {},
        events.map((event) =>
          h('li', {}, h('strong', {}, event.label), ` — ${event.reliability.replace(/\s*—\s*non revérifié/gi, '')}. `, h('small', {}, `${event.sourceType} : ${event.source.replace(/ — URL absente.*$/, '').replace(/\s*[—–-]?\s*URL non disponible/gi, '')}`)),
        ),
      ),
    ),
    h('h3', {}, 'Notes de recherche'),
    h('details', {}, h('summary', {}, `Voir les ${researchNotes.length} notes`), noteList(researchNotes)),
    h('h3', {}, 'Pistes pour en savoir plus'),
    noteList(researchLeads),
  ];
}

document.querySelector('#chapters').replaceChildren(...chapters.map(renderChapter));
document.querySelector('#order-game').replaceChildren(createOrderGame(orderGame));
document.querySelector('#timeline').replaceChildren(...renderTimeline());
document.querySelector('#people-list').replaceChildren(...renderPeople());
document.querySelector('#quiz-list').replaceChildren(createQuiz(quiz));
document.querySelector('#event-count').textContent = String(events.length);
watchSections(document.querySelectorAll('.page-nav a'), { current: 'location' });
setupInfoDialog({ title: TITLE, sources, credits, extra: infoExtras() });
