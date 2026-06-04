import type { Locator, Page } from '@playwright/test';

export class BookPage {
  static readonly url =
    'https://bookscape.com/product-details/ncert-geography-hindi-9789351729938';
  private static readonly cartUrl = 'https://bookscape.com/shopping-cart';

  private readonly addToCartButton: Locator;
  private readonly goToCartButton: Locator;
  private readonly cartActionButton: Locator;

  constructor(private readonly page: Page) {
    this.addToCartButton = page.getByRole('button', { name: /^ADD TO CART$/ }).first();
    this.goToCartButton = page.getByRole('button', { name: /GO TO CART/i }).first();
    this.cartActionButton = page.getByRole('button', {
      name: /ADD TO CART|GO TO CART/i,
    }).first();
  }

  async goto() {
    await this.page.goto(BookPage.url, { waitUntil: 'domcontentloaded' });
    await this.cartActionButton.waitFor({ state: 'visible' });
  }

  async addToCart() {
    if (await this.goToCartButton.isVisible()) {
      return;
    }

    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartButton.click({ timeout: 10000 }).catch(async () => {
      await this.addToCartButton.evaluate((button: HTMLElement) => button.click());
    });
    await this.goToCartButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async openCart() {
    await this.page.goto(BookPage.cartUrl, { waitUntil: 'domcontentloaded' });
  }
}
