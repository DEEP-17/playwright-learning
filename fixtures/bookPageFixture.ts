import { test as base } from '@playwright/test';
import { BookPage } from '../pages/BookPage';

export type BookPageFixtures = {
  bookPage: BookPage;
};

export const test = base.extend<BookPageFixtures>({
  bookPage: async ({ page }, use) => {
    const bookPage = new BookPage(page);
    await use(bookPage);
  },
});
