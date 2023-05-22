export const SITE_URL =
  process.env['NX_SITE_URL'] || `https://${process.env['VERCEL_URL']}`

export const API_URL = process.env['NX_API_URL']
export const ASSETS_URL = process.env['NX_ASSETS_URL']
export const EMAIL_SENDER = process.env['NX_EMAIL_SENDER']
export const EMAIL_RECEIVER = process.env['NX_NX_EMAIL_RECEIVER']
export const GA_MEASUREMENT_ID = process.env['NX_GA_MEASUREMENT_ID']
export const IS_PROD = process.env['NODE_ENV'] === 'production'
export const ADMIN_MODE = process.env['NX_ADMIN_MODE'] === 'true'
