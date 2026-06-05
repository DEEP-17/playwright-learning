import type { Locator, Page } from '@playwright/test';

export class HomePage {
  static readonly url = process.env.BASE_URL || "";

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

  async closePopupIfVisible(timeout = Number(process.env.POPUP_TIMEOUT) || 5000) {
    try {
      const closeIcon = this.closeIcon.first();

      await closeIcon.waitFor({ state: 'visible', timeout });
      await closeIcon.click();
    } catch {
      try {
        await this.closeButton.waitFor({ state: 'visible', timeout: 1000 });
        await this.closeButton.click();
      } catch {
        console.log(process.env.POPUP_CLOSE_MESSAGE || 'Popup not displayed');
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
    const searchTimeout = Number(process.env.SEARCH_TIMEOUT) || 15000;
    const smallWait = Number(process.env.SMALL_WAIT) || 500;
    
    await this.searchResults.waitFor({ state: 'visible', timeout: searchTimeout });
    await this.page.waitForTimeout(smallWait);
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
