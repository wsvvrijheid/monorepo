import { ROUTES } from '@wsvvrijheid/config'
import { StrapiEndpoint } from '@wsvvrijheid/types'

export const getMainPageLink = (endpoint: StrapiEndpoint): string =>
  (ROUTES as any)[endpoint].link.replace('/', '')
