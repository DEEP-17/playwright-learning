import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  static readonly url = process.env.LOGIN_URL || "";
  private readonly emailOrPhoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly loginSuccessAlert: Locator;

  constructor(private readonly page: Page) {
    const successMessage = process.env.LOGIN_SUCCESS_MESSAGE || 'Logged in successfully';
    
    this.emailOrPhoneInput = page.getByRole('textbox', {
      name: 'Email address or Phone Number',
    });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByTestId('button');
    this.loginSuccessAlert = page
      .getByRole('alert')
      .filter({ hasText: successMessage });
  }

  async goto() {
    await this.page.goto(LoginPage.url, { waitUntil: 'domcontentloaded' });
  }

  async login(emailOrPhone: string, password: string) {
    const waitTimeout = Number(process.env.WAIT_TIMEOUT) || 10000;
    
    await this.emailOrPhoneInput.fill(emailOrPhone);
    await this.submitButton.click();
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.loginSuccessAlert.waitFor({ state: 'visible', timeout: waitTimeout });
  }
}
