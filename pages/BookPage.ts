import type { Locator, Page } from '@playwright/test';

export class BookPage {
  static readonly url = process.env.BOOK_URL || '';
  private static readonly cartUrl = process.env.CART_URL || '';

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
    const waitTimeout = Number(process.env.WAIT_TIMEOUT) || 10000;
    await this.page.goto(BookPage.url, { waitUntil: 'domcontentloaded' });
    await this.cartActionButton.waitFor({ state: 'visible', timeout: waitTimeout });
  }

  async addToCart() {
    const clickTimeout = Number(process.env.CLICK_TIMEOUT) || 10000;
    
    if (await this.goToCartButton.isVisible()) {
      return;
    }

    await this.addToCartButton.waitFor({ state: 'visible', timeout: clickTimeout });
    await this.addToCartButton.click({ timeout: clickTimeout }).catch(async () => {
      await this.addToCartButton.evaluate((button: HTMLElement) => button.click());
    });
    await this.goToCartButton.waitFor({ state: 'visible', timeout: clickTimeout });
  }

  async openCart() {
    await this.page.goto(BookPage.cartUrl, { waitUntil: 'domcontentloaded' });
  }
}
