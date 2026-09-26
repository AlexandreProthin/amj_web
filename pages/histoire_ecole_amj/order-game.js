import { h, shuffled } from '@shared/js/dom.js';

/**
 * « Remets l'histoire dans l'ordre » — tap the events from the oldest to the
 * most recent. A wrong tap explains and lets the visitor try again.
 *
 * @param {{ label: string, when: string }[]} items  In chronological order.
 */
export function createOrderGame(items) {
  const list = h('ol', { class: 'order-game__cards' });
  const feedback = h('div', { class: 'order-game__feedback', 'aria-live': 'polite' });
  const replay = h('button', { type: 'button', class: 'button button--ghost', hidden: true, onClick: start }, 'Rejouer');
  let next = 0;

  function start() {
    next = 0;
    feedback.replaceChildren(h('p', { class: 'activity__hint' }, 'Touche d’abord l’événement le plus ancien.'));
    replay.hidden = true;
    list.replaceChildren(
      ...shuffled(items.map((item, index) => ({ ...item, index }))).map((item) => {
        const badge = h('span', { class: 'order-card__badge', 'aria-hidden': 'true' }, '?');
        const when = h('span', { class: 'order-card__when', hidden: true }, item.when);
        const card = h(
          'button',
          { type: 'button', class: 'order-card', onClick: () => choose(item, card, badge, when) },
          badge,
          h('span', { class: 'order-card__body' }, h('span', {}, item.label), when),
        );
        return h('li', {}, card);
      }),
    );
  }

  function choose(item, card, badge, when) {
    if (item.index === next) {
      next += 1;
      card.disabled = true;
      card.classList.add('is-placed');
      badge.textContent = String(next);
      when.hidden = false;
      card.parentElement.style.order = String(next - items.length - 1);
      if (next === items.length) {
        feedback.replaceChildren(
          h('div', { class: 'feedback feedback--success' }, h('strong', {}, 'Bravo !'), h('p', {}, 'Tu as remis l’histoire de l’école dans le bon ordre.')),
        );
        replay.hidden = false;
      } else {
        feedback.replaceChildren(h('p', { class: 'activity__hint' }, `Oui ! Quel est l’événement n° ${next + 1} ?`));
      }
    } else {
      card.classList.remove('is-shaking');
      void card.offsetWidth; // restart the animation
      card.classList.add('is-shaking');
      feedback.replaceChildren(
        h('div', { class: 'feedback feedback--error' }, h('p', {}, item.index > next ? 'Pas encore ! Il y a un événement plus ancien.' : 'Celui-là est déjà placé.')),
      );
    }
  }

  start();
  return h('div', { class: 'order-game' }, list, feedback, replay);
}
