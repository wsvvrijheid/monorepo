import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()
console.log('url', process.env['PLAYWRIGHT_TEST_BASE_URL'])

test('login foundation', async ({ page }) => {
  console.log('url', process.env['PLAYWRIGHT_TEST_BASE_URL'])
  await page.goto(
    `https://wsvvrijheid-git-${process.env['PLAYWRIGHT_TEST_BASE_URL']}-wsvvrijheid.vercel.app/`,
    {
      waitUntil: 'domcontentloaded',
    },
  )
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
  await expect(page).toHaveURL(
    `https://wsvvrijheid-git-${process.env['PLAYWRIGHT_TEST_BASE_URL']}-wsvvrijheid.vercel.app/`,
  )
})
