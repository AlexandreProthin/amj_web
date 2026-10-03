/*
 * Page configuration for « La cathédrale Saint-Joseph de Nouméa ».
 *
 * Texts come from the CSV files in data/cathedrale_de_noumea/:
 *   - presentation_…_8_diapos.csv → step title, main text, highlight box
 *   - interactions_cours_….csv   → activity question and answer
 *   - quiz_….csv                 → final quiz
 * This file only decides which image goes with which step and how each
 * activity behaves. Edit the CSV to change what visitors read.
 */
import presentation from '@data/cathedrale_de_noumea/presentation_cathedrale_saint_joseph_noumea_8_diapos.csv';
import interactions from '@data/cathedrale_de_noumea/interactions_cours_cathedrale_noumea.csv';
import quizRows from '@data/cathedrale_de_noumea/quiz_cathedrale_saint_joseph_noumea.csv';

import facade from '@data/cathedrale_de_noumea/assets/images/01_facade/facade.jpg?w=1000&format=webp;jpg&as=picture';
import monogramme from '@data/cathedrale_de_noumea/assets/images/02_construction/construction.jpg?w=1000&format=webp;jpg&as=picture';
import carteAncienne from '@data/cathedrale_de_noumea/assets/images/03_architecture/interieur.jpg?w=1000&format=webp;jpg&as=picture';
import vitrailMichel from '@data/cathedrale_de_noumea/assets/images/04_vitraux/saint-michel.jpg?format=webp;jpg&as=picture';
import vitrailPierre from '@data/cathedrale_de_noumea/assets/images/04_vitraux/saint-pierre.jpg?format=webp;jpg&as=picture';
import vitrailCecile from '@data/cathedrale_de_noumea/assets/images/04_vitraux/sainte-cecile.jpg?format=webp;jpg&as=picture';
// The two files in 05_statues/ do not show statues: « notre-dame-des-flots.jpg »
// shows the nave and choir, « saint-joseph.jpg » the bishop's seat and stalls.
import nefEtChoeur from '@data/cathedrale_de_noumea/assets/images/05_statues/notre-dame-des-flots.jpg?w=1000&format=webp;jpg&as=picture';
import stalles from '@data/cathedrale_de_noumea/assets/images/05_statues/saint-joseph.jpg?w=1000&format=webp;jpg&as=picture';
import confessionnal from '@data/cathedrale_de_noumea/assets/images/06_boiseries/mobilier.jpg?w=1000&format=webp;jpg&as=picture';
import orgue from '@data/cathedrale_de_noumea/assets/images/07_orgue/orgue.jpg?w=1000&format=webp;jpg&as=picture';

const PHOTO_CREDIT = { author: 'Jeff Vergne' };

/** Image credits shown in « Informations ». */
export const credits = [
  { subject: 'Façade de la cathédrale', ...PHOTO_CREDIT },
  { subject: 'Monogramme doré', ...PHOTO_CREDIT },
  { subject: 'Carte postale ancienne de l’intérieur (éditeur : J. Raché)' },
  { subject: 'Vitraux de saint Pierre, sainte Cécile et saint Michel', ...PHOTO_CREDIT },
  { subject: 'Nef et chœur', ...PHOTO_CREDIT },
  { subject: 'Siège de l’évêque et stalles', ...PHOTO_CREDIT },
  { subject: 'Confessionnal', ...PHOTO_CREDIT },
  { subject: 'Grand orgue', ...PHOTO_CREDIT },
];

/**
 * Per step (CSV « Diapositive » number):
 *   images   — figures shown beside the text (`crop` zooms on a detail)
 *   repere   — true to show the « Repère » column as a highlight box
 *              (false where the column holds teacher instructions)
 *   activity — widget settings; question and answer come from the CSV
 */
const stepConfig = {
  1: {
    repere: true,
    images: [{ meta: facade, alt: 'La façade de la cathédrale Saint-Joseph et ses deux tours', caption: 'La façade et ses deux tours' }],
    activity: {
      type: 'mystery',
      revealLabel: 'Révéler le monument',
      // Silhouette of the two towers before the reveal.
      crop: { zoom: 1.6, x: '55%', y: '0%' },
    },
  },
  2: {
    repere: true,
    images: [{ meta: carteAncienne, alt: 'Carte postale ancienne en noir et blanc montrant l’intérieur de la cathédrale', caption: 'L’intérieur de la cathédrale sur une carte postale ancienne' }],
    activity: {
      type: 'choice',
      options: ['Des marins', 'Des ouvriers du bagne', 'Des soldats américains'],
      answer: 1,
    },
  },
  3: {
    repere: false,
    images: [{ meta: nefEtChoeur, alt: 'La nef et le chœur de la cathédrale, avec des arcs pointus en bois', caption: 'Lève les yeux : les arcs sont pointus !' }],
    activity: {
      type: 'plan',
      parts: [
        { id: 'nef', label: 'La nef', detail: 'la grande allée où les fidèles s’assoient.' },
        { id: 'transept', label: 'Le transept', detail: 'la partie qui traverse la nef, comme les bras d’une croix.' },
        { id: 'choeur', label: 'Le chœur', detail: 'la partie autour de l’autel, tout au fond.' },
      ],
    },
  },
  4: {
    repere: false,
    images: [],
    activity: {
      type: 'match',
      names: ['Saint Pierre', 'Sainte Cécile', 'Saint Michel'],
      cards: [
        { meta: vitrailPierre, clue: 'Il tient des clés.', answer: 'Saint Pierre' },
        { meta: vitrailCecile, clue: 'Elle aime la musique.', answer: 'Sainte Cécile' },
        { meta: vitrailMichel, clue: 'Il combat un dragon.', answer: 'Saint Michel' },
      ],
    },
  },
  5: {
    repere: false,
    // No photograph of the statues yet: zoom on the façade niche instead.
    images: [{ meta: facade, alt: 'Le haut de la façade de la cathédrale, avec une statue dans une niche', caption: 'Observe bien le haut de la façade.', crop: { zoom: 3.2, x: '42%', y: '42%' } }],
    activity: { type: 'reveal', revealLabel: 'Révéler l’histoire' },
  },
  6: {
    repere: true,
    images: [
      { meta: stalles, alt: 'Le siège de l’évêque et les stalles en bois sombre sculpté', caption: 'Le siège de l’évêque et les stalles' },
      { meta: confessionnal, alt: 'Un confessionnal en bois sculpté', caption: 'Un confessionnal' },
    ],
    activity: {
      type: 'explore',
      items: [
        { label: 'La chaire', detail: 'Sa charpente est en acacia et ses panneaux sculptés sont en kohu.' },
        { label: 'Les stalles', detail: 'Ce sont les sièges du clergé, dans le chœur. Le décor du chœur utilise le tamanou.' },
        { label: 'Le confessionnal', detail: 'C’est un meuble en tamanou placé dans une chapelle sur le côté.' },
      ],
    },
  },
  7: {
    repere: false,
    images: [{ meta: orgue, alt: 'Le grand orgue et son buffet en bois sculpté, en haut de la cathédrale', caption: 'Le grand orgue' }],
    activity: {
      type: 'organ',
      options: ['Environ 100 tuyaux', 'Environ 600 tuyaux', 'Près de 1 000 tuyaux'],
      answer: 2,
    },
  },
  8: {
    repere: true,
    images: [{ meta: monogramme, alt: 'Un écusson doré décoré de lettres entrelacées', caption: 'Un détail doré du décor' }],
    activity: {
      type: 'mission',
      pick: 3,
      items: ['Un vitrail', 'Une boiserie', 'Une cloche', 'L’orgue', 'L’horloge'],
    },
  },
};

const interactionsBySlide = new Map(interactions.map((row) => [row['Diapositive'], row]));

/** The 8 steps, merged from both CSV files and the configuration above. */
export const steps = presentation.map((row) => {
  const number = Number(row['Diapositive']);
  const interaction = interactionsBySlide.get(row['Diapositive']) ?? {};
  const config = stepConfig[number] ?? { images: [] };
  return {
    number,
    title: row['Titre'],
    text: row['Contenu principal'],
    repere: config.repere ? row['Repère pédagogique / activité'] : null,
    sources: row['Liens / sites web sources'],
    images: config.images,
    activity: config.activity && {
      ...config.activity,
      question: interaction['Accroche'],
      answerText: interaction['Réponse ou révélation'],
      minutes: parseInt(interaction['Durée indicative'], 10) || 0,
    },
  };
});

export const quiz = quizRows.map((row) => ({
  question: row['Sujet de la question'],
  options: [row['Proposition 1'], row['Proposition 2'], row['Proposition 3']],
  answer: row['Proposition correcte'],
  explanation: row['Explication'],
}));
