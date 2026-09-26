import { expect, test } from '@playwright/test';

const PAGE = 'eglises_nc/';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE);
  await expect(page.locator('.leaflet-marker-icon').first()).toBeVisible();
});

test('search by name opens the church, accents optional', async ({ page }) => {
  await page.fill('#recherche', 'eglise saint francois de sales');
  const first = page.locator('.result').first();
  await expect(first).toContainText('Église Saint-François-de-Sales');
  await first.click();
  const detail = page.locator('#detail');
  await expect(detail).toBeVisible();
  await expect(detail.getByRole('heading', { level: 2 })).toHaveText('Église Saint-François-de-Sales');
  await expect(page).toHaveURL(/#eglise-\d+$/);
  await expect(page.locator('.pin.is-selected')).toBeVisible();
});

test('Enter opens the first result; an unknown name says so', async ({ page }) => {
  await page.fill('#recherche', 'zzzz');
  await expect(page.locator('#count')).toContainText('Aucun lieu');
  await page.fill('#recherche', 'thio');
  await page.press('#recherche', 'Enter');
  await expect(page.locator('#detail')).toBeVisible();
});

test('tapping a pin on the map opens its detail', async ({ page }) => {
  // Bélep is an isolated island: once zoomed in, its pin is not clustered.
  await page.fill('#recherche', 'bélep');
  await page.locator('.result').first().click();
  await page.locator('.detail__close').click();
  await expect(page.locator('#detail')).toBeHidden();
  await page.locator('.leaflet-marker-icon[title="Église de Bélep"]').click();
  await expect(page.locator('#detail').getByRole('heading', { level: 2 })).toHaveText('Église de Bélep');
});

test('a cluster zooms in when tapped', async ({ page }) => {
  const zoomBefore = await page.evaluate(() => document.querySelector('.leaflet-proxy')?.style.transform);
  await page.locator('.leaflet-marker-icon.cluster').first().click();
  await expect
    .poll(() => page.evaluate(() => document.querySelector('.leaflet-proxy')?.style.transform))
    .not.toBe(zoomBefore);
});

test('deep link opens a church directly', async ({ page }) => {
  await page.goto(`${PAGE}#eglise-57`);
  const detail = page.locator('#detail');
  await expect(detail.getByRole('heading', { level: 2 })).toHaveText('Cathédrale Saint-Joseph');
  await expect(detail.locator('img')).toBeVisible();
  await expect(detail.getByRole('link', { name: /Découvrir la cathédrale/ })).toBeVisible();
});

test('legend filters church types in map and list', async ({ page }) => {
  await page.locator('#legend-toggle').click();
  await page.getByLabel(/Chapelles/).uncheck();
  await page.fill('#recherche', 'chapelle');
  await expect(page.locator('.result', { hasText: /^Chapelle/ })).toHaveCount(0);
});

test('the list shows every place and leads back to the map', async ({ page, viewport }) => {
  test.skip(viewport.width >= 768, 'The Carte / Liste switch exists on phones only.');
  await page.getByRole('button', { name: 'Liste' }).click();
  await expect(page.locator('#map')).toBeHidden();
  await expect(page.locator('.result')).toHaveCount(111);
  await page.locator('.result', { hasText: 'Église de Bélep' }).click();
  await page.getByRole('button', { name: 'Voir sur la carte' }).click();
  await expect(page.locator('#map')).toBeVisible();
  await expect(page.locator('.pin.is-selected')).toBeVisible();
});

test('the list still works when the map cannot load', async ({ page }) => {
  await page.route(/\/assets\/map-[^/]*\.js$/, (route) => route.abort());
  await page.goto(PAGE);
  await expect(page.locator('#explorer')).toHaveClass(/no-map/);
  await expect(page.locator('.result').first()).toBeVisible();
  await expect(page.locator('.result')).toHaveCount(111);
  await page.fill('#recherche', 'bélep');
  await page.locator('.result').first().click();
  await expect(page.locator('#detail')).toBeVisible();
});
