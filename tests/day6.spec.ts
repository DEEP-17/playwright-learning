import { test, expect } from '@playwright/test';
 
test('All Assertions Practice', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(page).toHaveURL('https://automationexercise.com/');

  const productsLink = page.getByRole('link', { name: 'Products' });
  await expect(productsLink).toBeVisible();
  await expect(productsLink).toBeEnabled();

  await expect(productsLink).toContainText('Products');

  const menuItems = page.locator('ul.nav.navbar-nav li');
  await expect(menuItems).toHaveCount(8);
  await expect(productsLink).toHaveAttribute('href','/products');
  await page.getByRole('link', {name: 'Signup / Login'}).click();
  const emailInput = page.locator( 'input[data-qa="login-email"]');
  await expect(emailInput).toHaveValue('');
  await emailInput.fill('test@test.com');
  await expect(emailInput).toHaveValue('test@test.com');
  await expect.soft(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await expect.soft(page.locator('form[action="/login"]')).toBeVisible();
});
test('Soft Assertions', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect.soft(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Products' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Cart' })).toBeVisible();
});
test('Auto Waiting Concept', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page).toHaveURL(/.*login/);
});
test('Take Screenshots', async ({ page }) => {
  await page.goto('https://automationexercise.com/'); 
  await page.screenshot({ path: 'screenshots/full-page.png' });
  await page.locator('.logo').screenshot({ path: 'screenshots/logo.png' });
});
test('Timeouts Example', async ({ page }) => {
  test.setTimeout(60000); 
  await page.goto('https://automationexercise.com/');
  await expect(page.getByRole('link', { name: 'Products' })).toBeVisible({ timeout: 10000 });
});
test('Debugging using Pause', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  // await page.pause(); 
  await expect(page).toHaveTitle(/Automation Exercise/);
});
test.describe('Parallel and Retry Suite', () => {
  test.describe.configure({ mode: 'parallel', retries: 2 });
  test('Parallel Test 1', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL('https://automationexercise.com/');
  });
  test('Parallel Test 2', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    await expect(page).toHaveTitle(/Automation Exercise/);
  });
});
