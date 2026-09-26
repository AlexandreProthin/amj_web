import '@shared/styles/base.css';
import '@shared/styles/components.css';
import './cathedrale.css';

import { h } from '@shared/js/dom.js';
import { setupInfoDialog } from '@shared/js/info-dialog.js';
import { picture } from '@shared/js/picture.js';
import { createQuiz } from '@shared/js/quiz.js';
import { watchSections } from '@shared/js/scroll-spy.js';
import { buildActivity } from './activities.js';
import { credits, quiz, steps } from './content.js';

const TITLE = 'La cathédrale Saint-Joseph de Nouméa';

/** "Label : text" in the Repère column becomes a titled box. */
function repereBox(text) {
  const match = text.match(/^([^:]{3,20}) : (.+)$/s);
  const [title, body] = match ? [match[1], match[2]] : ['Le savais-tu ?', text];
  return h('aside', { class: 'callout' }, h('span', { class: 'callout__title' }, title), h('p', {}, body));
}

function figure({ meta, alt, caption, crop }) {
  const style = crop ? `--zoom:${crop.zoom};--x:${crop.x};--y:${crop.y}` : null;
  return h(
    'figure',
    { class: `figure${crop ? ' figure--crop' : ''}`, style },
    h('div', { class: 'figure__frame' }, picture(meta, { alt, sizes: '(min-width: 64rem) 34rem, (min-width: 48rem) 44rem, 100vw' })),
    caption ? h('figcaption', {}, caption) : null,
  );
}

function renderStep(step) {
  const media = h('div', { class: `step__media${step.images.length > 1 ? ' step__media--pair' : ''}` }, step.images.map(figure));
  const activity = step.activity
    ? h(
        'div',
        { class: 'activity' },
        h('p', { class: 'activity__label' }, h('span', { 'aria-hidden': 'true' }, '★ '), 'À toi de jouer'),
        h('h3', { class: 'activity__question' }, step.activity.question),
        buildActivity(step.activity, { media }),
      )
    : null;

  return h(
    'section',
    {
      class: `step${step.number % 2 === 0 ? ' step--flip' : ''}${step.images.length ? '' : ' step--no-media'}`,
      id: `etape-${step.number}`,
      'aria-labelledby': `etape-${step.number}-titre`,
    },
    h(
      'div',
      { class: 'container step__grid' },
      h(
        'header',
        { class: 'step__head' },
        h('p', { class: 'step__kicker' }, `Étape ${step.number} sur ${steps.length}`),
        h('h2', { id: `etape-${step.number}-titre` }, step.title),
      ),
      step.images.length ? media : null,
      h('div', { class: 'step__body' }, h('p', { class: 'step__text' }, step.text), step.repere ? repereBox(step.repere) : null),
      activity,
    ),
  );
}

function renderNav() {
  const items = [
    ...steps.map((step) => ({ href: `#etape-${step.number}`, label: String(step.number), title: `Étape ${step.number} : ${step.title}` })),
    { href: '#quiz', label: '?', title: 'Le quiz' },
  ];
  document.querySelector('#steps-nav').replaceChildren(
    ...items.map((item) =>
      h('li', {}, h('a', { href: item.href, class: 'steps-nav__link', 'aria-label': item.title, title: item.title }, item.label)),
    ),
  );
}

function totalMinutes() {
  const minutes = steps.reduce((sum, step) => sum + (step.activity?.minutes ?? 0), 0);
  return Math.max(5, Math.round(minutes / 5) * 5);
}

document.querySelector('#hero-lead').textContent =
  `Un grand monument de Nouméa à explorer en ${steps.length} étapes, avec des jeux et un quiz à la fin. ` +
  `Durée : environ ${totalMinutes()} minutes.`;
document.querySelector('#steps').replaceChildren(...steps.map(renderStep));
document.querySelector('#quiz-list').replaceChildren(createQuiz(quiz));
renderNav();
watchSections(document.querySelectorAll('.steps-nav__link'));
setupInfoDialog({
  title: TITLE,
  sources: steps.map((step) => step.sources),
  credits,
});
