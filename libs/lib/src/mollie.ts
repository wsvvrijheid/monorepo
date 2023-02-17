import { createMollieClient } from '@mollie/api-client'
import { MOLLIE_KEY } from '@wsvvrijheid/config'

// https://github.com/mollie/mollie-api-node#a-note-on-use-outside-of-nodejs
export const mollieClient =
  typeof window === 'undefined' &&
  createMollieClient({ apiKey: MOLLIE_KEY as string })
