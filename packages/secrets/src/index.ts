const secrets = {
  COOKIE_PASSWORD: process.env['SECRET_COOKIE_PASSWORD'],
  DEEPL_API_KEY: process.env['DEEPL_API_KEY'],
  RECAPTCHA_SECRET_KEY: process.env['RECAPTCHA_SECRET_KEY'],
  STRIPE_KEY: process.env['STRIPE_KEY'],
  TOKEN: process.env['API_TOKEN'],
}

type Secrets = keyof typeof secrets

export const getSecret = (key: Secrets): string => {
  if (typeof window !== 'undefined') {
    // console.error(key + ' secret should only be used on the server')

    return ''
  }

  return secrets[key]
}

export const sessionOptions = {
  password: getSecret('COOKIE_PASSWORD') || '12345678901234567890123456789012',
  cookieName: 'iron-session',
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
  },
}
