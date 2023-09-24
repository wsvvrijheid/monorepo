import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.getByTestId('input-email')
    this.passwordInput = page.getByTestId('input-password')
    this.submitButton = page.getByTestId('button-submit-login')
  }

  async fillUsername(username: string) {
    await this.usernameInput.click()
    await this.usernameInput.fill(username)
  }

  async fillPassword(password: string) {
    await this.passwordInput.click()
    await this.passwordInput.fill(password)
  }

  async submit() {
    await this.submitButton.click()
  }

  async login(username: string, password: string) {
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.submit()
  }
}
