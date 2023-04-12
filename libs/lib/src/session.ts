import { getSecret } from '@wsvvrijheid/secrets'

export const sessionOptions = {
  password: getSecret('COOKIE_PASSWORD') || '12345678901234567890123456789012',
  cookieName: 'iron-session',
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
  },
}
