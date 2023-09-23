import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'
import { getVercelUrl } from '@wsvvrijheid/playwright'
dotenv.config({ path: '.env.local' })

test('login foundation', async ({ page }) => {
  await page.goto(getVercelUrl('wsvvrijheid'), {
    waitUntil: 'domcontentloaded',
  })
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
  await expect(page).toHaveURL(getVercelUrl('wsvvrijheid'))
})
