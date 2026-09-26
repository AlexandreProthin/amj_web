import { h } from './dom.js';

/**
 * Builds a responsive <picture> from a vite-imagetools `as=picture` import:
 *
 *   import facade from '@data/…/facade.jpg?w=480;960&format=webp;jpg&as=picture';
 *   picture(facade, { alt: 'Façade', sizes: '(min-width: 64rem) 50vw, 100vw' })
 *
 * The browser then downloads only the size and format it needs.
 */
export function picture(meta, { alt, sizes = '100vw', className, loading = 'lazy', style } = {}) {
  const sources = Object.entries(meta.sources).map(([format, srcset]) =>
    h('source', { type: `image/${format === 'jpg' ? 'jpeg' : format}`, srcset, sizes }),
  );
  return h(
    'picture',
    { class: className },
    sources,
    h('img', {
      src: meta.img.src,
      width: meta.img.w,
      height: meta.img.h,
      alt: alt ?? '',
      loading,
      decoding: 'async',
      style,
    }),
  );
}
