import { StrapiLocale } from '@wsvvrijheid/types'
import qs from 'qs'

import { fetcher } from './fetcher'

type Request = {
  url: string
  publicationState: 'live' | 'preview'
  locale: StrapiLocale
  filters?: { [key: string]: string }
  populate?: '*' | string | string[]
  sort?: string | string[]
  page?: number
  pageSize?: number
}

export const request =
  (token?: string) =>
  async ({
    publicationState = 'live',
    locale,
    url,
    filters,
    populate = '*',
    sort,
    page = 1,
    pageSize = 25,
  }: Request) => {
    const query = qs.stringify(
      {
        publicationState,
        locale,
        populate,
        filters,
        sort,
        pagination: {
          page,
          pageSize,
        },
      },
      {
        encodeValuesOnly: true,
      },
    )

    try {
      const response = await fetcher(token)(`/${url}?${query}`)

      return response.data
    } catch (error: any) {
      // TODO Consider a better error handling
      console.error(
        'Request error',
        error.data || error.response || error.message,
      )
      return null
    }
  }
