import {
  StrapiLocale,
  StrapiModel,
  StrapiResponse,
  StrapiUrl,
} from '@wsvvrijheid/types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import qs from 'qs'

import { fetcher } from './fetcher'

type Request = {
  url: `api/${StrapiUrl}`
  id?: number
  token?: string
  locale?: StrapiLocale
  filters?: { [key: string]: unknown }
  populate?: string | string[]
  sort?: string | string[]
  page?: number
  pageSize?: number
  publicationState?: 'live' | 'preview'
}

export const request = async <T extends StrapiModel | StrapiModel[]>({
  url,
  id,
  token,
  locale,
  filters,
  populate = '*',
  sort,
  page = 1,
  pageSize = 25,
  publicationState = 'live',
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

  const requestUrl = `${url}${id ? `/${id}` : ''}?${query}`

  try {
    const response = (await fetcher(token)(requestUrl)) as AxiosResponse<
      StrapiResponse<T>
    >

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
