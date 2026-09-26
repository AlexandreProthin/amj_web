/*
 * Visual review helper: screenshots of chosen sections at the three device
 * sizes, written to test-results/screens/. Needs a running server:
 *
 *   npm run dev              (then, in another terminal)
 *   node tests/screenshots.mjs histoire_ecole_amj/ "#recit" "#frise"
 *
 * Without section selectors, captures the top of the page.
 */
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const [path = '', ...selectors] = process.argv.slice(2);
const base = process.env.BASE_URL ?? 'http://localhost:5173/';
const sizes = { phone: [375, 812], tablet: [768, 1024], desktop: [1600, 900] };
const out = 'test-results/screens';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const [name, [width, height]] of Object.entries(sizes)) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(base + path, { waitUntil: 'networkidle' });
  for (const selector of selectors.length ? selectors : ['body']) {
    if (selector !== 'body') {
      await page.locator(selector).evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100));
      await page.waitForTimeout(400);
    }
    const file = `${out}/${path.replace(/\W+/g, '_')}${name}_${selector.replace(/\W+/g, '')}.png`;
    await page.screenshot({ path: file });
    console.log(file);
  }
  await page.close();
}
await browser.close();
