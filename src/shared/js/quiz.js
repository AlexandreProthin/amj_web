import { createChoiceGroup } from './choice.js';
import { h } from './dom.js';

/**
 * End-of-visit quiz. One card per question, instant feedback, and a sticky
 * score bar counting the questions answered right on the first try.
 *
 * @param {{ question: string, options: string[], answer: string, explanation?: string }[]} questions
 *   `answer` is the text of the right option, as written in the CSV.
 */
export function createQuiz(questions) {
  const total = questions.length;
  const firstTry = new Set();
  const answered = new Set();
  const scoreText = h('strong', {});
  const restart = h('button', { type: 'button', class: 'button', hidden: true, onClick: reset }, 'Recommencer');
  const scoreBar = h('div', { class: 'quiz__score', 'aria-live': 'polite' }, scoreText, restart);

  const groups = questions.map((item, index) => {
    const answer = item.options.indexOf(item.answer);
    if (answer === -1) {
      console.warn(`Quiz : la réponse « ${item.answer} » ne correspond à aucune proposition.`, item);
    }
    const group = createChoiceGroup({
      options: item.options,
      answer,
      label: item.question,
      explanation: item.explanation,
      onAnswer: ({ correct, firstTry: first }) => {
        if (!correct) return;
        answered.add(index);
        if (first) firstTry.add(index);
        update();
      },
    });
    return { item, group };
  });

  function update() {
    if (answered.size < total) {
      scoreText.textContent = `Questions trouvées : ${answered.size} / ${total}`;
      restart.hidden = answered.size === 0;
      return;
    }
    const score = firstTry.size;
    const praise =
      score === total ? 'Parfait, champion !' : score >= total / 2 ? 'Très bien joué !' : 'Bien joué, tu as tout trouvé !';
    scoreText.textContent = `${praise} ${score} / ${total} du premier coup.`;
    restart.hidden = false;
  }

  function reset() {
    firstTry.clear();
    answered.clear();
    for (const { group } of groups) group.reset();
    update();
  }

  update();
  return h(
    'div',
    { class: 'quiz' },
    groups.map(({ item, group }, index) =>
      h(
        'article',
        { class: 'quiz__question' },
        h('span', { class: 'quiz__number' }, `Question ${index + 1} sur ${total}`),
        h('h3', {}, item.question),
        group.element,
      ),
    ),
    scoreBar,
  );
}
