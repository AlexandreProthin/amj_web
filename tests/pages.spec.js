import { expect, test } from '@playwright/test';

const PAGES = [
  { path: 'cathedrale_de_noumea/', title: /cathédrale Saint-Joseph/ },
  { path: 'histoire_ecole_amj/', title: /école Anne-Marie Javouhey/ },
  { path: 'eglises_nc/', title: /églises de Nouvelle-Calédonie/, noQuiz: true },
];

for (const page of PAGES) {
  test.describe(page.path, () => {
    test('opens directly, without errors or horizontal scrolling', async ({ page: browser }) => {
      const errors = [];
      browser.on('pageerror', (error) => errors.push(error.message));
      browser.on('console', (message) => message.type() === 'error' && errors.push(message.text()));

      await browser.goto(page.path);
      await expect(browser.getByRole('heading', { level: 1 })).toHaveText(page.title);
      await browser.waitForLoadState('networkidle');

      const overflow = await browser.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });

    test('shows « Informations »', async ({ page: browser }) => {
      await browser.goto(page.path);
      await browser.locator('.site-header [data-open-info]').click();
      const dialog = browser.getByRole('dialog', { name: 'Informations' });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading', { name: 'Sources' })).toBeVisible();
      await dialog.getByRole('button', { name: 'Fermer' }).click();
      await expect(dialog).toBeHidden();
    });

    test('quiz gives feedback', async ({ page: browser }) => {
      test.skip(Boolean(page.noQuiz), 'No quiz on this page.');
      await browser.goto(page.path);
      const first = browser.locator('.quiz__question').first();
      await first.locator('.choice').first().click();
      await expect(first.locator('.feedback')).toBeVisible();
    });
  });
}

test('root page: QR-code welcome sheet links to the three experiences', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Patrimoine catholique/);
  const links = page.locator('a.qr');
  await expect(links).toHaveCount(3);
  await expect(links.locator('svg')).toHaveCount(3);
  for (const name of ['cathedrale_de_noumea', 'histoire_ecole_amj', 'eglises_nc']) {
    await expect(page.locator(`a.qr[href="./${name}/"]`)).toHaveCount(1);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test('school history: order game can be completed', async ({ page }) => {
  await page.goto('histoire_ecole_amj/');
  for (const text of ['Sœurs de Cluny', 'Mulsant', 'ouvre ses portes', 'parents', 'Monique Purini']) {
    await page.locator('.order-card', { hasText: text }).click();
  }
  await expect(page.locator('.order-game__feedback')).toContainText('Bravo');
});

test('cathedral: every step has its activity', async ({ page }) => {
  await page.goto('cathedrale_de_noumea/');
  await expect(page.locator('.step')).toHaveCount(8);
  await expect(page.locator('.step .activity')).toHaveCount(8);
});
