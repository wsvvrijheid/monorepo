import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { StrapiMeta, StrapiModel } from '@wsvvrijheid/types'
import axios, { AxiosError } from 'axios'
import qs from 'qs'

import { RequestArgs } from './types'

export const requestCollection = async <T extends StrapiModel[]>({
  url,
  token = TOKEN,
  locale,
  fields,
  filters,
  populate = '*',
  sort,
  page = 1,
  pageSize = 25,
  publicationState = 'live',
}: RequestArgs): Promise<{ data: T; meta: StrapiMeta }> => {
  const query = qs.stringify(
    {
      publicationState,
      locale,
      populate,
      fields,
      filters,
      sort,
      pagination: { page, pageSize },
    },
    { encodeValuesOnly: true },
  )

  const requestUrl = `${API_URL}/${url}?${query}`

  try {
    const response = await fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!data || (data && !data.data)) {
      return {
        data: data as unknown as T,
        meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
      }
    }

    return data
  } catch (errr) {
    const error = errr as Error | AxiosError
    if (axios.isAxiosError(error)) {
      console.error('Request error', error.response?.data || error.message)
    } else {
      console.error('Request error', error.message)
    }
    return {
      data: [] as unknown as T,
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
    }
  }
}
