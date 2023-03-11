export const VERCEL_URL = `https://${process.env['VERCEL_URL']}`
const BASE_URL = process.env['NX_SITE_URL']
const DEV_URL = 'http://localhost:4200'
const PROD_URL = BASE_URL || VERCEL_URL
const CLIENT_URL = typeof window !== 'undefined' && window.location.origin

export const SITE_URL =
  CLIENT_URL || process.env['NODE_ENV'] === 'development' ? DEV_URL : PROD_URL

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
