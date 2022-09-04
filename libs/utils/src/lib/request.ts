import { StrapiLocale, StrapiModel, StrapiResponse } from '@wsvvrijheid/types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import qs from 'qs'

import { fetcher } from './fetcher'

type Request = {
  url: string
  publicationState?: 'live' | 'preview'
  locale?: StrapiLocale
  filters?: { [key: string]: unknown }
  populate?: string | string[]
  sort?: string | string[]
  page?: number
  pageSize?: number
}

export const request =
  (token?: string) =>
  async <T extends StrapiModel | StrapiModel[]>({
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
      const response = (await fetcher(token)(
        `/${url}?${query}`,
      )) as AxiosResponse<StrapiResponse<T>>

      if (!response.data || (response.data && !response.data.data)) {
        return { data: response.data as unknown as T, meta: {} }
      }

      return response.data
    } catch (errr) {
      const error = errr as Error | AxiosError
      if (axios.isAxiosError(error)) {
        console.error('Request error', error.response || error.message)
      } else {
        console.error('Request error', error.message)
      }
      return { data: null, meta: {} }
    }
  }
