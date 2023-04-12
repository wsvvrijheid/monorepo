// TODO: Never use Full API token in the browser, only use it on the server
// TODO: Use READONLY API token in the browser
export const TOKEN = process.env['NX_API_TOKEN']

const secrets = {
  COOKIE_PASSWORD: process.env['NX_SECRET_COOKIE_PASSWORD'],
  DEEPL_API_KEY: process.env['NX_DEEPL_API_KEY'],
  MOLLIE_KEY: process.env['NX_MOLLIE_KEY'],
}

type Secrets = keyof typeof secrets

export const getSecret = (key: Secrets) => {
  if (typeof window !== 'undefined') {
    throw new Error('Secrets should only be used on the server')
  }

  return secrets[key]
}
