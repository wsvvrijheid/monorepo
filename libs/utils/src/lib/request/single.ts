import { StrapiModel, StrapiSingleResponse } from '@wsvvrijheid/types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import qs from 'qs'

import { fetcher } from '../fetcher'
import { RequestSingleArgs } from './types'

export const requestSingle = async <T extends StrapiModel>({
  id,
  url,
  token,
  fields,
  locale,
  populate,
  publicationState,
}: RequestSingleArgs) => {
  const query = qs.stringify(
    { publicationState, locale, populate, fields },
    { encodeValuesOnly: true },
  )

  const requestUrl = `${url}/${id}?${query}`

  try {
    const response = (await fetcher(token)(requestUrl)) as AxiosResponse<
      StrapiSingleResponse<T>
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
    return {
      data: null,
      meta: {},
    }
  }
}
