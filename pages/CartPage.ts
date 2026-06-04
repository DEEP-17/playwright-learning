import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  static readonly url = 'https://bookscape.com/shopping-cart';

  private readonly deleteButtons: Locator;
  private readonly confirmRemoveButton: Locator;

  constructor(private readonly page: Page) {
    this.deleteButtons = page.getByAltText('cart-delete');
    this.confirmRemoveButton = page.getByRole('button', { name: 'REMOVE' });
  }

  async goto() {
    await this.page.goto(CartPage.url, { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(CartPage.url);
  }

  async expectBookInCart(bookTitle: string) {
    await expect(this.page.getByText(bookTitle).first()).toBeVisible();
  }

  async removeAllBooksFromCart() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.deleteButtons.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);

    for (let attempt = 0; attempt < 10; attempt++) {
      const deleteButtonCount = await this.deleteButtons.count();

      if (deleteButtonCount === 0) {
        return;
      }

      await this.deleteButtons.first().click();
      await this.confirmRemoveButton.click({ timeout: 10000 });
      await expect
        .poll(async () => this.deleteButtons.count(), { timeout: 10000 })
        .toBeLessThan(deleteButtonCount)
        .catch(async () => {
          await this.page.reload({ waitUntil: 'domcontentloaded' });
          await this.deleteButtons.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);
        });
    }

    await expect(this.deleteButtons).toHaveCount(0);
  }
}
