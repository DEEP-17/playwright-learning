import { test, expect, Page, Browser } from '@playwright/test';
test.only('www.irctc.co.in', async ({ page }) => {
    await page.goto('https://www.irctc.co.in/nget/train-search');
    // await page.waitForLoadState('networkidle');
    const  fromButton= page.getByRole('searchbox', { name: 'Enter From station. Input is Mandatory.' });
    await fromButton.click();
    await fromButton.pressSequentially('Ahmedabad', { delay: 100 });
    const fromOption = page.locator('.ng-trigger');
    console.log(await fromOption.allTextContents());
    await page.locator('li')
  .filter({ hasText: 'ADI' }).first()
  .click();
 // Enter To station. Input is Mandatory.
    const  toButton= page.getByRole('searchbox', { name: 'Enter To station. Input is Mandatory.' });
    await toButton.click();
    await toButton.pressSequentially('Mumbai', { delay: 100 });
    const toOption = page.locator('.ng-trigger');
    console.log(await toOption.allTextContents());
    await page.locator('li')
  .filter({ hasText: 'MMCT' }).first()
  .click();
//   await page.pause();
//   const dateButton = page.locator('.ng-tns-c69-9.ui-inputtext.ui-widget.ui-state-default.ui-corner-all.ng-star-inserted');
//   await dateButton.click();
//   const datePicker = page.locator('.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c69-9.ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all.ui-shadow.ng-star-inserted');

// const nextMonthButton = datePicker.locator('.ui-datepicker-next');
// await nextMonthButton.click();
// await nextMonthButton.click();
//   await page.pause();
//   const dateShowing = datePicker.locator('div').filter({ hasText: /^August2026$/ }).first();
const dateButton = page.locator(
  '.ng-tns-c69-9.ui-inputtext.ui-widget.ui-state-default.ui-corner-all.ng-star-inserted'
);

await dateButton.click();

const datePicker = page.locator(
  '.ng-trigger.ng-trigger-overlayAnimation.ng-tns-c69-9.ui-datepicker'
);

const nextMonthButton = datePicker.locator('.ui-datepicker-next');

// Keep clicking until October2026 is displayed
while (
  !(
    await datePicker.locator('.ui-datepicker-title').textContent()
  )?.includes('October2026')
) {
  await nextMonthButton.click();
}

// Select day 15
await datePicker
  .locator('td')
  .filter({ hasText: /^15$/ })
  .first()
  .click();
// const dateToSelect = datePicker.locator('.ui-datepicker-calendar').locator('td').filter({ hasText: '15' }).first();
// await dateToSelect.click();


await page.locator('.ui-dropdown-trigger').first().click();

await page.getByRole('option', {
  name: 'First Class (FC)'
}).click();
await page.locator('.ui-dropdown-trigger').nth(1).click();
await page.getByRole('option', {
  name: 'PREMIUM TATKAL'
}).click();
await page.getByText('Flexible With Date').check();

 await page.locator('.search_btn.train_Search').click();
  await page.pause();
});