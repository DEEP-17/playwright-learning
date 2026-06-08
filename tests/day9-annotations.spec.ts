import { expect, test } from '@playwright/test';

const focusableTest = process.env.PW_ONLY_DEMO === 'true' ? test.only : test;

test.describe('Day 10 - Annotations in Playwright @annotations', () => {
  test('adds custom report annotations @smoke', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'owner', description: 'automation-training' });
    testInfo.annotations.push({ type: 'feature', description: 'annotations' });

    await page.setContent('<h1>Annotation training</h1>');

    await expect(page.getByRole('heading', { name: 'Annotation training' })).toBeVisible();
  });

  test.skip('skip annotation example @skip-demo', async () => {
    throw new Error('This skipped test should never execute.');
  });

  test.fixme('fixme annotation example @fixme-demo', async () => {
    throw new Error('This known-broken test is documented without running.');
  });

  focusableTest('only annotation example when PW_ONLY_DEMO=true @only-demo', async ({ page }) => {
    await page.setContent('<h1>Focused training run</h1>');

    await expect(page.getByRole('heading', { name: 'Focused training run' })).toBeVisible();
  });
});
