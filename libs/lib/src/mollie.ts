import { createMollieClient } from '@mollie/api-client'

import { getSecret } from '@wsvvrijheid/secrets'

// https://github.com/mollie/mollie-api-node#a-note-on-use-outside-of-nodejs
export const mollieClient = createMollieClient({
  apiKey: getSecret('MOLLIE_KEY') as string,
})
