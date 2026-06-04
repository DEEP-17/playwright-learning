import type { Locator, Page } from '@playwright/test';

export class HomePage {
  static readonly url = 'https://bookscape.com/';

  private readonly closeButton: Locator;
  private readonly closeIcon: Locator;
  private readonly signInButton: Locator;
  private readonly searchInput: Locator;
  private readonly searchResults: Locator;

  constructor(private readonly page: Page) {
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.closeIcon = page.getByAltText('Close');
    this.signInButton = page.getByRole('button', { name: 'SIGN IN' });
    this.searchInput = page.locator('input[name="searchInput"]').first();
    this.searchResults = page.locator('.absolute.left-0').first();
  }

  async goto() {
    await this.page.goto(HomePage.url, { waitUntil: 'domcontentloaded' });
  }

  async closePopupIfVisible(timeout = 5000) {
    try {
      const closeIcon = this.closeIcon.first();

      await closeIcon.waitFor({ state: 'visible', timeout });
      await closeIcon.click();
    } catch {
      try {
        await this.closeButton.waitFor({ state: 'visible', timeout: 1000 });
        await this.closeButton.click();
      } catch {
        console.log('Popup not displayed');
      }
    }
  }

  async openLogin() {
    await this.signInButton.click();
  }

  async searchBook(searchText: string) {
    await this.searchInput.pressSequentially(searchText);
  }

  async openSearchResult(bookTitle: string) {
    await this.searchResults.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForTimeout(500); // Allow dropdown to fully render
    await this.searchResults
      .locator('div')
      .filter({ hasText: exactText(bookTitle) })
      .first()
      .click();
  }

  async searchAndOpenBook(searchText: string, bookTitle: string) {
    await this.searchBook(searchText);
    await this.openSearchResult(bookTitle);
  }
}

function exactText(text: string) {
  const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${escapedText}$`);
}
