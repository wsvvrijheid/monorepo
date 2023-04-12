// TODO: Never use Full API token in the browser, only use it on the server
// TODO: Use READONLY API token in the browser
export const TOKEN = process.env['NX_API_TOKEN']

const secrets = {
  COOKIE_PASSWORD: process.env['NX_SECRET_COOKIE_PASSWORD'],
  DEEPL_API_KEY: process.env['NX_DEEPL_API_KEY'],
  MOLLIE_KEY: process.env['NX_MOLLIE_KEY'],
}

type Secrets = keyof typeof secrets

export const getSecret = (key: Secrets, path?: string) => {
  if (typeof window !== 'undefined') {
    throw new Error(key + path + ' secret should only be used on the server')
  }

  return secrets[key]
}

export const sessionOptions = (path: string) => ({
  password:
    getSecret('COOKIE_PASSWORD', path) || '12345678901234567890123456789012',
  cookieName: 'iron-session',
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
  },
})
