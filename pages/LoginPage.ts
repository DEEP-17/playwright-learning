import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  static readonly url = 'https://bookscape.com/login';

  private readonly emailOrPhoneInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly loginSuccessAlert: Locator;

  constructor(private readonly page: Page) {
    this.emailOrPhoneInput = page.getByRole('textbox', {
      name: 'Email address or Phone Number',
    });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByTestId('button');
    this.loginSuccessAlert = page
      .getByRole('alert')
      .filter({ hasText: 'Logged in successfully' });
  }

  async goto() {
    await this.page.goto(LoginPage.url, { waitUntil: 'domcontentloaded' });
  }

  async login(emailOrPhone: string, password: string) {
    await this.emailOrPhoneInput.fill(emailOrPhone);
    await this.submitButton.click();
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.loginSuccessAlert.waitFor({ state: 'visible', timeout: 10000 });
  }
}
