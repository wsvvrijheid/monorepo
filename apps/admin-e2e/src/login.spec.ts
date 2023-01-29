import { expect, test } from '@playwright/test'

test('Should fill credentials', async ({ page }) => {
  await page.goto('/login')
  const emailInput = page.locator('input[name="email"]')
  const passwordInput = page.locator('input[name="password"]')
  const loginButton = page.locator('button[type="submit"]')

  await emailInput.fill('test@samenvvv.nl')
  await passwordInput.fill('Test?123')
  await loginButton.click()

  await page.waitForNavigation({ url: 'http://localhost:4200/' })
  const url = page.url()

  expect(url).toBe('http://localhost:4200/')
})
