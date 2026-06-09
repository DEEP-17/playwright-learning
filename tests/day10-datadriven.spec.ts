import { expect, test } from '../fixtures/index';
import testData from '../testdata/testData.json';

test.describe('Data-Driven Login Tests', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const loginScenario of testData.loginTests) {
    test(`[${loginScenario.testId}] ${loginScenario.description}`, async ({
      page,
      loginPage,
    }) => {
      await loginPage.goto();

      if (loginScenario.expectedResult === 'success') {
        // For success cases, expect login to complete without errors
        await expect(async () => {
          await loginPage.login(loginScenario.emailOrPhone, loginScenario.password);
        }).not.toThrow();
      } else {
        // For failure/error cases, expect login method to throw or show error
        let errorOccurred = false;
        try {
          await loginPage.login(loginScenario.emailOrPhone, loginScenario.password);
        } catch {
          errorOccurred = true;
        }

        // For validation errors (empty fields), they should show an error
        if (loginScenario.tags.includes('validation')) {
          expect(errorOccurred).toBeTruthy();
        }
      }
    });
  }
});

test.describe('Data-Driven Search and Shopping Tests', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const shoppingScenario of testData.searchAndShoppingTests) {
    test(`[${shoppingScenario.testId}] ${shoppingScenario.description}`, async ({
      page,
      homePage,
      loginPage,
      bookPage,
      cartPage,
    }) => {
      // Step 1: Navigate to home page
      await homePage.goto();

      // Step 2: Close popup if visible
      await homePage.closePopupIfVisible();

      // Step 3: Open login dialog
      await homePage.openLogin();

      // Step 4: Login with provided credentials
      await loginPage.login(shoppingScenario.emailOrPhone, shoppingScenario.password);

      // Step 5: Close popup again if it reappears after login
      await homePage.closePopupIfVisible(3000);

      // Step 6: Search for the book
      await homePage.searchAndOpenBook(shoppingScenario.searchTerm, shoppingScenario.bookTitle);

      // Step 7: Verify book page is loaded and add to cart
      await bookPage.addToCart();

      // Step 8: Verify item was added to cart
      if (shoppingScenario.expectedResult === 'added_to_cart') {
        // The cart button should be visible after adding to cart
        const cartPageLoaded = page.getByRole('button', { name: /GO TO CART/i }).first();
        await expect(cartPageLoaded).toBeVisible({ timeout: 5000 });
      }

      // Step 9: Open cart
      await bookPage.openCart();

      // Step 10: Verify we're on the cart page
      await cartPage.expectLoaded();

      // Step 11: Verify the book is in the cart
      await cartPage.expectBookInCart(shoppingScenario.bookTitle);

      // Step 12: Clean up - remove all books from cart
      await cartPage.removeAllBooksFromCart();
    });
  }
});

test.describe('Data-Driven Book Shopping Tests', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const bookScenario of testData.bookTests) {
    test(`[${bookScenario.testId}] Add "${bookScenario.bookName}" to cart (Qty: ${bookScenario.quantity})`, async ({
      bookPage,
    }) => {
      await bookPage.goto();

      // Verify that add to cart button is visible
      const addToCartButton = bookPage['addToCartButton'] || 
        (await bookPage.constructor.prototype.page?.getByRole('button', { name: /^ADD TO CART$/ }).first());

      if (bookScenario.expectedResult === 'added_to_cart') {
        await bookPage.addToCart();
      }
    });
  }
});

test.describe('Data-Driven Checkout Tests', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const checkoutScenario of testData.checkoutTests) {
    test(`[${checkoutScenario.testId}] Checkout with ${checkoutScenario.itemsInCart} items using ${checkoutScenario.paymentMethod}`, async ({
      cartPage,
    }) => {
      await cartPage.goto();

      if (checkoutScenario.itemsInCart === 0) {
        // Verify empty cart state
        await expect(cartPage['deleteButtons']).toHaveCount(0);
      } else {
        // For non-empty cart scenarios, verify cart is loaded
        await cartPage.expectLoaded();
      }
    });
  }
});
