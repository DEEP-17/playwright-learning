import { test } from '../fixtures';
import { config } from '../env';

// test.setTimeout(90 * 1000);

test('login and add book to cart', async ({ homePage, loginPage, bookPage, cartPage }) => {
    await homePage.goto();
    await homePage.closePopupIfVisible();

    await homePage.openLogin();
    await loginPage.login(config.userEmail, config.userPassword);

    await cartPage.goto();
    await cartPage.removeAllBooksFromCart();

    await homePage.goto();
    await homePage.closePopupIfVisible(3000);
    await homePage.searchAndOpenBook(config.searchTerm, config.bookTitle);

    await bookPage.addToCart();
    await homePage.closePopupIfVisible(3000);
    await bookPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectBookInCart(config.bookTitle);
});
