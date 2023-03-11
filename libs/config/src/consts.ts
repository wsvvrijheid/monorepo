export const VERCEL_URL = process.env['VERCEL_URL']
export const SITE_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:4200'
    : `https://${VERCEL_URL}`

export const API_URL = process.env['NX_API_URL']
export const TOKEN = process.env['NX_API_TOKEN']
export const EMAIL_SENDER = process.env['NX_EMAIL_SENDER']
export const EMAIL_RECEIVER = process.env['NX_NX_EMAIL_RECEIVER']
export const COOKIE_PASSWORD = process.env['NX_SECRET_COOKIE_PASSWORD']
export const DEEPL_API_KEY = process.env['NX_DEEPL_API_KEY']
export const GA_MEASUREMENT_ID = process.env['NX_GA_MEASUREMENT_ID']
export const IS_PROD = process.env['NODE_ENV'] === 'production'
export const DONATION_ENABLED = process.env['NX_DONATION_ENABLED'] === 'true'
export const MOLLIE_KEY = process.env['NX_MOLLIE_KEY']
