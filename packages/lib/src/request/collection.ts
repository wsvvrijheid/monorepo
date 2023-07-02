import axios, { AxiosError } from 'axios'
import qs from 'qs'

import {
  API_URL,
  urlsWithLocalizedTitle,
  urlsWithoutLocale,
} from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import {
  StrapiCollectionUrl,
  StrapiMeta,
  StrapiModel,
} from '@wsvvrijheid/types'

import { RequestArgs } from './types'

export const requestCollection = async <T extends StrapiModel>({
  url,
  token = TOKEN,
  locale,
  fields,
  filters,
  populate = '*',
  sort = ['publishedAt:desc'],
  page = 1,
  pageSize = 25,
  includeDrafts = false,
}: RequestArgs<T>): Promise<{ data: T[]; meta: StrapiMeta }> => {
  const slug = url.split('/')[1] as StrapiCollectionUrl
  const hasLocale = !urlsWithoutLocale.includes(slug)

  const filterFields = fields?.map(field => {
    if (urlsWithLocalizedTitle.includes(slug)) {
      return `${field as string}_${locale}`
    }

    return field
  })

  const query = qs.stringify(
    {
      ...(includeDrafts && { publicationState: 'preview' }),
      ...(filterFields && { fields: filterFields as (keyof T)[] }),
      ...(filters && { filters }),
      ...(hasLocale && { locale }),
      populate,
      sort,
      pagination: { page, pageSize },
    },
    { encodeValuesOnly: true },
  )

  const requestUrl = `${API_URL}/${url}?${query}`

  try {
    const response = await axios(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = (await response.data) as { data: T[]; meta: StrapiMeta }

    if (!data || (data && !data.data)) {
      return {
        data: [],
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
      data: [] as T[],
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
    }
  }
}
