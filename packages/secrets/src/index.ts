// TODO: Never use Full API token in the browser, only use it on the server
// TODO: Use READONLY API token in the browser
export const TOKEN = process.env['NEXT_PUBLIC_API_TOKEN']
export const VOLUNTEER_TOKEN = process.env['NEXT_PUBLIC_VOLUNTEER_TOKEN']

const secrets = {
  COOKIE_PASSWORD: process.env['SECRET_COOKIE_PASSWORD'],
  DEEPL_API_KEY: process.env['DEEPL_API_KEY'],
  MOLLIE_KEY: process.env['MOLLIE_KEY'],
  RECAPTCHA_SECRET_KEY: process.env['RECAPTCHA_SECRET_KEY'],
}

type Secrets = keyof typeof secrets

export const getSecret = (key: Secrets) => {
  if (typeof window !== 'undefined') {
    // console.error(key + ' secret should only be used on the server')

    return
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
