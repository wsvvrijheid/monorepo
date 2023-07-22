export const SITE_URL =
  process.env['NEXT_PUBLIC_SITE_URL'] || `https://${process.env['VERCEL_URL']}`

const VERCEL_ENV = process.env['VERCEL_ENV'] || 'development'

const assetUrls: Record<string, string> = {
  development: 'http://localhost:1337',
  production: 'https://api.wsvvrijheid.nl',
  staging: 'https://wsvv-api-staging.onrender.com',
}

export const ADMIN_MODE = process.env['NEXT_PUBLIC_ADMIN_MODE'] === 'true'
export const API_URL = process.env['NEXT_PUBLIC_API_URL']
export const ASSETS_URL = process.env['NEXT_PUBLIC_ASSETS_URL']
export const ASSETS_CALLBACK_URL = assetUrls[VERCEL_ENV]
export const COMMENT_TOKEN = process.env['NEXT_PUBLIC_COMMENT_TOKEN']
export const EMAIL_RECEIVER = process.env['NEXT_PUBLIC_EMAIL_RECEIVER']
export const EMAIL_SENDER = process.env['NEXT_PUBLIC_EMAIL_SENDER']
export const GA_MEASUREMENT_ID = process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID']
export const RECAPTCHA_SITE_KEY = process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY']
export const RECAPTCHA_SECRET_KEY =
  process.env['NEXT_PUBLIC_RECAPTCHA_SECRET_KEY']
export const IS_PROD = process.env['NODE_ENV'] === 'production'
