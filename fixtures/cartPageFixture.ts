import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';

export type CartPageFixtures = {
  cartPage: CartPage;
};

export const test = base.extend<CartPageFixtures>({
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});
