import { h } from './dom.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * A single-answer question with immediate feedback.
 *
 * The visitor may retry after a wrong answer; the group locks once the right
 * answer is found. `onAnswer({ correct, firstTry })` fires on every choice.
 *
 * @param {object} options
 * @param {string[]} options.options   Labels in display order.
 * @param {number}   options.answer    Index of the right label.
 * @param {string}   [options.label]   Accessible name of the group.
 * @param {string}   [options.explanation] Shown once the right answer is found.
 * @param {string}   [options.retryText]   Shown after a wrong answer.
 */
export function createChoiceGroup({
  options,
  answer,
  label,
  explanation,
  retryText = 'Pas tout à fait… Essaie encore !',
  layout = 'column',
  onAnswer,
}) {
  let attempts = 0;
  const feedback = h('div', { class: 'feedback-slot', 'aria-live': 'polite' });
  const buttons = options.map((text, index) =>
    h(
      'button',
      { type: 'button', class: 'choice', onClick: () => choose(index) },
      h('span', { class: 'choice__mark', 'aria-hidden': 'true' }, LETTERS[index]),
      h('span', {}, text),
    ),
  );

  function choose(index) {
    attempts += 1;
    const correct = index === answer;
    const button = buttons[index];
    if (correct) {
      button.classList.add('is-correct');
      button.querySelector('.choice__mark').textContent = '✓';
      for (const other of buttons) other.disabled = true;
      feedback.replaceChildren(
        h(
          'div',
          { class: 'feedback feedback--success' },
          h('strong', {}, attempts === 1 ? 'Bravo !' : 'Oui, c’est ça !'),
          explanation ? h('p', {}, explanation) : null,
        ),
      );
    } else {
      button.classList.add('is-wrong');
      button.disabled = true;
      button.querySelector('.choice__mark').textContent = '✗';
      feedback.replaceChildren(h('div', { class: 'feedback feedback--error' }, h('p', {}, retryText)));
    }
    onAnswer?.({ correct, firstTry: correct && attempts === 1 });
  }

  function reset() {
    attempts = 0;
    buttons.forEach((button, index) => {
      button.disabled = false;
      button.classList.remove('is-correct', 'is-wrong');
      button.querySelector('.choice__mark').textContent = LETTERS[index];
    });
    feedback.replaceChildren();
  }

  const element = h(
    'div',
    { class: 'choice-group', role: 'group', 'aria-label': label },
    h(
      'ul',
      { class: `choices${layout === 'row' ? ' choices--row' : ''}` },
      buttons.map((button) => h('li', {}, button)),
    ),
    feedback,
  );
  return { element, reset };
}
