/*
 * Page configuration for « Les églises de Nouvelle-Calédonie ».
 *
 * Data in data/eglises_nc/:
 *   - eglises_data.json     → one record per church: text, type, position, photo
 *                             (built from eglises_catholiques_nouvelle_caledonie.csv
 *                             by ../tools/prepare_eglises_data.py, which geocodes)
 *   - communes_nc.geojson   → land outline (Natural Earth country shape)
 *   - terrain_nc.json       → forests, water, rivers, quarries, with their sources
 *   - assets/images/        → church photos
 * Geographic files are lightened at build time (src/build/geo-plugin.js).
 */
import churchesData from '@data/eglises_nc/eglises_data.json';

/** Marker colour and label for each « type » value. */
export const TYPES = {
  église: { label: 'Église', plural: 'Églises', color: '#0d4f78' },
  chapelle: { label: 'Chapelle', plural: 'Chapelles', color: '#23704f' },
  cathédrale: { label: 'Cathédrale', plural: 'Cathédrale', color: '#c98a22' },
};

/** Map background colours (land, forest, water, quarries). */
export const TERRAIN_STYLE = {
  sea: '#d4e7ee',
  land: { fillColor: '#efeadb', fillOpacity: 1, color: '#b8ae93', weight: 1 },
  forest: { fillColor: '#6f9a69', fillOpacity: 0.35, stroke: false },
  water: { fillColor: '#79b9cf', fillOpacity: 0.9, stroke: false },
  rivers: { color: '#79b9cf', weight: 1, opacity: 0.9 },
  mines: { fillColor: '#c9a36f', fillOpacity: 0.75, stroke: false },
};

export const TERRAIN_LEGEND = [
  { key: 'forest', label: 'Forêts', color: '#9fbb99' },
  { key: 'water', label: 'Lacs et rivières', color: '#79b9cf' },
  { key: 'mines', label: 'Mines et carrières', color: '#c9a36f' },
];

/** Whole territory, used for the first view and the « home » button. */
export const BOUNDS = [
  [-22.75, 163.55],
  [-19.55, 168.2],
];

/** Other experiences linked from a church's detail, by church id. */
export const LINKS = {
  57: { href: '../cathedrale_de_noumea/', label: 'Découvrir la cathédrale en 8 étapes' },
};

/*
 * Photos: loaded only when a church is opened. Keys are file names as written
 * in eglises_data.json (« photo.path »).
 */
const localPhotos = import.meta.glob('@data/eglises_nc/assets/images/*.jpg', {
  query: '?w=900&format=webp;jpg&as=picture',
  import: 'default',
});
const photoLoaders = Object.fromEntries(
  Object.entries(localPhotos).map(([path, load]) => [path.split('/').pop(), load]),
);
photoLoaders['facade.jpg'] = () =>
  import('@data/cathedrale_de_noumea/assets/images/01_facade/facade.jpg?w=900&format=webp;jpg&as=picture').then((m) => m.default);

export const churches = churchesData.map((record) => {
  const file = record.photo?.path.split('/').pop();
  return {
    id: record.id,
    name: record.nom,
    commune: record.commune,
    place: record.localisation,
    date: record.date && record.date !== '—' ? record.date : null,
    fact: record.fait,
    type: TYPES[record.type] ? record.type : 'église',
    lat: record.lat,
    lon: record.lon,
    approximate: record.precision !== 'précise',
    sources: record.sources,
    photo: record.photo && {
      load: photoLoaders[file],
      author: record.photo.credit ?? null,
      licence: record.photo.licence ?? null,
      source: record.photo.source,
    },
  };
});

const missing = churches.filter((church) => church.photo && !church.photo.load);
if (missing.length) console.warn('Photos introuvables :', missing.map((c) => c.name));

export const credits = churches
  .filter((church) => church.photo)
  .map((church) => ({
    subject: `${church.name} (${church.commune})`,
    author: church.photo.author ?? undefined,
    licence: church.photo.licence ?? undefined,
    url: church.photo.source,
  }));
