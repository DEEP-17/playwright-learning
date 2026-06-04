import { test } from '@playwright/test';
import { BookPage } from '../pages/BookPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

// test.setTimeout(90 * 1000);

test('login and add book to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const bookPage = new BookPage(page);
    const cartPage = new CartPage(page);

    await homePage.goto();
    await homePage.closePopupIfVisible();

    await homePage.openLogin();
    await loginPage.login('mxilz51430@minitts.net', 'mxilz51430@minitts.neT');

    await cartPage.goto();
    await cartPage.removeAllBooksFromCart();

    await homePage.goto();
    await homePage.closePopupIfVisible(3000);
    await homePage.searchAndOpenBook('NCERT GEOGRAPHY', 'NCERT GEOGRAPHY [HINDI]');

    await bookPage.addToCart();
    await homePage.closePopupIfVisible(3000);
    await bookPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectBookInCart('NCERT GEOGRAPHY [HINDI]');
});
