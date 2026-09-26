/**
 * Marks the in-page navigation link whose section is on screen with
 * `aria-current` (default "step"). Links must point to `#section-id`.
 */
export function watchSections(links, { current = 'step' } = {}) {
  const byId = new Map([...links].map((link) => [link.hash.slice(1), link]));
  const visible = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
      const active = [...byId.keys()].filter((id) => visible.get(id)).at(-1) ?? null;
      for (const [id, link] of byId) {
        if (id === active) link.setAttribute('aria-current', current);
        else link.removeAttribute('aria-current');
      }
    },
    // A thin band just above the middle of the screen decides the current section.
    { rootMargin: '-45% 0px -50% 0px' },
  );
  for (const id of byId.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}
