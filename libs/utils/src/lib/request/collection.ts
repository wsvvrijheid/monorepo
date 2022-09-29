import {
  StrapiCollectionResponse,
  StrapiMeta,
  StrapiModel,
} from '@wsvvrijheid/types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import qs from 'qs'

import { fetcher } from '../fetcher'
import { RequestArgs } from './types'

export const requestCollection = async <T extends StrapiModel[]>({
  url,
  token,
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

  const requestUrl = `${url}?${query}`

  try {
    const response = (await fetcher(token)(requestUrl)) as AxiosResponse<
      StrapiCollectionResponse<T>
    >

    if (!response.data || (response.data && !response.data.data)) {
      return {
        data: response.data as unknown as T,
        meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
      }
    }

    return response.data
  } catch (errr) {
    const error = errr as Error | AxiosError
    if (axios.isAxiosError(error)) {
      console.error('Request error', error.response || error.message)
    } else {
      console.error('Request error', error.message)
    }
    return {
      data: [] as unknown as T,
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
    }
  }
}
