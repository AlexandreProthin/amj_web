/**
 * Tiny element builder. Data text is always inserted as text nodes, never as
 * HTML, so CSV content can never inject markup.
 *
 *   h('p', { class: 'lead' }, 'Bonjour ', h('strong', {}, 'toi'))
 *
 * Attributes: `class`, `dataset` (object), `on<Event>` (listener), booleans
 * (true → present, false/null → absent), anything else via setAttribute.
 */
export function h(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs ?? {})) {
    if (value == null || value === false) continue;
    if (name === 'dataset') Object.assign(element.dataset, value);
    else if (name.startsWith('on') && typeof value === 'function') {
      element.addEventListener(name.slice(2).toLowerCase(), value);
    } else if (value === true) element.setAttribute(name, '');
    else element.setAttribute(name, value);
  }
  append(element, children);
  return element;
}

function append(parent, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    parent.append(child instanceof Node ? child : String(child));
  }
}

/** Same as `h` but for inline SVG elements. */
export function svg(tag, attrs = {}, ...children) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [name, value] of Object.entries(attrs ?? {})) {
    if (value == null || value === false) continue;
    if (name.startsWith('on') && typeof value === 'function') {
      element.addEventListener(name.slice(2).toLowerCase(), value);
    } else element.setAttribute(name, value === true ? '' : value);
  }
  append(element, children);
  return element;
}

/** Stable unique ids for aria relationships. */
let counter = 0;
export function uid(prefix = 'id') {
  counter += 1;
  return `${prefix}-${counter}`;
}

/** Fisher–Yates copy shuffle. */
export function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
