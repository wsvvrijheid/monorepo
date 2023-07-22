export const SITE_URL =
  process.env['NEXT_PUBLIC_SITE_URL'] || `https://${process.env['VERCEL_URL']}`

export const VERCEL_ENV = process.env['VERCEL_ENV'] || 'development'

const assetUrls: Record<string, string> = {
  development: 'http://localhost:1337',
  production: 'https://api.wsvvrijheid.nl',
  staging: 'https://wsvv-api-staging.onrender.com',
}

export const ADMIN_MODE = process.env['NEXT_PUBLIC_ADMIN_MODE'] === 'true'
export const API_URL = process.env['NEXT_PUBLIC_API_URL'] as string
export const ASSETS_URL = assetUrls.production
export const ASSETS_CALLBACK_URL = assetUrls[VERCEL_ENV] as string
export const COMMENT_TOKEN = process.env['NEXT_PUBLIC_COMMENT_TOKEN'] as string
export const EMAIL_RECEIVER = process.env[
  'NEXT_PUBLIC_EMAIL_RECEIVER'
] as string
export const EMAIL_SENDER = process.env['NEXT_PUBLIC_EMAIL_SENDER'] as string
export const GA_MEASUREMENT_ID = process.env[
  'NEXT_PUBLIC_GA_MEASUREMENT_ID'
] as string
export const RECAPTCHA_SITE_KEY = process.env[
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
] as string
export const RECAPTCHA_SECRET_KEY = process.env[
  'NEXT_PUBLIC_RECAPTCHA_SECRET_KEY'
] as string
export const IS_PROD = process.env['NODE_ENV'] === 'production'
