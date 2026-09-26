/** Lower case, no accents, straight apostrophes: « Église Sainte-Thérèse » → « eglise sainte-therese ». */
export function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’‘`]/g, "'")
    .toLowerCase()
    .trim();
}

const collator = new Intl.Collator('fr', { sensitivity: 'base' });

export function byCommuneThenName(a, b) {
  return collator.compare(a.commune, b.commune) || collator.compare(a.name, b.name);
}

/**
 * Churches matching every word of the query in their name, commune or place.
 * Names containing the query come first, then commune and name order.
 */
export function search(churches, query) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const all = [...churches].sort(byCommuneThenName);
  if (!words.length) return all;
  const whole = normalize(query);
  return all
    .map((church) => {
      const name = normalize(church.name);
      const haystack = `${name} ${normalize(church.commune)} ${normalize(church.place)}`;
      if (!words.every((word) => haystack.includes(word))) return null;
      const rank = name.startsWith(whole) ? 0 : name.includes(whole) ? 1 : normalize(church.commune).startsWith(whole) ? 2 : 3;
      return { church, rank };
    })
    .filter(Boolean)
    .sort((a, b) => a.rank - b.rank)
    .map(({ church }) => church);
}
