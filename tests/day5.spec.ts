import { test, expect ,Page} from '@playwright/test';

test('new page using browser context fixture', async ({ browser }) => {
  test.setTimeout(120000);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.amazon.in');
  await page.getByText('Air Conditioners').first().click();
  const newPagePromise = context.waitForEvent('page');
  await page.getByRole('link', {name: 'Samsung 1.5 Ton 5 Star (5-in-'}).click();
  const newPage = await newPagePromise;
  await newPage.waitForLoadState();
  console.log(await newPage.title());
  console.log(newPage.url());
  await context.close();
});
test('Handling Alerts and Prompts', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async dialog => {
    console.log(dialog.type());
    console.log(dialog.message());
    if (dialog.type() === 'prompt') {
      await dialog.accept('Playwright');
    } else {
      await dialog.accept();
    }
  });
  await page.getByRole('button', {name: 'Click for JS Alert'}).click();
  await page.getByRole('button', {name: 'Click for JS Confirm'}).click();
  await page.getByRole('button', {name: 'Click for JS Prompt'}).click();
  await expect(page.getByText('You entered')).toHaveText('You entered: Playwright');
});
test('Handling Frames', async ({ page }) => {
  test.setTimeout(120000);
 await page.goto('https://demoqa.com/nestedframes');

const childFrame = page
  .frameLocator('#frame1')
  .frameLocator('iframe');

const text = await childFrame.locator('p').textContent();

console.log(text);
});