import type { Locator, Page } from '@playwright/test';
import { config } from '../env';

export class BookPage {
  static readonly url = config.bookUrl;
  private static readonly cartUrl = config.cartUrl;

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
    await this.cartActionButton.waitFor({ state: 'visible', timeout: config.waitTimeout });
  }

  async addToCart() {
    if (await this.goToCartButton.isVisible()) {
      return;
    }

    await this.addToCartButton.waitFor({ state: 'visible', timeout: config.clickTimeout });
    await this.addToCartButton.click({ timeout: config.clickTimeout }).catch(async () => {
      await this.addToCartButton.evaluate((button: HTMLElement) => button.click());
    });
    await this.goToCartButton.waitFor({ state: 'visible', timeout: config.clickTimeout });
  }

  async openCart() {
    await this.page.goto(BookPage.cartUrl, { waitUntil: 'domcontentloaded' });
  }
}
