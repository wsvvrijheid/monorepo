import { expect, type Locator, type Page } from '@playwright/test'

import { ProjectApp } from '../types'
import { getVercelUrl } from '../utils'

export class HomePage {
  readonly page: Page
  readonly loginLink: Locator
  readonly project: ProjectApp

  constructor(page: Page, project: ProjectApp) {
    this.page = page
    this.loginLink = page.getByRole('link', { name: 'Sign in' })
    this.project = project
  }

  get url() {
    return getVercelUrl(this.project)
  }

  async gotoLogin() {
    await this.loginLink.click()
    expect(this.page).toHaveURL(`${this.url}/login`)
  }
}
