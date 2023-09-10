import axios, { AxiosError } from 'axios'
import { produce } from 'immer'
import qs from 'qs'

import {
  API_URL,
  endpointsSingleType,
  endpointsWithApprovalStatus,
  endpointsWithPublicationState,
  endpointsWithoutLocale,
} from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import {
  StrapiCollectionResponse,
  StrapiModel,
  StrapiResponse,
  StrapiSingleEndpoint,
  StrapiSingleResponse,
} from '@wsvvrijheid/types'

import {
  RequestByIdArgs,
  RequestCollectionArgs,
  RequestSingleArgs,
} from './types'

function strapiRequest<T extends StrapiModel>(
  args: RequestCollectionArgs,
): Promise<StrapiCollectionResponse<T[]>>

function strapiRequest<T extends StrapiModel>(
  args: RequestSingleArgs,
): Promise<StrapiSingleResponse<T>>

async function strapiRequest<T extends StrapiModel>(
  args: RequestCollectionArgs | RequestSingleArgs,
): Promise<StrapiResponse<T>> {
  const collectionArgs = args as RequestCollectionArgs
  const singleArgs = args as RequestSingleArgs
  const idArgs = args as RequestByIdArgs

  const { id } = idArgs

  const {
    endpoint,
    fields,
    includeDrafts,
    populate = '*',
    token = TOKEN,
  } = singleArgs

  const {
    locale,
    filters: initialFilters = {},
    sort,
    page = 1,
    pageSize = 25,
  } = collectionArgs

  const hasLocale = !id && !endpointsWithoutLocale.includes(endpoint)
  const isSingleType = endpointsSingleType.includes(
    endpoint as StrapiSingleEndpoint,
  )
  const hasApprovalStatus = endpointsWithApprovalStatus.includes(endpoint)
  const hasPublicationState = endpointsWithPublicationState.includes(endpoint)

  const filters = produce(initialFilters, draft => {
    if (!hasApprovalStatus) {
      delete draft.approvalStatus
    }

    if (!hasPublicationState) {
      delete draft.publishedAt
    }
  })

  const query = qs.stringify(
    {
      ...(!id && { pagination: { page, pageSize } }),
      ...(fields && { fields }),
      ...(filters && { filters }),
      ...(hasLocale && { locale }),
      ...(hasPublicationState &&
        includeDrafts && { publicationState: 'preview' }),
      populate,
      ...(sort && { sort }),
    },
    { encodeValuesOnly: true },
  )

  const requestUrl = id
    ? `${API_URL}/api/${endpoint}/${id}?${query}`
    : `${API_URL}/api/${endpoint}?${query}`

  try {
    const response = await axios(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = response.data as StrapiResponse<T>

    if (!result?.data) {
      if (id || isSingleType) {
        if (endpoint === 'users') {
          return {
            data: result as unknown as T,
            meta: { pagination: null },
          } as StrapiSingleResponse<T>
        }

        return {
          data: null as unknown as T,
          meta: { pagination: null },
        } as StrapiSingleResponse<T>
      }

      if (endpoint === 'users') {
        return {
          data: result as unknown as T[],
          meta: {
            pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
          },
        }
      }

      return {
        data: [] as T[],
        meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
      } as StrapiCollectionResponse<T[]>
    }

    if (id) {
      return result as StrapiSingleResponse<T>
    }

    return result as StrapiCollectionResponse<T[]>
  } catch (errr) {
    const error = errr as Error | AxiosError
    if (axios.isAxiosError(error)) {
      console.error('Request error', error.response?.data || error.message)
    } else {
      console.error('Request error', error.message)
    }

    if (id || isSingleType) {
      return {
        data: null as unknown as T,
        meta: { pagination: null },
      } as StrapiSingleResponse<T>
    }

    return {
      data: [] as T[],
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } },
    } as StrapiCollectionResponse<T[]>
  }
}

export { strapiRequest }
