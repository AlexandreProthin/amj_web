/*
 * Page configuration for « L'histoire de l'école Anne-Marie Javouhey ».
 *
 * Texts come from the CSV files in data/histoire_ecole_amj/:
 *   - 01_chronologie_….csv          → the timeline (every row is shown)
 *   - 02_informations_….csv         → people cards; other notes go to « Informations »
 *   - 03_quiz_….csv                 → final quiz
 *   - 04_recit_ecole.csv            → the story chapters, written for children
 *   - *.jpg                         → photos placed in the story and the timeline (PHOTOS)
 * Reliability labels and sources are only shown in « Informations ».
 */
import chronologie from '@data/histoire_ecole_amj/01_chronologie_anne_marie_javouhey.csv';
import informations from '@data/histoire_ecole_amj/02_informations_complementaires_anne_marie_javouhey.csv';
import quizRows from '@data/histoire_ecole_amj/03_quiz_histoire_ecole_anne_marie_javouhey.csv';
import recit from '@data/histoire_ecole_amj/04_recit_ecole.csv';
import soeurs from '@data/histoire_ecole_amj/soeurs.jpg?w=960&format=webp;jpg&as=picture';
import ecole1983 from '@data/histoire_ecole_amj/ecole_amj_1er_mars_1983.jpg?w=960&format=webp;jpg&as=picture';
import ecole1967 from '@data/histoire_ecole_amj/ecole_1967.jpg?w=960&format=webp;jpg&as=picture';
import eleves from '@data/histoire_ecole_amj/eleves.jpg?w=960&format=webp;jpg&as=picture';
import ecole2026 from '@data/histoire_ecole_amj/ecole_amj_2026_2027.jpg?w=960&format=webp;jpg&as=picture';
import { firstYear, formatDate } from './dates.js';

/** Timeline periods; an event belongs to the first period whose `to` year is not passed. */
const PERIODS = [
  { id: 'avant', label: 'Avant l’école', range: '1812 – 1960', to: 1960 },
  { id: 'ecole', label: 'L’école grandit', range: '1961 – 1988', to: 1988 },
  { id: 'recent', label: 'Jusqu’à aujourd’hui', range: 'depuis 1989', to: Infinity },
];

/** Photos supplied by the school, with public use authorized by the owner. */
const PHOTOS = {
  soeurs: {
    meta: soeurs,
    alt: 'Photo de groupe : des religieuses et Mme Jarre, sur deux rangs.',
    caption:
      'De gauche à droite, 1er rang : sœur Thérèse, sœur Marcelle, sœur Gonzague, sœur Marie-Bernard et sœur Marie-Thérèse. ' +
      '2e rang : une sœur qui était infirmière, sœur Céleste, sœur Myriam, sœur Claude, sœur Marie-Thérèse, Mme Jarre, sœur Henri et sœur Béatrice. ' +
      'Cette photo a été prise lors d’une fête en souvenir d’Anne-Marie Javouhey.',
    credit: 'Les sœurs et Mme Jarre',
  },
  ecole1967: {
    meta: ecole1967,
    alt: 'Un grand bâtiment moderne à deux étages, avec une voiture garée devant.',
    caption: 'L’école en 1967.',
    credit: 'L’école en 1967',
  },
  eleves: {
    meta: eleves,
    alt: 'Photo de groupe en noir et blanc : de nombreux élèves devant l’école, avec une religieuse et des adultes.',
    caption: 'Les élèves de l’école réunis pour une photo.',
    credit: 'Les élèves de l’école',
  },
  ecole1983: { meta: ecole1983, alt: 'L’école Anne-Marie Javouhey en 1983.', caption: 'L’école en 1983.', credit: 'L’école en 1983' },
  ecole2026: { meta: ecole2026, alt: 'L’école Anne-Marie Javouhey aujourd’hui.', caption: 'L’école aujourd’hui.', credit: 'L’école en 2026-2027' },
};

/** Photos shown in a story chapter, by chapter title. */
const CHAPTER_PHOTOS = { 'Une école qui grandit': [PHOTOS.ecole1967, PHOTOS.eleves] };

/** Photo shown at the top of a timeline period, by period id. */
const PERIOD_PHOTOS = { ecole: PHOTOS.soeurs };

/** Photo shown with a timeline event, by date. */
const EVENT_PHOTOS = { '1983-03-01': PHOTOS.ecole1983, '2026-2027': PHOTOS.ecole2026 };

export const periods = PERIODS.map((period) => ({ ...period, photo: PERIOD_PHOTOS[period.id] ?? null }));

/** Image credits shown in « Informations ». */
export const credits = [{
  subject: 'Toutes les photographies',
  author: 'école Anne Marie Javouhey',
  licence: 'Publication autorisée',
}];

/** Timeline dates shown as key moments. */
const KEY_DATES = new Set(['1860-08-26', '1961', '2015-02-13']);

/** Order game: timeline dates to put in order, with a short label for each. */
const ORDER_GAME = [
  { date: '1860-08-26', label: 'Les Sœurs de Cluny arrivent à Port-de-France' },
  { date: '1926', label: 'Le père Mulsant construit la chapelle du Bon-Pasteur' },
  { date: '1961', label: 'L’école Anne-Marie Javouhey ouvre ses portes' },
  { date: '1976-08-25', label: 'Les parents déclarent leur association' },
  { date: '2017-02-10', label: 'Monique Purini devient directrice' },
];

/** People shown first, in this order; other « personnes » rows follow. */
const PEOPLE_ORDER = [
  'Anne-Marie Javouhey et la congrégation',
  'Père Bichon',
  'Jean Lèques',
  'Sœurs Bernard, Claude, Marcelle et Andrée',
  'Marie-Rose Jarre',
  'Marie-Chanel Ukajo',
  'Thérèse Pham',
  'Monique Purini',
  'Marie-Anne Hnaissilin',
];

/** 02 rows never shown: raw conversation transcripts. */
const HIDDEN_CATEGORIES = new Set(['transcription_integrale']);

export const chapters = recit.map((row) => ({
  period: row.periode,
  title: row.titre,
  text: row.texte,
  icon: row.icone,
  photos: CHAPTER_PHOTOS[row.titre] ?? [],
}));

export const events = chronologie.map((row) => {
  const year = firstYear(row.date);
  return {
    date: row.date,
    label: formatDate(row.date),
    year,
    period: periods.find((period) => year <= period.to)?.id ?? periods.at(-1).id,
    text: row.evenement,
    note: row.notes || null,
    key: KEY_DATES.has(row.date),
    photo: EVENT_PHOTOS[row.date] ?? null,
    source: row.lien_source,
    sourceType: row.type_source,
    reliability: row.niveau_confiance,
  };
});

export const orderGame = ORDER_GAME.map((item) => {
  const event = events.find((e) => e.date === item.date);
  if (!event) console.warn(`Jeu : aucune date « ${item.date} » dans la chronologie.`);
  return { ...item, when: event?.label ?? item.date };
});

const visibleNotes = informations.filter((row) => !HIDDEN_CATEGORIES.has(row.categorie));
const rank = (name) => (PEOPLE_ORDER.includes(name) ? PEOPLE_ORDER.indexOf(name) : PEOPLE_ORDER.length);

export const people = visibleNotes
  .filter((row) => row.categorie === 'personnes')
  .map((row) => ({ name: row.resume, text: row.detail }))
  .sort((a, b) => rank(a.name) - rank(b.name));

const note = (row) => ({ title: row.resume, text: row.detail, reliability: row.niveau_confiance, category: row.categorie });
export const methodology = visibleNotes.filter((row) => row.categorie === 'methodologie').map(note);
export const researchLeads = visibleNotes.filter((row) => row.categorie === 'piste_recherche').map(note);
export const researchNotes = visibleNotes
  .filter((row) => !['personnes', 'methodologie', 'piste_recherche'].includes(row.categorie))
  .map(note);

const NO_URL = / — URL absente de la conversation récupérée$/;
const isConversation = (text) => /^chatgpt-conversation:|^Conversation référencée$/.test(text);
export const sources = [...chronologie.map((row) => row.lien_source), ...informations.map((row) => row.source)]
  .filter((text) => text && !isConversation(text))
  .map((text) => text.replace(NO_URL, ''));

export const quiz = quizRows.map((row) => ({
  question: row.question,
  options: [row.proposition_1, row.proposition_2, row.proposition_3],
  answer: row.reponse_correcte,
  explanation: row.explication,
}));
