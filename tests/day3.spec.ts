import { test, expect, Page, Browser } from '@playwright/test';

test('login and search book', async ({ page }) => {
    await page.goto('https://bookscape.com');

    const closeButton = page.getByRole('button', { name: 'Close' });
    try {
        await closeButton.waitFor({
            state: 'visible',
            timeout: 5000
        });

        await closeButton.click();
    } catch {
        console.log('Popup not displayed');
    }
    // Login
    await page.getByRole('button', { name: 'SIGN IN' }).click();

    await page.getByRole('textbox', {name: 'Email address or Phone Number'}).fill('mxilz51430@minitts.net');
    await page.getByTestId('button').click();
    await page.getByRole('textbox', {name: 'Password'}).fill('mxilz51430@minitts.neT');

    await page.getByTestId('button').click();
    // Close popup again if it reappears after login
    try {
        await closeButton.waitFor({
            state: 'visible',
            timeout: 3000
        });

        await closeButton.click();
    } catch {
        console.log('Popup not displayed after login');
    }

    // Search
    const searchInput = page.locator(
        'xpath=/html/body/div[1]/div[1]/nav/div[3]/div[2]/div[2]/div/div/form/input'
    );
    await searchInput.pressSequentially('NCERT');
    await page.pause();
    const searchResult = page.locator('.absolute.left-0').first();
    await page.getByText('NCERT SCIENCE [HINDI]').first().click();
    const addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    await addToCartButton.click();
    const cartButton = page.getByRole('link', { name: 'Cart' });
    await cartButton.click();
    await page.pause();
});