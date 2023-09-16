import { chromium, expect, test } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// If you get time out error then try to start the server manually and run the test again
// Before running the test, make sure port 3000 and 1337 are not in use
// If port is in use, you will get the following error:
// Error: Process from config.webServer was not able to start. Exit code: 1
// To kill the process run the following command:
// kill -9 $(lsof -t -i:PORT) on mac
test('login foundation', async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })

  await page.getByRole('button', { name: 'Allow' }).click()
  await page.getByRole('link', { name: 'Sign in' }).click()
  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill(process.env['username'] as string)
  await page.getByTestId('input-password').click()
  await page
    .getByTestId('input-password')
    .fill(process.env['password'] as string)
  await page.getByTestId('button-submit-login').click()
  await page.waitForNavigation()
  await expect(page).toHaveURL('http://localhost:3000/')

  await browser.close()
})
