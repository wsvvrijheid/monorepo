import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'

import { PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'
import { ProjectApp } from '../types'

dotenv.config({ path: '.env.local' })

const projectsWithLogin: ProjectApp[] = ['kunsthalte', 'wsvvrijheid']

for (const project of projectsWithLogin) {
  test(`Login for ${project}`, async ({ page }) => {
    const homePage = new HomePage(page, project)
    const loginPage = new LoginPage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })

    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await page.waitForNavigation()
    await expect(page).toHaveURL(homePage.url)
  })
}