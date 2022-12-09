import { expect, test } from '@playwright/test'

test('Should fill credentials', async ({ page }) => {
  await page.goto('/login')
  const emailButton = page.locator('input[name="email"]')
  const passwordButton = page.locator('input[name="password"]')
  const loginButton = page.locator('button[type="submit"]')

  await emailButton.fill('test@samenvvv.nl')
  await passwordButton.fill('Test?123')
  await loginButton.click()

  await page.waitForNavigation({ url: 'http://localhost:4200/' })
  const url = page.url()

  console.log('url', url)

  expect(url).toBe('http://localhost:4200/')
})
