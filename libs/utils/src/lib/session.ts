export const sessionOptions = {
  password: process.env['NX_SECRET_COOKIE_PASSWORD'],
  cookieName: 'iron-session',
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
  },
}
