import type { Locator, Page } from '@playwright/test';
import { config } from '../env';

export class HomePage {
  static readonly url = config.baseUrl;

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

  async closePopupIfVisible(timeout = config.popupTimeout) {
    try {
      const closeIcon = this.closeIcon.first();

      await closeIcon.waitFor({ state: 'visible', timeout });
      await closeIcon.click();
    } catch {
      try {
        await this.closeButton.waitFor({ state: 'visible', timeout: 1000 });
        await this.closeButton.click();
      } catch {
        console.log(config.popupCloseMessage);
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
    await this.searchResults.waitFor({ state: 'visible', timeout: config.searchTimeout });
    await this.page.waitForTimeout(config.smallWait);
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
