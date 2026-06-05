import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export type LoginPageFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<LoginPageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
