import { test } from '../fixtures';

// test.setTimeout(90 * 1000);

test('login and add book to cart', async ({ homePage, loginPage, bookPage, cartPage }) => {
    const userEmail = process.env.USER_EMAIL || '';
    const userPassword = process.env.USER_PASSWORD || '';
    const searchTerm = process.env.SEARCH_TERM || '';
    const bookTitle = process.env.BOOK_TITLE || '';

    await homePage.goto();
    await homePage.closePopupIfVisible();

    await homePage.openLogin();
    await loginPage.login(userEmail, userPassword);

    await cartPage.goto();
    await cartPage.removeAllBooksFromCart();

    await homePage.goto();
    await homePage.closePopupIfVisible(3000);
    await homePage.searchAndOpenBook(searchTerm, bookTitle);

    await bookPage.addToCart();
    await homePage.closePopupIfVisible(3000);
    await bookPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectBookInCart(bookTitle);
});
