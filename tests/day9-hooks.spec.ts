import { expect, test } from '@playwright/test';

const hooksTrainingPage = `data:text/html,${encodeURIComponent(`
  <!doctype html>
  <html>
    <head>
      <title>Hook Training</title>
    </head>
    <body>
      <h1>Playwright Hooks</h1>
      <p data-testid="status">fresh</p>
      <p data-testid="counter">0</p>
      <button type="button" onclick="document.querySelector('[data-testid=status]').textContent = 'ready'">
        Mark ready
      </button>
      <button type="button" onclick="document.querySelector('[data-testid=counter]').textContent = '1'">
        Increment
      </button>
    </body>
  </html>
`)}`;

test.describe('Day 9 - Hooks in Playwright @hooks', () => {
  test.describe.configure({ mode: 'serial' });

  let suiteStartTime: string;
  let executedTests: string[];

  test.beforeAll(async () => {
    suiteStartTime = new Date().toISOString();
    executedTests = [];
  });

  test.beforeEach(async ({ page }, testInfo) => {
    executedTests.push(testInfo.title);
    await page.goto(hooksTrainingPage);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await testInfo.attach('hook-run-summary', {
      body: JSON.stringify(
        {
          suiteStartTime,
          title: testInfo.title,
          status: testInfo.status,
          url: page.url(),
        },
        null,
        2,
      ),
      contentType: 'application/json',
    });
  });

  test.afterAll(async () => {
    executedTests = [];
  });

  test('beforeEach creates fresh page state @smoke', async ({ page }) => {
    await expect(page).toHaveTitle('Hook Training');
    await expect(page.getByTestId('status')).toHaveText('fresh');

    await page.getByRole('button', { name: 'Mark ready' }).click();

    await expect(page.getByTestId('status')).toHaveText('ready');
  });

  test('beforeEach resets state for the next test @regression', async ({ page }, testInfo) => {
    await expect(page.getByTestId('counter')).toHaveText('0');

    await page.getByRole('button', { name: 'Increment' }).click();

    await expect(page.getByTestId('counter')).toHaveText('1');
    expect(executedTests).toContain(testInfo.title);
  });
});
