/*
 * The activity attached to each step. Each builder receives the step's
 * activity settings (see content.js) and the step's media element, and
 * returns the activity body. Question and answer texts come from the CSV.
 */
import { createChoiceGroup } from '@shared/js/choice.js';
import { h, shuffled, svg } from '@shared/js/dom.js';
import { picture } from '@shared/js/picture.js';
import { playOrgan } from './organ-sound.js';

function answerBox(text, title = 'La réponse') {
  return h('div', { class: 'feedback feedback--success' }, h('strong', {}, title), h('p', {}, text));
}

/** 1 — Silhouette of the towers, then the whole façade. */
function mystery(activity, { media }) {
  media.classList.add('is-mystery');
  const { zoom, x, y } = activity.crop;
  media.style.cssText = `--zoom:${zoom};--x:${x};--y:${y}`;
  const slot = h('div', { 'aria-live': 'polite' });
  const button = h(
    'button',
    {
      type: 'button',
      class: 'button',
      onClick: () => {
        media.classList.remove('is-mystery');
        button.hidden = true;
        slot.replaceChildren(answerBox(activity.answerText));
      },
    },
    activity.revealLabel,
  );
  return [h('p', { class: 'activity__hint' }, 'Réfléchis, puis appuie sur le bouton.'), button, slot];
}

/** 2 — Three cards, immediate feedback. */
function choice(activity) {
  return createChoiceGroup({
    options: activity.options,
    answer: activity.answer,
    label: activity.question,
    explanation: activity.answerText,
    layout: 'row',
  }).element;
}

/** 3 — Light up the parts of the plan to find the Latin cross. */
function plan(activity) {
  const on = new Set();
  const shapes = {
    choeur: svg('path', { d: 'M75 95 V52 A25 25 0 0 1 125 52 V95 Z' }),
    transept: svg('rect', { x: 18, y: 95, width: 164, height: 46, rx: 4 }),
    nef: svg('rect', { x: 75, y: 141, width: 50, height: 144, rx: 4 }),
  };
  const labels = {
    choeur: svg('text', { x: 100, y: 78 }, 'Chœur'),
    transept: svg('text', { x: 100, y: 123 }, 'Transept'),
    nef: svg('text', { x: 100, y: 218 }, 'Nef'),
  };
  const drawing = svg(
    'svg',
    { class: 'plan', viewBox: '0 0 200 312', role: 'img', 'aria-label': 'Plan de la cathédrale vu du ciel' },
    ...activity.parts.map(({ id }) =>
      svg('g', { class: 'plan__part', 'data-part': id, onClick: () => toggle(id) }, shapes[id], labels[id]),
    ),
    svg('text', { class: 'plan__entry', x: 100, y: 305 }, '↑ Entrée'),
  );
  const details = h('div', { 'aria-live': 'polite' });
  const result = h('div', { 'aria-live': 'polite' });
  const buttons = activity.parts.map(({ id, label }) =>
    h('button', { type: 'button', class: 'choice', 'aria-pressed': 'false', dataset: { part: id }, onClick: () => toggle(id) }, label),
  );

  function toggle(id) {
    if (on.has(id)) on.delete(id);
    else on.add(id);
    const part = activity.parts.find((p) => p.id === id);
    drawing.querySelector(`[data-part="${id}"]`).classList.toggle('is-on', on.has(id));
    for (const button of buttons) {
      const pressed = on.has(button.dataset.part);
      button.setAttribute('aria-pressed', String(pressed));
      button.classList.toggle('is-selected', pressed);
    }
    details.replaceChildren(on.has(id) ? h('p', { class: 'activity__detail' }, h('strong', {}, part.label), ' : ', part.detail) : '');
    const complete = on.size === activity.parts.length;
    drawing.classList.toggle('is-complete', complete);
    result.replaceChildren(complete ? answerBox(activity.answerText, 'Tu as trouvé : une croix !') : '');
  }

  return [
    h('p', { class: 'activity__hint' }, 'Touche les trois parties du plan.'),
    h(
      'div',
      { class: 'plan-layout' },
      drawing,
      h('div', {}, h('ul', { class: 'choices' }, buttons.map((b) => h('li', {}, b))), details),
    ),
    result,
  ];
}

/** 4 — Find each saint from the symbol in the stained glass. */
function match(activity) {
  let found = 0;
  const result = h('div', { 'aria-live': 'polite' });
  const cards = activity.cards.map((card) => {
    const options = shuffled(activity.names);
    const group = createChoiceGroup({
      options,
      answer: options.indexOf(card.answer),
      label: `Qui est-ce ? ${card.clue}`,
      retryText: 'Non… Regarde bien l’indice !',
      onAnswer: ({ correct }) => {
        if (!correct) return;
        found += 1;
        if (found === activity.cards.length) result.replaceChildren(answerBox(activity.answerText, 'Bravo, tu as reconnu les trois saints !'));
      },
    });
    return h(
      'li',
      { class: 'saint-card' },
      picture(card.meta, { alt: `Vitrail : ${card.clue}`, className: 'saint-card__image' }),
      h('p', { class: 'saint-card__clue' }, h('span', {}, 'Indice'), card.clue),
      group.element,
    );
  });
  return [h('p', { class: 'activity__hint' }, 'Qui est-ce ? Lis l’indice et choisis le bon nom.'), h('ul', { class: 'saint-cards' }, cards), result];
}

/** 5 — Think first, then reveal the story. */
function reveal(activity) {
  const slot = h('div', { 'aria-live': 'polite' });
  const button = h(
    'button',
    {
      type: 'button',
      class: 'button',
      onClick: () => {
        button.hidden = true;
        slot.replaceChildren(answerBox(activity.answerText));
      },
    },
    activity.revealLabel,
  );
  return [h('p', { class: 'activity__hint' }, 'Imagine une réponse, puis vérifie.'), button, slot];
}

/** 6 — Touch each piece of furniture to learn its wood. */
function explore(activity) {
  const seen = new Set();
  const result = h('div', { 'aria-live': 'polite' });
  const items = activity.items.map((item, index) => {
    const detail = h('p', { class: 'wood__detail', hidden: true }, item.detail);
    const button = h(
      'button',
      {
        type: 'button',
        class: 'choice',
        'aria-expanded': 'false',
        onClick: () => {
          const open = detail.hidden;
          detail.hidden = !open;
          button.setAttribute('aria-expanded', String(open));
          button.classList.toggle('is-selected', open);
          seen.add(index);
          if (seen.size === activity.items.length && !result.hasChildNodes()) result.append(answerBox(activity.answerText));
        },
      },
      h('span', { class: 'choice__mark', 'aria-hidden': 'true' }, '🪵'),
      item.label,
    );
    return h('li', { class: 'wood' }, button, detail);
  });
  return [h('p', { class: 'activity__hint' }, 'Touche chaque meuble pour découvrir son bois.'), h('ul', { class: 'choices' }, items), result];
}

/** 7 — Listen (synthesised organ), then estimate the number of pipes. */
function organ(activity) {
  const pipes = h(
    'div',
    { class: 'pipes', 'aria-hidden': 'true' },
    [45, 62, 80, 100, 84, 66, 50, 70, 90, 72, 55].map((height, index) =>
      h('i', { style: `--h:${height}%;--d:${index * 0.07}s` }),
    ),
  );
  const listen = h(
    'button',
    {
      type: 'button',
      class: 'button button--ghost',
      onClick: async () => {
        listen.disabled = true;
        pipes.classList.add('is-playing');
        await playOrgan();
        pipes.classList.remove('is-playing');
        listen.disabled = false;
      },
    },
    '▶ Écouter l’orgue',
  );
  return [
    h('div', { class: 'organ-player' }, pipes, h('div', {}, listen, h('p', { class: 'activity__hint' }, 'Son imité par l’ordinateur.'))),
    createChoiceGroup({
      options: activity.options,
      answer: activity.answer,
      label: 'Combien de tuyaux ?',
      explanation: activity.answerText,
      layout: 'row',
    }).element,
  ];
}

/** 8 — Choose what to protect first. */
function mission(activity) {
  const chosen = new Set();
  const result = h('div', { 'aria-live': 'polite' });
  const counter = h('p', { class: 'activity__hint', 'aria-live': 'polite' });
  const validate = h('button', { type: 'button', class: 'button', disabled: true, onClick: finish }, 'Valider mes choix');
  const chips = activity.items.map((label) =>
    h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false', onClick: (event) => toggle(label, event.currentTarget) }, label),
  );

  function toggle(label, chip) {
    if (chosen.has(label)) chosen.delete(label);
    else if (chosen.size < activity.pick) chosen.add(label);
    chip.setAttribute('aria-pressed', String(chosen.has(label)));
    update();
  }

  function update() {
    const left = activity.pick - chosen.size;
    counter.textContent = left ? `Encore ${left} à choisir.` : 'Parfait, tu peux valider !';
    validate.disabled = left > 0;
  }

  function finish() {
    for (const chip of chips) chip.disabled = true;
    validate.hidden = true;
    result.replaceChildren(
      h(
        'div',
        { class: 'feedback feedback--success' },
        h('strong', {}, 'Merci, gardien du monument !'),
        h('p', {}, `Tu protèges : ${[...chosen].join(', ').toLowerCase()}.`),
        h('p', {}, activity.answerText),
      ),
    );
  }

  update();
  return [h('div', { class: 'chips' }, chips), counter, validate, result];
}

const builders = { mystery, choice, plan, match, reveal, explore, organ, mission };

export function buildActivity(activity, context) {
  const builder = builders[activity.type];
  if (!builder) throw new Error(`Activité inconnue : ${activity.type}`);
  return builder(activity, context);
}
