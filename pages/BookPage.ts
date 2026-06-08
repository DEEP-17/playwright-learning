import { expect, type Locator, type Page } from '@playwright/test';
import { config } from '../env';

export class BookPage {
  static readonly url = config.bookUrl;
  private static readonly cartUrl = config.cartUrl;

  private readonly addToCartButton: Locator;
  private readonly goToCartButton: Locator;

  constructor(private readonly page: Page) {
    this.addToCartButton = page.getByRole('button', { name: /^ADD TO CART$/ }).first();
    this.goToCartButton = page.getByRole('button', { name: /GO TO CART/i }).first();
  }

  async goto() {
    await this.page.goto(BookPage.url, { waitUntil: 'domcontentloaded' });
    await this.waitForCartAction(config.waitTimeout);
  }

  async addToCart() {
    const action = await this.waitForCartAction(config.clickTimeout);

    if (action === 'go-to-cart') {
      return;
    }

    await this.addToCartButton.click({ timeout: config.clickTimeout }).catch(async () => {
      await this.addToCartButton.evaluate((button: HTMLElement) => button.click());
    });
    await this.goToCartButton.waitFor({ state: 'visible', timeout: config.clickTimeout });
  }

  async openCart() {
    await this.page.goto(BookPage.cartUrl, { waitUntil: 'domcontentloaded' });
  }

  private async waitForCartAction(timeout: number) {
    await expect
      .poll(async () => this.visibleCartAction(), { timeout })
      .not.toBe('waiting');

    return this.visibleCartAction();
  }

  private async visibleCartAction() {
    if (await this.goToCartButton.isVisible()) {
      return 'go-to-cart';
    }

    if (await this.addToCartButton.isVisible()) {
      return 'add-to-cart';
    }

    return 'waiting';
  }
}
