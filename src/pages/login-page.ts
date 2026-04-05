import { Locator, Page } from "@playwright/test";
import { LoginAlert } from "../types";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage{

  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly continueButton: Locator;
  private readonly signInButton: Locator;
  private readonly alertIcon: Locator;
  private readonly alertHeaderText: Locator;
  private readonly alertMessage: Locator;

  constructor(page: Page) {

    super(page);

    this.emailInput = page.getByRole('textbox', { name: 'Email' });

    this.passwordInput = page.locator('#ap_password');

    this.continueButton = page.getByRole('button', { name: 'Continue' });

    this.signInButton = page.locator('#signInSubmit');

    this.alertIcon = page
      .locator('i.a-icon-alert')
      .nth(0);

    this.alertHeaderText = page.getByRole('heading', { name: 'There was a problem' });

    this.alertMessage = page.getByText('We cannot find an account with that email address');
  }

  async enterEmailAndContinue(email: string) {
    await this.emailInput.fill(email);

    await this.continueButton.click();
  }

  async enterPasswordAndSignIn(password: string) {
    await this.passwordInput.fill(password);

    await this.signInButton.click();
  }

  async verifyOnUnSuccessfulLoginAlert(): Promise<LoginAlert> {
    await this.alertIcon.waitFor({ timeout: 2000 });

    const obj:LoginAlert = {
      isAlrtIconDisplayed: await this.alertIcon.isVisible(),
      isAlertHeaderDisplayed: await this.alertHeaderText.isVisible(),
      isAlertMessage: await this.alertMessage.isVisible(),
    };

    return obj;
  }
}
