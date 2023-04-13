import { COOKIE_PASSWORD } from '@wsvvrijheid/config'

export const sessionOptions = {
  password: COOKIE_PASSWORD || '12345678901234567890123456789012',
  cookieName: 'iron-session',
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
  },
}
