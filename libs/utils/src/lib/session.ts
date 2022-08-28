import { COOKIE_PASSWORD } from '@wsvvrijheid/config'

export const sessionOptions = {
  password: COOKIE_PASSWORD,
  cookieName: 'iron-session',
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
  },
}
