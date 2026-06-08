import { chromium, type FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AUTH_STATE_PATH } from './authState';
import { config as appConfig } from '../env';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

async function globalSetup(config: FullConfig) {
  const project = config.projects.find(({ name }) => name === 'chromium') ?? config.projects[0];
  const browser = await chromium.launch({
    headless: project.use.headless ?? true,
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: project.use.ignoreHTTPSErrors,
    userAgent: project.use.userAgent as string | undefined,
  });
  const page = await context.newPage();

  try {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.goto();
    await homePage.closePopupIfVisible();
    await loginPage.login(appConfig.userEmail, appConfig.userPassword);
    await fs.promises.mkdir(path.dirname(AUTH_STATE_PATH), { recursive: true });
    await context.storageState({ path: AUTH_STATE_PATH });
  } finally {
    await browser.close();
  }
}

export default globalSetup;
