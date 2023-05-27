export const SITE_URL =
  process.env['NEXT_PUBLIC_SITE_URL'] || `https://${process.env['VERCEL_URL']}`

export const API_URL = process.env['NEXT_PUBLIC_API_URL']
export const ASSETS_URL = process.env['NEXT_PUBLIC_ASSETS_URL']
export const EMAIL_SENDER = process.env['NEXT_PUBLIC_EMAIL_SENDER']
export const EMAIL_RECEIVER = process.env['NEXT_PUBLIC_EMAIL_RECEIVER']
export const GA_MEASUREMENT_ID = process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID']
export const IS_PROD = process.env['NODE_ENV'] === 'production'
export const ADMIN_MODE = process.env['NEXT_PUBLIC_ADMIN_MODE'] === 'true'
