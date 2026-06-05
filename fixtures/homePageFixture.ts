import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export type HomePageFixtures = {
  homePage: HomePage;
};

export const test = base.extend<HomePageFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
