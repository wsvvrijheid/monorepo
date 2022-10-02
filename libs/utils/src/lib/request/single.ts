import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { StrapiModel, StrapiSingleResponse } from '@wsvvrijheid/types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import qs from 'qs'

import { RequestSingleArgs } from './types'

export const requestSingle = async <T extends StrapiModel>({
  id,
  url,
  token = TOKEN,
  fields,
  locale,
  populate,
  publicationState,
}: RequestSingleArgs) => {
  const query = qs.stringify(
    { publicationState, locale, populate, fields },
    { encodeValuesOnly: true },
  )

  const requestUrl = `${API_URL}/${url}${id ? `/${id}` : ''}?${query}`

  try {
    const response = await fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!data || (data && !data.data)) {
      return { data: data as unknown as T, meta: {} }
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
      data: null,
      meta: {},
    }
  }
}
