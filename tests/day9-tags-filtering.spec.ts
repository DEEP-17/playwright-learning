import { expect, test } from '../fixtures';
import { config } from '../env';

test.describe('Day 11 - Tags and filtering @tags', () => {
  test('fast smoke filter example @smoke @fast', async ({ page }) => {
    await page.setContent('<h1>Smoke tagged test</h1>');

    await expect(page.getByRole('heading', { name: 'Smoke tagged test' })).toBeVisible();
  });

  test('regression filter example @regression', async ({ page }) => {
    await page.setContent(`
      <label>
        Search
        <input name="search" />
      </label>
    `);

    await page.getByLabel('Search').fill(config.searchTerm);

    await expect(page.getByLabel('Search')).toHaveValue(config.searchTerm);
  });

  test('auth filter example uses global storage state @auth @smoke', async ({ cartPage }) => {
    await cartPage.goto();

    await cartPage.expectLoaded();
  });
});
