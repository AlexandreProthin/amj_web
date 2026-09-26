const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** First four-digit year in a date text ("vers 1945" → 1945); Infinity if none. */
export function firstYear(text) {
  const match = String(text).match(/\d{4}/);
  return match ? Number(match[0]) : Infinity;
}

/**
 * CSV dates to readable French:
 * "1860-08-26" → "26 août 1860", "2012-09" → "Septembre 2012",
 * "vers 1945" → "Vers 1945"; plain years stay as they are.
 */
export function formatDate(text) {
  const value = String(text).trim();
  const full = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (full) {
    const day = Number(full[3]);
    return `${day === 1 ? '1er' : day} ${MONTHS[Number(full[2]) - 1]} ${full[1]}`;
  }
  const month = value.match(/^(\d{4})-(\d{2})$/);
  if (month) return capitalize(`${MONTHS[Number(month[2]) - 1]} ${month[1]}`);
  return capitalize(value);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
